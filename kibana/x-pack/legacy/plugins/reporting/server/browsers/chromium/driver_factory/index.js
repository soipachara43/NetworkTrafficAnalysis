"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadlessChromiumDriverFactory = void 0;

var _i18n = require("@kbn/i18n");

var _del = _interopRequireDefault(require("del"));

var _fs = _interopRequireDefault(require("fs"));

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _safe_child_process = require("../../safe_child_process");

var _driver = require("../driver");

var _paths = require("../paths");

var _puppeteer = require("../puppeteer");

var _args = require("./args");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class HeadlessChromiumDriverFactory {
  constructor(binaryPath, logger, browserConfig, captureConfig) {
    _defineProperty(this, "binaryPath", void 0);

    _defineProperty(this, "captureConfig", void 0);

    _defineProperty(this, "browserConfig", void 0);

    _defineProperty(this, "userDataDir", void 0);

    _defineProperty(this, "getChromiumArgs", void 0);

    _defineProperty(this, "type", 'chromium');

    this.binaryPath = binaryPath;
    this.browserConfig = browserConfig;
    this.captureConfig = captureConfig;
    this.userDataDir = _fs.default.mkdtempSync(_path.default.join(_os.default.tmpdir(), 'chromium-'));

    this.getChromiumArgs = viewport => (0, _args.args)({
      userDataDir: this.userDataDir,
      viewport,
      disableSandbox: this.browserConfig.disableSandbox,
      proxy: this.browserConfig.proxy
    });
  }

  test(logger) {
    const chromiumArgs = (0, _args.args)({
      userDataDir: this.userDataDir,
      viewport: {
        width: 800,
        height: 600
      },
      disableSandbox: this.browserConfig.disableSandbox,
      proxy: this.browserConfig.proxy
    });
    return (0, _puppeteer.puppeteerLaunch)({
      userDataDir: this.userDataDir,
      executablePath: this.binaryPath,
      ignoreHTTPSErrors: true,
      args: chromiumArgs
    }).catch(error => {
      logger.error(`The Reporting plugin encountered issues launching Chromium in a self-test. You may have trouble generating reports.`);
      logger.error(error);
      logger.warning(`See Chromium's log output at "${(0, _paths.getChromeLogLocation)(this.binaryPath)}"`);
      return null;
    });
  }
  /*
   * Return an observable to objects which will drive screenshot capture for a page
   */


  createPage({
    viewport,
    browserTimezone
  }, pLogger) {
    return Rx.Observable.create(async observer => {
      const logger = pLogger.clone(['browser-driver']);
      logger.info(`Creating browser page driver`);
      const chromiumArgs = this.getChromiumArgs(viewport);
      let browser;
      let page;

      try {
        browser = await (0, _puppeteer.puppeteerLaunch)({
          pipe: !this.browserConfig.inspect,
          userDataDir: this.userDataDir,
          executablePath: this.binaryPath,
          ignoreHTTPSErrors: true,
          args: chromiumArgs,
          env: {
            TZ: browserTimezone
          }
        });
        page = await browser.newPage(); // Set the default timeout for all navigation methods to the openUrl timeout (30 seconds)
        // All waitFor methods have their own timeout config passed in to them

        page.setDefaultTimeout(this.captureConfig.timeouts.openUrl);
        logger.debug(`Browser page driver created`);
      } catch (err) {
        observer.error(new Error(`Error spawning Chromium browser: [${err}]`));
        throw err;
      }

      const childProcess = {
        async kill() {
          await browser.close();
        }

      };
      const {
        terminate$
      } = (0, _safe_child_process.safeChildProcess)(logger, childProcess); // this is adding unsubscribe logic to our observer
      // so that if our observer unsubscribes, we terminate our child-process

      observer.add(() => {
        logger.debug(`The browser process observer has unsubscribed. Closing the browser...`);
        childProcess.kill(); // ignore async
      }); // make the observer subscribe to terminate$

      observer.add(terminate$.pipe((0, _operators.tap)(signal => {
        logger.debug(`Termination signal received: ${signal}`);
      }), (0, _operators.ignoreElements)()).subscribe(observer)); // taps the browser log streams and combine them to Kibana logs

      this.getBrowserLogger(page, logger).subscribe();
      this.getProcessLogger(browser, logger).subscribe(); // HeadlessChromiumDriver: object to "drive" a browser page

      const driver = new _driver.HeadlessChromiumDriver(page, {
        inspect: this.browserConfig.inspect,
        networkPolicy: this.captureConfig.networkPolicy
      }); // Rx.Observable<never>: stream to interrupt page capture

      const exit$ = this.getPageExit(browser, page);
      observer.next({
        driver,
        exit$
      }); // unsubscribe logic makes a best-effort attempt to delete the user data directory used by chromium

      observer.add(() => {
        const userDataDir = this.userDataDir;
        logger.debug(`deleting chromium user data directory at [${userDataDir}]`); // the unsubscribe function isn't `async` so we're going to make our best effort at
        // deleting the userDataDir and if it fails log an error.

        (0, _del.default)(userDataDir, {
          force: true
        }).catch(error => {
          logger.error(`error deleting user data directory at [${userDataDir}]: [${error}]`);
        });
      });
    });
  }

  getBrowserLogger(page, logger) {
    const consoleMessages$ = Rx.fromEvent(page, 'console').pipe((0, _operators.map)(line => {
      if (line.type() === 'error') {
        logger.error(line.text(), ['headless-browser-console']);
      } else {
        logger.debug(line.text(), [`headless-browser-console:${line.type()}`]);
      }
    }));
    const pageRequestFailed$ = Rx.fromEvent(page, 'requestfailed').pipe((0, _operators.map)(req => {
      const failure = req.failure && req.failure();

      if (failure) {
        logger.warning(`Request to [${req.url()}] failed! [${failure.errorText}]. This error will be ignored.`);
      }
    }));
    return Rx.merge(consoleMessages$, pageRequestFailed$);
  }

  getProcessLogger(browser, logger) {
    const childProcess = browser.process(); // NOTE: The browser driver can not observe stdout and stderr of the child process
    // Puppeteer doesn't give a handle to the original ChildProcess object
    // See https://github.com/GoogleChrome/puppeteer/issues/1292#issuecomment-521470627
    // just log closing of the process

    const processClose$ = Rx.fromEvent(childProcess, 'close').pipe((0, _operators.tap)(() => {
      logger.debug('child process closed', ['headless-browser-process']);
    }));
    return processClose$; // ideally, this would also merge with observers for stdout and stderr
  }

  getPageExit(browser, page) {
    const pageError$ = Rx.fromEvent(page, 'error').pipe((0, _operators.mergeMap)(err => {
      return Rx.throwError(_i18n.i18n.translate('xpack.reporting.browsers.chromium.errorDetected', {
        defaultMessage: 'Reporting detected an error: {err}',
        values: {
          err: err.toString()
        }
      }));
    }));
    const uncaughtExceptionPageError$ = Rx.fromEvent(page, 'pageerror').pipe((0, _operators.mergeMap)(err => {
      return Rx.throwError(_i18n.i18n.translate('xpack.reporting.browsers.chromium.pageErrorDetected', {
        defaultMessage: `Reporting detected an error on the page: {err}`,
        values: {
          err: err.toString()
        }
      }));
    }));
    const browserDisconnect$ = Rx.fromEvent(browser, 'disconnected').pipe((0, _operators.mergeMap)(() => Rx.throwError(new Error(_i18n.i18n.translate('xpack.reporting.browsers.chromium.chromiumClosed', {
      defaultMessage: `Reporting detected that Chromium has closed.`
    })))));
    return Rx.merge(pageError$, uncaughtExceptionPageError$, browserDisconnect$);
  }

}

exports.HeadlessChromiumDriverFactory = HeadlessChromiumDriverFactory;
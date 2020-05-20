"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadlessChromiumDriver = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _opn = _interopRequireDefault(require("opn"));

var _url = require("url");

var _network_policy = require("../../network_policy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const WAIT_FOR_DELAY_MS = 100;

class HeadlessChromiumDriver {
  constructor(page, {
    inspect,
    networkPolicy
  }) {
    _defineProperty(this, "page", void 0);

    _defineProperty(this, "inspect", void 0);

    _defineProperty(this, "networkPolicy", void 0);

    this.page = page;
    this.inspect = inspect;
    this.networkPolicy = networkPolicy;
  }

  allowRequest(url) {
    return !this.networkPolicy.enabled || (0, _network_policy.allowRequest)(url, this.networkPolicy.rules);
  }

  truncateUrl(url) {
    return (0, _lodash.trunc)(url, {
      length: 100,
      omission: '[truncated]'
    });
  }

  async open(url, {
    conditionalHeaders,
    waitForSelector: pageLoadSelector,
    timeout
  }, logger) {
    logger.info(`opening url ${url}`); // @ts-ignore

    const client = this.page._client;
    let interceptedCount = 0;
    await this.page.setRequestInterception(true); // We have to reach into the Chrome Devtools Protocol to apply headers as using
    // puppeteer's API will cause map tile requests to hang indefinitely:
    //    https://github.com/puppeteer/puppeteer/issues/5003
    // Docs on this client/protocol can be found here:
    //    https://chromedevtools.github.io/devtools-protocol/tot/Fetch

    client.on('Fetch.requestPaused', async interceptedRequest => {
      const {
        requestId,
        request: {
          url: interceptedUrl
        }
      } = interceptedRequest;
      const allowed = !interceptedUrl.startsWith('file://');
      const isData = interceptedUrl.startsWith('data:'); // We should never ever let file protocol requests go through

      if (!allowed || !this.allowRequest(interceptedUrl)) {
        logger.error(`Got bad URL: "${interceptedUrl}", closing browser.`);
        await client.send('Fetch.failRequest', {
          errorReason: 'Aborted',
          requestId
        });
        this.page.browser().close();
        throw new Error(_i18n.i18n.translate('xpack.reporting.chromiumDriver.disallowedOutgoingUrl', {
          defaultMessage: `Received disallowed outgoing URL: "{interceptedUrl}", exiting`,
          values: {
            interceptedUrl
          }
        }));
      }

      if (this._shouldUseCustomHeaders(conditionalHeaders.conditions, interceptedUrl)) {
        logger.debug(`Using custom headers for ${interceptedUrl}`);
        const headers = (0, _lodash.map)({ ...interceptedRequest.request.headers,
          ...conditionalHeaders.headers
        }, (value, name) => ({
          name,
          value
        }));

        try {
          await client.send('Fetch.continueRequest', {
            requestId,
            headers
          });
        } catch (err) {
          logger.error(_i18n.i18n.translate('xpack.reporting.chromiumDriver.failedToCompleteRequestUsingHeaders', {
            defaultMessage: 'Failed to complete a request using headers: {error}',
            values: {
              error: err
            }
          }));
        }
      } else {
        const loggedUrl = isData ? this.truncateUrl(interceptedUrl) : interceptedUrl;
        logger.debug(`No custom headers for ${loggedUrl}`);

        try {
          await client.send('Fetch.continueRequest', {
            requestId
          });
        } catch (err) {
          logger.error(_i18n.i18n.translate('xpack.reporting.chromiumDriver.failedToCompleteRequest', {
            defaultMessage: 'Failed to complete a request: {error}',
            values: {
              error: err
            }
          }));
        }
      }

      interceptedCount = interceptedCount + (isData ? 0 : 1);
    }); // Even though 3xx redirects go through our request
    // handler, we should probably inspect responses just to
    // avoid being bamboozled by some malicious request

    this.page.on('response', interceptedResponse => {
      const interceptedUrl = interceptedResponse.url();
      const allowed = !interceptedUrl.startsWith('file://');

      if (!interceptedResponse.ok()) {
        logger.warn(`Chromium received a non-OK response (${interceptedResponse.status()}) for request ${interceptedUrl}`);
      }

      if (!allowed || !this.allowRequest(interceptedUrl)) {
        logger.error(`Got disallowed URL "${interceptedUrl}", closing browser.`);
        this.page.browser().close();
        throw new Error(`Received disallowed URL in response: ${interceptedUrl}`);
      }
    });
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded'
    });

    if (this.inspect) {
      await this.launchDebugger();
    }

    await this.waitForSelector(pageLoadSelector, {
      timeout
    }, {
      context: 'waiting for page load selector'
    }, logger);
    logger.info(`handled ${interceptedCount} page requests`);
  }

  async screenshot(elementPosition) {
    let clip;

    if (elementPosition) {
      const {
        boundingClientRect,
        scroll = {
          x: 0,
          y: 0
        }
      } = elementPosition;
      clip = {
        x: boundingClientRect.left + scroll.x,
        y: boundingClientRect.top + scroll.y,
        height: boundingClientRect.height,
        width: boundingClientRect.width
      };
    }

    const screenshot = await this.page.screenshot({
      clip
    });
    return screenshot.toString('base64');
  }

  async evaluate({
    fn,
    args = []
  }, meta, logger) {
    logger.debug(`evaluate ${meta.context}`);
    const result = await this.page.evaluate(fn, ...args);
    return result;
  }

  async waitForSelector(selector, opts, context, logger) {
    const {
      timeout
    } = opts;
    logger.debug(`waitForSelector ${selector}`);
    const resp = await this.page.waitFor(selector, {
      timeout
    }); // override default 30000ms

    logger.debug(`waitForSelector ${selector} resolved`);
    return resp;
  }

  async waitFor({
    fn,
    args,
    toEqual,
    timeout
  }, context, logger) {
    const startTime = Date.now();

    while (true) {
      const result = await this.evaluate({
        fn,
        args
      }, context, logger);

      if (result === toEqual) {
        return;
      }

      if (Date.now() - startTime > timeout) {
        throw new Error(`Timed out waiting for the items selected to equal ${toEqual}. Found: ${result}. Context: ${context.context}`);
      }

      await new Promise(r => setTimeout(r, WAIT_FOR_DELAY_MS));
    }
  }

  async setViewport({
    width,
    height,
    zoom
  }, logger) {
    logger.debug(`Setting viewport to width: ${width}, height: ${height}, zoom: ${zoom}`);
    await this.page.setViewport({
      width: Math.floor(width / zoom),
      height: Math.floor(height / zoom),
      deviceScaleFactor: zoom,
      isMobile: false
    });
  }

  async launchDebugger() {
    // In order to pause on execution we have to reach more deeply into Chromiums Devtools Protocol,
    // and more specifically, for the page being used. _client is per-page, and puppeteer doesn't expose
    // a page's client in their api, so we have to reach into internals to get this behavior.
    // Finally, in order to get the inspector running, we have to know the page's internal ID (again, private)
    // in order to construct the final debugging URL.
    // @ts-ignore
    await this.page._client.send('Debugger.enable'); // @ts-ignore

    await this.page._client.send('Debugger.pause'); // @ts-ignore

    const targetId = this.page._target._targetId;
    const wsEndpoint = this.page.browser().wsEndpoint();
    const {
      port
    } = (0, _url.parse)(wsEndpoint);
    (0, _opn.default)(`http://localhost:${port}/devtools/inspector.html?ws=localhost:${port}/devtools/page/${targetId}`);
  }

  _shouldUseCustomHeaders(conditions, url) {
    const {
      hostname,
      protocol,
      port,
      pathname
    } = (0, _url.parse)(url);

    if (pathname === undefined) {
      // There's a discrepancy between the NodeJS docs and the typescript types. NodeJS docs
      // just say 'string' and the typescript types say 'string | undefined'. We haven't hit a
      // situation where it's undefined but here's an explicit Error if we do.
      throw new Error(`pathname is undefined, don't know how to proceed`);
    }

    return hostname === conditions.hostname && protocol === `${conditions.protocol}:` && this._shouldUseCustomHeadersForPort(conditions, port) && pathname.startsWith(`${conditions.basePath}/`);
  }

  _shouldUseCustomHeadersForPort(conditions, port) {
    if (conditions.protocol === 'http' && conditions.port === 80) {
      return port === undefined || port === null || port === '' || port === conditions.port.toString();
    }

    if (conditions.protocol === 'https' && conditions.port === 443) {
      return port === undefined || port === null || port === '' || port === conditions.port.toString();
    }

    return port === conditions.port.toString();
  }

}

exports.HeadlessChromiumDriver = HeadlessChromiumDriver;
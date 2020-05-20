"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportingPlugin = void 0;

var _log_configuration = require("../log_configuration");

var _browsers = require("./browsers");

var _core = require("./core");

var _lib = require("./lib");

var _services = require("./services");

var _usage = require("./usage");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ReportingPlugin {
  constructor(context) {
    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "reportingCore", void 0);

    this.logger = new _lib.LevelLogger(context.logger.get('reporting'));
    this.reportingCore = new _core.ReportingCore(this.logger);
  }

  async setup(core, plugins) {
    const {
      elasticsearch,
      usageCollection,
      __LEGACY
    } = plugins;
    const browserDriverFactory = await (0, _browsers.createBrowserDriverFactory)(__LEGACY, this.logger); // required for validations :(

    (0, _lib.runValidations)(__LEGACY, elasticsearch, browserDriverFactory, this.logger); // this must run early, as it sets up config defaults

    const {
      xpack_main: xpackMainLegacy,
      reporting: reportingLegacy
    } = __LEGACY.plugins;
    this.reportingCore.legacySetup(xpackMainLegacy, reportingLegacy, __LEGACY, plugins); // Register a function with server to manage the collection of usage stats

    (0, _usage.registerReportingUsageCollector)(this.reportingCore, __LEGACY, usageCollection); // regsister setup internals

    this.reportingCore.pluginSetup({
      browserDriverFactory
    });
    return {};
  }

  async start(core, plugins) {
    const {
      reportingCore,
      logger
    } = this;
    const {
      elasticsearch,
      __LEGACY
    } = plugins;
    const esqueue = await (0, _lib.createQueueFactory)(reportingCore, __LEGACY, elasticsearch, logger);
    const enqueueJob = (0, _lib.enqueueJobFactory)(reportingCore, __LEGACY, elasticsearch, logger);
    this.reportingCore.pluginStart({
      savedObjects: core.savedObjects,
      uiSettings: core.uiSettings,
      esqueue,
      enqueueJob
    });
    (0, _services.setFieldFormats)(plugins.data.fieldFormats);
    (0, _log_configuration.logConfiguration)(__LEGACY, this.logger);
    return {};
  }

  getReportingCore() {
    return this.reportingCore;
  }

}

exports.ReportingPlugin = ReportingPlugin;
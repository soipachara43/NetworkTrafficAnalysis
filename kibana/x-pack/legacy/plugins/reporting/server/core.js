"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportingCore = void 0;

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _mirror_plugin_status = require("../../../server/lib/mirror_plugin_status");

var _constants = require("../common/constants");

var _lib = require("./lib");

var _routes = require("./routes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ReportingCore {
  constructor(logger) {
    this.logger = logger;

    _defineProperty(this, "pluginSetupDeps", void 0);

    _defineProperty(this, "pluginStartDeps", void 0);

    _defineProperty(this, "pluginSetup$", new Rx.ReplaySubject());

    _defineProperty(this, "pluginStart$", new Rx.ReplaySubject());

    _defineProperty(this, "exportTypesRegistry", (0, _lib.getExportTypesRegistry)());
  }

  legacySetup(xpackMainPlugin, reporting, __LEGACY, plugins) {
    (0, _mirror_plugin_status.mirrorPluginStatus)(xpackMainPlugin, reporting);
    const checkLicense = (0, _lib.checkLicenseFactory)(this.exportTypesRegistry);
    xpackMainPlugin.status.once('green', () => {
      // Register a function that is called whenever the xpack info changes,
      // to re-compute the license check results for this plugin
      xpackMainPlugin.info.feature(_constants.PLUGIN_ID).registerLicenseCheckResultsGenerator(checkLicense);
    }); // Reporting routes

    (0, _routes.registerRoutes)(this, __LEGACY, plugins, this.logger);
  }

  pluginSetup(reportingSetupDeps) {
    this.pluginSetup$.next(reportingSetupDeps);
  }

  pluginStart(reportingStartDeps) {
    this.pluginStart$.next(reportingStartDeps);
  }

  pluginHasStarted() {
    return this.pluginStart$.pipe((0, _operators.first)(), (0, _operators.mapTo)(true)).toPromise();
  }
  /*
   * Internal module dependencies
   */


  getExportTypesRegistry() {
    return this.exportTypesRegistry;
  }

  async getEsqueue() {
    return (await this.getPluginStartDeps()).esqueue;
  }

  async getEnqueueJob() {
    return (await this.getPluginStartDeps()).enqueueJob;
  }

  async getBrowserDriverFactory() {
    return (await this.getPluginSetupDeps()).browserDriverFactory;
  }
  /*
   * Kibana core module dependencies
   */


  async getPluginSetupDeps() {
    if (this.pluginSetupDeps) {
      return this.pluginSetupDeps;
    }

    return await this.pluginSetup$.pipe((0, _operators.first)()).toPromise();
  }

  async getPluginStartDeps() {
    if (this.pluginStartDeps) {
      return this.pluginStartDeps;
    }

    return await this.pluginStart$.pipe((0, _operators.first)()).toPromise();
  }

  async getSavedObjectsClient(fakeRequest) {
    const {
      savedObjects
    } = await this.getPluginStartDeps();
    return savedObjects.getScopedClient(fakeRequest);
  }

  async getUiSettingsServiceFactory(savedObjectsClient) {
    const {
      uiSettings: uiSettingsService
    } = await this.getPluginStartDeps();
    const scopedUiSettingsService = uiSettingsService.asScopedToClient(savedObjectsClient);
    return scopedUiSettingsService;
  }

}

exports.ReportingCore = ReportingCore;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelemetryPlugin = void 0;

var _server = require("../../../core/server");

var _routes = require("./routes");

var _telemetry_collection = require("./telemetry_collection");

var _collectors = require("./collectors");

var _fetcher = require("./fetcher");

var _handle_old_settings = require("./handle_old_settings");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TelemetryPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "currentKibanaVersion", void 0);

    _defineProperty(this, "config$", void 0);

    _defineProperty(this, "legacyConfig$", void 0);

    _defineProperty(this, "isDev", void 0);

    _defineProperty(this, "fetcherTask", void 0);

    _defineProperty(this, "savedObjectsClient", void 0);

    _defineProperty(this, "uiSettingsClient", void 0);

    this.logger = initializerContext.logger.get();
    this.isDev = initializerContext.env.mode.dev;
    this.currentKibanaVersion = initializerContext.env.packageInfo.version;
    this.config$ = initializerContext.config.create();
    this.legacyConfig$ = initializerContext.config.legacy.globalConfig$;
    this.fetcherTask = new _fetcher.FetcherTask({ ...initializerContext,
      logger: this.logger
    });
  }

  async setup({
    elasticsearch,
    http,
    savedObjects,
    metrics
  }, {
    usageCollection,
    telemetryCollectionManager
  }) {
    const currentKibanaVersion = this.currentKibanaVersion;
    const config$ = this.config$;
    const isDev = this.isDev;
    (0, _telemetry_collection.registerCollection)(telemetryCollectionManager, elasticsearch.dataClient);
    const router = http.createRouter();
    (0, _routes.registerRoutes)({
      config$,
      currentKibanaVersion,
      isDev,
      router,
      telemetryCollectionManager
    });
    this.registerMappings(opts => savedObjects.registerType(opts));
    this.registerUsageCollectors(usageCollection, metrics, opts => savedObjects.registerType(opts));
  }

  async start(core, {
    telemetryCollectionManager
  }) {
    const {
      savedObjects,
      uiSettings
    } = core;
    this.savedObjectsClient = savedObjects.createInternalRepository();
    const savedObjectsClient = new _server.SavedObjectsClient(this.savedObjectsClient);
    this.uiSettingsClient = uiSettings.asScopedToClient(savedObjectsClient);

    try {
      await (0, _handle_old_settings.handleOldSettings)(savedObjectsClient, this.uiSettingsClient);
    } catch (error) {
      this.logger.warn('Unable to update legacy telemetry configs.');
    }

    this.fetcherTask.start(core, {
      telemetryCollectionManager
    });
  }

  registerMappings(registerType) {
    registerType({
      name: 'telemetry',
      hidden: false,
      namespaceAgnostic: true,
      mappings: {
        properties: {
          enabled: {
            type: 'boolean'
          },
          sendUsageFrom: {
            type: 'keyword'
          },
          lastReported: {
            type: 'date'
          },
          lastVersionChecked: {
            type: 'keyword'
          },
          userHasSeenNotice: {
            type: 'boolean'
          },
          reportFailureCount: {
            type: 'integer'
          },
          reportFailureVersion: {
            type: 'keyword'
          },
          allowChangingOptInStatus: {
            type: 'boolean'
          }
        }
      }
    });
  }

  registerUsageCollectors(usageCollection, metrics, registerType) {
    const getSavedObjectsClient = () => this.savedObjectsClient;

    const getUiSettingsClient = () => this.uiSettingsClient;

    (0, _collectors.registerOpsStatsCollector)(usageCollection, metrics.getOpsMetrics$());
    (0, _collectors.registerKibanaUsageCollector)(usageCollection, this.legacyConfig$);
    (0, _collectors.registerTelemetryPluginUsageCollector)(usageCollection, {
      currentKibanaVersion: this.currentKibanaVersion,
      config$: this.config$,
      getSavedObjectsClient
    });
    (0, _collectors.registerTelemetryUsageCollector)(usageCollection, this.config$);
    (0, _collectors.registerManagementUsageCollector)(usageCollection, getUiSettingsClient);
    (0, _collectors.registerUiMetricUsageCollector)(usageCollection, registerType, getSavedObjectsClient);
    (0, _collectors.registerApplicationUsageCollector)(usageCollection, registerType, getSavedObjectsClient);
  }

}

exports.TelemetryPlugin = TelemetryPlugin;
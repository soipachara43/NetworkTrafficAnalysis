"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _constants = require("../common/constants");

var _routes = require("./routes");

var _kibana_monitoring = require("./kibana_monitoring");

var _init_infra_source = require("./lib/logs/init_infra_source");

var _instantiate_client = require("./es_client/instantiate_client");

var _collectors = require("./kibana_monitoring/collectors");

var _telemetry_collection = require("./telemetry_collection");

var _license_service = require("./license_service");

var _license_expiration = require("./alerts/license_expiration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// This is used to test the version of kibana
const snapshotRegex = /-snapshot/i;

const wrapError = error => {
  var _error$statusCode;

  const options = {
    statusCode: (_error$statusCode = error.statusCode) !== null && _error$statusCode !== void 0 ? _error$statusCode : 500
  };
  const boom = _boom.default.isBoom(error) ? error : _boom.default.boomify(error, options);
  return {
    body: boom,
    headers: boom.output.headers,
    statusCode: boom.output.statusCode
  };
};

class Plugin {
  constructor(initializerContext) {
    _defineProperty(this, "initializerContext", void 0);

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "getLogger", void 0);

    _defineProperty(this, "cluster", {});

    _defineProperty(this, "licenseService", {});

    _defineProperty(this, "monitoringCore", {});

    _defineProperty(this, "legacyShimDependencies", {});

    _defineProperty(this, "bulkUploader", {});

    this.initializerContext = initializerContext;
    this.log = initializerContext.logger.get(_constants.LOGGING_TAG);

    this.getLogger = (...scopes) => initializerContext.logger.get(_constants.LOGGING_TAG, ...scopes);
  }

  async setup(core, plugins) {
    var _plugins$usageCollect;

    const [config, legacyConfig] = await (0, _rxjs.combineLatest)([this.initializerContext.config.create(), this.initializerContext.config.legacy.globalConfig$]).pipe((0, _operators.first)()).toPromise();
    this.legacyShimDependencies = {
      router: core.http.createRouter(),
      instanceUuid: core.uuid.getInstanceUuid(),
      esDataClient: core.elasticsearch.dataClient,
      kibanaStatsCollector: (_plugins$usageCollect = plugins.usageCollection) === null || _plugins$usageCollect === void 0 ? void 0 : _plugins$usageCollect.getCollectorByType(_constants.KIBANA_STATS_TYPE_MONITORING)
    }; // Monitoring creates and maintains a connection to a potentially
    // separate ES cluster - create this first

    const cluster = this.cluster = (0, _instantiate_client.instantiateClient)(config.ui.elasticsearch, this.log, core.elasticsearch.createClient); // Start our license service which will ensure
    // the appropriate licenses are present

    this.licenseService = new _license_service.LicenseService().setup({
      licensing: plugins.licensing,
      monitoringClient: cluster,
      config,
      log: this.log
    });
    await this.licenseService.refresh();

    if (_constants.KIBANA_ALERTING_ENABLED) {
      plugins.alerting.registerType((0, _license_expiration.getLicenseExpiration)(async () => {
        const coreStart = (await core.getStartServices())[0];
        return coreStart.uiSettings;
      }, cluster, this.getLogger, config.ui.ccs.enabled));
    } // Initialize telemetry


    if (plugins.telemetryCollectionManager) {
      (0, _telemetry_collection.registerMonitoringCollection)(plugins.telemetryCollectionManager, this.cluster, {
        maxBucketSize: config.ui.max_bucket_size
      });
    } // Register collector objects for stats to show up in the APIs


    if (plugins.usageCollection) {
      (0, _collectors.registerCollectors)(plugins.usageCollection, config);
    } // If collection is enabled, create the bulk uploader


    const kibanaMonitoringLog = this.getLogger(_constants.KIBANA_MONITORING_LOGGING_TAG);
    const kibanaCollectionEnabled = config.kibana.collection.enabled;

    if (kibanaCollectionEnabled) {
      // Start kibana internal collection
      const serverInfo = core.http.getServerInfo();
      const bulkUploader = this.bulkUploader = (0, _kibana_monitoring.initBulkUploader)({
        elasticsearch: core.elasticsearch,
        config,
        log: kibanaMonitoringLog,
        kibanaStats: {
          uuid: core.uuid.getInstanceUuid(),
          name: serverInfo.name,
          index: (0, _lodash.get)(legacyConfig, 'kibana.index'),
          host: serverInfo.host,
          locale: _i18n.i18n.getLocale(),
          port: serverInfo.port.toString(),
          transport_address: `${serverInfo.host}:${serverInfo.port}`,
          version: this.initializerContext.env.packageInfo.version,
          snapshot: snapshotRegex.test(this.initializerContext.env.packageInfo.version)
        }
      }); // Do not use `this.licenseService` as that looks at the monitoring cluster
      // whereas we want to check the production cluster here

      if (plugins.licensing) {
        plugins.licensing.license$.subscribe(license => {
          // use updated xpack license info to start/stop bulk upload
          const mainMonitoring = license.getFeature('monitoring');
          const monitoringBulkEnabled = mainMonitoring && mainMonitoring.isAvailable && mainMonitoring.isEnabled;

          if (monitoringBulkEnabled) {
            bulkUploader.start(plugins.usageCollection);
          } else {
            bulkUploader.handleNotEnabled();
          }
        });
      }
    } else {
      kibanaMonitoringLog.info('Internal collection for Kibana monitoring is disabled per configuration.');
    } // If the UI is enabled, then we want to register it so it shows up
    // and start any other UI-related setup tasks


    if (config.ui.enabled) {
      // Create our shim which is currently used to power our routing
      this.monitoringCore = this.getLegacyShim(config, legacyConfig, core.getStartServices, this.licenseService, this.cluster);
      this.registerPluginInUI(plugins);
      (0, _routes.requireUIRoutes)(this.monitoringCore);
      (0, _init_infra_source.initInfraSource)(config, plugins.infra);
    }

    return {
      // The legacy plugin calls this to register certain legacy dependencies
      // that are necessary for the plugin to properly run
      registerLegacyAPI: legacyAPI => {
        this.setupLegacy(legacyAPI);
      },
      // OSS stats api needs to call this in order to centralize how
      // we fetch kibana specific stats
      getKibanaStats: () => this.bulkUploader.getKibanaStats()
    };
  }

  start() {}

  stop() {
    if (this.cluster) {
      this.cluster.close();
    }

    if (this.licenseService) {
      this.licenseService.stop();
    }
  }

  registerPluginInUI(plugins) {
    plugins.features.registerFeature({
      id: 'monitoring',
      name: _i18n.i18n.translate('xpack.monitoring.featureRegistry.monitoringFeatureName', {
        defaultMessage: 'Stack Monitoring'
      }),
      icon: 'monitoringApp',
      navLinkId: 'monitoring',
      app: ['monitoring', 'kibana'],
      catalogue: ['monitoring'],
      privileges: null,
      reserved: {
        privilege: {
          app: ['monitoring', 'kibana'],
          catalogue: ['monitoring'],
          savedObject: {
            all: [],
            read: []
          },
          ui: []
        },
        description: _i18n.i18n.translate('xpack.monitoring.feature.reserved.description', {
          defaultMessage: 'To grant users access, you should also assign the monitoring_user role.'
        })
      }
    });
  }

  async setupLegacy(legacyAPI) {
    // Set the stats getter
    this.bulkUploader.setKibanaStatusGetter(() => legacyAPI.getServerStatus());
  }

  getLegacyShim(config, legacyConfig, getCoreServices, licenseService, cluster) {
    const router = this.legacyShimDependencies.router;

    const legacyConfigWrapper = () => ({
      get: _key => {
        const key = _key.includes('monitoring.') ? _key.split('monitoring.')[1] : _key;

        if ((0, _lodash.has)(config, key)) {
          return (0, _lodash.get)(config, key);
        }

        if ((0, _lodash.has)(legacyConfig, key)) {
          return (0, _lodash.get)(legacyConfig, key);
        }

        if (key === 'server.uuid') {
          return this.legacyShimDependencies.instanceUuid;
        }

        throw new Error(`Unknown key '${_key}'`);
      }
    });

    return {
      config: legacyConfigWrapper,
      log: this.log,
      route: options => {
        const method = options.method;

        const handler = async (context, req, res) => {
          const plugins = (await getCoreServices())[1];
          const legacyRequest = { ...req,
            logger: this.log,
            getLogger: this.getLogger,
            payload: req.body,
            getKibanaStatsCollector: () => this.legacyShimDependencies.kibanaStatsCollector,
            getUiSettingsService: () => context.core.uiSettings.client,
            getAlertsClient: () => plugins.alerting.getAlertsClientWithRequest(req),
            server: {
              config: legacyConfigWrapper,
              newPlatform: {
                setup: {
                  plugins
                }
              },
              plugins: {
                monitoring: {
                  info: licenseService
                },
                elasticsearch: {
                  getCluster: name => ({
                    callWithRequest: async (_req, endpoint, params) => {
                      const client = name === 'monitoring' ? cluster : this.legacyShimDependencies.esDataClient;
                      return client.asScoped(req).callAsCurrentUser(endpoint, params);
                    }
                  })
                }
              }
            }
          };

          try {
            const result = await options.handler(legacyRequest);
            return res.ok({
              body: result
            });
          } catch (err) {
            var _err$output;

            const statusCode = ((_err$output = err.output) === null || _err$output === void 0 ? void 0 : _err$output.statusCode) || err.statusCode || err.status;

            if (_boom.default.isBoom(err) || statusCode !== 500) {
              return res.customError({
                statusCode,
                body: err
              });
            }

            return res.internalError(wrapError(err));
          }
        };

        const validate = (0, _lodash.get)(options, 'config.validate', false);

        if (validate && validate.payload) {
          validate.body = validate.payload;
        }

        options.validate = validate;

        if (method === 'POST') {
          router.post(options, handler);
        } else if (method === 'GET') {
          router.get(options, handler);
        } else if (method === 'PUT') {
          router.put(options, handler);
        } else {
          throw new Error('Unsupport API method: ' + method);
        }
      }
    };
  }

}

exports.Plugin = Plugin;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RollupsServerPlugin = void 0;

var _operators = require("rxjs/operators");

var _i18n = require("@kbn/i18n");

var _register_license_checker = require("../../../server/lib/register_license_checker");

var _common = require("../common");

var _api = require("./routes/api");

var _collectors = require("./collectors");

var _rollup_data_enricher = require("./rollup_data_enricher");

var _search_strategies = require("./lib/search_strategies");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RollupsServerPlugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "log", void 0);

    this.log = initializerContext.logger.get();
  }

  async setup({
    http,
    elasticsearch: elasticsearchService
  }, {
    __LEGACY: serverShim,
    usageCollection,
    metrics,
    indexManagement
  }) {
    const elasticsearch = await elasticsearchService.adminClient;
    const router = http.createRouter();
    const routeDependencies = {
      elasticsearch,
      elasticsearchService,
      router
    };
    (0, _register_license_checker.registerLicenseChecker)(serverShim, _common.PLUGIN.ID, _common.PLUGIN.getI18nName(_i18n.i18n), _common.PLUGIN.MINIMUM_LICENSE_REQUIRED);
    (0, _api.registerIndicesRoute)(routeDependencies, serverShim);
    (0, _api.registerFieldsForWildcardRoute)(routeDependencies, serverShim);
    (0, _api.registerSearchRoute)(routeDependencies, serverShim);
    (0, _api.registerJobsRoute)(routeDependencies, serverShim);

    if (usageCollection) {
      this.initializerContext.config.legacy.globalConfig$.pipe((0, _operators.first)()).toPromise().then(config => {
        (0, _collectors.registerRollupUsageCollector)(usageCollection, config.kibana.index);
      }).catch(e => {
        this.log.warn(`Registering Rollup collector failed: ${e}`);
      });
    }

    if (indexManagement && indexManagement.indexDataEnricher) {
      indexManagement.indexDataEnricher.add(_rollup_data_enricher.rollupDataEnricher);
    }

    if (metrics) {
      const {
        addSearchStrategy
      } = metrics;
      (0, _search_strategies.registerRollupSearchStrategy)(routeDependencies, addSearchStrategy);
    }
  }

  start() {}

  stop() {}

}

exports.RollupsServerPlugin = RollupsServerPlugin;
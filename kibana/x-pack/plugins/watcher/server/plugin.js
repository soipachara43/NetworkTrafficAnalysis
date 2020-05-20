"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatcherServerPlugin = void 0;

var _constants = require("../common/constants");

var _settings = require("./routes/api/settings");

var _indices = require("./routes/api/indices");

var _license = require("./routes/api/license");

var _watches = require("./routes/api/watches");

var _watch = require("./routes/api/watch");

var _register_list_fields_route = require("./routes/api/register_list_fields_route");

var _register_load_history_route = require("./routes/api/register_load_history_route");

var _elasticsearch_js_plugin = require("./lib/elasticsearch_js_plugin");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class WatcherServerPlugin {
  constructor(ctx) {
    _defineProperty(this, "log", void 0);

    _defineProperty(this, "licenseStatus", {
      hasRequired: false
    });

    this.log = ctx.logger.get();
  }

  async setup({
    http,
    elasticsearch: elasticsearchService
  }, {
    licensing
  }) {
    const router = http.createRouter();
    const routeDependencies = {
      router,
      getLicenseStatus: () => this.licenseStatus
    };
    const config = {
      plugins: [_elasticsearch_js_plugin.elasticsearchJsPlugin]
    };
    const watcherESClient = elasticsearchService.createClient('watcher', config);
    http.registerRouteHandlerContext('watcher', (ctx, request) => {
      return {
        client: watcherESClient.asScoped(request)
      };
    });
    (0, _register_list_fields_route.registerListFieldsRoute)(routeDependencies);
    (0, _register_load_history_route.registerLoadHistoryRoute)(routeDependencies);
    (0, _indices.registerIndicesRoutes)(routeDependencies);
    (0, _license.registerLicenseRoutes)(routeDependencies);
    (0, _settings.registerSettingsRoutes)(routeDependencies);
    (0, _watches.registerWatchesRoutes)(routeDependencies);
    (0, _watch.registerWatchRoutes)(routeDependencies);
    licensing.license$.subscribe(async license => {
      const {
        state,
        message
      } = license.check(_constants.PLUGIN.ID, _constants.PLUGIN.MINIMUM_LICENSE_REQUIRED);
      const hasMinimumLicense = state === 'valid';

      if (hasMinimumLicense && license.getFeature(_constants.PLUGIN.ID)) {
        this.log.info('Enabling Watcher plugin.');
        this.licenseStatus = {
          hasRequired: true
        };
      } else {
        if (message) {
          this.log.info(message);
        }

        this.licenseStatus = {
          hasRequired: false,
          message
        };
      }
    });
  }

  start() {}

  stop() {}

}

exports.WatcherServerPlugin = WatcherServerPlugin;
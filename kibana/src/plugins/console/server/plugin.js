"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsoleServerPlugin = void 0;

var _operators = require("rxjs/operators");

var _console_legacy = require("../../../legacy/core_plugins/console_legacy");

var _lib = require("./lib");

var _services = require("./services");

var _proxy = require("./routes/api/console/proxy");

var _spec_definitions = require("./routes/api/console/spec_definitions");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ConsoleServerPlugin {
  constructor(ctx) {
    this.ctx = ctx;

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "specDefinitionsService", new _services.SpecDefinitionsService());

    this.log = this.ctx.logger.get();
  }

  async setup({
    http,
    capabilities,
    getStartServices
  }) {
    capabilities.registerProvider(() => ({
      dev_tools: {
        show: true,
        save: true
      }
    }));
    const config = await this.ctx.config.create().pipe((0, _operators.first)()).toPromise();
    const {
      elasticsearch
    } = await this.ctx.config.legacy.globalConfig$.pipe((0, _operators.first)()).toPromise();
    const proxyPathFilters = config.proxyFilter.map(str => new RegExp(str));
    const router = http.createRouter();
    (0, _proxy.registerProxyRoute)({
      log: this.log,
      proxyConfigCollection: new _lib.ProxyConfigCollection(config.proxyConfig),
      readLegacyESConfig: () => {
        const legacyConfig = (0, _console_legacy.readLegacyEsConfig)();
        return { ...elasticsearch,
          ...legacyConfig
        };
      },
      pathFilters: proxyPathFilters,
      router
    });
    (0, _spec_definitions.registerSpecDefinitionsRoute)({
      router,
      services: {
        specDefinitions: this.specDefinitionsService
      }
    });
    return { ...this.specDefinitionsService.setup()
    };
  }

  start() {
    return { ...this.specDefinitionsService.start()
    };
  }

}

exports.ConsoleServerPlugin = ConsoleServerPlugin;
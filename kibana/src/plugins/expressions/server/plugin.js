"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionsServerPlugin = void 0;

var _legacy = require("./legacy");

var _common = require("../common");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ExpressionsServerPlugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "expressions", new _common.ExpressionsService());
  }

  setup(core, plugins) {
    const logger = this.initializerContext.logger.get();
    const {
      expressions
    } = this;
    const {
      executor
    } = expressions;
    executor.extendContext({
      environment: 'server'
    });
    const legacyApi = (0, _legacy.createLegacyServerInterpreterApi)();
    (0, _legacy.createLegacyServerEndpoints)(legacyApi, logger, core, plugins);
    const setup = { ...this.expressions.setup(),
      __LEGACY: legacyApi
    };
    return Object.freeze(setup);
  }

  start(core, plugins) {
    const start = this.expressions.start();
    return Object.freeze(start);
  }

  stop() {
    this.expressions.stop();
  }

}

exports.ExpressionsServerPlugin = ExpressionsServerPlugin;
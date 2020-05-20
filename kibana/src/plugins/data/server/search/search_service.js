"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchService = void 0;

var _routes = require("./routes");

var _create_api = require("./create_api");

var _es_search = require("./es_search");

var _saved_objects = require("../saved_objects");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SearchService {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "searchStrategies", {});

    _defineProperty(this, "contextContainer", void 0);
  }

  setup(core) {
    const router = core.http.createRouter();
    (0, _routes.registerSearchRoute)(router);
    this.contextContainer = core.context.createContextContainer();
    core.savedObjects.registerType(_saved_objects.searchSavedObjectType);
    core.http.registerRouteHandlerContext('search', context => {
      return (0, _create_api.createApi)({
        caller: context.core.elasticsearch.dataClient.callAsCurrentUser,
        searchStrategies: this.searchStrategies
      });
    });

    const registerSearchStrategyProvider = (plugin, name, strategyProvider) => {
      this.searchStrategies[name] = this.contextContainer.createHandler(plugin, strategyProvider);
    };

    const api = {
      registerSearchStrategyContext: this.contextContainer.registerContext,
      registerSearchStrategyProvider
    };
    api.registerSearchStrategyContext(this.initializerContext.opaqueId, 'core', () => core);
    api.registerSearchStrategyContext(this.initializerContext.opaqueId, 'config$', () => this.initializerContext.config.legacy.globalConfig$);
    api.registerSearchStrategyProvider(this.initializerContext.opaqueId, _es_search.ES_SEARCH_STRATEGY, _es_search.esSearchStrategyProvider);
    return api;
  }

  start() {}

  stop() {}

}

exports.SearchService = SearchService;
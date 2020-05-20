"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchService = void 0;

var _sync_search_strategy = require("./sync_search_strategy");

var _es_client = require("./es_client");

var _search = require("../../common/search");

var _es_search_strategy = require("./es_search/es_search_strategy");

var _search_interceptor = require("./search_interceptor");

var _aggs = require("./aggs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The search plugin exposes two registration methods for other plugins:
 *  -  registerSearchStrategyProvider for plugins to add their own custom
 * search strategies
 *  -  registerSearchStrategyContext for plugins to expose information
 * and/or functionality for other search strategies to use
 *
 * It also comes with two search strategy implementations - SYNC_SEARCH_STRATEGY and ES_SEARCH_STRATEGY.
 */
var SearchService =
/*#__PURE__*/
function () {
  function SearchService() {
    var _this = this;

    _classCallCheck(this, SearchService);

    _defineProperty(this, "searchStrategies", {});

    _defineProperty(this, "esClient", void 0);

    _defineProperty(this, "aggTypesRegistry", new _aggs.AggTypesRegistry());

    _defineProperty(this, "searchInterceptor", void 0);

    _defineProperty(this, "registerSearchStrategyProvider", function (name, strategyProvider) {
      _this.searchStrategies[name] = strategyProvider;
    });

    _defineProperty(this, "getSearchStrategy", function (name) {
      var strategyProvider = _this.searchStrategies[name];
      if (!strategyProvider) throw new Error("Search strategy ".concat(name, " not found"));
      return strategyProvider;
    });
  }

  _createClass(SearchService, [{
    key: "setup",
    value: function setup(core, packageInfo) {
      this.esClient = (0, _es_client.getEsClient)(core.injectedMetadata, core.http, packageInfo);
      this.registerSearchStrategyProvider(_sync_search_strategy.SYNC_SEARCH_STRATEGY, _sync_search_strategy.syncSearchStrategyProvider);
      this.registerSearchStrategyProvider(_search.ES_SEARCH_STRATEGY, _es_search_strategy.esSearchStrategyProvider);
      var aggTypesSetup = this.aggTypesRegistry.setup();
      var aggTypes = (0, _aggs.getAggTypes)({
        uiSettings: core.uiSettings
      });
      aggTypes.buckets.forEach(function (b) {
        return aggTypesSetup.registerBucket(b);
      });
      aggTypes.metrics.forEach(function (m) {
        return aggTypesSetup.registerMetric(m);
      });
      return {
        aggs: {
          calculateAutoTimeExpression: (0, _aggs.getCalculateAutoTimeExpression)(core.uiSettings),
          types: aggTypesSetup
        },
        registerSearchStrategyProvider: this.registerSearchStrategyProvider
      };
    }
  }, {
    key: "start",
    value: function start(core) {
      var _this2 = this;

      /**
       * A global object that intercepts all searches and provides convenience methods for cancelling
       * all pending search requests, as well as getting the number of pending search requests.
       * TODO: Make this modular so that apps can opt in/out of search collection, or even provide
       * their own search collector instances
       */
      this.searchInterceptor = new _search_interceptor.SearchInterceptor(core.notifications.toasts, core.application, core.injectedMetadata.getInjectedVar('esRequestTimeout'));
      var aggTypesStart = this.aggTypesRegistry.start();
      return {
        aggs: {
          calculateAutoTimeExpression: (0, _aggs.getCalculateAutoTimeExpression)(core.uiSettings),
          createAggConfigs: function createAggConfigs(indexPattern) {
            var configStates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var schemas = arguments.length > 2 ? arguments[2] : undefined;
            return new _aggs.AggConfigs(indexPattern, configStates, {
              typesRegistry: aggTypesStart
            });
          },
          types: aggTypesStart
        },
        search: function search(request, options, strategyName) {
          var strategyProvider = _this2.getSearchStrategy(strategyName || _search.DEFAULT_SEARCH_STRATEGY);

          var _strategyProvider = strategyProvider({
            core: core,
            getSearchStrategy: _this2.getSearchStrategy
          }),
              search = _strategyProvider.search;

          return _this2.searchInterceptor.search(search, request, options);
        },
        setInterceptor: function setInterceptor(searchInterceptor) {
          // TODO: should an intercepror have a destroy method?
          _this2.searchInterceptor = searchInterceptor;
        },
        __LEGACY: {
          esClient: this.esClient,
          AggConfig: _aggs.AggConfig,
          AggType: _aggs.AggType,
          aggTypeFieldFilters: _aggs.aggTypeFieldFilters,
          FieldParamType: _aggs.FieldParamType,
          MetricAggType: _aggs.MetricAggType,
          parentPipelineAggHelper: _aggs.parentPipelineAggHelper,
          siblingPipelineAggHelper: _aggs.siblingPipelineAggHelper
        }
      };
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return SearchService;
}();

exports.SearchService = SearchService;
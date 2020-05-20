"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.esaggs = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../plugins/kibana_utils/public");

var _search_source = require("../search_source");

var _tabify = require("../tabify");

var _common = require("../../../common");

var _query = require("../../query");

var _services = require("../../services");

var _build_tabular_inspector_data = require("./build_tabular_inspector_data");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var name = 'esaggs';

var handleCourierRequest =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var searchSource, aggs, timeRange, query, filters, forceFetch, partialRows, metricsAtAllLevels, inspectorAdapters, filterManager, abortSignal, timeFilterSearchSource, requestSearchSource, reqBody, queryHash, shouldQuery, request, response, resp, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, agg, parsedTimeRange, tabifyParams, tabifyCacheHash, shouldCalculateNewTabify;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            searchSource = _ref2.searchSource, aggs = _ref2.aggs, timeRange = _ref2.timeRange, query = _ref2.query, filters = _ref2.filters, forceFetch = _ref2.forceFetch, partialRows = _ref2.partialRows, metricsAtAllLevels = _ref2.metricsAtAllLevels, inspectorAdapters = _ref2.inspectorAdapters, filterManager = _ref2.filterManager, abortSignal = _ref2.abortSignal;
            // Create a new search source that inherits the original search source
            // but has the appropriate timeRange applied via a filter.
            // This is a temporary solution until we properly pass down all required
            // information for the request to the request handler (https://github.com/elastic/kibana/issues/16641).
            // Using callParentStartHandlers: true we make sure, that the parent searchSource
            // onSearchRequestStart will be called properly even though we use an inherited
            // search source.
            timeFilterSearchSource = searchSource.createChild({
              callParentStartHandlers: true
            });
            requestSearchSource = timeFilterSearchSource.createChild({
              callParentStartHandlers: true
            });
            aggs.setTimeRange(timeRange); // For now we need to mirror the history of the passed search source, since
            // the request inspector wouldn't work otherwise.

            Object.defineProperty(requestSearchSource, 'history', {
              get: function get() {
                return searchSource.history;
              },
              set: function set(history) {
                return searchSource.history = history;
              }
            });
            requestSearchSource.setField('aggs', function () {
              return aggs.toDsl(metricsAtAllLevels);
            });
            requestSearchSource.onRequestStart(function (paramSearchSource, options) {
              return aggs.onSearchRequestStart(paramSearchSource, options);
            });

            if (timeRange) {
              timeFilterSearchSource.setField('filter', function () {
                return (0, _query.getTime)(searchSource.getField('index'), timeRange);
              });
            }

            requestSearchSource.setField('filter', filters);
            requestSearchSource.setField('query', query);
            _context.next = 12;
            return requestSearchSource.getSearchRequestBody();

          case 12:
            reqBody = _context.sent;
            queryHash = (0, _public.calculateObjectHash)(reqBody); // We only need to reexecute the query, if forceFetch was true or the hash of the request body has changed
            // since the last request

            shouldQuery = forceFetch || searchSource.lastQuery !== queryHash;

            if (!shouldQuery) {
              _context.next = 35;
              break;
            }

            inspectorAdapters.requests.reset();
            request = inspectorAdapters.requests.start(_i18n.i18n.translate('data.functions.esaggs.inspector.dataRequest.title', {
              defaultMessage: 'Data'
            }), {
              description: _i18n.i18n.translate('data.functions.esaggs.inspector.dataRequest.description', {
                defaultMessage: 'This request queries Elasticsearch to fetch the data for the visualization.'
              })
            });
            request.stats((0, _utils.getRequestInspectorStats)(requestSearchSource));
            _context.prev = 19;
            _context.next = 22;
            return requestSearchSource.fetch({
              abortSignal: abortSignal
            });

          case 22:
            response = _context.sent;
            searchSource.lastQuery = queryHash;
            request.stats((0, _utils.getResponseInspectorStats)(searchSource, response)).ok({
              json: response
            });
            searchSource.rawResponse = response;
            _context.next = 32;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](19);
            // Log any error during request to the inspector
            request.error({
              json: _context.t0
            });
            throw _context.t0;

          case 32:
            _context.prev = 32;
            // Add the request body no matter if things went fine or not
            requestSearchSource.getSearchRequestBody().then(function (req) {
              request.json(req);
            });
            return _context.finish(32);

          case 35:
            // Note that rawResponse is not deeply cloned here, so downstream applications using courier
            // must take care not to mutate it, or it could have unintended side effects, e.g. displaying
            // response data incorrectly in the inspector.
            resp = searchSource.rawResponse;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 39;
            _iterator = aggs.aggs[Symbol.iterator]();

          case 41:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 50;
              break;
            }

            agg = _step.value;

            if (!(0, _lodash.has)(agg, 'type.postFlightRequest')) {
              _context.next = 47;
              break;
            }

            _context.next = 46;
            return agg.type.postFlightRequest(resp, aggs, agg, requestSearchSource, inspectorAdapters, abortSignal);

          case 46:
            resp = _context.sent;

          case 47:
            _iteratorNormalCompletion = true;
            _context.next = 41;
            break;

          case 50:
            _context.next = 56;
            break;

          case 52:
            _context.prev = 52;
            _context.t1 = _context["catch"](39);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 56:
            _context.prev = 56;
            _context.prev = 57;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 59:
            _context.prev = 59;

            if (!_didIteratorError) {
              _context.next = 62;
              break;
            }

            throw _iteratorError;

          case 62:
            return _context.finish(59);

          case 63:
            return _context.finish(56);

          case 64:
            searchSource.finalResponse = resp;
            parsedTimeRange = timeRange ? (0, _query.getTime)(aggs.indexPattern, timeRange) : null;
            tabifyParams = {
              metricsAtAllLevels: metricsAtAllLevels,
              partialRows: partialRows,
              timeRange: parsedTimeRange ? parsedTimeRange.range : undefined
            };
            tabifyCacheHash = (0, _public.calculateObjectHash)(_objectSpread({
              tabifyAggs: aggs
            }, tabifyParams)); // We only need to reexecute tabify, if either we did a new request or some input params to tabify changed

            shouldCalculateNewTabify = shouldQuery || searchSource.lastTabifyHash !== tabifyCacheHash;

            if (shouldCalculateNewTabify) {
              searchSource.lastTabifyHash = tabifyCacheHash;
              searchSource.tabifiedResponse = (0, _tabify.tabifyAggResponse)(aggs, searchSource.finalResponse, tabifyParams);
            }

            inspectorAdapters.data.setTabularLoader(function () {
              return (0, _build_tabular_inspector_data.buildTabularInspectorData)(searchSource.tabifiedResponse, filterManager);
            }, {
              returnsFormattedValues: true
            });
            return _context.abrupt("return", searchSource.tabifiedResponse);

          case 72:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[19, 28, 32, 35], [39, 52, 56, 64], [57,, 59, 63]]);
  }));

  return function handleCourierRequest(_x) {
    return _ref.apply(this, arguments);
  };
}();

var esaggs = function esaggs() {
  return {
    name: name,
    type: 'kibana_datatable',
    inputTypes: ['kibana_context', 'null'],
    help: _i18n.i18n.translate('data.functions.esaggs.help', {
      defaultMessage: 'Run AggConfig aggregation'
    }),
    args: {
      index: {
        types: ['string'],
        help: ''
      },
      metricsAtAllLevels: {
        types: ['boolean'],
        default: false,
        help: ''
      },
      partialRows: {
        types: ['boolean'],
        default: false,
        help: ''
      },
      includeFormatHints: {
        types: ['boolean'],
        default: false,
        help: ''
      },
      aggConfigs: {
        types: ['string'],
        default: '""',
        help: ''
      }
    },
    fn: function fn(input, args, _ref3) {
      var inspectorAdapters = _ref3.inspectorAdapters,
          abortSignal = _ref3.abortSignal;
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var indexPatterns, _getQueryService, filterManager, searchService, aggConfigsState, indexPattern, aggs, searchSource, response, table;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                indexPatterns = (0, _services.getIndexPatterns)();
                _getQueryService = (0, _services.getQueryService)(), filterManager = _getQueryService.filterManager;
                searchService = (0, _services.getSearchService)();
                aggConfigsState = JSON.parse(args.aggConfigs);
                _context2.next = 6;
                return indexPatterns.get(args.index);

              case 6:
                indexPattern = _context2.sent;
                aggs = searchService.aggs.createAggConfigs(indexPattern, aggConfigsState); // we should move searchSource creation inside courier request handler

                searchSource = new _search_source.SearchSource();
                searchSource.setField('index', indexPattern);
                searchSource.setField('size', 0);
                _context2.next = 13;
                return handleCourierRequest({
                  searchSource: searchSource,
                  aggs: aggs,
                  timeRange: (0, _lodash.get)(input, 'timeRange', undefined),
                  query: (0, _lodash.get)(input, 'query', undefined),
                  filters: (0, _lodash.get)(input, 'filters', undefined),
                  forceFetch: true,
                  metricsAtAllLevels: args.metricsAtAllLevels,
                  partialRows: args.partialRows,
                  inspectorAdapters: inspectorAdapters,
                  filterManager: filterManager,
                  abortSignal: abortSignal
                });

              case 13:
                response = _context2.sent;
                table = {
                  type: 'kibana_datatable',
                  rows: response.rows,
                  columns: response.columns.map(function (column) {
                    var cleanedColumn = {
                      id: column.id,
                      name: column.name,
                      meta: (0, _utils.serializeAggConfig)(column.aggConfig)
                    };

                    if (args.includeFormatHints) {
                      cleanedColumn.formatHint = (0, _common.serializeFieldFormat)(column.aggConfig);
                    }

                    return cleanedColumn;
                  })
                };
                return _context2.abrupt("return", table);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  };
};

exports.esaggs = esaggs;
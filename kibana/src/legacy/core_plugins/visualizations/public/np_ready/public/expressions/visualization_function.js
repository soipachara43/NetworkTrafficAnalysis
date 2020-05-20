"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visualization = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../plugins/visualizations/public");

var _services = require("../services");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var visualization = function visualization() {
  return {
    name: 'visualization',
    type: 'render',
    help: _i18n.i18n.translate('visualizations.functions.visualization.help', {
      defaultMessage: 'A simple visualization'
    }),
    args: {
      // TODO: Below `help` keys should be internationalized once this function
      // TODO: is moved to visualizations plugin.
      index: {
        types: ['string', 'null'],
        default: null,
        help: 'Index'
      },
      metricsAtAllLevels: {
        types: ['boolean'],
        default: false,
        help: 'Metrics levels'
      },
      partialRows: {
        types: ['boolean'],
        default: false,
        help: 'Partial rows'
      },
      type: {
        types: ['string'],
        default: '',
        help: 'Type'
      },
      schemas: {
        types: ['string'],
        default: '"{}"',
        help: 'Schemas'
      },
      visConfig: {
        types: ['string'],
        default: '"{}"',
        help: 'Visualization configuration'
      },
      uiState: {
        types: ['string'],
        default: '"{}"',
        help: 'User interface state'
      }
    },
    fn: function fn(input, args, _ref) {
      var inspectorAdapters = _ref.inspectorAdapters;
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var visConfigParams, schemas, visType, indexPattern, uiStateParams, uiState;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                visConfigParams = args.visConfig ? JSON.parse(args.visConfig) : {};
                schemas = args.schemas ? JSON.parse(args.schemas) : {};
                visType = (0, _services.getTypes)().get(args.type || 'histogram');

                if (!args.index) {
                  _context.next = 9;
                  break;
                }

                _context.next = 6;
                return (0, _services.getIndexPatterns)().get(args.index);

              case 6:
                _context.t0 = _context.sent;
                _context.next = 10;
                break;

              case 9:
                _context.t0 = null;

              case 10:
                indexPattern = _context.t0;
                uiStateParams = args.uiState ? JSON.parse(args.uiState) : {};
                uiState = new _public.PersistedState(uiStateParams);

                if (!(typeof visType.requestHandler === 'function')) {
                  _context.next = 17;
                  break;
                }

                _context.next = 16;
                return visType.requestHandler({
                  partialRows: args.partialRows,
                  metricsAtAllLevels: args.metricsAtAllLevels,
                  index: indexPattern,
                  visParams: visConfigParams,
                  timeRange: (0, _lodash.get)(input, 'timeRange', null),
                  query: (0, _lodash.get)(input, 'query', null),
                  filters: (0, _lodash.get)(input, 'filters', null),
                  uiState: uiState,
                  inspectorAdapters: inspectorAdapters,
                  queryFilter: (0, _services.getFilterManager)(),
                  forceFetch: true
                });

              case 16:
                input = _context.sent;

              case 17:
                if (!(typeof visType.responseHandler === 'function')) {
                  _context.next = 22;
                  break;
                }

                if (input.columns) {
                  // assign schemas to aggConfigs
                  input.columns.forEach(function (column) {
                    if (column.aggConfig) {
                      column.aggConfig.aggConfigs.schemas = visType.schemas.all;
                    }
                  });
                  Object.keys(schemas).forEach(function (key) {
                    schemas[key].forEach(function (i) {
                      if (input.columns[i] && input.columns[i].aggConfig) {
                        input.columns[i].aggConfig.schema = key;
                      }
                    });
                  });
                }

                _context.next = 21;
                return visType.responseHandler(input, visConfigParams.dimensions);

              case 21:
                input = _context.sent;

              case 22:
                return _context.abrupt("return", {
                  type: 'render',
                  as: 'visualization',
                  value: {
                    visData: input,
                    visType: args.type || '',
                    visConfig: visConfigParams
                  }
                });

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

exports.visualization = visualization;
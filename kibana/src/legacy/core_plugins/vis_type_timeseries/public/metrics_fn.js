"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMetricsFn = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../plugins/visualizations/public");

var _request_handler = require("./request_handler");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createMetricsFn = function createMetricsFn() {
  return {
    name: 'tsvb',
    type: 'render',
    inputTypes: ['kibana_context', 'null'],
    help: _i18n.i18n.translate('visTypeTimeseries.function.help', {
      defaultMessage: 'TSVB visualization'
    }),
    args: {
      params: {
        types: ['string'],
        default: '"{}"',
        help: ''
      },
      uiState: {
        types: ['string'],
        default: '"{}"',
        help: ''
      },
      savedObjectId: {
        types: ['null', 'string'],
        default: null,
        help: ''
      }
    },
    fn: function fn(input, args) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var params, uiStateParams, savedObjectId, uiState, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = JSON.parse(args.params);
                uiStateParams = JSON.parse(args.uiState);
                savedObjectId = args.savedObjectId;
                uiState = new _public.PersistedState(uiStateParams);
                _context.next = 6;
                return (0, _request_handler.metricsRequestHandler)({
                  timeRange: (0, _lodash.get)(input, 'timeRange', null),
                  query: (0, _lodash.get)(input, 'query', null),
                  filters: (0, _lodash.get)(input, 'filters', null),
                  visParams: params,
                  uiState: uiState,
                  savedObjectId: savedObjectId
                });

              case 6:
                response = _context.sent;
                response.visType = 'metrics';
                return _context.abrupt("return", {
                  type: 'render',
                  as: 'visualization',
                  value: {
                    uiState: uiState,
                    visType: 'metrics',
                    visConfig: params,
                    visData: response
                  }
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

exports.createMetricsFn = createMetricsFn;
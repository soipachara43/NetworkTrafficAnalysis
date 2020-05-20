"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVegaFn = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _vega_request_handler = require("./vega_request_handler");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createVegaFn = function createVegaFn(dependencies) {
  return {
    name: 'vega',
    type: 'render',
    inputTypes: ['kibana_context', 'null'],
    help: _i18n.i18n.translate('visTypeVega.function.help', {
      defaultMessage: 'Vega visualization'
    }),
    args: {
      spec: {
        types: ['string'],
        default: '',
        help: ''
      }
    },
    fn: function fn(input, args) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var vegaRequestHandler, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                vegaRequestHandler = (0, _vega_request_handler.createVegaRequestHandler)(dependencies);
                _context.next = 3;
                return vegaRequestHandler({
                  timeRange: (0, _lodash.get)(input, 'timeRange'),
                  query: (0, _lodash.get)(input, 'query'),
                  filters: (0, _lodash.get)(input, 'filters'),
                  visParams: {
                    spec: args.spec
                  }
                });

              case 3:
                response = _context.sent;
                return _context.abrupt("return", {
                  type: 'render',
                  as: 'visualization',
                  value: {
                    visData: response,
                    visType: 'vega',
                    visConfig: {
                      spec: args.spec
                    }
                  }
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

exports.createVegaFn = createVegaFn;
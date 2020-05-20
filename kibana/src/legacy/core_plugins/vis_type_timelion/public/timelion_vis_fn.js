"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelionVisualizationConfig = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _timelion_request_handler = require("./helpers/timelion_request_handler");

var _timelion_vis_type = require("./timelion_vis_type");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getTimelionVisualizationConfig = function getTimelionVisualizationConfig(dependencies) {
  return {
    name: 'timelion_vis',
    type: 'render',
    inputTypes: ['kibana_context', 'null'],
    help: _i18n.i18n.translate('timelion.function.help', {
      defaultMessage: 'Timelion visualization'
    }),
    args: {
      expression: {
        types: ['string'],
        aliases: ['_'],
        default: '".es(*)"',
        help: ''
      },
      interval: {
        types: ['string'],
        default: 'auto',
        help: ''
      }
    },
    fn: function fn(input, args) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var timelionRequestHandler, visParams, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                timelionRequestHandler = (0, _timelion_request_handler.getTimelionRequestHandler)(dependencies);
                visParams = {
                  expression: args.expression,
                  interval: args.interval
                };
                _context.next = 4;
                return timelionRequestHandler({
                  timeRange: (0, _lodash.get)(input, 'timeRange'),
                  query: (0, _lodash.get)(input, 'query'),
                  filters: (0, _lodash.get)(input, 'filters'),
                  visParams: visParams,
                  forceFetch: true
                });

              case 4:
                response = _context.sent;
                response.visType = _timelion_vis_type.TIMELION_VIS_NAME;
                return _context.abrupt("return", {
                  type: 'render',
                  as: 'visualization',
                  value: {
                    visParams: visParams,
                    visType: _timelion_vis_type.TIMELION_VIS_NAME,
                    visData: response
                  }
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

exports.getTimelionVisualizationConfig = getTimelionVisualizationConfig;
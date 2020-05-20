"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelionRequestHandler = getTimelionRequestHandler;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../plugins/data/public");

var _get_timezone = require("./get_timezone");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getTimelionRequestHandler(_ref) {
  var uiSettings = _ref.uiSettings,
      http = _ref.http,
      timefilter = _ref.timefilter;
  var timezone = (0, _get_timezone.getTimezone)(uiSettings);
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref3) {
        var timeRange, filters, query, visParams, expression, esQueryConfigs, timeRangeBounds, err;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                timeRange = _ref3.timeRange, filters = _ref3.filters, query = _ref3.query, visParams = _ref3.visParams;
                expression = visParams.expression;

                if (expression) {
                  _context.next = 4;
                  break;
                }

                throw new Error(_i18n.i18n.translate('timelion.emptyExpressionErrorMessage', {
                  defaultMessage: 'Timelion error: No expression provided'
                }));

              case 4:
                esQueryConfigs = _public.esQuery.getEsQueryConfig(uiSettings); // parse the time range client side to make sure it behaves like other charts

                timeRangeBounds = timefilter.calculateBounds(timeRange);
                _context.prev = 6;
                _context.next = 9;
                return http.post('../api/timelion/run', {
                  body: JSON.stringify({
                    sheet: [expression],
                    extended: {
                      es: {
                        filter: _public.esQuery.buildEsQuery(undefined, query, filters, esQueryConfigs)
                      }
                    },
                    time: {
                      from: timeRangeBounds.min,
                      to: timeRangeBounds.max,
                      interval: visParams.interval,
                      timezone: timezone
                    }
                  })
                });

              case 9:
                return _context.abrupt("return", _context.sent);

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](6);

                if (!(_context.t0 && _context.t0.body)) {
                  _context.next = 20;
                  break;
                }

                err = new Error("".concat(_i18n.i18n.translate('timelion.requestHandlerErrorTitle', {
                  defaultMessage: 'Timelion request error'
                }), ": ").concat(_context.t0.body.title, " ").concat(_context.t0.body.message));
                err.stack = _context.t0.stack;
                throw err;

              case 20:
                throw _context.t0;

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 12]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReporter = createReporter;

var _analytics = require("@kbn/analytics");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createReporter(config) {
  var localStorage = config.localStorage,
      debug = config.debug,
      fetch = config.fetch;
  return new _analytics.Reporter({
    debug: debug,
    storage: localStorage,
    http: function http(report) {
      return _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch.post('/api/ui_metric/report', {
                  body: JSON.stringify({
                    report: report
                  })
                });

              case 2:
                response = _context.sent;

                if (!(response.status !== 'ok')) {
                  _context.next = 5;
                  break;
                }

                throw Error('Unable to store report.');

              case 5:
                return _context.abrupt("return", response);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  });
}
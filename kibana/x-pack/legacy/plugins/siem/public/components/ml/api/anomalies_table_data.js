"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anomaliesTableData = void 0;

var _kibana = require("../../../lib/kibana");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var anomaliesTableData =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(body, signal) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _kibana.KibanaServices.get().http.fetch('/api/ml/results/anomalies_table_data', {
              method: 'POST',
              body: JSON.stringify(body),
              asSystemRequest: true,
              signal: signal
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function anomaliesTableData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.anomaliesTableData = anomaliesTableData;
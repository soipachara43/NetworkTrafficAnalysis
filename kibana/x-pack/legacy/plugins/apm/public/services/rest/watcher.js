"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWatch = createWatch;

var _callApi = require("./callApi");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createWatch(_x) {
  return _createWatch.apply(this, arguments);
}

function _createWatch() {
  _createWatch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var id, watch, http;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = _ref.id, watch = _ref.watch, http = _ref.http;
            return _context.abrupt("return", (0, _callApi.callApi)(http, {
              method: 'PUT',
              pathname: "/api/watcher/watch/".concat(id),
              body: {
                type: 'json',
                id: id,
                watch: watch
              }
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createWatch.apply(this, arguments);
}
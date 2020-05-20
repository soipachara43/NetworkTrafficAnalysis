"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;

var _store = require("./state/store");

var _initial_state = require("./state/initial_state");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createStore(_x, _x2) {
  return _createStore.apply(this, arguments);
}

function _createStore() {
  _createStore = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(core, plugins) {
    var initialState, basePath, serverFunctionsResponse, serverFunctions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            initialState = (0, _initial_state.getInitialState)();
            basePath = core.http.basePath.get(); // Retrieve server functions

            _context.next = 4;
            return core.http.get("/api/interpreter/fns");

          case 4:
            serverFunctionsResponse = _context.sent;
            serverFunctions = Object.values(serverFunctionsResponse);
            initialState.app = {
              basePath: basePath,
              serverFunctions: serverFunctions,
              ready: false
            };
            return _context.abrupt("return", (0, _store.createStore)(initialState));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createStore.apply(this, arguments);
}
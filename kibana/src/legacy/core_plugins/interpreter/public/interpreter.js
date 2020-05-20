"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpretAst = exports.getInterpreter = void 0;

require("uiExports/interpreter");

var _common = require("@kbn/interpreter/common");

var _new_platform = require("ui/new_platform");

var _registries = require("./registries");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Expose kbnInterpreter.register(specs) and kbnInterpreter.registries() globally so that plugins
// can register without a transpile step.
// TODO: This will be left behind in then legacy platform?
global.kbnInterpreter = Object.assign(global.kbnInterpreter || {}, (0, _common.registryFactory)(_registries.registries)); // TODO: This function will be left behind in the legacy platform.

var executorPromise;

var getInterpreter =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var executor;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!executorPromise) {
              executor = _new_platform.npSetup.plugins.expressions.__LEGACY.getExecutor();
              executorPromise = Promise.resolve(executor);
            }

            _context.next = 3;
            return executorPromise;

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getInterpreter() {
    return _ref.apply(this, arguments);
  };
}(); // TODO: This function will be left behind in the legacy platform.


exports.getInterpreter = getInterpreter;

var interpretAst =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(ast, context, handlers) {
    var _ref3, interpreter;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getInterpreter();

          case 2:
            _ref3 = _context2.sent;
            interpreter = _ref3.interpreter;
            _context2.next = 6;
            return interpreter.interpretAst(ast, context, handlers);

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function interpretAst(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.interpretAst = interpretAst;
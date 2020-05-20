"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpretAst = interpretAst;
exports.runInterpreter = runInterpreter;
exports.resetInterpreter = exports.initInterpreter = void 0;

var _common = require("@kbn/interpreter/common");

var _notify = require("./notify");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expressionsStarting;

var initInterpreter = function initInterpreter(expressionsStart, expressionsSetup) {
  expressionsStarting = startExpressions(expressionsStart, expressionsSetup);
  return expressionsStarting;
};

exports.initInterpreter = initInterpreter;

function startExpressions(_x, _x2) {
  return _startExpressions.apply(this, arguments);
}

function _startExpressions() {
  _startExpressions = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(expressionsStart, expressionsSetup) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return expressionsSetup.__LEGACY.loadLegacyServerFunctionWrappers();

          case 2:
            return _context.abrupt("return", expressionsStart);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _startExpressions.apply(this, arguments);
}

var resetInterpreter = function resetInterpreter() {
  expressionsStarting = undefined;
};

exports.resetInterpreter = resetInterpreter;

/**
 * Meant to be a replacement for plugins/interpreter/interpretAST
 */
function interpretAst(_x3) {
  return _interpretAst.apply(this, arguments);
}
/**
 * Runs interpreter, usually in the browser
 *
 * @param {object} ast - Executable AST
 * @param {any} input - Initial input for AST execution
 * @param {object} options
 * @param {boolean} options.castToRender - try to cast to a type: render object?
 * @returns {promise}
 */


function _interpretAst() {
  _interpretAst = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(ast) {
    var expressions;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (expressionsStarting) {
              _context2.next = 2;
              break;
            }

            throw new Error('Interpreter has not been initialized');

          case 2:
            _context2.next = 4;
            return expressionsStarting;

          case 4:
            expressions = _context2.sent;
            _context2.next = 7;
            return expressions.execute(ast).getData();

          case 7:
            return _context2.abrupt("return", _context2.sent);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _interpretAst.apply(this, arguments);
}

function runInterpreter(_x4, _x5) {
  return _runInterpreter.apply(this, arguments);
}

function _runInterpreter() {
  _runInterpreter = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(ast, input) {
    var options,
        expressions,
        renderable,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};

            if (expressionsStarting) {
              _context3.next = 3;
              break;
            }

            throw new Error('Interpreter has not been initialized');

          case 3:
            _context3.next = 5;
            return expressionsStarting;

          case 5:
            expressions = _context3.sent;
            _context3.prev = 6;
            _context3.next = 9;
            return expressions.execute(ast, input).getData();

          case 9:
            renderable = _context3.sent;

            if (!((0, _common.getType)(renderable) === 'render')) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", renderable);

          case 12:
            if (!options.castToRender) {
              _context3.next = 14;
              break;
            }

            return _context3.abrupt("return", runInterpreter((0, _common.fromExpression)('render'), renderable, {
              castToRender: false
            }));

          case 14:
            throw new Error("Ack! I don't know how to render a '".concat((0, _common.getType)(renderable), "'"));

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](6);

            _notify.notify.error(_context3.t0);

            throw _context3.t0;

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[6, 17]]);
  }));
  return _runInterpreter.apply(this, arguments);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasFullNameOutput = hasFullNameOutput;
exports.SayHelloAction = exports.SAY_HELLO_ACTION = void 0;

var _ui_actions = require("../../ui_actions");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Casting to ActionType is a hack - in a real situation use
// declare module and add this id to ActionContextMapping.
var SAY_HELLO_ACTION = 'SAY_HELLO_ACTION';
exports.SAY_HELLO_ACTION = SAY_HELLO_ACTION;

function hasFullNameOutput(embeddable) {
  return embeddable.getOutput().fullName !== undefined;
}

var SayHelloAction =
/*#__PURE__*/
function () {
  // Taking in a function, instead of always directly interacting with the dom,
  // can make testing the execute part of the action easier.
  function SayHelloAction(sayHello) {
    _classCallCheck(this, SayHelloAction);

    _defineProperty(this, "type", SAY_HELLO_ACTION);

    _defineProperty(this, "id", SAY_HELLO_ACTION);

    _defineProperty(this, "sayHello", void 0);

    this.sayHello = sayHello;
  }

  _createClass(SayHelloAction, [{
    key: "getDisplayName",
    value: function getDisplayName() {
      return 'Say hello';
    }
  }, {
    key: "getIconType",
    value: function getIconType() {
      return undefined;
    } // Can use typescript generics to get compiler time warnings for immediate feedback if
    // the context is not compatible.

  }, {
    key: "isCompatible",
    value: function () {
      var _isCompatible = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(context) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", hasFullNameOutput(context.embeddable));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function isCompatible(_x) {
        return _isCompatible.apply(this, arguments);
      }

      return isCompatible;
    }()
  }, {
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(context) {
        var greeting;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.isCompatible(context);

              case 2:
                if (_context2.sent) {
                  _context2.next = 4;
                  break;
                }

                throw new _ui_actions.IncompatibleActionError();

              case 4:
                greeting = "Hello, ".concat(context.embeddable.getOutput().fullName);

                if (context.message) {
                  this.sayHello("".concat(greeting, ".  ").concat(context.message));
                } else {
                  this.sayHello(greeting);
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function execute(_x2) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }]);

  return SayHelloAction;
}();

exports.SayHelloAction = SayHelloAction;
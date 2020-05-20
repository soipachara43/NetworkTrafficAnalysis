"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSendMessageAction = createSendMessageAction;
exports.ACTION_SEND_MESSAGE = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _ui_actions = require("../../ui_actions");

var _public = require("../../../../../kibana_react/public");

var _get_message_modal = require("./get_message_modal");

var _say_hello_action = require("./say_hello_action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Casting to ActionType is a hack - in a real situation use
// declare module and add this id to ActionContextMapping.
var ACTION_SEND_MESSAGE = 'ACTION_SEND_MESSAGE';
exports.ACTION_SEND_MESSAGE = ACTION_SEND_MESSAGE;

var isCompatible =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(context) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", (0, _say_hello_action.hasFullNameOutput)(context.embeddable));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isCompatible(_x) {
    return _ref.apply(this, arguments);
  };
}();

function createSendMessageAction(overlays) {
  var sendMessage =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(context, message) {
      var greeting, content;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              greeting = "Hello, ".concat(context.embeddable.getOutput().fullName);
              content = message ? "".concat(greeting, ". ").concat(message) : greeting;
              overlays.openFlyout((0, _public.toMountPoint)(_react.default.createElement(_eui.EuiFlyoutBody, null, content)));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function sendMessage(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  return (0, _ui_actions.createAction)({
    type: ACTION_SEND_MESSAGE,
    getDisplayName: function getDisplayName() {
      return 'Send message';
    },
    isCompatible: isCompatible,
    execute: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(context) {
        var modal;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return isCompatible(context);

              case 2:
                if (_context3.sent) {
                  _context3.next = 4;
                  break;
                }

                throw new _ui_actions.IncompatibleActionError();

              case 4:
                modal = overlays.openModal((0, _public.toMountPoint)(_react.default.createElement(_get_message_modal.GetMessageModal, {
                  onCancel: function onCancel() {
                    return modal.close();
                  },
                  onDone: function onDone(message) {
                    modal.close();
                    sendMessage(context, message);
                  }
                })));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function execute(_x4) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  });
}
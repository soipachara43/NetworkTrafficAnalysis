"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerInternal = void 0;

var _trigger_contract = require("./trigger_contract");

var _context_menu = require("../context_menu");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Internal representation of a trigger kept for consumption only internally
 * within `ui_actions` plugin.
 */
var TriggerInternal =
/*#__PURE__*/
function () {
  function TriggerInternal(service, trigger) {
    _classCallCheck(this, TriggerInternal);

    this.service = service;
    this.trigger = trigger;

    _defineProperty(this, "contract", new _trigger_contract.TriggerContract(this));
  }

  _createClass(TriggerInternal, [{
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(context) {
        var triggerId, actions;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                triggerId = this.trigger.id;
                _context.next = 3;
                return this.service.getTriggerCompatibleActions(triggerId, context);

              case 3:
                actions = _context.sent;

                if (actions.length) {
                  _context.next = 6;
                  break;
                }

                throw new Error("No compatible actions found to execute for trigger [triggerId = ".concat(triggerId, "]."));

              case 6:
                if (!(actions.length === 1)) {
                  _context.next = 10;
                  break;
                }

                _context.next = 9;
                return this.executeSingleAction(actions[0], context);

              case 9:
                return _context.abrupt("return");

              case 10:
                _context.next = 12;
                return this.executeMultipleActions(actions, context);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function execute(_x) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }, {
    key: "executeSingleAction",
    value: function () {
      var _executeSingleAction = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(action, context) {
        var href;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                href = action.getHref && action.getHref(context);

                if (!href) {
                  _context2.next = 4;
                  break;
                }

                window.location.href = href;
                return _context2.abrupt("return");

              case 4:
                _context2.next = 6;
                return action.execute(context);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function executeSingleAction(_x2, _x3) {
        return _executeSingleAction.apply(this, arguments);
      }

      return executeSingleAction;
    }()
  }, {
    key: "executeMultipleActions",
    value: function () {
      var _executeMultipleActions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(actions, context) {
        var panel, session;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _context_menu.buildContextMenuForActions)({
                  actions: actions,
                  actionContext: context,
                  closeMenu: function closeMenu() {
                    return session.close();
                  }
                });

              case 2:
                panel = _context3.sent;
                session = (0, _context_menu.openContextMenu)([panel]);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function executeMultipleActions(_x4, _x5) {
        return _executeMultipleActions.apply(this, arguments);
      }

      return executeMultipleActions;
    }()
  }]);

  return TriggerInternal;
}();

exports.TriggerInternal = TriggerInternal;
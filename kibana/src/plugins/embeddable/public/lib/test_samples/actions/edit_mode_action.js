"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEditModeAction = createEditModeAction;
exports.EDIT_MODE_ACTION = void 0;

var _ui_actions = require("../../ui_actions");

var _types = require("../../types");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Casting to ActionType is a hack - in a real situation use
// declare module and add this id to ActionContextMapping.
var EDIT_MODE_ACTION = 'EDIT_MODE_ACTION';
exports.EDIT_MODE_ACTION = EDIT_MODE_ACTION;

function createEditModeAction() {
  return (0, _ui_actions.createAction)({
    type: EDIT_MODE_ACTION,
    getDisplayName: function getDisplayName() {
      return 'I only show up in edit mode';
    },
    isCompatible: function () {
      var _isCompatible = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(context) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", context.embeddable.getInput().viewMode === _types.ViewMode.EDIT);

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
    }(),
    execute: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function execute() {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  });
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemovePanelAction = exports.REMOVE_PANEL_ACTION = void 0;

var _i18n = require("@kbn/i18n");

var _ui_actions = require("../../../ui_actions");

var _types = require("../../../types");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REMOVE_PANEL_ACTION = 'deletePanel';
exports.REMOVE_PANEL_ACTION = REMOVE_PANEL_ACTION;

function hasExpandedPanelInput(container) {
  return container.getInput().expandedPanelId !== undefined;
}

var RemovePanelAction =
/*#__PURE__*/
function () {
  function RemovePanelAction() {
    _classCallCheck(this, RemovePanelAction);

    _defineProperty(this, "type", REMOVE_PANEL_ACTION);

    _defineProperty(this, "id", REMOVE_PANEL_ACTION);

    _defineProperty(this, "order", 5);
  }

  _createClass(RemovePanelAction, [{
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('embeddableApi.panel.removePanel.displayName', {
        defaultMessage: 'Delete from dashboard'
      });
    }
  }, {
    key: "getIconType",
    value: function getIconType() {
      return 'trash';
    }
  }, {
    key: "isCompatible",
    value: function () {
      var _isCompatible = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var embeddable, isPanelExpanded;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                embeddable = _ref.embeddable;
                isPanelExpanded = embeddable.parent && hasExpandedPanelInput(embeddable.parent) && embeddable.parent.getInput().expandedPanelId === embeddable.id;
                return _context.abrupt("return", Boolean(embeddable.parent && embeddable.getInput().viewMode === _types.ViewMode.EDIT && !isPanelExpanded));

              case 3:
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
      regeneratorRuntime.mark(function _callee2(_ref2) {
        var embeddable;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                embeddable = _ref2.embeddable;
                _context2.t0 = !embeddable.parent;

                if (_context2.t0) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 5;
                return this.isCompatible({
                  embeddable: embeddable
                });

              case 5:
                _context2.t0 = !_context2.sent;

              case 6:
                if (!_context2.t0) {
                  _context2.next = 8;
                  break;
                }

                throw new _ui_actions.IncompatibleActionError();

              case 8:
                embeddable.parent.removeEmbeddable(embeddable.id);

              case 9:
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

  return RemovePanelAction;
}();

exports.RemovePanelAction = RemovePanelAction;
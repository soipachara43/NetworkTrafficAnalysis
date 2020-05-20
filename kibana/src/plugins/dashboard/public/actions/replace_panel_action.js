"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplacePanelAction = exports.ACTION_REPLACE_PANEL = void 0;

var _i18n = require("@kbn/i18n");

var _embeddable_plugin = require("../embeddable_plugin");

var _embeddable = require("../embeddable");

var _ui_actions_plugin = require("../ui_actions_plugin");

var _open_replace_panel_flyout = require("./open_replace_panel_flyout");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ACTION_REPLACE_PANEL = 'replacePanel';
exports.ACTION_REPLACE_PANEL = ACTION_REPLACE_PANEL;

function isDashboard(embeddable) {
  return embeddable.type === _embeddable.DASHBOARD_CONTAINER_TYPE;
}

var ReplacePanelAction =
/*#__PURE__*/
function () {
  function ReplacePanelAction(core, savedobjectfinder, notifications, getEmbeddableFactories) {
    _classCallCheck(this, ReplacePanelAction);

    this.core = core;
    this.savedobjectfinder = savedobjectfinder;
    this.notifications = notifications;
    this.getEmbeddableFactories = getEmbeddableFactories;

    _defineProperty(this, "type", ACTION_REPLACE_PANEL);

    _defineProperty(this, "id", ACTION_REPLACE_PANEL);

    _defineProperty(this, "order", 11);
  }

  _createClass(ReplacePanelAction, [{
    key: "getDisplayName",
    value: function getDisplayName(_ref) {
      var embeddable = _ref.embeddable;

      if (!embeddable.parent || !isDashboard(embeddable.parent)) {
        throw new _ui_actions_plugin.IncompatibleActionError();
      }

      return _i18n.i18n.translate('dashboard.panel.removePanel.replacePanel', {
        defaultMessage: 'Replace panel'
      });
    }
  }, {
    key: "getIconType",
    value: function getIconType(_ref2) {
      var embeddable = _ref2.embeddable;

      if (!embeddable.parent || !isDashboard(embeddable.parent)) {
        throw new _ui_actions_plugin.IncompatibleActionError();
      }

      return 'kqlOperand';
    }
  }, {
    key: "isCompatible",
    value: function () {
      var _isCompatible = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref3) {
        var embeddable;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                embeddable = _ref3.embeddable;

                if (!embeddable.getInput().viewMode) {
                  _context.next = 4;
                  break;
                }

                if (!(embeddable.getInput().viewMode === _embeddable_plugin.ViewMode.VIEW)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", false);

              case 4:
                return _context.abrupt("return", Boolean(embeddable.parent && isDashboard(embeddable.parent)));

              case 5:
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
      regeneratorRuntime.mark(function _callee2(_ref4) {
        var embeddable, view, dash;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                embeddable = _ref4.embeddable;

                if (!(!embeddable.parent || !isDashboard(embeddable.parent))) {
                  _context2.next = 3;
                  break;
                }

                throw new _ui_actions_plugin.IncompatibleActionError();

              case 3:
                view = embeddable;
                dash = embeddable.parent;
                (0, _open_replace_panel_flyout.openReplacePanelFlyout)({
                  embeddable: dash,
                  core: this.core,
                  savedObjectFinder: this.savedobjectfinder,
                  notifications: this.notifications,
                  panelToRemove: view,
                  getEmbeddableFactories: this.getEmbeddableFactories
                });

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

  return ReplacePanelAction;
}();

exports.ReplacePanelAction = ReplacePanelAction;
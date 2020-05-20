"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandPanelAction = exports.ACTION_EXPAND_PANEL = void 0;

var _i18n = require("@kbn/i18n");

var _ui_actions_plugin = require("../ui_actions_plugin");

var _embeddable = require("../embeddable");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ACTION_EXPAND_PANEL = 'togglePanel';
exports.ACTION_EXPAND_PANEL = ACTION_EXPAND_PANEL;

function isDashboard(embeddable) {
  return embeddable.type === _embeddable.DASHBOARD_CONTAINER_TYPE;
}

function isExpanded(embeddable) {
  if (!embeddable.parent || !isDashboard(embeddable.parent)) {
    throw new _ui_actions_plugin.IncompatibleActionError();
  }

  return embeddable.id === embeddable.parent.getInput().expandedPanelId;
}

var ExpandPanelAction =
/*#__PURE__*/
function () {
  function ExpandPanelAction() {
    _classCallCheck(this, ExpandPanelAction);

    _defineProperty(this, "type", ACTION_EXPAND_PANEL);

    _defineProperty(this, "id", ACTION_EXPAND_PANEL);

    _defineProperty(this, "order", 7);
  }

  _createClass(ExpandPanelAction, [{
    key: "getDisplayName",
    value: function getDisplayName(_ref) {
      var embeddable = _ref.embeddable;

      if (!embeddable.parent || !isDashboard(embeddable.parent)) {
        throw new _ui_actions_plugin.IncompatibleActionError();
      }

      return isExpanded(embeddable) ? _i18n.i18n.translate('dashboard.actions.toggleExpandPanelMenuItem.expandedDisplayName', {
        defaultMessage: 'Minimize'
      }) : _i18n.i18n.translate('dashboard.actions.toggleExpandPanelMenuItem.notExpandedDisplayName', {
        defaultMessage: 'Full screen'
      });
    }
  }, {
    key: "getIconType",
    value: function getIconType(_ref2) {
      var embeddable = _ref2.embeddable;

      if (!embeddable.parent || !isDashboard(embeddable.parent)) {
        throw new _ui_actions_plugin.IncompatibleActionError();
      } // TODO: use 'minimize' when an eui-icon of such is available.


      return isExpanded(embeddable) ? 'expand' : 'expand';
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
                return _context.abrupt("return", Boolean(embeddable.parent && isDashboard(embeddable.parent)));

              case 2:
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
        var embeddable, newValue;
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
                newValue = isExpanded(embeddable) ? undefined : embeddable.id;
                embeddable.parent.updateInput({
                  expandedPanelId: newValue
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function execute(_x2) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }]);

  return ExpandPanelAction;
}();

exports.ExpandPanelAction = ExpandPanelAction;
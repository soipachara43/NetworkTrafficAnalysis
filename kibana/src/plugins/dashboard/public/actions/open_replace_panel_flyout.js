"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openReplacePanelFlyout = openReplacePanelFlyout;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../plugins/kibana_react/public");

var _replace_panel_flyout = require("./replace_panel_flyout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function openReplacePanelFlyout(_x) {
  return _openReplacePanelFlyout.apply(this, arguments);
}

function _openReplacePanelFlyout() {
  _openReplacePanelFlyout = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options) {
    var embeddable, core, panelToRemove, savedObjectFinder, notifications, getEmbeddableFactories, flyoutSession;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            embeddable = options.embeddable, core = options.core, panelToRemove = options.panelToRemove, savedObjectFinder = options.savedObjectFinder, notifications = options.notifications, getEmbeddableFactories = options.getEmbeddableFactories;
            flyoutSession = core.overlays.openFlyout((0, _public.toMountPoint)(_react.default.createElement(_replace_panel_flyout.ReplacePanelFlyout, {
              container: embeddable,
              onClose: function onClose() {
                if (flyoutSession) {
                  flyoutSession.close();
                }
              },
              panelToRemove: panelToRemove,
              savedObjectsFinder: savedObjectFinder,
              notifications: notifications,
              getEmbeddableFactories: getEmbeddableFactories
            })), {
              'data-test-subj': 'replacePanelFlyout'
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _openReplacePanelFlyout.apply(this, arguments);
}
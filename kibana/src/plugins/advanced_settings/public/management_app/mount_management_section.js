"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountManagementSection = mountManagementSection;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRouterDom = require("react-router-dom");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _advanced_settings = require("./advanced_settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var title = _i18n.i18n.translate('advancedSettings.advancedSettingsLabel', {
  defaultMessage: 'Advanced Settings'
});

var crumb = [{
  text: title
}];
var readOnlyBadge = {
  text: _i18n.i18n.translate('advancedSettings.badge.readOnly.text', {
    defaultMessage: 'Read only'
  }),
  tooltip: _i18n.i18n.translate('advancedSettings.badge.readOnly.tooltip', {
    defaultMessage: 'Unable to save advanced settings'
  }),
  iconType: 'glasses'
};

function mountManagementSection(_x, _x2, _x3) {
  return _mountManagementSection.apply(this, arguments);
}

function _mountManagementSection() {
  _mountManagementSection = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(getStartServices, params, componentRegistry) {
    var _ref, _ref2, _ref2$, uiSettings, notifications, docLinks, application, chrome, canSave;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params.setBreadcrumbs(crumb);
            _context.next = 3;
            return getStartServices();

          case 3:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 1);
            _ref2$ = _ref2[0];
            uiSettings = _ref2$.uiSettings;
            notifications = _ref2$.notifications;
            docLinks = _ref2$.docLinks;
            application = _ref2$.application;
            chrome = _ref2$.chrome;
            canSave = application.capabilities.advancedSettings.save;

            if (!canSave) {
              chrome.setBadge(readOnlyBadge);
            }

            _reactDom.default.render(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_reactRouterDom.HashRouter, {
              basename: params.basePath
            }, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
              path: ['/:query', '/']
            }, _react.default.createElement(_advanced_settings.AdvancedSettings, {
              enableSaving: canSave,
              toasts: notifications.toasts,
              dockLinks: docLinks.links,
              uiSettings: uiSettings,
              componentRegistry: componentRegistry
            }))))), params.element);

            return _context.abrupt("return", function () {
              _reactDom.default.unmountComponentAtNode(params.element);
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _mountManagementSection.apply(this, arguments);
}
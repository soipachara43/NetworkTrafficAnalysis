"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.teardownCanvas = exports.initializeCanvas = exports.renderApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _reactRedux = require("react-redux");

var _app = require("./components/app");

var _public = require("../../../../../src/plugins/kibana_react/public");

var _run_interpreter = require("./lib/run_interpreter");

var _monaco_language_def = require("./lib/monaco_language_def");

var _registries = require("./registries");

var _documentation_links = require("./lib/documentation_links");

var _help_menu = require("./components/help_menu/help_menu");

var _store = require("./store");

var _public2 = require("../../../../../src/plugins/ui_actions/public");

var _value_click_action = require("../../../../../src/plugins/data/public/actions/value_click_action");

var _i18n2 = require("../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var strings = _i18n2.CapabilitiesStrings.ReadOnlyBadge;
var restoreAction;
var emptyAction = {
  id: 'empty-action',
  type: '',
  getDisplayName: function getDisplayName() {
    return 'empty action';
  },
  getIconType: function getIconType() {
    return undefined;
  },
  isCompatible: function () {
    var _isCompatible = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", true);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function isCompatible() {
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
              return _context2.abrupt("return", undefined);

            case 1:
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
};

var renderApp = function renderApp(coreStart, plugins, _ref, canvasStore) {
  var element = _ref.element;

  _reactDom.default.render(_react.default.createElement(_public.KibanaContextProvider, {
    services: _objectSpread({}, plugins, {}, coreStart)
  }, _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_reactRedux.Provider, {
    store: canvasStore
  }, _react.default.createElement(_app.App, null)))), element);

  return function () {
    return _reactDom.default.unmountComponentAtNode(element);
  };
};

exports.renderApp = renderApp;

var initializeCanvas =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(coreSetup, coreStart, setupPlugins, startPlugins, registries) {
    var canvasStore, action;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _store.createStore)(coreSetup, setupPlugins);

          case 2:
            canvasStore = _context3.sent;
            // Init Interpreter
            (0, _run_interpreter.initInterpreter)(startPlugins.expressions, setupPlugins.expressions).then(function () {
              (0, _monaco_language_def.registerLanguage)(Object.values(startPlugins.expressions.getFunctions()));
            }); // Init Registries

            (0, _registries.initRegistries)();
            (0, _registries.populateRegistries)(registries); // Set Badge

            coreStart.chrome.setBadge(coreStart.application.capabilities.canvas && coreStart.application.capabilities.canvas.save ? undefined : {
              text: strings.getText(),
              tooltip: strings.getTooltip(),
              iconType: 'glasses'
            }); // Set help extensions

            coreStart.chrome.setHelpExtension({
              appName: _i18n.i18n.translate('xpack.canvas.helpMenu.appName', {
                defaultMessage: 'Canvas'
              }),
              links: [{
                linkType: 'documentation',
                href: (0, _documentation_links.getDocumentationLinks)().canvas
              }],
              content: function content(domNode) {
                _reactDom.default.render(_react.default.createElement(_help_menu.HelpMenu, null), domNode);

                return function () {
                  return _reactDom.default.unmountComponentAtNode(domNode);
                };
              }
            }); // TODO: We need this to disable the filtering modal from popping up in lens embeds until
            // they honor the disableTriggers parameter

            action = startPlugins.uiActions.getAction(_value_click_action.ACTION_VALUE_CLICK);

            if (action) {
              restoreAction = action;
              startPlugins.uiActions.detachAction(_public2.VALUE_CLICK_TRIGGER, action.id);
              startPlugins.uiActions.attachAction(_public2.VALUE_CLICK_TRIGGER, emptyAction);
            }

            return _context3.abrupt("return", canvasStore);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function initializeCanvas(_x, _x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.initializeCanvas = initializeCanvas;

var teardownCanvas = function teardownCanvas(coreStart, startPlugins) {
  (0, _registries.destroyRegistries)();
  (0, _run_interpreter.resetInterpreter)();
  startPlugins.uiActions.detachAction(_public2.VALUE_CLICK_TRIGGER, emptyAction.id);

  if (restoreAction) {
    startPlugins.uiActions.attachAction(_public2.VALUE_CLICK_TRIGGER, restoreAction);
    restoreAction = undefined;
  }

  coreStart.chrome.setBadge(undefined);
  coreStart.chrome.setHelpExtension(undefined);
};

exports.teardownCanvas = teardownCanvas;
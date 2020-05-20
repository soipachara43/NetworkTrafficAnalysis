"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SiemApp = void 0;

var _history = require("history");

var _react = _interopRequireWildcard(require("react"));

var _reactApollo = require("react-apollo");

var _reactRedux = require("react-redux");

var _styledComponents = require("styled-components");

var _eui = require("@elastic/eui");

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _kibana = require("../lib/kibana");

var _public = require("../../../../../../src/plugins/kibana_utils/public");

var _constants = require("../../common/constants");

var _error_toast_dispatcher = require("../components/error_toast_dispatcher");

var _kibana_compose = require("../lib/compose/kibana_compose");

var _routes = require("../routes");

var _store = require("../store");

var _toasters = require("../components/toasters");

var _ml_capabilities_provider = require("../components/ml/permissions/ml_capabilities_provider");

var _apollo_context = require("../utils/apollo_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AppPluginRootComponent = function AppPluginRootComponent(_ref) {
  var theme = _ref.theme,
      store = _ref.store,
      apolloClient = _ref.apolloClient,
      history = _ref.history;
  return _react.default.createElement(_toasters.ManageGlobalToaster, null, _react.default.createElement(_reactRedux.Provider, {
    store: store
  }, _react.default.createElement(_reactApollo.ApolloProvider, {
    client: apolloClient
  }, _react.default.createElement(_apollo_context.ApolloClientContext.Provider, {
    value: apolloClient
  }, _react.default.createElement(_styledComponents.ThemeProvider, {
    theme: theme
  }, _react.default.createElement(_ml_capabilities_provider.MlCapabilitiesProvider, null, _react.default.createElement(_routes.PageRouter, {
    history: history
  }))), _react.default.createElement(_error_toast_dispatcher.ErrorToastDispatcher, null), _react.default.createElement(_toasters.GlobalToaster, null)))));
};

var AppPluginRoot = (0, _react.memo)(AppPluginRootComponent);

var StartAppComponent = function StartAppComponent(libs) {
  var i18n = (0, _kibana.useKibana)().services.i18n;
  var history = (0, _history.createHashHistory)();
  var libs$ = new _rxjs.BehaviorSubject(libs);
  var store = (0, _store.createStore)((0, _store.createInitialState)(), libs$.pipe((0, _operators.pluck)('apolloClient')));

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_DARK_MODE),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      darkMode = _useUiSetting$2[0];

  var theme = (0, _react.useMemo)(function () {
    return {
      eui: darkMode ? _eui_theme_dark.default : _eui_theme_light.default,
      darkMode: darkMode
    };
  }, [darkMode]);
  return _react.default.createElement(_eui.EuiErrorBoundary, null, _react.default.createElement(i18n.Context, null, _react.default.createElement(AppPluginRoot, {
    store: store,
    apolloClient: libs.apolloClient,
    history: history,
    theme: theme
  })));
};

var StartApp = (0, _react.memo)(StartAppComponent);

var SiemAppComponent = function SiemAppComponent(_ref2) {
  var core = _ref2.core,
      plugins = _ref2.plugins;
  return _react.default.createElement(_kibana.KibanaContextProvider, {
    services: _objectSpread({
      appName: 'siem',
      storage: new _public.Storage(localStorage)
    }, core, {}, plugins, {
      savedObjects: core.savedObjects
    })
  }, _react.default.createElement(StartApp, (0, _kibana_compose.compose)(core)));
};

var SiemApp = (0, _react.memo)(SiemAppComponent);
exports.SiemApp = SiemApp;
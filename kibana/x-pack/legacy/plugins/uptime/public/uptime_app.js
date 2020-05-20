"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UptimeApp = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _reactApollo = require("react-apollo");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _public = require("../../../../../src/plugins/kibana_react/public");

var _contexts = require("./contexts");

var _state = require("./state");

var _actions = require("./state/actions");

var _routes = require("./routes");

var _kibana_service = require("./state/kibana_service");

var _connected = require("./components/connected");

var _alerts = require("./components/functional/alerts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Application = function Application(props) {
  var basePath = props.basePath,
      canSave = props.canSave,
      client = props.client,
      core = props.core,
      darkMode = props.darkMode,
      i18nCore = props.i18n,
      plugins = props.plugins,
      renderGlobalHelpControls = props.renderGlobalHelpControls,
      routerBasename = props.routerBasename,
      setBadge = props.setBadge;
  (0, _react.useEffect)(function () {
    renderGlobalHelpControls();
    setBadge(!canSave ? {
      text: _i18n.i18n.translate('xpack.uptime.badge.readOnly.text', {
        defaultMessage: 'Read only'
      }),
      tooltip: _i18n.i18n.translate('xpack.uptime.badge.readOnly.tooltip', {
        defaultMessage: 'Unable to save'
      }),
      iconType: 'glasses'
    } : undefined);
  }, [canSave, renderGlobalHelpControls, setBadge]);
  _kibana_service.kibanaService.core = core; // @ts-ignore

  _state.store.dispatch((0, _actions.setBasePath)(basePath));

  return _react.default.createElement(_eui.EuiErrorBoundary, null, _react.default.createElement(i18nCore.Context, null, _react.default.createElement(_reactRedux.Provider, {
    store: _state.store
  }, _react.default.createElement(_public.KibanaContextProvider, {
    services: _objectSpread({}, core, {}, plugins)
  }, _react.default.createElement(_reactRouterDom.BrowserRouter, {
    basename: routerBasename
  }, _react.default.createElement(_reactApollo.ApolloProvider, {
    client: client
  }, _react.default.createElement(_contexts.UptimeRefreshContextProvider, null, _react.default.createElement(_contexts.UptimeSettingsContextProvider, props, _react.default.createElement(_contexts.UptimeThemeContextProvider, {
    darkMode: darkMode
  }, _react.default.createElement(_alerts.UptimeAlertsContextProvider, null, _react.default.createElement(_eui.EuiPage, {
    className: "app-wrapper-panel ",
    "data-test-subj": "uptimeApp"
  }, _react.default.createElement("main", null, _react.default.createElement(_connected.UptimeAlertsFlyoutWrapper, {
    alertTypeId: "xpack.uptime.alerts.monitorStatus",
    canChangeTrigger: false
  }), _react.default.createElement(_routes.PageRouter, {
    autocomplete: plugins.data.autocomplete
  })))))))))))));
};

var UptimeApp = function UptimeApp(props) {
  return _react.default.createElement(Application, props);
};

exports.UptimeApp = UptimeApp;
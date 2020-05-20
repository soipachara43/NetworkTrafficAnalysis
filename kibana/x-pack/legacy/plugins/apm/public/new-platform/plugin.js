"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApmPlugin = exports.REACT_APP_ROOT_ID = void 0;

var _apmRumReact = require("@elastic/apm-rum-react");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _alert_types = require("../../../../../plugins/apm/common/alert_types");

var _public2 = require("../../../../../plugins/triggers_actions_ui/public");

var _APMIndicesPermission = require("../components/app/APMIndicesPermission");

var _route_config = require("../components/app/Main/route_config");

var _ScrollToTopOnPathChange = require("../components/app/Main/ScrollToTopOnPathChange");

var _UpdateBreadcrumbs = require("../components/app/Main/UpdateBreadcrumbs");

var _ErrorRateAlertTrigger = require("../components/shared/ErrorRateAlertTrigger");

var _TransactionDurationAlertTrigger = require("../components/shared/TransactionDurationAlertTrigger");

var _ApmPluginContext = require("../context/ApmPluginContext");

var _LicenseContext = require("../context/LicenseContext");

var _LoadingIndicatorContext = require("../context/LoadingIndicatorContext");

var _LocationContext = require("../context/LocationContext");

var _MatchedRouteContext = require("../context/MatchedRouteContext");

var _UrlParamsContext = require("../context/UrlParamsContext");

var _createCallApmApi = require("../services/rest/createCallApmApi");

var _index_pattern = require("../services/rest/index_pattern");

var _variables = require("../style/variables");

var _history = require("../utils/history");

var _featureCatalogueEntry = require("./featureCatalogueEntry");

var _getConfigFromInjectedMetadata = require("./getConfigFromInjectedMetadata");

var _setHelpExtension = require("./setHelpExtension");

var _toggleAppLinkInNav = require("./toggleAppLinkInNav");

var _updateBadge = require("./updateBadge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var REACT_APP_ROOT_ID = 'react-apm-root';
exports.REACT_APP_ROOT_ID = REACT_APP_ROOT_ID;

var MainContainer = _styledComponents.default.div.withConfig({
  displayName: "MainContainer",
  componentId: "sc-1pgjfdb-0"
})(["min-width:", ";padding:", ";height:100%;"], (0, _variables.px)(_variables.unit * 50), (0, _variables.px)(_variables.units.plus));

var App = function App() {
  return _react.default.createElement(MainContainer, {
    "data-test-subj": "apmMainContainer",
    role: "main"
  }, _react.default.createElement(_UpdateBreadcrumbs.UpdateBreadcrumbs, {
    routes: _route_config.routes
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _ScrollToTopOnPathChange.ScrollToTopOnPathChange
  }), _react.default.createElement(_APMIndicesPermission.APMIndicesPermission, null, _react.default.createElement(_reactRouterDom.Switch, null, _route_config.routes.map(function (route, i) {
    return _react.default.createElement(_apmRumReact.ApmRoute, _extends({
      key: i
    }, route));
  }))));
};

var ApmPlugin =
/*#__PURE__*/
function () {
  // When we switch over from the old platform to new platform the plugins will
  // be coming from setup instead of start, since that's where we do
  // `core.application.register`. During the transitions we put plugins on an
  // instance property so we can use it in start.
  function ApmPlugin(initializerContext) {
    _classCallCheck(this, ApmPlugin);

    this.initializerContext = initializerContext;

    _defineProperty(this, "setupPlugins", {});
  } // Take the DOM element as the constructor, so we can mount the app.


  _createClass(ApmPlugin, [{
    key: "setup",
    value: function setup(_core, plugins) {
      plugins.home.featureCatalogue.register(_featureCatalogueEntry.featureCatalogueEntry);
      this.setupPlugins = plugins;
    }
  }, {
    key: "start",
    value: function start(core) {
      var i18nCore = core.i18n;
      var plugins = this.setupPlugins;
      (0, _createCallApmApi.createCallApmApi)(core.http); // Once we're actually an NP plugin we'll get the config from the
      // initializerContext like:
      //
      //     const config = this.initializerContext.config.get<ConfigSchema>();
      //
      // Until then we use a shim to get it from legacy injectedMetadata:

      var config = (0, _getConfigFromInjectedMetadata.getConfigFromInjectedMetadata)(); // render APM feedback link in global help menu

      (0, _setHelpExtension.setHelpExtension)(core);
      (0, _updateBadge.setReadonlyBadge)(core);
      (0, _toggleAppLinkInNav.toggleAppLinkInNav)(core, config);
      var apmPluginContextValue = {
        config: config,
        core: core,
        plugins: plugins
      };
      plugins.triggers_actions_ui.alertTypeRegistry.register({
        id: _alert_types.AlertType.ErrorRate,
        name: _i18n.i18n.translate('xpack.apm.alertTypes.errorRate', {
          defaultMessage: 'Error rate'
        }),
        iconClass: 'bell',
        alertParamsExpression: _ErrorRateAlertTrigger.ErrorRateAlertTrigger,
        validate: function validate() {
          return {
            errors: []
          };
        }
      });
      plugins.triggers_actions_ui.alertTypeRegistry.register({
        id: _alert_types.AlertType.TransactionDuration,
        name: _i18n.i18n.translate('xpack.apm.alertTypes.transactionDuration', {
          defaultMessage: 'Transaction duration'
        }),
        iconClass: 'bell',
        alertParamsExpression: _TransactionDurationAlertTrigger.TransactionDurationAlertTrigger,
        validate: function validate() {
          return {
            errors: []
          };
        }
      });

      _reactDom.default.render(_react.default.createElement(_ApmPluginContext.ApmPluginContext.Provider, {
        value: apmPluginContextValue
      }, _react.default.createElement(_public2.AlertsContextProvider, {
        value: {
          http: core.http,
          docLinks: core.docLinks,
          toastNotifications: core.notifications.toasts,
          actionTypeRegistry: plugins.triggers_actions_ui.actionTypeRegistry,
          alertTypeRegistry: plugins.triggers_actions_ui.alertTypeRegistry
        }
      }, _react.default.createElement(_public.KibanaContextProvider, {
        services: _objectSpread({}, core, {}, plugins)
      }, _react.default.createElement(i18nCore.Context, null, _react.default.createElement(_reactRouterDom.Router, {
        history: _history.history
      }, _react.default.createElement(_LocationContext.LocationProvider, null, _react.default.createElement(_MatchedRouteContext.MatchedRouteProvider, {
        routes: _route_config.routes
      }, _react.default.createElement(_UrlParamsContext.UrlParamsProvider, null, _react.default.createElement(_LoadingIndicatorContext.LoadingIndicatorProvider, null, _react.default.createElement(_LicenseContext.LicenseProvider, null, _react.default.createElement(App, null))))))))))), document.getElementById(REACT_APP_ROOT_ID)); // create static index pattern and store as saved object. Not needed by APM UI but for legacy reasons in Discover, Dashboard etc.


      (0, _index_pattern.createStaticIndexPattern)().catch(function (e) {
        // eslint-disable-next-line no-console
        console.log('Error fetching static index pattern', e);
      });
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return ApmPlugin;
}();

exports.ApmPlugin = ApmPlugin;
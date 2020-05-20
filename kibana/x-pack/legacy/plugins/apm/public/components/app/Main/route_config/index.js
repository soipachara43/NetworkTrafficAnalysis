"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _service_nodes = require("../../../../../../../../plugins/apm/common/service_nodes");

var _ErrorGroupDetails = require("../../ErrorGroupDetails");

var _ServiceDetails = require("../../ServiceDetails");

var _TransactionDetails = require("../../TransactionDetails");

var _Home = require("../../Home");

var _route_names = require("./route_names");

var _Settings = require("../../Settings");

var _AgentConfigurations = require("../../Settings/AgentConfigurations");

var _ApmIndices = require("../../Settings/ApmIndices");

var _url_helpers = require("../../../shared/Links/url_helpers");

var _ServiceNodeMetrics = require("../../ServiceNodeMetrics");

var _resolveUrlParams2 = require("../../../../context/UrlParamsContext/resolveUrlParams");

var _i18n2 = require("../../../../../../../../plugins/apm/common/i18n");

var _TraceLink = require("../../TraceLink");

var _CustomizeUI = require("../../Settings/CustomizeUI");

var _agent_configuration = require("./route_handlers/agent_configuration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var metricsBreadcrumb = _i18n.i18n.translate('xpack.apm.breadcrumb.metricsTitle', {
  defaultMessage: 'Metrics'
});

var renderAsRedirectTo = function renderAsRedirectTo(to) {
  return function (_ref) {
    var location = _ref.location;
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: _objectSpread({}, location, {
        pathname: to
      })
    });
  };
};

var routes = [{
  exact: true,
  path: '/',
  render: renderAsRedirectTo('/services'),
  breadcrumb: 'APM',
  name: _route_names.RouteName.HOME
}, {
  exact: true,
  path: '/services',
  component: function component() {
    return _react.default.createElement(_Home.Home, {
      tab: "services"
    });
  },
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.servicesTitle', {
    defaultMessage: 'Services'
  }),
  name: _route_names.RouteName.SERVICES
}, {
  exact: true,
  path: '/traces',
  component: function component() {
    return _react.default.createElement(_Home.Home, {
      tab: "traces"
    });
  },
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.tracesTitle', {
    defaultMessage: 'Traces'
  }),
  name: _route_names.RouteName.TRACES
}, {
  exact: true,
  path: '/settings',
  render: renderAsRedirectTo('/settings/agent-configuration'),
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.listSettingsTitle', {
    defaultMessage: 'Settings'
  }),
  name: _route_names.RouteName.SETTINGS
}, {
  exact: true,
  path: '/settings/apm-indices',
  component: function component() {
    return _react.default.createElement(_Settings.Settings, null, _react.default.createElement(_ApmIndices.ApmIndices, null));
  },
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.settings.indicesTitle', {
    defaultMessage: 'Indices'
  }),
  name: _route_names.RouteName.INDICES
}, {
  exact: true,
  path: '/settings/agent-configuration',
  component: function component() {
    return _react.default.createElement(_Settings.Settings, null, _react.default.createElement(_AgentConfigurations.AgentConfigurations, null));
  },
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.settings.agentConfigurationTitle', {
    defaultMessage: 'Agent Configuration'
  }),
  name: _route_names.RouteName.AGENT_CONFIGURATION
}, {
  exact: true,
  path: '/settings/agent-configuration/create',
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.settings.createAgentConfigurationTitle', {
    defaultMessage: 'Create Agent Configuration'
  }),
  name: _route_names.RouteName.AGENT_CONFIGURATION_CREATE,
  component: function component() {
    return _react.default.createElement(_agent_configuration.CreateAgentConfigurationRouteHandler, null);
  }
}, {
  exact: true,
  path: '/settings/agent-configuration/edit',
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.settings.editAgentConfigurationTitle', {
    defaultMessage: 'Edit Agent Configuration'
  }),
  name: _route_names.RouteName.AGENT_CONFIGURATION_EDIT,
  component: function component() {
    return _react.default.createElement(_agent_configuration.EditAgentConfigurationRouteHandler, null);
  }
}, {
  exact: true,
  path: '/services/:serviceName',
  breadcrumb: function breadcrumb(_ref2) {
    var match = _ref2.match;
    return match.params.serviceName;
  },
  render: function render(props) {
    return renderAsRedirectTo("/services/".concat(props.match.params.serviceName, "/transactions"))(props);
  },
  name: _route_names.RouteName.SERVICE
}, // errors
{
  exact: true,
  path: '/services/:serviceName/errors/:groupId',
  component: _ErrorGroupDetails.ErrorGroupDetails,
  breadcrumb: function breadcrumb(_ref3) {
    var match = _ref3.match;
    return match.params.groupId;
  },
  name: _route_names.RouteName.ERROR
}, {
  exact: true,
  path: '/services/:serviceName/errors',
  component: function component() {
    return _react.default.createElement(_ServiceDetails.ServiceDetails, {
      tab: "errors"
    });
  },
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.errorsTitle', {
    defaultMessage: 'Errors'
  }),
  name: _route_names.RouteName.ERRORS
}, // transactions
{
  exact: true,
  path: '/services/:serviceName/transactions',
  component: function component() {
    return _react.default.createElement(_ServiceDetails.ServiceDetails, {
      tab: "transactions"
    });
  },
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.transactionsTitle', {
    defaultMessage: 'Transactions'
  }),
  name: _route_names.RouteName.TRANSACTIONS
}, // metrics
{
  exact: true,
  path: '/services/:serviceName/metrics',
  component: function component() {
    return _react.default.createElement(_ServiceDetails.ServiceDetails, {
      tab: "metrics"
    });
  },
  breadcrumb: metricsBreadcrumb,
  name: _route_names.RouteName.METRICS
}, // service nodes, only enabled for java agents for now
{
  exact: true,
  path: '/services/:serviceName/nodes',
  component: function component() {
    return _react.default.createElement(_ServiceDetails.ServiceDetails, {
      tab: "nodes"
    });
  },
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.nodesTitle', {
    defaultMessage: 'JVMs'
  }),
  name: _route_names.RouteName.SERVICE_NODES
}, // node metrics
{
  exact: true,
  path: '/services/:serviceName/nodes/:serviceNodeName/metrics',
  component: function component() {
    return _react.default.createElement(_ServiceNodeMetrics.ServiceNodeMetrics, null);
  },
  breadcrumb: function breadcrumb(_ref4) {
    var location = _ref4.location;

    var _resolveUrlParams = (0, _resolveUrlParams2.resolveUrlParams)(location, {}),
        serviceNodeName = _resolveUrlParams.serviceNodeName;

    if (serviceNodeName === _service_nodes.SERVICE_NODE_NAME_MISSING) {
      return _i18n2.UNIDENTIFIED_SERVICE_NODES_LABEL;
    }

    return serviceNodeName || '';
  },
  name: _route_names.RouteName.SERVICE_NODE_METRICS
}, {
  exact: true,
  path: '/services/:serviceName/transactions/view',
  component: _TransactionDetails.TransactionDetails,
  breadcrumb: function breadcrumb(_ref5) {
    var location = _ref5.location;
    var query = (0, _url_helpers.toQuery)(location.search);
    return query.transactionName;
  },
  name: _route_names.RouteName.TRANSACTION_NAME
}, {
  exact: true,
  path: '/link-to/trace/:traceId',
  component: _TraceLink.TraceLink,
  breadcrumb: null,
  name: _route_names.RouteName.LINK_TO_TRACE
}, {
  exact: true,
  path: '/service-map',
  component: function component() {
    return _react.default.createElement(_Home.Home, {
      tab: "service-map"
    });
  },
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.serviceMapTitle', {
    defaultMessage: 'Service Map'
  }),
  name: _route_names.RouteName.SERVICE_MAP
}, {
  exact: true,
  path: '/services/:serviceName/service-map',
  component: function component() {
    return _react.default.createElement(_ServiceDetails.ServiceDetails, {
      tab: "service-map"
    });
  },
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.serviceMapTitle', {
    defaultMessage: 'Service Map'
  }),
  name: _route_names.RouteName.SINGLE_SERVICE_MAP
}, {
  exact: true,
  path: '/settings/customize-ui',
  component: function component() {
    return _react.default.createElement(_Settings.Settings, null, _react.default.createElement(_CustomizeUI.CustomizeUI, null));
  },
  breadcrumb: _i18n.i18n.translate('xpack.apm.breadcrumb.settings.customizeUI', {
    defaultMessage: 'Customize UI'
  }),
  name: _route_names.RouteName.CUSTOMIZE_UI
}];
exports.routes = routes;
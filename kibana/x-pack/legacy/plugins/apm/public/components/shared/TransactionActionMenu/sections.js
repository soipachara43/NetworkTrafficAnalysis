"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSections = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _url = _interopRequireDefault(require("url"));

var _DiscoverLink = require("../Links/DiscoverLinks/DiscoverLink");

var _DiscoverTransactionLink = require("../Links/DiscoverLinks/DiscoverTransactionLink");

var _InfraLink = require("../Links/InfraLink");

var _url_helpers = require("../Links/url_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getInfraMetricsQuery(transaction) {
  var timestamp = new Date(transaction['@timestamp']).getTime();

  var fiveMinutes = _moment.default.duration(5, 'minutes').asMilliseconds();

  return {
    from: timestamp - fiveMinutes,
    to: timestamp + fiveMinutes
  };
}

var getSections = function getSections(_ref) {
  var _transaction$host, _transaction$kubernet, _transaction$containe, _transaction$url, _transaction$url2;

  var transaction = _ref.transaction,
      basePath = _ref.basePath,
      location = _ref.location,
      urlParams = _ref.urlParams;
  var hostName = (_transaction$host = transaction.host) === null || _transaction$host === void 0 ? void 0 : _transaction$host.hostname;
  var podId = (_transaction$kubernet = transaction.kubernetes) === null || _transaction$kubernet === void 0 ? void 0 : _transaction$kubernet.pod.uid;
  var containerId = (_transaction$containe = transaction.container) === null || _transaction$containe === void 0 ? void 0 : _transaction$containe.id;
  var time = Math.round(transaction.timestamp.us / 1000);
  var infraMetricsQuery = getInfraMetricsQuery(transaction);

  var uptimeLink = _url.default.format({
    pathname: basePath.prepend('/app/uptime'),
    hash: "/?".concat((0, _url_helpers.fromQuery)((0, _lodash.pick)({
      dateRangeStart: urlParams.rangeFrom,
      dateRangeEnd: urlParams.rangeTo,
      search: "url.domain:\"".concat((_transaction$url = transaction.url) === null || _transaction$url === void 0 ? void 0 : _transaction$url.domain, "\"")
    }, function (val) {
      return !(0, _lodash.isEmpty)(val);
    })))
  });

  var podActions = [{
    key: 'podLogs',
    label: _i18n.i18n.translate('xpack.apm.transactionActionMenu.showPodLogsLinkLabel', {
      defaultMessage: 'Pod logs'
    }),
    href: (0, _InfraLink.getInfraHref)({
      app: 'logs',
      basePath: basePath,
      path: "/link-to/pod-logs/".concat(podId),
      query: {
        time: time
      }
    }),
    condition: !!podId
  }, {
    key: 'podMetrics',
    label: _i18n.i18n.translate('xpack.apm.transactionActionMenu.showPodMetricsLinkLabel', {
      defaultMessage: 'Pod metrics'
    }),
    href: (0, _InfraLink.getInfraHref)({
      app: 'metrics',
      basePath: basePath,
      path: "/link-to/pod-detail/".concat(podId),
      query: infraMetricsQuery
    }),
    condition: !!podId
  }];
  var containerActions = [{
    key: 'containerLogs',
    label: _i18n.i18n.translate('xpack.apm.transactionActionMenu.showContainerLogsLinkLabel', {
      defaultMessage: 'Container logs'
    }),
    href: (0, _InfraLink.getInfraHref)({
      app: 'logs',
      basePath: basePath,
      path: "/link-to/container-logs/".concat(containerId),
      query: {
        time: time
      }
    }),
    condition: !!containerId
  }, {
    key: 'containerMetrics',
    label: _i18n.i18n.translate('xpack.apm.transactionActionMenu.showContainerMetricsLinkLabel', {
      defaultMessage: 'Container metrics'
    }),
    href: (0, _InfraLink.getInfraHref)({
      app: 'metrics',
      basePath: basePath,
      path: "/link-to/container-detail/".concat(containerId),
      query: infraMetricsQuery
    }),
    condition: !!containerId
  }];
  var hostActions = [{
    key: 'hostLogs',
    label: _i18n.i18n.translate('xpack.apm.transactionActionMenu.showHostLogsLinkLabel', {
      defaultMessage: 'Host logs'
    }),
    href: (0, _InfraLink.getInfraHref)({
      app: 'logs',
      basePath: basePath,
      path: "/link-to/host-logs/".concat(hostName),
      query: {
        time: time
      }
    }),
    condition: !!hostName
  }, {
    key: 'hostMetrics',
    label: _i18n.i18n.translate('xpack.apm.transactionActionMenu.showHostMetricsLinkLabel', {
      defaultMessage: 'Host metrics'
    }),
    href: (0, _InfraLink.getInfraHref)({
      app: 'metrics',
      basePath: basePath,
      path: "/link-to/host-detail/".concat(hostName),
      query: infraMetricsQuery
    }),
    condition: !!hostName
  }];
  var logActions = [{
    key: 'traceLogs',
    label: _i18n.i18n.translate('xpack.apm.transactionActionMenu.showTraceLogsLinkLabel', {
      defaultMessage: 'Trace logs'
    }),
    href: (0, _InfraLink.getInfraHref)({
      app: 'logs',
      basePath: basePath,
      path: "/link-to/logs",
      query: {
        time: time,
        filter: "trace.id:\"".concat(transaction.trace.id, "\" OR ").concat(transaction.trace.id)
      }
    }),
    condition: true
  }];
  var uptimeActions = [{
    key: 'monitorStatus',
    label: _i18n.i18n.translate('xpack.apm.transactionActionMenu.viewInUptime', {
      defaultMessage: 'Status'
    }),
    href: uptimeLink,
    condition: !!((_transaction$url2 = transaction.url) === null || _transaction$url2 === void 0 ? void 0 : _transaction$url2.domain)
  }];
  var kibanaActions = [{
    key: 'sampleDocument',
    label: _i18n.i18n.translate('xpack.apm.transactionActionMenu.viewSampleDocumentLinkLabel', {
      defaultMessage: 'View sample document'
    }),
    href: (0, _DiscoverLink.getDiscoverHref)({
      basePath: basePath,
      query: (0, _DiscoverTransactionLink.getDiscoverQuery)(transaction),
      location: location
    }),
    condition: true
  }];
  var sectionRecord = {
    observability: [{
      key: 'podDetails',
      title: _i18n.i18n.translate('xpack.apm.transactionActionMenu.pod.title', {
        defaultMessage: 'Pod details'
      }),
      subtitle: _i18n.i18n.translate('xpack.apm.transactionActionMenu.pod.subtitle', {
        defaultMessage: 'View logs and metrics for this pod to get further details.'
      }),
      actions: podActions
    }, {
      key: 'containerDetails',
      title: _i18n.i18n.translate('xpack.apm.transactionActionMenu.container.title', {
        defaultMessage: 'Container details'
      }),
      subtitle: _i18n.i18n.translate('xpack.apm.transactionActionMenu.container.subtitle', {
        defaultMessage: 'View logs and metrics for this container to get further details.'
      }),
      actions: containerActions
    }, {
      key: 'hostDetails',
      title: _i18n.i18n.translate('xpack.apm.transactionActionMenu.host.title', {
        defaultMessage: 'Host details'
      }),
      subtitle: _i18n.i18n.translate('xpack.apm.transactionActionMenu.host.subtitle', {
        defaultMessage: 'View host logs and metrics to get further details.'
      }),
      actions: hostActions
    }, {
      key: 'traceDetails',
      title: _i18n.i18n.translate('xpack.apm.transactionActionMenu.trace.title', {
        defaultMessage: 'Trace details'
      }),
      subtitle: _i18n.i18n.translate('xpack.apm.transactionActionMenu.trace.subtitle', {
        defaultMessage: 'View trace logs to get further details.'
      }),
      actions: logActions
    }, {
      key: 'statusDetails',
      title: _i18n.i18n.translate('xpack.apm.transactionActionMenu.status.title', {
        defaultMessage: 'Status details'
      }),
      subtitle: _i18n.i18n.translate('xpack.apm.transactionActionMenu.status.subtitle', {
        defaultMessage: 'View status to get further details.'
      }),
      actions: uptimeActions
    }],
    kibana: [{
      key: 'kibana',
      actions: kibanaActions
    }]
  }; // Filter out actions that shouldnt be shown and sections without any actions.

  return Object.values(sectionRecord).map(function (sections) {
    return sections.map(function (section) {
      return _objectSpread({}, section, {
        actions: section.actions.filter(function (action) {
          return action.condition;
        })
      });
    }).filter(function (section) {
      return !(0, _lodash.isEmpty)(section.actions);
    });
  }).filter(function (sections) {
    return !(0, _lodash.isEmpty)(sections);
  });
};

exports.getSections = getSections;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntegrationGroup = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _react2 = require("@kbn/i18n/react");

var _integration_link = require("./integration_link");

var _helper = require("../../../../lib/helper");

var _contexts = require("../../../../contexts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var IntegrationGroup = function IntegrationGroup(_ref) {
  var summary = _ref.summary;

  var _useContext = (0, _react.useContext)(_contexts.UptimeSettingsContext),
      basePath = _useContext.basePath,
      dateRangeStart = _useContext.dateRangeStart,
      dateRangeEnd = _useContext.dateRangeEnd,
      isApmAvailable = _useContext.isApmAvailable,
      isInfraAvailable = _useContext.isInfraAvailable,
      isLogsAvailable = _useContext.isLogsAvailable;

  var domain = (0, _lodash.get)(summary, 'state.url.domain', '');
  var podUid = (0, _lodash.get)(summary, 'state.checks[0].kubernetes.pod.uid', undefined);
  var containerId = (0, _lodash.get)(summary, 'state.checks[0].container.id', undefined);
  var ip = (0, _lodash.get)(summary, 'state.checks[0].monitor.ip', undefined);
  return isApmAvailable || isInfraAvailable || isLogsAvailable ? _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column"
  }, isApmAvailable ? _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_integration_link.IntegrationLink, {
    ariaLabel: _i18n.i18n.translate('xpack.uptime.apmIntegrationAction.description', {
      defaultMessage: 'Search APM for this monitor',
      description: 'This value is shown to users when they hover over an icon that will take them to the APM app.'
    }),
    href: (0, _helper.getApmHref)(summary, basePath, dateRangeStart, dateRangeEnd),
    iconType: "apmApp",
    message: _i18n.i18n.translate('xpack.uptime.apmIntegrationAction.text', {
      defaultMessage: 'Check APM for domain',
      description: 'A message explaining that when the user clicks the associated link, it will navigate to the APM app and search for the selected domain'
    }),
    tooltipContent: _i18n.i18n.translate('xpack.uptime.monitorList.observabilityIntegrationsColumn.apmIntegrationLink.tooltip', {
      defaultMessage: 'Click here to check APM for the domain "{domain}".',
      description: 'A messsage shown in a tooltip explaining that the nested anchor tag will navigate to the APM app and search for the given URL domain.',
      values: {
        domain: domain
      }
    })
  })) : null, isInfraAvailable ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_integration_link.IntegrationLink, {
    ariaLabel: _i18n.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.ip.ariaLabel', {
      defaultMessage: "Check Infrastructure UI for this montor's ip address",
      description: 'This value is shown as the aria label value for screen readers.'
    }),
    href: (0, _helper.getInfraIpHref)(summary, basePath),
    iconType: "metricsApp",
    message: _i18n.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.ip.message', {
      defaultMessage: 'Show host metrics',
      description: "A message explaining that this link will take the user to the Infrastructure UI, filtered for this monitor's IP Address"
    }),
    tooltipContent: _i18n.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.ip.tooltip', {
      defaultMessage: 'Check Infrastructure UI for the IP "{ip}"',
      values: {
        ip: ip
      }
    })
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_integration_link.IntegrationLink, {
    ariaLabel: _i18n.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.kubernetes.description', {
      defaultMessage: "Check Infrastructure UI for this monitor's pod UID",
      description: 'This value is shown as the aria label value for screen readers.'
    }),
    href: (0, _helper.getInfraKubernetesHref)(summary, basePath),
    iconType: "metricsApp",
    message: _i18n.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.kubernetes.message', {
      defaultMessage: 'Show pod metrics',
      description: 'A message explaining that this link will take the user to the Infrastructure UI filtered for the monitor Pod UID.'
    }),
    tooltipContent: _i18n.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.kubernetes.tooltip', {
      defaultMessage: 'Check Infrastructure UI for pod UID "{podUid}".',
      values: {
        podUid: podUid
      }
    })
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_integration_link.IntegrationLink, {
    ariaLabel: _i18n.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.docker.description', {
      defaultMessage: "Check Infrastructure UI for this monitor's container ID"
    }),
    href: (0, _helper.getInfraContainerHref)(summary, basePath),
    iconType: "metricsApp",
    message: _i18n.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.container.message', {
      defaultMessage: 'Show container metrics'
    }),
    tooltipContent: _i18n.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.docker.tooltip', {
      defaultMessage: 'Check Infrastructure UI for container ID "{containerId}"',
      values: {
        containerId: containerId
      }
    })
  }))) : null, isLogsAvailable ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_integration_link.IntegrationLink, {
    ariaLabel: _i18n.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.ip.description', {
      defaultMessage: "Check Logging UI for this monitor's ip address",
      description: 'This value is shown as the aria label for screen readers.'
    }),
    href: (0, _helper.getLoggingIpHref)(summary, basePath),
    iconType: "logsApp",
    message: _i18n.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.ip.message', {
      defaultMessage: 'Show host logs',
      description: "A message explaining that this link will take the user to the Infrastructure UI filtered for the monitor's IP Address"
    }),
    tooltipContent: _i18n.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.ip.tooltip', {
      defaultMessage: 'Check Logging UI for the IP "{ip}"',
      values: {
        ip: ip
      }
    })
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_integration_link.IntegrationLink, {
    ariaLabel: _i18n.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.kubernetes.ariaLabel', {
      defaultMessage: 'Show pod logs'
    }),
    href: (0, _helper.getLoggingKubernetesHref)(summary, basePath),
    iconType: "logsApp",
    message: _i18n.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.kubernetes.message', {
      defaultMessage: 'Show pod logs'
    }),
    tooltipContent: _i18n.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.kubernetes.tooltip', {
      defaultMessage: 'Check for logs for pod UID "{podUid}"',
      values: {
        podUid: podUid
      }
    })
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_integration_link.IntegrationLink, {
    ariaLabel: _i18n.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.container.id', {
      defaultMessage: 'Show container logs'
    }),
    href: (0, _helper.getLoggingContainerHref)(summary, basePath),
    iconType: "logsApp",
    message: _i18n.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.container.message', {
      defaultMessage: 'Show container logs'
    }),
    tooltipContent: _i18n.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.container.tooltip', {
      defaultMessage: 'Check Logging UI for container ID "{containerId}"',
      values: {
        containerId: containerId
      }
    })
  }))) : null) : _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "No integrated applications available",
    description: "This message is shown when no applications that Uptime links to are enabled in the current space",
    id: "xpack.uptime.monitorList.integrationGroup.emptyMessage"
  });
};

exports.IntegrationGroup = IntegrationGroup;
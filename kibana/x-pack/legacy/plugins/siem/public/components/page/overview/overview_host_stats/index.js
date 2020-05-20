"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewHostStats = exports.getOverviewHostStats = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _stat_value = require("../stat_value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getOverviewHostStats = function getOverviewHostStats(data) {
  var _data$auditbeatAuditd, _data$auditbeatFIM, _data$auditbeatLogin, _data$auditbeatPackag, _data$auditbeatProces, _data$auditbeatUser, _data$endgameDns, _data$endgameFile, _data$endgameImageLoa, _data$endgameNetwork, _data$endgameProcess, _data$endgameRegistry, _data$endgameSecurity, _data$filebeatSystemM, _data$winlogbeatSecur, _data$winlogbeatMWSys;

  return [{
    count: (_data$auditbeatAuditd = data.auditbeatAuditd) !== null && _data$auditbeatAuditd !== void 0 ? _data$auditbeatAuditd : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.auditBeatAuditTitle",
      defaultMessage: "Audit"
    }),
    id: 'auditbeatAuditd'
  }, {
    count: (_data$auditbeatFIM = data.auditbeatFIM) !== null && _data$auditbeatFIM !== void 0 ? _data$auditbeatFIM : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.auditBeatFimTitle",
      defaultMessage: "File Integrity Module"
    }),
    id: 'auditbeatFIM'
  }, {
    count: (_data$auditbeatLogin = data.auditbeatLogin) !== null && _data$auditbeatLogin !== void 0 ? _data$auditbeatLogin : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.auditBeatLoginTitle",
      defaultMessage: "Login"
    }),
    id: 'auditbeatLogin'
  }, {
    count: (_data$auditbeatPackag = data.auditbeatPackage) !== null && _data$auditbeatPackag !== void 0 ? _data$auditbeatPackag : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.auditBeatPackageTitle",
      defaultMessage: "Package"
    }),
    id: 'auditbeatPackage'
  }, {
    count: (_data$auditbeatProces = data.auditbeatProcess) !== null && _data$auditbeatProces !== void 0 ? _data$auditbeatProces : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.auditBeatProcessTitle",
      defaultMessage: "Process"
    }),
    id: 'auditbeatProcess'
  }, {
    count: (_data$auditbeatUser = data.auditbeatUser) !== null && _data$auditbeatUser !== void 0 ? _data$auditbeatUser : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.auditBeatUserTitle",
      defaultMessage: "User"
    }),
    id: 'auditbeatUser'
  }, {
    count: (_data$endgameDns = data.endgameDns) !== null && _data$endgameDns !== void 0 ? _data$endgameDns : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.endgameDnsTitle",
      defaultMessage: "DNS"
    }),
    id: 'endgameDns'
  }, {
    count: (_data$endgameFile = data.endgameFile) !== null && _data$endgameFile !== void 0 ? _data$endgameFile : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.endgameFileTitle",
      defaultMessage: "File"
    }),
    id: 'endgameFile'
  }, {
    count: (_data$endgameImageLoa = data.endgameImageLoad) !== null && _data$endgameImageLoa !== void 0 ? _data$endgameImageLoa : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.endgameImageLoadTitle",
      defaultMessage: "Image Load"
    }),
    id: 'endgameImageLoad'
  }, {
    count: (_data$endgameNetwork = data.endgameNetwork) !== null && _data$endgameNetwork !== void 0 ? _data$endgameNetwork : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.endgameNetworkTitle",
      defaultMessage: "Network"
    }),
    id: 'endgameNetwork'
  }, {
    count: (_data$endgameProcess = data.endgameProcess) !== null && _data$endgameProcess !== void 0 ? _data$endgameProcess : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.endgameProcessTitle",
      defaultMessage: "Process"
    }),
    id: 'endgameProcess'
  }, {
    count: (_data$endgameRegistry = data.endgameRegistry) !== null && _data$endgameRegistry !== void 0 ? _data$endgameRegistry : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.endgameRegistryTitle",
      defaultMessage: "Registry"
    }),
    id: 'endgameRegistry'
  }, {
    count: (_data$endgameSecurity = data.endgameSecurity) !== null && _data$endgameSecurity !== void 0 ? _data$endgameSecurity : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.endgameSecurityTitle",
      defaultMessage: "Security"
    }),
    id: 'endgameSecurity'
  }, {
    count: (_data$filebeatSystemM = data.filebeatSystemModule) !== null && _data$filebeatSystemM !== void 0 ? _data$filebeatSystemM : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.filebeatSystemModuleTitle",
      defaultMessage: "System Module"
    }),
    id: 'filebeatSystemModule'
  }, {
    count: (_data$winlogbeatSecur = data.winlogbeatSecurity) !== null && _data$winlogbeatSecur !== void 0 ? _data$winlogbeatSecur : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.winlogbeatSecurityTitle",
      defaultMessage: "Security"
    }),
    id: 'winlogbeatSecurity'
  }, {
    count: (_data$winlogbeatMWSys = data.winlogbeatMWSysmonOperational) !== null && _data$winlogbeatMWSys !== void 0 ? _data$winlogbeatMWSys : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.winlogbeatMWSysmonOperational",
      defaultMessage: "Microsoft-Windows-Sysmon/Operational"
    }),
    id: 'winlogbeatMWSysmonOperational'
  }];
};

exports.getOverviewHostStats = getOverviewHostStats;

var HostStatsContainer = _styledComponents.default.div.withConfig({
  displayName: "HostStatsContainer",
  componentId: "sj3zvr-0"
})([".accordion-button{width:100%;}"]);

var hostStatGroups = [{
  groupId: 'auditbeat',
  name: _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.siem.overview.hostStatGroupAuditbeat",
    defaultMessage: "Auditbeat"
  }),
  statIds: ['auditbeatAuditd', 'auditbeatFIM', 'auditbeatLogin', 'auditbeatPackage', 'auditbeatProcess', 'auditbeatUser']
}, {
  groupId: 'endgame',
  name: _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.siem.overview.hostStatGroupElasticEndpointSecurity",
    defaultMessage: "Elastic Endpoint Security"
  }),
  statIds: ['endgameDns', 'endgameFile', 'endgameImageLoad', 'endgameNetwork', 'endgameProcess', 'endgameRegistry', 'endgameSecurity']
}, {
  groupId: 'filebeat',
  name: _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.siem.overview.hostStatGroupFilebeat",
    defaultMessage: "Filebeat"
  }),
  statIds: ['filebeatSystemModule']
}, {
  groupId: 'winlogbeat',
  name: _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.siem.overview.hostStatGroupWinlogbeat",
    defaultMessage: "Winlogbeat"
  }),
  statIds: ['winlogbeatSecurity', 'winlogbeatMWSysmonOperational']
}];

var Title = _styledComponents.default.div.withConfig({
  displayName: "Title",
  componentId: "sj3zvr-1"
})(["margin-left:24px;"]);

var AccordionContent = _styledComponents.default.div.withConfig({
  displayName: "AccordionContent",
  componentId: "sj3zvr-2"
})(["margin-top:8px;"]);

var OverviewHostStatsComponent = function OverviewHostStatsComponent(_ref) {
  var data = _ref.data,
      loading = _ref.loading;
  var allHostStats = getOverviewHostStats(data);
  var allHostStatsCount = allHostStats.reduce(function (total, stat) {
    return total + stat.count;
  }, 0);
  return _react2.default.createElement(HostStatsContainer, {
    "data-test-subj": "overview-hosts-stats"
  }, hostStatGroups.map(function (statGroup, i) {
    var statsForGroup = allHostStats.filter(function (s) {
      return statGroup.statIds.includes(s.id);
    });
    var statsForGroupCount = statsForGroup.reduce(function (total, stat) {
      return total + stat.count;
    }, 0);
    return _react2.default.createElement(_react2.default.Fragment, {
      key: statGroup.groupId
    }, _react2.default.createElement(_eui.EuiHorizontalRule, {
      margin: "xs"
    }), _react2.default.createElement(_eui.EuiAccordion, {
      id: "host-stat-accordion-group".concat(statGroup.groupId),
      buttonContent: _react2.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "none",
        justifyContent: "spaceBetween"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiText, null, statGroup.name)), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_stat_value.StatValue, {
        count: statsForGroupCount,
        isGroupStat: true,
        isLoading: loading,
        max: allHostStatsCount
      }))),
      buttonContentClassName: "accordion-button"
    }, _react2.default.createElement(AccordionContent, null, statsForGroup.map(function (stat) {
      return _react2.default.createElement(_eui.EuiFlexGroup, {
        key: stat.id,
        justifyContent: "spaceBetween"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiText, {
        color: "subdued",
        size: "s"
      }, _react2.default.createElement(Title, null, stat.title))), _react2.default.createElement(_eui.EuiFlexItem, {
        "data-test-subj": "host-stat-".concat(stat.id),
        grow: false
      }, _react2.default.createElement(_stat_value.StatValue, {
        count: stat.count,
        isGroupStat: false,
        isLoading: loading,
        max: statsForGroupCount
      })));
    }))));
  }));
};

var OverviewHostStats = _react2.default.memo(OverviewHostStatsComponent);

exports.OverviewHostStats = OverviewHostStats;
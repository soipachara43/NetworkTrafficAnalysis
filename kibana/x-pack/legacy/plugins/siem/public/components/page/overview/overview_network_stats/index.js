"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewNetworkStats = exports.getOverviewNetworkStats = void 0;

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
var getOverviewNetworkStats = function getOverviewNetworkStats(data) {
  var _data$auditbeatSocket, _data$filebeatCisco, _data$filebeatNetflow, _data$filebeatPanw, _data$filebeatSuricat, _data$filebeatZeek, _data$packetbeatDNS, _data$packetbeatFlow, _data$packetbeatTLS;

  return [{
    count: (_data$auditbeatSocket = data.auditbeatSocket) !== null && _data$auditbeatSocket !== void 0 ? _data$auditbeatSocket : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.auditBeatSocketTitle",
      defaultMessage: "Socket"
    }),
    id: 'auditbeatSocket'
  }, {
    count: (_data$filebeatCisco = data.filebeatCisco) !== null && _data$filebeatCisco !== void 0 ? _data$filebeatCisco : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.filebeatCiscoTitle",
      defaultMessage: "Cisco"
    }),
    id: 'filebeatCisco'
  }, {
    count: (_data$filebeatNetflow = data.filebeatNetflow) !== null && _data$filebeatNetflow !== void 0 ? _data$filebeatNetflow : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.filebeatNetflowTitle",
      defaultMessage: "Netflow"
    }),
    id: 'filebeatNetflow'
  }, {
    count: (_data$filebeatPanw = data.filebeatPanw) !== null && _data$filebeatPanw !== void 0 ? _data$filebeatPanw : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.filebeatPanwTitle",
      defaultMessage: "Palo Alto Networks"
    }),
    id: 'filebeatPanw'
  }, {
    count: (_data$filebeatSuricat = data.filebeatSuricata) !== null && _data$filebeatSuricat !== void 0 ? _data$filebeatSuricat : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.fileBeatSuricataTitle",
      defaultMessage: "Suricata"
    }),
    id: 'filebeatSuricata'
  }, {
    count: (_data$filebeatZeek = data.filebeatZeek) !== null && _data$filebeatZeek !== void 0 ? _data$filebeatZeek : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.fileBeatZeekTitle",
      defaultMessage: "Zeek"
    }),
    id: 'filebeatZeek'
  }, {
    count: (_data$packetbeatDNS = data.packetbeatDNS) !== null && _data$packetbeatDNS !== void 0 ? _data$packetbeatDNS : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.packetBeatDnsTitle",
      defaultMessage: "DNS"
    }),
    id: 'packetbeatDNS'
  }, {
    count: (_data$packetbeatFlow = data.packetbeatFlow) !== null && _data$packetbeatFlow !== void 0 ? _data$packetbeatFlow : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.packetBeatFlowTitle",
      defaultMessage: "Flow"
    }),
    id: 'packetbeatFlow'
  }, {
    count: (_data$packetbeatTLS = data.packetbeatTLS) !== null && _data$packetbeatTLS !== void 0 ? _data$packetbeatTLS : 0,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.overview.packetbeatTLSTitle",
      defaultMessage: "TLS"
    }),
    id: 'packetbeatTLS'
  }];
};

exports.getOverviewNetworkStats = getOverviewNetworkStats;
var networkStatGroups = [{
  groupId: 'auditbeat',
  name: _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.siem.overview.networkStatGroupAuditbeat",
    defaultMessage: "Auditbeat"
  }),
  statIds: ['auditbeatSocket']
}, {
  groupId: 'filebeat',
  name: _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.siem.overview.networkStatGroupFilebeat",
    defaultMessage: "Filebeat"
  }),
  statIds: ['filebeatCisco', 'filebeatNetflow', 'filebeatPanw', 'filebeatSuricata', 'filebeatZeek']
}, {
  groupId: 'packetbeat',
  name: _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.siem.overview.networkStatGroupPacketbeat",
    defaultMessage: "Packetbeat"
  }),
  statIds: ['packetbeatDNS', 'packetbeatFlow', 'packetbeatTLS']
}];

var NetworkStatsContainer = _styledComponents.default.div.withConfig({
  displayName: "NetworkStatsContainer",
  componentId: "sc-1oo1bjx-0"
})([".accordion-button{width:100%;}"]);

var Title = _styledComponents.default.div.withConfig({
  displayName: "Title",
  componentId: "sc-1oo1bjx-1"
})(["margin-left:24px;"]);

var AccordionContent = _styledComponents.default.div.withConfig({
  displayName: "AccordionContent",
  componentId: "sc-1oo1bjx-2"
})(["margin-top:8px;"]);

var OverviewNetworkStatsComponent = function OverviewNetworkStatsComponent(_ref) {
  var data = _ref.data,
      loading = _ref.loading;
  var allNetworkStats = getOverviewNetworkStats(data);
  var allNetworkStatsCount = allNetworkStats.reduce(function (total, stat) {
    return total + stat.count;
  }, 0);
  return _react2.default.createElement(NetworkStatsContainer, {
    "data-test-subj": "overview-network-stats"
  }, networkStatGroups.map(function (statGroup, i) {
    var statsForGroup = allNetworkStats.filter(function (s) {
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
      id: "network-stat-accordion-group".concat(statGroup.groupId),
      buttonContent: _react2.default.createElement(_eui.EuiFlexGroup, {
        "data-test-subj": "network-stat-group-".concat(statGroup.groupId),
        justifyContent: "spaceBetween"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiText, null, statGroup.name)), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_stat_value.StatValue, {
        count: statsForGroupCount,
        isGroupStat: true,
        isLoading: loading,
        max: allNetworkStatsCount
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
        "data-test-subj": "network-stat-".concat(stat.id),
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

var OverviewNetworkStats = _react2.default.memo(OverviewNetworkStatsComponent);

exports.OverviewNetworkStats = OverviewNetworkStats;
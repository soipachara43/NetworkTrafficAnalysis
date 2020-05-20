"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navTabsHostDetails = void 0;

var _fp = require("lodash/fp");

var i18n = _interopRequireWildcard(require("./../translations"));

var _model = require("../../../store/hosts/model");

var _types = require("../../home/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getTabsOnHostDetailsUrl = function getTabsOnHostDetailsUrl(hostName, tabName) {
  return "#/".concat(_types.SiemPageName.hosts, "/").concat(hostName, "/").concat(tabName);
};

var navTabsHostDetails = function navTabsHostDetails(hostName, hasMlUserPermissions) {
  var _hostDetailsNavTabs;

  var hostDetailsNavTabs = (_hostDetailsNavTabs = {}, _defineProperty(_hostDetailsNavTabs, _model.HostsTableType.authentications, {
    id: _model.HostsTableType.authentications,
    name: i18n.NAVIGATION_AUTHENTICATIONS_TITLE,
    href: getTabsOnHostDetailsUrl(hostName, _model.HostsTableType.authentications),
    disabled: false,
    urlKey: 'host',
    isDetailPage: true
  }), _defineProperty(_hostDetailsNavTabs, _model.HostsTableType.uncommonProcesses, {
    id: _model.HostsTableType.uncommonProcesses,
    name: i18n.NAVIGATION_UNCOMMON_PROCESSES_TITLE,
    href: getTabsOnHostDetailsUrl(hostName, _model.HostsTableType.uncommonProcesses),
    disabled: false,
    urlKey: 'host',
    isDetailPage: true
  }), _defineProperty(_hostDetailsNavTabs, _model.HostsTableType.anomalies, {
    id: _model.HostsTableType.anomalies,
    name: i18n.NAVIGATION_ANOMALIES_TITLE,
    href: getTabsOnHostDetailsUrl(hostName, _model.HostsTableType.anomalies),
    disabled: false,
    urlKey: 'host',
    isDetailPage: true
  }), _defineProperty(_hostDetailsNavTabs, _model.HostsTableType.events, {
    id: _model.HostsTableType.events,
    name: i18n.NAVIGATION_EVENTS_TITLE,
    href: getTabsOnHostDetailsUrl(hostName, _model.HostsTableType.events),
    disabled: false,
    urlKey: 'host',
    isDetailPage: true
  }), _defineProperty(_hostDetailsNavTabs, _model.HostsTableType.alerts, {
    id: _model.HostsTableType.alerts,
    name: i18n.NAVIGATION_ALERTS_TITLE,
    href: getTabsOnHostDetailsUrl(hostName, _model.HostsTableType.alerts),
    disabled: false,
    urlKey: 'host'
  }), _hostDetailsNavTabs);
  return hasMlUserPermissions ? hostDetailsNavTabs : (0, _fp.omit)(_model.HostsTableType.anomalies, hostDetailsNavTabs);
};

exports.navTabsHostDetails = navTabsHostDetails;
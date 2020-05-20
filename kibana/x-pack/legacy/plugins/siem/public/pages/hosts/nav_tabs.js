"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navTabsHosts = void 0;

var _fp = require("lodash/fp");

var i18n = _interopRequireWildcard(require("./translations"));

var _model = require("../../store/hosts/model");

var _types = require("../home/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getTabsOnHostsUrl = function getTabsOnHostsUrl(tabName) {
  return "#/".concat(_types.SiemPageName.hosts, "/").concat(tabName);
};

var navTabsHosts = function navTabsHosts(hasMlUserPermissions) {
  var _hostsNavTabs;

  var hostsNavTabs = (_hostsNavTabs = {}, _defineProperty(_hostsNavTabs, _model.HostsTableType.hosts, {
    id: _model.HostsTableType.hosts,
    name: i18n.NAVIGATION_ALL_HOSTS_TITLE,
    href: getTabsOnHostsUrl(_model.HostsTableType.hosts),
    disabled: false,
    urlKey: 'host'
  }), _defineProperty(_hostsNavTabs, _model.HostsTableType.authentications, {
    id: _model.HostsTableType.authentications,
    name: i18n.NAVIGATION_AUTHENTICATIONS_TITLE,
    href: getTabsOnHostsUrl(_model.HostsTableType.authentications),
    disabled: false,
    urlKey: 'host'
  }), _defineProperty(_hostsNavTabs, _model.HostsTableType.uncommonProcesses, {
    id: _model.HostsTableType.uncommonProcesses,
    name: i18n.NAVIGATION_UNCOMMON_PROCESSES_TITLE,
    href: getTabsOnHostsUrl(_model.HostsTableType.uncommonProcesses),
    disabled: false,
    urlKey: 'host'
  }), _defineProperty(_hostsNavTabs, _model.HostsTableType.anomalies, {
    id: _model.HostsTableType.anomalies,
    name: i18n.NAVIGATION_ANOMALIES_TITLE,
    href: getTabsOnHostsUrl(_model.HostsTableType.anomalies),
    disabled: false,
    urlKey: 'host'
  }), _defineProperty(_hostsNavTabs, _model.HostsTableType.events, {
    id: _model.HostsTableType.events,
    name: i18n.NAVIGATION_EVENTS_TITLE,
    href: getTabsOnHostsUrl(_model.HostsTableType.events),
    disabled: false,
    urlKey: 'host'
  }), _defineProperty(_hostsNavTabs, _model.HostsTableType.alerts, {
    id: _model.HostsTableType.alerts,
    name: i18n.NAVIGATION_ALERTS_TITLE,
    href: getTabsOnHostsUrl(_model.HostsTableType.alerts),
    disabled: false,
    urlKey: 'host'
  }), _hostsNavTabs);
  return hasMlUserPermissions ? hostsNavTabs : (0, _fp.omit)([_model.HostsTableType.anomalies], hostsNavTabs);
};

exports.navTabsHosts = navTabsHosts;
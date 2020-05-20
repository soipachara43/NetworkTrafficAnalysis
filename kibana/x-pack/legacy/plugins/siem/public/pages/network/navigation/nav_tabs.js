"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navTabsNetwork = void 0;

var _fp = require("lodash/fp");

var i18n = _interopRequireWildcard(require("../translations"));

var _types = require("./types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getTabsOnNetworkUrl = function getTabsOnNetworkUrl(tabName) {
  return "#/network/".concat(tabName);
};

var navTabsNetwork = function navTabsNetwork(hasMlUserPermissions) {
  var _networkNavTabs;

  var networkNavTabs = (_networkNavTabs = {}, _defineProperty(_networkNavTabs, _types.NetworkRouteType.flows, {
    id: _types.NetworkRouteType.flows,
    name: i18n.NAVIGATION_FLOWS_TITLE,
    href: getTabsOnNetworkUrl(_types.NetworkRouteType.flows),
    disabled: false,
    urlKey: 'network'
  }), _defineProperty(_networkNavTabs, _types.NetworkRouteType.dns, {
    id: _types.NetworkRouteType.dns,
    name: i18n.NAVIGATION_DNS_TITLE,
    href: getTabsOnNetworkUrl(_types.NetworkRouteType.dns),
    disabled: false,
    urlKey: 'network'
  }), _defineProperty(_networkNavTabs, _types.NetworkRouteType.http, {
    id: _types.NetworkRouteType.http,
    name: i18n.NAVIGATION_HTTP_TITLE,
    href: getTabsOnNetworkUrl(_types.NetworkRouteType.http),
    disabled: false,
    urlKey: 'network'
  }), _defineProperty(_networkNavTabs, _types.NetworkRouteType.tls, {
    id: _types.NetworkRouteType.tls,
    name: i18n.NAVIGATION_TLS_TITLE,
    href: getTabsOnNetworkUrl(_types.NetworkRouteType.tls),
    disabled: false,
    urlKey: 'network'
  }), _defineProperty(_networkNavTabs, _types.NetworkRouteType.anomalies, {
    id: _types.NetworkRouteType.anomalies,
    name: i18n.NAVIGATION_ANOMALIES_TITLE,
    href: getTabsOnNetworkUrl(_types.NetworkRouteType.anomalies),
    disabled: false,
    urlKey: 'network'
  }), _defineProperty(_networkNavTabs, _types.NetworkRouteType.alerts, {
    id: _types.NetworkRouteType.alerts,
    name: i18n.NAVIGATION_ALERTS_TITLE,
    href: getTabsOnNetworkUrl(_types.NetworkRouteType.alerts),
    disabled: false,
    urlKey: 'network'
  }), _networkNavTabs);
  return hasMlUserPermissions ? networkNavTabs : (0, _fp.omit)([_types.NetworkRouteType.anomalies], networkNavTabs);
};

exports.navTabsNetwork = navTabsNetwork;
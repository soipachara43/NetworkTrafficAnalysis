"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navTabs = void 0;

var _link_to = require("../../components/link_to");

var i18n = _interopRequireWildcard(require("./translations"));

var _types = require("./types");

var _navTabs;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var navTabs = (_navTabs = {}, _defineProperty(_navTabs, _types.SiemPageName.overview, {
  id: _types.SiemPageName.overview,
  name: i18n.OVERVIEW,
  href: (0, _link_to.getOverviewUrl)(),
  disabled: false,
  urlKey: 'overview'
}), _defineProperty(_navTabs, _types.SiemPageName.hosts, {
  id: _types.SiemPageName.hosts,
  name: i18n.HOSTS,
  href: (0, _link_to.getHostsUrl)(),
  disabled: false,
  urlKey: 'host'
}), _defineProperty(_navTabs, _types.SiemPageName.network, {
  id: _types.SiemPageName.network,
  name: i18n.NETWORK,
  href: (0, _link_to.getNetworkUrl)(),
  disabled: false,
  urlKey: 'network'
}), _defineProperty(_navTabs, _types.SiemPageName.detections, {
  id: _types.SiemPageName.detections,
  name: i18n.DETECTION_ENGINE,
  href: (0, _link_to.getDetectionEngineUrl)(),
  disabled: false,
  urlKey: 'detections'
}), _defineProperty(_navTabs, _types.SiemPageName.timelines, {
  id: _types.SiemPageName.timelines,
  name: i18n.TIMELINES,
  href: (0, _link_to.getTimelinesUrl)(),
  disabled: false,
  urlKey: 'timeline'
}), _defineProperty(_navTabs, _types.SiemPageName.case, {
  id: _types.SiemPageName.case,
  name: i18n.CASE,
  href: (0, _link_to.getCaseUrl)(null),
  disabled: false,
  urlKey: 'case'
}), _navTabs);
exports.navTabs = navTabs;
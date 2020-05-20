"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreadcrumbs = exports.type = void 0;

var _fp = require("lodash/fp");

var _store = require("../../../store");

var _model = require("../../../store/hosts/model");

var _redirect_to_hosts = require("../../../components/link_to/redirect_to_hosts");

var i18n = _interopRequireWildcard(require("../translations"));

var _TabNameMappedToI18nK;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var type = _store.hostsModel.HostsType.details;
exports.type = type;
var TabNameMappedToI18nKey = (_TabNameMappedToI18nK = {}, _defineProperty(_TabNameMappedToI18nK, _model.HostsTableType.hosts, i18n.NAVIGATION_ALL_HOSTS_TITLE), _defineProperty(_TabNameMappedToI18nK, _model.HostsTableType.authentications, i18n.NAVIGATION_AUTHENTICATIONS_TITLE), _defineProperty(_TabNameMappedToI18nK, _model.HostsTableType.uncommonProcesses, i18n.NAVIGATION_UNCOMMON_PROCESSES_TITLE), _defineProperty(_TabNameMappedToI18nK, _model.HostsTableType.anomalies, i18n.NAVIGATION_ANOMALIES_TITLE), _defineProperty(_TabNameMappedToI18nK, _model.HostsTableType.events, i18n.NAVIGATION_EVENTS_TITLE), _defineProperty(_TabNameMappedToI18nK, _model.HostsTableType.alerts, i18n.NAVIGATION_ALERTS_TITLE), _TabNameMappedToI18nK);

var getBreadcrumbs = function getBreadcrumbs(params, search) {
  var breadcrumb = [{
    text: i18n.PAGE_TITLE,
    href: "".concat((0, _redirect_to_hosts.getHostsUrl)()).concat(!(0, _fp.isEmpty)(search[0]) ? search[0] : '')
  }];

  if (params.detailName != null) {
    breadcrumb = [].concat(_toConsumableArray(breadcrumb), [{
      text: params.detailName,
      href: "".concat((0, _redirect_to_hosts.getHostDetailsUrl)(params.detailName)).concat(!(0, _fp.isEmpty)(search[1]) ? search[1] : '')
    }]);
  }

  if (params.tabName != null) {
    var tabName = (0, _fp.get)('tabName', params);
    if (!tabName) return breadcrumb;
    breadcrumb = [].concat(_toConsumableArray(breadcrumb), [{
      text: TabNameMappedToI18nKey[tabName],
      href: ''
    }]);
  }

  return breadcrumb;
};

exports.getBreadcrumbs = getBreadcrumbs;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreadcrumbs = exports.type = void 0;

var _fp = require("lodash/fp");

var _helpers = require("../../../lib/helpers");

var _redirect_to_network = require("../../../components/link_to/redirect_to_network");

var _network = require("../../../store/network");

var i18n = _interopRequireWildcard(require("../translations"));

var _types = require("../navigation/types");

var _TabNameMappedToI18nK;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var type = _network.networkModel.NetworkType.details;
exports.type = type;
var TabNameMappedToI18nKey = (_TabNameMappedToI18nK = {}, _defineProperty(_TabNameMappedToI18nK, _types.NetworkRouteType.alerts, i18n.NAVIGATION_ALERTS_TITLE), _defineProperty(_TabNameMappedToI18nK, _types.NetworkRouteType.anomalies, i18n.NAVIGATION_ANOMALIES_TITLE), _defineProperty(_TabNameMappedToI18nK, _types.NetworkRouteType.flows, i18n.NAVIGATION_FLOWS_TITLE), _defineProperty(_TabNameMappedToI18nK, _types.NetworkRouteType.dns, i18n.NAVIGATION_DNS_TITLE), _defineProperty(_TabNameMappedToI18nK, _types.NetworkRouteType.http, i18n.NAVIGATION_HTTP_TITLE), _defineProperty(_TabNameMappedToI18nK, _types.NetworkRouteType.tls, i18n.NAVIGATION_TLS_TITLE), _TabNameMappedToI18nK);

var getBreadcrumbs = function getBreadcrumbs(params, search) {
  var breadcrumb = [{
    text: i18n.PAGE_TITLE,
    href: "".concat((0, _redirect_to_network.getNetworkUrl)()).concat(!(0, _fp.isEmpty)(search[0]) ? search[0] : '')
  }];

  if (params.detailName != null) {
    breadcrumb = [].concat(_toConsumableArray(breadcrumb), [{
      text: (0, _helpers.decodeIpv6)(params.detailName),
      href: "".concat((0, _redirect_to_network.getIPDetailsUrl)(params.detailName, params.flowTarget)).concat(!(0, _fp.isEmpty)(search[1]) ? search[1] : '')
    }]);
  }

  var tabName = (0, _fp.get)('tabName', params);
  if (!tabName) return breadcrumb;
  breadcrumb = [].concat(_toConsumableArray(breadcrumb), [{
    text: TabNameMappedToI18nKey[tabName],
    href: ''
  }]);
  return breadcrumb;
};

exports.getBreadcrumbs = getBreadcrumbs;
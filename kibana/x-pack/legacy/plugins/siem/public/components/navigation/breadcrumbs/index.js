"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreadcrumbsForRoute = exports.siemRootBreadcrumb = exports.setBreadcrumbs = void 0;

var _fp = require("lodash/fp");

var _constants = require("../../../../common/constants");

var _utils = require("../../../pages/hosts/details/utils");

var _ip_details = require("../../../pages/network/ip_details");

var _utils2 = require("../../../pages/case/utils");

var _utils3 = require("../../../pages/detection_engine/rules/utils");

var _types = require("../../../pages/home/types");

var _link_to = require("../../link_to");

var _helpers = require("../helpers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var setBreadcrumbs = function setBreadcrumbs(spyState, chrome) {
  var breadcrumbs = getBreadcrumbsForRoute(spyState);

  if (breadcrumbs) {
    chrome.setBreadcrumbs(breadcrumbs);
  }
};

exports.setBreadcrumbs = setBreadcrumbs;
var siemRootBreadcrumb = [{
  text: _constants.APP_NAME,
  href: (0, _link_to.getOverviewUrl)()
}];
exports.siemRootBreadcrumb = siemRootBreadcrumb;

var isNetworkRoutes = function isNetworkRoutes(spyState) {
  return spyState != null && spyState.pageName === _types.SiemPageName.network;
};

var isHostsRoutes = function isHostsRoutes(spyState) {
  return spyState != null && spyState.pageName === _types.SiemPageName.hosts;
};

var isCaseRoutes = function isCaseRoutes(spyState) {
  return spyState != null && spyState.pageName === _types.SiemPageName.case;
};

var isDetectionsRoutes = function isDetectionsRoutes(spyState) {
  return spyState != null && spyState.pageName === _types.SiemPageName.detections;
};

var getBreadcrumbsForRoute = function getBreadcrumbsForRoute(object) {
  var spyState = (0, _fp.omit)('navTabs', object);

  if (isHostsRoutes(spyState) && object.navTabs) {
    var tempNav = {
      urlKey: 'host',
      isDetailPage: false
    };
    var urlStateKeys = [(0, _fp.getOr)(tempNav, spyState.pageName, object.navTabs)];

    if (spyState.tabName != null) {
      urlStateKeys = [].concat(_toConsumableArray(urlStateKeys), [(0, _fp.getOr)(tempNav, spyState.tabName, object.navTabs)]);
    }

    return [].concat(siemRootBreadcrumb, _toConsumableArray((0, _utils.getBreadcrumbs)(spyState, urlStateKeys.reduce(function (acc, item) {
      return [].concat(_toConsumableArray(acc), [(0, _helpers.getSearch)(item, object)]);
    }, []))));
  }

  if (isNetworkRoutes(spyState) && object.navTabs) {
    var _tempNav = {
      urlKey: 'network',
      isDetailPage: false
    };
    var _urlStateKeys = [(0, _fp.getOr)(_tempNav, spyState.pageName, object.navTabs)];

    if (spyState.tabName != null) {
      _urlStateKeys = [].concat(_toConsumableArray(_urlStateKeys), [(0, _fp.getOr)(_tempNav, spyState.tabName, object.navTabs)]);
    }

    return [].concat(siemRootBreadcrumb, _toConsumableArray((0, _ip_details.getBreadcrumbs)(spyState, _urlStateKeys.reduce(function (acc, item) {
      return [].concat(_toConsumableArray(acc), [(0, _helpers.getSearch)(item, object)]);
    }, []))));
  }

  if (isDetectionsRoutes(spyState) && object.navTabs) {
    var _tempNav2 = {
      urlKey: 'detections',
      isDetailPage: false
    };
    var _urlStateKeys2 = [(0, _fp.getOr)(_tempNav2, spyState.pageName, object.navTabs)];

    if (spyState.tabName != null) {
      _urlStateKeys2 = [].concat(_toConsumableArray(_urlStateKeys2), [(0, _fp.getOr)(_tempNav2, spyState.tabName, object.navTabs)]);
    }

    return [].concat(siemRootBreadcrumb, _toConsumableArray((0, _utils3.getBreadcrumbs)(spyState, _urlStateKeys2.reduce(function (acc, item) {
      return [].concat(_toConsumableArray(acc), [(0, _helpers.getSearch)(item, object)]);
    }, []))));
  }

  if (isCaseRoutes(spyState) && object.navTabs) {
    var _tempNav3 = {
      urlKey: 'case',
      isDetailPage: false
    };
    var _urlStateKeys3 = [(0, _fp.getOr)(_tempNav3, spyState.pageName, object.navTabs)];

    if (spyState.tabName != null) {
      _urlStateKeys3 = [].concat(_toConsumableArray(_urlStateKeys3), [(0, _fp.getOr)(_tempNav3, spyState.tabName, object.navTabs)]);
    }

    return [].concat(siemRootBreadcrumb, _toConsumableArray((0, _utils2.getBreadcrumbs)(spyState, _urlStateKeys3.reduce(function (acc, item) {
      return [].concat(_toConsumableArray(acc), [(0, _helpers.getSearch)(item, object)]);
    }, []))));
  }

  if (spyState != null && object.navTabs && spyState.pageName && object.navTabs[spyState.pageName]) {
    return [].concat(siemRootBreadcrumb, [{
      text: object.navTabs[spyState.pageName].name,
      href: ''
    }]);
  }

  return null;
};

exports.getBreadcrumbsForRoute = getBreadcrumbsForRoute;
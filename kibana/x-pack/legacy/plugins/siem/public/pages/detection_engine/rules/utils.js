"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreadcrumbs = void 0;

var _fp = require("lodash/fp");

var _redirect_to_detection_engine = require("../../../components/link_to/redirect_to_detection_engine");

var i18nDetections = _interopRequireWildcard(require("../translations"));

var i18nRules = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getTabBreadcrumb = function getTabBreadcrumb(pathname, search) {
  var tabPath = pathname.split('/')[2];

  if (tabPath === 'alerts') {
    return {
      text: i18nDetections.ALERT,
      href: "".concat((0, _redirect_to_detection_engine.getDetectionEngineTabUrl)(tabPath)).concat(!(0, _fp.isEmpty)(search[0]) ? search[0] : '')
    };
  }

  if (tabPath === 'signals') {
    return {
      text: i18nDetections.SIGNAL,
      href: "".concat((0, _redirect_to_detection_engine.getDetectionEngineTabUrl)(tabPath)).concat(!(0, _fp.isEmpty)(search[0]) ? search[0] : '')
    };
  }

  if (tabPath === 'rules') {
    return {
      text: i18nRules.PAGE_TITLE,
      href: "".concat((0, _redirect_to_detection_engine.getRulesUrl)()).concat(!(0, _fp.isEmpty)(search[0]) ? search[0] : '')
    };
  }
};

var isRuleCreatePage = function isRuleCreatePage(pathname) {
  return pathname.includes('/rules') && pathname.includes('/create');
};

var isRuleEditPage = function isRuleEditPage(pathname) {
  return pathname.includes('/rules') && pathname.includes('/edit');
};

var getBreadcrumbs = function getBreadcrumbs(params, search) {
  var _params$state, _params$state2;

  var breadcrumb = [{
    text: i18nDetections.PAGE_TITLE,
    href: "".concat((0, _redirect_to_detection_engine.getDetectionEngineUrl)()).concat(!(0, _fp.isEmpty)(search[0]) ? search[0] : '')
  }];
  var tabBreadcrumb = getTabBreadcrumb(params.pathName, search);

  if (tabBreadcrumb) {
    breadcrumb = [].concat(_toConsumableArray(breadcrumb), [tabBreadcrumb]);
  }

  if (params.detailName && ((_params$state = params.state) === null || _params$state === void 0 ? void 0 : _params$state.ruleName)) {
    breadcrumb = [].concat(_toConsumableArray(breadcrumb), [{
      text: params.state.ruleName,
      href: "".concat((0, _redirect_to_detection_engine.getRuleDetailsUrl)(params.detailName)).concat(!(0, _fp.isEmpty)(search[1]) ? search[1] : '')
    }]);
  }

  if (isRuleCreatePage(params.pathName)) {
    breadcrumb = [].concat(_toConsumableArray(breadcrumb), [{
      text: i18nRules.ADD_PAGE_TITLE,
      href: "".concat((0, _redirect_to_detection_engine.getCreateRuleUrl)()).concat(!(0, _fp.isEmpty)(search[1]) ? search[1] : '')
    }]);
  }

  if (isRuleEditPage(params.pathName) && params.detailName && ((_params$state2 = params.state) === null || _params$state2 === void 0 ? void 0 : _params$state2.ruleName)) {
    breadcrumb = [].concat(_toConsumableArray(breadcrumb), [{
      text: i18nRules.EDIT_PAGE_TITLE,
      href: "".concat((0, _redirect_to_detection_engine.getEditRuleUrl)(params.detailName)).concat(!(0, _fp.isEmpty)(search[1]) ? search[1] : '')
    }]);
  }

  return breadcrumb;
};

exports.getBreadcrumbs = getBreadcrumbs;
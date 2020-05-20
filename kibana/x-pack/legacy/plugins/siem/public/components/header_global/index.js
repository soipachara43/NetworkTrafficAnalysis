"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderGlobal = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _helpers = require("../../lib/helpers");

var _home_navigations = require("../../pages/home/home_navigations");

var _types = require("../../pages/home/types");

var _link_to = require("../link_to");

var _ml_popover = require("../ml_popover/ml_popover");

var _navigation = require("../navigation");

var i18n = _interopRequireWildcard(require("./translations"));

var _source = require("../../containers/source");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Wrapper = _styledComponents.default.header.withConfig({
  displayName: "Wrapper",
  componentId: "sc-9ius3h-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["background:", ";border-bottom:", ";padding:", " ", " ", " ", ";"], theme.eui.euiColorEmptyShade, theme.eui.euiBorderThin, theme.eui.paddingSizes.m, _helpers.gutterTimeline, theme.eui.paddingSizes.m, theme.eui.paddingSizes.l);
});

Wrapper.displayName = 'Wrapper';
var FlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "FlexItem",
  componentId: "sc-9ius3h-1"
})(["min-width:0;"]);
FlexItem.displayName = 'FlexItem';

var HeaderGlobal = _react.default.memo(function (_ref2) {
  var _ref2$hideDetectionEn = _ref2.hideDetectionEngine,
      hideDetectionEngine = _ref2$hideDetectionEn === void 0 ? false : _ref2$hideDetectionEn;
  var currentLocation = (0, _reactRouterDom.useLocation)();
  return _react.default.createElement(Wrapper, {
    className: "siemHeaderGlobal"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween",
    wrap: true
  }, _react.default.createElement(_source.WithSource, {
    sourceId: "default"
  }, function (_ref3) {
    var indicesExist = _ref3.indicesExist;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(FlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center",
      responsive: false
    }, _react.default.createElement(FlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiLink, {
      href: (0, _link_to.getOverviewUrl)()
    }, _react.default.createElement(_eui.EuiIcon, {
      "aria-label": i18n.SIEM,
      type: "securityAnalyticsApp",
      size: "l"
    }))), _react.default.createElement(FlexItem, {
      component: "nav"
    }, (0, _source.indicesExistOrDataTemporarilyUnavailable)(indicesExist) ? _react.default.createElement(_navigation.SiemNavigation, {
      display: "condensed",
      navTabs: hideDetectionEngine ? (0, _fp.pickBy)(function (_, key) {
        return key !== _types.SiemPageName.detections;
      }, _home_navigations.navTabs) : _home_navigations.navTabs
    }) : _react.default.createElement(_navigation.SiemNavigation, {
      display: "condensed",
      navTabs: (0, _fp.pickBy)(function (_, key) {
        return key === _types.SiemPageName.overview;
      }, _home_navigations.navTabs)
    })))), _react.default.createElement(FlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center",
      gutterSize: "s",
      responsive: false,
      wrap: true
    }, (0, _source.indicesExistOrDataTemporarilyUnavailable)(indicesExist) && currentLocation.pathname.includes("/".concat(_types.SiemPageName.detections, "/")) && _react.default.createElement(FlexItem, {
      grow: false
    }, _react.default.createElement(_ml_popover.MlPopover, null)), _react.default.createElement(FlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      "data-test-subj": "add-data",
      href: "kibana#home/tutorial_directory/siem",
      iconType: "plusInCircle"
    }, i18n.BUTTON_ADD_DATA)))));
  })));
});

exports.HeaderGlobal = HeaderGlobal;
HeaderGlobal.displayName = 'HeaderGlobal';
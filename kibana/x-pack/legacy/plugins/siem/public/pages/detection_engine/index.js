"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectionEngineContainer = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _user_info = require("./components/user_info");

var _create = require("./rules/create");

var _detection_engine = require("./detection_engine");

var _edit = require("./rules/edit");

var _details = require("./rules/details");

var _rules = require("./rules");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var detectionEnginePath = "/:pageName(detections)";

var DetectionEngineContainerComponent = function DetectionEngineContainerComponent() {
  return _react.default.createElement(_user_info.ManageUserInfo, null, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(detectionEnginePath, "/:tabName(").concat(_types.DetectionEngineTab.signals, "|").concat(_types.DetectionEngineTab.alerts, ")"),
    strict: true
  }, _react.default.createElement(_detection_engine.DetectionEnginePage, null)), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(detectionEnginePath, "/rules")
  }, _react.default.createElement(_rules.RulesPage, null)), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(detectionEnginePath, "/rules/create")
  }, _react.default.createElement(_create.CreateRulePage, null)), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(detectionEnginePath, "/rules/id/:detailName")
  }, _react.default.createElement(_details.RuleDetailsPage, null)), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(detectionEnginePath, "/rules/id/:detailName/edit")
  }, _react.default.createElement(_edit.EditRulePage, null)), _react.default.createElement(_reactRouterDom.Route, {
    path: "/detections/",
    render: function render(_ref) {
      var _ref$location$search = _ref.location.search,
          search = _ref$location$search === void 0 ? '' : _ref$location$search;
      return _react.default.createElement(_reactRouterDom.Redirect, {
        from: "/detections/",
        to: "/detections/".concat(_types.DetectionEngineTab.signals).concat(search)
      });
    }
  })));
};

var DetectionEngineContainer = _react.default.memo(DetectionEngineContainerComponent);

exports.DetectionEngineContainer = DetectionEngineContainer;
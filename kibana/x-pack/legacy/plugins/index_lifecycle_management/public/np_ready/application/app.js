"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _analytics = require("@kbn/analytics");

var _constants = require("../../../common/constants");

var _constants2 = require("./constants");

var _edit_policy = require("./sections/edit_policy");

var _policy_table = require("./sections/policy_table");

var _ui_metric = require("./services/ui_metric");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var App = function App() {
  (0, _react.useEffect)(function () {
    return (0, _ui_metric.trackUiMetric)(_analytics.METRIC_TYPE.LOADED, _constants2.UIM_APP_LOAD);
  }, []);
  return _react.default.createElement(_reactRouterDom.HashRouter, null, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Redirect, {
    exact: true,
    from: "".concat(_constants.BASE_PATH),
    to: "".concat(_constants.BASE_PATH, "policies")
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "policies"),
    component: _policy_table.PolicyTable
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(_constants.BASE_PATH, "policies/edit/:policyName?"),
    component: _edit_policy.EditPolicy
  })));
};

exports.App = App;
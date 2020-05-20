"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterBadgeList = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BadgeText = _styledComponents.default.div.withConfig({
  displayName: "BadgeText",
  componentId: "sc-8w0u72-0"
})(["display:inline-block;", ";vertical-align:middle;"], (0, _variables.truncate)((0, _variables.px)(_variables.unit * 8)));

var FilterBadgeList = function FilterBadgeList(_ref) {
  var onRemove = _ref.onRemove,
      value = _ref.value;
  return _react.default.createElement(_eui.EuiFlexGrid, {
    gutterSize: "s"
  }, value.map(function (val) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: val,
      grow: false
    }, _react.default.createElement("button", {
      type: "button",
      onClick: function onClick() {
        onRemove(val);
      }
    }, _react.default.createElement(_eui.EuiBadge, {
      color: "hollow"
    }, _react.default.createElement(BadgeText, null, val), _react.default.createElement(_eui.EuiIcon, {
      type: "cross"
    }))));
  }));
};

exports.FilterBadgeList = FilterBadgeList;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Marker = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../../../style/variables");

var _AgentMarker = require("./AgentMarker");

var _ErrorMarker = require("./ErrorMarker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MarkerContainer = _styledComponents.default.div.withConfig({
  displayName: "MarkerContainer",
  componentId: "sc-1ggwr5-0"
})(["position:absolute;bottom:0;"]);

var Marker = function Marker(_ref) {
  var mark = _ref.mark,
      x = _ref.x;
  var legendWidth = 11;
  return _react.default.createElement(MarkerContainer, {
    style: {
      left: (0, _variables.px)(x - legendWidth / 2)
    }
  }, mark.type === 'errorMark' ? _react.default.createElement(_ErrorMarker.ErrorMarker, {
    mark: mark
  }) : _react.default.createElement(_AgentMarker.AgentMarker, {
    mark: mark
  }));
};

exports.Marker = Marker;
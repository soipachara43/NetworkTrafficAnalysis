"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildJsonView = exports.JsonView = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../timeline/body/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var JsonEditor = _styledComponents.default.div.withConfig({
  displayName: "JsonEditor",
  componentId: "sc-7p85ey-0"
})(["width:100%;"]);

JsonEditor.displayName = 'JsonEditor';

var JsonView = _react.default.memo(function (_ref) {
  var data = _ref.data;
  return _react.default.createElement(JsonEditor, {
    "data-test-subj": "jsonView"
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    isReadOnly: true,
    mode: "javascript",
    setOptions: {
      fontSize: '12px'
    },
    value: JSON.stringify(buildJsonView(data), _helpers.omitTypenameAndEmpty, 2 // indent level
    ),
    width: "100%"
  }));
});

exports.JsonView = JsonView;
JsonView.displayName = 'JsonView';

var buildJsonView = function buildJsonView(data) {
  return data.reduce(function (accumulator, item) {
    return (0, _fp.set)(item.field, item.originalValue, accumulator);
  }, {});
};

exports.buildJsonView = buildJsonView;
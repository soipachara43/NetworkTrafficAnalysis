"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpanMetadata = SpanMetadata;

var _react = _interopRequireWildcard(require("react"));

var _sections = require("./sections");

var _helper = require("../helper");

var _ = require("..");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function SpanMetadata(_ref) {
  var span = _ref.span;
  var sectionsWithRows = (0, _react.useMemo)(function () {
    return (0, _helper.getSectionsWithRows)(_sections.SPAN_METADATA_SECTIONS, span);
  }, [span]);
  return _react.default.createElement(_.MetadataTable, {
    sections: sectionsWithRows
  });
}
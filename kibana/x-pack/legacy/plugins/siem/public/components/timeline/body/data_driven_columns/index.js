"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataDrivenColumns = void 0;

var _react = _interopRequireDefault(require("react"));

var _fp = require("lodash/fp");

var _styles = require("../../styles");

var _get_column_renderer = require("../renderers/get_column_renderer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DataDrivenColumns = _react.default.memo(function (_ref) {
  var _id = _ref._id,
      columnHeaders = _ref.columnHeaders,
      columnRenderers = _ref.columnRenderers,
      data = _ref.data,
      ecsData = _ref.ecsData,
      timelineId = _ref.timelineId;
  return _react.default.createElement(_styles.EventsTdGroupData, {
    "data-test-subj": "data-driven-columns"
  }, columnHeaders.map(function (header) {
    var _header$linkField;

    return _react.default.createElement(_styles.EventsTd, {
      key: header.id,
      width: header.width
    }, _react.default.createElement(_styles.EventsTdContent, {
      "data-test-subj": "cell-container"
    }, (0, _get_column_renderer.getColumnRenderer)(header.id, columnRenderers, data).renderColumn({
      columnName: header.id,
      eventId: _id,
      field: header,
      linkValues: (0, _fp.getOr)([], (_header$linkField = header.linkField) !== null && _header$linkField !== void 0 ? _header$linkField : '', ecsData),
      timelineId: timelineId,
      truncate: true,
      values: getMappedNonEcsValue({
        data: data,
        fieldName: header.id
      })
    })));
  }));
});

exports.DataDrivenColumns = DataDrivenColumns;
DataDrivenColumns.displayName = 'DataDrivenColumns';

var getMappedNonEcsValue = function getMappedNonEcsValue(_ref2) {
  var data = _ref2.data,
      fieldName = _ref2.fieldName;
  var item = data.find(function (d) {
    return d.field === fieldName;
  });

  if (item != null && item.value != null) {
    return item.value;
  }

  return undefined;
};
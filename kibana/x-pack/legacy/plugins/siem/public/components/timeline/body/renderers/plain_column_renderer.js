"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plainColumnRenderer = exports.dataExistsAtColumn = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _empty_value = require("../../../empty_value");

var _formatted_field = require("./formatted_field");

var _parse_value = require("./parse_value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var dataExistsAtColumn = function dataExistsAtColumn(columnName, data) {
  return data.findIndex(function (item) {
    return item.field === columnName;
  }) !== -1;
};

exports.dataExistsAtColumn = dataExistsAtColumn;
var plainColumnRenderer = {
  isInstance: function isInstance(columnName, data) {
    return dataExistsAtColumn(columnName, data);
  },
  renderColumn: function renderColumn(_ref) {
    var columnName = _ref.columnName,
        eventId = _ref.eventId,
        field = _ref.field,
        timelineId = _ref.timelineId,
        truncate = _ref.truncate,
        values = _ref.values,
        linkValues = _ref.linkValues;
    return values != null ? values.map(function (value) {
      return _react.default.createElement(_formatted_field.FormattedFieldValue, {
        key: "plain-column-renderer-formatted-field-value-".concat(timelineId, "-").concat(columnName, "-").concat(eventId, "-").concat(field.id, "-").concat(value),
        contextId: "plain-column-renderer-formatted-field-value-".concat(timelineId),
        eventId: eventId,
        fieldFormat: field.format || '',
        fieldName: columnName,
        fieldType: field.type || '',
        value: (0, _parse_value.parseValue)(value),
        truncate: truncate,
        linkValue: (0, _fp.head)(linkValues)
      });
    }) : (0, _empty_value.getEmptyTagValue)();
  }
};
exports.plainColumnRenderer = plainColumnRenderer;
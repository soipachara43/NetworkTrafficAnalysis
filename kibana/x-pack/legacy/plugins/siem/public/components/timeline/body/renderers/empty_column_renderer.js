"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyColumnRenderer = exports.dataNotExistsAtColumn = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggable_wrapper = require("../../../drag_and_drop/draggable_wrapper");

var _helpers = require("../../../drag_and_drop/helpers");

var _empty_value = require("../../../empty_value");

var _data_provider = require("../../data_providers/data_provider");

var _provider = require("../../data_providers/provider");

var _parse_query_value = require("./parse_query_value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var dataNotExistsAtColumn = function dataNotExistsAtColumn(columnName, data) {
  return data.findIndex(function (item) {
    return item.field === columnName;
  }) === -1;
};

exports.dataNotExistsAtColumn = dataNotExistsAtColumn;
var emptyColumnRenderer = {
  isInstance: function isInstance(columnName, data) {
    return dataNotExistsAtColumn(columnName, data);
  },
  renderColumn: function renderColumn(_ref) {
    var columnName = _ref.columnName,
        eventId = _ref.eventId,
        field = _ref.field,
        timelineId = _ref.timelineId,
        truncate = _ref.truncate;
    return _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
      dataProvider: {
        enabled: true,
        id: (0, _helpers.escapeDataProviderId)("empty-column-renderer-draggable-wrapper-".concat(timelineId, "-").concat(columnName, "-").concat(eventId, "-").concat(field.id)),
        name: "".concat(columnName, ": ").concat((0, _parse_query_value.parseQueryValue)(null)),
        queryMatch: {
          field: field.id,
          value: (0, _parse_query_value.parseQueryValue)(null),
          displayValue: (0, _empty_value.getEmptyValue)(),
          operator: _data_provider.EXISTS_OPERATOR
        },
        excluded: true,
        kqlQuery: '',
        and: []
      },
      key: "empty-column-renderer-draggable-wrapper-".concat(timelineId, "-").concat(columnName, "-").concat(eventId, "-").concat(field.id),
      render: function render(dataProvider, _, snapshot) {
        return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
          dataProvider: dataProvider
        })) : _react.default.createElement("span", null, (0, _empty_value.getEmptyValue)());
      },
      truncate: truncate
    });
  }
};
exports.emptyColumnRenderer = emptyColumnRenderer;
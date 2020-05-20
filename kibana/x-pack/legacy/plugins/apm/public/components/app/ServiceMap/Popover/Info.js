"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Info = Info;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _elasticsearch_fieldnames = require("../../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ItemRow = _styledComponents.default.div.withConfig({
  displayName: "ItemRow",
  componentId: "y947w1-0"
})(["line-height:2;"]);

var ItemTitle = _styledComponents.default.dt.withConfig({
  displayName: "ItemTitle",
  componentId: "y947w1-1"
})(["color:", ";"], _eui_theme_light.default.textColors.subdued);

var ItemDescription = _styledComponents.default.dd.withConfig({
  displayName: "ItemDescription",
  componentId: "y947w1-2"
})([""]);

function Info(data) {
  // For nodes with span.type "db", convert it to "database".
  // Otherwise leave it as-is.
  var type = data[_elasticsearch_fieldnames.SPAN_TYPE] === 'db' ? 'database' : data[_elasticsearch_fieldnames.SPAN_TYPE]; // Externals should not have a subtype so make it undefined if the type is external.

  var subtype = data[_elasticsearch_fieldnames.SPAN_TYPE] !== 'external' && data[_elasticsearch_fieldnames.SPAN_SUBTYPE];
  var listItems = [{
    title: _i18n.i18n.translate('xpack.apm.serviceMap.typePopoverMetric', {
      defaultMessage: 'Type'
    }),
    description: type
  }, {
    title: _i18n.i18n.translate('xpack.apm.serviceMap.subtypePopoverMetric', {
      defaultMessage: 'Subtype'
    }),
    description: subtype
  }];
  return _react.default.createElement(_react.default.Fragment, null, listItems.map(function (_ref) {
    var title = _ref.title,
        description = _ref.description;
    return description && _react.default.createElement(ItemRow, {
      key: title
    }, _react.default.createElement(ItemTitle, null, title), _react.default.createElement(ItemDescription, null, description));
  }));
}
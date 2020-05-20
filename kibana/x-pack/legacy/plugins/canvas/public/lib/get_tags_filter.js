"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTagsFilter = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _tag = require("../components/tag");

var _get_id = require("./get_id");

var _tags_registry = require("./tags_registry");

var _i18n = require("../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.ComponentStrings.WorkpadTemplates; // EUI helper function
// generates the FieldValueSelectionFilter object for EuiSearchBar for tag filtering

var getTagsFilter = function getTagsFilter(type) {
  var uniqueTags = (0, _lodash.sortBy)(Object.values(_tags_registry.tagsRegistry.toJS()), 'name');
  return {
    type: 'field_value_selection',
    field: 'tag',
    name: strings.getTableTagsColumnTitle(),
    multiSelect: true,
    options: uniqueTags.map(function (_ref) {
      var name = _ref.name,
          color = _ref.color;
      return {
        value: name,
        name: name,
        view: _react.default.createElement("div", null, _react.default.createElement(_tag.Tag, {
          key: (0, _get_id.getId)('tag'),
          color: color,
          name: name,
          type: type
        }))
      };
    })
  };
};

exports.getTagsFilter = getTagsFilter;
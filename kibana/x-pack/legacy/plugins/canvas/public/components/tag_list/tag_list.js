"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _get_id = require("../../lib/get_id");

var _tag = require("../tag");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TagList = function TagList(_ref) {
  var _ref$tags = _ref.tags,
      tags = _ref$tags === void 0 ? [] : _ref$tags,
      _ref$tagType = _ref.tagType,
      tagType = _ref$tagType === void 0 ? 'health' : _ref$tagType,
      getTag = _ref.getTag;
  return _react.default.createElement(_react.Fragment, null, tags.length ? tags.map(function (tag) {
    var _getTag = getTag(tag),
        color = _getTag.color,
        name = _getTag.name;

    var id = (0, _get_id.getId)('tag');
    return _react.default.createElement(_tag.Tag, {
      key: id,
      color: color,
      name: name,
      type: tagType
    });
  }) : null);
};

exports.TagList = TagList;
TagList.propTypes = {
  tags: _propTypes.default.array,
  tagType: _propTypes.default.oneOf(['health', 'badge']),
  getTag: _propTypes.default.func.isRequired
};
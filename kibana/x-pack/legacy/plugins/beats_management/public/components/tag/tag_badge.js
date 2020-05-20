"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagBadge = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TagBadge = function TagBadge(props) {
  var iconType = props.iconType,
      onClick = props.onClick,
      onClickAriaLabel = props.onClickAriaLabel,
      tag = props.tag;
  var maxIdRenderSize = props.maxIdRenderSize || _constants.TABLE_CONFIG.TRUNCATE_TAG_LENGTH;
  var idToRender = "".concat(tag.name.substring(0, maxIdRenderSize)).concat(tag.name.length > maxIdRenderSize ? '...' : '');

  if (tag.disabled) {
    return _react.default.createElement(_eui.EuiBadge, {
      color: "default",
      iconType: "cross"
    }, idToRender);
  } else if (onClick && onClickAriaLabel) {
    return _react.default.createElement(_eui.EuiBadge, {
      color: tag.color || 'primary',
      iconType: iconType,
      onClick: onClick,
      onClickAriaLabel: onClickAriaLabel
    }, idToRender);
  } else {
    return _react.default.createElement(_eui.EuiBadge, {
      color: tag.color || 'primary',
      iconType: iconType
    }, idToRender);
  }
};

exports.TagBadge = TagBadge;
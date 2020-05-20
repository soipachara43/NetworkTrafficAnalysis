"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Title = exports.TitleComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _context = require("../../context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * The title of the workpad displayed in the left-hand of the footer.
 */
const TitleComponent = ({
  title
}) => _react.default.createElement(_eui.EuiFlexGroup, {
  gutterSize: "s",
  justifyContent: "flexStart",
  alignItems: "center"
}, _react.default.createElement(_eui.EuiFlexItem, {
  grow: false,
  style: {
    flexShrink: 0
  }
}, _react.default.createElement(_eui.EuiLink, {
  href: "https://www.elastic.co",
  title: "Powered by Elastic.co"
}, _react.default.createElement(_eui.EuiIcon, {
  type: "logoElastic",
  size: "l"
}))), _react.default.createElement(_eui.EuiFlexItem, {
  grow: false,
  style: {
    minWidth: 0,
    cursor: 'default'
  }
}, _react.default.createElement(_eui.EuiText, {
  color: "ghost",
  size: "s"
}, _react.default.createElement("div", {
  className: "eui-textTruncate"
}, title))));
/**
 * A store-connected container for the `Title` component.
 */


exports.TitleComponent = TitleComponent;

const Title = () => {
  const [{
    workpad
  }] = (0, _context.useCanvasShareableState)();

  if (!workpad) {
    return null;
  }

  const {
    name: title
  } = workpad;
  return _react.default.createElement(TitleComponent, {
    title
  });
};

exports.Title = Title;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = exports.FooterComponent = exports.FOOTER_HEIGHT = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _context = require("../../context");

var _scrubber = require("./scrubber");

var _title = require("./title");

var _page_controls = require("./page_controls");

var _settings = require("./settings");

var _footerModule = _interopRequireDefault(require("./footer.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const FOOTER_HEIGHT = 48;
exports.FOOTER_HEIGHT = FOOTER_HEIGHT;

/**
 * The Footer of the Shareable Canvas Workpad.
 */
const FooterComponent = ({
  isAutohide = false,
  isHidden = false
}) => {
  const {
    root,
    bar,
    title
  } = _footerModule.default;
  return _react.default.createElement("div", {
    className: root,
    style: {
      height: FOOTER_HEIGHT
    }
  }, _react.default.createElement(_scrubber.Scrubber, null), _react.default.createElement("div", {
    className: bar,
    style: {
      bottom: isAutohide && isHidden ? -FOOTER_HEIGHT : 0
    }
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    className: title
  }, _react.default.createElement(_title.Title, null)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_page_controls.PageControls, null), _react.default.createElement(_settings.Settings, null))))));
};
/**
 * A store-connected container for the `Footer` component.
 */


exports.FooterComponent = FooterComponent;

const Footer = ({
  isHidden = false
}) => {
  const [{
    workpad,
    settings
  }] = (0, _context.useCanvasShareableState)();

  if (!workpad) {
    return null;
  }

  const {
    toolbar
  } = settings;
  const {
    isAutohide
  } = toolbar;
  return _react.default.createElement(FooterComponent, {
    isHidden,
    isAutohide
  });
};

exports.Footer = Footer;
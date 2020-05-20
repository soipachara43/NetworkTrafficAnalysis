"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlSettings = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _popover = require("../../popover");

var _auto_refresh_controls = require("./auto_refresh_controls");

var _kiosk_controls = require("./kiosk_controls");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local
var strings = _i18n.ComponentStrings.WorkpadHeaderControlSettings;

var ControlSettings = function ControlSettings(_ref) {
  var setRefreshInterval = _ref.setRefreshInterval,
      refreshInterval = _ref.refreshInterval,
      autoplayEnabled = _ref.autoplayEnabled,
      autoplayInterval = _ref.autoplayInterval,
      enableAutoplay = _ref.enableAutoplay,
      setAutoplayInterval = _ref.setAutoplayInterval;

  var _setRefresh = function setRefresh(val) {
    return setRefreshInterval(val);
  };

  var _disableInterval = function disableInterval() {
    _setRefresh(0);
  };

  var popoverButton = function popoverButton(handleClick) {
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "bottom",
      content: strings.getTooltip()
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      iconType: "gear",
      "aria-label": strings.getTooltip(),
      onClick: handleClick
    }));
  };

  return _react.default.createElement(_popover.Popover, {
    id: "auto-refresh-popover",
    button: popoverButton,
    anchorPosition: "rightUp",
    panelClassName: "canvasControlSettings__popover"
  }, function () {
    return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_auto_refresh_controls.AutoRefreshControls, {
      refreshInterval: refreshInterval,
      setRefresh: function setRefresh(val) {
        return _setRefresh(val);
      },
      disableInterval: function disableInterval() {
        return _disableInterval();
      }
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_kiosk_controls.KioskControls, {
      autoplayEnabled: autoplayEnabled,
      autoplayInterval: autoplayInterval,
      onSetInterval: setAutoplayInterval,
      onSetEnabled: enableAutoplay
    })));
  });
};

exports.ControlSettings = ControlSettings;
ControlSettings.propTypes = {
  refreshInterval: _propTypes.default.number,
  setRefreshInterval: _propTypes.default.func.isRequired,
  autoplayEnabled: _propTypes.default.bool,
  autoplayInterval: _propTypes.default.number,
  enableAutoplay: _propTypes.default.func.isRequired,
  setAutoplayInterval: _propTypes.default.func.isRequired
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pin = exports.getPinIcon = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var i18n = _interopRequireWildcard(require("../../components/timeline/body/translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getPinIcon = function getPinIcon(pinned) {
  return pinned ? 'pinFilled' : 'pin';
};

exports.getPinIcon = getPinIcon;

var Pin = _react.default.memo(function (_ref) {
  var allowUnpinning = _ref.allowUnpinning,
      _ref$iconSize = _ref.iconSize,
      iconSize = _ref$iconSize === void 0 ? 'm' : _ref$iconSize,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? _fp.noop : _ref$onClick,
      pinned = _ref.pinned;
  return _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": pinned ? i18n.PINNED : i18n.UNPINNED,
    "data-test-subj": "pin",
    iconSize: iconSize,
    iconType: getPinIcon(pinned),
    isDisabled: allowUnpinning ? false : true,
    onClick: onClick
  });
});

exports.Pin = Pin;
Pin.displayName = 'Pin';
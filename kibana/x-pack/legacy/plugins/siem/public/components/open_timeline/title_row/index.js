"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TitleRow = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var i18n = _interopRequireWildcard(require("../translations"));

var _header_section = require("../../header_section");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Renders the row containing the tile (e.g. Open Timelines / All timelines)
 * and action buttons (i.e. Favorite Selected and Delete Selected)
 */
var TitleRow = _react.default.memo(function (_ref) {
  var children = _ref.children,
      onAddTimelinesToFavorites = _ref.onAddTimelinesToFavorites,
      selectedTimelinesCount = _ref.selectedTimelinesCount,
      title = _ref.title;
  return _react.default.createElement(_header_section.HeaderSection, {
    title: title,
    split: true
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    responsive: false
  }, onAddTimelinesToFavorites && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "favorite-selected",
    iconSide: "left",
    iconType: "starEmptySpace",
    isDisabled: selectedTimelinesCount === 0,
    onClick: onAddTimelinesToFavorites
  }, i18n.FAVORITE_SELECTED)), children && _react.default.createElement(_eui.EuiFlexItem, null, children)));
});

exports.TitleRow = TitleRow;
TitleRow.displayName = 'TitleRow';
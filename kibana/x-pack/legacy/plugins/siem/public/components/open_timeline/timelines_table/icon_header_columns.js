"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIconHeaderColumns = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _common_styles = require("./common_styles");

var _helpers = require("../helpers");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */

/**
 * Returns the columns that have icon headers
 */
var getIconHeaderColumns = function getIconHeaderColumns() {
  return [{
    align: 'center',
    field: 'pinnedEventIds',
    name: _react.default.createElement(_eui.EuiToolTip, {
      content: i18n.PINNED_EVENTS
    }, _react.default.createElement(_eui.EuiIcon, {
      "data-test-subj": "pinned-event-header-icon",
      size: "m",
      type: "pin"
    })),
    render: function render(_, timelineResult) {
      return _react.default.createElement("span", {
        "data-test-subj": "pinned-event-count"
      }, "".concat((0, _helpers.getPinnedEventCount)(timelineResult)));
    },
    sortable: false,
    width: _common_styles.ACTION_COLUMN_WIDTH
  }, {
    align: 'center',
    field: 'eventIdToNoteIds',
    name: _react.default.createElement(_eui.EuiToolTip, {
      content: i18n.NOTES
    }, _react.default.createElement(_eui.EuiIcon, {
      "data-test-subj": "notes-count-header-icon",
      size: "m",
      type: "editorComment"
    })),
    render: function render(_, timelineResult) {
      return _react.default.createElement("span", {
        "data-test-subj": "notes-count"
      }, (0, _helpers.getNotesCount)(timelineResult));
    },
    sortable: false,
    width: _common_styles.ACTION_COLUMN_WIDTH
  }, {
    align: 'center',
    field: 'favorite',
    name: _react.default.createElement(_eui.EuiToolTip, {
      content: i18n.FAVORITES
    }, _react.default.createElement(_eui.EuiIcon, {
      "data-test-subj": "favorites-header-icon",
      size: "m",
      type: "starEmpty"
    })),
    render: function render(favorite) {
      var isFavorite = favorite != null && favorite.length > 0;
      var fill = isFavorite ? 'starFilled' : 'starEmpty';
      return _react.default.createElement(_eui.EuiIcon, {
        "data-test-subj": "favorite-".concat(fill, "-star"),
        type: fill,
        size: "m"
      });
    },
    sortable: false,
    width: _common_styles.ACTION_COLUMN_WIDTH
  }];
};

exports.getIconHeaderColumns = getIconHeaderColumns;
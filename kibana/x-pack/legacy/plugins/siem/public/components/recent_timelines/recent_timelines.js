"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentTimelines = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _header = require("./header");

var _with_hover_actions = require("../with_hover_actions");

var _counts = require("./counts");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RecentTimelines = _react.default.memo(function (_ref) {
  var noTimelinesMessage = _ref.noTimelinesMessage,
      onOpenTimeline = _ref.onOpenTimeline,
      timelines = _ref.timelines;

  if (timelines.length === 0) {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiText, {
      color: "subdued",
      size: "s"
    }, noTimelinesMessage));
  }

  return _react.default.createElement(_react.default.Fragment, null, timelines.map(function (t, i) {
    return _react.default.createElement(_react.default.Fragment, {
      key: "".concat(t.savedObjectId, "-").concat(i)
    }, _react.default.createElement(_with_hover_actions.WithHoverActions, {
      render: function render(showHoverContent) {
        return _react.default.createElement(_eui.EuiFlexGroup, {
          gutterSize: "none",
          justifyContent: "spaceBetween"
        }, _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_header.RecentTimelineHeader, {
          onOpenTimeline: onOpenTimeline,
          timeline: t
        }), _react.default.createElement(_counts.RecentTimelineCounts, {
          timeline: t
        }), t.description && t.description.length && _react.default.createElement(_eui.EuiText, {
          color: "subdued",
          size: "xs"
        }, t.description)), showHoverContent && _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_eui.EuiToolTip, {
          content: i18n.OPEN_AS_DUPLICATE
        }, _react.default.createElement(_eui.EuiButtonIcon, {
          "aria-label": i18n.OPEN_AS_DUPLICATE,
          "data-test-subj": "open-duplicate",
          isDisabled: t.savedObjectId == null,
          iconSize: "s",
          iconType: "copy",
          onClick: function onClick() {
            return onOpenTimeline({
              duplicate: true,
              timelineId: "".concat(t.savedObjectId)
            });
          },
          size: "s"
        }))));
      }
    }), _react.default.createElement(_react.default.Fragment, null, i !== timelines.length - 1 && _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    })));
  }));
});

exports.RecentTimelines = RecentTimelines;
RecentTimelines.displayName = 'RecentTimelines';
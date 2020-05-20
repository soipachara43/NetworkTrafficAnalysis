"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentTimelineHeader = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _helpers = require("../../open_timeline/helpers");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RecentTimelineHeader = _react.default.memo(function (_ref) {
  var onOpenTimeline = _ref.onOpenTimeline,
      timeline = _ref.timeline,
      _ref$timeline = _ref.timeline,
      title = _ref$timeline.title,
      savedObjectId = _ref$timeline.savedObjectId;
  var onClick = (0, _react.useCallback)(function () {
    return onOpenTimeline({
      duplicate: false,
      timelineId: "".concat(savedObjectId)
    });
  }, [onOpenTimeline, savedObjectId]);
  return _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement(_eui.EuiLink, {
    onClick: onClick
  }, (0, _helpers.isUntitled)(timeline) ? i18n.UNTITLED_TIMELINE : title));
});

exports.RecentTimelineHeader = RecentTimelineHeader;
RecentTimelineHeader.displayName = 'RecentTimelineHeader';
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrimarySecondaryUserInfo = exports.PrimarySecondary = exports.nilOrUnSet = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../../draggables");

var i18n = _interopRequireWildcard(require("./translations"));

var _helpers = require("../helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var nilOrUnSet = function nilOrUnSet(value) {
  return value == null || value.toLowerCase() === 'unset';
};

exports.nilOrUnSet = nilOrUnSet;

var PrimarySecondary = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      primary = _ref.primary,
      secondary = _ref.secondary;

  if (nilOrUnSet(primary) && nilOrUnSet(secondary)) {
    return null;
  } else if (!nilOrUnSet(primary) && nilOrUnSet(secondary)) {
    return _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      eventId: eventId,
      field: "auditd.summary.actor.primary",
      value: primary,
      iconType: "user"
    });
  } else if (nilOrUnSet(primary) && !nilOrUnSet(secondary)) {
    return _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      eventId: eventId,
      field: "auditd.summary.actor.secondary",
      value: secondary,
      iconType: "user"
    });
  } else if (primary === secondary) {
    return _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      eventId: eventId,
      field: "auditd.summary.actor.secondary",
      value: secondary,
      iconType: "user"
    });
  } else {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "none"
    }, _react.default.createElement(_helpers.TokensFlexItem, {
      grow: false,
      component: "span"
    }, _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      eventId: eventId,
      field: "auditd.summary.actor.primary",
      value: primary,
      iconType: "user"
    })), _react.default.createElement(_helpers.TokensFlexItem, {
      grow: false,
      component: "span"
    }, i18n.AS), _react.default.createElement(_helpers.TokensFlexItem, {
      grow: false,
      component: "span"
    }, _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      eventId: eventId,
      field: "auditd.summary.actor.secondary",
      value: secondary,
      iconType: "user"
    })));
  }
});

exports.PrimarySecondary = PrimarySecondary;
PrimarySecondary.displayName = 'PrimarySecondary';

var PrimarySecondaryUserInfo = _react.default.memo(function (_ref2) {
  var contextId = _ref2.contextId,
      eventId = _ref2.eventId,
      userName = _ref2.userName,
      primary = _ref2.primary,
      secondary = _ref2.secondary;

  if (nilOrUnSet(userName) && nilOrUnSet(primary) && nilOrUnSet(secondary)) {
    return null;
  } else if (!nilOrUnSet(userName) && !nilOrUnSet(primary) && !nilOrUnSet(secondary) && userName === primary && userName === secondary) {
    return _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      eventId: eventId,
      field: "user.name",
      value: userName,
      iconType: "user"
    });
  } else if (!nilOrUnSet(userName) && nilOrUnSet(primary) && nilOrUnSet(secondary)) {
    return _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      eventId: eventId,
      field: "user.name",
      value: userName,
      iconType: "user"
    });
  } else {
    return _react.default.createElement(PrimarySecondary, {
      contextId: contextId,
      eventId: eventId,
      primary: primary,
      secondary: secondary
    });
  }
});

exports.PrimarySecondaryUserInfo = PrimarySecondaryUserInfo;
PrimarySecondaryUserInfo.displayName = 'PrimarySecondaryUserInfo';
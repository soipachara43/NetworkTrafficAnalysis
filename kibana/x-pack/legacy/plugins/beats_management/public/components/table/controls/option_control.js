"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionControl = void 0;

var _react = _interopRequireDefault(require("react"));

var _action_schema = require("../action_schema");

var _action_control = require("./action_control");

var _tag_badge_list = require("./tag_badge_list");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OptionControl = function OptionControl(props) {
  switch (props.type) {
    case _action_schema.ActionComponentType.Action:
      if (!props.action) {
        throw Error('Action cannot be undefined');
      }

      return _react.default.createElement(_action_control.ActionControl, {
        actionHandler: props.actionHandler,
        action: props.action,
        danger: props.danger,
        name: props.name,
        showWarning: props.showWarning,
        warningHeading: props.warningHeading,
        warningMessage: props.warningMessage,
        disabled: props.disabled
      });

    case _action_schema.ActionComponentType.TagBadgeList:
      if (!props.actionDataKey) {
        throw Error('actionDataKey cannot be undefined');
      }

      if (!props.actionData) {
        throw Error('actionData cannot be undefined');
      }

      return _react.default.createElement(_tag_badge_list.TagBadgeList, {
        actionHandler: props.actionHandler,
        action: props.action,
        name: props.name,
        items: props.actionData[props.actionDataKey],
        disabled: props.disabled
      });
  }

  return _react.default.createElement("div", null, "Invalid config");
};

exports.OptionControl = OptionControl;
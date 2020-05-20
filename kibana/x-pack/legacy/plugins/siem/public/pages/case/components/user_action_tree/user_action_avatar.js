"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserActionAvatar = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UserActionAvatar = function UserActionAvatar(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_eui.EuiAvatar, {
    "data-test-subj": "user-action-avatar",
    className: "userAction__circle",
    name: name
  });
};

exports.UserActionAvatar = UserActionAvatar;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _fp = require("lodash/fp");

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MyAvatar = (0, _styledComponents.default)(_eui.EuiAvatar).withConfig({
  displayName: "MyAvatar",
  componentId: "sc-1lc5i16-0"
})(["top:-4px;"]);
var MyFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "MyFlexGroup",
  componentId: "sc-1lc5i16-1"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["margin-top:", ";"], theme.eui.euiSizeM);
});

var renderUsers = function renderUsers(users, handleSendEmail) {
  return users.map(function (_ref2, key) {
    var fullName = _ref2.fullName,
        username = _ref2.username,
        email = _ref2.email;
    return _react.default.createElement(MyFlexGroup, {
      key: key,
      justifyContent: "spaceBetween"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "xs"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(MyAvatar, {
      name: fullName ? fullName : username !== null && username !== void 0 ? username : ''
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: _react.default.createElement("p", null, fullName ? fullName : username !== null && username !== void 0 ? username : '')
    }, _react.default.createElement("p", null, _react.default.createElement("strong", null, _react.default.createElement("small", {
      "data-test-subj": "case-view-username"
    }, username))))))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      "data-test-subj": "user-list-email-button",
      onClick: handleSendEmail.bind(null, email),
      iconType: "email",
      "aria-label": i18n.SEND_EMAIL_ARIA(fullName ? fullName : username !== null && username !== void 0 ? username : ''),
      isDisabled: (0, _fp.isEmpty)(email)
    })));
  });
};

var UserList = _react.default.memo(function (_ref3) {
  var email = _ref3.email,
      headline = _ref3.headline,
      loading = _ref3.loading,
      users = _ref3.users;
  var handleSendEmail = (0, _react.useCallback)(function (emailAddress) {
    if (emailAddress && emailAddress != null) {
      window.open("mailto:".concat(emailAddress, "?subject=").concat(email.subject, "&body=").concat(email.body), '_blank');
    }
  }, [email.subject]);
  return users.filter(function (_ref4) {
    var username = _ref4.username;
    return username != null && username !== '';
  }).length > 0 ? _react.default.createElement(_eui.EuiText, null, _react.default.createElement("h4", null, headline), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "xs"
  }), loading && _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiLoadingSpinner, null))), renderUsers(users.filter(function (_ref5) {
    var username = _ref5.username;
    return username != null && username !== '';
  }), handleSendEmail)) : null;
});

exports.UserList = UserList;
UserList.displayName = 'UserList';
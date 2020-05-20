"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserActionItem = exports.UserActionItemContainer = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _user_action_avatar = require("./user_action_avatar");

var _user_action_title = require("./user_action_title");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UserActionItemContainer = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "UserActionItemContainer",
  componentId: "sc-1ud1xp6-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["&{background-image:linear-gradient( to right,transparent 0,transparent 15px,", " 15px,", " 17px,transparent 17px,transparent 100% );background-repeat:no-repeat;background-position:left ", ";margin-bottom:", ";}.userAction__panel{margin-bottom:", ";}.userAction__circle{flex-shrink:0;margin-right:", ";vertical-align:top;}.userAction_loadingAvatar{position:relative;margin-right:", ";top:", ";left:", ";}.userAction__title{padding:", " ", ";background:", ";border-bottom:", ";border-radius:", " ", " 0 0;}.euiText--small *{margin-bottom:0;}"], theme.eui.euiBorderColor, theme.eui.euiBorderColor, theme.eui.euiSizeXXL, theme.eui.euiSizeS, theme.eui.euiSize, theme.eui.euiSize, theme.eui.euiSizeXL, theme.eui.euiSizeM, theme.eui.euiSizeS, theme.eui.euiSizeS, theme.eui.euiSizeL, theme.eui.euiColorLightestShade, theme.eui.euiBorderThin, theme.eui.euiBorderRadius, theme.eui.euiBorderRadius);
});
exports.UserActionItemContainer = UserActionItemContainer;
var MyEuiPanel = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "MyEuiPanel",
  componentId: "sc-1ud1xp6-1"
})(["", ""], function (_ref2) {
  var theme = _ref2.theme,
      showoutline = _ref2.showoutline;
  return showoutline === 'true' ? "\n      outline: solid 5px ".concat(theme.eui.euiColorVis1_behindText, ";\n      margin: 0.5em;\n      transition: 0.8s;\n    ") : '';
});
var PushedContainer = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "PushedContainer",
  componentId: "sc-1ud1xp6-2"
})(["", ""], function (_ref3) {
  var theme = _ref3.theme;
  return "\n    margin-top: ".concat(theme.eui.euiSizeS, ";\n    margin-bottom: ").concat(theme.eui.euiSizeXL, ";\n    hr {\n      margin: 5px;\n      height: ").concat(theme.eui.euiBorderWidthThick, ";\n    }\n  ");
});

var PushedInfoContainer = _styledComponents.default.div.withConfig({
  displayName: "PushedInfoContainer",
  componentId: "sc-1ud1xp6-3"
})(["margin-left:48px;"]);

var UserActionItem = function UserActionItem(_ref4) {
  var createdAt = _ref4.createdAt,
      disabled = _ref4.disabled,
      id = _ref4.id,
      idToOutline = _ref4.idToOutline,
      isEditable = _ref4.isEditable,
      isLoading = _ref4.isLoading,
      labelEditAction = _ref4.labelEditAction,
      labelQuoteAction = _ref4.labelQuoteAction,
      labelTitle = _ref4.labelTitle,
      linkId = _ref4.linkId,
      fullName = _ref4.fullName,
      markdown = _ref4.markdown,
      onEdit = _ref4.onEdit,
      onQuote = _ref4.onQuote,
      outlineComment = _ref4.outlineComment,
      showBottomFooter = _ref4.showBottomFooter,
      showTopFooter = _ref4.showTopFooter,
      username = _ref4.username,
      updatedAt = _ref4.updatedAt;
  return _react.default.createElement(UserActionItemContainer, {
    gutterSize: 'none',
    direction: "column"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: 'none'
  }, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "user-action-".concat(id, "-avatar"),
    grow: false
  }, fullName && fullName.length > 0 || username && username.length > 0 ? _react.default.createElement(_user_action_avatar.UserActionAvatar, {
    name: fullName && fullName.length > 0 ? fullName : username !== null && username !== void 0 ? username : ''
  }) : _react.default.createElement(_eui.EuiLoadingSpinner, {
    className: "userAction_loadingAvatar"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "user-action-".concat(id)
  }, isEditable && markdown, !isEditable && _react.default.createElement(MyEuiPanel, {
    className: "userAction__panel",
    paddingSize: "none",
    showoutline: id === idToOutline ? 'true' : 'false'
  }, _react.default.createElement(_user_action_title.UserActionTitle, {
    createdAt: createdAt,
    disabled: disabled,
    id: id,
    isLoading: isLoading,
    labelEditAction: labelEditAction,
    labelQuoteAction: labelQuoteAction,
    labelTitle: labelTitle !== null && labelTitle !== void 0 ? labelTitle : _react.default.createElement(_react.default.Fragment, null),
    linkId: linkId,
    fullName: fullName,
    username: username,
    updatedAt: updatedAt,
    onEdit: onEdit,
    onQuote: onQuote,
    outlineComment: outlineComment
  }), markdown)))), showTopFooter && _react.default.createElement(PushedContainer, null, _react.default.createElement(PushedInfoContainer, null, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, i18n.ALREADY_PUSHED_TO_SERVICE)), _react.default.createElement(_eui.EuiHorizontalRule, null), showBottomFooter && _react.default.createElement(PushedInfoContainer, null, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, i18n.REQUIRED_UPDATE_TO_SERVICE))));
};

exports.UserActionItem = UserActionItem;
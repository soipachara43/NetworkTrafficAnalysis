"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLabelTitle = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var i18n = _interopRequireWildcard(require("../case_view/translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getLabelTitle = function getLabelTitle(_ref) {
  var action = _ref.action,
      field = _ref.field,
      firstIndexPushToService = _ref.firstIndexPushToService,
      index = _ref.index;

  if (field === 'tags') {
    return getTagsLabelTitle(action);
  } else if (field === 'title' && action.action === 'update') {
    return "".concat(i18n.CHANGED_FIELD.toLowerCase(), " ").concat(i18n.CASE_NAME.toLowerCase(), "  ").concat(i18n.TO, " \"").concat(action.newValue, "\"");
  } else if (field === 'description' && action.action === 'update') {
    return "".concat(i18n.EDITED_FIELD, " ").concat(i18n.DESCRIPTION.toLowerCase());
  } else if (field === 'status' && action.action === 'update') {
    return "".concat(action.newValue === 'open' ? i18n.REOPENED_CASE.toLowerCase() : i18n.CLOSED_CASE.toLowerCase(), " ").concat(i18n.CASE);
  } else if (field === 'comment' && action.action === 'update') {
    return "".concat(i18n.EDITED_FIELD, " ").concat(i18n.COMMENT.toLowerCase());
  } else if (field === 'pushed' && action.action === 'push-to-service' && action.newValue != null) {
    return getPushedServiceLabelTitle(action, firstIndexPushToService, index);
  }

  return '';
};

exports.getLabelTitle = getLabelTitle;

var getTagsLabelTitle = function getTagsLabelTitle(action) {
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "baseline",
    gutterSize: "xs",
    component: "span"
  }, _react.default.createElement(_eui.EuiFlexItem, null, action.action === 'add' && i18n.ADDED_FIELD, action.action === 'delete' && i18n.REMOVED_FIELD, " ", i18n.TAGS.toLowerCase()), action.newValue != null && action.newValue.split(',').map(function (tag) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: tag
    }, _react.default.createElement(_eui.EuiBadge, {
      color: "default"
    }, tag));
  }));
};

var getPushedServiceLabelTitle = function getPushedServiceLabelTitle(action, firstIndexPushToService, index) {
  var _action$newValue;

  var pushedVal = JSON.parse((_action$newValue = action.newValue) !== null && _action$newValue !== void 0 ? _action$newValue : '');
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "baseline",
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiFlexItem, null, firstIndexPushToService === index ? i18n.PUSHED_NEW_INCIDENT : i18n.UPDATE_INCIDENT), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLink, {
    href: pushedVal === null || pushedVal === void 0 ? void 0 : pushedVal.external_url,
    target: "_blank"
  }, pushedVal === null || pushedVal === void 0 ? void 0 : pushedVal.connector_name, " ", pushedVal === null || pushedVal === void 0 ? void 0 : pushedVal.external_title)));
};
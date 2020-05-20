"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProviderItemAndDragDrop = void 0;

var _eui = require("@elastic/eui");

var _polished = require("polished");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _and_or_badge = require("../../and_or_badge");

var _provider_item_and = require("./provider_item_and");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DropAndTargetDataProvidersContainer = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "DropAndTargetDataProvidersContainer",
  componentId: "sc-1qeio8t-0"
})(["margin:0px 8px;"]);
DropAndTargetDataProvidersContainer.displayName = 'DropAndTargetDataProvidersContainer';

var DropAndTargetDataProviders = _styledComponents.default.div.withConfig({
  displayName: "DropAndTargetDataProviders",
  componentId: "sc-1qeio8t-1"
})(["min-width:230px;width:auto;border:0.1rem dashed ", ";border-radius:5px;text-align:center;padding:3px 10px;display:flex;justify-content:center;align-items:center;", ";cursor:", ";"], function (props) {
  return props.theme.eui.euiColorSuccess;
}, function (props) {
  return props.hasAndItem ? "&:hover {\n    transition: background-color 0.7s ease;\n    background-color: ".concat(function () {
    return (0, _polished.rgba)(props.theme.eui.euiColorSuccess, 0.2);
  }, ";\n  }") : '';
}, function (_ref) {
  var hasAndItem = _ref.hasAndItem;
  return !hasAndItem ? "default" : 'inherit';
});

DropAndTargetDataProviders.displayName = 'DropAndTargetDataProviders';
var NumberProviderAndBadge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "NumberProviderAndBadge",
  componentId: "sc-1qeio8t-2"
})(["margin:0px 5px;"]);
NumberProviderAndBadge.displayName = 'NumberProviderAndBadge';

var ProviderItemAndDragDrop = _react.default.memo(function (_ref2) {
  var browserFields = _ref2.browserFields,
      dataProvider = _ref2.dataProvider,
      onChangeDataProviderKqlQuery = _ref2.onChangeDataProviderKqlQuery,
      onChangeDroppableAndProvider = _ref2.onChangeDroppableAndProvider,
      onDataProviderEdited = _ref2.onDataProviderEdited,
      onDataProviderRemoved = _ref2.onDataProviderRemoved,
      onToggleDataProviderEnabled = _ref2.onToggleDataProviderEnabled,
      onToggleDataProviderExcluded = _ref2.onToggleDataProviderExcluded,
      timelineId = _ref2.timelineId;
  var onMouseEnter = (0, _react.useCallback)(function () {
    return onChangeDroppableAndProvider(dataProvider.id);
  }, [onChangeDroppableAndProvider, dataProvider.id]);
  var onMouseLeave = (0, _react.useCallback)(function () {
    return onChangeDroppableAndProvider('');
  }, [onChangeDroppableAndProvider]);
  var hasAndItem = dataProvider.and.length > 0;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "row",
    gutterSize: "none",
    justifyContent: "flexStart",
    alignItems: "center"
  }, _react.default.createElement(DropAndTargetDataProvidersContainer, {
    className: "drop-and-provider-timeline"
  }, _react.default.createElement(DropAndTargetDataProviders, {
    hasAndItem: hasAndItem,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, hasAndItem && _react.default.createElement(NumberProviderAndBadge, {
    color: "primary"
  }, dataProvider.and.length), _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "xs"
  }, i18n.DROP_HERE_TO_ADD_AN), _react.default.createElement(_and_or_badge.AndOrBadge, {
    type: "and"
  }))), _react.default.createElement(_provider_item_and.ProviderItemAnd, {
    browserFields: browserFields,
    dataProvidersAnd: dataProvider.and,
    providerId: dataProvider.id,
    onChangeDataProviderKqlQuery: onChangeDataProviderKqlQuery,
    onDataProviderEdited: onDataProviderEdited,
    onDataProviderRemoved: onDataProviderRemoved,
    onToggleDataProviderEnabled: onToggleDataProviderEnabled,
    onToggleDataProviderExcluded: onToggleDataProviderExcluded,
    timelineId: timelineId
  }));
});

exports.ProviderItemAndDragDrop = ProviderItemAndDragDrop;
ProviderItemAndDragDrop.displayName = 'ProviderItemAndDragDrop';
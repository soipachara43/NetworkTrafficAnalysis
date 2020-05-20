"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataProviders = void 0;

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _droppable_wrapper = require("../../drag_and_drop/droppable_wrapper");

var _helpers = require("../../drag_and_drop/helpers");

var _timeline_context = require("../timeline_context");

var _empty = require("./empty");

var _providers = require("./providers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DropTargetDataProvidersContainer = _styledComponents.default.div.withConfig({
  displayName: "DropTargetDataProvidersContainer",
  componentId: "btpngf-0"
})([".", " & .drop-target-data-providers{background:", ";border:0.2rem dashed ", ";& .euiTextColor--subdued{color:", ";}& .euiFormHelpText{color:", ";}}"], _helpers.IS_DRAGGING_CLASS_NAME, function (_ref) {
  var theme = _ref.theme;
  return (0, _polished.rgba)(theme.eui.euiColorSuccess, 0.1);
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.eui.euiColorSuccess;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.eui.euiColorSuccess;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.eui.euiColorSuccess;
});

var DropTargetDataProviders = _styledComponents.default.div.withConfig({
  displayName: "DropTargetDataProviders",
  componentId: "btpngf-1"
})(["position:relative;border:0.2rem dashed ", ";border-radius:5px;display:flex;flex-direction:column;justify-content:center;margin:5px 0 5px 0;min-height:100px;overflow-y:auto;background-color:", ";"], function (props) {
  return props.theme.eui.euiColorMediumShade;
}, function (props) {
  return props.theme.eui.euiFormBackgroundColor;
});

DropTargetDataProviders.displayName = 'DropTargetDataProviders';

var getDroppableId = function getDroppableId(id) {
  return "".concat(_helpers.droppableTimelineProvidersPrefix).concat(id);
};
/**
 * Renders the data providers section of the timeline.
 *
 * The data providers section is a drop target where users
 * can drag-and drop new data providers into the timeline.
 *
 * It renders an interactive card representation of the
 * data providers. It also provides uniform
 * UI controls for the following actions:
 * 1) removing a data provider
 * 2) temporarily disabling a data provider
 * 3) applying boolean negation to the data provider
 *
 * Given an empty collection of DataProvider[], it prompts
 * the user to drop anything with a facet count into
 * the data pro section.
 */


var DataProviders = _react.default.memo(function (_ref5) {
  var browserFields = _ref5.browserFields,
      id = _ref5.id,
      dataProviders = _ref5.dataProviders,
      onChangeDataProviderKqlQuery = _ref5.onChangeDataProviderKqlQuery,
      onChangeDroppableAndProvider = _ref5.onChangeDroppableAndProvider,
      onDataProviderEdited = _ref5.onDataProviderEdited,
      onDataProviderRemoved = _ref5.onDataProviderRemoved,
      onToggleDataProviderEnabled = _ref5.onToggleDataProviderEnabled,
      onToggleDataProviderExcluded = _ref5.onToggleDataProviderExcluded,
      show = _ref5.show;
  return _react.default.createElement(DropTargetDataProvidersContainer, {
    className: "drop-target-data-providers-container"
  }, _react.default.createElement(DropTargetDataProviders, {
    className: "drop-target-data-providers",
    "data-test-subj": "dataProviders"
  }, _react.default.createElement(_timeline_context.TimelineContext.Consumer, null, function (isLoading) {
    return _react.default.createElement(_droppable_wrapper.DroppableWrapper, {
      isDropDisabled: !show || isLoading,
      droppableId: getDroppableId(id)
    }, dataProviders != null && dataProviders.length ? _react.default.createElement(_providers.Providers, {
      browserFields: browserFields,
      id: id,
      dataProviders: dataProviders,
      onChangeDataProviderKqlQuery: onChangeDataProviderKqlQuery,
      onChangeDroppableAndProvider: onChangeDroppableAndProvider,
      onDataProviderEdited: onDataProviderEdited,
      onDataProviderRemoved: onDataProviderRemoved,
      onToggleDataProviderEnabled: onToggleDataProviderEnabled,
      onToggleDataProviderExcluded: onToggleDataProviderExcluded
    }) : _react.default.createElement(_empty.Empty, null));
  })));
});

exports.DataProviders = DataProviders;
DataProviders.displayName = 'DataProviders';
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_TIMELINE_FIELD_DRAGGING_CLASS_NAME = exports.IS_DRAGGING_CLASS_NAME = exports.DRAG_TYPE_FIELD = exports.updateShowTimeline = exports.addFieldToTimelineColumns = exports.addProviderToTimeline = exports.providerWasDroppedOnTimelineButton = exports.fieldWasDroppedOnTimelineColumns = exports.providerWasDroppedOnTimeline = exports.unEscapeFieldId = exports.escapeFieldId = exports.escapeContextId = exports.escapeDataProviderId = exports.getFieldIdFromDraggable = exports.getProviderIdFromDraggable = exports.getTimelineIdFromDestination = exports.destinationIsTimelineButton = exports.destinationIsTimelineColumns = exports.destinationIsTimelineProviders = exports.reasonIsDrop = exports.draggableIsField = exports.draggableIsContent = exports.sourceIsContent = exports.getDroppableId = exports.getDraggableFieldId = exports.getDraggableId = exports.droppableTimelineFlyoutButtonPrefix = exports.droppableTimelineColumnsPrefix = exports.droppableTimelineProvidersPrefix = exports.droppableFieldPrefix = exports.droppableContentPrefix = exports.draggableFieldPrefix = exports.draggableContentPrefix = exports.droppableIdPrefix = exports.draggableIdPrefix = void 0;

var _fp = require("lodash/fp");

var _source = require("../../containers/source");

var _constants = require("../timeline/body/constants");

var _actions = require("../../store/actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var draggableIdPrefix = 'draggableId';
exports.draggableIdPrefix = draggableIdPrefix;
var droppableIdPrefix = 'droppableId';
exports.droppableIdPrefix = droppableIdPrefix;
var draggableContentPrefix = "".concat(draggableIdPrefix, ".content.");
exports.draggableContentPrefix = draggableContentPrefix;
var draggableFieldPrefix = "".concat(draggableIdPrefix, ".field.");
exports.draggableFieldPrefix = draggableFieldPrefix;
var droppableContentPrefix = "".concat(droppableIdPrefix, ".content.");
exports.droppableContentPrefix = droppableContentPrefix;
var droppableFieldPrefix = "".concat(droppableIdPrefix, ".field.");
exports.droppableFieldPrefix = droppableFieldPrefix;
var droppableTimelineProvidersPrefix = "".concat(droppableIdPrefix, ".timelineProviders.");
exports.droppableTimelineProvidersPrefix = droppableTimelineProvidersPrefix;
var droppableTimelineColumnsPrefix = "".concat(droppableIdPrefix, ".timelineColumns.");
exports.droppableTimelineColumnsPrefix = droppableTimelineColumnsPrefix;
var droppableTimelineFlyoutButtonPrefix = "".concat(droppableIdPrefix, ".flyoutButton.");
exports.droppableTimelineFlyoutButtonPrefix = droppableTimelineFlyoutButtonPrefix;

var getDraggableId = function getDraggableId(dataProviderId) {
  return "".concat(draggableContentPrefix).concat(dataProviderId);
};

exports.getDraggableId = getDraggableId;

var getDraggableFieldId = function getDraggableFieldId(_ref) {
  var contextId = _ref.contextId,
      fieldId = _ref.fieldId;
  return "".concat(draggableFieldPrefix).concat(escapeContextId(contextId), ".").concat(escapeFieldId(fieldId));
};

exports.getDraggableFieldId = getDraggableFieldId;

var getDroppableId = function getDroppableId(visualizationPlaceholderId) {
  return "".concat(droppableContentPrefix).concat(visualizationPlaceholderId);
};

exports.getDroppableId = getDroppableId;

var sourceIsContent = function sourceIsContent(result) {
  return result.source.droppableId.startsWith(droppableContentPrefix);
};

exports.sourceIsContent = sourceIsContent;

var draggableIsContent = function draggableIsContent(result) {
  return result.draggableId.startsWith(draggableContentPrefix);
};

exports.draggableIsContent = draggableIsContent;

var draggableIsField = function draggableIsField(result) {
  return result.draggableId.startsWith(draggableFieldPrefix);
};

exports.draggableIsField = draggableIsField;

var reasonIsDrop = function reasonIsDrop(result) {
  return result.reason === 'DROP';
};

exports.reasonIsDrop = reasonIsDrop;

var destinationIsTimelineProviders = function destinationIsTimelineProviders(result) {
  return result.destination != null && result.destination.droppableId.startsWith(droppableTimelineProvidersPrefix);
};

exports.destinationIsTimelineProviders = destinationIsTimelineProviders;

var destinationIsTimelineColumns = function destinationIsTimelineColumns(result) {
  return result.destination != null && result.destination.droppableId.startsWith(droppableTimelineColumnsPrefix);
};

exports.destinationIsTimelineColumns = destinationIsTimelineColumns;

var destinationIsTimelineButton = function destinationIsTimelineButton(result) {
  return result.destination != null && result.destination.droppableId.startsWith(droppableTimelineFlyoutButtonPrefix);
};

exports.destinationIsTimelineButton = destinationIsTimelineButton;

var getTimelineIdFromDestination = function getTimelineIdFromDestination(result) {
  return result.destination != null && (destinationIsTimelineProviders(result) || destinationIsTimelineButton(result) || destinationIsTimelineColumns(result)) ? result.destination.droppableId.substring(result.destination.droppableId.lastIndexOf('.') + 1) : '';
};

exports.getTimelineIdFromDestination = getTimelineIdFromDestination;

var getProviderIdFromDraggable = function getProviderIdFromDraggable(result) {
  return result.draggableId.substring(result.draggableId.lastIndexOf('.') + 1);
};

exports.getProviderIdFromDraggable = getProviderIdFromDraggable;

var getFieldIdFromDraggable = function getFieldIdFromDraggable(result) {
  return unEscapeFieldId(result.draggableId.substring(result.draggableId.lastIndexOf('.') + 1));
};

exports.getFieldIdFromDraggable = getFieldIdFromDraggable;

var escapeDataProviderId = function escapeDataProviderId(path) {
  return path.replace(/\./g, '_');
};

exports.escapeDataProviderId = escapeDataProviderId;

var escapeContextId = function escapeContextId(path) {
  return path.replace(/\./g, '_');
};

exports.escapeContextId = escapeContextId;

var escapeFieldId = function escapeFieldId(path) {
  return path.replace(/\./g, '!!!DOT!!!');
};

exports.escapeFieldId = escapeFieldId;

var unEscapeFieldId = function unEscapeFieldId(path) {
  return path.replace(/!!!DOT!!!/g, '.');
};

exports.unEscapeFieldId = unEscapeFieldId;

var providerWasDroppedOnTimeline = function providerWasDroppedOnTimeline(result) {
  return reasonIsDrop(result) && draggableIsContent(result) && sourceIsContent(result) && destinationIsTimelineProviders(result);
};

exports.providerWasDroppedOnTimeline = providerWasDroppedOnTimeline;

var fieldWasDroppedOnTimelineColumns = function fieldWasDroppedOnTimelineColumns(result) {
  return reasonIsDrop(result) && draggableIsField(result) && destinationIsTimelineColumns(result);
};

exports.fieldWasDroppedOnTimelineColumns = fieldWasDroppedOnTimelineColumns;

var providerWasDroppedOnTimelineButton = function providerWasDroppedOnTimelineButton(result) {
  return reasonIsDrop(result) && draggableIsContent(result) && sourceIsContent(result) && destinationIsTimelineButton(result);
};

exports.providerWasDroppedOnTimelineButton = providerWasDroppedOnTimelineButton;

var addProviderToTimeline = function addProviderToTimeline(_ref2) {
  var dataProviders = _ref2.dataProviders,
      result = _ref2.result,
      dispatch = _ref2.dispatch,
      _ref2$addProvider = _ref2.addProvider,
      addProvider = _ref2$addProvider === void 0 ? _actions.timelineActions.addProvider : _ref2$addProvider,
      _ref2$noProviderFound = _ref2.noProviderFound,
      noProviderFound = _ref2$noProviderFound === void 0 ? _actions.dragAndDropActions.noProviderFound : _ref2$noProviderFound;
  var timeline = getTimelineIdFromDestination(result);
  var providerId = getProviderIdFromDraggable(result);
  var provider = dataProviders[providerId];

  if (provider) {
    dispatch(addProvider({
      id: timeline,
      provider: provider
    }));
  } else {
    dispatch(noProviderFound({
      id: providerId
    }));
  }
};

exports.addProviderToTimeline = addProviderToTimeline;

var addFieldToTimelineColumns = function addFieldToTimelineColumns(_ref3) {
  var _ref3$upsertColumn = _ref3.upsertColumn,
      upsertColumn = _ref3$upsertColumn === void 0 ? _actions.timelineActions.upsertColumn : _ref3$upsertColumn,
      browserFields = _ref3.browserFields,
      dispatch = _ref3.dispatch,
      result = _ref3.result;
  var timeline = getTimelineIdFromDestination(result);
  var fieldId = getFieldIdFromDraggable(result);
  var allColumns = (0, _source.getAllFieldsByName)(browserFields);
  var column = allColumns[fieldId];

  if (column != null) {
    dispatch(upsertColumn({
      column: {
        category: column.category,
        columnHeaderType: 'not-filtered',
        description: (0, _fp.isString)(column.description) ? column.description : undefined,
        example: (0, _fp.isString)(column.example) ? column.example : undefined,
        id: fieldId,
        type: column.type,
        aggregatable: column.aggregatable,
        width: _constants.DEFAULT_COLUMN_MIN_WIDTH
      },
      id: timeline,
      index: result.destination != null ? result.destination.index : 0
    }));
  } else {
    // create a column definition, because it doesn't exist in the browserFields:
    dispatch(upsertColumn({
      column: {
        columnHeaderType: 'not-filtered',
        id: fieldId,
        width: _constants.DEFAULT_COLUMN_MIN_WIDTH
      },
      id: timeline,
      index: result.destination != null ? result.destination.index : 0
    }));
  }
};

exports.addFieldToTimelineColumns = addFieldToTimelineColumns;

var updateShowTimeline = function updateShowTimeline(_ref4) {
  var result = _ref4.result,
      show = _ref4.show,
      dispatch = _ref4.dispatch,
      _ref4$showTimeline = _ref4.showTimeline,
      showTimeline = _ref4$showTimeline === void 0 ? _actions.timelineActions.showTimeline : _ref4$showTimeline;
  var timeline = getTimelineIdFromDestination(result);
  dispatch(showTimeline({
    id: timeline,
    show: show
  }));
};
/**
 * Prevents fields from being dragged or dropped to any area other than column
 * header drop zone in the timeline
 */


exports.updateShowTimeline = updateShowTimeline;
var DRAG_TYPE_FIELD = 'drag-type-field';
/** This class is added to the document body while dragging */

exports.DRAG_TYPE_FIELD = DRAG_TYPE_FIELD;
var IS_DRAGGING_CLASS_NAME = 'is-dragging';
/** This class is added to the document body while timeline field dragging */

exports.IS_DRAGGING_CLASS_NAME = IS_DRAGGING_CLASS_NAME;
var IS_TIMELINE_FIELD_DRAGGING_CLASS_NAME = 'is-timeline-field-dragging';
exports.IS_TIMELINE_FIELD_DRAGGING_CLASS_NAME = IS_TIMELINE_FIELD_DRAGGING_CLASS_NAME;
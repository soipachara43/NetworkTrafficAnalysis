"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canHandleDrop = canHandleDrop;
exports.onDrop = onDrop;
exports.IndexPatternDimensionEditor = exports.IndexPatternDimensionTrigger = exports.IndexPatternDimensionEditorComponent = exports.IndexPatternDimensionTriggerComponent = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _operations = require("../operations");

var _popover_editor = require("./popover_editor");

var _state_helpers = require("../state_helpers");

var _utils = require("../utils");

var _lens_ui_telemetry = require("../../lens_ui_telemetry");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// TODO: This code has historically been memoized, as a potentially performance
// sensitive task. If we can add memoization without breaking the behavior, we should.
var getOperationFieldSupportMatrix = function getOperationFieldSupportMatrix(props) {
  var layerId = props.layerId;
  var currentIndexPattern = props.state.indexPatterns[props.state.layers[layerId].indexPatternId];
  var filteredOperationsByMetadata = (0, _operations.getAvailableOperationsByMetadata)(currentIndexPattern).filter(function (operation) {
    return props.filterOperations(operation.operationMetaData);
  });
  var supportedOperationsByField = {};
  var supportedFieldsByOperation = {};
  filteredOperationsByMetadata.forEach(function (_ref) {
    var operations = _ref.operations;
    operations.forEach(function (operation) {
      if (supportedOperationsByField[operation.field]) {
        supportedOperationsByField[operation.field].push(operation.operationType);
      } else {
        supportedOperationsByField[operation.field] = [operation.operationType];
      }

      if (supportedFieldsByOperation[operation.operationType]) {
        supportedFieldsByOperation[operation.operationType].push(operation.field);
      } else {
        supportedFieldsByOperation[operation.operationType] = [operation.field];
      }
    });
  });
  return {
    operationByField: _lodash.default.mapValues(supportedOperationsByField, _lodash.default.uniq),
    fieldByOperation: _lodash.default.mapValues(supportedFieldsByOperation, _lodash.default.uniq)
  };
};

function canHandleDrop(props) {
  var operationFieldSupportMatrix = getOperationFieldSupportMatrix(props);
  var dragging = props.dragDropContext.dragging;
  var layerIndexPatternId = props.state.layers[props.layerId].indexPatternId;

  function hasOperationForField(field) {
    return Boolean(operationFieldSupportMatrix.operationByField[field.name]);
  }

  return (0, _utils.isDraggedField)(dragging) && layerIndexPatternId === dragging.indexPatternId && Boolean(hasOperationForField(dragging.field));
}

function onDrop(props) {
  var _props$state$layers$l;

  var operationFieldSupportMatrix = getOperationFieldSupportMatrix(props);
  var droppedItem = props.droppedItem;

  function hasOperationForField(field) {
    return Boolean(operationFieldSupportMatrix.operationByField[field.name]);
  }

  if (!(0, _utils.isDraggedField)(droppedItem) || !hasOperationForField(droppedItem.field)) {
    // TODO: What do we do if we couldn't find a column?
    return false;
  }

  var operationsForNewField = operationFieldSupportMatrix.operationByField[droppedItem.field.name];
  var layerId = props.layerId;
  var selectedColumn = props.state.layers[layerId].columns[props.columnId] || null;
  var currentIndexPattern = props.state.indexPatterns[(_props$state$layers$l = props.state.layers[layerId]) === null || _props$state$layers$l === void 0 ? void 0 : _props$state$layers$l.indexPatternId]; // We need to check if dragging in a new field, was just a field change on the same
  // index pattern and on the same operations (therefore checking if the new field supports
  // our previous operation)

  var hasFieldChanged = selectedColumn && (0, _utils.hasField)(selectedColumn) && selectedColumn.sourceField !== droppedItem.field.name && operationsForNewField && operationsForNewField.includes(selectedColumn.operationType); // If only the field has changed use the onFieldChange method on the operation to get the
  // new column, otherwise use the regular buildColumn to get a new column.

  var newColumn = hasFieldChanged ? (0, _operations.changeField)(selectedColumn, currentIndexPattern, droppedItem.field) : (0, _operations.buildColumn)({
    op: operationsForNewField ? operationsForNewField[0] : undefined,
    columns: props.state.layers[props.layerId].columns,
    indexPattern: currentIndexPattern,
    layerId: layerId,
    suggestedPriority: props.suggestedPriority,
    field: droppedItem.field,
    previousColumn: selectedColumn
  });
  (0, _lens_ui_telemetry.trackUiEvent)('drop_onto_dimension');
  var hasData = Object.values(props.state.layers).some(function (_ref2) {
    var columns = _ref2.columns;
    return columns.length;
  });
  (0, _lens_ui_telemetry.trackUiEvent)(hasData ? 'drop_non_empty' : 'drop_empty');
  props.setState((0, _state_helpers.changeColumn)({
    state: props.state,
    layerId: layerId,
    columnId: props.columnId,
    newColumn: newColumn,
    // If the field has changed, the onFieldChange method needs to take care of everything including moving
    // over params. If we create a new column above we want changeColumn to move over params.
    keepParams: !hasFieldChanged
  }));
  return true;
}

var IndexPatternDimensionTriggerComponent = function IndexPatternDimensionTrigger(props) {
  var layerId = props.layerId;
  var selectedColumn = props.state.layers[layerId].columns[props.columnId] || null;
  var columnId = props.columnId,
      uniqueLabel = props.uniqueLabel;

  if (!selectedColumn) {
    return null;
  }

  return _react.default.createElement(_eui.EuiLink, {
    id: columnId,
    className: "lnsConfigPanel__triggerLink",
    onClick: function onClick() {
      props.togglePopover();
    },
    "data-test-subj": "lns-dimensionTrigger",
    "aria-label": _i18n.i18n.translate('xpack.lens.configure.editConfig', {
      defaultMessage: 'Edit configuration'
    }),
    title: _i18n.i18n.translate('xpack.lens.configure.editConfig', {
      defaultMessage: 'Edit configuration'
    })
  }, uniqueLabel);
};

exports.IndexPatternDimensionTriggerComponent = IndexPatternDimensionTriggerComponent;

var IndexPatternDimensionEditorComponent = function IndexPatternDimensionPanel(props) {
  var _props$state$layers$l2;

  var layerId = props.layerId;
  var currentIndexPattern = props.state.indexPatterns[(_props$state$layers$l2 = props.state.layers[layerId]) === null || _props$state$layers$l2 === void 0 ? void 0 : _props$state$layers$l2.indexPatternId];
  var operationFieldSupportMatrix = getOperationFieldSupportMatrix(props);
  var selectedColumn = props.state.layers[layerId].columns[props.columnId] || null;
  return _react.default.createElement(_popover_editor.PopoverEditor, _extends({}, props, {
    currentIndexPattern: currentIndexPattern,
    selectedColumn: selectedColumn,
    operationFieldSupportMatrix: operationFieldSupportMatrix
  }));
};

exports.IndexPatternDimensionEditorComponent = IndexPatternDimensionEditorComponent;
var IndexPatternDimensionTrigger = (0, _react.memo)(IndexPatternDimensionTriggerComponent);
exports.IndexPatternDimensionTrigger = IndexPatternDimensionTrigger;
var IndexPatternDimensionEditor = (0, _react.memo)(IndexPatternDimensionEditorComponent);
exports.IndexPatternDimensionEditor = IndexPatternDimensionEditor;
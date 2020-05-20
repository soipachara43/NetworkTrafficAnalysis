"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoverEditor = PopoverEditor;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _classnames = _interopRequireDefault(require("classnames"));

var _operations = require("../operations");

var _state_helpers = require("../state_helpers");

var _field_select = require("./field_select");

var _utils = require("../utils");

var _bucket_nesting_editor = require("./bucket_nesting_editor");

var _lens_ui_telemetry = require("../../lens_ui_telemetry");

var _format_selector = require("./format_selector");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var operationPanels = (0, _operations.getOperationDisplay)();

function asOperationOptions(operationTypes, compatibleWithCurrentField) {
  return _toConsumableArray(operationTypes).sort(function (opType1, opType2) {
    return operationPanels[opType1].displayName.localeCompare(operationPanels[opType2].displayName);
  }).map(function (operationType) {
    return {
      operationType: operationType,
      compatibleWithCurrentField: compatibleWithCurrentField
    };
  });
}

function PopoverEditor(props) {
  var selectedColumn = props.selectedColumn,
      operationFieldSupportMatrix = props.operationFieldSupportMatrix,
      state = props.state,
      columnId = props.columnId,
      setState = props.setState,
      layerId = props.layerId,
      currentIndexPattern = props.currentIndexPattern,
      hideGrouping = props.hideGrouping;
  var operationByField = operationFieldSupportMatrix.operationByField,
      fieldByOperation = operationFieldSupportMatrix.fieldByOperation;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      incompatibleSelectedOperationType = _useState2[0],
      setInvalidOperationType = _useState2[1];

  var ParamEditor = selectedColumn && _operations.operationDefinitionMap[selectedColumn.operationType].paramEditor;
  var fieldMap = (0, _react.useMemo)(function () {
    var fields = {};
    currentIndexPattern.fields.forEach(function (field) {
      fields[field.name] = field;
    });
    return fields;
  }, [currentIndexPattern]);

  function getOperationTypes() {
    var possibleOperationTypes = Object.keys(fieldByOperation);
    var validOperationTypes = [];

    if (!selectedColumn) {
      validOperationTypes.push.apply(validOperationTypes, _toConsumableArray(Object.keys(fieldByOperation)));
    } else if ((0, _utils.hasField)(selectedColumn) && operationByField[selectedColumn.sourceField]) {
      validOperationTypes.push.apply(validOperationTypes, _toConsumableArray(operationByField[selectedColumn.sourceField]));
    }

    return _lodash.default.uniq([].concat(_toConsumableArray(asOperationOptions(validOperationTypes, true)), _toConsumableArray(asOperationOptions(possibleOperationTypes, false))), 'operationType');
  }

  function getSideNavItems() {
    return [{
      name: '',
      id: '0',
      items: getOperationTypes().map(function (_ref) {
        var operationType = _ref.operationType,
            compatibleWithCurrentField = _ref.compatibleWithCurrentField;
        return {
          name: operationPanels[operationType].displayName,
          id: operationType,
          className: (0, _classnames.default)('lnsIndexPatternDimensionEditor__operation', {
            'lnsIndexPatternDimensionEditor__operation--selected': Boolean(incompatibleSelectedOperationType === operationType || !incompatibleSelectedOperationType && selectedColumn && selectedColumn.operationType === operationType),
            'lnsIndexPatternDimensionEditor__operation--incompatible': !compatibleWithCurrentField
          }),
          'data-test-subj': "lns-indexPatternDimension".concat(compatibleWithCurrentField ? '' : 'Incompatible', "-").concat(operationType),
          onClick: function onClick() {
            if (!selectedColumn || !compatibleWithCurrentField) {
              var possibleFields = fieldByOperation[operationType] || [];

              if (possibleFields.length === 1) {
                setState((0, _state_helpers.changeColumn)({
                  state: state,
                  layerId: layerId,
                  columnId: columnId,
                  newColumn: (0, _operations.buildColumn)({
                    columns: props.state.layers[props.layerId].columns,
                    suggestedPriority: props.suggestedPriority,
                    layerId: props.layerId,
                    op: operationType,
                    indexPattern: currentIndexPattern,
                    field: fieldMap[possibleFields[0]],
                    previousColumn: selectedColumn
                  })
                }));
              } else {
                setInvalidOperationType(operationType);
              }

              (0, _lens_ui_telemetry.trackUiEvent)("indexpattern_dimension_operation_".concat(operationType));
              return;
            }

            if (incompatibleSelectedOperationType) {
              setInvalidOperationType(null);
            }

            if (selectedColumn.operationType === operationType) {
              return;
            }

            var newColumn = (0, _operations.buildColumn)({
              columns: props.state.layers[props.layerId].columns,
              suggestedPriority: props.suggestedPriority,
              layerId: props.layerId,
              op: operationType,
              indexPattern: currentIndexPattern,
              field: fieldMap[selectedColumn.sourceField],
              previousColumn: selectedColumn
            });
            (0, _lens_ui_telemetry.trackUiEvent)("indexpattern_dimension_operation_from_".concat(selectedColumn.operationType, "_to_").concat(operationType));
            setState((0, _state_helpers.changeColumn)({
              state: state,
              layerId: layerId,
              columnId: columnId,
              newColumn: newColumn
            }));
          }
        };
      })
    }];
  }

  return _react.default.createElement("div", {
    id: columnId,
    className: "lnsIndexPatternDimensionEditor"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    direction: "column"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_field_select.FieldSelect, {
    currentIndexPattern: currentIndexPattern,
    existingFields: state.existingFields,
    showEmptyFields: state.showEmptyFields,
    fieldMap: fieldMap,
    operationFieldSupportMatrix: operationFieldSupportMatrix,
    selectedColumnOperationType: selectedColumn && selectedColumn.operationType,
    selectedColumnSourceField: selectedColumn && (0, _utils.hasField)(selectedColumn) ? selectedColumn.sourceField : undefined,
    incompatibleSelectedOperationType: incompatibleSelectedOperationType,
    onDeleteColumn: function onDeleteColumn() {
      setState((0, _state_helpers.deleteColumn)({
        state: state,
        layerId: layerId,
        columnId: columnId
      }));
    },
    onChoose: function onChoose(choice) {
      var column;

      if (!incompatibleSelectedOperationType && selectedColumn && 'field' in choice && choice.operationType === selectedColumn.operationType) {
        // If we just changed the field are not in an error state and the operation didn't change,
        // we use the operations onFieldChange method to calculate the new column.
        column = (0, _operations.changeField)(selectedColumn, currentIndexPattern, fieldMap[choice.field]);
      } else {
        // Otherwise we'll use the buildColumn method to calculate a new column
        var compatibleOperations = 'field' in choice && operationFieldSupportMatrix.operationByField[choice.field] || [];
        var operation;

        if (compatibleOperations.length > 0) {
          operation = incompatibleSelectedOperationType && compatibleOperations.includes(incompatibleSelectedOperationType) ? incompatibleSelectedOperationType : compatibleOperations[0];
        } else if ('field' in choice) {
          operation = choice.operationType;
        }

        column = (0, _operations.buildColumn)({
          columns: props.state.layers[props.layerId].columns,
          field: fieldMap[choice.field],
          indexPattern: currentIndexPattern,
          layerId: props.layerId,
          suggestedPriority: props.suggestedPriority,
          op: operation,
          previousColumn: selectedColumn
        });
      }

      setState((0, _state_helpers.changeColumn)({
        state: state,
        layerId: layerId,
        columnId: columnId,
        newColumn: column,
        keepParams: false
      }));
      setInvalidOperationType(null);
    }
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: null,
    className: (0, _classnames.default)('lnsIndexPatternDimensionEditor__left')
  }, _react.default.createElement(_eui.EuiSideNav, {
    items: getSideNavItems()
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: true,
    className: "lnsIndexPatternDimensionEditor__right"
  }, incompatibleSelectedOperationType && selectedColumn && _react.default.createElement(_eui.EuiCallOut, {
    "data-test-subj": "indexPattern-invalid-operation",
    title: _i18n.i18n.translate('xpack.lens.indexPattern.invalidOperationLabel', {
      defaultMessage: 'To use this function, select a different field.'
    }),
    color: "warning",
    size: "s",
    iconType: "sortUp"
  }), incompatibleSelectedOperationType && !selectedColumn && _react.default.createElement(_eui.EuiCallOut, {
    size: "s",
    "data-test-subj": "indexPattern-fieldless-operation",
    title: _i18n.i18n.translate('xpack.lens.indexPattern.fieldlessOperationLabel', {
      defaultMessage: 'To use this function, select a field.'
    }),
    iconType: "sortUp"
  }), !incompatibleSelectedOperationType && ParamEditor && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(ParamEditor, {
    state: state,
    setState: setState,
    columnId: columnId,
    currentColumn: state.layers[layerId].columns[columnId],
    storage: props.storage,
    uiSettings: props.uiSettings,
    savedObjectsClient: props.savedObjectsClient,
    layerId: layerId,
    http: props.http,
    dateRange: props.dateRange,
    data: props.data
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  })), !incompatibleSelectedOperationType && selectedColumn && _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.lens.indexPattern.columnLabel', {
      defaultMessage: 'Label',
      description: 'Label of a column of data'
    }),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiFieldText, {
    compressed: true,
    "data-test-subj": "indexPattern-label-edit",
    value: selectedColumn.label,
    onChange: function onChange(e) {
      setState((0, _state_helpers.changeColumn)({
        state: state,
        layerId: layerId,
        columnId: columnId,
        newColumn: _objectSpread({}, selectedColumn, {
          label: e.target.value
        })
      }));
    }
  })), !hideGrouping && _react.default.createElement(_bucket_nesting_editor.BucketNestingEditor, {
    layer: state.layers[props.layerId],
    columnId: props.columnId,
    setColumns: function setColumns(columnOrder) {
      setState(_objectSpread({}, state, {
        layers: _objectSpread({}, state.layers, _defineProperty({}, props.layerId, _objectSpread({}, state.layers[props.layerId], {
          columnOrder: columnOrder
        })))
      }));
    }
  }), selectedColumn && selectedColumn.dataType === 'number' ? _react.default.createElement(_format_selector.FormatSelector, {
    selectedColumn: selectedColumn,
    onChange: function onChange(newFormat) {
      setState((0, _state_helpers.updateColumnParam)({
        state: state,
        layerId: layerId,
        currentColumn: selectedColumn,
        paramName: 'format',
        value: newFormat
      }));
    }
  }) : null)))));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldSelect = FieldSelect;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _classnames = _interopRequireDefault(require("classnames"));

var _lens_field_icon = require("../lens_field_icon");

var _lens_ui_telemetry = require("../../lens_ui_telemetry");

var _pure_helpers = require("../pure_helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function FieldSelect(_ref) {
  var currentIndexPattern = _ref.currentIndexPattern,
      showEmptyFields = _ref.showEmptyFields,
      fieldMap = _ref.fieldMap,
      incompatibleSelectedOperationType = _ref.incompatibleSelectedOperationType,
      selectedColumnOperationType = _ref.selectedColumnOperationType,
      selectedColumnSourceField = _ref.selectedColumnSourceField,
      operationFieldSupportMatrix = _ref.operationFieldSupportMatrix,
      onChoose = _ref.onChoose,
      onDeleteColumn = _ref.onDeleteColumn,
      existingFields = _ref.existingFields;
  var operationByField = operationFieldSupportMatrix.operationByField;
  var memoizedFieldOptions = (0, _react.useMemo)(function () {
    var fields = Object.keys(operationByField).sort();

    function isCompatibleWithCurrentOperation(fieldName) {
      if (incompatibleSelectedOperationType) {
        return operationByField[fieldName].includes(incompatibleSelectedOperationType);
      }

      return !selectedColumnOperationType || operationByField[fieldName].includes(selectedColumnOperationType);
    }

    var _$partition = _lodash.default.partition(fields, function (field) {
      return fieldMap[field].type === 'document';
    }),
        _$partition2 = _slicedToArray(_$partition, 2),
        specialFields = _$partition2[0],
        normalFields = _$partition2[1];

    function fieldNamesToOptions(items) {
      return items.map(function (field) {
        return {
          label: field,
          value: {
            type: 'field',
            field: field,
            dataType: fieldMap[field].type,
            operationType: selectedColumnOperationType && isCompatibleWithCurrentOperation(field) ? selectedColumnOperationType : undefined
          },
          exists: fieldMap[field].type === 'document' || (0, _pure_helpers.fieldExists)(existingFields, currentIndexPattern.title, field),
          compatible: isCompatibleWithCurrentOperation(field)
        };
      }).filter(function (field) {
        return showEmptyFields || field.exists;
      }).sort(function (a, b) {
        if (a.compatible && !b.compatible) {
          return -1;
        }

        if (!a.compatible && b.compatible) {
          return 1;
        }

        return 0;
      }).map(function (_ref2) {
        var label = _ref2.label,
            value = _ref2.value,
            compatible = _ref2.compatible,
            exists = _ref2.exists;
        return {
          label: label,
          value: value,
          className: (0, _classnames.default)({
            'lnFieldSelect__option--incompatible': !compatible,
            'lnFieldSelect__option--nonExistant': !exists
          }),
          'data-test-subj': "lns-fieldOption".concat(compatible ? '' : 'Incompatible', "-").concat(label)
        };
      });
    }

    var fieldOptions = fieldNamesToOptions(specialFields);

    if (fields.length > 0) {
      fieldOptions.push({
        label: _i18n.i18n.translate('xpack.lens.indexPattern.individualFieldsLabel', {
          defaultMessage: 'Individual fields'
        }),
        options: fieldNamesToOptions(normalFields)
      });
    }

    return fieldOptions;
  }, [incompatibleSelectedOperationType, selectedColumnOperationType, selectedColumnSourceField, operationFieldSupportMatrix, currentIndexPattern, fieldMap, showEmptyFields]);
  return _react.default.createElement(_eui.EuiComboBox, {
    fullWidth: true,
    compressed: true,
    isClearable: false,
    "data-test-subj": "indexPattern-dimension-field",
    placeholder: _i18n.i18n.translate('xpack.lens.indexPattern.fieldPlaceholder', {
      defaultMessage: 'Field'
    }),
    options: memoizedFieldOptions,
    isInvalid: Boolean(incompatibleSelectedOperationType && selectedColumnOperationType),
    selectedOptions: selectedColumnOperationType ? selectedColumnSourceField ? [{
      label: selectedColumnSourceField,
      value: {
        type: 'field',
        field: selectedColumnSourceField
      }
    }] : [memoizedFieldOptions[0]] : [],
    singleSelection: {
      asPlainText: true
    },
    onChange: function onChange(choices) {
      if (choices.length === 0) {
        onDeleteColumn();
        return;
      }

      (0, _lens_ui_telemetry.trackUiEvent)('indexpattern_dimension_field_changed');
      onChoose(choices[0].value);
    },
    renderOption: function renderOption(option, searchValue) {
      return _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s",
        alignItems: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: null
      }, _react.default.createElement(_lens_field_icon.LensFieldIcon, {
        type: option.value.dataType,
        fill: "none"
      })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiHighlight, {
        search: searchValue
      }, option.label)));
    }
  });
}
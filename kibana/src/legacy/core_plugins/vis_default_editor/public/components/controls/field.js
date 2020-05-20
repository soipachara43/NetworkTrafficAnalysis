"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldParamEditor = FieldParamEditor;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var label = _i18n.i18n.translate('visDefaultEditor.controls.field.fieldLabel', {
  defaultMessage: 'Field'
});

function FieldParamEditor(_ref) {
  var agg = _ref.agg,
      aggParam = _ref.aggParam,
      customError = _ref.customError,
      customLabel = _ref.customLabel,
      _ref$indexedFields = _ref.indexedFields,
      indexedFields = _ref$indexedFields === void 0 ? [] : _ref$indexedFields,
      showValidation = _ref.showValidation,
      value = _ref.value,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity,
      setValue = _ref.setValue;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isDirty = _useState2[0],
      setIsDirty = _useState2[1];

  var selectedOptions = value ? [{
    label: value.displayName || value.name,
    target: value
  }] : [];

  var onChange = function onChange(options) {
    var selectedOption = (0, _lodash.get)(options, '0.target');

    if (!(aggParam.required && !selectedOption)) {
      setValue(selectedOption);
    }

    if (aggParam.onChange) {
      aggParam.onChange(agg);
    }
  };

  var errors = customError ? [customError] : [];

  if (!indexedFields.length) {
    errors.push(_i18n.i18n.translate('visDefaultEditor.controls.field.noCompatibleFieldsDescription', {
      defaultMessage: 'The index pattern {indexPatternTitle} does not contain any of the following compatible field types: {fieldTypes}',
      values: {
        indexPatternTitle: agg.getIndexPattern && agg.getIndexPattern().title,
        fieldTypes: getFieldTypesString(agg)
      }
    }));
  }

  var isValid = !!value && !errors.length && !isDirty;
  (0, _utils.useValidation)(setValidity, isValid);
  (0, _react.useEffect)(function () {
    // set field if only one available
    if (indexedFields.length !== 1) {
      return;
    }

    var indexedField = indexedFields[0];

    if (!('options' in indexedField)) {
      setValue(indexedField.target);
    } else if (indexedField.options.length === 1) {
      setValue(indexedField.options[0].target);
    }
  }, []);
  var onSearchChange = (0, _react.useCallback)(function (searchValue) {
    return setIsDirty(Boolean(searchValue));
  }, []);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: customLabel || label,
    isInvalid: showValidation ? !isValid : false,
    fullWidth: true,
    error: errors,
    compressed: true
  }, _react.default.createElement(_eui.EuiComboBox, {
    compressed: true,
    placeholder: _i18n.i18n.translate('visDefaultEditor.controls.field.selectFieldPlaceholder', {
      defaultMessage: 'Select a field'
    }),
    options: indexedFields,
    isDisabled: !indexedFields.length,
    selectedOptions: selectedOptions,
    singleSelection: {
      asPlainText: true
    },
    isClearable: false,
    isInvalid: showValidation ? !isValid : false,
    onChange: onChange,
    onBlur: setTouched,
    onSearchChange: onSearchChange,
    "data-test-subj": "visDefaultEditorField",
    fullWidth: true
  }));
}

function getFieldTypesString(agg) {
  var param = (0, _lodash.get)(agg, 'type.params', []).find(function (p) {
    return p.name === 'field';
  }) || {};
  return (0, _utils.formatListAsProse)((0, _utils.parseCommaSeparatedList)(param.filterFieldTypes), {
    inclusive: false
  });
}
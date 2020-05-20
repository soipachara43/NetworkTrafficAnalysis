"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditorAggSelect = DefaultEditorAggSelect;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _public = require("../../../../../plugins/kibana_react/public");

var _agg_params_state = require("./agg_params_state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DefaultEditorAggSelect(_ref) {
  var aggError = _ref.aggError,
      id = _ref.id,
      indexPattern = _ref.indexPattern,
      value = _ref.value,
      setValue = _ref.setValue,
      aggTypeOptions = _ref.aggTypeOptions,
      showValidation = _ref.showValidation,
      isSubAggregation = _ref.isSubAggregation,
      onChangeAggType = _ref.onChangeAggType;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isDirty = _useState2[0],
      setIsDirty = _useState2[1];

  var _useKibana = (0, _public.useKibana)(),
      services = _useKibana.services;

  var selectedOptions = value ? [{
    label: value.title,
    target: value
  }] : [];
  var label = isSubAggregation ? _react.default.createElement(_react2.FormattedMessage, {
    id: "visDefaultEditor.aggSelect.subAggregationLabel",
    defaultMessage: "Sub aggregation"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "visDefaultEditor.aggSelect.aggregationLabel",
    defaultMessage: "Aggregation"
  });
  var aggHelpLink;

  if ((0, _lodash.has)(value, 'name')) {
    aggHelpLink = services.docLinks.links.aggs[value.name];
  }

  var helpLink = value && aggHelpLink && _react.default.createElement(_eui.EuiLink, {
    href: aggHelpLink,
    target: "_blank",
    rel: "noopener"
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "visDefaultEditor.aggSelect.helpLinkLabel",
    defaultMessage: "{aggTitle} help",
    values: {
      aggTitle: value ? value.title : ''
    }
  })));

  var errors = aggError ? [aggError] : [];

  if (!aggTypeOptions.length) {
    errors.push(_i18n.i18n.translate('visDefaultEditor.aggSelect.noCompatibleAggsDescription', {
      defaultMessage: 'The index pattern {indexPatternTitle} does not have any aggregatable fields.',
      values: {
        indexPatternTitle: indexPattern && indexPattern.title
      }
    }));
  }

  var isValid = !!value && !errors.length && !isDirty;
  var onChange = (0, _react.useCallback)(function (options) {
    var selectedOption = (0, _lodash.get)(options, '0.target');

    if (selectedOption) {
      setValue(selectedOption);
    }
  }, [setValue]);
  var onSearchChange = (0, _react.useCallback)(function (searchValue) {
    return setIsDirty(Boolean(searchValue));
  }, []);
  var setTouched = (0, _react.useCallback)(function () {
    return onChangeAggType({
      type: _agg_params_state.AGG_TYPE_ACTION_KEYS.TOUCHED,
      payload: true
    });
  }, [onChangeAggType]);
  var setValidity = (0, _react.useCallback)(function (valid) {
    return onChangeAggType({
      type: _agg_params_state.AGG_TYPE_ACTION_KEYS.VALID,
      payload: valid
    });
  }, [onChangeAggType]);
  (0, _react.useEffect)(function () {
    setValidity(isValid);
  }, [isValid, setValidity]);
  (0, _react.useEffect)(function () {
    if (errors.length) {
      setTouched();
    }
  }, [errors.length, setTouched]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    labelAppend: helpLink,
    error: errors,
    isInvalid: showValidation ? !isValid : false,
    fullWidth: true,
    compressed: true
  }, _react.default.createElement(_eui.EuiComboBox, {
    placeholder: _i18n.i18n.translate('visDefaultEditor.aggSelect.selectAggPlaceholder', {
      defaultMessage: 'Select an aggregation'
    }),
    id: "visDefaultEditorAggSelect".concat(id),
    isDisabled: !aggTypeOptions.length,
    options: aggTypeOptions,
    selectedOptions: selectedOptions,
    singleSelection: {
      asPlainText: true
    },
    onBlur: setTouched,
    onChange: onChange,
    onSearchChange: onSearchChange,
    "data-test-subj": "defaultEditorAggSelect",
    isClearable: false,
    isInvalid: showValidation ? !isValid : false,
    fullWidth: true,
    compressed: true
  }));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScheduleItem = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _shared_imports = require("../../../../../shared_imports");

var I18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var timeTypeOptions = [{
  value: 's',
  text: I18n.SECONDS
}, {
  value: 'm',
  text: I18n.MINUTES
}, {
  value: 'h',
  text: I18n.HOURS
}]; // move optional label to the end of input

var StyledLabelAppend = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "StyledLabelAppend",
  componentId: "sc-1tm4211-0"
})(["&.euiFlexItem.euiFlexItem--flexGrowZero{margin-left:31px;}"]);
var StyledEuiFormRow = (0, _styledComponents.default)(_eui.EuiFormRow).withConfig({
  displayName: "StyledEuiFormRow",
  componentId: "sc-1tm4211-1"
})(["max-width:none;.euiFormControlLayout{max-width:200px !important;}.euiFormControlLayout__childrenWrapper > *:first-child{box-shadow:none;height:38px;}.euiFormControlLayout:not(:first-child){border-left:1px solid ", ";}"], function (_ref) {
  var theme = _ref.theme;
  return theme.eui.euiColorLightShade;
});
var MyEuiSelect = (0, _styledComponents.default)(_eui.EuiSelect).withConfig({
  displayName: "MyEuiSelect",
  componentId: "sc-1tm4211-2"
})(["width:auto;"]);

var ScheduleItem = function ScheduleItem(_ref2) {
  var dataTestSubj = _ref2.dataTestSubj,
      field = _ref2.field,
      idAria = _ref2.idAria,
      isDisabled = _ref2.isDisabled,
      _ref2$minimumValue = _ref2.minimumValue,
      minimumValue = _ref2$minimumValue === void 0 ? 0 : _ref2$minimumValue;

  var _useState = (0, _react.useState)('s'),
      _useState2 = _slicedToArray(_useState, 2),
      timeType = _useState2[0],
      setTimeType = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      timeVal = _useState4[0],
      setTimeVal = _useState4[1];

  var _getFieldValidityAndE = (0, _shared_imports.getFieldValidityAndErrorMessage)(field),
      isInvalid = _getFieldValidityAndE.isInvalid,
      errorMessage = _getFieldValidityAndE.errorMessage;

  var onChangeTimeType = (0, _react.useCallback)(function (e) {
    setTimeType(e.target.value);
    field.setValue("".concat(timeVal).concat(e.target.value));
  }, [timeVal]);
  var onChangeTimeVal = (0, _react.useCallback)(function (e) {
    var sanitizedValue = parseInt(e.target.value, 10);
    setTimeVal(sanitizedValue);
    field.setValue("".concat(sanitizedValue).concat(timeType));
  }, [timeType]);
  (0, _react.useEffect)(function () {
    if (field.value !== "".concat(timeVal).concat(timeType)) {
      var filterTimeVal = field.value.match(/\d+/g);
      var filterTimeType = field.value.match(/[a-zA-Z]+/g);

      if (!(0, _fp.isEmpty)(filterTimeVal) && filterTimeVal != null && !isNaN(Number(filterTimeVal[0])) && Number(filterTimeVal[0]) !== Number(timeVal)) {
        setTimeVal(Number(filterTimeVal[0]));
      }

      if (!(0, _fp.isEmpty)(filterTimeType) && filterTimeType != null && ['s', 'm', 'h'].includes(filterTimeType[0]) && filterTimeType[0] !== timeType) {
        setTimeType(filterTimeType[0]);
      }
    }
  }, [field.value]); // EUI missing some props

  var rest = {
    disabled: isDisabled
  };
  var label = (0, _react.useMemo)(function () {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s",
      justifyContent: "flexStart",
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      component: "span"
    }, field.label), _react.default.createElement(StyledLabelAppend, {
      grow: false,
      component: "span"
    }, field.labelAppend));
  }, [field.label, field.labelAppend]);
  return _react.default.createElement(StyledEuiFormRow, {
    label: label,
    helpText: field.helpText,
    error: errorMessage,
    isInvalid: isInvalid,
    fullWidth: false,
    "data-test-subj": dataTestSubj,
    describedByIds: idAria ? [idAria] : undefined
  }, _react.default.createElement(_eui.EuiFormControlLayout, {
    append: _react.default.createElement(MyEuiSelect, _extends({
      fullWidth: false,
      options: timeTypeOptions,
      onChange: onChangeTimeType,
      value: timeType
    }, rest))
  }, _react.default.createElement(_eui.EuiFieldNumber, _extends({
    fullWidth: true,
    min: minimumValue,
    onChange: onChangeTimeVal,
    value: timeVal
  }, rest))));
};

exports.ScheduleItem = ScheduleItem;
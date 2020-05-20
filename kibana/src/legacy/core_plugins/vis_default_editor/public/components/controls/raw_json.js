"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawJsonParamEditor = RawJsonParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function RawJsonParamEditor(_ref) {
  var showValidation = _ref.showValidation,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      setValidity = _ref.setValidity,
      setValue = _ref.setValue,
      setTouched = _ref.setTouched;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isFieldValid = _useState2[0],
      setFieldValidity = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      editorReady = _useState4[0],
      setEditorReady = _useState4[1];

  var editorTooltipText = (0, _react.useMemo)(function () {
    return _i18n.i18n.translate('visDefaultEditor.controls.jsonInputTooltip', {
      defaultMessage: "Any JSON formatted properties you add here will be merged with the elasticsearch aggregation definition for this section. For example 'shard_size' on a terms aggregation."
    });
  }, []);
  var jsonEditorLabelText = (0, _react.useMemo)(function () {
    return _i18n.i18n.translate('visDefaultEditor.controls.jsonInputLabel', {
      defaultMessage: 'JSON input'
    });
  }, []);
  var label = (0, _react.useMemo)(function () {
    return _react.default.createElement(_react.default.Fragment, null, jsonEditorLabelText, ' ', _react.default.createElement(_eui.EuiIconTip, {
      position: "right",
      content: editorTooltipText,
      type: "questionInCircle"
    }));
  }, [jsonEditorLabelText, editorTooltipText]);
  var onEditorValidate = (0, _react.useCallback)(function (annotations) {
    // The first onValidate returned from EuiCodeEditor is a false negative
    if (editorReady) {
      var validity = annotations.length === 0;
      setFieldValidity(validity);
      setValidity(validity);
    } else {
      setEditorReady(true);
    }
  }, [setValidity, editorReady]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    isInvalid: showValidation ? !isFieldValid : false,
    fullWidth: true,
    compressed: true
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCodeEditor, {
    mode: "json",
    theme: "github",
    width: "100%",
    height: "250px",
    value: value,
    onValidate: onEditorValidate,
    setOptions: {
      fontSize: '14px'
    },
    onChange: setValue,
    onBlur: setTouched,
    "aria-label": jsonEditorLabelText,
    "aria-describedby": "jsonEditorDescription"
  }), _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("p", {
    id: "jsonEditorDescription"
  }, editorTooltipText))));
}
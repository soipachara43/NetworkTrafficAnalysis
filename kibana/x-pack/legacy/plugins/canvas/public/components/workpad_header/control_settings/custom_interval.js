"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomInterval = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _time_interval = require("../../../lib/time_interval");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var strings = _i18n.ComponentStrings.WorkpadHeaderCustomInterval;

var CustomInterval = function CustomInterval(_ref) {
  var gutterSize = _ref.gutterSize,
      buttonSize = _ref.buttonSize,
      _onSubmit = _ref.onSubmit,
      defaultValue = _ref.defaultValue;

  var _useState = (0, _react.useState)(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      customInterval = _useState2[0],
      setCustomInterval = _useState2[1];

  var refreshInterval = (0, _time_interval.getTimeInterval)(customInterval);
  var isInvalid = Boolean(customInterval.length && !refreshInterval);

  var handleChange = function handleChange(ev) {
    return setCustomInterval(ev.target.value);
  };

  return _react.default.createElement("form", {
    onSubmit: function onSubmit(ev) {
      ev.preventDefault();

      if (!isInvalid && refreshInterval) {
        _onSubmit(refreshInterval);
      }
    }
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: gutterSize
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: strings.getFormLabel(),
    helpText: strings.getFormDescription(),
    compressed: true
  }, _react.default.createElement(_eui.EuiFieldText, {
    isInvalid: isInvalid,
    value: customInterval,
    onChange: handleChange,
    compressed: true
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true,
    compressed: true
  }, _react.default.createElement(_eui.EuiButton, {
    disabled: isInvalid,
    size: buttonSize,
    type: "submit",
    style: {
      minWidth: 'auto'
    }
  }, strings.getButtonLabel())))));
};

exports.CustomInterval = CustomInterval;
CustomInterval.propTypes = {
  buttonSize: _propTypes.default.string,
  gutterSize: _propTypes.default.string,
  defaultValue: _propTypes.default.string,
  onSubmit: _propTypes.default.func.isRequired
};
CustomInterval.defaultProps = {
  buttonSize: 's',
  gutterSize: 's',
  defaultValue: ''
};
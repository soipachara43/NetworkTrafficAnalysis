"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThrottleSelectField = exports.THROTTLE_OPTIONS = void 0;

var _react = _interopRequireWildcard(require("react"));

var _constants = require("../../../../../../common/constants");

var _shared_imports = require("../../../../../shared_imports");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var THROTTLE_OPTIONS = [{
  value: _constants.NOTIFICATION_THROTTLE_NO_ACTIONS,
  text: 'Perform no actions'
}, {
  value: _constants.NOTIFICATION_THROTTLE_RULE,
  text: 'On each rule execution'
}, {
  value: '1h',
  text: 'Hourly'
}, {
  value: '1d',
  text: 'Daily'
}, {
  value: '7d',
  text: 'Weekly'
}];
exports.THROTTLE_OPTIONS = THROTTLE_OPTIONS;

var ThrottleSelectField = function ThrottleSelectField(props) {
  var onChange = (0, _react.useCallback)(function (e) {
    var throttle = e.target.value;
    props.field.setValue(throttle);
    props.handleChange(throttle);
  }, [props.field.setValue, props.handleChange]);

  var newEuiFieldProps = _objectSpread({}, props.euiFieldProps, {
    onChange: onChange
  });

  return _react.default.createElement(_shared_imports.SelectField, _extends({}, props, {
    euiFieldProps: newEuiFieldProps
  }));
};

exports.ThrottleSelectField = ThrottleSelectField;
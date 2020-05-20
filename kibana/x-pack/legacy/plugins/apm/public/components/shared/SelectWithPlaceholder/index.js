"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectWithPlaceholder = exports.NO_SELECTION = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var NO_SELECTION = '__NO_SELECTION__';
exports.NO_SELECTION = NO_SELECTION;

var DEFAULT_PLACEHOLDER = _i18n.i18n.translate('xpack.apm.selectPlaceholder', {
  defaultMessage: 'Select option:'
});
/**
 * This component addresses some cross-browser inconsistencies of `EuiSelect`
 * with `hasNoInitialSelection`. It uses the `placeholder` prop to populate
 * the first option as the initial, not selected option.
 */


var SelectWithPlaceholder = function SelectWithPlaceholder(props) {
  var placeholder = props.placeholder || DEFAULT_PLACEHOLDER;
  return _react.default.createElement(_eui.EuiSelect, _extends({}, props, {
    options: [{
      text: placeholder,
      value: NO_SELECTION
    }].concat(_toConsumableArray(props.options || [])),
    value: (0, _lodash.isEmpty)(props.value) ? NO_SELECTION : props.value,
    onChange: function onChange(e) {
      if (props.onChange) {
        var customEvent = Object.assign(e, {
          target: Object.assign(e.target, {
            value: e.target.value === NO_SELECTION ? '' : e.target.value
          })
        });
        props.onChange(customEvent);
      }
    }
  }));
};

exports.SelectWithPlaceholder = SelectWithPlaceholder;
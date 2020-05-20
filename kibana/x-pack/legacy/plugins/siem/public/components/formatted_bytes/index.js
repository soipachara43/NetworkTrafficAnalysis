"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreferenceFormattedBytes = exports.PreferenceFormattedBytesComponent = exports.useFormatBytes = exports.formatBytes = void 0;

var _react = _interopRequireDefault(require("react"));

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _constants = require("../../../common/constants");

var _kibana = require("../../lib/kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var formatBytes = function formatBytes(value, format) {
  return (0, _numeral.default)(value).format(format);
};

exports.formatBytes = formatBytes;

var useFormatBytes = function useFormatBytes() {
  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_BYTES_FORMAT),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      bytesFormat = _useUiSetting$2[0];

  return function (value) {
    return formatBytes(value, bytesFormat);
  };
};

exports.useFormatBytes = useFormatBytes;

var PreferenceFormattedBytesComponent = function PreferenceFormattedBytesComponent(_ref) {
  var value = _ref.value;
  return _react.default.createElement(_react.default.Fragment, null, useFormatBytes()(value));
};

exports.PreferenceFormattedBytesComponent = PreferenceFormattedBytesComponent;
PreferenceFormattedBytesComponent.displayName = 'PreferenceFormattedBytesComponent';

var PreferenceFormattedBytes = _react.default.memo(PreferenceFormattedBytesComponent);

exports.PreferenceFormattedBytes = PreferenceFormattedBytes;
PreferenceFormattedBytes.displayName = 'PreferenceFormattedBytes';
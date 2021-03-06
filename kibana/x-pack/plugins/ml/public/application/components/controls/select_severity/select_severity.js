"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectSeverity = exports.useTableSeverity = exports.SEVERITY_OPTIONS = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _anomaly_utils = require("../../../../../common/util/anomaly_utils");

var _url_state = require("../../../util/url_state");

var _optionsMap;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var warningLabel = _i18n.i18n.translate('xpack.ml.controls.selectSeverity.warningLabel', {
  defaultMessage: 'warning'
});

var minorLabel = _i18n.i18n.translate('xpack.ml.controls.selectSeverity.minorLabel', {
  defaultMessage: 'minor'
});

var majorLabel = _i18n.i18n.translate('xpack.ml.controls.selectSeverity.majorLabel', {
  defaultMessage: 'major'
});

var criticalLabel = _i18n.i18n.translate('xpack.ml.controls.selectSeverity.criticalLabel', {
  defaultMessage: 'critical'
});

var optionsMap = (_optionsMap = {}, _defineProperty(_optionsMap, warningLabel, 0), _defineProperty(_optionsMap, minorLabel, 25), _defineProperty(_optionsMap, majorLabel, 50), _defineProperty(_optionsMap, criticalLabel, 75), _optionsMap);
var SEVERITY_OPTIONS = [{
  val: 0,
  display: warningLabel,
  color: (0, _anomaly_utils.getSeverityColor)(0)
}, {
  val: 25,
  display: minorLabel,
  color: (0, _anomaly_utils.getSeverityColor)(25)
}, {
  val: 50,
  display: majorLabel,
  color: (0, _anomaly_utils.getSeverityColor)(50)
}, {
  val: 75,
  display: criticalLabel,
  color: (0, _anomaly_utils.getSeverityColor)(75)
}];
exports.SEVERITY_OPTIONS = SEVERITY_OPTIONS;

function optionValueToThreshold(value) {
  // Get corresponding threshold object with required display and val properties from the specified value.
  var threshold = SEVERITY_OPTIONS.find(function (opt) {
    return opt.val === value;
  }); // Default to warning if supplied value doesn't map to one of the options.

  if (threshold === undefined) {
    threshold = SEVERITY_OPTIONS[0];
  }

  return threshold;
}

var TABLE_SEVERITY_DEFAULT = SEVERITY_OPTIONS[0];
var TABLE_SEVERITY_APP_STATE_NAME = 'mlSelectSeverity';

var useTableSeverity = function useTableSeverity() {
  var _useUrlState = (0, _url_state.useUrlState)('_a'),
      _useUrlState2 = _slicedToArray(_useUrlState, 2),
      appState = _useUrlState2[0],
      setAppState = _useUrlState2[1];

  return [appState && appState[TABLE_SEVERITY_APP_STATE_NAME] || TABLE_SEVERITY_DEFAULT, function (d) {
    return setAppState(TABLE_SEVERITY_APP_STATE_NAME, d);
  }];
};

exports.useTableSeverity = useTableSeverity;

var getSeverityOptions = function getSeverityOptions() {
  return SEVERITY_OPTIONS.map(function (_ref) {
    var color = _ref.color,
        display = _ref.display,
        val = _ref.val;
    return {
      value: display,
      inputDisplay: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHealth, {
        color: color,
        style: {
          lineHeight: 'inherit'
        }
      }, display)),
      dropdownDisplay: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHealth, {
        color: color,
        style: {
          lineHeight: 'inherit'
        }
      }, display), _react.default.createElement(_eui.EuiSpacer, {
        size: "xs"
      }), _react.default.createElement(_eui.EuiText, {
        size: "xs",
        color: "subdued"
      }, _react.default.createElement("p", {
        className: "euiTextColor--subdued"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.controls.selectSeverity.scoreDetailsDescription",
        defaultMessage: "score {value} and above",
        values: {
          value: val
        }
      }))))
    };
  });
};

var SelectSeverity = function SelectSeverity() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    classNames: ''
  },
      classNames = _ref2.classNames;

  var _useTableSeverity = useTableSeverity(),
      _useTableSeverity2 = _slicedToArray(_useTableSeverity, 2),
      severity = _useTableSeverity2[0],
      setSeverity = _useTableSeverity2[1];

  var onChange = function onChange(valueDisplay) {
    setSeverity(optionValueToThreshold(optionsMap[valueDisplay]));
  };

  return _react.default.createElement(_eui.EuiSuperSelect, {
    className: classNames,
    hasDividers: true,
    options: getSeverityOptions(),
    valueOfSelected: severity.display,
    onChange: onChange
  });
};

exports.SelectSeverity = SelectSeverity;
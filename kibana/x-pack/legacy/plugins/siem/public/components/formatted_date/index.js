"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormattedRelativePreferenceLabel = exports.FormattedRelativePreferenceDate = exports.FormattedDate = exports.PreferenceFormattedP1DTDate = exports.isP1DTFormatterSetting = exports.PreferenceFormattedDate = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _kibana = require("../../lib/kibana");

var _empty_value = require("../empty_value");

var _localized_date_tooltip = require("../localized_date_tooltip");

var _maybe_date = require("./maybe_date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PreferenceFormattedDate = _react.default.memo(function (_ref) {
  var value = _ref.value,
      _ref$dateFormat = _ref.dateFormat,
      dateFormat = _ref$dateFormat === void 0 ? (0, _kibana.useDateFormat)() : _ref$dateFormat;
  return _react.default.createElement(_react.default.Fragment, null, _momentTimezone.default.tz(value, (0, _kibana.useTimeZone)()).format(dateFormat));
});

exports.PreferenceFormattedDate = PreferenceFormattedDate;
PreferenceFormattedDate.displayName = 'PreferenceFormattedDate';
/**
 * This function may be passed to `Array.find()` to locate the `P1DT`
 * configuration (sub) setting, a string array that contains two entries
 * like the following example: `['P1DT', 'YYYY-MM-DD']`.
 */

var isP1DTFormatterSetting = function isP1DTFormatterSetting(formatNameFormatterPair) {
  return Array.isArray(formatNameFormatterPair) && formatNameFormatterPair[0] === 'P1DT' && formatNameFormatterPair.length === 2;
};
/**
 * Renders a date in `P1DT` format, e.g. `YYYY-MM-DD`, as specified by
 * the `P1DT1` entry in the `dateFormat:scaled` Kibana Advanced setting.
 *
 * If the `P1DT` format is not specified in the `dateFormat:scaled` setting,
 * the fallback format `YYYY-MM-DD` will be applied
 */


exports.isP1DTFormatterSetting = isP1DTFormatterSetting;

var PreferenceFormattedP1DTDate = _react.default.memo(function (_ref2) {
  var value = _ref2.value;

  /**
   * A fallback "format name / formatter" 2-tuple for the `P1DT` formatter, which is
   * one of many such pairs expected to be contained in the `dateFormat:scaled`
   * Kibana advanced setting.
   */
  var FALLBACK_DATE_FORMAT_SCALED_P1DT = ['P1DT', 'YYYY-MM-DD']; // Read the 'dateFormat:scaled' Kibana Advanced setting, which contains 2-tuple sub-settings:

  var _useUiSetting$ = (0, _kibana.useUiSetting$)('dateFormat:scaled'),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      scaledDateFormatPreference = _useUiSetting$2[0]; // attempt to find the nested `['P1DT', 'formatString']` setting


  var maybeP1DTFormatter = Array.isArray(scaledDateFormatPreference) ? scaledDateFormatPreference.find(isP1DTFormatterSetting) : null;
  var p1dtFormat = Array.isArray(maybeP1DTFormatter) && maybeP1DTFormatter.length === 2 ? maybeP1DTFormatter[1] : FALLBACK_DATE_FORMAT_SCALED_P1DT[1];
  return _react.default.createElement(PreferenceFormattedDate, {
    dateFormat: p1dtFormat,
    value: value
  });
});

exports.PreferenceFormattedP1DTDate = PreferenceFormattedP1DTDate;
PreferenceFormattedP1DTDate.displayName = 'PreferenceFormattedP1DTDate';
/**
 * Renders the specified date value in a format determined by the user's preferences,
 * with a tooltip that renders:
 * - the name of the field
 * - a humanized relative date (e.g. 16 minutes ago)
 * - a long representation of the date that includes the day of the week (e.g. Thursday, March 21, 2019 6:47pm)
 * - the raw date value (e.g. 2019-03-22T00:47:46Z)
 */

var FormattedDate = _react.default.memo(function (_ref3) {
  var value = _ref3.value,
      fieldName = _ref3.fieldName;

  if (value == null) {
    return (0, _empty_value.getOrEmptyTagFromValue)(value);
  }

  var maybeDate = (0, _maybe_date.getMaybeDate)(value);
  return maybeDate.isValid() ? _react.default.createElement(_localized_date_tooltip.LocalizedDateTooltip, {
    date: maybeDate.toDate(),
    fieldName: fieldName
  }, _react.default.createElement(PreferenceFormattedDate, {
    value: maybeDate.toDate()
  })) : (0, _empty_value.getOrEmptyTagFromValue)(value);
});

exports.FormattedDate = FormattedDate;
FormattedDate.displayName = 'FormattedDate';
/**
 * Renders the specified date value according to under/over one hour
 * Under an hour = relative format
 * Over an hour = in a format determined by the user's preferences,
 * with a tooltip that renders:
 * - the name of the field
 * - a humanized relative date (e.g. 16 minutes ago)
 * - a long representation of the date that includes the day of the week (e.g. Thursday, March 21, 2019 6:47pm)
 * - the raw date value (e.g. 2019-03-22T00:47:46Z)
 */

var FormattedRelativePreferenceDate = function FormattedRelativePreferenceDate(_ref4) {
  var value = _ref4.value;

  if (value == null) {
    return (0, _empty_value.getOrEmptyTagFromValue)(value);
  }

  var maybeDate = (0, _maybe_date.getMaybeDate)(value);

  if (!maybeDate.isValid()) {
    return (0, _empty_value.getOrEmptyTagFromValue)(value);
  }

  var date = maybeDate.toDate();
  return _react.default.createElement(_localized_date_tooltip.LocalizedDateTooltip, {
    date: date
  }, (0, _momentTimezone.default)(date).add(1, 'hours').isBefore(new Date()) ? _react.default.createElement(PreferenceFormattedDate, {
    "data-test-subj": "preference-time",
    value: date
  }) : _react.default.createElement(_react2.FormattedRelative, {
    "data-test-subj": "relative-time",
    value: date
  }));
};
/**
 * Renders a preceding label according to under/over one hour
 */


exports.FormattedRelativePreferenceDate = FormattedRelativePreferenceDate;

var FormattedRelativePreferenceLabel = function FormattedRelativePreferenceLabel(_ref5) {
  var value = _ref5.value,
      preferenceLabel = _ref5.preferenceLabel,
      relativeLabel = _ref5.relativeLabel;

  if (value == null) {
    return null;
  }

  var maybeDate = (0, _maybe_date.getMaybeDate)(value);

  if (!maybeDate.isValid()) {
    return null;
  }

  return (0, _momentTimezone.default)(maybeDate.toDate()).add(1, 'hours').isBefore(new Date()) ? _react.default.createElement(_react.default.Fragment, null, preferenceLabel) : _react.default.createElement(_react.default.Fragment, null, relativeLabel);
};

exports.FormattedRelativePreferenceLabel = FormattedRelativePreferenceLabel;
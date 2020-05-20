"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountryFlagAndName = exports.CountryFlag = exports.getFlag = void 0;

var _react = _interopRequireWildcard(require("react"));

var _fp = require("lodash/fp");

var _eui = require("@elastic/eui");

var _i18nIsoCountries = _interopRequireDefault(require("i18n-iso-countries"));

var _en = _interopRequireDefault(require("i18n-iso-countries/langs/en.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Returns the flag for the specified country code, or null if the specified
 * country code could not be converted
 * Example: `US` -> 🇺🇸
 */
var getFlag = function getFlag(countryCode) {
  return countryCode && countryCode.length === 2 ? countryCode.toUpperCase().replace(/./g, function (c) {
    return String.fromCharCode(55356, 56741 + c.charCodeAt(0));
  }) : null;
};
/** Renders an emoji flag for the specified country code */


exports.getFlag = getFlag;
var CountryFlag = (0, _react.memo)(function (_ref) {
  var countryCode = _ref.countryCode,
      _ref$displayCountryNa = _ref.displayCountryNameOnHover,
      displayCountryNameOnHover = _ref$displayCountryNa === void 0 ? false : _ref$displayCountryNa;
  (0, _react.useEffect)(function () {
    if (displayCountryNameOnHover && (0, _fp.isEmpty)(_i18nIsoCountries.default.getNames('en'))) {
      _i18nIsoCountries.default.registerLocale(_en.default);
    }
  }, []);
  var flag = getFlag(countryCode);

  if (flag !== null) {
    return displayCountryNameOnHover ? _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: _i18nIsoCountries.default.getName(countryCode, 'en')
    }, _react.default.createElement("span", {
      "data-test-subj": "country-flag"
    }, flag)) : _react.default.createElement("span", {
      "data-test-subj": "country-flag"
    }, flag);
  }

  return null;
});
exports.CountryFlag = CountryFlag;
CountryFlag.displayName = 'CountryFlag';
/** Renders an emjoi flag with country name for the specified country code */

var CountryFlagAndName = (0, _react.memo)(function (_ref2) {
  var countryCode = _ref2.countryCode,
      _ref2$displayCountryN = _ref2.displayCountryNameOnHover,
      displayCountryNameOnHover = _ref2$displayCountryN === void 0 ? false : _ref2$displayCountryN;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      localesLoaded = _useState2[0],
      setLocalesLoaded = _useState2[1];

  (0, _react.useEffect)(function () {
    if ((0, _fp.isEmpty)(_i18nIsoCountries.default.getNames('en'))) {
      _i18nIsoCountries.default.registerLocale(_en.default);
    }

    setLocalesLoaded(true);
  }, []);
  var flag = getFlag(countryCode);

  if (flag !== null && localesLoaded) {
    return displayCountryNameOnHover ? _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: _i18nIsoCountries.default.getName(countryCode, 'en')
    }, _react.default.createElement("span", {
      "data-test-subj": "country-flag"
    }, flag)) : _react.default.createElement("span", {
      "data-test-subj": "country-flag"
    }, "".concat(flag, " ").concat(_i18nIsoCountries.default.getName(countryCode, 'en')));
  }

  return null;
});
exports.CountryFlagAndName = CountryFlagAndName;
CountryFlagAndName.displayName = 'CountryFlagAndName';
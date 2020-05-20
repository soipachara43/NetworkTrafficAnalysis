"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createKibanaContextProviderMock = exports.createWithKibanaMock = exports.createUseKibanaMock = exports.createUseUiSetting$Mock = exports.createUseUiSettingMock = exports.mockUiSettings = void 0;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _constants = require("../../common/constants");

var _default_index_pattern = require("../../default_index_pattern");

var _kibana_core = require("./kibana_core");

var _mockUiSettings;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
var mockUiSettings = (_mockUiSettings = {}, _defineProperty(_mockUiSettings, _constants.DEFAULT_TIME_RANGE, {
  from: 'now-15m',
  to: 'now',
  mode: 'quick'
}), _defineProperty(_mockUiSettings, _constants.DEFAULT_REFRESH_RATE_INTERVAL, {
  pause: false,
  value: 0
}), _defineProperty(_mockUiSettings, _constants.DEFAULT_SIEM_TIME_RANGE, {
  from: _constants.DEFAULT_FROM,
  to: _constants.DEFAULT_TO
}), _defineProperty(_mockUiSettings, _constants.DEFAULT_SIEM_REFRESH_INTERVAL, {
  pause: _constants.DEFAULT_INTERVAL_PAUSE,
  value: _constants.DEFAULT_INTERVAL_VALUE
}), _defineProperty(_mockUiSettings, _constants.DEFAULT_INDEX_KEY, _default_index_pattern.defaultIndexPattern), _defineProperty(_mockUiSettings, _constants.DEFAULT_BYTES_FORMAT, '0,0.[0]b'), _defineProperty(_mockUiSettings, _constants.DEFAULT_DATE_FORMAT_TZ, 'UTC'), _defineProperty(_mockUiSettings, _constants.DEFAULT_DATE_FORMAT, 'MMM D, YYYY @ HH:mm:ss.SSS'), _defineProperty(_mockUiSettings, _constants.DEFAULT_DARK_MODE, false), _mockUiSettings);
exports.mockUiSettings = mockUiSettings;

var createUseUiSettingMock = function createUseUiSettingMock() {
  return function (key, defaultValue) {
    var result = mockUiSettings[key];
    if (typeof result != null) return result;

    if (defaultValue != null) {
      return defaultValue;
    }

    throw new Error("Unexpected config key: ".concat(key));
  };
};

exports.createUseUiSettingMock = createUseUiSettingMock;

var createUseUiSetting$Mock = function createUseUiSetting$Mock() {
  var useUiSettingMock = createUseUiSettingMock();
  return function (key, defaultValue) {
    return [useUiSettingMock(key, defaultValue), jest.fn()];
  };
};

exports.createUseUiSetting$Mock = createUseUiSetting$Mock;

var createUseKibanaMock = function createUseKibanaMock() {
  var core = (0, _kibana_core.createKibanaCoreStartMock)();
  var plugins = (0, _kibana_core.createKibanaPluginsStartMock)();
  var useUiSetting = createUseUiSettingMock();

  var services = _objectSpread({}, core, {}, plugins, {
    uiSettings: _objectSpread({}, core.uiSettings, {
      get: useUiSetting
    })
  });

  return function () {
    return {
      services: services
    };
  };
};

exports.createUseKibanaMock = createUseKibanaMock;

var createWithKibanaMock = function createWithKibanaMock() {
  var kibana = createUseKibanaMock()(); // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return function (Component) {
    return function (props) {
      return _react.default.createElement(Component, _objectSpread({}, props, {
        kibana: kibana
      }));
    };
  };
};

exports.createWithKibanaMock = createWithKibanaMock;

var createKibanaContextProviderMock = function createKibanaContextProviderMock() {
  var kibana = createUseKibanaMock()(); // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return function (_ref) {
    var services = _ref.services,
        rest = _objectWithoutProperties(_ref, ["services"]);

    return _react.default.createElement(_public.KibanaContextProvider, _objectSpread({}, rest, {
      services: _objectSpread({}, kibana.services, {}, services)
    }));
  };
};

exports.createKibanaContextProviderMock = createKibanaContextProviderMock;
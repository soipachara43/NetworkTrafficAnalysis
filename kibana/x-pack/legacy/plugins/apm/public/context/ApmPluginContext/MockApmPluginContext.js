"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockApmPluginContextWrapper = MockApmPluginContextWrapper;
exports.mockApmPluginContextValue = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = require(".");

var _createCallApmApi = require("../../services/rest/createCallApmApi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mockCore = {
  chrome: {
    setBreadcrumbs: function setBreadcrumbs() {}
  },
  docLinks: {
    DOC_LINK_VERSION: '0',
    ELASTIC_WEBSITE_URL: 'https://www.elastic.co/'
  },
  http: {
    basePath: {
      prepend: function prepend(path) {
        return "/basepath".concat(path);
      }
    }
  },
  notifications: {
    toasts: {
      addWarning: function addWarning() {},
      addDanger: function addDanger() {}
    }
  }
};
var mockConfig = {
  indexPatternTitle: 'apm-*',
  serviceMapEnabled: true,
  ui: {
    enabled: false
  }
};
var mockApmPluginContextValue = {
  config: mockConfig,
  core: mockCore,
  plugins: {}
};
exports.mockApmPluginContextValue = mockApmPluginContextValue;

function MockApmPluginContextWrapper(_ref) {
  var _value$core;

  var children = _ref.children,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? {} : _ref$value;

  if ((_value$core = value.core) === null || _value$core === void 0 ? void 0 : _value$core.http) {
    var _value$core2;

    (0, _createCallApmApi.createCallApmApi)((_value$core2 = value.core) === null || _value$core2 === void 0 ? void 0 : _value$core2.http);
  }

  return _react.default.createElement(_.ApmPluginContext.Provider, {
    value: _objectSpread({}, mockApmPluginContextValue, {}, value)
  }, children);
}
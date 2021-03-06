"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEuiTheme = void 0;

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _constants = require("../../../common/constants");

var _kibana = require("../kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useEuiTheme = function useEuiTheme() {
  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_DARK_MODE),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      darkMode = _useUiSetting$2[0];

  return darkMode ? _eui_theme_dark.default : _eui_theme_light.default;
};

exports.useEuiTheme = useEuiTheme;
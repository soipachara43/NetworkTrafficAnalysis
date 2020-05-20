"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeService = void 0;

var _react = require("react");

var _operators = require("rxjs/operators");

var _eui_charts_theme = require("@elastic/eui/dist/eui_charts_theme");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ThemeService =
/*#__PURE__*/
function () {
  function ThemeService() {
    var _this = this;

    _classCallCheck(this, ThemeService);

    _defineProperty(this, "_chartsTheme$", void 0);

    _defineProperty(this, "chartsDefaultTheme", _eui_charts_theme.EUI_CHARTS_THEME_LIGHT.theme);

    _defineProperty(this, "useChartsTheme", function () {
      var _useState = (0, _react.useState)(_this.chartsDefaultTheme),
          _useState2 = _slicedToArray(_useState, 2),
          value = _useState2[0],
          update = _useState2[1];

      (0, _react.useEffect)(function () {
        var s = _this.chartsTheme$.subscribe(update);

        return function () {
          return s.unsubscribe();
        };
      }, []);
      return value;
    });
  }

  _createClass(ThemeService, [{
    key: "init",

    /** initialize service with uiSettings */
    value: function init(uiSettings) {
      this._chartsTheme$ = uiSettings.get$('theme:darkMode').pipe((0, _operators.map)(function (darkMode) {
        return darkMode ? _eui_charts_theme.EUI_CHARTS_THEME_DARK.theme : _eui_charts_theme.EUI_CHARTS_THEME_LIGHT.theme;
      }));
    }
  }, {
    key: "chartsTheme$",

    /** An observable of the current charts theme */
    get: function get() {
      if (!this._chartsTheme$) {
        throw new Error('ThemeService not initialized');
      }

      return this._chartsTheme$;
    }
    /** A React hook for consuming the charts theme */

  }]);

  return ThemeService;
}();

exports.ThemeService = ThemeService;
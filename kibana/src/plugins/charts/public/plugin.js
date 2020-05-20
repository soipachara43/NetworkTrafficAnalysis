"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsPlugin = void 0;

var _services = require("./services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @public */
var ChartsPlugin =
/*#__PURE__*/
function () {
  function ChartsPlugin() {
    _classCallCheck(this, ChartsPlugin);

    _defineProperty(this, "themeService", new _services.ThemeService());

    _defineProperty(this, "colorsService", new _services.ColorsService());
  }

  _createClass(ChartsPlugin, [{
    key: "setup",
    value: function setup(_ref) {
      var uiSettings = _ref.uiSettings;
      this.themeService.init(uiSettings);
      this.colorsService.init(uiSettings);
      return {
        colors: this.colorsService,
        theme: this.themeService
      };
    }
  }, {
    key: "start",
    value: function start() {
      return {
        colors: this.colorsService,
        theme: this.themeService
      };
    }
  }]);

  return ChartsPlugin;
}();

exports.ChartsPlugin = ChartsPlugin;
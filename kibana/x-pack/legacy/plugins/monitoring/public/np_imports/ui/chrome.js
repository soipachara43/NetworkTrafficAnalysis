"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _legacy_imports = require("../legacy_imports");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Chrome =
/*#__PURE__*/
function () {
  function Chrome() {
    var _this = this;

    _classCallCheck(this, Chrome);

    _defineProperty(this, "injector", void 0);

    _defineProperty(this, "setInjector", function (injector) {
      return void (_this.injector = injector);
    });

    _defineProperty(this, "dangerouslyGetActiveInjector", function () {
      return _this.injector;
    });

    _defineProperty(this, "getBasePath", function () {
      return _legacy_imports.npStart.core.http.basePath.get();
    });

    _defineProperty(this, "getInjected", function (name, defaultValue) {
      var _npSetup$core$injecte = _legacy_imports.npSetup.core.injectedMetadata,
          getInjectedVar = _npSetup$core$injecte.getInjectedVar,
          getInjectedVars = _npSetup$core$injecte.getInjectedVars;
      return name ? getInjectedVar(name, defaultValue) : getInjectedVars();
    });
  }

  _createClass(Chrome, [{
    key: "breadcrumbs",
    get: function get() {
      var _this2 = this;

      var set = function set() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _legacy_imports.npStart.core.chrome.setBreadcrumbs.apply(_this2, args);
      };

      return {
        set: set
      };
    }
  }]);

  return Chrome;
}();

var chrome = new Chrome();
var _default = chrome; // eslint-disable-line import/no-default-export

exports.default = _default;
module.exports = exports.default;
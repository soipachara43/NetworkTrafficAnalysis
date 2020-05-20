"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SharePlugin = void 0;

var _services = require("./services");

var _short_url_redirect_app = require("./services/short_url_redirect_app");

var _url_generator_service = require("./url_generators/url_generator_service");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SharePlugin =
/*#__PURE__*/
function () {
  function SharePlugin() {
    _classCallCheck(this, SharePlugin);

    _defineProperty(this, "shareMenuRegistry", new _services.ShareMenuRegistry());

    _defineProperty(this, "shareContextMenu", new _services.ShareMenuManager());

    _defineProperty(this, "urlGeneratorsService", new _url_generator_service.UrlGeneratorsService());
  }

  _createClass(SharePlugin, [{
    key: "setup",
    value: function setup(core) {
      core.application.register((0, _short_url_redirect_app.createShortUrlRedirectApp)(core, window.location));
      return _objectSpread({}, this.shareMenuRegistry.setup(), {
        urlGenerators: this.urlGeneratorsService.setup(core)
      });
    }
  }, {
    key: "start",
    value: function start(core) {
      return _objectSpread({}, this.shareContextMenu.start(core, this.shareMenuRegistry.start()), {
        urlGenerators: this.urlGeneratorsService.start(core)
      });
    }
  }]);

  return SharePlugin;
}();
/** @public */


exports.SharePlugin = SharePlugin;
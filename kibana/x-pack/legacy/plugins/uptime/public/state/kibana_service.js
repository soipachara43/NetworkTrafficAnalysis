"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kibanaService = void 0;

var _utils = require("./api/utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KibanaService =
/*#__PURE__*/
function () {
  _createClass(KibanaService, [{
    key: "core",
    get: function get() {
      return this._core;
    },
    set: function set(coreStart) {
      this._core = coreStart;
      _utils.apiService.http = this._core.http;
    }
  }]);

  function KibanaService() {
    _classCallCheck(this, KibanaService);

    _defineProperty(this, "_core", void 0);
  }

  _createClass(KibanaService, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (!KibanaService.instance) {
        KibanaService.instance = new KibanaService();
      }

      return KibanaService.instance;
    }
  }]);

  return KibanaService;
}();

_defineProperty(KibanaService, "instance", void 0);

var kibanaService = KibanaService.getInstance();
exports.kibanaService = kibanaService;
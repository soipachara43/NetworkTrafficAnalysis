"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldFormatsService = void 0;

var _common = require("../../common");

var _deserialize = require("./utils/deserialize");

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FieldFormatsService =
/*#__PURE__*/
function () {
  function FieldFormatsService() {
    _classCallCheck(this, FieldFormatsService);

    _defineProperty(this, "fieldFormatsRegistry", new _common.FieldFormatsRegistry());
  }

  _createClass(FieldFormatsService, [{
    key: "setup",
    value: function setup(core) {
      var _this = this;

      core.uiSettings.getUpdate$().subscribe(function (_ref) {
        var key = _ref.key,
            newValue = _ref.newValue;

        if (key === 'format:defaultTypeMap') {
          _this.fieldFormatsRegistry.parseDefaultTypeMap(newValue);
        }
      });
      var getConfig = core.uiSettings.get.bind(core.uiSettings);
      this.fieldFormatsRegistry.init(getConfig, {
        parsedUrl: {
          origin: window.location.origin,
          pathname: window.location.pathname,
          basePath: core.http.basePath.get()
        }
      }, _constants.baseFormattersPublic);
      return this.fieldFormatsRegistry;
    }
  }, {
    key: "start",
    value: function start() {
      this.fieldFormatsRegistry.deserialize = _deserialize.deserializeFieldFormat.bind(this.fieldFormatsRegistry);
      return this.fieldFormatsRegistry;
    }
  }]);

  return FieldFormatsService;
}();
/** @public */


exports.FieldFormatsService = FieldFormatsService;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlGeneratorsService = void 0;

var _i18n = require("@kbn/i18n");

var _url_generator_internal = require("./url_generator_internal");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UrlGeneratorsService =
/*#__PURE__*/
function () {
  // Unfortunate use of any here, but I haven't figured out how to type this any better without
  // getting warnings.
  function UrlGeneratorsService() {
    var _this = this;

    _classCallCheck(this, UrlGeneratorsService);

    _defineProperty(this, "urlGenerators", new Map());

    _defineProperty(this, "getUrlGenerator", function (id) {
      var generator = _this.urlGenerators.get(id);

      if (!generator) {
        throw new Error(_i18n.i18n.translate('share.urlGenerators.errors.noGeneratorWithId', {
          defaultMessage: 'No generator found with id {id}',
          values: {
            id: id
          }
        }));
      }

      return generator.getPublicContract();
    });
  }

  _createClass(UrlGeneratorsService, [{
    key: "setup",
    value: function setup(core) {
      var _this2 = this;

      var setup = {
        registerUrlGenerator: function registerUrlGenerator(generatorOptions) {
          _this2.urlGenerators.set(generatorOptions.id, new _url_generator_internal.UrlGeneratorInternal(generatorOptions, _this2.getUrlGenerator));
        }
      };
      return setup;
    }
  }, {
    key: "start",
    value: function start(core) {
      var start = {
        getUrlGenerator: this.getUrlGenerator
      };
      return start;
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return UrlGeneratorsService;
}();

exports.UrlGeneratorsService = UrlGeneratorsService;
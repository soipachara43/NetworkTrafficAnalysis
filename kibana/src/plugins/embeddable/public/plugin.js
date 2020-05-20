"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddablePublicPlugin = void 0;

var _bootstrap = require("./bootstrap");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EmbeddablePublicPlugin =
/*#__PURE__*/
function () {
  function EmbeddablePublicPlugin(initializerContext) {
    var _this = this;

    _classCallCheck(this, EmbeddablePublicPlugin);

    _defineProperty(this, "embeddableFactories", new Map());

    _defineProperty(this, "registerEmbeddableFactory", function (embeddableFactoryId, factory) {
      if (_this.embeddableFactories.has(embeddableFactoryId)) {
        throw new Error("Embeddable factory [embeddableFactoryId = ".concat(embeddableFactoryId, "] already registered in Embeddables API."));
      }

      _this.embeddableFactories.set(embeddableFactoryId, factory);
    });

    _defineProperty(this, "getEmbeddableFactory", function (embeddableFactoryId) {
      var factory = _this.embeddableFactories.get(embeddableFactoryId);

      if (!factory) {
        throw new Error("Embeddable factory [embeddableFactoryId = ".concat(embeddableFactoryId, "] does not exist."));
      }

      return factory;
    });
  }

  _createClass(EmbeddablePublicPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var uiActions = _ref.uiActions;
      (0, _bootstrap.bootstrap)(uiActions);
      return {
        registerEmbeddableFactory: this.registerEmbeddableFactory
      };
    }
  }, {
    key: "start",
    value: function start(core) {
      var _this2 = this;

      return {
        getEmbeddableFactory: this.getEmbeddableFactory,
        getEmbeddableFactories: function getEmbeddableFactories() {
          return _this2.embeddableFactories.values();
        }
      };
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return EmbeddablePublicPlugin;
}();

exports.EmbeddablePublicPlugin = EmbeddablePublicPlugin;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiActionsPlugin = void 0;

var _service = require("./service");

var _triggers = require("./triggers");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UiActionsPlugin =
/*#__PURE__*/
function () {
  function UiActionsPlugin(initializerContext) {
    _classCallCheck(this, UiActionsPlugin);

    _defineProperty(this, "service", new _service.UiActionsService());
  }

  _createClass(UiActionsPlugin, [{
    key: "setup",
    value: function setup(core) {
      this.service.registerTrigger(_triggers.selectRangeTrigger);
      this.service.registerTrigger(_triggers.valueClickTrigger);
      this.service.registerTrigger(_triggers.applyFilterTrigger);
      return this.service;
    }
  }, {
    key: "start",
    value: function start(core) {
      return this.service;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.service.clear();
    }
  }]);

  return UiActionsPlugin;
}();

exports.UiActionsPlugin = UiActionsPlugin;
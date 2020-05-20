"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelemetryManagementSectionPlugin = void 0;

var _telemetry_management_section_wrapper = require("./components/telemetry_management_section_wrapper");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TelemetryManagementSectionPlugin =
/*#__PURE__*/
function () {
  function TelemetryManagementSectionPlugin() {
    _classCallCheck(this, TelemetryManagementSectionPlugin);
  }

  _createClass(TelemetryManagementSectionPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var advancedSettings = _ref.advancedSettings,
          telemetryService = _ref.telemetry.telemetryService;
      advancedSettings.component.register(advancedSettings.component.componentType.PAGE_FOOTER_COMPONENT, (0, _telemetry_management_section_wrapper.telemetryManagementSectionWrapper)(telemetryService), true);
    }
  }, {
    key: "start",
    value: function start(core) {}
  }]);

  return TelemetryManagementSectionPlugin;
}();

exports.TelemetryManagementSectionPlugin = TelemetryManagementSectionPlugin;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManagementPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _management_service = require("./management_service");

var _public = require("../../home/public");

var _legacy = require("./legacy");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ManagementPlugin =
/*#__PURE__*/
function () {
  function ManagementPlugin() {
    _classCallCheck(this, ManagementPlugin);

    _defineProperty(this, "managementSections", new _management_service.ManagementService());

    _defineProperty(this, "legacyManagement", new _legacy.LegacyManagementAdapter());
  }

  _createClass(ManagementPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var kibanaLegacy = _ref.kibanaLegacy,
          home = _ref.home;
      home.featureCatalogue.register({
        id: 'stack-management',
        title: _i18n.i18n.translate('management.displayName', {
          defaultMessage: 'Management'
        }),
        description: _i18n.i18n.translate('management.stackManagement.managementDescription', {
          defaultMessage: 'Your center console for managing the Elastic Stack.'
        }),
        icon: 'managementApp',
        path: '/app/kibana#/management',
        showOnHomePage: false,
        category: _public.FeatureCatalogueCategory.ADMIN
      });
      return {
        sections: this.managementSections.setup(kibanaLegacy, this.legacyManagement.getManagement, core.getStartServices)
      };
    }
  }, {
    key: "start",
    value: function start(core) {
      return {
        sections: this.managementSections.start(core.application.navigateToApp),
        legacy: this.legacyManagement.init(core.application.capabilities)
      };
    }
  }]);

  return ManagementPlugin;
}();

exports.ManagementPlugin = ManagementPlugin;
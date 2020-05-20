"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsManagementService = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../plugins/home/public");

var _saved_objects_management_action_registry = require("./saved_objects_management_action_registry");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SavedObjectsManagementService =
/*#__PURE__*/
function () {
  function SavedObjectsManagementService() {
    _classCallCheck(this, SavedObjectsManagementService);
  }

  _createClass(SavedObjectsManagementService, [{
    key: "setup",
    value: function setup(_ref) {
      var home = _ref.home;
      home.featureCatalogue.register({
        id: 'saved_objects',
        title: _i18n.i18n.translate('management.objects.savedObjectsTitle', {
          defaultMessage: 'Saved Objects'
        }),
        description: _i18n.i18n.translate('management.objects.savedObjectsDescription', {
          defaultMessage: 'Import, export, and manage your saved searches, visualizations, and dashboards.'
        }),
        icon: 'savedObjectsApp',
        path: '/app/kibana#/management/kibana/objects',
        showOnHomePage: true,
        category: _public.FeatureCatalogueCategory.ADMIN
      });
      return {
        registry: _saved_objects_management_action_registry.SavedObjectsManagementActionRegistry
      };
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return SavedObjectsManagementService;
}();
/** @internal */


exports.SavedObjectsManagementService = SavedObjectsManagementService;
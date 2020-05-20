"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapsPlugin = exports.bindStartCoreAndPlugins = exports.bindSetupCoreAndPlugins = void 0;

var _i18n = require("ui/i18n");

var _map_listing = require("./components/map_listing");

var _kibana_services = require("./kibana_services");

var _kibana_services2 = require("../../../../plugins/maps/public/kibana_services");

var _feature_catalogue_entry = require("./feature_catalogue_entry");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var bindSetupCoreAndPlugins = function bindSetupCoreAndPlugins(core, plugins) {
  var licensing = plugins.licensing;
  var injectedMetadata = core.injectedMetadata,
      http = core.http;

  if (licensing) {
    licensing.license$.subscribe(function (_ref) {
      var uid = _ref.uid;
      return (0, _kibana_services.setLicenseId)(uid);
    });
  }

  (0, _kibana_services.setInjectedVarFunc)(injectedMetadata.getInjectedVar);
  (0, _kibana_services.setHttp)(http);
  (0, _kibana_services.setUiSettings)(core.uiSettings);
  (0, _kibana_services.setInjectedVarFunc)(core.injectedMetadata.getInjectedVar);
  (0, _kibana_services2.setInjectedVarFunc)(core.injectedMetadata.getInjectedVar);
  (0, _kibana_services.setToasts)(core.notifications.toasts);
};

exports.bindSetupCoreAndPlugins = bindSetupCoreAndPlugins;

var bindStartCoreAndPlugins = function bindStartCoreAndPlugins(core, plugins) {
  var file_upload = plugins.file_upload,
      data = plugins.data,
      inspector = plugins.inspector;
  (0, _kibana_services.setInspector)(inspector);
  (0, _kibana_services.setFileUpload)(file_upload);
  (0, _kibana_services.setIndexPatternSelect)(data.ui.IndexPatternSelect);
  (0, _kibana_services.setTimeFilter)(data.query.timefilter.timefilter);
  (0, _kibana_services.setIndexPatternService)(data.indexPatterns);
  (0, _kibana_services.setAutocompleteService)(data.autocomplete);
};
/** @internal */


exports.bindStartCoreAndPlugins = bindStartCoreAndPlugins;

var MapsPlugin =
/*#__PURE__*/
function () {
  function MapsPlugin() {
    _classCallCheck(this, MapsPlugin);
  }

  _createClass(MapsPlugin, [{
    key: "setup",
    value: function setup(core, _ref2) {
      var uiModules = _ref2.__LEGACY.uiModules,
          np = _ref2.np;
      uiModules.get('app/maps', ['ngRoute', 'react']).directive('mapListing', function (reactDirective) {
        return reactDirective((0, _i18n.wrapInI18nContext)(_map_listing.MapListing));
      });
      bindSetupCoreAndPlugins(core, np);
      np.home.featureCatalogue.register(_feature_catalogue_entry.featureCatalogueEntry);
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      bindStartCoreAndPlugins(core, plugins);
    }
  }]);

  return MapsPlugin;
}();

exports.MapsPlugin = MapsPlugin;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RollupPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _extend_index_management = require("./extend_index_management");

var _rollup_index_pattern_creation_config = require("./index_pattern_creation/rollup_index_pattern_creation_config");

var _rollup_index_pattern_list_config = require("./index_pattern_list/rollup_index_pattern_list_config");

var _agg_type_filter = require("./visualize/agg_type_filter");

var _agg_type_field_filter = require("./visualize/agg_type_field_filter");

var _common = require("../common");

var _public = require("../../../../../src/plugins/home/public");

var _constants = require("./crud_app/constants");

var _public2 = require("../../../../../src/plugins/data/public");

var _services = require("./crud_app/services");

var _kibana_services = require("./kibana_services");

var _application = require("./application");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RollupPlugin =
/*#__PURE__*/
function () {
  function RollupPlugin() {
    _classCallCheck(this, RollupPlugin);
  }

  _createClass(RollupPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var managementLegacy = _ref.__LEGACY.managementLegacy,
          home = _ref.home,
          management = _ref.management,
          indexManagement = _ref.indexManagement;
      (0, _kibana_services.setFatalErrors)(core.fatalErrors);

      if (indexManagement) {
        indexManagement.extensionsService.addBadge(_extend_index_management.rollupBadgeExtension);
        indexManagement.extensionsService.addToggle(_extend_index_management.rollupToggleExtension);
      }

      var isRollupIndexPatternsEnabled = core.uiSettings.get(_common.CONFIG_ROLLUPS);

      if (isRollupIndexPatternsEnabled) {
        managementLegacy.indexPattern.creation.add(_rollup_index_pattern_creation_config.RollupIndexPatternCreationConfig);
        managementLegacy.indexPattern.list.add(_rollup_index_pattern_list_config.RollupIndexPatternListConfig);
      }

      if (home) {
        home.featureCatalogue.register({
          id: 'rollup_jobs',
          title: 'Rollups',
          description: _i18n.i18n.translate('xpack.rollupJobs.featureCatalogueDescription', {
            defaultMessage: 'Summarize and store historical data in a smaller index for future analysis.'
          }),
          icon: 'indexRollupApp',
          path: "#".concat(_constants.CRUD_APP_BASE_PATH, "/job_list"),
          showOnHomePage: true,
          category: _public.FeatureCatalogueCategory.ADMIN
        });
      }

      var esSection = management.sections.getSection('elasticsearch');

      if (esSection) {
        esSection.registerApp({
          id: 'rollup_jobs',
          title: _i18n.i18n.translate('xpack.rollupJobs.appTitle', {
            defaultMessage: 'Rollup Jobs'
          }),
          order: 3,
          mount: function mount(params) {
            params.setBreadcrumbs([{
              text: _i18n.i18n.translate('xpack.rollupJobs.breadcrumbsTitle', {
                defaultMessage: 'Rollup Jobs'
              })
            }]);
            return (0, _application.renderApp)(core, params);
          }
        });
      }
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      (0, _services.setHttp)(core.http);
      (0, _kibana_services.setNotifications)(core.notifications);
      (0, _services.setEsBaseAndXPackBase)(core.docLinks.ELASTIC_WEBSITE_URL, core.docLinks.DOC_LINK_VERSION);
      var isRollupIndexPatternsEnabled = core.uiSettings.get(_common.CONFIG_ROLLUPS);

      if (isRollupIndexPatternsEnabled) {
        (0, _agg_type_filter.initAggTypeFilter)(_public2.search.aggs.aggTypeFilters);
        (0, _agg_type_field_filter.initAggTypeFieldFilter)(plugins.data.search.__LEGACY.aggTypeFieldFilters);
      }
    }
  }]);

  return RollupPlugin;
}();

exports.RollupPlugin = RollupPlugin;
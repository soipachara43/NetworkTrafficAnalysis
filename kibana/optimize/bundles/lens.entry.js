
/**
 * Kibana entry file
 *
 * This is programmatically created and updated, do not modify
 *
 * context: {
  "appExtensions": {
    "devTools": [
      "plugins/grokdebugger/register"
    ],
    "embeddableFactories": [
      "plugins/lens/legacy",
      "plugins/maps/embeddable/map_embeddable_factory"
    ],
    "fieldFormatEditors": [
      "ui/field_editor/components/field_format_editor/register"
    ],
    "hacks": [
      "absolute:src/legacy/core_plugins/input_control_vis/public/legacy",
      "absolute:src/legacy/core_plugins/region_map/public/legacy",
      "absolute:src/legacy/core_plugins/tile_map/public/legacy",
      "absolute:src/legacy/core_plugins/timelion/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_markdown/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_metric/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_table/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_tagcloud/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_timelion/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_timeseries/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_vega/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_vislib/public/legacy",
      "plugins/canvas/lib/window_error_handler.js",
      "plugins/kibana/dashboard/legacy",
      "plugins/kibana/dev_tools",
      "plugins/kibana/discover/legacy",
      "plugins/kibana/visualize/legacy",
      "plugins/maps/register_vis_type_alias",
      "plugins/monitoring/hacks/toggle_app_link_in_nav",
      "plugins/security/hacks/legacy",
      "plugins/spaces/legacy",
      "plugins/tilemap/vis_type_enhancers/update_tilemap_settings",
      "plugins/xpack_main/hacks/check_xpack_info_change"
    ],
    "home": [
      "plugins/apm/legacy_register_feature",
      "plugins/canvas/legacy_register_feature",
      "plugins/grokdebugger/register_feature",
      "plugins/logstash/lib/register_home_feature",
      "plugins/maps/legacy_register_feature",
      "plugins/monitoring/register_feature",
      "plugins/siem/register_feature",
      "plugins/uptime/register_feature"
    ],
    "indexManagement": [
      "plugins/rollup/legacy"
    ],
    "interpreter": [
      "plugins/canvas/legacy_register_interpreter"
    ],
    "managementSections": [
      "plugins/beats_management",
      "plugins/cross_cluster_replication",
      "plugins/index_lifecycle_management/legacy",
      "plugins/logstash/sections/pipeline_edit",
      "plugins/logstash/sections/pipeline_list",
      "plugins/rollup/legacy"
    ],
    "search": [
      "plugins/rollup/legacy"
    ],
    "visualize": [
      "plugins/lens/legacy",
      "plugins/rollup/legacy"
    ]
  },
  "buildNum": 30810,
  "env": "production",
  "kbnVersion": "7.7.0"
}
 */


import { i18n } from '@kbn/i18n';
import { CoreSystem } from '__kibanaCore__'

const injectedMetadata = JSON.parse(document.querySelector('kbn-injected-metadata').getAttribute('data'));



i18n.load(injectedMetadata.i18n.translationsUrl)
  .catch(e => e)
  .then((i18nError) => {
    const coreSystem = new CoreSystem({
      injectedMetadata,
      rootDomElement: document.body,
      browserSupportsCsp: !window.__kbnCspNotEnforced__,
      requireLegacyFiles: () => {
        require('plugins/lens/redirect');
      }
    });

    coreSystem
      .setup()
      .then((coreSetup) => {
        if (i18nError) {
          coreSetup.fatalErrors.add(i18nError);
        }

        return coreSystem.start();
      });
  });

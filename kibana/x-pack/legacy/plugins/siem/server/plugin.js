"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CoreSetup", {
  enumerable: true,
  get: function () {
    return _server.CoreSetup;
  }
});
Object.defineProperty(exports, "CoreStart", {
  enumerable: true,
  get: function () {
    return _server.CoreStart;
  }
});
exports.Plugin = void 0;

var _i18n = require("@kbn/i18n");

var _server = require("../../../../../src/core/server");

var _init_server = require("./init_server");

var _kibana = require("./lib/compose/kibana");

var _routes = require("./routes");

var _types = require("./lib/detection_engine/signals/types");

var _signal_rule_alert_type = require("./lib/detection_engine/signals/signal_rule_alert_type");

var _rules_notification_alert_type = require("./lib/detection_engine/notifications/rules_notification_alert_type");

var _types2 = require("./lib/detection_engine/notifications/types");

var _saved_objects = require("./saved_objects");

var _client = require("./client");

var _feature_flags = require("./lib/detection_engine/feature_flags");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Plugin {
  constructor(context) {
    _defineProperty(this, "name", 'siem');

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "siemClientFactory", void 0);

    this.context = context;
    this.logger = context.logger.get('plugins', this.name);
    this.siemClientFactory = new _client.SiemClientFactory();
    this.logger.debug('Shim plugin initialized');
  }

  setup(core, plugins, __legacy) {
    var _plugins$spaces, _plugins$spaces$space, _ref, _plugins$encryptedSav;

    this.logger.debug('Shim plugin setup');

    if ((0, _feature_flags.hasListsFeature)()) {
      // TODO: Remove this once we have the lists feature supported
      this.logger.error(`You have activated the lists feature flag which is NOT currently supported for SIEM! You should turn this feature flag off immediately by un-setting the environment variable: ${_feature_flags.listsEnvFeatureFlagName} and restarting Kibana`);
    }

    const router = core.http.createRouter();
    core.http.registerRouteHandlerContext(this.name, (context, request, response) => ({
      getSiemClient: () => this.siemClientFactory.create(request)
    }));
    this.siemClientFactory.setup({
      getSpaceId: (_plugins$spaces = plugins.spaces) === null || _plugins$spaces === void 0 ? void 0 : (_plugins$spaces$space = _plugins$spaces.spacesService) === null || _plugins$spaces$space === void 0 ? void 0 : _plugins$spaces$space.getSpaceId,
      config: __legacy.config
    });
    (0, _routes.initRoutes)(router, __legacy.config, (_ref = (_plugins$encryptedSav = plugins.encryptedSavedObjects) === null || _plugins$encryptedSav === void 0 ? void 0 : _plugins$encryptedSav.usingEphemeralEncryptionKey) !== null && _ref !== void 0 ? _ref : false, plugins.security);
    plugins.features.registerFeature({
      id: this.name,
      name: _i18n.i18n.translate('xpack.siem.featureRegistry.linkSiemTitle', {
        defaultMessage: 'SIEM'
      }),
      order: 1100,
      icon: 'securityAnalyticsApp',
      navLinkId: 'siem',
      app: ['siem', 'kibana'],
      catalogue: ['siem'],
      privileges: {
        all: {
          app: ['siem', 'kibana'],
          catalogue: ['siem'],
          api: ['siem', 'actions-read', 'actions-all', 'alerting-read', 'alerting-all'],
          savedObject: {
            all: ['alert', 'action', 'action_task_params', _saved_objects.noteSavedObjectType, _saved_objects.pinnedEventSavedObjectType, _saved_objects.timelineSavedObjectType, _saved_objects.ruleStatusSavedObjectType, _saved_objects.ruleActionsSavedObjectType, 'cases', 'cases-comments', 'cases-configure', 'cases-user-actions'],
            read: ['config']
          },
          ui: ['show', 'crud', 'alerting:show', 'actions:show', 'alerting:save', 'actions:save', 'alerting:delete', 'actions:delete']
        },
        read: {
          app: ['siem', 'kibana'],
          catalogue: ['siem'],
          api: ['siem', 'actions-read', 'actions-all', 'alerting-read', 'alerting-all'],
          savedObject: {
            all: ['alert', 'action', 'action_task_params'],
            read: ['config', _saved_objects.noteSavedObjectType, _saved_objects.pinnedEventSavedObjectType, _saved_objects.timelineSavedObjectType, _saved_objects.ruleStatusSavedObjectType, _saved_objects.ruleActionsSavedObjectType, 'cases', 'cases-comments', 'cases-configure', 'cases-user-actions']
          },
          ui: ['show', 'alerting:show', 'actions:show', 'alerting:save', 'actions:save', 'alerting:delete', 'actions:delete']
        }
      }
    });

    if (plugins.alerting != null) {
      const signalRuleType = (0, _signal_rule_alert_type.signalRulesAlertType)({
        logger: this.logger,
        version: this.context.env.packageInfo.version,
        ml: plugins.ml
      });
      const ruleNotificationType = (0, _rules_notification_alert_type.rulesNotificationAlertType)({
        logger: this.logger
      });

      if ((0, _types.isAlertExecutor)(signalRuleType)) {
        plugins.alerting.registerType(signalRuleType);
      }

      if ((0, _types2.isNotificationAlertExecutor)(ruleNotificationType)) {
        plugins.alerting.registerType(ruleNotificationType);
      }
    }

    const libs = (0, _kibana.compose)(core, plugins, this.context.env.mode.prod);
    (0, _init_server.initServer)(libs);
  }

  start(core, plugins) {}

}

exports.Plugin = Plugin;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.siem = void 0;

var _i18n = require("@kbn/i18n");

var _path = require("path");

var _server = require("./server");

var _saved_objects = require("./server/saved_objects");

var _constants = require("./common/constants");

var _default_index_pattern = require("./default_index_pattern");

var _utils = require("../../../../src/core/utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const siem = kibana => {
  return new kibana.Plugin({
    id: _constants.APP_ID,
    configPrefix: 'xpack.siem',
    publicDir: (0, _path.resolve)(__dirname, 'public'),
    require: ['kibana', 'elasticsearch', 'alerting', 'actions', 'triggers_actions_ui'],
    uiExports: {
      app: {
        description: _i18n.i18n.translate('xpack.siem.securityDescription', {
          defaultMessage: 'Explore your SIEM App'
        }),
        main: 'plugins/siem/legacy',
        euiIconType: 'securityAnalyticsApp',
        title: _constants.APP_NAME,
        listed: false,
        url: `/app/${_constants.APP_ID}`
      },
      home: ['plugins/siem/register_feature'],
      links: [{
        description: _i18n.i18n.translate('xpack.siem.linkSecurityDescription', {
          defaultMessage: 'Explore your SIEM App'
        }),
        euiIconType: 'securityAnalyticsApp',
        id: 'siem',
        order: 9000,
        title: _constants.APP_NAME,
        url: `/app/${_constants.APP_ID}`,
        category: _utils.DEFAULT_APP_CATEGORIES.security
      }],
      uiSettingDefaults: {
        [_constants.DEFAULT_SIEM_REFRESH_INTERVAL]: {
          type: 'json',
          name: _i18n.i18n.translate('xpack.siem.uiSettings.defaultRefreshIntervalLabel', {
            defaultMessage: 'Time filter refresh interval'
          }),
          value: `{
  "pause": ${_constants.DEFAULT_INTERVAL_PAUSE},
  "value": ${_constants.DEFAULT_INTERVAL_VALUE}
}`,
          description: _i18n.i18n.translate('xpack.siem.uiSettings.defaultRefreshIntervalDescription', {
            defaultMessage: '<p>Default refresh interval for the SIEM time filter, in milliseconds.</p>'
          }),
          category: ['siem'],
          requiresPageReload: true
        },
        [_constants.DEFAULT_SIEM_TIME_RANGE]: {
          type: 'json',
          name: _i18n.i18n.translate('xpack.siem.uiSettings.defaultTimeRangeLabel', {
            defaultMessage: 'Time filter period'
          }),
          value: `{
  "from": "${_constants.DEFAULT_FROM}",
  "to": "${_constants.DEFAULT_TO}"
}`,
          description: _i18n.i18n.translate('xpack.siem.uiSettings.defaultTimeRangeDescription', {
            defaultMessage: '<p>Default period of time in the SIEM time filter.</p>'
          }),
          category: ['siem'],
          requiresPageReload: true
        },
        [_constants.DEFAULT_INDEX_KEY]: {
          name: _i18n.i18n.translate('xpack.siem.uiSettings.defaultIndexLabel', {
            defaultMessage: 'Elasticsearch indices'
          }),
          value: _default_index_pattern.defaultIndexPattern,
          description: _i18n.i18n.translate('xpack.siem.uiSettings.defaultIndexDescription', {
            defaultMessage: '<p>Comma-delimited list of Elasticsearch indices from which the SIEM app collects events.</p>'
          }),
          category: ['siem'],
          requiresPageReload: true
        },
        [_constants.DEFAULT_ANOMALY_SCORE]: {
          name: _i18n.i18n.translate('xpack.siem.uiSettings.defaultAnomalyScoreLabel', {
            defaultMessage: 'Anomaly threshold'
          }),
          value: 50,
          type: 'number',
          description: _i18n.i18n.translate('xpack.siem.uiSettings.defaultAnomalyScoreDescription', {
            defaultMessage: '<p>Value above which Machine Learning job anomalies are displayed in the SIEM app.</p><p>Valid values: 0 to 100.</p>'
          }),
          category: ['siem'],
          requiresPageReload: true
        },
        [_constants.ENABLE_NEWS_FEED_SETTING]: {
          name: _i18n.i18n.translate('xpack.siem.uiSettings.enableNewsFeedLabel', {
            defaultMessage: 'News feed'
          }),
          value: true,
          description: _i18n.i18n.translate('xpack.siem.uiSettings.enableNewsFeedDescription', {
            defaultMessage: '<p>Enables the News feed</p>'
          }),
          type: 'boolean',
          category: ['siem'],
          requiresPageReload: true
        },
        [_constants.NEWS_FEED_URL_SETTING]: {
          name: _i18n.i18n.translate('xpack.siem.uiSettings.newsFeedUrl', {
            defaultMessage: 'News feed URL'
          }),
          value: _constants.NEWS_FEED_URL_SETTING_DEFAULT,
          description: _i18n.i18n.translate('xpack.siem.uiSettings.newsFeedUrlDescription', {
            defaultMessage: '<p>News feed content will be retrieved from this URL</p>'
          }),
          category: ['siem'],
          requiresPageReload: true
        },
        [_constants.IP_REPUTATION_LINKS_SETTING]: {
          name: _i18n.i18n.translate('xpack.siem.uiSettings.ipReputationLinks', {
            defaultMessage: 'IP Reputation Links'
          }),
          value: _constants.IP_REPUTATION_LINKS_SETTING_DEFAULT,
          type: 'json',
          description: _i18n.i18n.translate('xpack.siem.uiSettings.ipReputationLinksDescription', {
            defaultMessage: 'Array of URL templates to build the list of reputation URLs to be displayed on the IP Details page.'
          }),
          category: ['siem'],
          requiresPageReload: true
        }
      },
      mappings: _saved_objects.savedObjectMappings
    },

    init(server) {
      const {
        coreContext,
        env,
        setup,
        start
      } = server.newPlatform;
      const initializerContext = { ...coreContext,
        env
      };
      const __legacy = {
        config: server.config,
        route: server.route.bind(server)
      }; // @ts-ignore-next-line: NewPlatform shim is too loosely typed

      const pluginInstance = (0, _server.plugin)(initializerContext); // @ts-ignore-next-line: NewPlatform shim is too loosely typed

      pluginInstance.setup(setup.core, setup.plugins, __legacy); // @ts-ignore-next-line: NewPlatform shim is too loosely typed

      pluginInstance.start(start.core, start.plugins);
    },

    config(Joi) {
      // See x-pack/plugins/siem/server/config.ts if you're adding another
      // value where the configuration has to be duplicated at the moment.
      // When we move over to the new platform completely this will be
      // removed and only server/config.ts should be used.
      return Joi.object().keys({
        enabled: Joi.boolean().default(true),
        [_constants.SIGNALS_INDEX_KEY]: Joi.string().default(_constants.DEFAULT_SIGNALS_INDEX)
      }).default();
    }

  });
};

exports.siem = siem;
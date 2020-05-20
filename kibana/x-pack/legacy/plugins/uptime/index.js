"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uptime = void 0;

var _i18n = require("@kbn/i18n");

var _path = require("path");

var _constants = require("./common/constants");

var _utils = require("../../../../src/core/utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const uptime = kibana => new kibana.Plugin({
  configPrefix: 'xpack.uptime',
  id: _constants.PLUGIN.ID,
  publicDir: (0, _path.resolve)(__dirname, 'public'),
  require: ['alerting', 'kibana', 'elasticsearch', 'xpack_main'],
  uiExports: {
    app: {
      description: _i18n.i18n.translate('xpack.uptime.pluginDescription', {
        defaultMessage: 'Uptime monitoring',
        description: 'The description text that will be shown to users in Kibana'
      }),
      icon: 'plugins/uptime/icons/heartbeat_white.svg',
      euiIconType: 'uptimeApp',
      title: _i18n.i18n.translate('xpack.uptime.uptimeFeatureCatalogueTitle', {
        defaultMessage: 'Uptime'
      }),
      main: 'plugins/uptime/app',
      order: 8900,
      url: '/app/uptime#/',
      category: _utils.DEFAULT_APP_CATEGORIES.observability
    },
    home: ['plugins/uptime/register_feature']
  }
});

exports.uptime = uptime;
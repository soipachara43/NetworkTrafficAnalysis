"use strict";

var _i18n = require("@kbn/i18n");

var _new_platform = require("ui/new_platform");

var _xpack_info = require("plugins/xpack_main/services/xpack_info");

var _public = require("../../../../../../src/plugins/home/public");

var _constants = require("../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
var home = _new_platform.npSetup.plugins.home;
var enableLinks = Boolean(_xpack_info.xpackInfo.get("features.".concat(_constants.PLUGIN.ID, ".enableLinks")));

if (enableLinks) {
  home.featureCatalogue.register({
    id: 'management_logstash',
    title: _i18n.i18n.translate('xpack.logstash.homeFeature.logstashPipelinesTitle', {
      defaultMessage: 'Logstash Pipelines'
    }),
    description: _i18n.i18n.translate('xpack.logstash.homeFeature.logstashPipelinesDescription', {
      defaultMessage: 'Create, delete, update, and clone data ingestion pipelines.'
    }),
    icon: 'pipelineApp',
    path: '/app/kibana#/management/logstash/pipelines',
    showOnHomePage: true,
    category: _public.FeatureCatalogueCategory.ADMIN
  });
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initManagementServer = void 0;

var _index_names = require("../common/constants/index_names");

var _index_templates = require("./index_templates");

var _configuration = require("./rest_api/beats/configuration");

var _enroll = require("./rest_api/beats/enroll");

var _events = require("./rest_api/beats/events");

var _get = require("./rest_api/beats/get");

var _list = require("./rest_api/beats/list");

var _tag_assignment = require("./rest_api/beats/tag_assignment");

var _tag_removal = require("./rest_api/beats/tag_removal");

var _update = require("./rest_api/beats/update");

var _delete = require("./rest_api/configurations/delete");

var _get2 = require("./rest_api/configurations/get");

var _upsert = require("./rest_api/configurations/upsert");

var _assignable = require("./rest_api/tags/assignable");

var _delete2 = require("./rest_api/tags/delete");

var _get3 = require("./rest_api/tags/get");

var _list2 = require("./rest_api/tags/list");

var _set = require("./rest_api/tags/set");

var _create = require("./rest_api/tokens/create");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const initManagementServer = libs => {
  if (libs.database) {
    libs.framework.on('elasticsearch.status.green', async () => {
      await libs.database.putTemplate(_index_names.INDEX_NAMES.BEATS, _index_templates.beatsIndexTemplate);
    });
  }

  libs.framework.registerRoute((0, _get.createGetBeatRoute)(libs));
  libs.framework.registerRoute((0, _get3.createGetTagsWithIdsRoute)(libs));
  libs.framework.registerRoute((0, _list2.createListTagsRoute)(libs));
  libs.framework.registerRoute((0, _delete2.createDeleteTagsWithIdsRoute)(libs));
  libs.framework.registerRoute((0, _configuration.createGetBeatConfigurationRoute)(libs));
  libs.framework.registerRoute((0, _tag_assignment.createTagAssignmentsRoute)(libs));
  libs.framework.registerRoute((0, _list.createListAgentsRoute)(libs));
  libs.framework.registerRoute((0, _tag_removal.createTagRemovalsRoute)(libs));
  libs.framework.registerRoute((0, _enroll.createBeatEnrollmentRoute)(libs));
  libs.framework.registerRoute((0, _set.createSetTagRoute)(libs));
  libs.framework.registerRoute((0, _create.createTokensRoute)(libs));
  libs.framework.registerRoute((0, _update.createBeatUpdateRoute)(libs));
  libs.framework.registerRoute((0, _delete.createDeleteConfidurationsRoute)(libs));
  libs.framework.registerRoute((0, _get2.createGetConfigurationBlocksRoute)(libs));
  libs.framework.registerRoute((0, _upsert.upsertConfigurationRoute)(libs));
  libs.framework.registerRoute((0, _assignable.createAssignableTagsRoute)(libs));
  libs.framework.registerRoute((0, _events.beatEventsRoute)(libs));
};

exports.initManagementServer = initManagementServer;
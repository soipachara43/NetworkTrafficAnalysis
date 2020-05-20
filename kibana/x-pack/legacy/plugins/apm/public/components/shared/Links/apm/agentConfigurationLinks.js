"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editAgentConfigurationHref = editAgentConfigurationHref;
exports.createAgentConfigurationHref = createAgentConfigurationHref;

var _APMLink = require("./APMLink");

var _history = require("../../../../utils/history");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function editAgentConfigurationHref(configService) {
  var search = _history.history.location.search;
  return (0, _APMLink.getAPMHref)('/settings/agent-configuration/edit', search, {
    // ignoring because `name` has not been added to url params. Related: https://github.com/elastic/kibana/issues/51963
    // @ts-ignore
    name: configService.name,
    environment: configService.environment
  });
}

function createAgentConfigurationHref() {
  var search = _history.history.location.search;
  return (0, _APMLink.getAPMHref)('/settings/agent-configuration/create', search);
}
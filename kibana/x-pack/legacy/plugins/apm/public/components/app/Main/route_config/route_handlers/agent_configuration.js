"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAgentConfigurationRouteHandler = EditAgentConfigurationRouteHandler;
exports.CreateAgentConfigurationRouteHandler = CreateAgentConfigurationRouteHandler;

var _react = _interopRequireDefault(require("react"));

var _useFetcher = require("../../../../../hooks/useFetcher");

var _history = require("../../../../../utils/history");

var _Settings = require("../../../Settings");

var _AgentConfigurationCreateEdit = require("../../../Settings/AgentConfigurations/AgentConfigurationCreateEdit");

var _url_helpers = require("../../../../shared/Links/url_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function EditAgentConfigurationRouteHandler() {
  var search = _history.history.location.search; // typescript complains because `pageStop` does not exist in `APMQueryParams`
  // Going forward we should move away from globally declared query params and this is a first step
  // @ts-ignore

  var _toQuery = (0, _url_helpers.toQuery)(search),
      name = _toQuery.name,
      environment = _toQuery.environment,
      pageStep = _toQuery.pageStep;

  var res = (0, _useFetcher.useFetcher)(function (callApmApi) {
    return callApmApi({
      pathname: '/api/apm/settings/agent-configuration/view',
      params: {
        query: {
          name: name,
          environment: environment
        }
      }
    });
  }, [name, environment]);
  return _react.default.createElement(_Settings.Settings, null, _react.default.createElement(_AgentConfigurationCreateEdit.AgentConfigurationCreateEdit, {
    pageStep: pageStep || 'choose-settings-step',
    existingConfigResult: res
  }));
}

function CreateAgentConfigurationRouteHandler() {
  var search = _history.history.location.search; // Ignoring here because we specifically DO NOT want to add the query params to the global route handler
  // @ts-ignore

  var _toQuery2 = (0, _url_helpers.toQuery)(search),
      pageStep = _toQuery2.pageStep;

  return _react.default.createElement(_Settings.Settings, null, _react.default.createElement(_AgentConfigurationCreateEdit.AgentConfigurationCreateEdit, {
    pageStep: pageStep || 'choose-service-step'
  }));
}
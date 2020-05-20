"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRouteConfigFactoryReportingPre = getRouteConfigFactoryReportingPre;
exports.getRouteOptionsCsv = getRouteOptionsCsv;
exports.getRouteConfigFactoryManagementPre = getRouteConfigFactoryManagementPre;
exports.getRouteConfigFactoryDownloadPre = getRouteConfigFactoryDownloadPre;
exports.getRouteConfigFactoryDeletePre = getRouteConfigFactoryDeletePre;

var _joi = _interopRequireDefault(require("joi"));

var _constants = require("../../../common/constants");

var _authorized_user_pre_routing = require("./authorized_user_pre_routing");

var _reporting_feature_pre_routing = require("./reporting_feature_pre_routing");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const API_TAG = 'api';

function getRouteConfigFactoryReportingPre(server, plugins, logger) {
  const authorizedUserPreRouting = (0, _authorized_user_pre_routing.authorizedUserPreRoutingFactory)(server, plugins, logger);
  const reportingFeaturePreRouting = (0, _reporting_feature_pre_routing.reportingFeaturePreRoutingFactory)(server, plugins, logger);
  return getFeatureId => {
    const preRouting = [{
      method: authorizedUserPreRouting,
      assign: 'user'
    }];

    if (getFeatureId) {
      preRouting.push(reportingFeaturePreRouting(getFeatureId));
    }

    return {
      tags: [API_TAG],
      pre: preRouting
    };
  };
}

function getRouteOptionsCsv(server, plugins, logger) {
  const getRouteConfig = getRouteConfigFactoryReportingPre(server, plugins, logger);
  return { ...getRouteConfig(() => _constants.CSV_FROM_SAVEDOBJECT_JOB_TYPE),
    validate: {
      params: _joi.default.object({
        savedObjectType: _joi.default.string().required(),
        savedObjectId: _joi.default.string().required()
      }).required(),
      payload: _joi.default.object({
        state: _joi.default.object().default({}),
        timerange: _joi.default.object({
          timezone: _joi.default.string().default('UTC'),
          min: _joi.default.date().required(),
          max: _joi.default.date().required()
        }).optional()
      })
    }
  };
}

function getRouteConfigFactoryManagementPre(server, plugins, logger) {
  const authorizedUserPreRouting = (0, _authorized_user_pre_routing.authorizedUserPreRoutingFactory)(server, plugins, logger);
  const reportingFeaturePreRouting = (0, _reporting_feature_pre_routing.reportingFeaturePreRoutingFactory)(server, plugins, logger);
  const managementPreRouting = reportingFeaturePreRouting(() => 'management');
  return () => {
    return {
      pre: [{
        method: authorizedUserPreRouting,
        assign: 'user'
      }, {
        method: managementPreRouting,
        assign: 'management'
      }]
    };
  };
} // NOTE: We're disabling range request for downloading the PDF. There's a bug in Firefox's PDF.js viewer
// (https://github.com/mozilla/pdf.js/issues/8958) where they're using a range request to retrieve the
// TOC at the end of the PDF, but it's sending multiple cookies and causing our auth to fail with a 401.
// Additionally, the range-request doesn't alleviate any performance issues on the server as the entire
// download is loaded into memory.


function getRouteConfigFactoryDownloadPre(server, plugins, logger) {
  const getManagementRouteConfig = getRouteConfigFactoryManagementPre(server, plugins, logger);
  return () => ({ ...getManagementRouteConfig(),
    tags: [API_TAG, 'download'],
    response: {
      ranges: false
    }
  });
}

function getRouteConfigFactoryDeletePre(server, plugins, logger) {
  const getManagementRouteConfig = getRouteConfigFactoryManagementPre(server, plugins, logger);
  return () => ({ ...getManagementRouteConfig(),
    tags: [API_TAG, 'delete'],
    response: {
      ranges: false
    }
  });
}
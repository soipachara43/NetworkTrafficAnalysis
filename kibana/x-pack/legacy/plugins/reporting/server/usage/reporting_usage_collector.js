"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReportingUsageCollector = getReportingUsageCollector;
exports.registerReportingUsageCollector = registerReportingUsageCollector;

var _constants = require("../../common/constants");

var _get_reporting_usage = require("./get_reporting_usage");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// places the reporting data as kibana stats
const METATYPE = 'kibana_stats';
/*
 * @param {Object} server
 * @return {Object} kibana usage stats type collection object
 */

function getReportingUsageCollector(server, usageCollection, exportTypesRegistry, isReady) {
  return usageCollection.makeUsageCollector({
    type: _constants.KIBANA_REPORTING_TYPE,
    fetch: callCluster => (0, _get_reporting_usage.getReportingUsage)(server, callCluster, exportTypesRegistry),
    isReady,

    /*
     * Format the response data into a model for internal upload
     * 1. Make this data part of the "kibana_stats" type
     * 2. Organize the payload in the usage.xpack.reporting namespace of the data payload
     */
    formatForBulkUpload: result => {
      return {
        type: METATYPE,
        payload: {
          usage: {
            xpack: {
              reporting: result
            }
          }
        }
      };
    }
  });
}

function registerReportingUsageCollector(reporting, server, usageCollection) {
  const exportTypesRegistry = reporting.getExportTypesRegistry();
  const collectionIsReady = reporting.pluginHasStarted.bind(reporting);
  const collector = getReportingUsageCollector(server, usageCollection, exportTypesRegistry, collectionIsReady);
  usageCollection.registerCollector(collector);
}
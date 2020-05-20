"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchStatus = fetchStatus;

var _moment = _interopRequireDefault(require("moment"));

var _lodash = require("lodash");

var _constants = require("../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function fetchStatus(callCluster, start, end, clusterUuid, server) {
  // TODO: this shouldn't query task manager directly but rather
  // use an api exposed by the alerting/actions plugin
  // See https://github.com/elastic/kibana/issues/48442
  const statuses = await Promise.all(_constants.ALERT_TYPES.map(type => new Promise(async (resolve, reject) => {
    try {
      const params = {
        index: '.kibana_task_manager',
        filterPath: ['hits.hits._source.task.state'],
        body: {
          size: 1,
          sort: [{
            updated_at: {
              order: 'desc'
            }
          }],
          query: {
            bool: {
              filter: [{
                term: {
                  'task.taskType': `alerting:${type}`
                }
              }]
            }
          }
        }
      };
      const response = await callCluster('search', params);
      const state = (0, _lodash.get)(response, 'hits.hits[0]._source.task.state', '{}');
      const clusterState = (0, _lodash.get)(JSON.parse(state), `alertTypeState.${clusterUuid}`, {
        expiredCheckDateMS: 0,
        ui: {
          isFiring: false,
          message: null,
          severity: 0,
          resolvedMS: 0,
          expirationTime: 0
        }
      });
      const isInBetween = (0, _moment.default)(clusterState.ui.resolvedMS).isBetween(start, end);

      if (clusterState.ui.isFiring || isInBetween) {
        return resolve({
          type,
          ...clusterState.ui
        });
      }

      return resolve(false);
    } catch (err) {
      const reason = (0, _lodash.get)(err, 'body.error.type');

      if (reason === 'index_not_found_exception') {
        server.log(['error', _constants.LOGGING_TAG], `Unable to fetch alerts. Alerts depends on task manager, which has not been started yet.`);
      } else {
        server.log(['error', _constants.LOGGING_TAG], err.message);
      }

      return resolve(false);
    }
  })));
  return statuses.filter(Boolean);
}
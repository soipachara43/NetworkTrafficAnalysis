"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ruleStatusServiceFactory = exports.buildRuleStatusAttributes = exports.MAX_RULE_STATUSES = void 0;

var _build_query = require("../../../utils/build_query");

var _get_or_create_rule_statuses = require("./get_or_create_rule_statuses");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// 1st is mutable status, followed by 5 most recent failures
const MAX_RULE_STATUSES = 6;
exports.MAX_RULE_STATUSES = MAX_RULE_STATUSES;

const buildRuleStatusAttributes = (status, message, attributes = {}) => {
  const now = new Date().toISOString();
  const baseAttributes = { ...attributes,
    status,
    statusDate: now
  };

  switch (status) {
    case 'succeeded':
      {
        return { ...baseAttributes,
          lastSuccessAt: now,
          lastSuccessMessage: message
        };
      }

    case 'failed':
      {
        return { ...baseAttributes,
          lastFailureAt: now,
          lastFailureMessage: message
        };
      }

    case 'going to run':
      {
        return baseAttributes;
      }
  }

  (0, _build_query.assertUnreachable)(status);
};

exports.buildRuleStatusAttributes = buildRuleStatusAttributes;

const ruleStatusServiceFactory = async ({
  alertId,
  ruleStatusClient
}) => {
  return {
    goingToRun: async () => {
      const [currentStatus] = await (0, _get_or_create_rule_statuses.getOrCreateRuleStatuses)({
        alertId,
        ruleStatusClient
      });
      await ruleStatusClient.update(currentStatus.id, { ...currentStatus.attributes,
        ...buildRuleStatusAttributes('going to run')
      });
    },
    success: async (message, attributes) => {
      const [currentStatus] = await (0, _get_or_create_rule_statuses.getOrCreateRuleStatuses)({
        alertId,
        ruleStatusClient
      });
      await ruleStatusClient.update(currentStatus.id, { ...currentStatus.attributes,
        ...buildRuleStatusAttributes('succeeded', message, attributes)
      });
    },
    error: async (message, attributes) => {
      const ruleStatuses = await (0, _get_or_create_rule_statuses.getOrCreateRuleStatuses)({
        alertId,
        ruleStatusClient
      });
      const [currentStatus] = ruleStatuses;
      const failureAttributes = { ...currentStatus.attributes,
        ...buildRuleStatusAttributes('failed', message, attributes)
      }; // We always update the newest status, so to 'persist' a failure we push a copy to the head of the list

      await ruleStatusClient.update(currentStatus.id, failureAttributes);
      const newStatus = await ruleStatusClient.create(failureAttributes); // drop oldest failures

      const oldStatuses = [newStatus, ...ruleStatuses].slice(MAX_RULE_STATUSES);
      await Promise.all(oldStatuses.map(status => ruleStatusClient.delete(status.id)));
    }
  };
};

exports.ruleStatusServiceFactory = ruleStatusServiceFactory;
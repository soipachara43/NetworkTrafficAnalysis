"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRules = void 0;

var _read_rules = require("./read_rules");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const deleteRules = async ({
  alertsClient,
  actionsClient,
  // TODO: Use this when we have actions such as email, etc...
  id,
  ruleId
}) => {
  const rule = await (0, _read_rules.readRules)({
    alertsClient,
    id,
    ruleId
  });

  if (rule == null) {
    return null;
  }

  if (ruleId != null) {
    await alertsClient.delete({
      id: rule.id
    });
    return rule;
  } else if (id != null) {
    try {
      await alertsClient.delete({
        id
      });
      return rule;
    } catch (err) {
      if (err.output.statusCode === 404) {
        return null;
      } else {
        throw err;
      }
    }
  } else {
    return null;
  }
};

exports.deleteRules = deleteRules;
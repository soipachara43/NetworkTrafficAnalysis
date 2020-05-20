"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readRules = void 0;

var _constants = require("../../../../common/constants");

var _find_rules = require("./find_rules");

var _types = require("./types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * This reads the rules through a cascade try of what is fastest to what is slowest.
 * @param id - This is the fastest. This is the auto-generated id through the parameter id.
 * and the id will either be found through `alertsClient.get({ id })` or it will not
 * be returned as a not-found or a thrown error that is not 404.
 * @param ruleId - This is a close second to being fast as long as it can find the rule_id from
 * a filter query against the tags using `alert.attributes.tags: "__internal:${ruleId}"]`
 */
const readRules = async ({
  alertsClient,
  id,
  ruleId
}) => {
  if (id != null) {
    try {
      const rule = await alertsClient.get({
        id
      });

      if ((0, _types.isAlertType)(rule)) {
        return rule;
      } else {
        return null;
      }
    } catch (err) {
      var _err$output;

      if ((err === null || err === void 0 ? void 0 : (_err$output = err.output) === null || _err$output === void 0 ? void 0 : _err$output.statusCode) === 404) {
        return null;
      } else {
        // throw non-404 as they would be 500 or other internal errors
        throw err;
      }
    }
  } else if (ruleId != null) {
    const ruleFromFind = await (0, _find_rules.findRules)({
      alertsClient,
      filter: `alert.attributes.tags: "${_constants.INTERNAL_RULE_ID_KEY}:${ruleId}"`,
      page: 1
    });

    if (ruleFromFind.data.length === 0 || !(0, _types.isAlertType)(ruleFromFind.data[0])) {
      return null;
    } else {
      return ruleFromFind.data[0];
    }
  } else {
    // should never get here, and yet here we are.
    return null;
  }
};

exports.readRules = readRules;
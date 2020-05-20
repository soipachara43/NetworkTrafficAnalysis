"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrepackagedRules = exports.validateAllPrepackagedRules = void 0;

var _add_prepackaged_rules_schema = require("../routes/schemas/add_prepackaged_rules_schema");

var _bad_request_error = require("../errors/bad_request_error");

var _prepackaged_rules = require("./prepackaged_rules");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Validate the rules from the file system and throw any errors indicating to the developer
 * that they are adding incorrect schema rules. Also this will auto-flush in all the default
 * aspects such as default interval of 5 minutes, default arrays, etc...
 */
const validateAllPrepackagedRules = rules => {
  return rules.map(rule => {
    const validatedRule = _add_prepackaged_rules_schema.addPrepackagedRulesSchema.validate(rule);

    if (validatedRule.error != null) {
      const ruleName = rule.name ? rule.name : '(rule name unknown)';
      const ruleId = rule.rule_id ? rule.rule_id : '(rule rule_id unknown)';
      throw new _bad_request_error.BadRequestError(`name: "${ruleName}", rule_id: "${ruleId}" within the folder rules/prepackaged_rules ` + `is not a valid detection engine rule. Expect the system ` + `to not work with pre-packaged rules until this rule is fixed ` + `or the file is removed. Error is: ${validatedRule.error.message}, Full rule contents are:\n${JSON.stringify(rule, null, 2)}`);
    } else {
      return validatedRule.value;
    }
  });
};

exports.validateAllPrepackagedRules = validateAllPrepackagedRules;

const getPrepackagedRules = (rules = _prepackaged_rules.rawRules) => {
  return validateAllPrepackagedRules(rules);
};

exports.getPrepackagedRules = getPrepackagedRules;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRulesToUpdate = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getRulesToUpdate = (rulesFromFileSystem, installedRules) => {
  return rulesFromFileSystem.filter(rule => installedRules.some(installedRule => {
    return rule.rule_id === installedRule.params.ruleId && rule.version > installedRule.params.version;
  }));
};

exports.getRulesToUpdate = getRulesToUpdate;
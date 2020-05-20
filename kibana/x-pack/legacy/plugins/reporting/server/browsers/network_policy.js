"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allowRequest = void 0;

var _ = _interopRequireWildcard(require("lodash"));

var _url = require("url");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const isHostMatch = (actualHost, ruleHost) => {
  const hostParts = actualHost.split('.').reverse();
  const ruleParts = ruleHost.split('.').reverse();
  return _.every(ruleParts, (part, idx) => part === hostParts[idx]);
};

const allowRequest = (url, rules) => {
  const parsed = (0, _url.parse)(url);

  if (!rules.length) {
    return true;
  } // Accumulator has three potential values here:
  // True => allow request, don't check other rules
  // False => reject request, don't check other rules
  // Undefined => Not yet known, proceed to next rule


  const allowed = rules.reduce((result, rule) => {
    if (typeof result === 'boolean') {
      return result;
    }

    const hostMatch = rule.host ? isHostMatch(parsed.host || '', rule.host) : true;
    const protocolMatch = rule.protocol ? parsed.protocol === rule.protocol : true;
    const isRuleMatch = hostMatch && protocolMatch;
    return isRuleMatch ? rule.allow : undefined;
  }, undefined);
  return typeof allowed !== 'undefined' ? allowed : false;
};

exports.allowRequest = allowRequest;
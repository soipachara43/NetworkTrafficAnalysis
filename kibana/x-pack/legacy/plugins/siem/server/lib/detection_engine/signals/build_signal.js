"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeInternalTagsFromRule = exports.buildSignal = exports.buildAncestorsSignal = exports.buildAncestor = void 0;

var _constants = require("../../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildAncestor = (doc, rule) => {
  var _doc$_source$signal;

  const existingSignal = (_doc$_source$signal = doc._source.signal) === null || _doc$_source$signal === void 0 ? void 0 : _doc$_source$signal.parent;

  if (existingSignal != null) {
    return {
      rule: rule.id != null ? rule.id : '',
      id: doc._id,
      type: 'signal',
      index: doc._index,
      depth: existingSignal.depth + 1
    };
  } else {
    return {
      rule: rule.id != null ? rule.id : '',
      id: doc._id,
      type: 'event',
      index: doc._index,
      depth: 1
    };
  }
};

exports.buildAncestor = buildAncestor;

const buildAncestorsSignal = (doc, rule) => {
  var _doc$_source$signal2;

  const newAncestor = buildAncestor(doc, rule);
  const existingAncestors = (_doc$_source$signal2 = doc._source.signal) === null || _doc$_source$signal2 === void 0 ? void 0 : _doc$_source$signal2.ancestors;

  if (existingAncestors != null) {
    return [...existingAncestors, newAncestor];
  } else {
    return [newAncestor];
  }
};

exports.buildAncestorsSignal = buildAncestorsSignal;

const buildSignal = (doc, rule) => {
  const ruleWithoutInternalTags = removeInternalTagsFromRule(rule);
  const parent = buildAncestor(doc, rule);
  const ancestors = buildAncestorsSignal(doc, rule);
  const signal = {
    parent,
    ancestors,
    original_time: doc._source['@timestamp'],
    status: 'open',
    rule: ruleWithoutInternalTags
  };

  if (doc._source.event != null) {
    return { ...signal,
      original_event: doc._source.event
    };
  }

  return signal;
};

exports.buildSignal = buildSignal;

const removeInternalTagsFromRule = rule => {
  if (rule.tags == null) {
    return rule;
  } else {
    const ruleWithoutInternalTags = { ...rule,
      tags: rule.tags.filter(tag => !tag.startsWith(_constants.INTERNAL_IDENTIFIER))
    };
    return ruleWithoutInternalTags;
  }
};

exports.removeInternalTagsFromRule = removeInternalTagsFromRule;
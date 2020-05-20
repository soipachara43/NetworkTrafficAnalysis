"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleBulkCreate = exports.filterDuplicateRules = void 0;

var _lodash = require("lodash");

var _perf_hooks = require("perf_hooks");

var _utils = require("./utils");

var _build_bulk_body = require("./build_bulk_body");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * This is for signals on signals to work correctly. If given a rule id this will check if
 * that rule id already exists in the ancestor tree of each signal search response and remove
 * those documents so they cannot be created as a signal since we do not want a rule id to
 * ever be capable of re-writing the same signal continuously if both the _input_ and _output_
 * of the signals index happens to be the same index.
 * @param ruleId The rule id
 * @param signalSearchResponse The search response that has all the documents
 */
const filterDuplicateRules = (ruleId, signalSearchResponse) => {
  return signalSearchResponse.hits.hits.filter(doc => {
    if (doc._source.signal == null) {
      return true;
    } else {
      return !doc._source.signal.ancestors.some(ancestor => ancestor.rule === ruleId);
    }
  });
};

exports.filterDuplicateRules = filterDuplicateRules;

// Bulk Index documents.
const singleBulkCreate = async ({
  someResult,
  ruleParams,
  services,
  logger,
  id,
  signalsIndex,
  actions,
  name,
  createdAt,
  createdBy,
  updatedAt,
  updatedBy,
  interval,
  enabled,
  refresh,
  tags,
  throttle
}) => {
  var _countBy$;

  someResult.hits.hits = filterDuplicateRules(id, someResult);

  if (someResult.hits.hits.length === 0) {
    return {
      success: true,
      createdItemsCount: 0
    };
  } // index documents after creating an ID based on the
  // source documents' originating index, and the original
  // document _id. This will allow two documents from two
  // different indexes with the same ID to be
  // indexed, and prevents us from creating any updates
  // to the documents once inserted into the signals index,
  // while preventing duplicates from being added to the
  // signals index if rules are re-run over the same time
  // span. Also allow for versioning.


  const bulkBody = someResult.hits.hits.flatMap(doc => {
    var _ruleParams$ruleId;

    return [{
      create: {
        _index: signalsIndex,
        _id: (0, _utils.generateId)(doc._index, doc._id, doc._version ? doc._version.toString() : '', (_ruleParams$ruleId = ruleParams.ruleId) !== null && _ruleParams$ruleId !== void 0 ? _ruleParams$ruleId : '')
      }
    }, (0, _build_bulk_body.buildBulkBody)({
      doc,
      ruleParams,
      id,
      actions,
      name,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
      interval,
      enabled,
      tags,
      throttle
    })];
  });

  const start = _perf_hooks.performance.now();

  const response = await services.callCluster('bulk', {
    index: signalsIndex,
    refresh,
    body: bulkBody
  });

  const end = _perf_hooks.performance.now();

  logger.debug(`individual bulk process time took: ${(0, _utils.makeFloatString)(end - start)} milliseconds`);
  logger.debug(`took property says bulk took: ${response.took} milliseconds`);

  if (response.errors) {
    const itemsWithErrors = response.items.filter(item => item.create.error);
    const errorCountsByStatus = (0, _lodash.countBy)(itemsWithErrors, item => item.create.status);
    delete errorCountsByStatus['409']; // Duplicate signals are expected

    if (!(0, _lodash.isEmpty)(errorCountsByStatus)) {
      logger.error(`[-] bulkResponse had errors with response statuses:counts of...\n${JSON.stringify(errorCountsByStatus, null, 2)}`);
    }
  }

  const createdItemsCount = (_countBy$ = (0, _lodash.countBy)(response.items, 'create.status')['201']) !== null && _countBy$ !== void 0 ? _countBy$ : 0;
  return {
    success: true,
    bulkCreateDuration: (0, _utils.makeFloatString)(end - start),
    createdItemsCount
  };
};

exports.singleBulkCreate = singleBulkCreate;
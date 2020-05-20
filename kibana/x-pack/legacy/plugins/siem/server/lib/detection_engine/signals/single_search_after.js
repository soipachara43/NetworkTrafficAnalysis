"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleSearchAfter = void 0;

var _perf_hooks = require("perf_hooks");

var _build_events_query = require("./build_events_query");

var _utils = require("./utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// utilize search_after for paging results into bulk.
const singleSearchAfter = async ({
  searchAfterSortId,
  index,
  from,
  to,
  services,
  filter,
  logger,
  pageSize
}) => {
  if (searchAfterSortId == null) {
    throw Error('Attempted to search after with empty sort id');
  }

  try {
    const searchAfterQuery = (0, _build_events_query.buildEventsSearchQuery)({
      index,
      from,
      to,
      filter,
      size: pageSize,
      searchAfterSortId
    });

    const start = _perf_hooks.performance.now();

    const nextSearchAfterResult = await services.callCluster('search', searchAfterQuery);

    const end = _perf_hooks.performance.now();

    return {
      searchResult: nextSearchAfterResult,
      searchDuration: (0, _utils.makeFloatString)(end - start)
    };
  } catch (exc) {
    logger.error(`[-] nextSearchAfter threw an error ${exc}`);
    throw exc;
  }
};

exports.singleSearchAfter = singleSearchAfter;
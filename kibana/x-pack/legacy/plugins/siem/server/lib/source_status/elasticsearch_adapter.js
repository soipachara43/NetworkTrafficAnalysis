"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticsearchSourceStatusAdapter = void 0;

var _query = require("./query.dsl");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const APM_INDEX_NAME = 'apm-*-transaction*';

class ElasticsearchSourceStatusAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async hasIndices(request, indexNames) {
    // Intended flow to determine app-empty state is to first check siem indices (as this is a quick shard count), and
    // if no shards exist only then perform the heavier APM query. This optimizes for normal use when siem data exists
    try {
      var _ref, _ref2, _hasApmDataResponse$a, _hasApmDataResponse$a2;

      // Remove APM index if exists, and only query if length > 0 in case it's the only index provided
      const nonApmIndexNames = indexNames.filter(name => name !== APM_INDEX_NAME);
      const indexCheckResponse = await (nonApmIndexNames.length > 0 ? this.framework.callWithRequest(request, 'search', {
        index: nonApmIndexNames,
        size: 0,
        terminate_after: 1,
        allow_no_indices: true
      }) : Promise.resolve(undefined));

      if (((_ref = indexCheckResponse === null || indexCheckResponse === void 0 ? void 0 : indexCheckResponse._shards.total) !== null && _ref !== void 0 ? _ref : -1) > 0) {
        return true;
      } // Note: Additional check necessary for APM-specific index. For details see: https://github.com/elastic/kibana/issues/56363
      // Only verify if APM data exists if indexNames includes `apm-*-transaction*` (default included apm index)


      const includesApmIndex = indexNames.includes(APM_INDEX_NAME);
      const hasApmDataResponse = await (includesApmIndex ? this.framework.callWithRequest(request, 'search', (0, _query.buildQuery)({
        defaultIndex: [APM_INDEX_NAME]
      })) : Promise.resolve(undefined));

      if (((_ref2 = hasApmDataResponse === null || hasApmDataResponse === void 0 ? void 0 : (_hasApmDataResponse$a = hasApmDataResponse.aggregations) === null || _hasApmDataResponse$a === void 0 ? void 0 : (_hasApmDataResponse$a2 = _hasApmDataResponse$a.total_service_names) === null || _hasApmDataResponse$a2 === void 0 ? void 0 : _hasApmDataResponse$a2.value) !== null && _ref2 !== void 0 ? _ref2 : -1) > 0) {
        return true;
      }
    } catch (e) {
      if (e.status === 404) {
        return false;
      }

      throw e;
    }

    return false;
  }

}

exports.ElasticsearchSourceStatusAdapter = ElasticsearchSourceStatusAdapter;
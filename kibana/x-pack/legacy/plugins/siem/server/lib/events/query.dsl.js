"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildDetailsQuery = exports.buildTimelineQuery = exports.buildQuery = void 0;

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildQuery = options => {
  const {
    querySize
  } = options.pagination;
  const {
    fields,
    filterQuery
  } = options;
  const filterClause = [...(0, _build_query.createQueryFilterClauses)(filterQuery)];
  const defaultIndex = options.defaultIndex;

  const getTimerangeFilter = timerange => {
    if (timerange) {
      const {
        to,
        from
      } = timerange;
      return [{
        range: {
          [options.sourceConfiguration.fields.timestamp]: {
            gte: from,
            lte: to
          }
        }
      }];
    }

    return [];
  };

  const filter = [...filterClause, ...getTimerangeFilter(options.timerange), {
    match_all: {}
  }];

  const getSortField = sortField => {
    if (sortField.sortFieldId) {
      const field = sortField.sortFieldId === 'timestamp' ? '@timestamp' : sortField.sortFieldId;
      return [{
        [field]: sortField.direction
      }, {
        [options.sourceConfiguration.fields.tiebreaker]: sortField.direction
      }];
    }

    return [];
  };

  const sort = getSortField(options.sortField);
  const dslQuery = {
    allowNoIndices: true,
    index: defaultIndex,
    ignoreUnavailable: true,
    body: {
      query: {
        bool: {
          filter
        }
      },
      size: querySize,
      track_total_hits: true,
      sort,
      _source: fields
    }
  };
  return dslQuery;
};

exports.buildQuery = buildQuery;

const buildTimelineQuery = options => {
  const {
    limit,
    cursor,
    tiebreaker
  } = options.pagination;
  const {
    fields,
    filterQuery
  } = options;
  const filterClause = [...(0, _build_query.createQueryFilterClauses)(filterQuery)];
  const defaultIndex = options.defaultIndex;

  const getTimerangeFilter = timerange => {
    if (timerange) {
      const {
        to,
        from
      } = timerange;
      return [{
        range: {
          [options.sourceConfiguration.fields.timestamp]: {
            gte: from,
            lte: to
          }
        }
      }];
    }

    return [];
  };

  const filter = [...filterClause, ...getTimerangeFilter(options.timerange), {
    match_all: {}
  }];

  const getSortField = sortField => {
    if (sortField.sortFieldId) {
      const field = sortField.sortFieldId === 'timestamp' ? '@timestamp' : sortField.sortFieldId;
      return [{
        [field]: sortField.direction
      }, {
        [options.sourceConfiguration.fields.tiebreaker]: sortField.direction
      }];
    }

    return [];
  };

  const sort = getSortField(options.sortField);
  const dslQuery = {
    allowNoIndices: true,
    index: defaultIndex,
    ignoreUnavailable: true,
    body: {
      query: {
        bool: {
          filter
        }
      },
      size: limit + 1,
      track_total_hits: true,
      sort,
      _source: fields
    }
  };

  if (cursor && tiebreaker) {
    return { ...dslQuery,
      body: { ...dslQuery.body,
        search_after: [cursor, tiebreaker]
      }
    };
  }

  return dslQuery;
};

exports.buildTimelineQuery = buildTimelineQuery;

const buildDetailsQuery = (indexName, id) => ({
  allowNoIndices: true,
  index: indexName,
  ignoreUnavailable: true,
  body: {
    query: {
      terms: {
        _id: [id]
      }
    }
  },
  size: 1
});

exports.buildDetailsQuery = buildDetailsQuery;
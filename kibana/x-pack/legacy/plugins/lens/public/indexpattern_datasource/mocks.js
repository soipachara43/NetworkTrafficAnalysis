"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockedDragDropContext = createMockedDragDropContext;
exports.createMockedRestrictedIndexPattern = exports.createMockedIndexPattern = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createMockedIndexPattern = function createMockedIndexPattern() {
  return {
    id: '1',
    title: 'my-fake-index-pattern',
    timeFieldName: 'timestamp',
    fields: [{
      name: 'timestamp',
      type: 'date',
      aggregatable: true,
      searchable: true
    }, {
      name: 'start_date',
      type: 'date',
      aggregatable: true,
      searchable: true
    }, {
      name: 'bytes',
      type: 'number',
      aggregatable: true,
      searchable: true
    }, {
      name: 'memory',
      type: 'number',
      aggregatable: true,
      searchable: true
    }, {
      name: 'source',
      type: 'string',
      aggregatable: true,
      searchable: true
    }, {
      name: 'dest',
      type: 'string',
      aggregatable: true,
      searchable: true
    }]
  };
};

exports.createMockedIndexPattern = createMockedIndexPattern;

var createMockedRestrictedIndexPattern = function createMockedRestrictedIndexPattern() {
  return {
    id: '2',
    title: 'my-fake-restricted-pattern',
    timeFieldName: 'timestamp',
    fields: [{
      name: 'timestamp',
      type: 'date',
      aggregatable: true,
      searchable: true
    }, {
      name: 'bytes',
      type: 'number',
      aggregatable: true,
      searchable: true
    }, {
      name: 'source',
      type: 'string',
      aggregatable: true,
      searchable: true
    }],
    typeMeta: {
      params: {
        rollup_index: 'my-fake-index-pattern'
      },
      aggs: {
        terms: {
          source: {
            agg: 'terms'
          }
        },
        date_histogram: {
          timestamp: {
            agg: 'date_histogram',
            fixed_interval: '1d',
            delay: '7d',
            time_zone: 'UTC'
          }
        },
        histogram: {
          bytes: {
            agg: 'histogram',
            interval: 1000
          }
        },
        avg: {
          bytes: {
            agg: 'avg'
          }
        },
        max: {
          bytes: {
            agg: 'max'
          }
        },
        min: {
          bytes: {
            agg: 'min'
          }
        },
        sum: {
          bytes: {
            agg: 'sum'
          }
        }
      }
    }
  };
};

exports.createMockedRestrictedIndexPattern = createMockedRestrictedIndexPattern;

function createMockedDragDropContext() {
  return {
    dragging: undefined,
    setDragging: jest.fn()
  };
}
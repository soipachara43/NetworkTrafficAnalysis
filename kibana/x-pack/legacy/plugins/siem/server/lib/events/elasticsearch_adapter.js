"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldCategory = exports.formatTimelineData = exports.formatEventsData = exports.ElasticsearchEventsAdapter = void 0;

var _fp = require("lodash/fp");

var _ = require("../../utils/beat_schema/8.0.0");

var _reduce_fields = require("../../utils/build_query/reduce_fields");

var _build_query = require("../../utils/build_query");

var _ecs_fields = require("../ecs_fields");

var _query = require("./query.dsl");

var _queryLast_event_time = require("./query.last_event_time.dsl");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class ElasticsearchEventsAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getTimelineData(request, options) {
    const queryOptions = (0, _fp.cloneDeep)(options);
    queryOptions.fields = (0, _fp.uniq)([...queryOptions.fieldRequested, ...(0, _reduce_fields.reduceFields)(queryOptions.fields, _ecs_fields.eventFieldsMap)]);
    delete queryOptions.fieldRequested;
    const dsl = (0, _query.buildTimelineQuery)(queryOptions);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const {
      limit
    } = options.pagination;
    const totalCount = (0, _fp.getOr)(0, 'hits.total.value', response);
    const hits = response.hits.hits;
    const timelineEdges = hits.map(hit => formatTimelineData(options.fieldRequested, options.fields, hit, _ecs_fields.eventFieldsMap));
    const hasNextPage = timelineEdges.length === limit + 1;
    const edges = hasNextPage ? timelineEdges.splice(0, limit) : timelineEdges;
    const lastCursor = (0, _fp.get)('cursor', (0, _fp.last)(edges));
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    return {
      edges,
      inspect,
      pageInfo: {
        hasNextPage,
        endCursor: lastCursor
      },
      totalCount
    };
  }

  async getTimelineDetails(request, options) {
    const dsl = (0, _query.buildDetailsQuery)(options.indexName, options.eventId);
    const searchResponse = await this.framework.callWithRequest(request, 'search', dsl);
    const sourceData = (0, _fp.getOr)({}, 'hits.hits.0._source', searchResponse);
    const hitsData = (0, _fp.getOr)({}, 'hits.hits.0', searchResponse);
    delete hitsData._source;
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(searchResponse)]
    };
    const data = getDataFromHits((0, _fp.merge)(sourceData, hitsData));
    return {
      data,
      inspect
    };
  }

  async getLastEventTimeData(request, options) {
    const dsl = (0, _queryLast_event_time.buildLastEventTimeQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    return {
      inspect,
      lastSeen: (0, _fp.getOr)(null, 'aggregations.last_seen_event.value_as_string', response)
    };
  }

}

exports.ElasticsearchEventsAdapter = ElasticsearchEventsAdapter;

const formatEventsData = (fields, hit, fieldMap) => fields.reduce((flattenedFields, fieldName) => {
  flattenedFields.node._id = hit._id;
  flattenedFields.node._index = hit._index;

  if (hit.sort && hit.sort.length > 1) {
    flattenedFields.cursor.value = hit.sort[0];
    flattenedFields.cursor.tiebreaker = hit.sort[1];
  }

  return (0, _build_query.mergeFieldsWithHit)(fieldName, flattenedFields, fieldMap, hit);
}, {
  node: {
    _id: ''
  },
  cursor: {
    value: '',
    tiebreaker: null
  }
});

exports.formatEventsData = formatEventsData;

const formatTimelineData = (dataFields, ecsFields, hit, fieldMap) => (0, _fp.uniq)([...ecsFields, ...dataFields]).reduce((flattenedFields, fieldName) => {
  flattenedFields.node._id = hit._id;
  flattenedFields.node._index = hit._index;
  flattenedFields.node.ecs._id = hit._id;
  flattenedFields.node.ecs._index = hit._index;

  if (hit.sort && hit.sort.length > 1) {
    flattenedFields.cursor.value = hit.sort[0];
    flattenedFields.cursor.tiebreaker = hit.sort[1];
  }

  return mergeTimelineFieldsWithHit(fieldName, flattenedFields, fieldMap, hit, dataFields, ecsFields);
}, {
  node: {
    ecs: {
      _id: ''
    },
    data: [],
    _id: '',
    _index: ''
  },
  cursor: {
    value: '',
    tiebreaker: null
  }
});

exports.formatTimelineData = formatTimelineData;
const specialFields = ['_id', '_index', '_type', '_score'];

const mergeTimelineFieldsWithHit = (fieldName, flattenedFields, fieldMap, hit, dataFields, ecsFields) => {
  if (fieldMap[fieldName] != null || dataFields.includes(fieldName)) {
    const esField = dataFields.includes(fieldName) ? fieldName : fieldMap[fieldName];

    if ((0, _fp.has)(esField, hit._source) || specialFields.includes(esField)) {
      const objectWithProperty = {
        node: { ...(0, _fp.get)('node', flattenedFields),
          data: dataFields.includes(fieldName) ? [...(0, _fp.get)('node.data', flattenedFields), {
            field: fieldName,
            value: specialFields.includes(esField) ? (0, _fp.get)(esField, hit) : (0, _fp.get)(esField, hit._source)
          }] : (0, _fp.get)('node.data', flattenedFields),
          ecs: ecsFields.includes(fieldName) ? { ...(0, _fp.get)('node.ecs', flattenedFields),
            ...fieldName.split('.').reduceRight((obj, next) => ({
              [next]: obj
            }), (0, _fp.get)(esField, hit._source))
          } : (0, _fp.get)('node.ecs', flattenedFields)
        }
      };
      return (0, _fp.merge)(flattenedFields, objectWithProperty);
    } else {
      return flattenedFields;
    }
  } else {
    return flattenedFields;
  }
};

const getFieldCategory = field => {
  const fieldCategory = field.split('.')[0];

  if (!(0, _fp.isEmpty)(fieldCategory) && _.baseCategoryFields.includes(fieldCategory)) {
    return 'base';
  }

  return fieldCategory;
};

exports.getFieldCategory = getFieldCategory;

const getDataFromHits = (sources, category, path) => Object.keys(sources).reduce((accumulator, source) => {
  const item = (0, _fp.get)(source, sources);

  if (Array.isArray(item) || (0, _fp.isString)(item) || (0, _fp.isNumber)(item)) {
    const field = path ? `${path}.${source}` : source;
    const fieldCategory = getFieldCategory(field);
    return [...accumulator, {
      category: fieldCategory,
      field,
      values: item,
      originalValue: item
    }];
  } else if ((0, _fp.isObject)(item)) {
    return [...accumulator, ...getDataFromHits(item, category || source, path ? `${path}.${source}` : source)];
  }

  return accumulator;
}, []);
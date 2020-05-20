"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizedTimes = exports.inputTimes = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var inputTimes = [{
  type: 'BooleanQuery',
  description: 'hour:1 hour:2 #MatchNoDocsQuery["User requested "match_none" query."]',
  time: 0.447365,
  breakdown: [{
    key: 'create_weight',
    time: 401690,
    relative: '89.8',
    color: '#feb6b6',
    tip: 'The time taken to create the Weight object, which holds temporary information during scoring.'
  }, {
    key: 'build_scorer',
    time: 45672,
    relative: '10.2',
    color: '#f6eeee',
    tip: 'The time taken to create the Scoring object, which is later used to execute the actual scoring of each doc.'
  }, {
    key: 'build_scorer_count',
    time: 2,
    relative: 0,
    color: '#f5f5f5',
    tip: ''
  }, {
    key: 'create_weight_count',
    time: 1,
    relative: 0,
    color: '#f5f5f5',
    tip: ''
  }, {
    key: 'next_doc',
    time: 0,
    relative: '0.0',
    color: '#f5f5f5',
    tip: 'The time taken to advance the iterator to the next matching document.'
  }, {
    key: 'match',
    time: 0,
    relative: '0.0',
    color: '#f5f5f5',
    tip: 'The time taken to execute a secondary, more precise scoring phase (used by phrase queries).'
  }, {
    key: 'match_count',
    time: 0,
    relative: 0,
    color: '#f5f5f5',
    tip: ''
  }, {
    key: 'next_doc_count',
    time: 0,
    relative: 0,
    color: '#f5f5f5',
    tip: ''
  }, {
    key: 'score_count',
    time: 0,
    relative: 0,
    color: '#f5f5f5',
    tip: ''
  }, {
    key: 'score',
    time: 0,
    relative: '0.0',
    color: '#f5f5f5',
    tip: 'The time taken in actually scoring the document against the query.'
  }, {
    key: 'advance',
    time: 0,
    relative: '0.0',
    color: '#f5f5f5',
    tip: 'The time taken to advance the iterator to the next document.'
  }, {
    key: 'advance_count',
    time: 0,
    relative: 0,
    color: '#f5f5f5',
    tip: ''
  }],
  children: [{
    type: 'TermQuery',
    description: 'hour:1',
    time: 0.192502,
    breakdown: [{
      key: 'create_weight',
      time: 190989,
      relative: '99.2',
      color: '#ffb0b0',
      tip: 'The time taken to create the Weight object, which holds temporary information during scoring.'
    }, {
      key: 'build_scorer',
      time: 1510,
      relative: '0.8',
      color: '#f5f4f4',
      tip: 'The time taken to create the Scoring object, which is later used to execute the actual scoring of each doc.'
    }, {
      key: 'build_scorer_count',
      time: 2,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'create_weight_count',
      time: 1,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'next_doc',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to advance the iterator to the next matching document.'
    }, {
      key: 'match',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to execute a secondary, more precise scoring phase (used by phrase queries).'
    }, {
      key: 'match_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'next_doc_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'score_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'score',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken in actually scoring the document against the query.'
    }, {
      key: 'advance',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to advance the iterator to the next document.'
    }, {
      key: 'advance_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }],
    id: '3339dca6-c34a-49f3-a534-27e46f238bcd',
    parentId: 'f1e689b1-dafe-4c2b-9a4d-9bd8f1a53803',
    childrenIds: [],
    selfTime: 0.192502
  }, {
    type: 'TermQuery',
    description: 'hour:2',
    time: 0.162608,
    breakdown: [{
      key: 'create_weight',
      time: 162016,
      relative: '99.6',
      color: '#ffafaf',
      tip: 'The time taken to create the Weight object, which holds temporary information during scoring.'
    }, {
      key: 'build_scorer',
      time: 589,
      relative: '0.4',
      color: '#f5f5f5',
      tip: 'The time taken to create the Scoring object, which is later used to execute the actual scoring of each doc.'
    }, {
      key: 'build_scorer_count',
      time: 2,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'create_weight_count',
      time: 1,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'next_doc',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to advance the iterator to the next matching document.'
    }, {
      key: 'match',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to execute a secondary, more precise scoring phase (used by phrase queries).'
    }, {
      key: 'match_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'next_doc_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'score_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'score',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken in actually scoring the document against the query.'
    }, {
      key: 'advance',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to advance the iterator to the next document.'
    }, {
      key: 'advance_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }],
    id: '9b75ecdd-a1da-45eb-8d13-5bc5f472dba3',
    parentId: 'f1e689b1-dafe-4c2b-9a4d-9bd8f1a53803',
    childrenIds: [],
    selfTime: 0.162608
  }, {
    type: 'MatchNoDocsQuery',
    description: 'MatchNoDocsQuery["User requested "match_none" query."]',
    time: 0.03517,
    breakdown: [{
      key: 'build_scorer',
      time: 32522,
      relative: '92.5',
      color: '#feb4b4',
      tip: 'The time taken to create the Scoring object, which is later used to execute the actual scoring of each doc.'
    }, {
      key: 'create_weight',
      time: 2645,
      relative: '7.5',
      color: '#f6f0f0',
      tip: 'The time taken to create the Weight object, which holds temporary information during scoring.'
    }, {
      key: 'build_scorer_count',
      time: 2,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'create_weight_count',
      time: 1,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'next_doc',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to advance the iterator to the next matching document.'
    }, {
      key: 'match',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to execute a secondary, more precise scoring phase (used by phrase queries).'
    }, {
      key: 'match_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'next_doc_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'score_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'score',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken in actually scoring the document against the query.'
    }, {
      key: 'advance',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to advance the iterator to the next document.'
    }, {
      key: 'advance_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }],
    id: 'ddf5aa3e-4b22-4332-9d5e-79a6ae0cc9cb',
    parentId: 'f1e689b1-dafe-4c2b-9a4d-9bd8f1a53803',
    childrenIds: [],
    selfTime: 0.03517
  }],
  id: 'f1e689b1-dafe-4c2b-9a4d-9bd8f1a53803',
  childrenIds: ['3339dca6-c34a-49f3-a534-27e46f238bcd', '9b75ecdd-a1da-45eb-8d13-5bc5f472dba3', 'ddf5aa3e-4b22-4332-9d5e-79a6ae0cc9cb'],
  hasChildren: true,
  selfTime: 0.057085
}];
exports.inputTimes = inputTimes;
var normalizedTimes = [{
  type: 'BooleanQuery',
  description: 'hour:1 hour:2 #MatchNoDocsQuery["User requested "match_none" query."]',
  time: 0.447365,
  breakdown: [{
    key: 'create_weight',
    time: 401690,
    relative: '89.8',
    color: '#feb6b6',
    tip: 'The time taken to create the Weight object, which holds temporary information during scoring.'
  }, {
    key: 'build_scorer',
    time: 45672,
    relative: '10.2',
    color: '#f6eeee',
    tip: 'The time taken to create the Scoring object, which is later used to execute the actual scoring of each doc.'
  }, {
    key: 'build_scorer_count',
    time: 2,
    relative: 0,
    color: '#f5f5f5',
    tip: ''
  }, {
    key: 'create_weight_count',
    time: 1,
    relative: 0,
    color: '#f5f5f5',
    tip: ''
  }, {
    key: 'next_doc',
    time: 0,
    relative: '0.0',
    color: '#f5f5f5',
    tip: 'The time taken to advance the iterator to the next matching document.'
  }, {
    key: 'match',
    time: 0,
    relative: '0.0',
    color: '#f5f5f5',
    tip: 'The time taken to execute a secondary, more precise scoring phase (used by phrase queries).'
  }, {
    key: 'match_count',
    time: 0,
    relative: 0,
    color: '#f5f5f5',
    tip: ''
  }, {
    key: 'next_doc_count',
    time: 0,
    relative: 0,
    color: '#f5f5f5',
    tip: ''
  }, {
    key: 'score_count',
    time: 0,
    relative: 0,
    color: '#f5f5f5',
    tip: ''
  }, {
    key: 'score',
    time: 0,
    relative: '0.0',
    color: '#f5f5f5',
    tip: 'The time taken in actually scoring the document against the query.'
  }, {
    key: 'advance',
    time: 0,
    relative: '0.0',
    color: '#f5f5f5',
    tip: 'The time taken to advance the iterator to the next document.'
  }, {
    key: 'advance_count',
    time: 0,
    relative: 0,
    color: '#f5f5f5',
    tip: ''
  }],
  children: [{
    type: 'TermQuery',
    description: 'hour:1',
    time: 0.192502,
    breakdown: [{
      key: 'create_weight',
      time: 190989,
      relative: '99.2',
      color: '#ffb0b0',
      tip: 'The time taken to create the Weight object, which holds temporary information during scoring.'
    }, {
      key: 'build_scorer',
      time: 1510,
      relative: '0.8',
      color: '#f5f4f4',
      tip: 'The time taken to create the Scoring object, which is later used to execute the actual scoring of each doc.'
    }, {
      key: 'build_scorer_count',
      time: 2,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'create_weight_count',
      time: 1,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'next_doc',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to advance the iterator to the next matching document.'
    }, {
      key: 'match',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to execute a secondary, more precise scoring phase (used by phrase queries).'
    }, {
      key: 'match_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'next_doc_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'score_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'score',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken in actually scoring the document against the query.'
    }, {
      key: 'advance',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to advance the iterator to the next document.'
    }, {
      key: 'advance_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }],
    id: '3339dca6-c34a-49f3-a534-27e46f238bcd',
    parentId: 'f1e689b1-dafe-4c2b-9a4d-9bd8f1a53803',
    childrenIds: [],
    selfTime: 0.192502,
    timePercentage: '43.03',
    absoluteColor: '#f9d7d7'
  }, {
    type: 'TermQuery',
    description: 'hour:2',
    time: 0.162608,
    breakdown: [{
      key: 'create_weight',
      time: 162016,
      relative: '99.6',
      color: '#ffafaf',
      tip: 'The time taken to create the Weight object, which holds temporary information during scoring.'
    }, {
      key: 'build_scorer',
      time: 589,
      relative: '0.4',
      color: '#f5f5f5',
      tip: 'The time taken to create the Scoring object, which is later used to execute the actual scoring of each doc.'
    }, {
      key: 'build_scorer_count',
      time: 2,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'create_weight_count',
      time: 1,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'next_doc',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to advance the iterator to the next matching document.'
    }, {
      key: 'match',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to execute a secondary, more precise scoring phase (used by phrase queries).'
    }, {
      key: 'match_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'next_doc_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'score_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'score',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken in actually scoring the document against the query.'
    }, {
      key: 'advance',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to advance the iterator to the next document.'
    }, {
      key: 'advance_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }],
    id: '9b75ecdd-a1da-45eb-8d13-5bc5f472dba3',
    parentId: 'f1e689b1-dafe-4c2b-9a4d-9bd8f1a53803',
    childrenIds: [],
    selfTime: 0.162608,
    timePercentage: '36.35',
    absoluteColor: '#f9dcdc'
  }, {
    type: 'MatchNoDocsQuery',
    description: 'MatchNoDocsQuery["User requested "match_none" query."]',
    time: 0.03517,
    breakdown: [{
      key: 'build_scorer',
      time: 32522,
      relative: '92.5',
      color: '#feb4b4',
      tip: 'The time taken to create the Scoring object, which is later used to execute the actual scoring of each doc.'
    }, {
      key: 'create_weight',
      time: 2645,
      relative: '7.5',
      color: '#f6f0f0',
      tip: 'The time taken to create the Weight object, which holds temporary information during scoring.'
    }, {
      key: 'build_scorer_count',
      time: 2,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'create_weight_count',
      time: 1,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'next_doc',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to advance the iterator to the next matching document.'
    }, {
      key: 'match',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to execute a secondary, more precise scoring phase (used by phrase queries).'
    }, {
      key: 'match_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'next_doc_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'score_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }, {
      key: 'score',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken in actually scoring the document against the query.'
    }, {
      key: 'advance',
      time: 0,
      relative: '0.0',
      color: '#f5f5f5',
      tip: 'The time taken to advance the iterator to the next document.'
    }, {
      key: 'advance_count',
      time: 0,
      relative: 0,
      color: '#f5f5f5',
      tip: ''
    }],
    id: 'ddf5aa3e-4b22-4332-9d5e-79a6ae0cc9cb',
    parentId: 'f1e689b1-dafe-4c2b-9a4d-9bd8f1a53803',
    childrenIds: [],
    selfTime: 0.03517,
    timePercentage: '7.86',
    absoluteColor: '#f6efef'
  }],
  id: 'f1e689b1-dafe-4c2b-9a4d-9bd8f1a53803',
  childrenIds: ['3339dca6-c34a-49f3-a534-27e46f238bcd', '9b75ecdd-a1da-45eb-8d13-5bc5f472dba3', 'ddf5aa3e-4b22-4332-9d5e-79a6ae0cc9cb'],
  hasChildren: true,
  selfTime: 0.057085,
  timePercentage: '100.00',
  absoluteColor: '#ffafaf'
}];
exports.normalizedTimes = normalizedTimes;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticsearchBeatEventsAdapter = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class ElasticsearchBeatEventsAdapter {
  // @ts-ignore
  constructor(database) {
    this.database = database;

    _defineProperty(this, "bulkInsert", async (user, beatId, events) => {// await this.database.putTemplate(INDEX_NAMES.EVENTS_TODAY, beatsIndexTemplate);
    });
  } // eslint-disable-next-line


}

exports.ElasticsearchBeatEventsAdapter = ElasticsearchBeatEventsAdapter;
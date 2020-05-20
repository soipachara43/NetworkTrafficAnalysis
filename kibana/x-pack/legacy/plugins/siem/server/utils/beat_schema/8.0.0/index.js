"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "auditbeatSchema", {
  enumerable: true,
  get: function () {
    return _auditbeat.auditbeatSchema;
  }
});
Object.defineProperty(exports, "filebeatSchema", {
  enumerable: true,
  get: function () {
    return _filebeat.filebeatSchema;
  }
});
Object.defineProperty(exports, "packetbeatSchema", {
  enumerable: true,
  get: function () {
    return _packetbeat.packetbeatSchema;
  }
});
Object.defineProperty(exports, "winlogbeatSchema", {
  enumerable: true,
  get: function () {
    return _winlogbeat.winlogbeatSchema;
  }
});
Object.defineProperty(exports, "ecsSchema", {
  enumerable: true,
  get: function () {
    return _ecs.ecsSchema;
  }
});
exports.baseCategoryFields = exports.extraSchemaField = void 0;

var _auditbeat = require("./auditbeat");

var _filebeat = require("./filebeat");

var _packetbeat = require("./packetbeat");

var _winlogbeat = require("./winlogbeat");

var _ecs = require("./ecs");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const extraSchemaField = {
  _id: {
    description: 'Each document has an _id that uniquely identifies it',
    example: 'Y-6TfmcB0WOhS6qyMv3s',
    footnote: '',
    group: 1,
    level: 'core',
    name: '_id',
    required: true,
    type: 'keyword'
  },
  _index: {
    description: 'An index is like a ‘database’ in a relational database. It has a mapping which defines multiple types. An index is a logical namespace which maps to one or more primary shards and can have zero or more replica shards.',
    example: 'auditbeat-8.0.0-2019.02.19-000001',
    footnote: '',
    group: 1,
    level: 'core',
    name: '_index',
    required: true,
    type: 'keyword'
  }
};
exports.extraSchemaField = extraSchemaField;
const baseCategoryFields = ['@timestamp', 'labels', 'message', 'tags'];
exports.baseCategoryFields = baseCategoryFields;
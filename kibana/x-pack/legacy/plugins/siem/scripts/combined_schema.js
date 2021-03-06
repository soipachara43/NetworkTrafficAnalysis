"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.schemas = void 0;

var _graphqlTools = require("graphql-tools");

var _graphql = require("../server/graphql");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const schemas = [..._graphql.schemas]; // this default export is used to feed the combined types to the gql-gen tool
// which generates the corresponding typescript types
// eslint-disable-next-line import/no-default-export

exports.schemas = schemas;

var _default = (0, _graphqlTools.buildSchemaFromTypeDefinitions)(schemas);

exports.default = _default;
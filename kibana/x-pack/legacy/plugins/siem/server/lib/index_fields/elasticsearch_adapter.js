"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatIndexFields = exports.ElasticsearchIndexFieldAdapter = void 0;

var _fp = require("lodash/fp");

var _beat_schema = require("../../utils/beat_schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class ElasticsearchIndexFieldAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getIndexFields(request, indices) {
    const indexPatternsService = this.framework.getIndexPatternsService(request);
    const indexesAliasIndices = indices.reduce((accumulator, indice) => {
      const key = (0, _beat_schema.getIndexAlias)(indices, indice);

      if ((0, _fp.get)(key, accumulator)) {
        accumulator[key] = [...accumulator[key], indice];
      } else {
        accumulator[key] = [indice];
      }

      return accumulator;
    }, {});
    const responsesIndexFields = await Promise.all(Object.values(indexesAliasIndices).map(indicesByGroup => indexPatternsService.getFieldsForWildcard({
      pattern: indicesByGroup
    })));
    return formatIndexFields(responsesIndexFields, Object.keys(indexesAliasIndices));
  }

}

exports.ElasticsearchIndexFieldAdapter = ElasticsearchIndexFieldAdapter;
const missingFields = [{
  name: '_id',
  type: 'string',
  searchable: true,
  aggregatable: false,
  readFromDocValues: true
}, {
  name: '_index',
  type: 'string',
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}];

const formatIndexFields = (responsesIndexFields, indexesAlias) => responsesIndexFields.reduce((accumulator, indexFields, indexesAliasIdx) => [...accumulator, ...[...missingFields, ...indexFields].reduce((itemAccumulator, index) => {
  const alias = indexesAlias[indexesAliasIdx];
  const splitName = index.name.split('.');
  const category = _beat_schema.baseCategoryFields.includes(splitName[0]) ? 'base' : splitName[0];
  return [...itemAccumulator, { ...((0, _beat_schema.hasDocumentation)(alias, index.name) ? (0, _beat_schema.getDocumentation)(alias, index.name) : {}),
    ...index,
    category,
    indexes: [alias]
  }];
}, [])], []).reduce((accumulator, indexfield) => {
  const alreadyExistingIndexField = accumulator.findIndex(acc => acc.name === indexfield.name);

  if (alreadyExistingIndexField > -1) {
    const existingIndexField = accumulator[alreadyExistingIndexField];
    return [...accumulator.slice(0, alreadyExistingIndexField), { ...existingIndexField,
      description: (0, _fp.isEmpty)(existingIndexField.description) ? indexfield.description : existingIndexField.description,
      indexes: Array.from(new Set([...existingIndexField.indexes, ...indexfield.indexes]))
    }, ...accumulator.slice(alreadyExistingIndexField + 1)];
  }

  return [...accumulator, indexfield];
}, []);

exports.formatIndexFields = formatIndexFields;
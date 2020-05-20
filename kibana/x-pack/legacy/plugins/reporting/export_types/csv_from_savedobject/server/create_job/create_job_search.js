"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createJobSearch = createJobSearch;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function createJobSearch(timerange, attributes, references, kibanaSavedObjectMeta) {
  const {
    searchSource
  } = kibanaSavedObjectMeta;

  if (!searchSource || !references) {
    throw new Error('The saved search object is missing configuration fields!');
  }

  const indexPatternMeta = references.find(ref => ref.type === 'index-pattern');

  if (!indexPatternMeta) {
    throw new Error('Could not find index pattern for the saved search!');
  }

  const sPanel = {
    attributes: { ...attributes,
      kibanaSavedObjectMeta: {
        searchSource
      }
    },
    indexPatternSavedObjectId: indexPatternMeta.id,
    timerange
  };
  return {
    panel: sPanel,
    title: attributes.title,
    visType: 'search'
  };
}
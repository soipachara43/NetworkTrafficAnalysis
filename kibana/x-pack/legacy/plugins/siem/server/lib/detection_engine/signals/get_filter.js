"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilter = exports.getQueryFilter = void 0;

var _build_query = require("../../../utils/build_query");

var _server = require("../../../../../../../../src/plugins/data/server");

var _bad_request_error = require("../errors/bad_request_error");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getQueryFilter = (query, language, filters, index) => {
  const indexPattern = {
    fields: [],
    title: index.join()
  };
  const queries = [{
    query,
    language
  }];
  const config = {
    allowLeadingWildcards: true,
    queryStringOptions: {
      analyze_wildcard: true
    },
    ignoreFilterIfFieldNotInIndex: false,
    dateFormatTZ: 'Zulu'
  };
  const enabledFilters = filters.filter(f => f && !_server.esFilters.isFilterDisabled(f));
  return _server.esQuery.buildEsQuery(indexPattern, queries, enabledFilters, config);
};

exports.getQueryFilter = getQueryFilter;

const getFilter = async ({
  filters,
  index,
  language,
  savedId,
  services,
  type,
  query
}) => {
  switch (type) {
    case 'query':
      {
        if (query != null && language != null && index != null) {
          return getQueryFilter(query, language, filters || [], index);
        } else {
          throw new _bad_request_error.BadRequestError('query, filters, and index parameter should be defined');
        }
      }

    case 'saved_query':
      {
        if (savedId != null && index != null) {
          try {
            // try to get the saved object first
            const savedObject = await services.savedObjectsClient.get('query', savedId);
            return getQueryFilter(savedObject.attributes.query.query, savedObject.attributes.query.language, savedObject.attributes.filters, index);
          } catch (err) {
            // saved object does not exist, so try and fall back if the user pushed
            // any additional language, query, filters, etc...
            if (query != null && language != null && index != null) {
              return getQueryFilter(query, language, filters || [], index);
            } else {
              // user did not give any additional fall back mechanism for generating a rule
              // rethrow error for activity monitoring
              throw err;
            }
          }
        } else {
          throw new _bad_request_error.BadRequestError('savedId parameter should be defined');
        }
      }

    case 'machine_learning':
      {
        throw new _bad_request_error.BadRequestError('Unsupported Rule of type "machine_learning" supplied to getFilter');
      }
  }

  return (0, _build_query.assertUnreachable)(type);
};

exports.getFilter = getFilter;
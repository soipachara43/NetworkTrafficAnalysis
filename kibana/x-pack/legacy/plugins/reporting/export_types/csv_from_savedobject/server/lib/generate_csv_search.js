"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCsvSearch = generateCsvSearch;

var _server = require("../../../../../../../../src/core/server");

var _server2 = require("../../../../../../../../src/plugins/data/server");

var _cancellation_token = require("../../../../common/cancellation_token");

var _generate_csv = require("../../../csv/server/lib/generate_csv");

var _get_data_source = require("./get_data_source");

var _get_filters = require("./get_filters");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getEsQueryConfig = async config => {
  const configs = await Promise.all([config.get('query:allowLeadingWildcards'), config.get('query:queryString:options'), config.get('courier:ignoreFilterIfFieldNotInIndex')]);
  const [allowLeadingWildcards, queryStringOptions, ignoreFilterIfFieldNotInIndex] = configs;
  return {
    allowLeadingWildcards,
    queryStringOptions,
    ignoreFilterIfFieldNotInIndex
  };
};

const getUiSettings = async config => {
  const configs = await Promise.all([config.get('csv:separator'), config.get('csv:quoteValues')]);
  const [separator, quoteValues] = configs;
  return {
    separator,
    quoteValues
  };
};

async function generateCsvSearch(req, reporting, server, elasticsearch, logger, searchPanel, jobParams) {
  const savedObjectsClient = await reporting.getSavedObjectsClient(_server.KibanaRequest.from(req.getRawRequest()));
  const {
    indexPatternSavedObjectId,
    timerange
  } = searchPanel;
  const savedSearchObjectAttr = searchPanel.attributes;
  const {
    indexPatternSavedObject
  } = await (0, _get_data_source.getDataSource)(savedObjectsClient, indexPatternSavedObjectId);
  const uiConfig = await reporting.getUiSettingsServiceFactory(savedObjectsClient);
  const esQueryConfig = await getEsQueryConfig(uiConfig);
  const {
    kibanaSavedObjectMeta: {
      searchSource: {
        filter: [searchSourceFilter],
        query: searchSourceQuery
      }
    }
  } = savedSearchObjectAttr;
  const {
    timeFieldName: indexPatternTimeField,
    title: esIndex,
    fields: indexPatternFields
  } = indexPatternSavedObject;
  let payloadQuery;
  let payloadSort = [];
  let docValueFields;

  if (jobParams.post && jobParams.post.state) {
    ({
      post: {
        state: {
          query: payloadQuery,
          sort: payloadSort = [],
          docvalue_fields: docValueFields
        }
      }
    } = jobParams);
  }

  const {
    includes,
    timezone,
    combinedFilter
  } = (0, _get_filters.getFilters)(indexPatternSavedObjectId, indexPatternTimeField, timerange, savedSearchObjectAttr, searchSourceFilter, payloadQuery);
  const savedSortConfigs = savedSearchObjectAttr.sort;
  const sortConfig = [...payloadSort];
  savedSortConfigs.forEach(([savedSortField, savedSortOrder]) => {
    sortConfig.push({
      [savedSortField]: {
        order: savedSortOrder
      }
    });
  });
  const scriptFieldsConfig = indexPatternFields.filter(f => f.scripted).reduce((accum, curr) => {
    return { ...accum,
      [curr.name]: {
        script: {
          source: curr.script,
          lang: curr.lang
        }
      }
    };
  }, {});

  if (indexPatternTimeField) {
    if (docValueFields) {
      docValueFields = [indexPatternTimeField].concat(docValueFields);
    } else {
      docValueFields = [indexPatternTimeField];
    }
  }

  const searchRequest = {
    index: esIndex,
    body: {
      _source: {
        includes
      },
      docvalue_fields: docValueFields,
      query: _server2.esQuery.buildEsQuery(indexPatternSavedObject, searchSourceQuery, combinedFilter, esQueryConfig),
      script_fields: scriptFieldsConfig,
      sort: sortConfig
    }
  };
  const {
    callAsCurrentUser
  } = elasticsearch.dataClient.asScoped(_server.KibanaRequest.from(req.getRawRequest()));

  const callCluster = (...params) => callAsCurrentUser(...params);

  const config = server.config();
  const uiSettings = await getUiSettings(uiConfig);
  const generateCsvParams = {
    searchRequest,
    callEndpoint: callCluster,
    fields: includes,
    formatsMap: new Map(),
    // there is no field formatting in this API; this is required for generateCsv
    metaFields: [],
    conflictedTypesFields: [],
    cancellationToken: new _cancellation_token.CancellationToken(),
    settings: { ...uiSettings,
      maxSizeBytes: config.get('xpack.reporting.csv.maxSizeBytes'),
      scroll: config.get('xpack.reporting.csv.scroll'),
      timezone
    }
  };
  const generateCsv = (0, _generate_csv.createGenerateCsv)(logger);
  return {
    type: 'CSV from Saved Search',
    result: await generateCsv(generateCsvParams)
  };
}
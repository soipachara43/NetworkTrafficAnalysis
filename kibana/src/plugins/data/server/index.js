"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "Plugin", {
  enumerable: true,
  get: function () {
    return _plugin.DataServerPlugin;
  }
});
Object.defineProperty(exports, "PluginSetup", {
  enumerable: true,
  get: function () {
    return _plugin.DataPluginSetup;
  }
});
Object.defineProperty(exports, "PluginStart", {
  enumerable: true,
  get: function () {
    return _plugin.DataPluginStart;
  }
});
Object.defineProperty(exports, "EsQueryConfig", {
  enumerable: true,
  get: function () {
    return _common.EsQueryConfig;
  }
});
Object.defineProperty(exports, "KueryNode", {
  enumerable: true,
  get: function () {
    return _common.KueryNode;
  }
});
Object.defineProperty(exports, "IFieldFormatsRegistry", {
  enumerable: true,
  get: function () {
    return _common.IFieldFormatsRegistry;
  }
});
Object.defineProperty(exports, "FieldFormatsGetConfigFn", {
  enumerable: true,
  get: function () {
    return _common.FieldFormatsGetConfigFn;
  }
});
Object.defineProperty(exports, "FieldFormatConfig", {
  enumerable: true,
  get: function () {
    return _common.FieldFormatConfig;
  }
});
Object.defineProperty(exports, "IIndexPattern", {
  enumerable: true,
  get: function () {
    return _common.IIndexPattern;
  }
});
Object.defineProperty(exports, "IFieldType", {
  enumerable: true,
  get: function () {
    return _common.IFieldType;
  }
});
Object.defineProperty(exports, "IFieldSubType", {
  enumerable: true,
  get: function () {
    return _common.IFieldSubType;
  }
});
Object.defineProperty(exports, "ES_FIELD_TYPES", {
  enumerable: true,
  get: function () {
    return _common.ES_FIELD_TYPES;
  }
});
Object.defineProperty(exports, "KBN_FIELD_TYPES", {
  enumerable: true,
  get: function () {
    return _common.KBN_FIELD_TYPES;
  }
});
Object.defineProperty(exports, "IndexPatternAttributes", {
  enumerable: true,
  get: function () {
    return _common.IndexPatternAttributes;
  }
});
Object.defineProperty(exports, "ParsedInterval", {
  enumerable: true,
  get: function () {
    return _common.ParsedInterval;
  }
});
Object.defineProperty(exports, "castEsToKbnFieldTypeName", {
  enumerable: true,
  get: function () {
    return _common.castEsToKbnFieldTypeName;
  }
});
Object.defineProperty(exports, "Filter", {
  enumerable: true,
  get: function () {
    return _common.Filter;
  }
});
Object.defineProperty(exports, "Query", {
  enumerable: true,
  get: function () {
    return _common.Query;
  }
});
Object.defineProperty(exports, "RefreshInterval", {
  enumerable: true,
  get: function () {
    return _common.RefreshInterval;
  }
});
Object.defineProperty(exports, "TimeRange", {
  enumerable: true,
  get: function () {
    return _common.TimeRange;
  }
});
Object.defineProperty(exports, "parseInterval", {
  enumerable: true,
  get: function () {
    return _common.parseInterval;
  }
});
Object.defineProperty(exports, "IndexPatternsFetcher", {
  enumerable: true,
  get: function () {
    return _index_patterns.IndexPatternsFetcher;
  }
});
Object.defineProperty(exports, "IndexPatternFieldDescriptor", {
  enumerable: true,
  get: function () {
    return _index_patterns.FieldDescriptor;
  }
});
Object.defineProperty(exports, "shouldReadFieldFromDocValues", {
  enumerable: true,
  get: function () {
    return _index_patterns.shouldReadFieldFromDocValues;
  }
});
Object.defineProperty(exports, "ISearch", {
  enumerable: true,
  get: function () {
    return _search.ISearch;
  }
});
Object.defineProperty(exports, "ISearchCancel", {
  enumerable: true,
  get: function () {
    return _search.ISearchCancel;
  }
});
Object.defineProperty(exports, "ISearchOptions", {
  enumerable: true,
  get: function () {
    return _search.ISearchOptions;
  }
});
Object.defineProperty(exports, "IRequestTypesMap", {
  enumerable: true,
  get: function () {
    return _search.IRequestTypesMap;
  }
});
Object.defineProperty(exports, "IResponseTypesMap", {
  enumerable: true,
  get: function () {
    return _search.IResponseTypesMap;
  }
});
Object.defineProperty(exports, "ISearchContext", {
  enumerable: true,
  get: function () {
    return _search.ISearchContext;
  }
});
Object.defineProperty(exports, "TSearchStrategyProvider", {
  enumerable: true,
  get: function () {
    return _search.TSearchStrategyProvider;
  }
});
Object.defineProperty(exports, "getDefaultSearchParams", {
  enumerable: true,
  get: function () {
    return _search.getDefaultSearchParams;
  }
});
Object.defineProperty(exports, "getTotalLoaded", {
  enumerable: true,
  get: function () {
    return _search.getTotalLoaded;
  }
});
exports.search = exports.indexPatterns = exports.fieldFormats = exports.esQuery = exports.esKuery = exports.esFilters = void 0;

var _plugin = require("./plugin");

var _common = require("../common");

var _field_formats = require("../common/field_formats");

var _index_patterns = require("./index_patterns");

var _search = require("./search");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * Filter helper namespace:
 */
const esFilters = {
  buildQueryFilter: _common.buildQueryFilter,
  buildCustomFilter: _common.buildCustomFilter,
  buildEmptyFilter: _common.buildEmptyFilter,
  buildExistsFilter: _common.buildExistsFilter,
  buildFilter: _common.buildFilter,
  buildPhraseFilter: _common.buildPhraseFilter,
  buildPhrasesFilter: _common.buildPhrasesFilter,
  buildRangeFilter: _common.buildRangeFilter,
  isFilterDisabled: _common.isFilterDisabled
};
/*
 * esQuery and esKuery:
 */

exports.esFilters = esFilters;
const esKuery = {
  nodeTypes: _common.nodeTypes,
  fromKueryExpression: _common.fromKueryExpression,
  toElasticsearchQuery: _common.toElasticsearchQuery
};
exports.esKuery = esKuery;
const esQuery = {
  buildQueryFromFilters: _common.buildQueryFromFilters,
  getEsQueryConfig: _common.getEsQueryConfig,
  buildEsQuery: _common.buildEsQuery
};
exports.esQuery = esQuery;
const fieldFormats = {
  FieldFormatsRegistry: _field_formats.FieldFormatsRegistry,
  FieldFormat: _field_formats.FieldFormat,
  serializeFieldFormat: _field_formats.serializeFieldFormat,
  BoolFormat: _field_formats.BoolFormat,
  BytesFormat: _field_formats.BytesFormat,
  ColorFormat: _field_formats.ColorFormat,
  DateNanosFormat: _field_formats.DateNanosFormat,
  DurationFormat: _field_formats.DurationFormat,
  IpFormat: _field_formats.IpFormat,
  NumberFormat: _field_formats.NumberFormat,
  PercentFormat: _field_formats.PercentFormat,
  RelativeDateFormat: _field_formats.RelativeDateFormat,
  SourceFormat: _field_formats.SourceFormat,
  StaticLookupFormat: _field_formats.StaticLookupFormat,
  UrlFormat: _field_formats.UrlFormat,
  StringFormat: _field_formats.StringFormat,
  TruncateFormat: _field_formats.TruncateFormat
};
exports.fieldFormats = fieldFormats;
const indexPatterns = {
  isFilterable: _common.isFilterable,
  isNestedField: _common.isNestedField
};
exports.indexPatterns = indexPatterns;
// Search namespace
const search = {
  aggs: {
    dateHistogramInterval: _common.dateHistogramInterval,
    InvalidEsCalendarIntervalError: _common.InvalidEsCalendarIntervalError,
    InvalidEsIntervalFormatError: _common.InvalidEsIntervalFormatError,
    isValidEsInterval: _common.isValidEsInterval,
    isValidInterval: _common.isValidInterval,
    parseEsInterval: _common.parseEsInterval,
    parseInterval: _common.parseInterval,
    toAbsoluteDates: _common.toAbsoluteDates
  }
};
/**
 * Types to be shared externally
 * @public
 */

exports.search = search;

/**
 * Static code to be shared externally
 * @public
 */
function plugin(initializerContext) {
  return new _plugin.DataServerPlugin(initializerContext);
}
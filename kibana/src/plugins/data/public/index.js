"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "RangeFilter", {
  enumerable: true,
  get: function get() {
    return _common.RangeFilter;
  }
});
Object.defineProperty(exports, "RangeFilterMeta", {
  enumerable: true,
  get: function get() {
    return _common.RangeFilterMeta;
  }
});
Object.defineProperty(exports, "RangeFilterParams", {
  enumerable: true,
  get: function get() {
    return _common.RangeFilterParams;
  }
});
Object.defineProperty(exports, "ExistsFilter", {
  enumerable: true,
  get: function get() {
    return _common.ExistsFilter;
  }
});
Object.defineProperty(exports, "PhrasesFilter", {
  enumerable: true,
  get: function get() {
    return _common.PhrasesFilter;
  }
});
Object.defineProperty(exports, "PhraseFilter", {
  enumerable: true,
  get: function get() {
    return _common.PhraseFilter;
  }
});
Object.defineProperty(exports, "CustomFilter", {
  enumerable: true,
  get: function get() {
    return _common.CustomFilter;
  }
});
Object.defineProperty(exports, "MatchAllFilter", {
  enumerable: true,
  get: function get() {
    return _common.MatchAllFilter;
  }
});
Object.defineProperty(exports, "EsQueryConfig", {
  enumerable: true,
  get: function get() {
    return _common.EsQueryConfig;
  }
});
Object.defineProperty(exports, "KueryNode", {
  enumerable: true,
  get: function get() {
    return _common.KueryNode;
  }
});
Object.defineProperty(exports, "IFieldFormat", {
  enumerable: true,
  get: function get() {
    return _common.IFieldFormat;
  }
});
Object.defineProperty(exports, "IFieldFormatsRegistry", {
  enumerable: true,
  get: function get() {
    return _common.IFieldFormatsRegistry;
  }
});
Object.defineProperty(exports, "FieldFormatsContentType", {
  enumerable: true,
  get: function get() {
    return _common.FieldFormatsContentType;
  }
});
Object.defineProperty(exports, "FieldFormatsGetConfigFn", {
  enumerable: true,
  get: function get() {
    return _common.FieldFormatsGetConfigFn;
  }
});
Object.defineProperty(exports, "FieldFormatConfig", {
  enumerable: true,
  get: function get() {
    return _common.FieldFormatConfig;
  }
});
Object.defineProperty(exports, "FieldFormatId", {
  enumerable: true,
  get: function get() {
    return _common.FieldFormatId;
  }
});
Object.defineProperty(exports, "IIndexPattern", {
  enumerable: true,
  get: function get() {
    return _common.IIndexPattern;
  }
});
Object.defineProperty(exports, "IFieldType", {
  enumerable: true,
  get: function get() {
    return _common.IFieldType;
  }
});
Object.defineProperty(exports, "IFieldSubType", {
  enumerable: true,
  get: function get() {
    return _common.IFieldSubType;
  }
});
Object.defineProperty(exports, "ES_FIELD_TYPES", {
  enumerable: true,
  get: function get() {
    return _common.ES_FIELD_TYPES;
  }
});
Object.defineProperty(exports, "KBN_FIELD_TYPES", {
  enumerable: true,
  get: function get() {
    return _common.KBN_FIELD_TYPES;
  }
});
Object.defineProperty(exports, "IndexPatternAttributes", {
  enumerable: true,
  get: function get() {
    return _common.IndexPatternAttributes;
  }
});
Object.defineProperty(exports, "ParsedInterval", {
  enumerable: true,
  get: function get() {
    return _common.ParsedInterval;
  }
});
Object.defineProperty(exports, "Filter", {
  enumerable: true,
  get: function get() {
    return _common.Filter;
  }
});
Object.defineProperty(exports, "Query", {
  enumerable: true,
  get: function get() {
    return _common.Query;
  }
});
Object.defineProperty(exports, "RefreshInterval", {
  enumerable: true,
  get: function get() {
    return _common.RefreshInterval;
  }
});
Object.defineProperty(exports, "TimeRange", {
  enumerable: true,
  get: function get() {
    return _common.TimeRange;
  }
});
Object.defineProperty(exports, "castEsToKbnFieldTypeName", {
  enumerable: true,
  get: function get() {
    return _common.castEsToKbnFieldTypeName;
  }
});
Object.defineProperty(exports, "getKbnTypeNames", {
  enumerable: true,
  get: function get() {
    return _common.getKbnTypeNames;
  }
});
Object.defineProperty(exports, "createSavedQueryService", {
  enumerable: true,
  get: function get() {
    return _query.createSavedQueryService;
  }
});
Object.defineProperty(exports, "connectToQueryState", {
  enumerable: true,
  get: function get() {
    return _query.connectToQueryState;
  }
});
Object.defineProperty(exports, "syncQueryStateWithUrl", {
  enumerable: true,
  get: function get() {
    return _query.syncQueryStateWithUrl;
  }
});
Object.defineProperty(exports, "QueryState", {
  enumerable: true,
  get: function get() {
    return _query.QueryState;
  }
});
Object.defineProperty(exports, "getTime", {
  enumerable: true,
  get: function get() {
    return _query.getTime;
  }
});
Object.defineProperty(exports, "getQueryLog", {
  enumerable: true,
  get: function get() {
    return _query.getQueryLog;
  }
});
Object.defineProperty(exports, "getDefaultQuery", {
  enumerable: true,
  get: function get() {
    return _query.getDefaultQuery;
  }
});
Object.defineProperty(exports, "FilterManager", {
  enumerable: true,
  get: function get() {
    return _query.FilterManager;
  }
});
Object.defineProperty(exports, "SavedQuery", {
  enumerable: true,
  get: function get() {
    return _query.SavedQuery;
  }
});
Object.defineProperty(exports, "SavedQueryService", {
  enumerable: true,
  get: function get() {
    return _query.SavedQueryService;
  }
});
Object.defineProperty(exports, "SavedQueryTimeFilter", {
  enumerable: true,
  get: function get() {
    return _query.SavedQueryTimeFilter;
  }
});
Object.defineProperty(exports, "InputTimeRange", {
  enumerable: true,
  get: function get() {
    return _query.InputTimeRange;
  }
});
Object.defineProperty(exports, "TimeHistory", {
  enumerable: true,
  get: function get() {
    return _query.TimeHistory;
  }
});
Object.defineProperty(exports, "TimefilterContract", {
  enumerable: true,
  get: function get() {
    return _query.TimefilterContract;
  }
});
Object.defineProperty(exports, "TimeHistoryContract", {
  enumerable: true,
  get: function get() {
    return _query.TimeHistoryContract;
  }
});
Object.defineProperty(exports, "baseFormattersPublic", {
  enumerable: true,
  get: function get() {
    return _field_formats2.baseFormattersPublic;
  }
});
Object.defineProperty(exports, "IndexPatternsContract", {
  enumerable: true,
  get: function get() {
    return _index_patterns.IndexPatternsContract;
  }
});
Object.defineProperty(exports, "IndexPattern", {
  enumerable: true,
  get: function get() {
    return _index_patterns.IndexPattern;
  }
});
Object.defineProperty(exports, "IndexPatternField", {
  enumerable: true,
  get: function get() {
    return _index_patterns.Field;
  }
});
Object.defineProperty(exports, "IndexPatternTypeMeta", {
  enumerable: true,
  get: function get() {
    return _index_patterns.TypeMeta;
  }
});
Object.defineProperty(exports, "IndexPatternAggRestrictions", {
  enumerable: true,
  get: function get() {
    return _index_patterns.AggregationRestrictions;
  }
});
Object.defineProperty(exports, "IndexPatternFieldList", {
  enumerable: true,
  get: function get() {
    return _index_patterns.FieldList;
  }
});
Object.defineProperty(exports, "QuerySuggestion", {
  enumerable: true,
  get: function get() {
    return _autocomplete.QuerySuggestion;
  }
});
Object.defineProperty(exports, "QuerySuggestionTypes", {
  enumerable: true,
  get: function get() {
    return _autocomplete.QuerySuggestionTypes;
  }
});
Object.defineProperty(exports, "QuerySuggestionGetFn", {
  enumerable: true,
  get: function get() {
    return _autocomplete.QuerySuggestionGetFn;
  }
});
Object.defineProperty(exports, "QuerySuggestionGetFnArgs", {
  enumerable: true,
  get: function get() {
    return _autocomplete.QuerySuggestionGetFnArgs;
  }
});
Object.defineProperty(exports, "QuerySuggestionBasic", {
  enumerable: true,
  get: function get() {
    return _autocomplete.QuerySuggestionBasic;
  }
});
Object.defineProperty(exports, "QuerySuggestionField", {
  enumerable: true,
  get: function get() {
    return _autocomplete.QuerySuggestionField;
  }
});
Object.defineProperty(exports, "AggGroupNames", {
  enumerable: true,
  get: function get() {
    return _search.AggGroupNames;
  }
});
Object.defineProperty(exports, "AggParam", {
  enumerable: true,
  get: function get() {
    return _search.AggParam;
  }
});
Object.defineProperty(exports, "AggParamOption", {
  enumerable: true,
  get: function get() {
    return _search.AggParamOption;
  }
});
Object.defineProperty(exports, "AggParamType", {
  enumerable: true,
  get: function get() {
    return _search.AggParamType;
  }
});
Object.defineProperty(exports, "AggTypeFieldFilters", {
  enumerable: true,
  get: function get() {
    return _search.AggTypeFieldFilters;
  }
});
Object.defineProperty(exports, "AggTypeFilters", {
  enumerable: true,
  get: function get() {
    return _search.AggTypeFilters;
  }
});
Object.defineProperty(exports, "AggConfigOptions", {
  enumerable: true,
  get: function get() {
    return _search.AggConfigOptions;
  }
});
Object.defineProperty(exports, "BUCKET_TYPES", {
  enumerable: true,
  get: function get() {
    return _search.BUCKET_TYPES;
  }
});
Object.defineProperty(exports, "DateRangeKey", {
  enumerable: true,
  get: function get() {
    return _search.DateRangeKey;
  }
});
Object.defineProperty(exports, "IAggConfig", {
  enumerable: true,
  get: function get() {
    return _search.IAggConfig;
  }
});
Object.defineProperty(exports, "IAggConfigs", {
  enumerable: true,
  get: function get() {
    return _search.IAggConfigs;
  }
});
Object.defineProperty(exports, "IAggGroupNames", {
  enumerable: true,
  get: function get() {
    return _search.IAggGroupNames;
  }
});
Object.defineProperty(exports, "IAggType", {
  enumerable: true,
  get: function get() {
    return _search.IAggType;
  }
});
Object.defineProperty(exports, "IFieldParamType", {
  enumerable: true,
  get: function get() {
    return _search.IFieldParamType;
  }
});
Object.defineProperty(exports, "IMetricAggType", {
  enumerable: true,
  get: function get() {
    return _search.IMetricAggType;
  }
});
Object.defineProperty(exports, "IpRangeKey", {
  enumerable: true,
  get: function get() {
    return _search.IpRangeKey;
  }
});
Object.defineProperty(exports, "METRIC_TYPES", {
  enumerable: true,
  get: function get() {
    return _search.METRIC_TYPES;
  }
});
Object.defineProperty(exports, "OptionedParamEditorProps", {
  enumerable: true,
  get: function get() {
    return _search.OptionedParamEditorProps;
  }
});
Object.defineProperty(exports, "OptionedParamType", {
  enumerable: true,
  get: function get() {
    return _search.OptionedParamType;
  }
});
Object.defineProperty(exports, "OptionedValueProp", {
  enumerable: true,
  get: function get() {
    return _search.OptionedValueProp;
  }
});
Object.defineProperty(exports, "ES_SEARCH_STRATEGY", {
  enumerable: true,
  get: function get() {
    return _search.ES_SEARCH_STRATEGY;
  }
});
Object.defineProperty(exports, "SYNC_SEARCH_STRATEGY", {
  enumerable: true,
  get: function get() {
    return _search.SYNC_SEARCH_STRATEGY;
  }
});
Object.defineProperty(exports, "getEsPreference", {
  enumerable: true,
  get: function get() {
    return _search.getEsPreference;
  }
});
Object.defineProperty(exports, "getSearchErrorType", {
  enumerable: true,
  get: function get() {
    return _search.getSearchErrorType;
  }
});
Object.defineProperty(exports, "ISearchContext", {
  enumerable: true,
  get: function get() {
    return _search.ISearchContext;
  }
});
Object.defineProperty(exports, "TSearchStrategyProvider", {
  enumerable: true,
  get: function get() {
    return _search.TSearchStrategyProvider;
  }
});
Object.defineProperty(exports, "ISearchStrategy", {
  enumerable: true,
  get: function get() {
    return _search.ISearchStrategy;
  }
});
Object.defineProperty(exports, "ISearch", {
  enumerable: true,
  get: function get() {
    return _search.ISearch;
  }
});
Object.defineProperty(exports, "ISearchOptions", {
  enumerable: true,
  get: function get() {
    return _search.ISearchOptions;
  }
});
Object.defineProperty(exports, "IRequestTypesMap", {
  enumerable: true,
  get: function get() {
    return _search.IRequestTypesMap;
  }
});
Object.defineProperty(exports, "IResponseTypesMap", {
  enumerable: true,
  get: function get() {
    return _search.IResponseTypesMap;
  }
});
Object.defineProperty(exports, "ISearchGeneric", {
  enumerable: true,
  get: function get() {
    return _search.ISearchGeneric;
  }
});
Object.defineProperty(exports, "IEsSearchResponse", {
  enumerable: true,
  get: function get() {
    return _search.IEsSearchResponse;
  }
});
Object.defineProperty(exports, "IEsSearchRequest", {
  enumerable: true,
  get: function get() {
    return _search.IEsSearchRequest;
  }
});
Object.defineProperty(exports, "ISyncSearchRequest", {
  enumerable: true,
  get: function get() {
    return _search.ISyncSearchRequest;
  }
});
Object.defineProperty(exports, "IKibanaSearchResponse", {
  enumerable: true,
  get: function get() {
    return _search.IKibanaSearchResponse;
  }
});
Object.defineProperty(exports, "IKibanaSearchRequest", {
  enumerable: true,
  get: function get() {
    return _search.IKibanaSearchRequest;
  }
});
Object.defineProperty(exports, "SearchRequest", {
  enumerable: true,
  get: function get() {
    return _search.SearchRequest;
  }
});
Object.defineProperty(exports, "SearchResponse", {
  enumerable: true,
  get: function get() {
    return _search.SearchResponse;
  }
});
Object.defineProperty(exports, "SearchError", {
  enumerable: true,
  get: function get() {
    return _search.SearchError;
  }
});
Object.defineProperty(exports, "SearchStrategyProvider", {
  enumerable: true,
  get: function get() {
    return _search.SearchStrategyProvider;
  }
});
Object.defineProperty(exports, "ISearchSource", {
  enumerable: true,
  get: function get() {
    return _search.ISearchSource;
  }
});
Object.defineProperty(exports, "SearchSource", {
  enumerable: true,
  get: function get() {
    return _search.SearchSource;
  }
});
Object.defineProperty(exports, "SearchSourceFields", {
  enumerable: true,
  get: function get() {
    return _search.SearchSourceFields;
  }
});
Object.defineProperty(exports, "EsQuerySortValue", {
  enumerable: true,
  get: function get() {
    return _search.EsQuerySortValue;
  }
});
Object.defineProperty(exports, "SortDirection", {
  enumerable: true,
  get: function get() {
    return _search.SortDirection;
  }
});
Object.defineProperty(exports, "FetchOptions", {
  enumerable: true,
  get: function get() {
    return _search.FetchOptions;
  }
});
Object.defineProperty(exports, "TabbedAggColumn", {
  enumerable: true,
  get: function get() {
    return _search.TabbedAggColumn;
  }
});
Object.defineProperty(exports, "TabbedAggRow", {
  enumerable: true,
  get: function get() {
    return _search.TabbedAggRow;
  }
});
Object.defineProperty(exports, "TabbedTable", {
  enumerable: true,
  get: function get() {
    return _search.TabbedTable;
  }
});
Object.defineProperty(exports, "SearchInterceptor", {
  enumerable: true,
  get: function get() {
    return _search.SearchInterceptor;
  }
});
Object.defineProperty(exports, "RequestTimeoutError", {
  enumerable: true,
  get: function get() {
    return _search.RequestTimeoutError;
  }
});
Object.defineProperty(exports, "SearchBar", {
  enumerable: true,
  get: function get() {
    return _ui.SearchBar;
  }
});
Object.defineProperty(exports, "SearchBarProps", {
  enumerable: true,
  get: function get() {
    return _ui.SearchBarProps;
  }
});
Object.defineProperty(exports, "StatefulSearchBarProps", {
  enumerable: true,
  get: function get() {
    return _ui.StatefulSearchBarProps;
  }
});
Object.defineProperty(exports, "FilterBar", {
  enumerable: true,
  get: function get() {
    return _ui.FilterBar;
  }
});
Object.defineProperty(exports, "QueryStringInput", {
  enumerable: true,
  get: function get() {
    return _ui.QueryStringInput;
  }
});
Object.defineProperty(exports, "IndexPatternSelect", {
  enumerable: true,
  get: function get() {
    return _ui.IndexPatternSelect;
  }
});
Object.defineProperty(exports, "Plugin", {
  enumerable: true,
  get: function get() {
    return _plugin.DataPublicPlugin;
  }
});
Object.defineProperty(exports, "DataPublicPluginSetup", {
  enumerable: true,
  get: function get() {
    return _types.DataPublicPluginSetup;
  }
});
Object.defineProperty(exports, "DataPublicPluginStart", {
  enumerable: true,
  get: function get() {
    return _types.DataPublicPluginStart;
  }
});
Object.defineProperty(exports, "IDataPluginServices", {
  enumerable: true,
  get: function get() {
    return _types.IDataPluginServices;
  }
});
exports.search = exports.indexPatterns = exports.fieldFormats = exports.esQuery = exports.esKuery = exports.esFilters = void 0;

require("./index.scss");

var _common = require("../common");

var _filter_bar = require("./ui/filter_bar");

var _query = require("./query");

var _field_formats = require("../common/field_formats");

var _field_formats2 = require("./field_formats");

var _index_patterns = require("./index_patterns");

var _autocomplete = require("./autocomplete");

var _search = require("./search");

var _ui = require("./ui");

var _plugin = require("./plugin");

var _types = require("./types");

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
 * Filters:
 */
// Filter helpers namespace:
var esFilters = {
  FilterLabel: _filter_bar.FilterLabel,
  FILTERS: _common.FILTERS,
  FilterStateStore: _common.FilterStateStore,
  buildEmptyFilter: _common.buildEmptyFilter,
  buildPhrasesFilter: _common.buildPhrasesFilter,
  buildExistsFilter: _common.buildExistsFilter,
  buildPhraseFilter: _common.buildPhraseFilter,
  buildQueryFilter: _common.buildQueryFilter,
  buildRangeFilter: _common.buildRangeFilter,
  isPhraseFilter: _common.isPhraseFilter,
  isExistsFilter: _common.isExistsFilter,
  isPhrasesFilter: _common.isPhrasesFilter,
  isRangeFilter: _common.isRangeFilter,
  isMatchAllFilter: _common.isMatchAllFilter,
  isMissingFilter: _common.isMissingFilter,
  isQueryStringFilter: _common.isQueryStringFilter,
  isFilterPinned: _common.isFilterPinned,
  toggleFilterNegated: _common.toggleFilterNegated,
  disableFilter: _common.disableFilter,
  getPhraseFilterField: _common.getPhraseFilterField,
  getPhraseFilterValue: _common.getPhraseFilterValue,
  getDisplayValueFromFilter: _common.getDisplayValueFromFilter,
  compareFilters: _common.compareFilters,
  COMPARE_ALL_OPTIONS: _common.COMPARE_ALL_OPTIONS,
  generateFilters: _query.generateFilters,
  onlyDisabledFiltersChanged: _query.onlyDisabledFiltersChanged,
  changeTimeFilter: _query.changeTimeFilter,
  mapAndFlattenFilters: _query.mapAndFlattenFilters,
  extractTimeFilter: _query.extractTimeFilter
};
exports.esFilters = esFilters;
var esKuery = {
  nodeTypes: _common.nodeTypes,
  fromKueryExpression: _common.fromKueryExpression,
  toElasticsearchQuery: _common.toElasticsearchQuery
};
exports.esKuery = esKuery;
var esQuery = {
  buildEsQuery: _common.buildEsQuery,
  getEsQueryConfig: _common.getEsQueryConfig,
  buildQueryFromFilters: _common.buildQueryFromFilters,
  luceneStringToDsl: _common.luceneStringToDsl,
  decorateQuery: _common.decorateQuery
};
exports.esQuery = esQuery;
// Field formats helpers namespace:
var fieldFormats = {
  FieldFormat: _field_formats.FieldFormat,
  FieldFormatsRegistry: _field_formats.FieldFormatsRegistry,
  // exported only for tests. Consider mock.
  serialize: _field_formats.serializeFieldFormat,
  DEFAULT_CONVERTER_COLOR: _field_formats.DEFAULT_CONVERTER_COLOR,
  HTML_CONTEXT_TYPE: _field_formats.HTML_CONTEXT_TYPE,
  TEXT_CONTEXT_TYPE: _field_formats.TEXT_CONTEXT_TYPE,
  FIELD_FORMAT_IDS: _field_formats.FIELD_FORMAT_IDS,
  BoolFormat: _field_formats.BoolFormat,
  BytesFormat: _field_formats.BytesFormat,
  ColorFormat: _field_formats.ColorFormat,
  DateFormat: _field_formats2.DateFormat,
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
// Index patterns namespace:
var indexPatterns = {
  ILLEGAL_CHARACTERS_KEY: _index_patterns.ILLEGAL_CHARACTERS_KEY,
  CONTAINS_SPACES_KEY: _index_patterns.CONTAINS_SPACES_KEY,
  ILLEGAL_CHARACTERS_VISIBLE: _index_patterns.ILLEGAL_CHARACTERS_VISIBLE,
  ILLEGAL_CHARACTERS: _index_patterns.ILLEGAL_CHARACTERS,
  isDefault: _index_patterns.isDefault,
  isFilterable: _common.isFilterable,
  isNestedField: _common.isNestedField,
  validate: _index_patterns.validateIndexPattern,
  getFromSavedObject: _index_patterns.getFromSavedObject,
  flattenHitWrapper: _index_patterns.flattenHitWrapper,
  // TODO: exported only in stub_index_pattern test. Move into data plugin and remove export.
  getRoutes: _index_patterns.getRoutes,
  formatHitProvider: _index_patterns.formatHitProvider
};
exports.indexPatterns = indexPatterns;
// Search namespace
var search = {
  aggs: {
    AggConfigs: _search.AggConfigs,
    aggGroupNamesMap: _search.aggGroupNamesMap,
    aggTypeFilters: _search.aggTypeFilters,
    CidrMask: _search.CidrMask,
    convertDateRangeToString: _search.convertDateRangeToString,
    convertIPRangeToString: _search.convertIPRangeToString,
    dateHistogramInterval: _common.dateHistogramInterval,
    intervalOptions: _search.intervalOptions,
    // only used in Discover
    InvalidEsCalendarIntervalError: _common.InvalidEsCalendarIntervalError,
    InvalidEsIntervalFormatError: _common.InvalidEsIntervalFormatError,
    isDateHistogramBucketAggConfig: _search.isDateHistogramBucketAggConfig,
    isStringType: _search.isStringType,
    isType: _search.isType,
    isValidEsInterval: _common.isValidEsInterval,
    isValidInterval: _common.isValidInterval,
    parentPipelineType: _search.parentPipelineType,
    parseEsInterval: _common.parseEsInterval,
    parseInterval: _common.parseInterval,
    propFilter: _search.propFilter,
    siblingPipelineType: _search.siblingPipelineType,
    termsAggFilter: _search.termsAggFilter,
    toAbsoluteDates: _common.toAbsoluteDates
  },
  getRequestInspectorStats: _search.getRequestInspectorStats,
  getResponseInspectorStats: _search.getResponseInspectorStats,
  tabifyAggResponse: _search.tabifyAggResponse,
  tabifyGetColumns: _search.tabifyGetColumns
};
/*
 * UI components
 */

exports.search = search;

function plugin(initializerContext) {
  return new _plugin.DataPublicPlugin(initializerContext);
}
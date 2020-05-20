"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggParamsMap = void 0;

var controls = _interopRequireWildcard(require("./controls"));

var _public = require("../../../../../plugins/data/public");

var _utils = require("./controls/utils");

var _buckets, _metrics, _aggParamsMap;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _search$aggs = _public.search.aggs,
    siblingPipelineType = _search$aggs.siblingPipelineType,
    parentPipelineType = _search$aggs.parentPipelineType;
var buckets = (_buckets = {}, _defineProperty(_buckets, _public.BUCKET_TYPES.DATE_HISTOGRAM, {
  scaleMetricValues: controls.ScaleMetricsParamEditor,
  interval: controls.TimeIntervalParamEditor,
  drop_partials: controls.DropPartialsParamEditor
}), _defineProperty(_buckets, _public.BUCKET_TYPES.DATE_RANGE, {
  ranges: controls.DateRangesParamEditor
}), _defineProperty(_buckets, _public.BUCKET_TYPES.FILTERS, {
  filters: controls.FiltersParamEditor
}), _defineProperty(_buckets, _public.BUCKET_TYPES.GEOHASH_GRID, {
  autoPrecision: controls.AutoPrecisionParamEditor,
  precision: controls.PrecisionParamEditor,
  useGeocentroid: controls.UseGeocentroidParamEditor,
  isFilteredByCollar: controls.IsFilteredByCollarParamEditor
}), _defineProperty(_buckets, _public.BUCKET_TYPES.HISTOGRAM, {
  interval: controls.NumberIntervalParamEditor,
  min_doc_count: controls.MinDocCountParamEditor,
  has_extended_bounds: controls.HasExtendedBoundsParamEditor,
  extended_bounds: controls.ExtendedBoundsParamEditor
}), _defineProperty(_buckets, _public.BUCKET_TYPES.IP_RANGE, {
  ipRangeType: controls.IpRangeTypeParamEditor,
  ranges: controls.IpRangesParamEditor
}), _defineProperty(_buckets, _public.BUCKET_TYPES.RANGE, {
  ranges: controls.RangesControl
}), _defineProperty(_buckets, _public.BUCKET_TYPES.SIGNIFICANT_TERMS, {
  size: controls.SizeParamEditor
}), _defineProperty(_buckets, _public.BUCKET_TYPES.TERMS, {
  orderBy: controls.OrderByParamEditor,
  orderAgg: controls.OrderAggParamEditor,
  order: (0, _utils.wrapWithInlineComp)(controls.OrderParamEditor),
  size: (0, _utils.wrapWithInlineComp)(controls.SizeParamEditor),
  otherBucket: controls.OtherBucketParamEditor,
  missingBucket: controls.MissingBucketParamEditor
}), _buckets);
var metrics = (_metrics = {}, _defineProperty(_metrics, _public.METRIC_TYPES.TOP_HITS, {
  field: controls.TopFieldParamEditor,
  aggregate: (0, _utils.wrapWithInlineComp)(controls.TopAggregateParamEditor),
  size: (0, _utils.wrapWithInlineComp)(controls.TopSizeParamEditor),
  sortField: controls.TopSortFieldParamEditor,
  sortOrder: controls.OrderParamEditor
}), _defineProperty(_metrics, _public.METRIC_TYPES.PERCENTILES, {
  percents: controls.PercentilesEditor
}), _defineProperty(_metrics, _public.METRIC_TYPES.PERCENTILE_RANKS, {
  values: controls.PercentileRanksEditor
}), _metrics);
var aggParamsMap = (_aggParamsMap = {
  common: {
    string: controls.StringParamEditor,
    json: controls.RawJsonParamEditor,
    field: controls.FieldParamEditor
  }
}, _defineProperty(_aggParamsMap, siblingPipelineType, {
  customBucket: controls.SubMetricParamEditor,
  customMetric: controls.SubMetricParamEditor
}), _defineProperty(_aggParamsMap, parentPipelineType, {
  metricAgg: controls.MetricAggParamEditor,
  customMetric: controls.SubAggParamEditor
}), _defineProperty(_aggParamsMap, _public.AggGroupNames.Buckets, buckets), _defineProperty(_aggParamsMap, _public.AggGroupNames.Metrics, metrics), _aggParamsMap);
exports.aggParamsMap = aggParamsMap;
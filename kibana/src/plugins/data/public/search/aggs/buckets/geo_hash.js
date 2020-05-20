"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoHashBucketAgg = void 0;

var _i18n = require("@kbn/i18n");

var _bucket_agg_type = require("./_bucket_agg_type");

var _common = require("../../../../common");

var _bucket_agg_types = require("./bucket_agg_types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultBoundingBox = {
  top_left: {
    lat: 1,
    lon: 1
  },
  bottom_right: {
    lat: 0,
    lon: 0
  }
};
var defaultPrecision = 2;

var geohashGridTitle = _i18n.i18n.translate('data.search.aggs.buckets.geohashGridTitle', {
  defaultMessage: 'Geohash'
});

var geoHashBucketAgg = new _bucket_agg_type.BucketAggType({
  name: _bucket_agg_types.BUCKET_TYPES.GEOHASH_GRID,
  title: geohashGridTitle,
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: _common.KBN_FIELD_TYPES.GEO_POINT
  }, {
    name: 'autoPrecision',
    default: true,
    write: function write() {}
  }, {
    name: 'precision',
    default: defaultPrecision,
    write: function write(aggConfig, output) {
      output.params.precision = aggConfig.params.precision;
    }
  }, {
    name: 'useGeocentroid',
    default: true,
    write: function write() {}
  }, {
    name: 'isFilteredByCollar',
    default: true,
    write: function write() {}
  }, {
    name: 'boundingBox',
    default: null,
    write: function write() {}
  }],
  getRequestAggs: function getRequestAggs(agg) {
    var aggs = [];
    var params = agg.params;

    if (params.isFilteredByCollar && agg.getField()) {
      aggs.push(agg.aggConfigs.createAggConfig({
        type: 'filter',
        id: 'filter_agg',
        enabled: true,
        params: {
          geo_bounding_box: _defineProperty({
            ignore_unmapped: true
          }, agg.getField().name, params.boundingBox || defaultBoundingBox)
        }
      }, {
        addToAggConfigs: false
      }));
    }

    aggs.push(agg);

    if (params.useGeocentroid) {
      aggs.push(agg.aggConfigs.createAggConfig({
        type: 'geo_centroid',
        enabled: true,
        params: {
          field: agg.getField()
        }
      }, {
        addToAggConfigs: false
      }));
    }

    return aggs;
  }
});
exports.geoHashBucketAgg = geoHashBucketAgg;
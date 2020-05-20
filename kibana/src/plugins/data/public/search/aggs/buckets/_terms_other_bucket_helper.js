"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMissingBucket = exports.mergeOtherBucketAggResponse = exports.buildOtherBucketAgg = void 0;

var _lodash = require("lodash");

var _common = require("../../../../common");

var _agg_groups = require("../agg_groups");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * walks the aggregation DSL and returns DSL starting at aggregation with id of startFromAggId
 * @param aggNestedDsl: aggregation config DSL (top level)
 * @param startFromId: id of an aggregation from where we want to get the nested DSL
 */
var getNestedAggDSL = function getNestedAggDSL(aggNestedDsl, startFromAggId) {
  if (aggNestedDsl[startFromAggId]) {
    return aggNestedDsl[startFromAggId];
  }

  var nestedAggs = (0, _lodash.values)(aggNestedDsl);
  var aggs;

  for (var i = 0; i < nestedAggs.length; i++) {
    if (nestedAggs[i].aggs && (aggs = getNestedAggDSL(nestedAggs[i].aggs, startFromAggId))) {
      return aggs;
    }
  }
};
/**
 * returns buckets from response for a specific other bucket
 * @param aggConfigs: configuration for the aggregations
 * @param response: response from elasticsearch
 * @param aggWithOtherBucket: AggConfig of the aggregation with other bucket enabled
 * @param key: key from the other bucket request for a specific other bucket
 */


var getAggResultBuckets = function getAggResultBuckets(aggConfigs, response, aggWithOtherBucket, key) {
  var keyParts = key.split('-');
  var responseAgg = response;

  var _loop = function _loop(i) {
    if (keyParts[i]) {
      var responseAggs = (0, _lodash.values)(responseAgg); // If you have multi aggs, we cannot just assume the first one is the `other` bucket,
      // so we need to loop over each agg until we find it.

      var _loop2 = function _loop2(aggId) {
        var aggById = responseAggs[aggId];
        var aggKey = (0, _lodash.keys)(responseAgg)[aggId];
        var aggConfig = (0, _lodash.find)(aggConfigs.aggs, function (agg) {
          return agg.id === aggKey;
        });

        if (aggConfig) {
          var aggResultBucket = (0, _lodash.find)(aggById.buckets, function (bucket, bucketObjKey) {
            var bucketKey = aggConfig.getKey(bucket, (0, _lodash.isNumber)(bucketObjKey) ? undefined : bucketObjKey).toString();
            return bucketKey === keyParts[i];
          });

          if (aggResultBucket) {
            responseAgg = aggResultBucket;
            return "break";
          }
        }
      };

      for (var aggId = 0; aggId < responseAggs.length; aggId++) {
        var _ret = _loop2(aggId);

        if (_ret === "break") break;
      }
    }
  };

  for (var i in keyParts) {
    _loop(i);
  }

  if (responseAgg[aggWithOtherBucket.id]) {
    return responseAgg[aggWithOtherBucket.id].buckets;
  }

  return [];
};
/**
 * gets all the missing buckets in our response for a specific aggregation id
 * @param responseAggs: array of aggregations from response
 * @param aggId: id of the aggregation with missing bucket
 */


var getAggConfigResultMissingBuckets = function getAggConfigResultMissingBuckets(responseAggs, aggId) {
  var missingKey = '__missing__';
  var resultBuckets = [];

  if (responseAggs[aggId]) {
    var matchingBucket = responseAggs[aggId].buckets.find(function (bucket) {
      return bucket.key === missingKey;
    });
    if (matchingBucket) resultBuckets.push(matchingBucket);
    return resultBuckets;
  }

  (0, _lodash.each)(responseAggs, function (agg) {
    if (agg.buckets) {
      (0, _lodash.each)(agg.buckets, function (bucket) {
        resultBuckets = [].concat(_toConsumableArray(resultBuckets), _toConsumableArray(getAggConfigResultMissingBuckets(bucket, aggId)));
      });
    }
  });
  return resultBuckets;
};
/**
 * gets all the terms that are NOT in the other bucket
 * @param requestAgg: an aggregation we are looking at
 * @param key: the key for this specific other bucket
 * @param otherAgg: AggConfig of the aggregation with other bucket
 */


var getOtherAggTerms = function getOtherAggTerms(requestAgg, key, otherAgg) {
  return requestAgg['other-filter'].filters.filters[key].bool.must_not.filter(function (filter) {
    return filter.match_phrase && filter.match_phrase[otherAgg.params.field.name];
  }).map(function (filter) {
    return filter.match_phrase[otherAgg.params.field.name];
  });
};

var buildOtherBucketAgg = function buildOtherBucketAgg(aggConfigs, aggWithOtherBucket, response) {
  var bucketAggs = aggConfigs.aggs.filter(function (agg) {
    return agg.type.type === _agg_groups.AggGroupNames.Buckets;
  });
  var index = bucketAggs.findIndex(function (agg) {
    return agg.id === aggWithOtherBucket.id;
  });
  var aggs = aggConfigs.toDsl();
  var indexPattern = aggWithOtherBucket.params.field.indexPattern; // create filters aggregation

  var filterAgg = aggConfigs.createAggConfig({
    type: 'filters',
    id: 'other',
    params: {
      filters: []
    },
    enabled: false
  }, {
    addToAggConfigs: false
  }); // nest all the child aggregations of aggWithOtherBucket

  var resultAgg = {
    aggs: getNestedAggDSL(aggs, aggWithOtherBucket.id).aggs,
    filters: filterAgg.toDsl()
  };
  var noAggBucketResults = false; // recursively create filters for all parent aggregation buckets

  var walkBucketTree = function walkBucketTree(aggIndex, aggregations, aggId, filters, key) {
    // make sure there are actually results for the buckets
    if (aggregations[aggId].buckets.length < 1) {
      noAggBucketResults = true;
      return;
    }

    var agg = aggregations[aggId];
    var newAggIndex = aggIndex + 1;
    var newAgg = bucketAggs[newAggIndex];
    var currentAgg = bucketAggs[aggIndex];

    if (aggIndex < index) {
      (0, _lodash.each)(agg.buckets, function (bucket, bucketObjKey) {
        var bucketKey = currentAgg.getKey(bucket, (0, _lodash.isNumber)(bucketObjKey) ? undefined : bucketObjKey);
        var filter = (0, _lodash.cloneDeep)(bucket.filters) || currentAgg.createFilter(bucketKey);
        var newFilters = (0, _lodash.flatten)([].concat(_toConsumableArray(filters), [filter]));
        walkBucketTree(newAggIndex, bucket, newAgg.id, newFilters, "".concat(key, "-").concat(bucketKey.toString()));
      });
      return;
    }

    if (!aggWithOtherBucket.params.missingBucket || agg.buckets.some(function (bucket) {
      return bucket.key === '__missing__';
    })) {
      filters.push((0, _common.buildExistsFilter)(aggWithOtherBucket.params.field, aggWithOtherBucket.params.field.indexPattern));
    } // create not filters for all the buckets


    (0, _lodash.each)(agg.buckets, function (bucket) {
      if (bucket.key === '__missing__') return;
      var filter = currentAgg.createFilter(bucket.key);
      filter.meta.negate = true;
      filters.push(filter);
    });
    resultAgg.filters.filters[key] = {
      bool: (0, _common.buildQueryFromFilters)(filters, indexPattern)
    };
  };

  walkBucketTree(0, response.aggregations, bucketAggs[0].id, [], ''); // bail if there were no bucket results

  if (noAggBucketResults) {
    return false;
  }

  return function () {
    return {
      'other-filter': resultAgg
    };
  };
};

exports.buildOtherBucketAgg = buildOtherBucketAgg;

var mergeOtherBucketAggResponse = function mergeOtherBucketAggResponse(aggsConfig, response, otherResponse, otherAgg, requestAgg) {
  var updatedResponse = (0, _lodash.cloneDeep)(response);
  (0, _lodash.each)(otherResponse.aggregations['other-filter'].buckets, function (bucket, key) {
    if (!bucket.doc_count || key === undefined) return;
    var bucketKey = key.replace(/^-/, '');
    var aggResultBuckets = getAggResultBuckets(aggsConfig, updatedResponse.aggregations, otherAgg, bucketKey);
    var requestFilterTerms = getOtherAggTerms(requestAgg, key, otherAgg);
    var phraseFilter = (0, _common.buildPhrasesFilter)(otherAgg.params.field, requestFilterTerms, otherAgg.params.field.indexPattern);
    phraseFilter.meta.negate = true;
    bucket.filters = [phraseFilter];
    bucket.key = '__other__';

    if (aggResultBuckets.some(function (aggResultBucket) {
      return aggResultBucket.key === '__missing__';
    })) {
      bucket.filters.push((0, _common.buildExistsFilter)(otherAgg.params.field, otherAgg.params.field.indexPattern));
    }

    aggResultBuckets.push(bucket);
  });
  return updatedResponse;
};

exports.mergeOtherBucketAggResponse = mergeOtherBucketAggResponse;

var updateMissingBucket = function updateMissingBucket(response, aggConfigs, agg) {
  var updatedResponse = (0, _lodash.cloneDeep)(response);
  var aggResultBuckets = getAggConfigResultMissingBuckets(updatedResponse.aggregations, agg.id);
  aggResultBuckets.forEach(function (bucket) {
    bucket.key = '__missing__';
  });
  return updatedResponse;
};

exports.updateMissingBucket = updateMissingBucket;
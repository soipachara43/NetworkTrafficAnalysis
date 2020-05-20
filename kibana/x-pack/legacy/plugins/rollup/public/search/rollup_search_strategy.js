"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRollupSearchStrategy = void 0;

var _public = require("../../../../../../src/plugins/data/public");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function serializeFetchParams(searchRequests) {
  return JSON.stringify(searchRequests.map(function (searchRequestWithFetchParams) {
    var indexPattern = searchRequestWithFetchParams.index.title || searchRequestWithFetchParams.index;
    var _searchRequestWithFet = searchRequestWithFetchParams.body,
        size = _searchRequestWithFet.size,
        aggs = _searchRequestWithFet.aggs,
        _query = _searchRequestWithFet.query;
    var query = {
      size: size,
      aggregations: aggs,
      query: _query
    };
    return {
      index: indexPattern,
      query: query
    };
  }));
} // Rollup search always returns 0 hits, but visualizations expect search responses
// to return hits > 0, otherwise they do not render. We fake the number of hits here
// by counting the number of aggregation buckets/values returned by rollup search.


function shimHitsInFetchResponse(response) {
  return response.map(function (result) {
    var buckets = result.aggregations ? Object.keys(result.aggregations).reduce(function (allBuckets, agg) {
      return allBuckets.concat(result.aggregations[agg].buckets || [result.aggregations[agg].value] || []);
    }, []) : [];
    return buckets && buckets.length ? _objectSpread({}, result, {
      hits: _objectSpread({}, result.hits, {
        total: buckets.length
      })
    }) : result;
  });
}

var getRollupSearchStrategy = function getRollupSearchStrategy(fetch) {
  return {
    id: 'rollup',
    search: function search(_ref) {
      var searchRequests = _ref.searchRequests;
      // Serialize the fetch params into a format suitable for the body of an ES query.
      var serializedFetchParams = serializeFetchParams(searchRequests);
      var controller = new AbortController();
      var promise = fetch('../api/rollup/search', {
        signal: controller.signal,
        method: 'POST',
        body: serializedFetchParams
      });
      return {
        searching: promise.then(shimHitsInFetchResponse).catch(function (error) {
          var _error$body = error.body,
              statusCode = _error$body.statusCode,
              title = _error$body.error,
              message = _error$body.message,
              url = error.res.url; // Format fetch error as a SearchError.

          var searchError = new _public.SearchError({
            status: statusCode,
            title: title,
            message: "Rollup search error: ".concat(message),
            path: url,
            type: (0, _public.getSearchErrorType)({
              message: message
            }) || ''
          });
          return Promise.reject(searchError);
        }),
        abort: function abort() {
          return controller.abort();
        }
      };
    },
    isViable: function isViable(indexPattern) {
      if (!indexPattern) {
        return false;
      }

      return indexPattern.type === 'rollup';
    }
  };
};

exports.getRollupSearchStrategy = getRollupSearchStrategy;
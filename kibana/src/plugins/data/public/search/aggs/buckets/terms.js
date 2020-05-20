"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.termsBucketAgg = exports.termsAggFilter = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _bucket_agg_type = require("./_bucket_agg_type");

var _bucket_agg_types = require("./bucket_agg_types");

var _terms = require("./create_filter/terms");

var _migrate_include_exclude_format = require("./migrate_include_exclude_format");

var _common = require("../../../../common");

var _expressions = require("../../expressions");

var _terms_other_bucket_helper = require("./_terms_other_bucket_helper");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var termsAggFilter = ['!top_hits', '!percentiles', '!median', '!std_dev', '!derivative', '!moving_avg', '!serial_diff', '!cumulative_sum', '!avg_bucket', '!max_bucket', '!min_bucket', '!sum_bucket'];
exports.termsAggFilter = termsAggFilter;

var termsTitle = _i18n.i18n.translate('data.search.aggs.buckets.termsTitle', {
  defaultMessage: 'Terms'
});

var termsBucketAgg = new _bucket_agg_type.BucketAggType({
  name: _bucket_agg_types.BUCKET_TYPES.TERMS,
  title: termsTitle,
  makeLabel: function makeLabel(agg) {
    var params = agg.params;
    return agg.getFieldDisplayName() + ': ' + params.order.text;
  },
  getFormat: function getFormat(bucket) {
    return {
      getConverterFor: function getConverterFor(type) {
        return function (val) {
          if (val === '__other__') {
            return bucket.params.otherBucketLabel;
          }

          if (val === '__missing__') {
            return bucket.params.missingBucketLabel;
          }

          return bucket.params.field.format.convert(val, type);
        };
      }
    };
  },
  createFilter: _terms.createFilterTerms,
  postFlightRequest: function () {
    var _postFlightRequest = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resp, aggConfigs, aggConfig, searchSource, inspectorAdapters, abortSignal) {
      var nestedSearchSource, filterAgg, request, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (resp.aggregations) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", resp);

            case 2:
              nestedSearchSource = searchSource.createChild();

              if (!aggConfig.params.otherBucket) {
                _context.next = 16;
                break;
              }

              filterAgg = (0, _terms_other_bucket_helper.buildOtherBucketAgg)(aggConfigs, aggConfig, resp);

              if (filterAgg) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", resp);

            case 7:
              nestedSearchSource.setField('aggs', filterAgg);
              request = inspectorAdapters.requests.start(_i18n.i18n.translate('data.search.aggs.buckets.terms.otherBucketTitle', {
                defaultMessage: 'Other bucket'
              }), {
                description: _i18n.i18n.translate('data.search.aggs.buckets.terms.otherBucketDescription', {
                  defaultMessage: 'This request counts the number of documents that fall ' + 'outside the criterion of the data buckets.'
                })
              });
              nestedSearchSource.getSearchRequestBody().then(function (body) {
                request.json(body);
              });
              request.stats((0, _expressions.getRequestInspectorStats)(nestedSearchSource));
              _context.next = 13;
              return nestedSearchSource.fetch({
                abortSignal: abortSignal
              });

            case 13:
              response = _context.sent;
              request.stats((0, _expressions.getResponseInspectorStats)(nestedSearchSource, response)).ok({
                json: response
              });
              resp = (0, _terms_other_bucket_helper.mergeOtherBucketAggResponse)(aggConfigs, resp, response, aggConfig, filterAgg());

            case 16:
              if (aggConfig.params.missingBucket) {
                resp = (0, _terms_other_bucket_helper.updateMissingBucket)(resp, aggConfigs, aggConfig);
              }

              return _context.abrupt("return", resp);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function postFlightRequest(_x, _x2, _x3, _x4, _x5, _x6) {
      return _postFlightRequest.apply(this, arguments);
    }

    return postFlightRequest;
  }(),
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: [_common.KBN_FIELD_TYPES.NUMBER, _common.KBN_FIELD_TYPES.BOOLEAN, _common.KBN_FIELD_TYPES.DATE, _common.KBN_FIELD_TYPES.IP, _common.KBN_FIELD_TYPES.STRING]
  }, {
    name: 'orderBy',
    write: _lodash.noop // prevent default write, it's handled by orderAgg

  }, {
    name: 'orderAgg',
    type: 'agg',
    allowedAggs: termsAggFilter,
    default: null,
    makeAgg: function makeAgg(termsAgg, state) {
      state = state || {};
      state.schema = 'orderAgg';
      var orderAgg = termsAgg.aggConfigs.createAggConfig(state, {
        addToAggConfigs: false
      });
      orderAgg.id = termsAgg.id + '-orderAgg';
      return orderAgg;
    },
    write: function write(agg, output, aggs) {
      var dir = agg.params.order.value;
      var order = output.params.order = {};
      var orderAgg = agg.params.orderAgg || aggs.getResponseAggById(agg.params.orderBy); // TODO: This works around an Elasticsearch bug the always casts terms agg scripts to strings
      // thus causing issues with filtering. This probably causes other issues since float might not
      // be able to contain the number on the elasticsearch side

      if (output.params.script) {
        output.params.value_type = agg.getField().type === 'number' ? 'float' : agg.getField().type;
      }

      if (agg.params.missingBucket && agg.params.field.type === 'string') {
        output.params.missing = '__missing__';
      }

      if (!orderAgg) {
        order[agg.params.orderBy || '_count'] = dir;
        return;
      }

      if (orderAgg.type.name === 'count') {
        order._count = dir;
        return;
      }

      var orderAggId = orderAgg.id;

      if (orderAgg.parentId && aggs) {
        orderAgg = aggs.byId(orderAgg.parentId);
      }

      output.subAggs = (output.subAggs || []).concat(orderAgg);
      order[orderAggId] = dir;
    }
  }, {
    name: 'order',
    type: 'optioned',
    default: 'desc',
    options: [{
      text: _i18n.i18n.translate('data.search.aggs.buckets.terms.orderDescendingTitle', {
        defaultMessage: 'Descending'
      }),
      value: 'desc'
    }, {
      text: _i18n.i18n.translate('data.search.aggs.buckets.terms.orderAscendingTitle', {
        defaultMessage: 'Ascending'
      }),
      value: 'asc'
    }],
    write: _lodash.noop // prevent default write, it's handled by orderAgg

  }, {
    name: 'size',
    default: 5
  }, {
    name: 'otherBucket',
    default: false,
    write: _lodash.noop
  }, {
    name: 'otherBucketLabel',
    type: 'string',
    default: _i18n.i18n.translate('data.search.aggs.buckets.terms.otherBucketLabel', {
      defaultMessage: 'Other'
    }),
    displayName: _i18n.i18n.translate('data.search.aggs.otherBucket.labelForOtherBucketLabel', {
      defaultMessage: 'Label for other bucket'
    }),
    shouldShow: function shouldShow(agg) {
      return agg.getParam('otherBucket');
    },
    write: _lodash.noop
  }, {
    name: 'missingBucket',
    default: false,
    write: _lodash.noop
  }, {
    name: 'missingBucketLabel',
    default: _i18n.i18n.translate('data.search.aggs.buckets.terms.missingBucketLabel', {
      defaultMessage: 'Missing',
      description: "Default label used in charts when documents are missing a field.\n          Visible when you create a chart with a terms aggregation and enable \"Show missing values\""
    }),
    type: 'string',
    displayName: _i18n.i18n.translate('data.search.aggs.otherBucket.labelForMissingValuesLabel', {
      defaultMessage: 'Label for missing values'
    }),
    shouldShow: function shouldShow(agg) {
      return agg.getParam('missingBucket');
    },
    write: _lodash.noop
  }, _objectSpread({
    name: 'exclude',
    displayName: _i18n.i18n.translate('data.search.aggs.buckets.terms.excludeLabel', {
      defaultMessage: 'Exclude'
    }),
    type: 'string',
    advanced: true,
    shouldShow: _migrate_include_exclude_format.isStringType
  }, _migrate_include_exclude_format.migrateIncludeExcludeFormat), _objectSpread({
    name: 'include',
    displayName: _i18n.i18n.translate('data.search.aggs.buckets.terms.includeLabel', {
      defaultMessage: 'Include'
    }),
    type: 'string',
    advanced: true,
    shouldShow: _migrate_include_exclude_format.isStringType
  }, _migrate_include_exclude_format.migrateIncludeExcludeFormat)]
});
exports.termsBucketAgg = termsBucketAgg;
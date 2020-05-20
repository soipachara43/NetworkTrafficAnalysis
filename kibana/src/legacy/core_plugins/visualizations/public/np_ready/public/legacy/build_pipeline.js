"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPipeline = exports.buildVislibDimensions = exports.buildPipelineVisFunction = exports.prepareDimension = exports.prepareValue = exports.prepareString = exports.escapeString = exports.prepareJson = void 0;

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _public = require("../../../../../../../plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isDateHistogramBucketAggConfig = _public.search.aggs.isDateHistogramBucketAggConfig;
var vislibCharts = ['area', 'gauge', 'goal', 'heatmap', 'histogram', 'horizontal_bar', 'line'];

var getSchemas = function getSchemas(vis, opts) {
  var timeRange = opts.timeRange,
      timefilter = opts.timefilter;

  var createSchemaConfig = function createSchemaConfig(accessor, agg) {
    if (isDateHistogramBucketAggConfig(agg)) {
      agg.params.timeRange = timeRange;
      var bounds = agg.params.timeRange ? timefilter.calculateBounds(agg.params.timeRange) : null;
      agg.buckets.setBounds(agg.fieldIsTimeField() && bounds);
      agg.buckets.setInterval(agg.params.interval);
    }

    var hasSubAgg = ['derivative', 'moving_avg', 'serial_diff', 'cumulative_sum', 'sum_bucket', 'avg_bucket', 'min_bucket', 'max_bucket'].includes(agg.type.name);

    var format = _public.fieldFormats.serialize(hasSubAgg ? agg.params.customMetric || agg.aggConfigs.getRequestAggById(agg.params.metricAgg) : agg);

    var params = {};

    if (agg.type.name === 'geohash_grid') {
      params.precision = agg.params.precision;
      params.useGeocentroid = agg.params.useGeocentroid;
    }

    var label = agg.makeLabel && agg.makeLabel();
    return {
      accessor: accessor,
      format: format,
      params: params,
      label: label,
      aggType: agg.type.name
    };
  };

  var cnt = 0;
  var schemas = {
    metric: []
  };

  if (!vis.data.aggs) {
    return schemas;
  }

  var responseAggs = vis.data.aggs.getResponseAggs().filter(function (agg) {
    return agg.enabled;
  });
  var isHierarchical = vis.isHierarchical();
  var metrics = responseAggs.filter(function (agg) {
    return agg.type.type === 'metrics';
  });
  responseAggs.forEach(function (agg) {
    var skipMetrics = false;
    var schemaName = agg.schema;

    if (!schemaName) {
      if (agg.type.name === 'geo_centroid') {
        schemaName = 'geo_centroid';
      } else {
        cnt++;
        return;
      }
    }

    if (schemaName === 'split') {
      schemaName = "split_".concat(vis.params.row ? 'row' : 'column');
      skipMetrics = responseAggs.length - metrics.length > 1;
    }

    if (!schemas[schemaName]) {
      schemas[schemaName] = [];
    }

    if (!isHierarchical || agg.type.type !== 'metrics') {
      schemas[schemaName].push(createSchemaConfig(cnt++, agg));
    }

    if (isHierarchical && (agg.type.type !== 'metrics' || metrics.length === responseAggs.length)) {
      metrics.forEach(function (metric) {
        var schemaConfig = createSchemaConfig(cnt++, metric);

        if (!skipMetrics) {
          schemas.metric.push(schemaConfig);
        }
      });
    }
  });
  return schemas;
};

var prepareJson = function prepareJson(variable, data) {
  if (data === undefined) {
    return '';
  }

  return "".concat(variable, "='").concat(JSON.stringify(data).replace(/\\/g, "\\\\").replace(/'/g, "\\'"), "' ");
};

exports.prepareJson = prepareJson;

var escapeString = function escapeString(data) {
  return data.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
};

exports.escapeString = escapeString;

var prepareString = function prepareString(variable, data) {
  if (data === undefined) {
    return '';
  }

  return "".concat(variable, "='").concat(escapeString(data), "' ");
};

exports.prepareString = prepareString;

var prepareValue = function prepareValue(variable, data) {
  var raw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (data === undefined) {
    return '';
  }

  if (raw) {
    return "".concat(variable, "=").concat(data, " ");
  }

  switch (_typeof(data)) {
    case 'string':
      return prepareString(variable, data);

    case 'object':
      return prepareJson(variable, data);

    default:
      return "".concat(variable, "=").concat(data, " ");
  }
};

exports.prepareValue = prepareValue;

var prepareDimension = function prepareDimension(variable, data) {
  if (data === undefined) {
    return '';
  }

  var expr = "".concat(variable, "={visdimension ").concat(data.accessor, " ");

  if (data.format) {
    expr += prepareValue('format', data.format.id);
    expr += prepareJson('formatParams', data.format.params);
  }

  expr += '} ';
  return expr;
};

exports.prepareDimension = prepareDimension;

var adjustVislibDimensionFormmaters = function adjustVislibDimensionFormmaters(vis, dimensions) {
  var visConfig = vis.params;
  var responseAggs = vis.data.aggs.getResponseAggs().filter(function (agg) {
    return agg.enabled;
  });
  (dimensions.y || []).forEach(function (yDimension) {
    var yAgg = responseAggs[yDimension.accessor];
    var seriesParam = (visConfig.seriesParams || []).find(function (param) {
      return param.data.id === yAgg.id;
    });

    if (seriesParam) {
      var usedValueAxis = (visConfig.valueAxes || []).find(function (valueAxis) {
        return valueAxis.id === seriesParam.valueAxis;
      });

      if ((0, _lodash.get)(usedValueAxis, 'scale.mode') === 'percentage') {
        yDimension.format = {
          id: 'percent'
        };
      }
    }

    if ((0, _lodash.get)(visConfig, 'gauge.percentageMode') === true) {
      yDimension.format = {
        id: 'percent'
      };
    }
  });
};

var buildPipelineVisFunction = {
  vega: function vega(params) {
    return "vega ".concat(prepareString('spec', params.spec));
  },
  input_control_vis: function input_control_vis(params) {
    return "input_control_vis ".concat(prepareJson('visConfig', params));
  },
  metrics: function metrics(params, schemas) {
    var uiState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var paramsJson = prepareJson('params', params);
    var uiStateJson = prepareJson('uiState', uiState);
    var paramsArray = [paramsJson, uiStateJson].filter(function (param) {
      return Boolean(param);
    });
    return "tsvb ".concat(paramsArray.join(' '));
  },
  timelion: function timelion(params) {
    var expression = prepareString('expression', params.expression);
    var interval = prepareString('interval', params.interval);
    return "timelion_vis ".concat(expression).concat(interval);
  },
  markdown: function markdown(params) {
    var markdown = params.markdown,
        fontSize = params.fontSize,
        openLinksInNewTab = params.openLinksInNewTab;
    var escapedMarkdown = '';

    if (typeof markdown === 'string' || markdown instanceof String) {
      escapedMarkdown = escapeString(markdown.toString());
    }

    var expr = "markdownvis '".concat(escapedMarkdown, "' ");
    expr += prepareValue('font', "{font size=".concat(fontSize, "}"), true);
    expr += prepareValue('openLinksInNewTab', openLinksInNewTab);
    return expr;
  },
  table: function table(params, schemas) {
    var visConfig = _objectSpread({}, params, {}, buildVisConfig.table(schemas, params));

    return "kibana_table ".concat(prepareJson('visConfig', visConfig));
  },
  metric: function metric(params, schemas) {
    var _params$metric = params.metric,
        percentageMode = _params$metric.percentageMode,
        useRanges = _params$metric.useRanges,
        colorSchema = _params$metric.colorSchema,
        metricColorMode = _params$metric.metricColorMode,
        colorsRange = _params$metric.colorsRange,
        labels = _params$metric.labels,
        invertColors = _params$metric.invertColors,
        style = _params$metric.style;
    var _buildVisConfig$metri = buildVisConfig.metric(schemas).dimensions,
        metrics = _buildVisConfig$metri.metrics,
        bucket = _buildVisConfig$metri.bucket; // fix formatter for percentage mode

    if ((0, _lodash.get)(params, 'metric.percentageMode') === true) {
      metrics.forEach(function (metric) {
        metric.format = {
          id: 'percent'
        };
      });
    }

    var expr = "metricvis ";
    expr += prepareValue('percentageMode', percentageMode);
    expr += prepareValue('colorSchema', colorSchema);
    expr += prepareValue('colorMode', metricColorMode);
    expr += prepareValue('useRanges', useRanges);
    expr += prepareValue('invertColors', invertColors);
    expr += prepareValue('showLabels', labels && labels.show);

    if (style) {
      expr += prepareValue('bgFill', style.bgFill);
      expr += prepareValue('font', "{font size=".concat(style.fontSize, "}"), true);
      expr += prepareValue('subText', style.subText);
      expr += prepareDimension('bucket', bucket);
    }

    if (colorsRange) {
      colorsRange.forEach(function (range) {
        expr += prepareValue('colorRange', "{range from=".concat(range.from, " to=").concat(range.to, "}"), true);
      });
    }

    metrics.forEach(function (metric) {
      expr += prepareDimension('metric', metric);
    });
    return expr;
  },
  tagcloud: function tagcloud(params, schemas) {
    var scale = params.scale,
        orientation = params.orientation,
        minFontSize = params.minFontSize,
        maxFontSize = params.maxFontSize,
        showLabel = params.showLabel;

    var _buildVisConfig$tagcl = buildVisConfig.tagcloud(schemas),
        metric = _buildVisConfig$tagcl.metric,
        bucket = _buildVisConfig$tagcl.bucket;

    var expr = "tagcloud metric={visdimension ".concat(metric.accessor, "} ");
    expr += prepareValue('scale', scale);
    expr += prepareValue('orientation', orientation);
    expr += prepareValue('minFontSize', minFontSize);
    expr += prepareValue('maxFontSize', maxFontSize);
    expr += prepareValue('showLabel', showLabel);
    expr += prepareDimension('bucket', bucket);
    return expr;
  },
  region_map: function region_map(params, schemas) {
    var visConfig = _objectSpread({}, params, {}, buildVisConfig.region_map(schemas));

    return "regionmap ".concat(prepareJson('visConfig', visConfig));
  },
  tile_map: function tile_map(params, schemas) {
    var visConfig = _objectSpread({}, params, {}, buildVisConfig.tile_map(schemas));

    return "tilemap ".concat(prepareJson('visConfig', visConfig));
  },
  pie: function pie(params, schemas) {
    var visConfig = _objectSpread({}, params, {}, buildVisConfig.pie(schemas));

    return "kibana_pie ".concat(prepareJson('visConfig', visConfig));
  }
};
exports.buildPipelineVisFunction = buildPipelineVisFunction;
var buildVisConfig = {
  table: function table(schemas) {
    var visParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var visConfig = {};
    var metrics = schemas.metric;
    var buckets = schemas.bucket || [];
    visConfig.dimensions = {
      metrics: metrics,
      buckets: buckets,
      splitRow: schemas.split_row,
      splitColumn: schemas.split_column
    };

    if (visParams.showMetricsAtAllLevels === false && visParams.showPartialRows === true) {
      // Handle case where user wants to see partial rows but not metrics at all levels.
      // This requires calculating how many metrics will come back in the tabified response,
      // and removing all metrics from the dimensions except the last set.
      var metricsPerBucket = metrics.length / buckets.length;
      visConfig.dimensions.metrics.splice(0, metricsPerBucket * buckets.length - metricsPerBucket);
    }

    return visConfig;
  },
  metric: function metric(schemas) {
    var visConfig = {
      dimensions: {}
    };
    visConfig.dimensions.metrics = schemas.metric;

    if (schemas.group) {
      visConfig.dimensions.bucket = schemas.group[0];
    }

    return visConfig;
  },
  tagcloud: function tagcloud(schemas) {
    var visConfig = {};
    visConfig.metric = schemas.metric[0];

    if (schemas.segment) {
      visConfig.bucket = schemas.segment[0];
    }

    return visConfig;
  },
  region_map: function region_map(schemas) {
    var visConfig = {};
    visConfig.metric = schemas.metric[0];

    if (schemas.segment) {
      visConfig.bucket = schemas.segment[0];
    }

    return visConfig;
  },
  tile_map: function tile_map(schemas) {
    var visConfig = {};
    visConfig.dimensions = {
      metric: schemas.metric[0],
      geohash: schemas.segment ? schemas.segment[0] : null,
      geocentroid: schemas.geo_centroid ? schemas.geo_centroid[0] : null
    };
    return visConfig;
  },
  pie: function pie(schemas) {
    var visConfig = {};
    visConfig.dimensions = {
      metric: schemas.metric[0],
      buckets: schemas.segment,
      splitRow: schemas.split_row,
      splitColumn: schemas.split_column
    };
    return visConfig;
  }
};

var buildVislibDimensions =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(vis, params) {
    var schemas, dimensions, xAgg, _xAgg$buckets$getInte, esUnit, esValue, intervalParam, output;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            schemas = getSchemas(vis, {
              timeRange: params.timeRange,
              timefilter: params.timefilter
            });
            dimensions = {
              x: schemas.segment ? schemas.segment[0] : null,
              y: schemas.metric,
              z: schemas.radius,
              width: schemas.width,
              series: schemas.group,
              splitRow: schemas.split_row,
              splitColumn: schemas.split_column
            };

            if (!schemas.segment) {
              _context.next = 21;
              break;
            }

            xAgg = vis.data.aggs.getResponseAggs()[dimensions.x.accessor];

            if (!(xAgg.type.name === 'date_histogram')) {
              _context.next = 14;
              break;
            }

            dimensions.x.params.date = true;
            _xAgg$buckets$getInte = xAgg.buckets.getInterval(), esUnit = _xAgg$buckets$getInte.esUnit, esValue = _xAgg$buckets$getInte.esValue;
            dimensions.x.params.interval = _moment.default.duration(esValue, esUnit);
            dimensions.x.params.intervalESValue = esValue;
            dimensions.x.params.intervalESUnit = esUnit;
            dimensions.x.params.format = xAgg.buckets.getScaledDateFormat();
            dimensions.x.params.bounds = xAgg.buckets.getBounds();
            _context.next = 21;
            break;

          case 14:
            if (!(xAgg.type.name === 'histogram')) {
              _context.next = 21;
              break;
            }

            intervalParam = xAgg.type.paramByName('interval');
            output = {
              params: {}
            };
            _context.next = 19;
            return intervalParam.modifyAggConfigOnSearchRequestStart(xAgg, vis.data.searchSource, {
              abortSignal: params.abortSignal
            });

          case 19:
            intervalParam.write(xAgg, output);
            dimensions.x.params.interval = output.params.interval;

          case 21:
            adjustVislibDimensionFormmaters(vis, dimensions);
            return _context.abrupt("return", dimensions);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function buildVislibDimensions(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.buildVislibDimensions = buildVislibDimensions;

var buildPipeline =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(vis, params) {
    var _vis$data, indexPattern, searchSource, query, filters, uiState, pipeline, schemas, visConfig, _visConfig;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _vis$data = vis.data, indexPattern = _vis$data.indexPattern, searchSource = _vis$data.searchSource;
            query = searchSource.getField('query');
            filters = searchSource.getField('filter');
            uiState = vis.uiState; // context

            pipeline = "kibana | kibana_context ";

            if (query) {
              pipeline += prepareJson('query', query);
            }

            if (filters) {
              pipeline += prepareJson('filters', filters);
            }

            if (vis.data.savedSearchId) {
              pipeline += prepareString('savedSearchId', vis.data.savedSearchId);
            }

            pipeline += '| '; // request handler

            if (vis.type.requestHandler === 'courier') {
              pipeline += "esaggs\n    ".concat(prepareString('index', indexPattern.id), "\n    metricsAtAllLevels=").concat(vis.isHierarchical(), "\n    partialRows=").concat(vis.type.requiresPartialRows || vis.params.showPartialRows || false, "\n    ").concat(prepareJson('aggConfigs', vis.data.aggs.aggs), " | ");
            }

            schemas = getSchemas(vis, {
              timeRange: params.timeRange,
              timefilter: params.timefilter
            });

            if (!buildPipelineVisFunction[vis.type.name]) {
              _context2.next = 15;
              break;
            }

            pipeline += buildPipelineVisFunction[vis.type.name](vis.params, schemas, uiState);
            _context2.next = 34;
            break;

          case 15:
            if (!vislibCharts.includes(vis.type.name)) {
              _context2.next = 23;
              break;
            }

            visConfig = _objectSpread({}, vis.params);
            _context2.next = 19;
            return buildVislibDimensions(vis, params);

          case 19:
            visConfig.dimensions = _context2.sent;
            pipeline += "vislib type='".concat(vis.type.name, "' ").concat(prepareJson('visConfig', visConfig));
            _context2.next = 34;
            break;

          case 23:
            if (!vis.type.toExpression) {
              _context2.next = 30;
              break;
            }

            _context2.t0 = pipeline;
            _context2.next = 27;
            return vis.type.toExpression(vis, params);

          case 27:
            pipeline = _context2.t0 += _context2.sent;
            _context2.next = 34;
            break;

          case 30:
            _visConfig = _objectSpread({}, vis.params);
            _visConfig.dimensions = schemas;
            pipeline += "visualization type='".concat(vis.type.name, "'\n    ").concat(prepareJson('visConfig', _visConfig), "\n    metricsAtAllLevels=").concat(vis.isHierarchical(), "\n    partialRows=").concat(vis.type.requiresPartialRows || vis.params.showPartialRows || false, " ");

            if (indexPattern) {
              pipeline += "".concat(prepareString('index', indexPattern.id));
            }

          case 34:
            return _context2.abrupt("return", pipeline);

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function buildPipeline(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.buildPipeline = buildPipeline;
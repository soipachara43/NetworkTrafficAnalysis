"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuggestions = getSuggestions;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _charts = require("@elastic/charts");

var _state_helpers = require("./state_helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var columnSortOrder = {
  document: 0,
  date: 1,
  string: 2,
  ip: 3,
  boolean: 4,
  number: 5
};
/**
 * Generate suggestions for the xy chart.
 *
 * @param opts
 */

function getSuggestions(_ref) {
  var table = _ref.table,
      state = _ref.state,
      keptLayerIds = _ref.keptLayerIds;

  if ( // We only render line charts for multi-row queries. We require at least
  // two columns: one for x and at least one for y, and y columns must be numeric.
  // We reject any datasource suggestions which have a column of an unknown type.
  !table.isMultiRow || table.columns.length <= 1 || table.columns.every(function (col) {
    return col.operation.dataType !== 'number';
  }) || table.columns.some(function (col) {
    return !columnSortOrder.hasOwnProperty(col.operation.dataType);
  })) {
    return [];
  }

  var suggestions = getSuggestionForColumns(table, keptLayerIds, state);

  if (suggestions && suggestions instanceof Array) {
    return suggestions;
  }

  return suggestions ? [suggestions] : [];
}

function getSuggestionForColumns(table, keptLayerIds, currentState) {
  var _partition = (0, _lodash.partition)(table.columns, function (col) {
    return col.operation.isBucketed;
  }),
      _partition2 = _slicedToArray(_partition, 2),
      buckets = _partition2[0],
      values = _partition2[1];

  if (buckets.length === 1 || buckets.length === 2) {
    var _getBucketMappings = getBucketMappings(table, currentState),
        _getBucketMappings2 = _slicedToArray(_getBucketMappings, 2),
        x = _getBucketMappings2[0],
        splitBy = _getBucketMappings2[1];

    return getSuggestionsForLayer({
      layerId: table.layerId,
      changeType: table.changeType,
      xValue: x,
      yValues: values,
      splitBy: splitBy,
      currentState: currentState,
      tableLabel: table.label,
      keptLayerIds: keptLayerIds
    });
  } else if (buckets.length === 0) {
    var _prioritizeColumns = prioritizeColumns(values),
        _prioritizeColumns2 = _toArray(_prioritizeColumns),
        _x = _prioritizeColumns2[0],
        yValues = _prioritizeColumns2.slice(1);

    return getSuggestionsForLayer({
      layerId: table.layerId,
      changeType: table.changeType,
      xValue: _x,
      yValues: yValues,
      splitBy: undefined,
      currentState: currentState,
      tableLabel: table.label,
      keptLayerIds: keptLayerIds
    });
  }
}

function getBucketMappings(table, currentState) {
  var currentLayer = currentState && currentState.layers.find(function (_ref2) {
    var layerId = _ref2.layerId;
    return layerId === table.layerId;
  });
  var buckets = table.columns.filter(function (col) {
    return col.operation.isBucketed;
  }); // reverse the buckets before prioritization to always use the most inner
  // bucket of the highest-prioritized group as x value (don't use nested
  // buckets as split series)

  var prioritizedBuckets = prioritizeColumns(buckets.reverse());

  if (!currentLayer || table.changeType === 'initial') {
    return prioritizedBuckets;
  } // if existing table is just modified, try to map buckets to the current dimensions


  var currentXColumnIndex = prioritizedBuckets.findIndex(function (_ref3) {
    var columnId = _ref3.columnId;
    return columnId === currentLayer.xAccessor;
  });
  var currentXDataType = currentXColumnIndex > -1 && prioritizedBuckets[currentXColumnIndex].operation.dataType;

  if (currentXDataType && ( // make sure time gets mapped to x dimension even when changing current bucket/dimension mapping
  currentXDataType === 'date' || prioritizedBuckets[0].operation.dataType !== 'date')) {
    var _prioritizedBuckets$s = prioritizedBuckets.splice(currentXColumnIndex, 1),
        _prioritizedBuckets$s2 = _slicedToArray(_prioritizedBuckets$s, 1),
        x = _prioritizedBuckets$s2[0];

    prioritizedBuckets.unshift(x);
  }

  var currentSplitColumnIndex = prioritizedBuckets.findIndex(function (_ref4) {
    var columnId = _ref4.columnId;
    return columnId === currentLayer.splitAccessor;
  });

  if (currentSplitColumnIndex > -1) {
    var _prioritizedBuckets$s3 = prioritizedBuckets.splice(currentSplitColumnIndex, 1),
        _prioritizedBuckets$s4 = _slicedToArray(_prioritizedBuckets$s3, 1),
        splitBy = _prioritizedBuckets$s4[0];

    prioritizedBuckets.push(splitBy);
  }

  return prioritizedBuckets;
} // This shuffles columns around so that the left-most column defualts to:
// date, string, boolean, then number, in that priority. We then use this
// order to pluck out the x column, and the split / stack column.


function prioritizeColumns(columns) {
  return _toConsumableArray(columns).sort(function (a, b) {
    return columnSortOrder[a.operation.dataType] - columnSortOrder[b.operation.dataType];
  });
}

function getSuggestionsForLayer(_ref5) {
  var layerId = _ref5.layerId,
      changeType = _ref5.changeType,
      xValue = _ref5.xValue,
      yValues = _ref5.yValues,
      splitBy = _ref5.splitBy,
      currentState = _ref5.currentState,
      tableLabel = _ref5.tableLabel,
      keptLayerIds = _ref5.keptLayerIds;
  var title = getSuggestionTitle(yValues, xValue, tableLabel);
  var seriesType = getSeriesType(currentState, layerId, xValue, changeType);
  var options = {
    currentState: currentState,
    seriesType: seriesType,
    layerId: layerId,
    title: title,
    yValues: yValues,
    splitBy: splitBy,
    changeType: changeType,
    xValue: xValue,
    keptLayerIds: keptLayerIds
  };
  var isSameState = currentState && changeType === 'unchanged';

  if (!isSameState) {
    return buildSuggestion(options);
  }

  var sameStateSuggestions = []; // if current state is using the same data, suggest same chart with different presentational configuration

  if (seriesType !== 'line' && xValue.operation.scale === 'ordinal') {
    // flip between horizontal/vertical for ordinal scales
    sameStateSuggestions.push(buildSuggestion(_objectSpread({}, options, {
      title: _i18n.i18n.translate('xpack.lens.xySuggestions.flipTitle', {
        defaultMessage: 'Flip'
      }),
      seriesType: seriesType === 'bar_horizontal' ? 'bar' : seriesType === 'bar_horizontal_stacked' ? 'bar_stacked' : 'bar_horizontal'
    })));
  } else {
    // change chart type for interval or ratio scales on x axis
    var newSeriesType = altSeriesType(seriesType);
    sameStateSuggestions.push(buildSuggestion(_objectSpread({}, options, {
      seriesType: newSeriesType,
      title: newSeriesType.startsWith('bar') ? _i18n.i18n.translate('xpack.lens.xySuggestions.barChartTitle', {
        defaultMessage: 'Bar chart'
      }) : _i18n.i18n.translate('xpack.lens.xySuggestions.lineChartTitle', {
        defaultMessage: 'Line chart'
      })
    })));
  }

  if (seriesType !== 'line' && splitBy) {
    // flip between stacked/unstacked
    sameStateSuggestions.push(buildSuggestion(_objectSpread({}, options, {
      seriesType: toggleStackSeriesType(seriesType),
      title: seriesType.endsWith('stacked') ? _i18n.i18n.translate('xpack.lens.xySuggestions.unstackedChartTitle', {
        defaultMessage: 'Unstacked'
      }) : _i18n.i18n.translate('xpack.lens.xySuggestions.stackedChartTitle', {
        defaultMessage: 'Stacked'
      })
    })));
  }

  return sameStateSuggestions;
}

function toggleStackSeriesType(oldSeriesType) {
  switch (oldSeriesType) {
    case 'area':
      return 'area_stacked';

    case 'area_stacked':
      return 'area';

    case 'bar':
      return 'bar_stacked';

    case 'bar_stacked':
      return 'bar';

    default:
      return oldSeriesType;
  }
} // Until the area chart rendering bug is fixed, avoid suggesting area charts
// https://github.com/elastic/elastic-charts/issues/388


function altSeriesType(oldSeriesType) {
  switch (oldSeriesType) {
    case 'area':
      return 'line';

    case 'area_stacked':
      return 'bar_stacked';

    case 'bar':
      return 'line';

    case 'bar_stacked':
      return 'line';

    case 'line':
    default:
      return 'bar_stacked';
  }
}

function getSeriesType(currentState, layerId, xValue, changeType) {
  var defaultType = 'bar_stacked';
  var oldLayer = getExistingLayer(currentState, layerId);
  var oldLayerSeriesType = oldLayer ? oldLayer.seriesType : false;
  var closestSeriesType = oldLayerSeriesType || currentState && currentState.preferredSeriesType || defaultType; // Attempt to keep the seriesType consistent on initial add of a layer
  // Ordinal scales should always use a bar because there is no interpolation between buckets

  if (xValue.operation.scale && xValue.operation.scale === 'ordinal') {
    return closestSeriesType.startsWith('bar') ? closestSeriesType : defaultType;
  }

  if (changeType === 'initial') {
    return defaultType;
  }

  return closestSeriesType !== defaultType ? closestSeriesType : defaultType;
}

function getSuggestionTitle(yValues, xValue, tableLabel) {
  var yTitle = yValues.map(function (col) {
    return col.operation.label;
  }).join(_i18n.i18n.translate('xpack.lens.xySuggestions.yAxixConjunctionSign', {
    defaultMessage: ' & ',
    description: 'A character that can be used for conjunction of multiple enumarated items. Make sure to include spaces around it if needed.'
  }));
  var xTitle = xValue.operation.label;
  var title = tableLabel || (xValue.operation.dataType === 'date' ? _i18n.i18n.translate('xpack.lens.xySuggestions.dateSuggestion', {
    defaultMessage: '{yTitle} over {xTitle}',
    description: 'Chart description for charts over time, like "Transfered bytes over log.timestamp"',
    values: {
      xTitle: xTitle,
      yTitle: yTitle
    }
  }) : _i18n.i18n.translate('xpack.lens.xySuggestions.nonDateSuggestion', {
    defaultMessage: '{yTitle} of {xTitle}',
    description: 'Chart description for a value of some groups, like "Top URLs of top 5 countries"',
    values: {
      xTitle: xTitle,
      yTitle: yTitle
    }
  }));
  return title;
}

function buildSuggestion(_ref6) {
  var currentState = _ref6.currentState,
      seriesType = _ref6.seriesType,
      layerId = _ref6.layerId,
      title = _ref6.title,
      yValues = _ref6.yValues,
      splitBy = _ref6.splitBy,
      changeType = _ref6.changeType,
      xValue = _ref6.xValue,
      keptLayerIds = _ref6.keptLayerIds;

  var newLayer = _objectSpread({}, getExistingLayer(currentState, layerId) || {}, {
    layerId: layerId,
    seriesType: seriesType,
    xAccessor: xValue.columnId,
    splitAccessor: splitBy === null || splitBy === void 0 ? void 0 : splitBy.columnId,
    accessors: yValues.map(function (col) {
      return col.columnId;
    })
  });

  var keptLayers = currentState ? currentState.layers.filter(function (layer) {
    return layer.layerId !== layerId && keptLayerIds.includes(layer.layerId);
  }) : [];
  var state = {
    legend: currentState ? currentState.legend : {
      isVisible: true,
      position: _charts.Position.Right
    },
    preferredSeriesType: seriesType,
    layers: [].concat(_toConsumableArray(keptLayers), [newLayer])
  };
  return {
    title: title,
    score: getScore(yValues, splitBy, changeType),
    // don't advertise chart of same type but with less data
    hide: currentState && changeType === 'reduced',
    state: state,
    previewIcon: (0, _state_helpers.getIconForSeries)(seriesType)
  };
}

function getScore(yValues, splitBy, changeType) {
  // Unchanged table suggestions half the score because the underlying data doesn't change
  var changeFactor = changeType === 'unchanged' ? 0.5 : 1; // chart with multiple y values and split series will have a score of 1, single y value and no split series reduce score

  return ((yValues.length > 1 ? 2 : 1) + (splitBy ? 1 : 0)) / 3 * changeFactor;
}

function getExistingLayer(currentState, layerId) {
  return currentState && currentState.layers.find(function (layer) {
    return layer.layerId === layerId;
  });
}
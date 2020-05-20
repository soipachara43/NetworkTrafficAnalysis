"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDatasourceSuggestionsForField = getDatasourceSuggestionsForField;
exports.getDatasourceSuggestionsFromCurrentState = getDatasourceSuggestionsFromCurrentState;

var _lodash = _interopRequireWildcard(require("lodash"));

var _i18n = require("@kbn/i18n");

var _id_generator = require("../id_generator");

var _indexpattern = require("./indexpattern");

var _operations = require("./operations");

var _definitions = require("./operations/definitions");

var _utils = require("./utils");

var _document_field = require("./document_field");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function buildSuggestion(_ref) {
  var state = _ref.state,
      updatedLayer = _ref.updatedLayer,
      layerId = _ref.layerId,
      label = _ref.label,
      changeType = _ref.changeType;
  var updatedState = updatedLayer ? _objectSpread({}, state, {
    layers: _objectSpread({}, state.layers, _defineProperty({}, layerId, updatedLayer))
  }) : state; // It's fairly easy to accidentally introduce a mismatch between
  // columnOrder and columns, so this is a safeguard to ensure the
  // two match up.

  var layers = _lodash.default.mapValues(updatedState.layers, function (layer) {
    return _objectSpread({}, layer, {
      columns: _lodash.default.pick(layer.columns, layer.columnOrder)
    });
  });

  var columnOrder = layers[layerId].columnOrder;
  var columnMap = layers[layerId].columns;
  var isMultiRow = Object.values(columnMap).some(function (column) {
    return column.isBucketed;
  });
  return {
    state: _objectSpread({}, updatedState, {
      layers: layers
    }),
    table: {
      columns: columnOrder.map(function (columnId) {
        return {
          columnId: columnId,
          operation: (0, _indexpattern.columnToOperation)(columnMap[columnId])
        };
      }),
      isMultiRow: isMultiRow,
      layerId: layerId,
      changeType: changeType,
      label: label
    },
    keptLayerIds: Object.keys(state.layers)
  };
}

function getDatasourceSuggestionsForField(state, indexPatternId, field) {
  var layers = Object.keys(state.layers);
  var layerIds = layers.filter(function (id) {
    return state.layers[id].indexPatternId === indexPatternId;
  });

  if (layerIds.length === 0) {
    // The field we're suggesting on does not match any existing layer.
    // This generates a set of suggestions where we add a layer.
    // A second set of suggestions is generated for visualizations that don't work with layers
    var newId = (0, _id_generator.generateId)();
    return getEmptyLayerSuggestionsForField(state, newId, indexPatternId, field).concat(getEmptyLayerSuggestionsForField(_objectSpread({}, state, {
      layers: {}
    }), newId, indexPatternId, field));
  } else {
    // The field we're suggesting on matches an existing layer. In this case we find the layer with
    // the fewest configured columns and try to add the field to this table. If this layer does not
    // contain any layers yet, behave as if there is no layer.
    var mostEmptyLayerId = _lodash.default.min(layerIds, function (layerId) {
      return state.layers[layerId].columnOrder.length;
    });

    if (state.layers[mostEmptyLayerId].columnOrder.length === 0) {
      return getEmptyLayerSuggestionsForField(state, mostEmptyLayerId, indexPatternId, field);
    } else {
      return getExistingLayerSuggestionsForField(state, mostEmptyLayerId, field);
    }
  }
}

function getBucketOperation(field) {
  // We allow numeric bucket types in some cases, but it's generally not the right suggestion,
  // so we eliminate it here.
  if (field.type !== 'number') {
    return (0, _operations.getOperationTypesForField)(field).find(function (op) {
      return op === 'date_histogram' || op === 'terms';
    });
  }
}

function getExistingLayerSuggestionsForField(state, layerId, field) {
  var layer = state.layers[layerId];
  var indexPattern = state.indexPatterns[layer.indexPatternId];
  var operations = (0, _operations.getOperationTypesForField)(field);
  var usableAsBucketOperation = getBucketOperation(field);
  var fieldInUse = Object.values(layer.columns).some(function (column) {
    return (0, _utils.hasField)(column) && column.sourceField === field.name;
  });
  var suggestions = [];

  if (usableAsBucketOperation && !fieldInUse) {
    suggestions.push(buildSuggestion({
      state: state,
      updatedLayer: addFieldAsBucketOperation(layer, layerId, indexPattern, field),
      layerId: layerId,
      changeType: 'extended'
    }));
  }

  if (!usableAsBucketOperation && operations.length > 0) {
    var updatedLayer = addFieldAsMetricOperation(layer, layerId, indexPattern, field);

    if (updatedLayer) {
      suggestions.push(buildSuggestion({
        state: state,
        updatedLayer: updatedLayer,
        layerId: layerId,
        changeType: 'extended'
      }));
    }
  }

  var metricSuggestion = createMetricSuggestion(indexPattern, layerId, state, field);

  if (metricSuggestion) {
    suggestions.push(metricSuggestion);
  }

  return suggestions;
}

function addFieldAsMetricOperation(layer, layerId, indexPattern, field) {
  var operations = (0, _operations.getOperationTypesForField)(field);
  var operationsAlreadyAppliedToThisField = Object.values(layer.columns).filter(function (column) {
    return (0, _utils.hasField)(column) && column.sourceField === field.name;
  }).map(function (column) {
    return column.operationType;
  });
  var operationCandidate = operations.find(function (operation) {
    return !operationsAlreadyAppliedToThisField.includes(operation);
  });

  if (!operationCandidate) {
    return;
  }

  var newColumn = (0, _operations.buildColumn)({
    op: operationCandidate,
    columns: layer.columns,
    layerId: layerId,
    indexPattern: indexPattern,
    suggestedPriority: undefined,
    field: field
  });
  var addedColumnId = (0, _id_generator.generateId)();

  var _separateBucketColumn = separateBucketColumns(layer),
      _separateBucketColumn2 = _slicedToArray(_separateBucketColumn, 2),
      metrics = _separateBucketColumn2[1]; // Add metrics if there are 0 or > 1 metric


  if (metrics.length !== 1) {
    return {
      indexPatternId: indexPattern.id,
      columns: _objectSpread({}, layer.columns, _defineProperty({}, addedColumnId, newColumn)),
      columnOrder: [].concat(_toConsumableArray(layer.columnOrder), [addedColumnId])
    };
  } // Replacing old column with new column, keeping the old ID


  var newColumns = _objectSpread({}, layer.columns, _defineProperty({}, metrics[0], newColumn));

  return {
    indexPatternId: indexPattern.id,
    columns: newColumns,
    columnOrder: layer.columnOrder // Order is kept by replacing

  };
}

function addFieldAsBucketOperation(layer, layerId, indexPattern, field) {
  var applicableBucketOperation = getBucketOperation(field);
  var newColumn = (0, _operations.buildColumn)({
    op: applicableBucketOperation,
    columns: layer.columns,
    layerId: layerId,
    indexPattern: indexPattern,
    suggestedPriority: undefined,
    field: field
  });

  var _separateBucketColumn3 = separateBucketColumns(layer),
      _separateBucketColumn4 = _slicedToArray(_separateBucketColumn3, 2),
      buckets = _separateBucketColumn4[0],
      metrics = _separateBucketColumn4[1];

  var newColumnId = (0, _id_generator.generateId)();

  var updatedColumns = _objectSpread({}, layer.columns, _defineProperty({}, newColumnId, newColumn));

  var oldDateHistogramIndex = layer.columnOrder.findIndex(function (columnId) {
    return layer.columns[columnId].operationType === 'date_histogram';
  });
  var oldDateHistogramId = oldDateHistogramIndex > -1 ? layer.columnOrder[oldDateHistogramIndex] : null;
  var updatedColumnOrder = [];

  if (oldDateHistogramId) {
    if (applicableBucketOperation === 'terms') {
      // Insert the new terms bucket above the first date histogram
      updatedColumnOrder = [].concat(_toConsumableArray(buckets.slice(0, oldDateHistogramIndex)), [newColumnId], _toConsumableArray(buckets.slice(oldDateHistogramIndex, buckets.length)), _toConsumableArray(metrics));
    } else if (applicableBucketOperation === 'date_histogram') {
      // Replace date histogram with new date histogram
      delete updatedColumns[oldDateHistogramId];
      updatedColumnOrder = layer.columnOrder.map(function (columnId) {
        return columnId !== oldDateHistogramId ? columnId : newColumnId;
      });
    }
  } else {
    // Insert the new bucket after existing buckets. Users will see the same data
    // they already had, with an extra level of detail.
    updatedColumnOrder = [].concat(_toConsumableArray(buckets), [newColumnId], _toConsumableArray(metrics));
  }

  return {
    indexPatternId: indexPattern.id,
    columns: updatedColumns,
    columnOrder: updatedColumnOrder
  };
}

function getEmptyLayerSuggestionsForField(state, layerId, indexPatternId, field) {
  var indexPattern = state.indexPatterns[indexPatternId];
  var newLayer;

  if (getBucketOperation(field)) {
    newLayer = createNewLayerWithBucketAggregation(layerId, indexPattern, field);
  } else if (indexPattern.timeFieldName && (0, _operations.getOperationTypesForField)(field).length > 0) {
    newLayer = createNewLayerWithMetricAggregation(layerId, indexPattern, field);
  }

  var newLayerSuggestions = newLayer ? [buildSuggestion({
    state: state,
    updatedLayer: newLayer,
    layerId: layerId,
    changeType: 'initial'
  })] : [];
  var metricLayer = createMetricSuggestion(indexPattern, layerId, state, field);
  return metricLayer ? newLayerSuggestions.concat(metricLayer) : newLayerSuggestions;
}

function createNewLayerWithBucketAggregation(layerId, indexPattern, field) {
  var _columns2;

  var countColumn = (0, _operations.buildColumn)({
    op: 'count',
    columns: {},
    indexPattern: indexPattern,
    layerId: layerId,
    suggestedPriority: undefined,
    field: _document_field.documentField
  });
  var col1 = (0, _id_generator.generateId)();
  var col2 = (0, _id_generator.generateId)(); // let column know about count column

  var column = (0, _operations.buildColumn)({
    layerId: layerId,
    op: getBucketOperation(field),
    indexPattern: indexPattern,
    columns: _defineProperty({}, col2, countColumn),
    field: field,
    suggestedPriority: undefined
  });
  return {
    indexPatternId: indexPattern.id,
    columns: (_columns2 = {}, _defineProperty(_columns2, col1, column), _defineProperty(_columns2, col2, countColumn), _columns2),
    columnOrder: [col1, col2]
  };
}

function createNewLayerWithMetricAggregation(layerId, indexPattern, field) {
  var _columns3;

  var dateField = indexPattern.fields.find(function (f) {
    return f.name === indexPattern.timeFieldName;
  });
  var operations = (0, _operations.getOperationTypesForField)(field);
  var column = (0, _operations.buildColumn)({
    op: operations[0],
    columns: {},
    suggestedPriority: undefined,
    field: field,
    indexPattern: indexPattern,
    layerId: layerId
  });
  var dateColumn = (0, _operations.buildColumn)({
    op: 'date_histogram',
    columns: {},
    suggestedPriority: undefined,
    field: dateField,
    indexPattern: indexPattern,
    layerId: layerId
  });
  var col1 = (0, _id_generator.generateId)();
  var col2 = (0, _id_generator.generateId)();
  return {
    indexPatternId: indexPattern.id,
    columns: (_columns3 = {}, _defineProperty(_columns3, col1, dateColumn), _defineProperty(_columns3, col2, column), _columns3),
    columnOrder: [col1, col2]
  };
}

function getDatasourceSuggestionsFromCurrentState(state) {
  var layers = Object.entries(state.layers || {});

  if (layers.length > 1) {
    // Return suggestions that reduce the data to each layer individually
    return layers.map(function (_ref2, index) {
      var _ref3 = _slicedToArray(_ref2, 2),
          layerId = _ref3[0],
          layer = _ref3[1];

      var hasMatchingLayer = layers.some(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            otherLayerId = _ref5[0],
            otherLayer = _ref5[1];

        return otherLayerId !== layerId && otherLayer.indexPatternId === layer.indexPatternId;
      });
      var suggestionTitle = hasMatchingLayer ? _i18n.i18n.translate('xpack.lens.indexPatternSuggestion.removeLayerPositionLabel', {
        defaultMessage: 'Show only layer {layerNumber}',
        values: {
          layerNumber: index + 1
        }
      }) : _i18n.i18n.translate('xpack.lens.indexPatternSuggestion.removeLayerLabel', {
        defaultMessage: 'Show only {indexPatternTitle}',
        values: {
          indexPatternTitle: state.indexPatterns[layer.indexPatternId].title
        }
      });
      return buildSuggestion({
        state: _objectSpread({}, state, {
          layers: _defineProperty({}, layerId, layer)
        }),
        layerId: layerId,
        changeType: 'layers',
        label: suggestionTitle
      });
    }).concat([buildSuggestion({
      state: state,
      layerId: layers[0][0],
      changeType: 'unchanged'
    })]);
  }

  return _lodash.default.flatten(Object.entries(state.layers || {}).filter(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        _id = _ref7[0],
        layer = _ref7[1];

    return layer.columnOrder.length && layer.indexPatternId;
  }).map(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
        layerId = _ref9[0],
        layer = _ref9[1];

    var indexPattern = state.indexPatterns[layer.indexPatternId];

    var _separateBucketColumn5 = separateBucketColumns(layer),
        _separateBucketColumn6 = _slicedToArray(_separateBucketColumn5, 2),
        buckets = _separateBucketColumn6[0],
        metrics = _separateBucketColumn6[1];

    var timeDimension = layer.columnOrder.find(function (columnId) {
      return layer.columns[columnId].isBucketed && layer.columns[columnId].dataType === 'date';
    });
    var timeField = indexPattern.fields.find(function (_ref10) {
      var name = _ref10.name;
      return name === indexPattern.timeFieldName;
    });
    var suggestions = [];

    if (metrics.length === 0) {
      // intermediary chart without metric, don't try to suggest reduced versions
      suggestions.push(buildSuggestion({
        state: state,
        layerId: layerId,
        changeType: 'unchanged'
      }));
    } else if (buckets.length === 0) {
      if (timeField) {
        // suggest current metric over time if there is a default time field
        suggestions.push(createSuggestionWithDefaultDateHistogram(state, layerId, timeField));
      }

      suggestions.push.apply(suggestions, _toConsumableArray(createAlternativeMetricSuggestions(indexPattern, layerId, state))); // also suggest simple current state

      suggestions.push(buildSuggestion({
        state: state,
        layerId: layerId,
        changeType: 'unchanged'
      }));
    } else {
      suggestions.push.apply(suggestions, _toConsumableArray(createSimplifiedTableSuggestions(state, layerId)));

      if (!timeDimension && timeField) {
        // suggest current configuration over time if there is a default time field
        // and no time dimension yet
        suggestions.push(createSuggestionWithDefaultDateHistogram(state, layerId, timeField));
      }

      if (buckets.length === 2) {
        suggestions.push(createChangedNestingSuggestion(state, layerId));
      }
    }

    return suggestions;
  }));
}

function createChangedNestingSuggestion(state, layerId) {
  var layer = state.layers[layerId];

  var _layer$columnOrder = _toArray(layer.columnOrder),
      firstBucket = _layer$columnOrder[0],
      secondBucket = _layer$columnOrder[1],
      rest = _layer$columnOrder.slice(2);

  var updatedLayer = _objectSpread({}, layer, {
    columnOrder: [secondBucket, firstBucket].concat(_toConsumableArray(rest))
  });

  return buildSuggestion({
    state: state,
    layerId: layerId,
    updatedLayer: updatedLayer,
    label: getNestedTitle([layer.columns[secondBucket], layer.columns[firstBucket]]),
    changeType: 'extended'
  });
}

function createMetricSuggestion(indexPattern, layerId, state, field) {
  var operationDefinitionsMap = _lodash.default.indexBy(_definitions.operationDefinitions, 'type');

  var _getOperationTypesFor = (0, _operations.getOperationTypesForField)(field).map(function (type) {
    return operationDefinitionsMap[type].buildColumn({
      field: field,
      indexPattern: indexPattern,
      layerId: layerId,
      columns: {},
      suggestedPriority: 0
    });
  }).filter(function (op) {
    return (op.dataType === 'number' || op.dataType === 'document') && !op.isBucketed;
  }),
      _getOperationTypesFor2 = _slicedToArray(_getOperationTypesFor, 1),
      column = _getOperationTypesFor2[0];

  if (!column) {
    return;
  }

  var newId = (0, _id_generator.generateId)();
  return buildSuggestion({
    layerId: layerId,
    state: state,
    changeType: 'initial',
    updatedLayer: {
      indexPatternId: indexPattern.id,
      columns: _defineProperty({}, newId, column.dataType !== 'document' ? column : (0, _operations.buildColumn)({
        op: 'count',
        columns: {},
        indexPattern: indexPattern,
        layerId: layerId,
        suggestedPriority: undefined,
        field: _document_field.documentField
      })),
      columnOrder: [newId]
    }
  });
}

function getNestedTitle(_ref11) {
  var _ref12 = _slicedToArray(_ref11, 2),
      outerBucket = _ref12[0],
      innerBucket = _ref12[1];

  return _i18n.i18n.translate('xpack.lens.indexpattern.suggestions.nestingChangeLabel', {
    defaultMessage: '{innerOperation} for each {outerOperation}',
    values: {
      innerOperation: innerBucket.sourceField,
      outerOperation: outerBucket.sourceField
    }
  });
}

function createAlternativeMetricSuggestions(indexPattern, layerId, state) {
  var layer = state.layers[layerId];
  var suggestions = [];
  layer.columnOrder.forEach(function (columnId) {
    var column = layer.columns[columnId];

    if (!(0, _utils.hasField)(column)) {
      return;
    }

    var field = indexPattern.fields.find(function (_ref13) {
      var name = _ref13.name;
      return column.sourceField === name;
    });
    var alternativeMetricOperations = (0, _operations.getOperationTypesForField)(field).filter(function (operationType) {
      return operationType !== column.operationType;
    });

    if (alternativeMetricOperations.length === 0) {
      return;
    }

    var newId = (0, _id_generator.generateId)();
    var newColumn = (0, _operations.buildColumn)({
      op: alternativeMetricOperations[0],
      columns: layer.columns,
      indexPattern: indexPattern,
      layerId: layerId,
      field: field,
      suggestedPriority: undefined
    });
    var updatedLayer = {
      indexPatternId: indexPattern.id,
      columns: _defineProperty({}, newId, newColumn),
      columnOrder: [newId]
    };
    suggestions.push(buildSuggestion({
      state: state,
      layerId: layerId,
      updatedLayer: updatedLayer,
      changeType: 'initial'
    }));
  });
  return suggestions;
}

function createSuggestionWithDefaultDateHistogram(state, layerId, timeField) {
  var layer = state.layers[layerId];
  var indexPattern = state.indexPatterns[layer.indexPatternId];
  var newId = (0, _id_generator.generateId)();

  var _separateBucketColumn7 = separateBucketColumns(layer),
      _separateBucketColumn8 = _slicedToArray(_separateBucketColumn7, 2),
      buckets = _separateBucketColumn8[0],
      metrics = _separateBucketColumn8[1];

  var timeColumn = (0, _operations.buildColumn)({
    layerId: layerId,
    op: 'date_histogram',
    indexPattern: indexPattern,
    columns: layer.columns,
    field: timeField,
    suggestedPriority: undefined
  });
  var updatedLayer = {
    indexPatternId: layer.indexPatternId,
    columns: _objectSpread({}, layer.columns, _defineProperty({}, newId, timeColumn)),
    columnOrder: [].concat(_toConsumableArray(buckets), [newId], _toConsumableArray(metrics))
  };
  return buildSuggestion({
    state: state,
    layerId: layerId,
    updatedLayer: updatedLayer,
    label: _i18n.i18n.translate('xpack.lens.indexpattern.suggestions.overTimeLabel', {
      defaultMessage: 'Over time'
    }),
    changeType: 'extended'
  });
}

function createSimplifiedTableSuggestions(state, layerId) {
  var layer = state.layers[layerId];

  var _separateBucketColumn9 = separateBucketColumns(layer),
      _separateBucketColumn10 = _slicedToArray(_separateBucketColumn9, 2),
      availableBucketedColumns = _separateBucketColumn10[0],
      availableMetricColumns = _separateBucketColumn10[1];

  return _lodash.default.flatten(availableBucketedColumns.map(function (_col, index) {
    // build suggestions with fewer buckets
    var bucketedColumns = availableBucketedColumns.slice(0, index + 1);

    var allMetricsSuggestion = _objectSpread({}, layer, {
      columnOrder: [].concat(_toConsumableArray(bucketedColumns), _toConsumableArray(availableMetricColumns))
    });

    if (availableMetricColumns.length > 1) {
      return [allMetricsSuggestion, _objectSpread({}, layer, {
        columnOrder: [].concat(_toConsumableArray(bucketedColumns), [availableMetricColumns[0]])
      })];
    } else {
      return allMetricsSuggestion;
    }
  })).concat(availableMetricColumns.map(function (columnId) {
    // build suggestions with only metrics
    return _objectSpread({}, layer, {
      columnOrder: [columnId]
    });
  })).map(function (updatedLayer) {
    return buildSuggestion({
      state: state,
      layerId: layerId,
      updatedLayer: updatedLayer,
      changeType: layer.columnOrder.length === updatedLayer.columnOrder.length ? 'unchanged' : 'reduced',
      label: updatedLayer.columnOrder.length === 1 ? getMetricSuggestionTitle(updatedLayer, availableMetricColumns.length === 1) : undefined
    });
  });
}

function getMetricSuggestionTitle(layer, onlyMetric) {
  var _layer$columns$layer$ = layer.columns[layer.columnOrder[0]],
      operationType = _layer$columns$layer$.operationType,
      label = _layer$columns$layer$.label;
  return _i18n.i18n.translate('xpack.lens.indexpattern.suggestions.overallLabel', {
    defaultMessage: '{operation} overall',
    values: {
      operation: onlyMetric ? _operations.operationDefinitionMap[operationType].displayName : label
    },
    description: 'Title of a suggested chart containing only a single numerical metric calculated over all available data'
  });
}

function separateBucketColumns(layer) {
  return (0, _lodash.partition)(layer.columnOrder, function (columnId) {
    return layer.columns[columnId].isBucketed;
  });
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOperations = getOperations;
exports.isColumnTransferable = isColumnTransferable;
exports.getOperationDisplay = getOperationDisplay;
exports.getOperationTypesForField = getOperationTypesForField;
exports.isDocumentOperation = isDocumentOperation;
exports.getAvailableOperationsByMetadata = getAvailableOperationsByMetadata;
exports.changeField = changeField;
exports.buildColumn = buildColumn;
Object.defineProperty(exports, "operationDefinitionMap", {
  enumerable: true,
  get: function get() {
    return _definitions.operationDefinitionMap;
  }
});

var _definitions = require("./definitions");

var _document_field = require("../document_field");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Returns all available operation types as a list at runtime.
 * This will be an array of each member of the union type `OperationType`
 * without any guaranteed order
 */
function getOperations() {
  return Object.keys(_definitions.operationDefinitionMap);
}
/**
 * Returns true if the given column can be applied to the given index pattern
 */


function isColumnTransferable(column, newIndexPattern) {
  return _definitions.operationDefinitionMap[column.operationType].isTransferable(column, newIndexPattern);
}
/**
 * Returns a list of the display names of all operations with any guaranteed order.
 */


function getOperationDisplay() {
  var display = {};

  _definitions.operationDefinitions.forEach(function (_ref) {
    var type = _ref.type,
        displayName = _ref.displayName;
    display[type] = {
      type: type,
      displayName: displayName
    };
  });

  return display;
}
/**
 * Returns all `OperationType`s that can build a column using `buildColumn` based on the
 * passed in field.
 */


function getOperationTypesForField(field) {
  return _definitions.operationDefinitions.filter(function (operationDefinition) {
    return 'getPossibleOperationForField' in operationDefinition && operationDefinition.getPossibleOperationForField(field);
  }).sort(function (a, b) {
    return (b.priority || Number.NEGATIVE_INFINITY) - (a.priority || Number.NEGATIVE_INFINITY);
  }).map(function (_ref2) {
    var type = _ref2.type;
    return type;
  });
}

var documentOperations;

function isDocumentOperation(type) {
  // This can't be done at the root level, because it breaks tests, thanks to mocking oddities
  // so we do it here, and cache the result.
  documentOperations = documentOperations || new Set(getOperationTypesForField(_document_field.documentField));
  return documentOperations.has(type);
}

/**
 * Returns all possible operations (matches between operations and fields of the index
 * pattern plus matches for operations and documents of the index pattern) indexed by the
 * meta data of the operation.
 *
 * The resulting list is filtered down by the `filterOperations` function passed in by
 * the current visualization to determine which operations and field are applicable for
 * a given dimension.
 *
 * Example output:
 * ```
 * [
 *    {
 *      operationMetaData: { dataType: 'string', isBucketed: true },
 *      operations: ['terms']
 *    },
 *    {
 *      operationMetaData: { dataType: 'number', isBucketed: false },
 *      operations: ['avg', 'min', 'max']
 *    },
 * ]
 * ```
 */
function getAvailableOperationsByMetadata(indexPattern) {
  var operationByMetadata = {};

  var addToMap = function addToMap(operation, operationMetadata) {
    if (!operationMetadata) return;
    var key = JSON.stringify(operationMetadata);

    if (operationByMetadata[key]) {
      operationByMetadata[key].operations.push(operation);
    } else {
      operationByMetadata[key] = {
        operationMetaData: operationMetadata,
        operations: [operation]
      };
    }
  };

  _definitions.operationDefinitions.forEach(function (operationDefinition) {
    indexPattern.fields.forEach(function (field) {
      addToMap({
        type: 'field',
        operationType: operationDefinition.type,
        field: field.name
      }, getPossibleOperationForField(operationDefinition, field));
    });
  });

  return Object.values(operationByMetadata);
}

function getPossibleOperationForField(operationDefinition, field) {
  return 'getPossibleOperationForField' in operationDefinition ? operationDefinition.getPossibleOperationForField(field) : undefined;
}

function getDefinition(findFunction) {
  var candidates = _definitions.operationDefinitions.filter(findFunction);

  return candidates.reduce(function (a, b) {
    return (a.priority || Number.NEGATIVE_INFINITY) > (b.priority || Number.NEGATIVE_INFINITY) ? a : b;
  });
}
/**
 * Changes the field of the passed in colum. To do so, this method uses the `onFieldChange` function of
 * the operation definition of the column. Returns a new column object with the field changed.
 * @param column The column object with the old field configured
 * @param indexPattern The index pattern associated to the layer of the column
 * @param newField The new field the column should be switched to
 */


function changeField(column, indexPattern, newField) {
  var operationDefinition = _definitions.operationDefinitionMap[column.operationType];

  if (!('onFieldChange' in operationDefinition)) {
    throw new Error("Invariant error: Cannot change field if operation isn't a field based operaiton");
  }

  return operationDefinition.onFieldChange(column, indexPattern, newField);
}
/**
 * Builds a column object based on the context passed in. It tries
 * to find the applicable operation definition and then calls the `buildColumn`
 * function of that definition. It passes in the given `field` (if available),
 * `suggestedPriority`, `layerId` and the currently existing `columns`.
 * * If `op` is specified, the specified operation definition is used directly.
 * * If `asDocumentOperation` is true, the first matching document-operation is used.
 * * If `field` is specified, the first matching field based operation applicable to the field is used.
 */


function buildColumn(_ref3) {
  var op = _ref3.op,
      columns = _ref3.columns,
      field = _ref3.field,
      layerId = _ref3.layerId,
      indexPattern = _ref3.indexPattern,
      suggestedPriority = _ref3.suggestedPriority,
      previousColumn = _ref3.previousColumn;
  var operationDefinition;

  if (op) {
    operationDefinition = _definitions.operationDefinitionMap[op];
  } else if (field) {
    operationDefinition = getDefinition(function (definition) {
      return Boolean(getPossibleOperationForField(definition, field));
    });
  }

  if (!operationDefinition) {
    throw new Error('No suitable operation found for given parameters');
  }

  var baseOptions = {
    columns: columns,
    suggestedPriority: suggestedPriority,
    layerId: layerId,
    indexPattern: indexPattern,
    previousColumn: previousColumn
  };

  if (!field) {
    throw new Error("Invariant error: ".concat(operationDefinition.type, " operation requires field"));
  }

  var newColumn = operationDefinition.buildColumn(_objectSpread({}, baseOptions, {
    field: field
  }));
  return newColumn;
}
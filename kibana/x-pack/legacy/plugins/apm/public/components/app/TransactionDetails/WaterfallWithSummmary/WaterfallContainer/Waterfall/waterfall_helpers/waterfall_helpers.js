"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClockSkew = getClockSkew;
exports.getOrderedWaterfallItems = getOrderedWaterfallItems;
exports.getWaterfall = getWaterfall;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ROOT_ID = 'root';

function getTransactionItem(transaction) {
  var _transaction$parent;

  return {
    docType: 'transaction',
    doc: transaction,
    id: transaction.transaction.id,
    parentId: (_transaction$parent = transaction.parent) === null || _transaction$parent === void 0 ? void 0 : _transaction$parent.id,
    duration: transaction.transaction.duration.us,
    offset: 0,
    skew: 0
  };
}

function getSpanItem(span) {
  var _span$parent;

  return {
    docType: 'span',
    doc: span,
    id: span.span.id,
    parentId: (_span$parent = span.parent) === null || _span$parent === void 0 ? void 0 : _span$parent.id,
    duration: span.span.duration.us,
    offset: 0,
    skew: 0
  };
}

function getErrorItem(error, items, entryWaterfallTransaction) {
  var _ref;

  var entryTimestamp = (_ref = entryWaterfallTransaction === null || entryWaterfallTransaction === void 0 ? void 0 : entryWaterfallTransaction.doc.timestamp.us) !== null && _ref !== void 0 ? _ref : 0;
  var parent = items.find(function (waterfallItem) {
    var _error$parent;

    return waterfallItem.id === ((_error$parent = error.parent) === null || _error$parent === void 0 ? void 0 : _error$parent.id);
  });
  var errorItem = {
    docType: 'error',
    doc: error,
    id: error.error.id,
    parent: parent,
    parentId: parent === null || parent === void 0 ? void 0 : parent.id,
    offset: error.timestamp.us - entryTimestamp,
    skew: 0,
    duration: 0
  };
  return _objectSpread({}, errorItem, {
    skew: getClockSkew(errorItem, parent)
  });
}

function getClockSkew(item, parentItem) {
  if (!parentItem) {
    return 0;
  }

  switch (item.docType) {
    // don't calculate skew for spans and errors. Just use parent's skew
    case 'error':
    case 'span':
      return parentItem.skew;
    // transaction is the inital entry in a service. Calculate skew for this, and it will be propogated to all child spans

    case 'transaction':
      {
        var parentStart = parentItem.doc.timestamp.us + parentItem.skew; // determine if child starts before the parent

        var offsetStart = parentStart - item.doc.timestamp.us;

        if (offsetStart > 0) {
          var latency = Math.max(parentItem.duration - item.duration, 0) / 2;
          return offsetStart + latency;
        } // child transaction starts after parent thus no adjustment is needed


        return 0;
      }
  }
}

function getOrderedWaterfallItems(childrenByParentId, entryWaterfallTransaction) {
  if (!entryWaterfallTransaction) {
    return [];
  }

  var entryTimestamp = entryWaterfallTransaction.doc.timestamp.us;
  var visitedWaterfallItemSet = new Set();

  function getSortedChildren(item, parentItem) {
    if (visitedWaterfallItemSet.has(item)) {
      return [];
    }

    visitedWaterfallItemSet.add(item);
    var children = (0, _lodash.sortBy)(childrenByParentId[item.id] || [], 'doc.timestamp.us');
    item.parent = parentItem; // get offset from the beginning of trace

    item.offset = item.doc.timestamp.us - entryTimestamp; // move the item to the right if it starts before its parent

    item.skew = getClockSkew(item, parentItem);
    var deepChildren = (0, _lodash.flatten)(children.map(function (child) {
      return getSortedChildren(child, item);
    }));
    return [item].concat(_toConsumableArray(deepChildren));
  }

  return getSortedChildren(entryWaterfallTransaction);
}

function getRootTransaction(childrenByParentId) {
  var item = (0, _lodash.first)(childrenByParentId.root);

  if (item && item.docType === 'transaction') {
    return item.doc;
  }
}

function getServiceColors(waterfallItems) {
  var services = (0, _lodash.uniq)(waterfallItems.map(function (item) {
    return item.doc.service.name;
  }));
  var assignedColors = [_eui_theme_light.default.euiColorVis1, _eui_theme_light.default.euiColorVis0, _eui_theme_light.default.euiColorVis3, _eui_theme_light.default.euiColorVis2, _eui_theme_light.default.euiColorVis6, _eui_theme_light.default.euiColorVis7, _eui_theme_light.default.euiColorVis5];
  return (0, _lodash.zipObject)(services, assignedColors);
}

var getWaterfallDuration = function getWaterfallDuration(waterfallItems) {
  return Math.max.apply(Math, _toConsumableArray(waterfallItems.map(function (item) {
    return item.offset + item.skew + item.duration;
  })).concat([0]));
};

var getWaterfallItems = function getWaterfallItems(items) {
  return items.map(function (item) {
    var docType = item.processor.event;

    switch (docType) {
      case 'span':
        return getSpanItem(item);

      case 'transaction':
        return getTransactionItem(item);
    }
  });
};

var getChildrenGroupedByParentId = function getChildrenGroupedByParentId(waterfallItems) {
  return (0, _lodash.groupBy)(waterfallItems, function (item) {
    return item.parentId ? item.parentId : ROOT_ID;
  });
};

var getEntryWaterfallTransaction = function getEntryWaterfallTransaction(entryTransactionId, waterfallItems) {
  return waterfallItems.find(function (item) {
    return item.docType === 'transaction' && item.id === entryTransactionId;
  });
};

function isInEntryTransaction(parentIdLookup, entryTransactionId, currentId) {
  if (currentId === entryTransactionId) {
    return true;
  }

  var parentId = parentIdLookup.get(currentId);

  if (parentId) {
    return isInEntryTransaction(parentIdLookup, entryTransactionId, parentId);
  }

  return false;
}

function getWaterfallErrors(errorDocs, items, entryWaterfallTransaction) {
  var errorItems = errorDocs.map(function (errorDoc) {
    return getErrorItem(errorDoc, items, entryWaterfallTransaction);
  });

  if (!entryWaterfallTransaction) {
    return errorItems;
  }

  var parentIdLookup = [].concat(_toConsumableArray(items), _toConsumableArray(errorItems)).reduce(function (map, _ref2) {
    var id = _ref2.id,
        parentId = _ref2.parentId;
    map.set(id, parentId !== null && parentId !== void 0 ? parentId : ROOT_ID);
    return map;
  }, new Map());
  return errorItems.filter(function (errorItem) {
    return isInEntryTransaction(parentIdLookup, entryWaterfallTransaction === null || entryWaterfallTransaction === void 0 ? void 0 : entryWaterfallTransaction.id, errorItem.id);
  });
}

function getWaterfall(_ref3, entryTransactionId) {
  var trace = _ref3.trace,
      errorsPerTransaction = _ref3.errorsPerTransaction;

  if ((0, _lodash.isEmpty)(trace.items) || !entryTransactionId) {
    return {
      duration: 0,
      items: [],
      errorsPerTransaction: errorsPerTransaction,
      errorsCount: (0, _lodash.sum)(Object.values(errorsPerTransaction)),
      serviceColors: {},
      errorItems: []
    };
  }

  var waterfallItems = getWaterfallItems(trace.items);
  var childrenByParentId = getChildrenGroupedByParentId(waterfallItems);
  var entryWaterfallTransaction = getEntryWaterfallTransaction(entryTransactionId, waterfallItems);
  var items = getOrderedWaterfallItems(childrenByParentId, entryWaterfallTransaction);
  var errorItems = getWaterfallErrors(trace.errorDocs, items, entryWaterfallTransaction);
  var rootTransaction = getRootTransaction(childrenByParentId);
  var duration = getWaterfallDuration(items);
  var serviceColors = getServiceColors(items);
  var entryTransaction = entryWaterfallTransaction === null || entryWaterfallTransaction === void 0 ? void 0 : entryWaterfallTransaction.doc;
  return {
    entryTransaction: entryTransaction,
    rootTransaction: rootTransaction,
    duration: duration,
    items: items,
    errorsPerTransaction: errorsPerTransaction,
    errorsCount: errorItems.length,
    serviceColors: serviceColors,
    errorItems: errorItems
  };
}
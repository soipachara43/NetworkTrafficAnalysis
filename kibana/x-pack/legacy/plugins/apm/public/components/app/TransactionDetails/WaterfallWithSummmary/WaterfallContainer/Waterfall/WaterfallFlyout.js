"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaterfallFlyout = void 0;

var _react = _interopRequireDefault(require("react"));

var _SpanFlyout = require("./SpanFlyout");

var _TransactionFlyout = require("./TransactionFlyout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var WaterfallFlyout = function WaterfallFlyout(_ref) {
  var _currentItem$parent, _currentItem$parent2, _waterfall$rootTransa;

  var waterfallItemId = _ref.waterfallItemId,
      waterfall = _ref.waterfall,
      location = _ref.location,
      toggleFlyout = _ref.toggleFlyout;
  var currentItem = waterfall.items.find(function (item) {
    return item.id === waterfallItemId;
  });

  if (!currentItem) {
    return null;
  }

  switch (currentItem.docType) {
    case 'span':
      var parentTransaction = ((_currentItem$parent = currentItem.parent) === null || _currentItem$parent === void 0 ? void 0 : _currentItem$parent.docType) === 'transaction' ? (_currentItem$parent2 = currentItem.parent) === null || _currentItem$parent2 === void 0 ? void 0 : _currentItem$parent2.doc : undefined;
      return _react.default.createElement(_SpanFlyout.SpanFlyout, {
        totalDuration: waterfall.duration,
        span: currentItem.doc,
        parentTransaction: parentTransaction,
        onClose: function onClose() {
          return toggleFlyout({
            location: location
          });
        }
      });

    case 'transaction':
      return _react.default.createElement(_TransactionFlyout.TransactionFlyout, {
        transaction: currentItem.doc,
        onClose: function onClose() {
          return toggleFlyout({
            location: location
          });
        },
        rootTransactionDuration: (_waterfall$rootTransa = waterfall.rootTransaction) === null || _waterfall$rootTransa === void 0 ? void 0 : _waterfall$rootTransa.transaction.duration.us,
        errorCount: waterfall.errorsPerTransaction[currentItem.id]
      });

    default:
      return null;
  }
};

exports.WaterfallFlyout = WaterfallFlyout;
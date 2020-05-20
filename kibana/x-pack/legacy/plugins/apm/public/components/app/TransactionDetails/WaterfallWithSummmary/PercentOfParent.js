"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PercentOfParent = PercentOfParent;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _formatters = require("../../../../utils/formatters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function PercentOfParent(_ref) {
  var duration = _ref.duration,
      totalDuration = _ref.totalDuration,
      parentType = _ref.parentType;
  totalDuration = totalDuration || duration;
  var isOver100 = duration > totalDuration;
  var percentOfParent = isOver100 ? '>100%' : (0, _formatters.asPercent)(duration, totalDuration, '');

  var percentOfParentText = _i18n.i18n.translate('xpack.apm.percentOfParent', {
    defaultMessage: '({value} of {parentType, select, transaction { transaction } trace {trace} })',
    values: {
      value: percentOfParent,
      parentType: parentType
    }
  });

  var childType = parentType === 'trace' ? 'transaction' : 'span';
  return _react.default.createElement(_react.default.Fragment, null, isOver100 ? _react.default.createElement(_eui.EuiToolTip, {
    content: _i18n.i18n.translate('xpack.apm.transactionDetails.percentOfTraceLabelExplanation', {
      defaultMessage: 'The % of {parentType, select, transaction {transaction} trace {trace} } exceeds 100% because this {childType, select, span {span} transaction {transaction} } takes longer than the root transaction.',
      values: {
        parentType: parentType,
        childType: childType
      }
    })
  }, _react.default.createElement(_react.default.Fragment, null, percentOfParentText)) : percentOfParentText);
}
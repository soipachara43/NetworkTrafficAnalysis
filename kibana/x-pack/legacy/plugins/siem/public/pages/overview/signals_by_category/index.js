"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalsByCategory = void 0;

var _react = _interopRequireWildcard(require("react"));

var _signals_histogram_panel = require("../../detection_engine/components/signals_histogram_panel");

var _config = require("../../detection_engine/components/signals_histogram_panel/config");

var _use_signal_index = require("../../../containers/detection_engine/signals/use_signal_index");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DEFAULT_QUERY = {
  query: '',
  language: 'kuery'
};
var DEFAULT_STACK_BY = 'signal.rule.threat.tactic.name';
var NO_FILTERS = [];

var SignalsByCategoryComponent = function SignalsByCategoryComponent(_ref) {
  var _signalsHistogramOpti;

  var deleteQuery = _ref.deleteQuery,
      _ref$filters = _ref.filters,
      filters = _ref$filters === void 0 ? NO_FILTERS : _ref$filters,
      from = _ref.from,
      _ref$query = _ref.query,
      query = _ref$query === void 0 ? DEFAULT_QUERY : _ref$query,
      setAbsoluteRangeDatePicker = _ref.setAbsoluteRangeDatePicker,
      setQuery = _ref.setQuery,
      to = _ref.to;

  var _useSignalIndex = (0, _use_signal_index.useSignalIndex)(),
      signalIndexName = _useSignalIndex.signalIndexName;

  var updateDateRangeCallback = (0, _react.useCallback)(function (min, max) {
    setAbsoluteRangeDatePicker({
      id: 'global',
      from: min,
      to: max
    });
  }, [setAbsoluteRangeDatePicker]);
  var defaultStackByOption = (_signalsHistogramOpti = _config.signalsHistogramOptions.find(function (o) {
    return o.text === DEFAULT_STACK_BY;
  })) !== null && _signalsHistogramOpti !== void 0 ? _signalsHistogramOpti : _config.signalsHistogramOptions[0];
  return _react.default.createElement(_signals_histogram_panel.SignalsHistogramPanel, {
    deleteQuery: deleteQuery,
    defaultStackByOption: defaultStackByOption,
    filters: filters,
    from: from,
    query: query,
    signalIndexName: signalIndexName,
    setQuery: setQuery,
    showTotalSignalsCount: true,
    showLinkToSignals: true,
    stackByOptions: _config.signalsHistogramOptions,
    legendPosition: 'right',
    to: to,
    title: i18n.SIGNAL_COUNT,
    updateDateRange: updateDateRangeCallback
  });
};

SignalsByCategoryComponent.displayName = 'SignalsByCategoryComponent';

var SignalsByCategory = _react.default.memo(SignalsByCategoryComponent);

exports.SignalsByCategory = SignalsByCategory;
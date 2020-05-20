"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateHistogramOperation = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _state_helpers = require("../../state_helpers");

var _public = require("../../../../../../../../src/plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isValidInterval = _public.search.aggs.isValidInterval;
var autoInterval = 'auto';
var calendarOnlyIntervals = new Set(['w', 'M', 'q', 'y']);
var dateHistogramOperation = {
  type: 'date_histogram',
  displayName: _i18n.i18n.translate('xpack.lens.indexPattern.dateHistogram', {
    defaultMessage: 'Date histogram'
  }),
  getPossibleOperationForField: function getPossibleOperationForField(_ref) {
    var aggregationRestrictions = _ref.aggregationRestrictions,
        aggregatable = _ref.aggregatable,
        type = _ref.type;

    if (type === 'date' && aggregatable && (!aggregationRestrictions || aggregationRestrictions.date_histogram)) {
      return {
        dataType: 'date',
        isBucketed: true,
        scale: 'interval'
      };
    }
  },
  buildColumn: function buildColumn(_ref2) {
    var suggestedPriority = _ref2.suggestedPriority,
        field = _ref2.field;
    var interval = autoInterval;
    var timeZone;

    if (field.aggregationRestrictions && field.aggregationRestrictions.date_histogram) {
      interval = restrictedInterval(field.aggregationRestrictions);
      timeZone = field.aggregationRestrictions.date_histogram.time_zone;
    }

    return {
      label: field.name,
      dataType: 'date',
      operationType: 'date_histogram',
      suggestedPriority: suggestedPriority,
      sourceField: field.name,
      isBucketed: true,
      scale: 'interval',
      params: {
        interval: interval,
        timeZone: timeZone
      }
    };
  },
  isTransferable: function isTransferable(column, newIndexPattern) {
    var newField = newIndexPattern.fields.find(function (field) {
      return field.name === column.sourceField;
    });
    return Boolean(newField && newField.type === 'date' && newField.aggregatable && (!newField.aggregationRestrictions || newField.aggregationRestrictions.date_histogram));
  },
  transfer: function transfer(column, newIndexPattern) {
    var newField = newIndexPattern.fields.find(function (field) {
      return field.name === column.sourceField;
    });

    if (newField && newField.aggregationRestrictions && newField.aggregationRestrictions.date_histogram) {
      var restrictions = newField.aggregationRestrictions.date_histogram;
      return _objectSpread({}, column, {
        params: _objectSpread({}, column.params, {
          timeZone: restrictions.time_zone,
          // TODO this rewrite logic is simplified - if the current interval is a multiple of
          // the restricted interval, we could carry it over directly. However as the current
          // UI does not allow to select multiples of an interval anyway, this is not included yet.
          // If the UI allows to pick more complicated intervals, this should be re-visited.
          interval: restrictedInterval(newField.aggregationRestrictions)
        })
      });
    }

    return column;
  },
  onFieldChange: function onFieldChange(oldColumn, indexPattern, field) {
    return _objectSpread({}, oldColumn, {
      label: field.name,
      sourceField: field.name
    });
  },
  toEsAggsConfig: function toEsAggsConfig(column, columnId) {
    return {
      id: columnId,
      enabled: true,
      type: 'date_histogram',
      schema: 'segment',
      params: {
        field: column.sourceField,
        time_zone: column.params.timeZone,
        useNormalizedEsInterval: true,
        interval: column.params.interval,
        drop_partials: false,
        min_doc_count: 0,
        extended_bounds: {}
      }
    };
  },
  paramEditor: function paramEditor(_ref3) {
    var state = _ref3.state,
        setState = _ref3.setState,
        currentColumn = _ref3.currentColumn,
        layerId = _ref3.layerId,
        dateRange = _ref3.dateRange,
        data = _ref3.data;
    var field = currentColumn && state.indexPatterns[state.layers[layerId].indexPatternId].fields.find(function (currentField) {
      return currentField.name === currentColumn.sourceField;
    });
    var intervalIsRestricted = field.aggregationRestrictions && field.aggregationRestrictions.date_histogram;
    var interval = parseInterval(currentColumn.params.interval); // We force the interval value to 1 if it's empty, since that is the ES behavior,
    // and the isValidInterval function doesn't handle the empty case properly. Fixing
    // isValidInterval involves breaking changes in other areas.

    var isValid = isValidInterval("".concat(interval.value === '' ? '1' : interval.value).concat(interval.unit), restrictedInterval(field.aggregationRestrictions));

    function onChangeAutoInterval(ev) {
      var fromDate = dateRange.fromDate,
          toDate = dateRange.toDate;
      var value = ev.target.checked ? data.search.aggs.calculateAutoTimeExpression({
        from: fromDate,
        to: toDate
      }) || '1h' : autoInterval;
      setState((0, _state_helpers.updateColumnParam)({
        state: state,
        layerId: layerId,
        currentColumn: currentColumn,
        paramName: 'interval',
        value: value
      }));
    }

    var setInterval = function setInterval(newInterval) {
      var isCalendarInterval = calendarOnlyIntervals.has(newInterval.unit);
      var value = "".concat(isCalendarInterval ? '1' : newInterval.value).concat(newInterval.unit || 'd');
      setState((0, _state_helpers.updateColumnParam)({
        state: state,
        layerId: layerId,
        currentColumn: currentColumn,
        value: value,
        paramName: 'interval'
      }));
    };

    return _react.default.createElement(_eui.EuiForm, null, !intervalIsRestricted && _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiSwitch, {
      label: _i18n.i18n.translate('xpack.lens.indexPattern.dateHistogram.autoInterval', {
        defaultMessage: 'Customize time interval'
      }),
      checked: currentColumn.params.interval !== autoInterval,
      onChange: onChangeAutoInterval
    })), currentColumn.params.interval !== autoInterval && _react.default.createElement(_eui.EuiFormRow, {
      label: _i18n.i18n.translate('xpack.lens.indexPattern.dateHistogram.minimumInterval', {
        defaultMessage: 'Minimum interval'
      })
    }, intervalIsRestricted ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.lens.indexPattern.dateHistogram.restrictedInterval",
      defaultMessage: "Interval fixed to {intervalValue} due to aggregation restrictions.",
      values: {
        intervalValue: currentColumn.params.interval
      }
    }) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
      "data-test-subj": "lensDateHistogramValue",
      value: typeof interval.value === 'number' || interval.value === '' ? interval.value : parseInt(interval.value, 10),
      disabled: calendarOnlyIntervals.has(interval.unit),
      isInvalid: !isValid,
      onChange: function onChange(e) {
        setInterval(_objectSpread({}, interval, {
          value: e.target.value
        }));
      }
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSelect, {
      "data-test-subj": "lensDateHistogramUnit",
      value: interval.unit,
      onChange: function onChange(e) {
        setInterval(_objectSpread({}, interval, {
          unit: e.target.value
        }));
      },
      isInvalid: !isValid,
      options: [{
        value: 'ms',
        text: _i18n.i18n.translate('xpack.lens.indexPattern.dateHistogram.milliseconds', {
          defaultMessage: 'milliseconds'
        })
      }, {
        value: 's',
        text: _i18n.i18n.translate('xpack.lens.indexPattern.dateHistogram.seconds', {
          defaultMessage: 'seconds'
        })
      }, {
        value: 'm',
        text: _i18n.i18n.translate('xpack.lens.indexPattern.dateHistogram.minutes', {
          defaultMessage: 'minutes'
        })
      }, {
        value: 'h',
        text: _i18n.i18n.translate('xpack.lens.indexPattern.dateHistogram.hours', {
          defaultMessage: 'hours'
        })
      }, {
        value: 'd',
        text: _i18n.i18n.translate('xpack.lens.indexPattern.dateHistogram.days', {
          defaultMessage: 'days'
        })
      }, {
        value: 'w',
        text: _i18n.i18n.translate('xpack.lens.indexPattern.dateHistogram.week', {
          defaultMessage: 'week'
        })
      }, {
        value: 'M',
        text: _i18n.i18n.translate('xpack.lens.indexPattern.dateHistogram.month', {
          defaultMessage: 'month'
        })
      }, // Quarterly intervals appear to be unsupported by esaggs
      {
        value: 'y',
        text: _i18n.i18n.translate('xpack.lens.indexPattern.dateHistogram.year', {
          defaultMessage: 'year'
        })
      }]
    }))), !isValid && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiTextColor, {
      color: "danger",
      "data-test-subj": "lensDateHistogramError"
    }, _i18n.i18n.translate('xpack.lens.indexPattern.invalidInterval', {
      defaultMessage: 'Invalid interval value'
    }))))));
  }
};
exports.dateHistogramOperation = dateHistogramOperation;

function parseInterval(currentInterval) {
  var interval = currentInterval || '';
  var valueMatch = interval.match(/[\d]+/) || [];
  var unitMatch = interval.match(/[\D]+/) || [];
  var result = parseInt(valueMatch[0] || '', 10);
  return {
    value: isNaN(result) ? '' : result,
    unit: unitMatch[0] || 'h'
  };
}

function restrictedInterval(aggregationRestrictions) {
  if (!aggregationRestrictions || !aggregationRestrictions.date_histogram) {
    return;
  }

  return aggregationRestrictions.date_histogram.calendar_interval || aggregationRestrictions.date_histogram.fixed_interval;
}
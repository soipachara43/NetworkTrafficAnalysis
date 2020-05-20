"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldItem = FieldItem;

var _react = _interopRequireWildcard(require("react"));

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _eui = require("@elastic/eui");

var _new_platform = require("ui/new_platform");

var _eui_charts_theme = require("@elastic/eui/dist/eui_charts_theme");

var _charts = require("@elastic/charts");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../src/plugins/data/public");

var _drag_drop = require("../drag_drop");

var _lens_field_icon = require("./lens_field_icon");

var _lens_ui_telemetry = require("../lens_ui_telemetry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function wrapOnDot(str) {
  // u200B is a non-width white-space character, which allows
  // the browser to efficiently word-wrap right after the dot
  // without us having to draw a lot of extra DOM elements, etc
  return str ? str.replace(/\./g, ".\u200B") : '';
}

function FieldItem(props) {
  var core = props.core,
      field = props.field,
      indexPattern = props.indexPattern,
      highlight = props.highlight,
      exists = props.exists,
      query = props.query,
      dateRange = props.dateRange,
      filters = props.filters,
      hideDetails = props.hideDetails;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      infoIsOpen = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = (0, _react.useState)({
    isLoading: false
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      state = _useState4[0],
      setState = _useState4[1];

  var wrappableName = wrapOnDot(field.name);
  var wrappableHighlight = wrapOnDot(highlight);
  var highlightIndex = wrappableHighlight ? wrappableName.toLowerCase().indexOf(wrappableHighlight.toLowerCase()) : -1;
  var wrappableHighlightableFieldName = highlightIndex < 0 ? wrappableName : _react.default.createElement("span", null, _react.default.createElement("span", null, wrappableName.substr(0, highlightIndex)), _react.default.createElement("strong", null, wrappableName.substr(highlightIndex, wrappableHighlight.length)), _react.default.createElement("span", null, wrappableName.substr(highlightIndex + wrappableHighlight.length)));

  function fetchData() {
    if (state.isLoading || field.type !== 'number' && field.type !== 'string' && field.type !== 'date' && field.type !== 'boolean' && field.type !== 'ip') {
      return;
    }

    setState(function (s) {
      return _objectSpread({}, s, {
        isLoading: true
      });
    });
    core.http.post("/api/lens/index_stats/".concat(indexPattern.title, "/field"), {
      body: JSON.stringify({
        dslQuery: _public.esQuery.buildEsQuery(indexPattern, query, filters, _public.esQuery.getEsQueryConfig(core.uiSettings)),
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
        timeFieldName: indexPattern.timeFieldName,
        field: field
      })
    }).then(function (results) {
      setState(function (s) {
        return _objectSpread({}, s, {
          isLoading: false,
          totalDocuments: results.totalDocuments,
          sampledDocuments: results.sampledDocuments,
          sampledValues: results.sampledValues,
          histogram: results.histogram,
          topValues: results.topValues
        });
      });
    }).catch(function () {
      setState(function (s) {
        return _objectSpread({}, s, {
          isLoading: false
        });
      });
    });
  }

  function togglePopover() {
    if (hideDetails) {
      return;
    }

    setOpen(!infoIsOpen);

    if (!infoIsOpen) {
      (0, _lens_ui_telemetry.trackUiEvent)('indexpattern_field_info_click');
      fetchData();
    }
  }

  return _react.default.createElement(_eui.EuiPopover, {
    id: "lnsFieldListPanel__field",
    className: "lnsFieldItem__popoverAnchor",
    display: "block",
    container: document.querySelector('.application') || undefined,
    button: _react.default.createElement(_drag_drop.DragDrop, {
      label: field.name,
      value: {
        field: field,
        indexPatternId: indexPattern.id
      },
      "data-test-subj": "lnsFieldListPanelField",
      draggable: true,
      className: "lnsFieldItem lnsFieldItem--".concat(field.type, " lnsFieldItem--").concat(exists ? 'exists' : 'missing')
    }, _react.default.createElement(_eui.EuiKeyboardAccessible, null, _react.default.createElement("div", {
      className: "lnsFieldItem__info ".concat(infoIsOpen ? 'lnsFieldItem__info-isOpen' : ''),
      "data-test-subj": "lnsFieldListPanelField-".concat(field.name),
      onClick: function onClick() {
        togglePopover();
      },
      onKeyPress: function onKeyPress(event) {
        if (event.key === 'ENTER') {
          togglePopover();
        }
      },
      "aria-label": _i18n.i18n.translate('xpack.lens.indexPattern.fieldStatsButtonLabel', {
        defaultMessage: 'Click for a field preview, or drag and drop to visualize.'
      })
    }, _react.default.createElement(_lens_field_icon.LensFieldIcon, {
      type: field.type
    }), _react.default.createElement("span", {
      className: "lnsFieldItem__name",
      title: field.name
    }, wrappableHighlightableFieldName), _react.default.createElement(_eui.EuiIconTip, {
      anchorClassName: "lnsFieldItem__infoIcon",
      content: hideDetails ? _i18n.i18n.translate('xpack.lens.indexPattern.fieldItemTooltip', {
        defaultMessage: 'Drag and drop to visualize.'
      }) : _i18n.i18n.translate('xpack.lens.indexPattern.fieldStatsButtonLabel', {
        defaultMessage: 'Click for a field preview, or drag and drop to visualize.'
      }),
      type: "iInCircle",
      color: "subdued",
      size: "s"
    })))),
    isOpen: infoIsOpen,
    closePopover: function closePopover() {
      return setOpen(false);
    },
    anchorPosition: "rightUp",
    panelClassName: "lnsFieldItem__fieldPopoverPanel"
  }, _react.default.createElement(FieldItemPopoverContents, _extends({}, state, props)));
}

function FieldItemPopoverContents(props) {
  var fieldFormats = _new_platform.npStart.plugins.data.fieldFormats;
  var histogram = props.histogram,
      topValues = props.topValues,
      indexPattern = props.indexPattern,
      field = props.field,
      dateRange = props.dateRange,
      core = props.core,
      sampledValues = props.sampledValues;
  var IS_DARK_THEME = core.uiSettings.get('theme:darkMode');
  var chartTheme = IS_DARK_THEME ? _eui_charts_theme.EUI_CHARTS_THEME_DARK.theme : _eui_charts_theme.EUI_CHARTS_THEME_LIGHT.theme;

  if (props.isLoading) {
    return _react.default.createElement(_eui.EuiLoadingSpinner, null);
  } else if ((!props.histogram || props.histogram.buckets.length === 0) && (!props.topValues || props.topValues.buckets.length === 0)) {
    return _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _i18n.i18n.translate('xpack.lens.indexPattern.fieldStatsNoData', {
      defaultMessage: 'No data to display.'
    }));
  }

  var histogramDefault = !!props.histogram;
  var totalValuesCount = topValues && topValues.buckets.reduce(function (prev, bucket) {
    return bucket.count + prev;
  }, 0);
  var otherCount = sampledValues && totalValuesCount ? sampledValues - totalValuesCount : 0;

  if (totalValuesCount && histogram && histogram.buckets.length && topValues && topValues.buckets.length) {
    // Default to histogram when top values are less than 10% of total
    histogramDefault = otherCount / totalValuesCount > 0.9;
  }

  var _useState5 = (0, _react.useState)(histogramDefault),
      _useState6 = _slicedToArray(_useState5, 2),
      showingHistogram = _useState6[0],
      setShowingHistogram = _useState6[1];

  var formatter;

  if (indexPattern.fieldFormatMap && indexPattern.fieldFormatMap[field.name]) {
    var FormatType = fieldFormats.getType(indexPattern.fieldFormatMap[field.name].id);

    if (FormatType) {
      formatter = new FormatType(indexPattern.fieldFormatMap[field.name].params, core.uiSettings.get.bind(core.uiSettings));
    } else {
      formatter = {
        convert: function convert(data) {
          return JSON.stringify(data);
        }
      };
    }
  } else {
    formatter = fieldFormats.getDefaultInstance(field.type, field.esTypes);
  }

  var fromDate = _datemath.default.parse(dateRange.fromDate);

  var toDate = _datemath.default.parse(dateRange.toDate);

  var title = _react.default.createElement(_react.default.Fragment, null);

  if (histogram && histogram.buckets.length && topValues && topValues.buckets.length) {
    title = _react.default.createElement(_eui.EuiButtonGroup, {
      className: "lnsFieldItem__popoverButtonGroup",
      buttonSize: "compressed",
      isFullWidth: true,
      legend: _i18n.i18n.translate('xpack.lens.indexPattern.fieldStatsDisplayToggle', {
        defaultMessage: 'Toggle either the'
      }),
      options: [{
        label: _i18n.i18n.translate('xpack.lens.indexPattern.fieldTopValuesLabel', {
          defaultMessage: 'Top values'
        }),
        id: 'topValues'
      }, {
        label: _i18n.i18n.translate('xpack.lens.indexPattern.fieldDistributionLabel', {
          defaultMessage: 'Distribution'
        }),
        id: 'histogram'
      }],
      onChange: function onChange(optionId) {
        setShowingHistogram(optionId === 'histogram');
      },
      idSelected: showingHistogram ? 'histogram' : 'topValues'
    });
  } else if (field.type === 'date') {
    title = _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.lens.indexPattern.fieldTimeDistributionLabel', {
      defaultMessage: 'Time distribution'
    }));
  } else if (topValues && topValues.buckets.length) {
    title = _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.lens.indexPattern.fieldTopValuesLabel', {
      defaultMessage: 'Top values'
    }));
  }

  function wrapInPopover(el) {
    return _react.default.createElement(_react.default.Fragment, null, title ? _react.default.createElement(_eui.EuiPopoverTitle, null, title) : _react.default.createElement(_react.default.Fragment, null), el, props.totalDocuments ? _react.default.createElement(_eui.EuiPopoverFooter, null, _react.default.createElement(_eui.EuiText, {
      size: "xs",
      textAlign: "center"
    }, props.sampledDocuments && _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.lens.indexPattern.percentageOfLabel', {
      defaultMessage: '{percentage}% of',
      values: {
        percentage: Math.round(props.sampledDocuments / props.totalDocuments * 100)
      }
    })), ' ', _react.default.createElement("strong", null, fieldFormats.getDefaultInstance(_public.KBN_FIELD_TYPES.NUMBER, [_public.ES_FIELD_TYPES.INTEGER]).convert(props.totalDocuments)), ' ', _i18n.i18n.translate('xpack.lens.indexPattern.ofDocumentsLabel', {
      defaultMessage: 'documents'
    }))) : _react.default.createElement(_react.default.Fragment, null));
  }

  if (histogram && histogram.buckets.length) {
    var specId = _i18n.i18n.translate('xpack.lens.indexPattern.fieldStatsCountLabel', {
      defaultMessage: 'Count'
    });

    if (field.type === 'date') {
      return wrapInPopover(_react.default.createElement(_charts.Chart, {
        "data-test-subj": "lnsFieldListPanel-histogram",
        size: {
          height: 200,
          width: 300 - 32
        }
      }, _react.default.createElement(_charts.Settings, {
        tooltip: {
          type: _charts.TooltipType.None
        },
        theme: chartTheme,
        xDomain: fromDate && toDate ? {
          min: fromDate.valueOf(),
          max: toDate.valueOf(),
          minInterval: Math.round((toDate.valueOf() - fromDate.valueOf()) / 10)
        } : undefined
      }), _react.default.createElement(_charts.Axis, {
        id: "key",
        position: _charts.Position.Bottom,
        tickFormat: fromDate && toDate ? (0, _charts.niceTimeFormatter)([fromDate.valueOf(), toDate.valueOf()]) : undefined,
        showOverlappingTicks: true
      }), _react.default.createElement(_charts.BarSeries, {
        data: histogram.buckets,
        id: specId,
        xAccessor: 'key',
        yAccessors: ['count'],
        xScaleType: _charts.ScaleType.Time,
        yScaleType: _charts.ScaleType.Linear,
        timeZone: "local"
      })));
    } else if (showingHistogram || !topValues || !topValues.buckets.length) {
      return wrapInPopover(_react.default.createElement(_charts.Chart, {
        "data-test-subj": "lnsFieldListPanel-histogram",
        size: {
          height: 200,
          width: '100%'
        }
      }, _react.default.createElement(_charts.Settings, {
        rotation: 90,
        tooltip: {
          type: _charts.TooltipType.None
        },
        theme: chartTheme
      }), _react.default.createElement(_charts.Axis, {
        id: "key",
        position: _charts.Position.Left,
        showOverlappingTicks: true,
        tickFormat: function tickFormat(d) {
          return formatter.convert(d);
        }
      }), _react.default.createElement(_charts.BarSeries, {
        data: histogram.buckets,
        id: specId,
        xAccessor: 'key',
        yAccessors: ['count'],
        xScaleType: _charts.ScaleType.Linear,
        yScaleType: _charts.ScaleType.Linear
      })));
    }
  }

  if (props.topValues && props.topValues.buckets.length) {
    return wrapInPopover(_react.default.createElement("div", {
      "data-test-subj": "lnsFieldListPanel-topValues"
    }, props.topValues.buckets.map(function (topValue) {
      var formatted = formatter.convert(topValue.key);
      return _react.default.createElement("div", {
        className: "lnsFieldItem__topValue",
        key: topValue.key
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "stretch",
        key: topValue.key,
        gutterSize: "xs"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: true,
        className: "eui-textTruncate"
      }, formatted === '' ? _react.default.createElement(_eui.EuiText, {
        size: "xs",
        color: "subdued"
      }, _react.default.createElement("em", null, _i18n.i18n.translate('xpack.lens.indexPattern.fieldPanelEmptyStringValue', {
        defaultMessage: 'Empty string'
      }))) : _react.default.createElement(_eui.EuiToolTip, {
        content: formatted,
        delay: "long"
      }, _react.default.createElement(_eui.EuiText, {
        size: "xs",
        color: "subdued",
        className: "eui-textTruncate"
      }, formatted))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiText, {
        size: "xs",
        textAlign: "left",
        color: "accent"
      }, Math.round(topValue.count / props.sampledValues * 100), "%"))), _react.default.createElement(_eui.EuiProgress, {
        className: "lnsFieldItem__topValueProgress",
        value: topValue.count / props.sampledValues,
        max: 1,
        size: "s",
        color: "accent"
      }));
    }), otherCount ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "stretch",
      gutterSize: "xs"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: true,
      className: "eui-textTruncate"
    }, _react.default.createElement(_eui.EuiText, {
      size: "xs",
      className: "eui-textTruncate",
      color: "subdued"
    }, _i18n.i18n.translate('xpack.lens.indexPattern.otherDocsLabel', {
      defaultMessage: 'Other'
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      className: "eui-textTruncate"
    }, _react.default.createElement(_eui.EuiText, {
      size: "s",
      color: "subdued"
    }, Math.round(otherCount / props.sampledValues * 100), "%"))), _react.default.createElement(_eui.EuiProgress, {
      className: "lnsFieldItem__topValueProgress",
      value: otherCount / props.sampledValues,
      max: 1,
      size: "s",
      color: "subdued"
    })) : _react.default.createElement(_react.default.Fragment, null)));
  }

  return _react.default.createElement(_react.default.Fragment, null);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditorAgg = DefaultEditorAgg;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _agg_params = require("./agg_params");

var _agg_group_state = require("./agg_group_state");

var _rows_or_columns = require("./controls/rows_or_columns");

var _radius_ratio_option = require("./controls/radius_ratio_option");

var _schemas = require("../schemas");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DefaultEditorAgg(_ref) {
  var _agg$type;

  var agg = _ref.agg,
      aggIndex = _ref.aggIndex,
      aggIsTooLow = _ref.aggIsTooLow,
      dragHandleProps = _ref.dragHandleProps,
      formIsTouched = _ref.formIsTouched,
      groupName = _ref.groupName,
      isDisabled = _ref.isDisabled,
      isDraggable = _ref.isDraggable,
      isLastBucket = _ref.isLastBucket,
      isRemovable = _ref.isRemovable,
      metricAggs = _ref.metricAggs,
      lastParentPipelineAggTitle = _ref.lastParentPipelineAggTitle,
      state = _ref.state,
      setAggParamValue = _ref.setAggParamValue,
      setStateParamValue = _ref.setStateParamValue,
      onAggTypeChange = _ref.onAggTypeChange,
      onToggleEnableAgg = _ref.onToggleEnableAgg,
      removeAgg = _ref.removeAgg,
      setAggsState = _ref.setAggsState,
      schemas = _ref.schemas;

  var _useState = (0, _react.useState)(agg.brandNew),
      _useState2 = _slicedToArray(_useState, 2),
      isEditorOpen = _useState2[0],
      setIsEditorOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      validState = _useState4[0],
      setValidState = _useState4[1];

  var showDescription = !isEditorOpen && validState;
  var showError = !isEditorOpen && !validState;
  var aggName = (_agg$type = agg.type) === null || _agg$type === void 0 ? void 0 : _agg$type.name;
  var disabledParams;
  var aggError; // When a Parent Pipeline agg is selected and this agg is the last bucket.

  var isLastBucketAgg = isLastBucket && lastParentPipelineAggTitle && agg.type;
  var SchemaComponent;

  if (agg.schema === 'split') {
    SchemaComponent = _rows_or_columns.RowsOrColumnsControl;
  }

  if (agg.schema === 'radius') {
    SchemaComponent = _radius_ratio_option.RadiusRatioOptionControl;
  }

  if (isLastBucketAgg) {
    if (['date_histogram', 'histogram'].includes(aggName)) {
      disabledParams = ['min_doc_count'];
    } else {
      aggError = _i18n.i18n.translate('visDefaultEditor.metrics.wrongLastBucketTypeErrorMessage', {
        defaultMessage: 'Last bucket aggregation must be "Date Histogram" or "Histogram" when using "{type}" metric aggregation.',
        values: {
          type: lastParentPipelineAggTitle
        },
        description: 'Date Histogram and Histogram should not be translated'
      });
    }
  } // A description of the aggregation, for displaying in the collapsed agg header


  var aggDescription = '';

  if (agg.type && agg.type.makeLabel) {
    try {
      aggDescription = agg.type.makeLabel(agg);
    } catch (e) {
      // Date Histogram's `makeLabel` implementation invokes 'write' method for each param, including interval's 'write',
      // which throws an error when interval is undefined.
      aggDescription = '';
    }
  }

  (0, _react.useEffect)(function () {
    if (isLastBucketAgg && ['date_histogram', 'histogram'].includes(aggName)) {
      setAggParamValue(agg.id, 'min_doc_count', // "histogram" agg has an editor for "min_doc_count" param, which accepts boolean
      // "date_histogram" agg doesn't have an editor for "min_doc_count" param, it should be set as a numeric value
      aggName === 'histogram' ? true : 0);
    }
  }, [aggName, isLastBucketAgg, agg.id, setAggParamValue]);
  var setTouched = (0, _react.useCallback)(function (touched) {
    setAggsState({
      type: _agg_group_state.AGGS_ACTION_KEYS.TOUCHED,
      payload: touched,
      aggId: agg.id
    });
  }, [agg.id, setAggsState]);
  var setValidity = (0, _react.useCallback)(function (isValid) {
    setAggsState({
      type: _agg_group_state.AGGS_ACTION_KEYS.VALID,
      payload: isValid,
      aggId: agg.id
    });
    setValidState(isValid);
  }, [agg.id, setAggsState]);
  var onToggle = (0, _react.useCallback)(function (isOpen) {
    setIsEditorOpen(isOpen);

    if (!isOpen) {
      setTouched(true);
    }
  }, [setTouched]);

  var renderAggButtons = function renderAggButtons() {
    var actionIcons = [];

    if (showError) {
      actionIcons.push({
        id: 'hasErrors',
        color: 'danger',
        type: 'alert',
        tooltip: _i18n.i18n.translate('visDefaultEditor.agg.errorsAriaLabel', {
          defaultMessage: 'Aggregation has errors'
        }),
        dataTestSubj: 'hasErrorsAggregationIcon'
      });
    }

    if (agg.enabled && isRemovable) {
      actionIcons.push({
        id: 'disableAggregation',
        color: 'text',
        disabled: isDisabled,
        type: 'eye',
        onClick: function onClick() {
          return onToggleEnableAgg(agg.id, false);
        },
        tooltip: _i18n.i18n.translate('visDefaultEditor.agg.disableAggButtonTooltip', {
          defaultMessage: 'Disable aggregation'
        }),
        dataTestSubj: 'toggleDisableAggregationBtn disable'
      });
    }

    if (!agg.enabled) {
      actionIcons.push({
        id: 'enableAggregation',
        color: 'text',
        type: 'eyeClosed',
        onClick: function onClick() {
          return onToggleEnableAgg(agg.id, true);
        },
        tooltip: _i18n.i18n.translate('visDefaultEditor.agg.enableAggButtonTooltip', {
          defaultMessage: 'Enable aggregation'
        }),
        dataTestSubj: 'toggleDisableAggregationBtn enable'
      });
    }

    if (isDraggable) {
      actionIcons.push({
        id: 'dragHandle',
        type: 'grab',
        tooltip: _i18n.i18n.translate('visDefaultEditor.agg.modifyPriorityButtonTooltip', {
          defaultMessage: 'Modify priority by dragging'
        }),
        dataTestSubj: 'dragHandleBtn'
      });
    }

    if (isRemovable) {
      actionIcons.push({
        id: 'removeDimension',
        color: 'danger',
        type: 'cross',
        onClick: function onClick() {
          return removeAgg(agg.id);
        },
        tooltip: _i18n.i18n.translate('visDefaultEditor.agg.removeDimensionButtonTooltip', {
          defaultMessage: 'Remove dimension'
        }),
        dataTestSubj: 'removeDimensionBtn'
      });
    }

    return _react.default.createElement("div", dragHandleProps, actionIcons.map(function (icon) {
      if (icon.id === 'dragHandle') {
        var _ref2;

        return _react.default.createElement(_eui.EuiIconTip, {
          key: icon.id,
          type: icon.type,
          content: icon.tooltip,
          iconProps: (_ref2 = {}, _defineProperty(_ref2, 'aria-label', icon.tooltip), _defineProperty(_ref2, 'data-test-subj', icon.dataTestSubj), _ref2),
          position: "bottom"
        });
      }

      return _react.default.createElement(_eui.EuiToolTip, {
        key: icon.id,
        position: "bottom",
        content: icon.tooltip
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        disabled: icon.disabled,
        iconType: icon.type,
        color: icon.color,
        onClick: icon.onClick,
        "aria-label": icon.tooltip,
        "data-test-subj": icon.dataTestSubj
      }));
    }));
  };

  var schemaTitle = (0, _schemas.getSchemaByName)(schemas, agg.schema).title;

  var buttonContent = _react.default.createElement(_react.default.Fragment, null, schemaTitle || agg.schema, " ", showDescription && _react.default.createElement("span", null, aggDescription));

  return _react.default.createElement(_eui.EuiAccordion, {
    id: "visEditorAggAccordion".concat(agg.id),
    initialIsOpen: isEditorOpen,
    buttonContent: buttonContent,
    buttonClassName: "eui-textTruncate",
    buttonContentClassName: "visEditorSidebar__aggGroupAccordionButtonContent eui-textTruncate",
    className: "visEditorSidebar__section visEditorSidebar__collapsible visEditorSidebar__collapsible--marginBottom",
    "aria-label": _i18n.i18n.translate('visDefaultEditor.agg.toggleEditorButtonAriaLabel', {
      defaultMessage: 'Toggle {schema} editor',
      values: {
        schema: schemaTitle || agg.schema
      }
    }),
    "data-test-subj": "visEditorAggAccordion".concat(agg.id),
    extraAction: renderAggButtons(),
    onToggle: onToggle
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), SchemaComponent && _react.default.createElement(SchemaComponent, {
    agg: agg,
    editorStateParams: state.params,
    setAggParamValue: setAggParamValue,
    setStateParamValue: setStateParamValue
  }), _react.default.createElement(_agg_params.DefaultEditorAggParams, {
    agg: agg,
    aggError: aggError,
    aggIndex: aggIndex,
    aggIsTooLow: aggIsTooLow,
    disabledParams: disabledParams,
    formIsTouched: formIsTouched,
    groupName: groupName,
    indexPattern: agg.getIndexPattern(),
    metricAggs: metricAggs,
    state: state,
    setAggParamValue: setAggParamValue,
    onAggTypeChange: onAggTypeChange,
    setTouched: setTouched,
    setValidity: setValidity,
    schemas: schemas
  })));
}
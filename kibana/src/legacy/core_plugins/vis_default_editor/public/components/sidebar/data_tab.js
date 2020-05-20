"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditorDataTab = DefaultEditorDataTab;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _public = require("../../../../../../plugins/data/public");

var _agg_group = require("../agg_group");

var _state = require("./state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DefaultEditorDataTab(_ref) {
  var dispatch = _ref.dispatch,
      formIsTouched = _ref.formIsTouched,
      metricAggs = _ref.metricAggs,
      schemas = _ref.schemas,
      state = _ref.state,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity,
      setStateValue = _ref.setStateValue;
  var lastParentPipelineAgg = (0, _react.useMemo)(function () {
    return (0, _lodash.findLast)(metricAggs, function (_ref2) {
      var type = _ref2.type;
      return type.subtype === _public.search.aggs.parentPipelineType;
    });
  }, [metricAggs]);
  var lastParentPipelineAggTitle = lastParentPipelineAgg && lastParentPipelineAgg.type.title;
  var addSchema = (0, _react.useCallback)(function (schema) {
    return dispatch((0, _state.addNewAgg)(schema));
  }, [dispatch]);
  var onAggRemove = (0, _react.useCallback)(function (aggId) {
    return dispatch((0, _state.removeAgg)(aggId, schemas.all || []));
  }, [dispatch, schemas]);
  var onReorderAggs = (0, _react.useCallback)(function () {
    return dispatch(_state.reorderAggs.apply(void 0, arguments));
  }, [dispatch]);
  var onAggParamValueChange = (0, _react.useCallback)(function () {
    return dispatch(_state.setAggParamValue.apply(void 0, arguments));
  }, [dispatch]);
  var onAggTypeChange = (0, _react.useCallback)(function () {
    return dispatch(_state.changeAggType.apply(void 0, arguments));
  }, [dispatch]);
  var onToggleEnableAgg = (0, _react.useCallback)(function () {
    return dispatch(_state.toggleEnabledAgg.apply(void 0, arguments));
  }, [dispatch]);
  var commonProps = {
    addSchema: addSchema,
    formIsTouched: formIsTouched,
    lastParentPipelineAggTitle: lastParentPipelineAggTitle,
    metricAggs: metricAggs,
    state: state,
    reorderAggs: onReorderAggs,
    setAggParamValue: onAggParamValueChange,
    setStateParamValue: setStateValue,
    onAggTypeChange: onAggTypeChange,
    onToggleEnableAgg: onToggleEnableAgg,
    setValidity: setValidity,
    setTouched: setTouched,
    removeAgg: onAggRemove
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_agg_group.DefaultEditorAggGroup, _extends({
    groupName: _public.AggGroupNames.Metrics,
    schemas: schemas.metrics
  }, commonProps)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_agg_group.DefaultEditorAggGroup, _extends({
    groupName: _public.AggGroupNames.Buckets,
    schemas: schemas.buckets
  }, commonProps)));
}
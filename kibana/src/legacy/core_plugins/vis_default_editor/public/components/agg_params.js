"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditorAggParams = DefaultEditorAggParams;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _useUnmount = _interopRequireDefault(require("react-use/lib/useUnmount"));

var _public = require("../../../../../plugins/data/public");

var _agg_select = require("./agg_select");

var _agg_param = require("./agg_param");

var _agg_params_helper = require("./agg_params_helper");

var _agg_params_state = require("./agg_params_state");

var _utils = require("./utils");

var _schemas = require("../schemas");

var _public2 = require("../../../../../plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var FIXED_VALUE_PROP = 'fixedValue';
var DEFAULT_PROP = 'default';

function DefaultEditorAggParams(_ref) {
  var _agg$type, _agg$params, _agg$params$field;

  var agg = _ref.agg,
      aggError = _ref.aggError,
      _ref$aggIndex = _ref.aggIndex,
      aggIndex = _ref$aggIndex === void 0 ? 0 : _ref$aggIndex,
      _ref$aggIsTooLow = _ref.aggIsTooLow,
      aggIsTooLow = _ref$aggIsTooLow === void 0 ? false : _ref$aggIsTooLow,
      className = _ref.className,
      disabledParams = _ref.disabledParams,
      groupName = _ref.groupName,
      formIsTouched = _ref.formIsTouched,
      indexPattern = _ref.indexPattern,
      metricAggs = _ref.metricAggs,
      state = _ref.state,
      setAggParamValue = _ref.setAggParamValue,
      onAggTypeChange = _ref.onAggTypeChange,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity,
      schemas = _ref.schemas,
      _ref$allowedAggs = _ref.allowedAggs,
      allowedAggs = _ref$allowedAggs === void 0 ? [] : _ref$allowedAggs,
      _ref$hideCustomLabel = _ref.hideCustomLabel,
      hideCustomLabel = _ref$hideCustomLabel === void 0 ? false : _ref$hideCustomLabel;
  var schema = (0, _react.useMemo)(function () {
    return (0, _schemas.getSchemaByName)(schemas, agg.schema);
  }, [agg.schema, schemas]);
  var aggFilter = (0, _react.useMemo)(function () {
    return [].concat(_toConsumableArray(allowedAggs), _toConsumableArray(schema.aggFilter || []));
  }, [allowedAggs, schema.aggFilter]);

  var _useKibana = (0, _public2.useKibana)(),
      services = _useKibana.services;

  var aggTypes = (0, _react.useMemo)(function () {
    return services.data.search.aggs.types.getAll();
  }, [services.data.search.aggs.types]);
  var groupedAggTypeOptions = (0, _react.useMemo)(function () {
    return (0, _agg_params_helper.getAggTypeOptions)(aggTypes, agg, indexPattern, groupName, aggFilter);
  }, [aggTypes, agg, indexPattern, groupName, aggFilter]);
  var error = aggIsTooLow ? _i18n.i18n.translate('visDefaultEditor.aggParams.errors.aggWrongRunOrderErrorMessage', {
    defaultMessage: '"{schema}" aggs must run before all other buckets!',
    values: {
      schema: schema.title
    }
  }) : '';
  var aggTypeName = (_agg$type = agg.type) === null || _agg$type === void 0 ? void 0 : _agg$type.name;
  var fieldName = (_agg$params = agg.params) === null || _agg$params === void 0 ? void 0 : (_agg$params$field = _agg$params.field) === null || _agg$params$field === void 0 ? void 0 : _agg$params$field.name;
  var editorConfig = (0, _react.useMemo)(function () {
    return (0, _utils.getEditorConfig)(indexPattern, aggTypeName, fieldName);
  }, [indexPattern, aggTypeName, fieldName]);
  var params = (0, _react.useMemo)(function () {
    return (0, _agg_params_helper.getAggParamsToRender)({
      agg: agg,
      editorConfig: editorConfig,
      metricAggs: metricAggs,
      state: state,
      schemas: schemas,
      hideCustomLabel: hideCustomLabel
    }, services.data.search.__LEGACY.aggTypeFieldFilters);
  }, [agg, editorConfig, metricAggs, state, schemas, hideCustomLabel, services.data.search.__LEGACY.aggTypeFieldFilters]);
  var allParams = [].concat(_toConsumableArray(params.basic), _toConsumableArray(params.advanced));

  var _useReducer = (0, _react.useReducer)(_agg_params_state.aggParamsReducer, allParams, _agg_params_state.initAggParamsState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      paramsState = _useReducer2[0],
      onChangeParamsState = _useReducer2[1];

  var _useReducer3 = (0, _react.useReducer)(_agg_params_state.aggTypeReducer, {
    touched: false,
    valid: true
  }),
      _useReducer4 = _slicedToArray(_useReducer3, 2),
      aggType = _useReducer4[0],
      onChangeAggType = _useReducer4[1];

  var isFormValid = !error && aggType.valid && Object.entries(paramsState).every(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        paramState = _ref3[1];

    return paramState.valid;
  });
  var isAllInvalidParamsTouched = !!error || (0, _agg_params_helper.isInvalidParamsTouched)(agg.type, aggType, paramsState);
  var onAggSelect = (0, _react.useCallback)(function (value) {
    if (agg.type !== value) {
      onAggTypeChange(agg.id, value); // reset touched and valid of params

      onChangeParamsState({
        type: _agg_params_state.AGG_PARAMS_ACTION_KEYS.RESET
      });
    }
  }, [onAggTypeChange, agg]); // reset validity before component destroyed

  (0, _useUnmount.default)(function () {
    return setValidity(true);
  });
  (0, _react.useEffect)(function () {
    Object.entries(editorConfig).forEach(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          param = _ref5[0],
          paramConfig = _ref5[1];

      var paramOptions = agg.type.params.find(function (paramOption) {
        return paramOption.name === param;
      });
      var hasFixedValue = paramConfig.hasOwnProperty(FIXED_VALUE_PROP);
      var hasDefault = paramConfig.hasOwnProperty(DEFAULT_PROP); // If the parameter has a fixed value in the config, set this value.
      // Also for all supported configs we should freeze the editor for this param.

      if (hasFixedValue || hasDefault) {
        var newValue;
        var property = FIXED_VALUE_PROP;
        var typedParamConfig = paramConfig;

        if (hasDefault) {
          property = DEFAULT_PROP;
          typedParamConfig = paramConfig;
        }

        if (paramOptions && paramOptions.deserialize) {
          newValue = paramOptions.deserialize(typedParamConfig[property]);
        } else {
          newValue = typedParamConfig[property];
        } // this check is obligatory to avoid infinite render, because setAggParamValue creates a brand new agg object


        if (agg.params[param] !== newValue) {
          setAggParamValue(agg.id, param, newValue);
        }
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorConfig]);
  (0, _react.useEffect)(function () {
    setTouched(false);
  }, [agg.type, setTouched]);
  (0, _react.useEffect)(function () {
    setValidity(isFormValid);
  }, [isFormValid, agg.type, setValidity]);
  (0, _react.useEffect)(function () {
    // when all invalid controls were touched or they are untouched
    setTouched(isAllInvalidParamsTouched);
  }, [isAllInvalidParamsTouched, setTouched]);
  return _react.default.createElement(_eui.EuiForm, {
    className: className,
    isInvalid: !!error,
    error: error,
    "data-test-subj": "visAggEditorParams"
  }, _react.default.createElement(_agg_select.DefaultEditorAggSelect, {
    aggError: aggError,
    id: agg.id,
    indexPattern: indexPattern,
    value: agg.type,
    aggTypeOptions: groupedAggTypeOptions,
    isSubAggregation: aggIndex >= 1 && groupName === _public.AggGroupNames.Buckets,
    showValidation: formIsTouched || aggType.touched,
    setValue: onAggSelect,
    onChangeAggType: onChangeAggType
  }), params.basic.map(function (param) {
    var model = paramsState[param.aggParam.name] || {
      touched: false,
      valid: true
    };
    return _react.default.createElement(_agg_param.DefaultEditorAggParam, _extends({
      key: "".concat(param.aggParam.name).concat(agg.type ? agg.type.name : ''),
      disabled: disabledParams && disabledParams.includes(param.aggParam.name),
      formIsTouched: formIsTouched,
      showValidation: formIsTouched || model.touched,
      setAggParamValue: setAggParamValue,
      onChangeParamsState: onChangeParamsState
    }, param));
  }), params.advanced.length ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiAccordion, {
    id: "advancedAccordion",
    "data-test-subj": "advancedParams-".concat(agg.id),
    buttonContent: _i18n.i18n.translate('visDefaultEditor.advancedToggle.advancedLinkLabel', {
      defaultMessage: 'Advanced'
    })
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), params.advanced.map(function (param) {
    var model = paramsState[param.aggParam.name] || {
      touched: false,
      valid: true
    };
    return _react.default.createElement(_agg_param.DefaultEditorAggParam, _extends({
      key: "".concat(param.aggParam.name).concat(agg.type ? agg.type.name : ''),
      disabled: disabledParams && disabledParams.includes(param.aggParam.name),
      formIsTouched: formIsTouched,
      showValidation: formIsTouched || model.touched,
      setAggParamValue: setAggParamValue,
      onChangeParamsState: onChangeParamsState
    }, param));
  }))) : null);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepDefineRule = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _rules = require("../../../../../containers/detection_engine/rules");

var _constants = require("../../../../../../common/constants");

var _ml_helpers = require("../../../../../../common/detection_engine/ml_helpers");

var _translations = require("../../../../../components/timeline/translations");

var _use_ml_capabilities = require("../../../../../components/ml_popover/hooks/use_ml_capabilities");

var _kibana = require("../../../../../lib/kibana");

var _helpers = require("../../helpers");

var _types = require("../../types");

var _description_step = require("../description_step");

var _query_bar = require("../query_bar");

var _select_rule_type = require("../select_rule_type");

var _anomaly_threshold_slider = require("../anomaly_threshold_slider");

var _ml_job_select = require("../ml_job_select");

var _pick_timeline = require("../pick_timeline");

var _step_content_wrapper = require("../step_content_wrapper");

var _next_step = require("../next_step");

var _shared_imports = require("../../../../../shared_imports");

var _schema = require("./schema");

var i18n = _interopRequireWildcard(require("./translations"));

var _helpers2 = require("../../create/helpers");

var _has_ml_admin_permissions = require("../../../../../components/ml/permissions/has_ml_admin_permissions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CommonUseField = (0, _shared_imports.getUseField)({
  component: _shared_imports.Field
});
var stepDefineDefaultValue = {
  anomalyThreshold: 50,
  index: [],
  isNew: true,
  machineLearningJobId: '',
  ruleType: 'query',
  queryBar: {
    query: {
      query: '',
      language: 'kuery'
    },
    filters: [],
    saved_id: undefined
  },
  timeline: {
    id: null,
    title: _translations.DEFAULT_TIMELINE_TITLE
  }
};
var MyLabelButton = (0, _styledComponents.default)(_eui.EuiButtonEmpty).withConfig({
  displayName: "MyLabelButton",
  componentId: "sc-17fmlu6-0"
})(["height:18px;font-size:12px;.euiIcon{width:14px;height:14px;}"]);
MyLabelButton.defaultProps = {
  flush: 'right'
};

var StepDefineRuleComponent = function StepDefineRuleComponent(_ref) {
  var _ref$addPadding = _ref.addPadding,
      addPadding = _ref$addPadding === void 0 ? false : _ref$addPadding,
      defaultValues = _ref.defaultValues,
      _ref$descriptionColum = _ref.descriptionColumns,
      descriptionColumns = _ref$descriptionColum === void 0 ? 'singleSplit' : _ref$descriptionColum,
      isReadOnlyView = _ref.isReadOnlyView,
      isLoading = _ref.isLoading,
      _ref$isUpdateView = _ref.isUpdateView,
      isUpdateView = _ref$isUpdateView === void 0 ? false : _ref$isUpdateView,
      setForm = _ref.setForm,
      setStepData = _ref.setStepData;
  var mlCapabilities = (0, _use_ml_capabilities.useMlCapabilities)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      openTimelineSearch = _useState2[0],
      setOpenTimelineSearch = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      indexModified = _useState4[0],
      setIndexModified = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      localIsMlRule = _useState6[0],
      setIsMlRule = _useState6[1];

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_INDEX_KEY),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      indicesConfig = _useUiSetting$2[0];

  var _useState7 = (0, _react.useState)(_objectSpread({}, stepDefineDefaultValue, {
    index: indicesConfig !== null && indicesConfig !== void 0 ? indicesConfig : []
  })),
      _useState8 = _slicedToArray(_useState7, 2),
      myStepData = _useState8[0],
      setMyStepData = _useState8[1];

  var _useFetchIndexPattern = (0, _rules.useFetchIndexPatterns)(myStepData.index),
      _useFetchIndexPattern2 = _slicedToArray(_useFetchIndexPattern, 1),
      _useFetchIndexPattern3 = _useFetchIndexPattern2[0],
      browserFields = _useFetchIndexPattern3.browserFields,
      indexPatternQueryBar = _useFetchIndexPattern3.indexPatterns,
      indexPatternLoadingQueryBar = _useFetchIndexPattern3.isLoading;

  var _useForm = (0, _shared_imports.useForm)({
    defaultValue: myStepData,
    options: {
      stripEmptyFields: false
    },
    schema: _schema.schema
  }),
      form = _useForm.form;

  var clearErrors = (0, _react.useCallback)(function () {
    return form.reset({
      resetValues: false
    });
  }, [form]);
  var onSubmit = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _ref3, isValid, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!setStepData) {
              _context.next = 8;
              break;
            }

            setStepData(_types.RuleStep.defineRule, null, false);
            _context.next = 4;
            return form.submit();

          case 4:
            _ref3 = _context.sent;
            isValid = _ref3.isValid;
            data = _ref3.data;

            if (isValid && setStepData) {
              setStepData(_types.RuleStep.defineRule, data, isValid);
              setMyStepData(_objectSpread({}, data, {
                isNew: false
              }));
            }

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [form]);
  (0, _react.useEffect)(function () {
    var isNew = myStepData.isNew,
        values = _objectWithoutProperties(myStepData, ["isNew"]);

    if (defaultValues != null && !(0, _fastDeepEqual.default)(values, defaultValues)) {
      var newValues = _objectSpread({}, values, {}, defaultValues, {
        isNew: false
      });

      setMyStepData(newValues);
      (0, _helpers.setFieldValue)(form, _schema.schema, newValues);
    }
  }, [defaultValues, setMyStepData, _helpers.setFieldValue]);
  (0, _react.useEffect)(function () {
    if (setForm != null) {
      setForm(_types.RuleStep.defineRule, form);
    }
  }, [form]);
  var handleResetIndices = (0, _react.useCallback)(function () {
    var indexField = form.getFields().index;
    indexField.setValue(indicesConfig);
  }, [form, indicesConfig]);
  var handleOpenTimelineSearch = (0, _react.useCallback)(function () {
    setOpenTimelineSearch(true);
  }, []);
  var handleCloseTimelineSearch = (0, _react.useCallback)(function () {
    setOpenTimelineSearch(false);
  }, []);
  return isReadOnlyView ? _react.default.createElement(_step_content_wrapper.StepContentWrapper, {
    "data-test-subj": "definitionRule",
    addPadding: addPadding
  }, _react.default.createElement(_description_step.StepRuleDescription, {
    columns: descriptionColumns,
    indexPatterns: indexPatternQueryBar,
    schema: (0, _helpers2.filterRuleFieldsForType)(_schema.schema, myStepData.ruleType),
    data: (0, _helpers2.filterRuleFieldsForType)(myStepData, myStepData.ruleType)
  })) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_step_content_wrapper.StepContentWrapper, {
    addPadding: !isUpdateView
  }, _react.default.createElement(_shared_imports.Form, {
    form: form,
    "data-test-subj": "stepDefineRule"
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "ruleType",
    component: _select_rule_type.SelectRuleType,
    componentProps: {
      describedByIds: ['detectionEngineStepDefineRuleType'],
      isReadOnly: isUpdateView,
      hasValidLicense: mlCapabilities.isPlatinumOrTrialLicense,
      isMlAdmin: (0, _has_ml_admin_permissions.hasMlAdminPermissions)(mlCapabilities)
    }
  }), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    style: {
      display: localIsMlRule ? 'none' : 'flex'
    }
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(CommonUseField, {
    path: "index",
    config: _objectSpread({}, _schema.schema.index, {
      labelAppend: indexModified ? _react.default.createElement(MyLabelButton, {
        onClick: handleResetIndices,
        iconType: "refresh"
      }, i18n.RESET_DEFAULT_INDEX) : null
    }),
    componentProps: {
      idAria: 'detectionEngineStepDefineRuleIndices',
      'data-test-subj': 'detectionEngineStepDefineRuleIndices',
      euiFieldProps: {
        fullWidth: true,
        isDisabled: isLoading,
        placeholder: ''
      }
    }
  }), _react.default.createElement(_shared_imports.UseField, {
    path: "queryBar",
    config: _objectSpread({}, _schema.schema.queryBar, {
      labelAppend: _react.default.createElement(MyLabelButton, {
        onClick: handleOpenTimelineSearch
      }, i18n.IMPORT_TIMELINE_QUERY)
    }),
    component: _query_bar.QueryBarDefineRule,
    componentProps: {
      browserFields: browserFields,
      idAria: 'detectionEngineStepDefineRuleQueryBar',
      indexPattern: indexPatternQueryBar,
      isDisabled: isLoading,
      isLoading: indexPatternLoadingQueryBar,
      dataTestSubj: 'detectionEngineStepDefineRuleQueryBar',
      openTimelineSearch: openTimelineSearch,
      onCloseTimelineSearch: handleCloseTimelineSearch
    }
  }))), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    style: {
      display: localIsMlRule ? 'flex' : 'none'
    }
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_shared_imports.UseField, {
    path: "machineLearningJobId",
    component: _ml_job_select.MlJobSelect,
    componentProps: {
      describedByIds: ['detectionEngineStepDefineRulemachineLearningJobId']
    }
  }), _react.default.createElement(_shared_imports.UseField, {
    path: "anomalyThreshold",
    component: _anomaly_threshold_slider.AnomalyThresholdSlider,
    componentProps: {
      describedByIds: ['detectionEngineStepDefineRuleAnomalyThreshold']
    }
  }))), _react.default.createElement(_shared_imports.UseField, {
    path: "timeline",
    component: _pick_timeline.PickTimeline,
    componentProps: {
      idAria: 'detectionEngineStepDefineRuleTimeline',
      isDisabled: isLoading,
      dataTestSubj: 'detectionEngineStepDefineRuleTimeline'
    }
  }), _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: ['index', 'ruleType']
  }, function (_ref4) {
    var index = _ref4.index,
        ruleType = _ref4.ruleType;

    if (index != null) {
      if ((0, _fastDeepEqual.default)(index, indicesConfig) && indexModified) {
        setIndexModified(false);
      } else if (!(0, _fastDeepEqual.default)(index, indicesConfig) && !indexModified) {
        setIndexModified(true);
      }
    }

    if ((0, _ml_helpers.isMlRule)(ruleType) && !localIsMlRule) {
      setIsMlRule(true);
      clearErrors();
    } else if (!(0, _ml_helpers.isMlRule)(ruleType) && localIsMlRule) {
      setIsMlRule(false);
      clearErrors();
    }

    return null;
  }))), !isUpdateView && _react.default.createElement(_next_step.NextStep, {
    dataTestSubj: "define-continue",
    onClick: onSubmit,
    isDisabled: isLoading
  }));
};

var StepDefineRule = (0, _react.memo)(StepDefineRuleComponent);
exports.StepDefineRule = StepDefineRule;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepRuleActions = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _helpers = require("../../helpers");

var _types = require("../../types");

var _description_step = require("../description_step");

var _shared_imports = require("../../../../../shared_imports");

var _step_content_wrapper = require("../step_content_wrapper");

var _throttle_select_field = require("../throttle_select_field");

var _rule_actions_field = require("../rule_actions_field");

var _kibana = require("../../../../../lib/kibana");

var _schema = require("./schema");

var I18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var stepActionsDefaultValue = {
  enabled: true,
  isNew: true,
  actions: [],
  kibanaSiemAppUrl: '',
  throttle: _throttle_select_field.THROTTLE_OPTIONS[0].value
};

var GhostFormField = function GhostFormField() {
  return _react.default.createElement(_react.default.Fragment, null);
};

var StepRuleActionsComponent = function StepRuleActionsComponent(_ref) {
  var _ref$addPadding = _ref.addPadding,
      addPadding = _ref$addPadding === void 0 ? false : _ref$addPadding,
      defaultValues = _ref.defaultValues,
      isReadOnlyView = _ref.isReadOnlyView,
      isLoading = _ref.isLoading,
      _ref$isUpdateView = _ref.isUpdateView,
      isUpdateView = _ref$isUpdateView === void 0 ? false : _ref$isUpdateView,
      setStepData = _ref.setStepData,
      setForm = _ref.setForm,
      actionMessageParams = _ref.actionMessageParams;

  var _useState = (0, _react.useState)(stepActionsDefaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      myStepData = _useState2[0],
      setMyStepData = _useState2[1];

  var _useKibana = (0, _kibana.useKibana)(),
      application = _useKibana.services.application;

  var _useForm = (0, _shared_imports.useForm)({
    defaultValue: myStepData,
    options: {
      stripEmptyFields: false
    },
    schema: _schema.schema
  }),
      form = _useForm.form;

  var kibanaAbsoluteUrl = (0, _react.useMemo)(function () {
    return application.getUrlForApp('siem', {
      absolute: true
    });
  }, [application]);
  var onSubmit = (0, _react.useCallback)(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(enabled) {
      var _ref3, newIsValid, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!setStepData) {
                _context.next = 8;
                break;
              }

              setStepData(_types.RuleStep.ruleActions, null, false);
              _context.next = 4;
              return form.submit();

            case 4:
              _ref3 = _context.sent;
              newIsValid = _ref3.isValid;
              data = _ref3.data;

              if (newIsValid) {
                setStepData(_types.RuleStep.ruleActions, _objectSpread({}, data, {
                  enabled: enabled
                }), newIsValid);
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
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [form]);
  (0, _react.useEffect)(function () {
    var isNew = myStepData.isNew,
        initDefaultValue = _objectWithoutProperties(myStepData, ["isNew"]);

    if (defaultValues != null && !(0, _fastDeepEqual.default)(initDefaultValue, defaultValues)) {
      var myDefaultValues = _objectSpread({}, defaultValues, {
        isNew: false
      });

      setMyStepData(myDefaultValues);
      (0, _helpers.setFieldValue)(form, _schema.schema, myDefaultValues);
    }
  }, [defaultValues]);
  (0, _react.useEffect)(function () {
    if (setForm != null) {
      setForm(_types.RuleStep.ruleActions, form);
    }
  }, [form]);
  var updateThrottle = (0, _react.useCallback)(function (throttle) {
    return setMyStepData(_objectSpread({}, myStepData, {
      throttle: throttle
    }));
  }, [myStepData, setMyStepData]);
  var throttleFieldComponentProps = (0, _react.useMemo)(function () {
    return {
      idAria: 'detectionEngineStepRuleActionsThrottle',
      isDisabled: isLoading,
      dataTestSubj: 'detectionEngineStepRuleActionsThrottle',
      hasNoInitialSelection: false,
      handleChange: updateThrottle,
      euiFieldProps: {
        options: _throttle_select_field.THROTTLE_OPTIONS
      }
    };
  }, [isLoading, updateThrottle]);
  return isReadOnlyView && myStepData != null ? _react.default.createElement(_step_content_wrapper.StepContentWrapper, {
    addPadding: addPadding
  }, _react.default.createElement(_description_step.StepRuleDescription, {
    schema: _schema.schema,
    data: myStepData
  })) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_step_content_wrapper.StepContentWrapper, {
    addPadding: !isUpdateView
  }, _react.default.createElement(_shared_imports.Form, {
    form: form,
    "data-test-subj": "stepRuleActions"
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "throttle",
    component: _throttle_select_field.ThrottleSelectField,
    componentProps: throttleFieldComponentProps
  }), myStepData.throttle !== stepActionsDefaultValue.throttle && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_shared_imports.UseField, {
    path: "actions",
    defaultValue: myStepData.actions,
    component: _rule_actions_field.RuleActionsField,
    componentProps: {
      messageVariables: actionMessageParams
    }
  }), _react.default.createElement(_shared_imports.UseField, {
    path: "kibanaSiemAppUrl",
    defaultValue: kibanaAbsoluteUrl,
    component: GhostFormField
  })), _react.default.createElement(_shared_imports.UseField, {
    path: "enabled",
    defaultValue: myStepData.enabled,
    component: GhostFormField
  }))), !isUpdateView && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "flexEnd",
    gutterSize: "xs",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: false,
    isDisabled: isLoading,
    isLoading: isLoading,
    onClick: onSubmit.bind(null, false)
  }, I18n.COMPLETE_WITHOUT_ACTIVATING)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    isDisabled: isLoading,
    isLoading: isLoading,
    onClick: onSubmit.bind(null, true),
    "data-test-subj": "create-activate"
  }, I18n.COMPLETE_WITH_ACTIVATING)))));
};

var StepRuleActions = (0, _react.memo)(StepRuleActionsComponent);
exports.StepRuleActions = StepRuleActions;
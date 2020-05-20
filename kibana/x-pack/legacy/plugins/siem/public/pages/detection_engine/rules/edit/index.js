"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditRulePage = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _rules = require("../../../../containers/detection_engine/rules");

var _wrapper_page = require("../../../../components/wrapper_page");

var _redirect_to_detection_engine = require("../../../../components/link_to/redirect_to_detection_engine");

var _toasters = require("../../../../components/toasters");

var _spy_routes = require("../../../../utils/route/spy_routes");

var _user_info = require("../../components/user_info");

var _detection_engine_header_page = require("../../components/detection_engine_header_page");

var _step_panel = require("../components/step_panel");

var _step_about_rule = require("../components/step_about_rule");

var _step_define_rule = require("../components/step_define_rule");

var _step_schedule_rule = require("../components/step_schedule_rule");

var _step_rule_actions = require("../components/step_rule_actions");

var _helpers = require("../create/helpers");

var _helpers2 = require("../helpers");

var ruleI18n = _interopRequireWildcard(require("../translations"));

var _types = require("../types");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EditRulePageComponent = function EditRulePageComponent() {
  var _useRef, _ref4;

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var _useUserInfo = (0, _user_info.useUserInfo)(),
      initLoading = _useUserInfo.loading,
      isSignalIndexExists = _useUserInfo.isSignalIndexExists,
      isAuthenticated = _useUserInfo.isAuthenticated,
      hasEncryptionKey = _useUserInfo.hasEncryptionKey,
      canUserCRUD = _useUserInfo.canUserCRUD;

  var _useParams = (0, _reactRouterDom.useParams)(),
      ruleId = _useParams.detailName;

  var _useRule = (0, _rules.useRule)(ruleId),
      _useRule2 = _slicedToArray(_useRule, 2),
      loading = _useRule2[0],
      rule = _useRule2[1];

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      initForm = _useState2[0],
      setInitForm = _useState2[1];

  var _useState3 = (0, _react2.useState)({
    data: null,
    isValid: false
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      myAboutRuleForm = _useState4[0],
      setMyAboutRuleForm = _useState4[1];

  var _useState5 = (0, _react2.useState)({
    data: null,
    isValid: false
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      myDefineRuleForm = _useState6[0],
      setMyDefineRuleForm = _useState6[1];

  var _useState7 = (0, _react2.useState)({
    data: null,
    isValid: false
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      myScheduleRuleForm = _useState8[0],
      setMyScheduleRuleForm = _useState8[1];

  var _useState9 = (0, _react2.useState)({
    data: null,
    isValid: false
  }),
      _useState10 = _slicedToArray(_useState9, 2),
      myActionsRuleForm = _useState10[0],
      setMyActionsRuleForm = _useState10[1];

  var _useState11 = (0, _react2.useState)(),
      _useState12 = _slicedToArray(_useState11, 2),
      selectedTab = _useState12[0],
      setSelectedTab = _useState12[1];

  var stepsForm = (0, _react2.useRef)((_useRef = {}, _defineProperty(_useRef, _types.RuleStep.defineRule, null), _defineProperty(_useRef, _types.RuleStep.aboutRule, null), _defineProperty(_useRef, _types.RuleStep.scheduleRule, null), _defineProperty(_useRef, _types.RuleStep.ruleActions, null), _useRef));

  var _usePersistRule = (0, _rules.usePersistRule)(),
      _usePersistRule2 = _slicedToArray(_usePersistRule, 2),
      _usePersistRule2$ = _usePersistRule2[0],
      isLoading = _usePersistRule2$.isLoading,
      isSaved = _usePersistRule2$.isSaved,
      setRule = _usePersistRule2[1];

  var _useState13 = (0, _react2.useState)([]),
      _useState14 = _slicedToArray(_useState13, 2),
      tabHasError = _useState14[0],
      setTabHasError = _useState14[1];

  var actionMessageParams = (0, _react2.useMemo)(function () {
    return (0, _helpers2.getActionMessageParams)(rule === null || rule === void 0 ? void 0 : rule.type);
  }, [rule]);
  var setStepsForm = (0, _react2.useCallback)(function (step, form) {
    stepsForm.current[step] = form;

    if (initForm && step === (selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.id) && form.isSubmitted === false) {
      setInitForm(false);
      form.submit();
    }
  }, [initForm, selectedTab]);
  var tabs = (0, _react2.useMemo)(function () {
    return [{
      id: _types.RuleStep.defineRule,
      name: ruleI18n.DEFINITION,
      disabled: rule === null || rule === void 0 ? void 0 : rule.immutable,
      content: _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_step_panel.StepPanel, {
        loading: loading || initLoading,
        title: ruleI18n.DEFINITION
      }, myDefineRuleForm.data != null && _react2.default.createElement(_step_define_rule.StepDefineRule, {
        isReadOnlyView: false,
        isLoading: isLoading,
        isUpdateView: true,
        defaultValues: myDefineRuleForm.data,
        setForm: setStepsForm
      }), _react2.default.createElement(_eui.EuiSpacer, null)))
    }, {
      id: _types.RuleStep.aboutRule,
      name: ruleI18n.ABOUT,
      disabled: rule === null || rule === void 0 ? void 0 : rule.immutable,
      content: _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_step_panel.StepPanel, {
        loading: loading || initLoading,
        title: ruleI18n.ABOUT
      }, myAboutRuleForm.data != null && _react2.default.createElement(_step_about_rule.StepAboutRule, {
        isReadOnlyView: false,
        isLoading: isLoading,
        isUpdateView: true,
        defaultValues: myAboutRuleForm.data,
        setForm: setStepsForm
      }), _react2.default.createElement(_eui.EuiSpacer, null)))
    }, {
      id: _types.RuleStep.scheduleRule,
      name: ruleI18n.SCHEDULE,
      disabled: rule === null || rule === void 0 ? void 0 : rule.immutable,
      content: _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_step_panel.StepPanel, {
        loading: loading || initLoading,
        title: ruleI18n.SCHEDULE
      }, myScheduleRuleForm.data != null && _react2.default.createElement(_step_schedule_rule.StepScheduleRule, {
        isReadOnlyView: false,
        isLoading: isLoading,
        isUpdateView: true,
        defaultValues: myScheduleRuleForm.data,
        setForm: setStepsForm
      }), _react2.default.createElement(_eui.EuiSpacer, null)))
    }, {
      id: _types.RuleStep.ruleActions,
      name: ruleI18n.ACTIONS,
      content: _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_step_panel.StepPanel, {
        loading: loading || initLoading,
        title: ruleI18n.ACTIONS
      }, myActionsRuleForm.data != null && _react2.default.createElement(_step_rule_actions.StepRuleActions, {
        isReadOnlyView: false,
        isLoading: isLoading,
        isUpdateView: true,
        defaultValues: myActionsRuleForm.data,
        setForm: setStepsForm,
        actionMessageParams: actionMessageParams
      }), _react2.default.createElement(_eui.EuiSpacer, null)))
    }];
  }, [rule, loading, initLoading, isLoading, myAboutRuleForm, myDefineRuleForm, myScheduleRuleForm, myActionsRuleForm, setStepsForm, stepsForm, actionMessageParams]);
  var onSubmit = (0, _react2.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _stepsForm$current$ac;

    var activeFormId, activeForm, invalidForms;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            activeFormId = selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.id;
            _context.next = 3;
            return (_stepsForm$current$ac = stepsForm.current[activeFormId]) === null || _stepsForm$current$ac === void 0 ? void 0 : _stepsForm$current$ac.submit();

          case 3:
            activeForm = _context.sent;
            invalidForms = [_types.RuleStep.aboutRule, _types.RuleStep.defineRule, _types.RuleStep.scheduleRule, _types.RuleStep.ruleActions].reduce(function (acc, step) {
              if (step === activeFormId && activeForm != null && !(activeForm === null || activeForm === void 0 ? void 0 : activeForm.isValid) || step === _types.RuleStep.aboutRule && !myAboutRuleForm.isValid || step === _types.RuleStep.defineRule && !myDefineRuleForm.isValid || step === _types.RuleStep.scheduleRule && !myScheduleRuleForm.isValid || step === _types.RuleStep.ruleActions && !myActionsRuleForm.isValid) {
                return [].concat(_toConsumableArray(acc), [step]);
              }

              return acc;
            }, []);

            if (invalidForms.length === 0 && activeForm != null) {
              setTabHasError([]);
              setRule(_objectSpread({}, (0, _helpers.formatRule)(activeFormId === _types.RuleStep.defineRule ? activeForm.data : myDefineRuleForm.data, activeFormId === _types.RuleStep.aboutRule ? activeForm.data : myAboutRuleForm.data, activeFormId === _types.RuleStep.scheduleRule ? activeForm.data : myScheduleRuleForm.data, activeFormId === _types.RuleStep.ruleActions ? activeForm.data : myActionsRuleForm.data), {}, ruleId ? {
                id: ruleId
              } : {}));
            } else {
              setTabHasError(invalidForms);
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [stepsForm, myAboutRuleForm, myDefineRuleForm, myScheduleRuleForm, myActionsRuleForm, selectedTab, ruleId]);
  (0, _react2.useEffect)(function () {
    if (rule != null) {
      var _getStepsData = (0, _helpers2.getStepsData)({
        rule: rule
      }),
          aboutRuleData = _getStepsData.aboutRuleData,
          defineRuleData = _getStepsData.defineRuleData,
          scheduleRuleData = _getStepsData.scheduleRuleData,
          ruleActionsData = _getStepsData.ruleActionsData;

      setMyAboutRuleForm({
        data: aboutRuleData,
        isValid: true
      });
      setMyDefineRuleForm({
        data: defineRuleData,
        isValid: true
      });
      setMyScheduleRuleForm({
        data: scheduleRuleData,
        isValid: true
      });
      setMyActionsRuleForm({
        data: ruleActionsData,
        isValid: true
      });
    }
  }, [rule]);
  var onTabClick = (0, _react2.useCallback)(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(tab) {
      var _stepsForm$current$ru, ruleStep, respForm;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(selectedTab != null)) {
                _context2.next = 6;
                break;
              }

              ruleStep = selectedTab.id;
              _context2.next = 4;
              return (_stepsForm$current$ru = stepsForm.current[ruleStep]) === null || _stepsForm$current$ru === void 0 ? void 0 : _stepsForm$current$ru.submit();

            case 4:
              respForm = _context2.sent;

              if (respForm != null) {
                if (ruleStep === _types.RuleStep.aboutRule) {
                  setMyAboutRuleForm({
                    data: respForm.data,
                    isValid: respForm.isValid
                  });
                } else if (ruleStep === _types.RuleStep.defineRule) {
                  setMyDefineRuleForm({
                    data: respForm.data,
                    isValid: respForm.isValid
                  });
                } else if (ruleStep === _types.RuleStep.scheduleRule) {
                  setMyScheduleRuleForm({
                    data: respForm.data,
                    isValid: respForm.isValid
                  });
                } else if (ruleStep === _types.RuleStep.ruleActions) {
                  setMyActionsRuleForm({
                    data: respForm.data,
                    isValid: respForm.isValid
                  });
                }
              }

            case 6:
              setInitForm(true);
              setSelectedTab(tab);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [selectedTab, stepsForm.current]);
  (0, _react2.useEffect)(function () {
    if (rule != null) {
      var _getStepsData2 = (0, _helpers2.getStepsData)({
        rule: rule
      }),
          aboutRuleData = _getStepsData2.aboutRuleData,
          defineRuleData = _getStepsData2.defineRuleData,
          scheduleRuleData = _getStepsData2.scheduleRuleData,
          ruleActionsData = _getStepsData2.ruleActionsData;

      setMyAboutRuleForm({
        data: aboutRuleData,
        isValid: true
      });
      setMyDefineRuleForm({
        data: defineRuleData,
        isValid: true
      });
      setMyScheduleRuleForm({
        data: scheduleRuleData,
        isValid: true
      });
      setMyActionsRuleForm({
        data: ruleActionsData,
        isValid: true
      });
    }
  }, [rule]);
  (0, _react2.useEffect)(function () {
    var tabIndex = (rule === null || rule === void 0 ? void 0 : rule.immutable) ? 3 : 0;
    setSelectedTab(tabs[tabIndex]);
  }, [rule]);

  if (isSaved) {
    var _ref3;

    (0, _toasters.displaySuccessToast)(i18n.SUCCESSFULLY_SAVED_RULE((_ref3 = rule === null || rule === void 0 ? void 0 : rule.name) !== null && _ref3 !== void 0 ? _ref3 : ''), dispatchToaster);
    return _react2.default.createElement(_reactRouterDom.Redirect, {
      to: "/".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME, "/rules/id/").concat(ruleId)
    });
  }

  if ((0, _helpers2.redirectToDetections)(isSignalIndexExists, isAuthenticated, hasEncryptionKey)) {
    return _react2.default.createElement(_reactRouterDom.Redirect, {
      to: "/".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME)
    });
  } else if ((0, _helpers2.userHasNoPermissions)(canUserCRUD)) {
    return _react2.default.createElement(_reactRouterDom.Redirect, {
      to: "/".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME, "/rules/id/").concat(ruleId)
    });
  }

  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_wrapper_page.WrapperPage, {
    restrictWidth: true
  }, _react2.default.createElement(_detection_engine_header_page.DetectionEngineHeaderPage, {
    backOptions: {
      href: "#/".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME, "/rules/id/").concat(ruleId),
      text: "".concat(i18n.BACK_TO, " ").concat((_ref4 = rule === null || rule === void 0 ? void 0 : rule.name) !== null && _ref4 !== void 0 ? _ref4 : '')
    },
    isLoading: isLoading,
    title: i18n.PAGE_TITLE
  }), tabHasError.length > 0 && _react2.default.createElement(_eui.EuiCallOut, {
    title: i18n.SORRY_ERRORS,
    color: "danger",
    iconType: "alert"
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.siem.detectionEngine.rule.editRule.errorMsgDescription",
    defaultMessage: "You have an invalid input in {countError, plural, one {this tab} other {these tabs}}: {tabHasError}",
    values: {
      countError: tabHasError.length,
      tabHasError: tabHasError.map(function (t) {
        if (t === _types.RuleStep.aboutRule) {
          return ruleI18n.ABOUT;
        } else if (t === _types.RuleStep.defineRule) {
          return ruleI18n.DEFINITION;
        } else if (t === _types.RuleStep.scheduleRule) {
          return ruleI18n.SCHEDULE;
        } else if (t === _types.RuleStep.ruleActions) {
          return ruleI18n.RULE_ACTIONS;
        }

        return t;
      }).join(', ')
    }
  })), _react2.default.createElement(_eui.EuiTabbedContent, {
    initialSelectedTab: tabs[0],
    selectedTab: tabs.find(function (t) {
      return t.id === (selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.id);
    }),
    onTabClick: onTabClick,
    tabs: tabs
  }), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s",
    justifyContent: "flexEnd",
    responsive: false
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButton, {
    iconType: "cross",
    href: "#/".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME, "/rules/id/").concat(ruleId)
  }, i18n.CANCEL)), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButton, {
    fill: true,
    onClick: onSubmit,
    iconType: "save",
    isLoading: isLoading,
    isDisabled: initLoading
  }, i18n.SAVE_CHANGES)))), _react2.default.createElement(_spy_routes.SpyRoute, {
    state: {
      ruleName: rule === null || rule === void 0 ? void 0 : rule.name
    }
  }));
};

var EditRulePage = (0, _react2.memo)(EditRulePageComponent);
exports.EditRulePage = EditRulePage;
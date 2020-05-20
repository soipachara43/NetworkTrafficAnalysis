"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRulePage = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _rules = require("../../../../containers/detection_engine/rules");

var _redirect_to_detection_engine = require("../../../../components/link_to/redirect_to_detection_engine");

var _wrapper_page = require("../../../../components/wrapper_page");

var _toasters = require("../../../../components/toasters");

var _spy_routes = require("../../../../utils/route/spy_routes");

var _user_info = require("../../components/user_info");

var _accordion_title = require("../components/accordion_title");

var _step_about_rule = require("../components/step_about_rule");

var _step_define_rule = require("../components/step_define_rule");

var _step_schedule_rule = require("../components/step_schedule_rule");

var _step_rule_actions = require("../components/step_rule_actions");

var _detection_engine_header_page = require("../../components/detection_engine_header_page");

var RuleI18n = _interopRequireWildcard(require("../translations"));

var _helpers = require("../helpers");

var _types = require("../types");

var _helpers2 = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var stepsRuleOrder = [_types.RuleStep.defineRule, _types.RuleStep.aboutRule, _types.RuleStep.scheduleRule, _types.RuleStep.ruleActions];
var MyEuiPanel = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "MyEuiPanel",
  componentId: "yyh8fe-0"
})(["position:relative;z-index:", ";> .euiAccordion > .euiAccordion__triggerWrapper{.euiAccordion__button{cursor:default !important;&:hover{text-decoration:none !important;}}.euiAccordion__iconWrapper{display:none;}}"], function (props) {
  return props.zindex;
});
MyEuiPanel.displayName = 'MyEuiPanel';
var StepDefineRuleAccordion = (0, _styledComponents.default)(_eui.EuiAccordion).withConfig({
  displayName: "StepDefineRuleAccordion",
  componentId: "yyh8fe-1"
})([".euiAccordion__childWrapper{overflow:visible;}"]);
StepDefineRuleAccordion.displayName = 'StepDefineRuleAccordion';

var CreateRulePageComponent = function CreateRulePageComponent() {
  var _useRef, _useRef2, _useState5, _ref2, _ref3, _ref4;

  var _useUserInfo = (0, _user_info.useUserInfo)(),
      loading = _useUserInfo.loading,
      isSignalIndexExists = _useUserInfo.isSignalIndexExists,
      isAuthenticated = _useUserInfo.isAuthenticated,
      hasEncryptionKey = _useUserInfo.hasEncryptionKey,
      canUserCRUD = _useUserInfo.canUserCRUD;

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var _useState = (0, _react.useState)(_types.RuleStep.defineRule),
      _useState2 = _slicedToArray(_useState, 2),
      openAccordionId = _useState2[0],
      setOpenAccordionId = _useState2[1];

  var defineRuleRef = (0, _react.useRef)(null);
  var aboutRuleRef = (0, _react.useRef)(null);
  var scheduleRuleRef = (0, _react.useRef)(null);
  var ruleActionsRef = (0, _react.useRef)(null);
  var stepsForm = (0, _react.useRef)((_useRef = {}, _defineProperty(_useRef, _types.RuleStep.defineRule, null), _defineProperty(_useRef, _types.RuleStep.aboutRule, null), _defineProperty(_useRef, _types.RuleStep.scheduleRule, null), _defineProperty(_useRef, _types.RuleStep.ruleActions, null), _useRef));
  var stepsData = (0, _react.useRef)((_useRef2 = {}, _defineProperty(_useRef2, _types.RuleStep.defineRule, {
    isValid: false,
    data: {}
  }), _defineProperty(_useRef2, _types.RuleStep.aboutRule, {
    isValid: false,
    data: {}
  }), _defineProperty(_useRef2, _types.RuleStep.scheduleRule, {
    isValid: false,
    data: {}
  }), _defineProperty(_useRef2, _types.RuleStep.ruleActions, {
    isValid: false,
    data: {}
  }), _useRef2));

  var _useState3 = (0, _react.useState)((_useState5 = {}, _defineProperty(_useState5, _types.RuleStep.defineRule, false), _defineProperty(_useState5, _types.RuleStep.aboutRule, false), _defineProperty(_useState5, _types.RuleStep.scheduleRule, false), _defineProperty(_useState5, _types.RuleStep.ruleActions, false), _useState5)),
      _useState4 = _slicedToArray(_useState3, 2),
      isStepRuleInReadOnlyView = _useState4[0],
      setIsStepRuleInEditView = _useState4[1];

  var _usePersistRule = (0, _rules.usePersistRule)(),
      _usePersistRule2 = _slicedToArray(_usePersistRule, 2),
      _usePersistRule2$ = _usePersistRule2[0],
      isLoading = _usePersistRule2$.isLoading,
      isSaved = _usePersistRule2$.isSaved,
      setRule = _usePersistRule2[1];

  var actionMessageParams = (0, _react.useMemo)(function () {
    return (0, _helpers.getActionMessageParams)(stepsData.current['define-rule'].data.ruleType);
  }, [stepsData.current['define-rule'].data]);
  var setStepData = (0, _react.useCallback)(function (step, data, isValid) {
    stepsData.current[step] = _objectSpread({}, stepsData.current[step], {
      data: data,
      isValid: isValid
    });

    if (isValid) {
      var stepRuleIdx = stepsRuleOrder.findIndex(function (item) {
        return step === item;
      });

      if ([0, 1, 2].includes(stepRuleIdx)) {
        if (isStepRuleInReadOnlyView[stepsRuleOrder[stepRuleIdx + 1]]) {
          var _objectSpread2;

          setOpenAccordionId(stepsRuleOrder[stepRuleIdx + 1]);
          setIsStepRuleInEditView(_objectSpread({}, isStepRuleInReadOnlyView, (_objectSpread2 = {}, _defineProperty(_objectSpread2, step, true), _defineProperty(_objectSpread2, stepsRuleOrder[stepRuleIdx + 1], false), _objectSpread2)));
        } else if (openAccordionId !== stepsRuleOrder[stepRuleIdx + 1]) {
          setIsStepRuleInEditView(_objectSpread({}, isStepRuleInReadOnlyView, _defineProperty({}, step, true)));
          openCloseAccordion(stepsRuleOrder[stepRuleIdx + 1]);
          setOpenAccordionId(stepsRuleOrder[stepRuleIdx + 1]);
        }
      } else if (stepRuleIdx === 3 && stepsData.current[_types.RuleStep.defineRule].isValid && stepsData.current[_types.RuleStep.aboutRule].isValid && stepsData.current[_types.RuleStep.scheduleRule].isValid) {
        setRule((0, _helpers2.formatRule)(stepsData.current[_types.RuleStep.defineRule].data, stepsData.current[_types.RuleStep.aboutRule].data, stepsData.current[_types.RuleStep.scheduleRule].data, stepsData.current[_types.RuleStep.ruleActions].data));
      }
    }
  }, [isStepRuleInReadOnlyView, openAccordionId, stepsData.current, setRule]);
  var setStepsForm = (0, _react.useCallback)(function (step, form) {
    stepsForm.current[step] = form;
  }, []);
  var getAccordionType = (0, _react.useCallback)(function (accordionId) {
    if (accordionId === openAccordionId) {
      return 'active';
    } else if (stepsData.current[accordionId].isValid) {
      return 'valid';
    }

    return 'passive';
  }, [openAccordionId, stepsData.current]);

  var defineRuleButton = _react.default.createElement(_accordion_title.AccordionTitle, {
    name: "1",
    title: RuleI18n.DEFINE_RULE,
    type: getAccordionType(_types.RuleStep.defineRule)
  });

  var aboutRuleButton = _react.default.createElement(_accordion_title.AccordionTitle, {
    name: "2",
    title: RuleI18n.ABOUT_RULE,
    type: getAccordionType(_types.RuleStep.aboutRule)
  });

  var scheduleRuleButton = _react.default.createElement(_accordion_title.AccordionTitle, {
    name: "3",
    title: RuleI18n.SCHEDULE_RULE,
    type: getAccordionType(_types.RuleStep.scheduleRule)
  });

  var ruleActionsButton = _react.default.createElement(_accordion_title.AccordionTitle, {
    name: "4",
    title: RuleI18n.RULE_ACTIONS,
    type: getAccordionType(_types.RuleStep.ruleActions)
  });

  var openCloseAccordion = function openCloseAccordion(accordionId) {
    if (accordionId != null) {
      if (accordionId === _types.RuleStep.defineRule && defineRuleRef.current != null) {
        defineRuleRef.current.onToggle();
      } else if (accordionId === _types.RuleStep.aboutRule && aboutRuleRef.current != null) {
        aboutRuleRef.current.onToggle();
      } else if (accordionId === _types.RuleStep.scheduleRule && scheduleRuleRef.current != null) {
        scheduleRuleRef.current.onToggle();
      } else if (accordionId === _types.RuleStep.ruleActions && ruleActionsRef.current != null) {
        ruleActionsRef.current.onToggle();
      }
    }
  }; // eslint-disable-next-line react-hooks/rules-of-hooks


  var manageAccordions = (0, _react.useCallback)(function (id, isOpen) {
    var activeRuleIdx = stepsRuleOrder.findIndex(function (step) {
      return step === openAccordionId;
    });
    var stepRuleIdx = stepsRuleOrder.findIndex(function (step) {
      return step === id;
    });

    if ((id === openAccordionId || stepRuleIdx < activeRuleIdx) && !isOpen) {
      openCloseAccordion(id);
    } else if (stepRuleIdx >= activeRuleIdx) {
      if (openAccordionId !== id && !stepsData.current[openAccordionId].isValid && !isStepRuleInReadOnlyView[id] && isOpen) {
        openCloseAccordion(id);
      }
    }
  }, [isStepRuleInReadOnlyView, openAccordionId, stepsData]); // eslint-disable-next-line react-hooks/rules-of-hooks

  var manageIsEditable = (0, _react.useCallback)(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(id) {
      var _stepsForm$current$op;

      var activeForm, _objectSpread4;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (_stepsForm$current$op = stepsForm.current[openAccordionId]) === null || _stepsForm$current$op === void 0 ? void 0 : _stepsForm$current$op.submit();

            case 2:
              activeForm = _context.sent;

              if (activeForm != null && (activeForm === null || activeForm === void 0 ? void 0 : activeForm.isValid)) {
                stepsData.current[openAccordionId] = _objectSpread({}, stepsData.current[openAccordionId], {
                  data: activeForm.data,
                  isValid: activeForm.isValid
                });
                setOpenAccordionId(id);
                setIsStepRuleInEditView(_objectSpread({}, isStepRuleInReadOnlyView, (_objectSpread4 = {}, _defineProperty(_objectSpread4, openAccordionId, true), _defineProperty(_objectSpread4, id, false), _objectSpread4)));
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [isStepRuleInReadOnlyView, openAccordionId]);

  if (isSaved) {
    var ruleName = stepsData.current[_types.RuleStep.aboutRule].data.name;
    (0, _toasters.displaySuccessToast)(i18n.SUCCESSFULLY_CREATED_RULES(ruleName), dispatchToaster);
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: "/".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME, "/rules")
    });
  }

  if ((0, _helpers.redirectToDetections)(isSignalIndexExists, isAuthenticated, hasEncryptionKey)) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: "/".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME)
    });
  } else if ((0, _helpers.userHasNoPermissions)(canUserCRUD)) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: "/".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME, "/rules")
    });
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_wrapper_page.WrapperPage, {
    restrictWidth: true
  }, _react.default.createElement(_detection_engine_header_page.DetectionEngineHeaderPage, {
    backOptions: {
      href: '#detections/rules',
      text: i18n.BACK_TO_RULES
    },
    border: true,
    isLoading: isLoading || loading,
    title: i18n.PAGE_TITLE
  }), _react.default.createElement(MyEuiPanel, {
    zindex: 4
  }, _react.default.createElement(StepDefineRuleAccordion, {
    initialIsOpen: true,
    id: _types.RuleStep.defineRule,
    buttonContent: defineRuleButton,
    paddingSize: "xs",
    ref: defineRuleRef,
    onToggle: manageAccordions.bind(null, _types.RuleStep.defineRule),
    extraAction: stepsData.current[_types.RuleStep.defineRule].isValid && _react.default.createElement(_eui.EuiButtonEmpty, {
      iconType: "pencil",
      size: "xs",
      onClick: manageIsEditable.bind(null, _types.RuleStep.defineRule)
    }, i18n.EDIT_RULE)
  }, _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), _react.default.createElement(_step_define_rule.StepDefineRule, {
    addPadding: true,
    defaultValues: (_ref2 = stepsData.current[_types.RuleStep.defineRule].data) !== null && _ref2 !== void 0 ? _ref2 : null,
    isReadOnlyView: isStepRuleInReadOnlyView[_types.RuleStep.defineRule],
    isLoading: isLoading || loading,
    setForm: setStepsForm,
    setStepData: setStepData,
    descriptionColumns: "singleSplit"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(MyEuiPanel, {
    zindex: 3
  }, _react.default.createElement(_eui.EuiAccordion, {
    initialIsOpen: false,
    id: _types.RuleStep.aboutRule,
    buttonContent: aboutRuleButton,
    paddingSize: "xs",
    ref: aboutRuleRef,
    onToggle: manageAccordions.bind(null, _types.RuleStep.aboutRule),
    extraAction: stepsData.current[_types.RuleStep.aboutRule].isValid && _react.default.createElement(_eui.EuiButtonEmpty, {
      iconType: "pencil",
      size: "xs",
      onClick: manageIsEditable.bind(null, _types.RuleStep.aboutRule)
    }, i18n.EDIT_RULE)
  }, _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), _react.default.createElement(_step_about_rule.StepAboutRule, {
    addPadding: true,
    defaultValues: (_ref3 = stepsData.current[_types.RuleStep.aboutRule].data) !== null && _ref3 !== void 0 ? _ref3 : null,
    descriptionColumns: "singleSplit",
    isReadOnlyView: isStepRuleInReadOnlyView[_types.RuleStep.aboutRule],
    isLoading: isLoading || loading,
    setForm: setStepsForm,
    setStepData: setStepData
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(MyEuiPanel, {
    zindex: 2
  }, _react.default.createElement(_eui.EuiAccordion, {
    initialIsOpen: false,
    id: _types.RuleStep.scheduleRule,
    buttonContent: scheduleRuleButton,
    paddingSize: "xs",
    ref: scheduleRuleRef,
    onToggle: manageAccordions.bind(null, _types.RuleStep.scheduleRule),
    extraAction: stepsData.current[_types.RuleStep.scheduleRule].isValid && _react.default.createElement(_eui.EuiButtonEmpty, {
      iconType: "pencil",
      size: "xs",
      onClick: manageIsEditable.bind(null, _types.RuleStep.scheduleRule)
    }, i18n.EDIT_RULE)
  }, _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), _react.default.createElement(_step_schedule_rule.StepScheduleRule, {
    addPadding: true,
    defaultValues: (_ref4 = stepsData.current[_types.RuleStep.scheduleRule].data) !== null && _ref4 !== void 0 ? _ref4 : null,
    descriptionColumns: "singleSplit",
    isReadOnlyView: isStepRuleInReadOnlyView[_types.RuleStep.scheduleRule],
    isLoading: isLoading || loading,
    setForm: setStepsForm,
    setStepData: setStepData
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(MyEuiPanel, {
    zindex: 1
  }, _react.default.createElement(_eui.EuiAccordion, {
    initialIsOpen: false,
    id: _types.RuleStep.ruleActions,
    buttonContent: ruleActionsButton,
    paddingSize: "xs",
    ref: ruleActionsRef,
    onToggle: manageAccordions.bind(null, _types.RuleStep.ruleActions),
    extraAction: stepsData.current[_types.RuleStep.ruleActions].isValid && _react.default.createElement(_eui.EuiButtonEmpty, {
      iconType: "pencil",
      size: "xs",
      onClick: manageIsEditable.bind(null, _types.RuleStep.ruleActions)
    }, i18n.EDIT_RULE)
  }, _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), _react.default.createElement(_step_rule_actions.StepRuleActions, {
    addPadding: true,
    isReadOnlyView: isStepRuleInReadOnlyView[_types.RuleStep.ruleActions],
    isLoading: isLoading || loading,
    setForm: setStepsForm,
    setStepData: setStepData,
    actionMessageParams: actionMessageParams
  })))), _react.default.createElement(_spy_routes.SpyRoute, null));
};

var CreateRulePage = _react.default.memo(CreateRulePageComponent);

exports.CreateRulePage = CreateRulePage;
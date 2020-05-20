"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepAboutRule = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _helpers = require("../../helpers");

var _types = require("../../types");

var _add_item_form = require("../add_item_form");

var _description_step = require("../description_step");

var _mitre = require("../mitre");

var _shared_imports = require("../../../../../shared_imports");

var _data = require("./data");

var _default_value = require("./default_value");

var _helpers2 = require("./helpers");

var _schema = require("./schema");

var I18n = _interopRequireWildcard(require("./translations"));

var _step_content_wrapper = require("../step_content_wrapper");

var _next_step = require("../next_step");

var _form = require("../../../../../components/markdown_editor/form");

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

var CommonUseField = (0, _shared_imports.getUseField)({
  component: _shared_imports.Field
});

var ThreeQuartersContainer = _styledComponents.default.div.withConfig({
  displayName: "ThreeQuartersContainer",
  componentId: "sc-1hkyuvn-0"
})(["max-width:740px;"]);

ThreeQuartersContainer.displayName = 'ThreeQuartersContainer';

var TagContainer = _styledComponents.default.div.withConfig({
  displayName: "TagContainer",
  componentId: "sc-1hkyuvn-1"
})(["margin-top:16px;"]);

TagContainer.displayName = 'TagContainer';
var AdvancedSettingsAccordion = (0, _styledComponents.default)(_eui.EuiAccordion).withConfig({
  displayName: "AdvancedSettingsAccordion",
  componentId: "sc-1hkyuvn-2"
})([".euiAccordion__iconWrapper{display:none;}.euiAccordion__childWrapper{transition-duration:1ms;}&.euiAccordion-isOpen .euiButtonEmpty__content > svg{transform:rotate(90deg);}"]);

var AdvancedSettingsAccordionButton = _react.default.createElement(_eui.EuiButtonEmpty, {
  flush: "left",
  size: "s",
  iconType: "arrowRight"
}, I18n.ADVANCED_SETTINGS);

var StepAboutRuleComponent = function StepAboutRuleComponent(_ref) {
  var _ref$addPadding = _ref.addPadding,
      addPadding = _ref$addPadding === void 0 ? false : _ref$addPadding,
      defaultValues = _ref.defaultValues,
      _ref$descriptionColum = _ref.descriptionColumns,
      descriptionColumns = _ref$descriptionColum === void 0 ? 'singleSplit' : _ref$descriptionColum,
      isReadOnlyView = _ref.isReadOnlyView,
      _ref$isUpdateView = _ref.isUpdateView,
      isUpdateView = _ref$isUpdateView === void 0 ? false : _ref$isUpdateView,
      isLoading = _ref.isLoading,
      setForm = _ref.setForm,
      setStepData = _ref.setStepData;

  var _useState = (0, _react.useState)(_default_value.stepAboutDefaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      myStepData = _useState2[0],
      setMyStepData = _useState2[1];

  var _useForm = (0, _shared_imports.useForm)({
    defaultValue: myStepData,
    options: {
      stripEmptyFields: false
    },
    schema: _schema.schema
  }),
      form = _useForm.form;

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

            setStepData(_types.RuleStep.aboutRule, null, false);
            _context.next = 4;
            return form.submit();

          case 4:
            _ref3 = _context.sent;
            isValid = _ref3.isValid;
            data = _ref3.data;

            if (isValid) {
              setStepData(_types.RuleStep.aboutRule, data, isValid);
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
      setForm(_types.RuleStep.aboutRule, form);
    }
  }, [form]);
  return isReadOnlyView && myStepData.name != null ? _react.default.createElement(_step_content_wrapper.StepContentWrapper, {
    "data-test-subj": "aboutStep",
    addPadding: addPadding
  }, _react.default.createElement(_description_step.StepRuleDescription, {
    columns: descriptionColumns,
    schema: _schema.schema,
    data: myStepData
  })) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_step_content_wrapper.StepContentWrapper, {
    addPadding: !isUpdateView
  }, _react.default.createElement(_shared_imports.Form, {
    form: form
  }, _react.default.createElement(ThreeQuartersContainer, null, _react.default.createElement(CommonUseField, {
    path: "name",
    componentProps: {
      idAria: 'detectionEngineStepAboutRuleName',
      'data-test-subj': 'detectionEngineStepAboutRuleName',
      euiFieldProps: {
        fullWidth: true,
        disabled: isLoading
      }
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(ThreeQuartersContainer, null, _react.default.createElement(CommonUseField, {
    path: "description",
    componentProps: {
      idAria: 'detectionEngineStepAboutRuleDescription',
      'data-test-subj': 'detectionEngineStepAboutRuleDescription',
      euiFieldProps: {
        disabled: isLoading,
        compressed: true,
        fullWidth: true
      }
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(CommonUseField, {
    path: "severity",
    componentProps: {
      idAria: 'detectionEngineStepAboutRuleSeverity',
      'data-test-subj': 'detectionEngineStepAboutRuleSeverity',
      euiFieldProps: {
        fullWidth: false,
        disabled: isLoading,
        options: _data.severityOptions
      }
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(CommonUseField, {
    path: "riskScore",
    componentProps: {
      idAria: 'detectionEngineStepAboutRuleRiskScore',
      'data-test-subj': 'detectionEngineStepAboutRuleRiskScore',
      euiFieldProps: {
        max: 100,
        min: 0,
        fullWidth: false,
        disabled: isLoading,
        showTicks: true,
        tickInterval: 25
      }
    }
  })), _react.default.createElement(TagContainer, null, _react.default.createElement(CommonUseField, {
    path: "tags",
    componentProps: {
      idAria: 'detectionEngineStepAboutRuleTags',
      'data-test-subj': 'detectionEngineStepAboutRuleTags',
      euiFieldProps: {
        fullWidth: true,
        isDisabled: isLoading,
        placeholder: ''
      }
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(AdvancedSettingsAccordion, {
    "data-test-subj": "advancedSettings",
    id: "advancedSettingsAccordion",
    buttonContent: AdvancedSettingsAccordionButton
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_shared_imports.UseField, {
    path: "references",
    component: _add_item_form.AddItem,
    componentProps: {
      addText: I18n.ADD_REFERENCE,
      idAria: 'detectionEngineStepAboutRuleReferenceUrls',
      isDisabled: isLoading,
      dataTestSubj: 'detectionEngineStepAboutRuleReferenceUrls',
      validate: _helpers2.isUrlInvalid
    }
  }), _react.default.createElement(_shared_imports.UseField, {
    path: "falsePositives",
    component: _add_item_form.AddItem,
    componentProps: {
      addText: I18n.ADD_FALSE_POSITIVE,
      idAria: 'detectionEngineStepAboutRuleFalsePositives',
      isDisabled: isLoading,
      dataTestSubj: 'detectionEngineStepAboutRuleFalsePositives'
    }
  }), _react.default.createElement(_shared_imports.UseField, {
    path: "threat",
    component: _mitre.AddMitreThreat,
    componentProps: {
      idAria: 'detectionEngineStepAboutRuleMitreThreat',
      isDisabled: isLoading,
      dataTestSubj: 'detectionEngineStepAboutRuleMitreThreat'
    }
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(ThreeQuartersContainer, null, _react.default.createElement(_shared_imports.UseField, {
    path: "note",
    component: _form.MarkdownEditorForm,
    componentProps: {
      idAria: 'detectionEngineStepAboutRuleNote',
      isDisabled: isLoading,
      dataTestSubj: 'detectionEngineStepAboutRuleNote',
      placeholder: I18n.ADD_RULE_NOTE_HELP_TEXT
    }
  }))), _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: "severity"
  }, function (_ref4) {
    var severity = _ref4.severity;
    var newRiskScore = _data.defaultRiskScoreBySeverity[severity];
    var severityField = form.getFields().severity;
    var riskScoreField = form.getFields().riskScore;

    if (severityField.value !== severity && newRiskScore != null && riskScoreField.value !== newRiskScore) {
      riskScoreField.setValue(newRiskScore);
    }

    return null;
  }))), !isUpdateView && _react.default.createElement(_next_step.NextStep, {
    dataTestSubj: "about-continue",
    onClick: onSubmit,
    isDisabled: isLoading
  }));
};

var StepAboutRule = (0, _react.memo)(StepAboutRuleComponent);
exports.StepAboutRule = StepAboutRule;
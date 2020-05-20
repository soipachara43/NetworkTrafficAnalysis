"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepAboutRuleToggleDetails = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fp = require("lodash/fp");

var _header_section = require("../../../../../components/header_section");

var _markdown = require("../../../../../components/markdown");

var i18n = _interopRequireWildcard(require("./translations"));

var _step_about_rule = require("../step_about_rule/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MyPanel = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "MyPanel",
  componentId: "sc-1k5i9z4-0"
})(["position:relative;"]);
var FlexGroupFullHeight = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "FlexGroupFullHeight",
  componentId: "sc-1k5i9z4-1"
})(["height:100%;"]);

var VerticalOverflowContainer = _styledComponents.default.div.withConfig({
  displayName: "VerticalOverflowContainer",
  componentId: "sc-1k5i9z4-2"
})(function (props) {
  return {
    'max-height': "".concat(props.maxHeight, "px"),
    'overflow-y': 'hidden'
  };
});

var VerticalOverflowContent = _styledComponents.default.div.withConfig({
  displayName: "VerticalOverflowContent",
  componentId: "sc-1k5i9z4-3"
})(function (props) {
  return {
    'max-height': "".concat(props.maxHeight, "px")
  };
});

var AboutContent = _styledComponents.default.div.withConfig({
  displayName: "AboutContent",
  componentId: "sc-1k5i9z4-4"
})(["height:100%;"]);

var toggleOptions = [{
  id: 'details',
  label: i18n.ABOUT_PANEL_DETAILS_TAB
}, {
  id: 'notes',
  label: i18n.ABOUT_PANEL_NOTES_TAB
}];

var StepAboutRuleToggleDetailsComponent = function StepAboutRuleToggleDetailsComponent(_ref) {
  var stepData = _ref.stepData,
      stepDataDetails = _ref.stepDataDetails,
      loading = _ref.loading;

  var _useState = (0, _react.useState)('details'),
      _useState2 = _slicedToArray(_useState, 2),
      selectedToggleOption = _useState2[0],
      setToggleOption = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      aboutPanelHeight = _useState4[0],
      setAboutPanelHeight = _useState4[1];

  var onResize = (0, _react.useCallback)(function (e) {
    setAboutPanelHeight(e.height);
  }, [setAboutPanelHeight]);
  return _react.default.createElement(MyPanel, null, loading && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "accent",
    position: "absolute"
  }), _react.default.createElement(_header_section.HeaderSection, {
    title: i18n.ABOUT_TEXT
  })), stepData != null && stepDataDetails != null && _react.default.createElement(FlexGroupFullHeight, {
    gutterSize: "xs",
    direction: "column"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1,
    key: "header"
  }, _react.default.createElement(_header_section.HeaderSection, {
    title: i18n.ABOUT_TEXT
  }, !(0, _fp.isEmpty)(stepDataDetails.note) && stepDataDetails.note.trim() !== '' && _react.default.createElement(_eui.EuiButtonGroup, {
    options: toggleOptions,
    idSelected: selectedToggleOption,
    onChange: function onChange(val) {
      setToggleOption(val);
    },
    "data-test-subj": "stepAboutDetailsToggle"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 5,
    key: "details"
  }, selectedToggleOption === 'details' ? _react.default.createElement(_eui.EuiResizeObserver, {
    "data-test-subj": "stepAboutDetailsContent",
    onResize: onResize
  }, function (resizeRef) {
    return _react.default.createElement(AboutContent, {
      ref: resizeRef
    }, _react.default.createElement(VerticalOverflowContainer, {
      maxHeight: 120
    }, _react.default.createElement(VerticalOverflowContent, {
      maxHeight: 120,
      className: "eui-yScrollWithShadows"
    }, _react.default.createElement(_eui.EuiText, {
      size: "s",
      "data-test-subj": "stepAboutRuleDetailsToggleDescriptionText"
    }, stepDataDetails.description))), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_step_about_rule.StepAboutRule, {
      descriptionColumns: "singleSplit",
      isReadOnlyView: true,
      isLoading: false,
      defaultValues: stepData
    }));
  }) : _react.default.createElement(VerticalOverflowContainer, {
    "data-test-subj": "stepAboutDetailsNoteContent",
    maxHeight: aboutPanelHeight
  }, _react.default.createElement(VerticalOverflowContent, {
    maxHeight: aboutPanelHeight,
    className: "eui-yScrollWithShadows"
  }, _react.default.createElement(_markdown.Markdown, {
    raw: stepDataDetails.note
  }))))));
};

var StepAboutRuleToggleDetails = (0, _react.memo)(StepAboutRuleToggleDetailsComponent);
exports.StepAboutRuleToggleDetails = StepAboutRuleToggleDetails;
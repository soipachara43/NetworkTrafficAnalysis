"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Header = function Header(_ref) {
  var isInputInvalid = _ref.isInputInvalid,
      errors = _ref.errors,
      characterList = _ref.characterList,
      query = _ref.query,
      onQueryChanged = _ref.onQueryChanged,
      goToNextStep = _ref.goToNextStep,
      isNextStepDisabled = _ref.isNextStepDisabled,
      rest = _objectWithoutProperties(_ref, ["isInputInvalid", "errors", "characterList", "query", "onQueryChanged", "goToNextStep", "isNextStepDisabled"]);

  return _react.default.createElement("div", rest, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.createIndexPattern.stepHeader",
    defaultMessage: "Step 1 of 2: Define index pattern"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiForm, {
    isInvalid: isInputInvalid
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.step.indexPatternLabel",
      defaultMessage: "Index pattern"
    }),
    isInvalid: isInputInvalid,
    error: errors,
    helpText: _react.default.createElement("div", null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.step.indexPattern.allowLabel",
      defaultMessage: "You can use a {asterisk} as a wildcard in your index pattern.",
      values: {
        asterisk: _react.default.createElement("strong", null, "*")
      }
    })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.step.indexPattern.disallowLabel",
      defaultMessage: "You can't use spaces or the characters {characterList}.",
      values: {
        characterList: _react.default.createElement("strong", null, characterList)
      }
    })))
  }, _react.default.createElement(_eui.EuiFieldText, {
    name: "indexPattern",
    placeholder: _i18n.i18n.translate('kbn.management.createIndexPattern.step.indexPatternPlaceholder', {
      defaultMessage: 'index-name-*'
    }),
    value: query,
    isInvalid: isInputInvalid,
    onChange: onQueryChanged,
    "data-test-subj": "createIndexPatternNameInput"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    iconType: "arrowRight",
    onClick: function onClick() {
      return goToNextStep(query);
    },
    isDisabled: isNextStepDisabled,
    "data-test-subj": "createIndexPatternGoToStep2Button"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.createIndexPattern.step.nextStepButton",
    defaultMessage: "Next step"
  })))));
};

exports.Header = Header;
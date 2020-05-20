"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulEditDataProvider = exports.getInitialOperatorLabel = exports.HeaderContainer = void 0;

var _fp = require("lodash/fp");

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EDIT_DATA_PROVIDER_WIDTH = 400;
var FIELD_COMBO_BOX_WIDTH = 195;
var OPERATOR_COMBO_BOX_WIDTH = 160;
var SAVE_CLASS_NAME = 'edit-data-provider-save';
var VALUE_INPUT_CLASS_NAME = 'edit-data-provider-value';

var HeaderContainer = _styledComponents.default.div.withConfig({
  displayName: "HeaderContainer",
  componentId: "sc-13z6yv0-0"
})(["width:", ";"], EDIT_DATA_PROVIDER_WIDTH);

exports.HeaderContainer = HeaderContainer;
HeaderContainer.displayName = 'HeaderContainer';

var sanatizeValue = function sanatizeValue(value) {
  return Array.isArray(value) ? "".concat(value[0]) : "".concat(value);
}; // fun fact: value should never be an array


var getInitialOperatorLabel = function getInitialOperatorLabel(isExcluded, operator) {
  if (operator === ':') {
    return isExcluded ? [{
      label: i18n.IS_NOT
    }] : [{
      label: i18n.IS
    }];
  } else {
    return isExcluded ? [{
      label: i18n.DOES_NOT_EXIST
    }] : [{
      label: i18n.EXISTS
    }];
  }
};

exports.getInitialOperatorLabel = getInitialOperatorLabel;

var StatefulEditDataProvider = _react.default.memo(function (_ref) {
  var andProviderId = _ref.andProviderId,
      browserFields = _ref.browserFields,
      field = _ref.field,
      isExcluded = _ref.isExcluded,
      onDataProviderEdited = _ref.onDataProviderEdited,
      operator = _ref.operator,
      providerId = _ref.providerId,
      timelineId = _ref.timelineId,
      value = _ref.value;

  var _useState = (0, _react.useState)([{
    label: field
  }]),
      _useState2 = _slicedToArray(_useState, 2),
      updatedField = _useState2[0],
      setUpdatedField = _useState2[1];

  var _useState3 = (0, _react.useState)(getInitialOperatorLabel(isExcluded, operator)),
      _useState4 = _slicedToArray(_useState3, 2),
      updatedOperator = _useState4[0],
      setUpdatedOperator = _useState4[1];

  var _useState5 = (0, _react.useState)(value),
      _useState6 = _slicedToArray(_useState5, 2),
      updatedValue = _useState6[0],
      setUpdatedValue = _useState6[1];
  /** Focuses the Value input if it is visible, falling back to the Save button if it's not */


  var focusInput = function focusInput() {
    var elements = document.getElementsByClassName(VALUE_INPUT_CLASS_NAME);

    if (elements.length > 0) {
      elements[0].focus(); // this cast is required because focus() does not exist on every `Element` returned by `getElementsByClassName`
    } else {
      var saveElements = document.getElementsByClassName(SAVE_CLASS_NAME);

      if (saveElements.length > 0) {
        saveElements[0].focus();
      }
    }
  };

  var onFieldSelected = (0, _react.useCallback)(function (selectedField) {
    setUpdatedField(selectedField);
    focusInput();
  }, []);
  var onOperatorSelected = (0, _react.useCallback)(function (operatorSelected) {
    setUpdatedOperator(operatorSelected);
    focusInput();
  }, []);
  var onValueChange = (0, _react.useCallback)(function (e) {
    setUpdatedValue(e.target.value);
  }, []);

  var disableScrolling = function disableScrolling() {
    var x = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    var y = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    window.onscroll = function () {
      return window.scrollTo(x, y);
    };
  };

  var enableScrolling = function enableScrolling() {
    window.onscroll = function () {
      return _fp.noop;
    };
  };

  (0, _react.useEffect)(function () {
    disableScrolling();
    focusInput();
    return function () {
      enableScrolling();
    };
  }, []);
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "row",
    gutterSize: "none",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: i18n.FIELD
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: updatedField.length > 0 ? updatedField[0].label : null
  }, _react.default.createElement(_eui.EuiComboBox, {
    "data-test-subj": "field",
    isClearable: false,
    onChange: onFieldSelected,
    options: (0, _helpers.getCategorizedFieldNames)(browserFields),
    placeholder: i18n.FIELD_PLACEHOLDER,
    selectedOptions: updatedField,
    singleSelection: {
      asPlainText: true
    },
    style: {
      width: "".concat(FIELD_COMBO_BOX_WIDTH, "px")
    }
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: i18n.OPERATOR
  }, _react.default.createElement(_eui.EuiComboBox, {
    "data-test-subj": "operator",
    isClearable: false,
    onChange: onOperatorSelected,
    options: _helpers.operatorLabels,
    placeholder: i18n.SELECT_AN_OPERATOR,
    selectedOptions: updatedOperator,
    singleSelection: {
      asPlainText: true
    },
    style: {
      width: "".concat(OPERATOR_COMBO_BOX_WIDTH, "px")
    }
  }))))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSpacer, null)), updatedOperator.length > 0 && updatedOperator[0].label !== i18n.EXISTS && updatedOperator[0].label !== i18n.DOES_NOT_EXIST ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: i18n.VALUE_LABEL
  }, _react.default.createElement(_eui.EuiFieldText, {
    className: VALUE_INPUT_CLASS_NAME,
    "data-test-subj": "value",
    onChange: onValueChange,
    placeholder: i18n.VALUE,
    value: sanatizeValue(updatedValue)
  }))) : null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSpacer, null)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    autoFocus: true,
    className: SAVE_CLASS_NAME,
    color: "primary",
    "data-test-subj": "save",
    fill: true,
    isDisabled: !(0, _helpers.selectionsAreValid)({
      browserFields: browserFields,
      selectedField: updatedField,
      selectedOperator: updatedOperator
    }),
    onClick: function onClick() {
      onDataProviderEdited({
        andProviderId: andProviderId,
        excluded: (0, _helpers.getExcludedFromSelection)(updatedOperator),
        field: updatedField.length > 0 ? updatedField[0].label : '',
        id: timelineId,
        operator: (0, _helpers.getQueryOperatorFromSelection)(updatedOperator),
        providerId: providerId,
        value: updatedValue
      });
    },
    size: "s"
  }, i18n.SAVE))))));
});

exports.StatefulEditDataProvider = StatefulEditDataProvider;
StatefulEditDataProvider.displayName = 'StatefulEditDataProvider';
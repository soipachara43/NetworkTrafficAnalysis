"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddItem = exports.MyAddItemButton = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var RuleI18n = _interopRequireWildcard(require("../../translations"));

var _shared_imports = require("../../../../../shared_imports");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MyEuiFormRow = (0, _styledComponents.default)(_eui.EuiFormRow).withConfig({
  displayName: "MyEuiFormRow",
  componentId: "sc-15ldfjw-0"
})([".euiFormRow__labelWrapper{.euiText{padding-right:32px;}}"]);
var MyAddItemButton = (0, _styledComponents.default)(_eui.EuiButtonEmpty).withConfig({
  displayName: "MyAddItemButton",
  componentId: "sc-15ldfjw-1"
})(["margin-top:4px;&.euiButtonEmpty--xSmall{font-size:12px;}.euiIcon{width:12px;height:12px;}"]);
exports.MyAddItemButton = MyAddItemButton;
MyAddItemButton.defaultProps = {
  flush: 'left',
  iconType: 'plusInCircle',
  size: 'xs'
};

var AddItem = function AddItem(_ref) {
  var addText = _ref.addText,
      dataTestSubj = _ref.dataTestSubj,
      field = _ref.field,
      idAria = _ref.idAria,
      isDisabled = _ref.isDisabled,
      validate = _ref.validate;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showValidation = _useState2[0],
      setShowValidation = _useState2[1];

  var _getFieldValidityAndE = (0, _shared_imports.getFieldValidityAndErrorMessage)(field),
      isInvalid = _getFieldValidityAndE.isInvalid,
      errorMessage = _getFieldValidityAndE.errorMessage;

  var _useState3 = (0, _react.useState)(-1),
      _useState4 = _slicedToArray(_useState3, 2),
      haveBeenKeyboardDeleted = _useState4[0],
      setHaveBeenKeyboardDeleted = _useState4[1];

  var inputsRef = (0, _react.useRef)([]);
  var removeItem = (0, _react.useCallback)(function (index) {
    var values = field.value;
    var newValues = [].concat(_toConsumableArray(values.slice(0, index)), _toConsumableArray(values.slice(index + 1)));
    field.setValue(newValues.length === 0 ? [''] : newValues);
    inputsRef.current = [].concat(_toConsumableArray(inputsRef.current.slice(0, index)), _toConsumableArray(inputsRef.current.slice(index + 1)));
    inputsRef.current = inputsRef.current.map(function (ref, i) {
      if (i >= index && inputsRef.current[index] != null) {
        ref.value = 're-render';
      }

      return ref;
    });
  }, [field]);
  var addItem = (0, _react.useCallback)(function () {
    var values = field.value;
    field.setValue([].concat(_toConsumableArray(values), ['']));
  }, [field]);
  var updateItem = (0, _react.useCallback)(function (event, index) {
    event.persist();
    var values = field.value;
    var value = event.target.value;
    field.setValue([].concat(_toConsumableArray(values.slice(0, index)), [value], _toConsumableArray(values.slice(index + 1))));
  }, [field]);
  var handleLastInputRef = (0, _react.useCallback)(function (index, element) {
    if (element != null) {
      inputsRef.current = [].concat(_toConsumableArray(inputsRef.current.slice(0, index)), [element], _toConsumableArray(inputsRef.current.slice(index + 1)));
    }
  }, [inputsRef]);
  (0, _react.useEffect)(function () {
    if (haveBeenKeyboardDeleted !== -1 && !(0, _fp.isEmpty)(inputsRef.current) && inputsRef.current[haveBeenKeyboardDeleted] != null) {
      inputsRef.current[haveBeenKeyboardDeleted].focus();
      setHaveBeenKeyboardDeleted(-1);
    }
  }, [haveBeenKeyboardDeleted, inputsRef.current]);
  var values = field.value;
  return _react.default.createElement(MyEuiFormRow, {
    label: field.label,
    labelAppend: field.labelAppend,
    error: showValidation ? errorMessage : null,
    isInvalid: showValidation && isInvalid,
    fullWidth: true,
    "data-test-subj": dataTestSubj,
    describedByIds: idAria ? [idAria] : undefined
  }, _react.default.createElement(_react.default.Fragment, null, values.map(function (item, index) {
    var euiFieldProps = _objectSpread({
      disabled: isDisabled
    }, index === values.length - 1 ? {
      inputRef: handleLastInputRef.bind(null, index)
    } : {}, {}, inputsRef.current[index] != null && inputsRef.current[index].value !== item || inputsRef.current[index] == null ? {
      value: item
    } : {}, {
      isInvalid: validate == null ? false : showValidation && validate(item)
    });

    return _react.default.createElement("div", {
      key: index
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s",
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: true
    }, _react.default.createElement(_eui.EuiFieldText, _extends({
      onBlur: function onBlur() {
        return setShowValidation(true);
      },
      onChange: function onChange(e) {
        return updateItem(e, index);
      },
      fullWidth: true
    }, euiFieldProps))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      color: "danger",
      iconType: "trash",
      isDisabled: isDisabled || (0, _fp.isEmpty)(item) && values.length === 1,
      onClick: function onClick() {
        return removeItem(index);
      },
      "aria-label": RuleI18n.DELETE
    }))), values.length - 1 !== index && _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }));
  }), _react.default.createElement(MyAddItemButton, {
    onClick: addItem,
    isDisabled: isDisabled
  }, addText)));
};

exports.AddItem = AddItem;
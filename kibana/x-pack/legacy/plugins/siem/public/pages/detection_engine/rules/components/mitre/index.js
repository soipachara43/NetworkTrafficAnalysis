"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddMitreThreat = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _mitre_tactics_techniques = require("../../../mitre/mitre_tactics_techniques");

var Rulei18n = _interopRequireWildcard(require("../../translations"));

var _shared_imports = require("../../../../../shared_imports");

var _default_value = require("../step_about_rule/default_value");

var _add_item_form = require("../add_item_form");

var _helpers = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var MitreContainer = _styledComponents.default.div.withConfig({
  displayName: "MitreContainer",
  componentId: "s2zqjj-0"
})(["margin-top:16px;"]);

var MyEuiSuperSelect = (0, _styledComponents.default)(_eui.EuiSuperSelect).withConfig({
  displayName: "MyEuiSuperSelect",
  componentId: "s2zqjj-1"
})(["width:280px;"]);

var AddMitreThreat = function AddMitreThreat(_ref) {
  var dataTestSubj = _ref.dataTestSubj,
      field = _ref.field,
      idAria = _ref.idAria,
      isDisabled = _ref.isDisabled;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showValidation = _useState2[0],
      setShowValidation = _useState2[1];

  var _getFieldValidityAndE = (0, _shared_imports.getFieldValidityAndErrorMessage)(field),
      isInvalid = _getFieldValidityAndE.isInvalid,
      errorMessage = _getFieldValidityAndE.errorMessage;

  var removeItem = (0, _react.useCallback)(function (index) {
    var values = field.value;
    var newValues = [].concat(_toConsumableArray(values.slice(0, index)), _toConsumableArray(values.slice(index + 1)));

    if ((0, _fp.isEmpty)(newValues)) {
      field.setValue(_default_value.threatDefault);
    } else {
      field.setValue(newValues);
    }
  }, [field]);
  var addItem = (0, _react.useCallback)(function () {
    var values = field.value;

    if (!(0, _fp.isEmpty)(values[values.length - 1])) {
      field.setValue([].concat(_toConsumableArray(values), [{
        tactic: {
          id: 'none',
          name: 'none',
          reference: 'none'
        },
        technique: []
      }]));
    } else {
      field.setValue([{
        tactic: {
          id: 'none',
          name: 'none',
          reference: 'none'
        },
        technique: []
      }]);
    }
  }, [field]);
  var updateTactic = (0, _react.useCallback)(function (index, value) {
    var values = field.value;

    var _ref2 = _mitre_tactics_techniques.tacticsOptions.find(function (t) {
      return t.value === value;
    }) || {
      id: '',
      name: '',
      reference: ''
    },
        id = _ref2.id,
        reference = _ref2.reference,
        name = _ref2.name;

    field.setValue([].concat(_toConsumableArray(values.slice(0, index)), [_objectSpread({}, values[index], {
      tactic: {
        id: id,
        reference: reference,
        name: name
      },
      technique: []
    })], _toConsumableArray(values.slice(index + 1))));
  }, [field]);
  var updateTechniques = (0, _react.useCallback)(function (index, selectedOptions) {
    field.setValue([].concat(_toConsumableArray(values.slice(0, index)), [_objectSpread({}, values[index], {
      technique: selectedOptions
    })], _toConsumableArray(values.slice(index + 1))));
  }, [field]);
  var values = field.value;

  var getSelectTactic = function getSelectTactic(tacticName, index, disabled) {
    return _react.default.createElement(MyEuiSuperSelect, {
      id: "selectDocExample",
      options: [].concat(_toConsumableArray(tacticName === 'none' ? [{
        inputDisplay: _react.default.createElement(_react.default.Fragment, null, i18n.TACTIC_PLACEHOLDER),
        value: 'none',
        disabled: disabled
      }] : []), _toConsumableArray(_mitre_tactics_techniques.tacticsOptions.map(function (t) {
        return {
          inputDisplay: _react.default.createElement(_react.default.Fragment, null, t.text),
          value: t.value,
          disabled: disabled
        };
      }))),
      "aria-label": "",
      onChange: updateTactic.bind(null, index),
      fullWidth: false,
      valueOfSelected: (0, _fp.camelCase)(tacticName),
      "data-test-subj": "mitreTactic"
    });
  };

  var getSelectTechniques = function getSelectTechniques(item, index, disabled) {
    var invalid = (0, _helpers.isMitreAttackInvalid)(item.tactic.name, item.technique);

    var options = _mitre_tactics_techniques.techniquesOptions.filter(function (t) {
      return t.tactics.includes((0, _fp.kebabCase)(item.tactic.name));
    });

    var selectedOptions = item.technique.map(function (technic) {
      return _objectSpread({}, technic, {
        label: "".concat(technic.name, " (").concat(technic.id, ")") // API doesn't allow for label field

      });
    });
    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s",
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: true
    }, _react.default.createElement(_eui.EuiComboBox, {
      "data-test-subj": "mitreTechniques",
      placeholder: item.tactic.name === 'none' ? '' : i18n.TECHNIQUES_PLACEHOLDER,
      options: options,
      selectedOptions: selectedOptions,
      onChange: updateTechniques.bind(null, index),
      isDisabled: disabled || item.tactic.name === 'none',
      fullWidth: true,
      isInvalid: showValidation && invalid,
      onBlur: function onBlur() {
        return setShowValidation(true);
      }
    }), showValidation && invalid && _react.default.createElement(_eui.EuiText, {
      color: "danger",
      size: "xs"
    }, _react.default.createElement("p", null, errorMessage))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      color: "danger",
      iconType: "trash",
      isDisabled: disabled || item.tactic.name === 'none',
      onClick: function onClick() {
        return removeItem(index);
      },
      "aria-label": Rulei18n.DELETE
    })));
  };

  return _react.default.createElement(MitreContainer, null, values.map(function (item, index) {
    return _react.default.createElement("div", {
      key: index
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s",
      justifyContent: "spaceBetween",
      alignItems: "flexStart"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, index === 0 ? _react.default.createElement(_eui.EuiFormRow, {
      label: "".concat(field.label, " ").concat(i18n.TACTIC),
      labelAppend: field.labelAppend,
      describedByIds: idAria ? ["".concat(idAria, " ").concat(i18n.TACTIC)] : undefined
    }, _react.default.createElement(_react.default.Fragment, null, getSelectTactic(item.tactic.name, index, isDisabled))) : getSelectTactic(item.tactic.name, index, isDisabled)), _react.default.createElement(_eui.EuiFlexItem, {
      grow: true
    }, index === 0 ? _react.default.createElement(_eui.EuiFormRow, {
      label: "".concat(field.label, " ").concat(i18n.TECHNIQUE),
      isInvalid: showValidation && isInvalid,
      fullWidth: true,
      describedByIds: idAria ? ["".concat(idAria, " ").concat(i18n.TECHNIQUE)] : undefined
    }, _react.default.createElement(_react.default.Fragment, null, getSelectTechniques(item, index, isDisabled))) : getSelectTechniques(item, index, isDisabled))), values.length - 1 !== index && _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }));
  }), _react.default.createElement(_add_item_form.MyAddItemButton, {
    "data-test-subj": "addMitre",
    onClick: addItem,
    isDisabled: isDisabled
  }, i18n.ADD_MITRE_ATTACK));
};

exports.AddMitreThreat = AddMitreThreat;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormatSelector = FormatSelector;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var supportedFormats = {
  number: {
    title: _i18n.i18n.translate('xpack.lens.indexPattern.numberFormatLabel', {
      defaultMessage: 'Number'
    })
  },
  percent: {
    title: _i18n.i18n.translate('xpack.lens.indexPattern.percentFormatLabel', {
      defaultMessage: 'Percent'
    })
  },
  bytes: {
    title: _i18n.i18n.translate('xpack.lens.indexPattern.bytesFormatLabel', {
      defaultMessage: 'Bytes (1024)'
    })
  }
};

function FormatSelector(props) {
  var _currentFormat$params, _ref3;

  var selectedColumn = props.selectedColumn,
      _onChange = props.onChange;
  var currentFormat = 'params' in selectedColumn && selectedColumn.params && 'format' in selectedColumn.params ? selectedColumn.params.format : undefined;

  var _useState = (0, _react.useState)({
    decimalPlaces: typeof (currentFormat === null || currentFormat === void 0 ? void 0 : (_currentFormat$params = currentFormat.params) === null || _currentFormat$params === void 0 ? void 0 : _currentFormat$params.decimals) === 'number' ? currentFormat.params.decimals : 2
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var selectedFormat = (currentFormat === null || currentFormat === void 0 ? void 0 : currentFormat.id) ? supportedFormats[currentFormat.id] : undefined;
  var defaultOption = {
    value: '',
    label: _i18n.i18n.translate('xpack.lens.indexPattern.defaultFormatLabel', {
      defaultMessage: 'Default'
    })
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.lens.indexPattern.columnFormatLabel', {
      defaultMessage: 'Value format'
    }),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiComboBox, {
    fullWidth: true,
    compressed: true,
    isClearable: false,
    "data-test-subj": "indexPattern-dimension-format",
    singleSelection: {
      asPlainText: true
    },
    options: [defaultOption].concat(_toConsumableArray(Object.entries(supportedFormats).map(function (_ref) {
      var _format$title;

      var _ref2 = _slicedToArray(_ref, 2),
          id = _ref2[0],
          format = _ref2[1];

      return {
        value: id,
        label: (_format$title = format.title) !== null && _format$title !== void 0 ? _format$title : id
      };
    }))),
    selectedOptions: currentFormat ? [{
      value: currentFormat.id,
      label: (_ref3 = selectedFormat === null || selectedFormat === void 0 ? void 0 : selectedFormat.title) !== null && _ref3 !== void 0 ? _ref3 : currentFormat.id
    }] : [defaultOption],
    onChange: function onChange(choices) {
      if (choices.length === 0) {
        return;
      }

      if (!choices[0].value) {
        _onChange();

        return;
      }

      _onChange({
        id: choices[0].value,
        params: {
          decimals: state.decimalPlaces
        }
      });
    }
  })), currentFormat ? _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.lens.indexPattern.decimalPlacesLabel', {
      defaultMessage: 'Decimals'
    }),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    "data-test-subj": "indexPattern-dimension-formatDecimals",
    value: state.decimalPlaces,
    min: 0,
    max: 20,
    onChange: function onChange(e) {
      setState({
        decimalPlaces: Number(e.target.value)
      });

      _onChange({
        id: selectedColumn.params.format.id,
        params: {
          decimals: Number(e.target.value)
        }
      });
    },
    compressed: true,
    fullWidth: true
  })) : null);
}
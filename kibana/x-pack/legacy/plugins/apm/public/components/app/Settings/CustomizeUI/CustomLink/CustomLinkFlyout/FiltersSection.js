"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiltersSection = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _helper = require("./helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var FiltersSection = function FiltersSection(_ref) {
  var filters = _ref.filters,
      onChangeFilters = _ref.onChangeFilters;

  var onChangeFilter = function onChangeFilter(key, value, idx) {
    var newFilters = _toConsumableArray(filters);

    newFilters[idx] = {
      key: key,
      value: value
    };
    onChangeFilters(newFilters);
  };

  var onRemoveFilter = function onRemoveFilter(idx) {
    // remove without mutating original array
    var newFilters = _toConsumableArray(filters);

    newFilters.splice(idx, 1); // if there is only one item left it should not be removed
    // but reset to empty

    if ((0, _lodash.isEmpty)(newFilters)) {
      onChangeFilters([{
        key: '',
        value: ''
      }]);
    } else {
      onChangeFilters(newFilters);
    }
  };

  var handleAddFilter = function handleAddFilter() {
    onChangeFilters([].concat(_toConsumableArray(filters), [{
      key: '',
      value: ''
    }]));
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.filters.title', {
    defaultMessage: 'Filters'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.filters.subtitle', {
    defaultMessage: 'Use the filter options to scope them to only appear for specific services.'
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), filters.map(function (filter, idx) {
    var key = filter.key,
        value = filter.value;
    var filterId = "filter-".concat(idx);
    var selectOptions = (0, _helper.getSelectOptions)(filters, key);
    return _react.default.createElement(_eui.EuiFlexGroup, {
      key: filterId,
      gutterSize: "s",
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSelect, {
      "data-test-subj": filterId,
      id: filterId,
      fullWidth: true,
      options: selectOptions,
      value: key,
      prepend: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.filters.prepend', {
        defaultMessage: 'Field'
      }),
      onChange: function onChange(e) {
        return onChangeFilter(e.target.value, value, idx);
      },
      isInvalid: !(0, _lodash.isEmpty)(value) && ((0, _lodash.isEmpty)(key) || key === _helper.DEFAULT_OPTION.value)
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldText, {
      "data-test-subj": "".concat(key, ".value"),
      fullWidth: true,
      placeholder: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyOut.filters.defaultOption.value', {
        defaultMessage: 'Value'
      }),
      onChange: function onChange(e) {
        return onChangeFilter(key, e.target.value, idx);
      },
      value: value,
      isInvalid: !(0, _lodash.isEmpty)(key) && (0, _lodash.isEmpty)(value)
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      iconType: "trash",
      onClick: function onClick() {
        return onRemoveFilter(idx);
      },
      disabled: !value && !key && filters.length === 1
    })));
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(AddFilterButton, {
    onClick: handleAddFilter // Disable button when user has already added all items available
    ,
    isDisabled: filters.length === _helper.FILTER_SELECT_OPTIONS.length - 1
  }));
};

exports.FiltersSection = FiltersSection;

var AddFilterButton = function AddFilterButton(_ref2) {
  var onClick = _ref2.onClick,
      isDisabled = _ref2.isDisabled;
  return _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "plusInCircle",
    onClick: onClick,
    disabled: isDisabled
  }, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.filters.addAnotherFilter', {
    defaultMessage: 'Add another filter'
  }));
};
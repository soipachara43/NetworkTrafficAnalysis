"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalUIFilters = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Filter = require("./Filter");

var _useLocalUIFilters2 = require("../../../hooks/useLocalUIFilters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ButtonWrapper = _styledComponents.default.div.withConfig({
  displayName: "ButtonWrapper",
  componentId: "sc-9ifnz7-0"
})(["display:inline-block;"]);

var LocalUIFilters = function LocalUIFilters(_ref) {
  var projection = _ref.projection,
      params = _ref.params,
      filterNames = _ref.filterNames,
      children = _ref.children,
      _ref$showCount = _ref.showCount,
      showCount = _ref$showCount === void 0 ? true : _ref$showCount;

  var _useLocalUIFilters = (0, _useLocalUIFilters2.useLocalUIFilters)({
    filterNames: filterNames,
    projection: projection,
    params: params
  }),
      filters = _useLocalUIFilters.filters,
      setFilterValue = _useLocalUIFilters.setFilterValue,
      clearValues = _useLocalUIFilters.clearValues;

  var hasValues = filters.some(function (filter) {
    return filter.value.length > 0;
  });
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.apm.localFiltersTitle', {
    defaultMessage: 'Filters'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), children, filters.map(function (filter) {
    return _react.default.createElement(_react.default.Fragment, {
      key: filter.name
    }, _react.default.createElement(_Filter.Filter, _extends({}, filter, {
      onChange: function onChange(value) {
        setFilterValue(filter.name, value);
      },
      showCount: showCount
    })), _react.default.createElement(_eui.EuiHorizontalRule, {
      margin: "none"
    }));
  }), hasValues ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(ButtonWrapper, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    iconType: "cross",
    flush: "left",
    onClick: clearValues
  }, _i18n.i18n.translate('xpack.apm.clearFilters', {
    defaultMessage: 'Clear filters'
  })))) : null);
};

exports.LocalUIFilters = LocalUIFilters;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulRecentCases = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _use_get_cases = require("../../containers/case/use_get_cases");

var _redirect_to_case = require("../link_to/redirect_to_case");

var _use_get_url_search = require("../navigation/use_get_url_search");

var _loading_placeholders = require("../page/overview/loading_placeholders");

var _home_navigations = require("../../pages/home/home_navigations");

var _no_cases = require("./no_cases");

var _recent_cases = require("./recent_cases");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var usePrevious = function usePrevious(value) {
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    ref.current = value;
  });
  return ref.current;
};

var MAX_CASES_TO_SHOW = 3;

var queryParams = _objectSpread({}, _use_get_cases.DEFAULT_QUERY_PARAMS, {
  perPage: MAX_CASES_TO_SHOW
});

var StatefulRecentCasesComponent = _react.default.memo(function (_ref) {
  var filterOptions = _ref.filterOptions;
  var previousFilterOptions = usePrevious(filterOptions);

  var _useGetCases = (0, _use_get_cases.useGetCases)(queryParams),
      data = _useGetCases.data,
      loading = _useGetCases.loading,
      setFilters = _useGetCases.setFilters;

  var isLoadingCases = (0, _react.useMemo)(function () {
    return loading.indexOf('cases') > -1 || loading.indexOf('caseUpdate') > -1;
  }, [loading]);
  var search = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.case);
  var allCasesLink = (0, _react.useMemo)(function () {
    return _react.default.createElement(_eui.EuiLink, {
      href: (0, _redirect_to_case.getCaseUrl)(search)
    }, i18n.VIEW_ALL_CASES);
  }, [search]);
  (0, _react.useEffect)(function () {
    if (previousFilterOptions !== undefined && previousFilterOptions !== filterOptions) {
      setFilters(filterOptions);
    }
  }, [previousFilterOptions, filterOptions, setFilters]);
  var content = (0, _react.useMemo)(function () {
    return isLoadingCases ? _react.default.createElement(_loading_placeholders.LoadingPlaceholders, {
      lines: 2,
      placeholders: 3
    }) : !isLoadingCases && data.cases.length === 0 ? _react.default.createElement(_no_cases.NoCases, null) : _react.default.createElement(_recent_cases.RecentCases, {
      cases: data.cases
    });
  }, [isLoadingCases, data]);
  return _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "s"
  }, content, _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "s"
  }), _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, allCasesLink));
});

StatefulRecentCasesComponent.displayName = 'StatefulRecentCasesComponent';

var StatefulRecentCases = _react.default.memo(StatefulRecentCasesComponent);

exports.StatefulRecentCases = StatefulRecentCases;
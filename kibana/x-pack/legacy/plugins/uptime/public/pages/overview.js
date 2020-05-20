"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewPageComponent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _i18n = require("@kbn/i18n");

var _functional = require("../components/functional");

var _hooks = require("../hooks");

var _stringify_url_params = require("../lib/helper/stringify_url_params");

var _public = require("../../../../../plugins/observability/public");

var _contexts = require("../contexts");

var _connected = require("../components/connected");

var _page_header = require("./page_header");

var _use_breadcrumbs = require("../hooks/use_breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EuiFlexItemStyled = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "EuiFlexItemStyled",
  componentId: "fqaui8-0"
})(["&&{min-width:598px;@media only screen and (max-width:630px){min-width:initial;}}"]); // TODO: these values belong deeper down in the monitor
// list pagination control, but are here temporarily until we
// are done removing GraphQL

var DEFAULT_PAGE_SIZE = 10;
var LOCAL_STORAGE_KEY = 'xpack.uptime.monitorList.pageSize';

var getMonitorListPageSizeValue = function getMonitorListPageSizeValue() {
  var _localStorage$getItem;

  var value = parseInt((_localStorage$getItem = localStorage.getItem(LOCAL_STORAGE_KEY)) !== null && _localStorage$getItem !== void 0 ? _localStorage$getItem : '', 10);

  if (isNaN(value)) {
    return DEFAULT_PAGE_SIZE;
  }

  return value;
};

var OverviewPageComponent = function OverviewPageComponent(_ref) {
  var autocomplete = _ref.autocomplete,
      indexPattern = _ref.indexPattern,
      setEsKueryFilters = _ref.setEsKueryFilters;

  var _useContext = (0, _react.useContext)(_contexts.UptimeThemeContext),
      colors = _useContext.colors;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 1),
      getUrlParams = _useUrlParams2[0]; // TODO: this is temporary until we migrate the monitor list to our Redux implementation


  var _useState = (0, _react.useState)(getMonitorListPageSizeValue()),
      _useState2 = _slicedToArray(_useState, 2),
      monitorListPageSize = _useState2[0],
      setMonitorListPageSize = _useState2[1];

  var _getUrlParams = getUrlParams(),
      absoluteDateRangeStart = _getUrlParams.absoluteDateRangeStart,
      absoluteDateRangeEnd = _getUrlParams.absoluteDateRangeEnd,
      params = _objectWithoutProperties(_getUrlParams, ["absoluteDateRangeStart", "absoluteDateRangeEnd"]);

  var dateRangeStart = params.dateRangeStart,
      dateRangeEnd = params.dateRangeEnd,
      pagination = params.pagination,
      statusFilter = params.statusFilter,
      search = params.search,
      urlFilters = params.filters;
  (0, _hooks.useUptimeTelemetry)(_hooks.UptimePage.Overview);
  (0, _public.useTrackPageview)({
    app: 'uptime',
    path: 'overview'
  });
  (0, _public.useTrackPageview)({
    app: 'uptime',
    path: 'overview',
    delay: 15000
  });

  var _useUpdateKueryString = (0, _hooks.useUpdateKueryString)(indexPattern, search, urlFilters),
      _useUpdateKueryString2 = _slicedToArray(_useUpdateKueryString, 2),
      esFilters = _useUpdateKueryString2[0],
      error = _useUpdateKueryString2[1];

  (0, _react.useEffect)(function () {
    setEsKueryFilters(esFilters !== null && esFilters !== void 0 ? esFilters : '');
  }, [esFilters, setEsKueryFilters]);
  var sharedProps = {
    dateRangeStart: dateRangeStart,
    dateRangeEnd: dateRangeEnd,
    statusFilter: statusFilter,
    filters: esFilters
  };
  var linkParameters = (0, _stringify_url_params.stringifyUrlParams)(params, true);

  var heading = _i18n.i18n.translate('xpack.uptime.overviewPage.headerText', {
    defaultMessage: 'Overview',
    description: "The text that will be displayed in the app's heading when the Overview page loads."
  });

  (0, _use_breadcrumbs.useBreadcrumbs)([]); // No extra breadcrumbs on overview

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_page_header.PageHeader, {
    headingText: heading,
    extraLinks: true,
    datePicker: true
  }), _react.default.createElement(_connected.EmptyState, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs",
    wrap: true,
    responsive: true
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1,
    style: {
      flexBasis: 500
    }
  }, _react.default.createElement(_connected.KueryBar, {
    "aria-label": _i18n.i18n.translate('xpack.uptime.filterBar.ariaLabel', {
      defaultMessage: 'Input filter criteria for the overview page'
    }),
    autocomplete: autocomplete,
    "data-test-subj": "xpack.uptime.filterBar"
  })), _react.default.createElement(EuiFlexItemStyled, {
    grow: true
  }, _react.default.createElement(_connected.FilterGroup, {
    esFilters: esFilters
  })), error && _react.default.createElement(_functional.OverviewPageParsingErrorCallout, {
    error: error
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_functional.StatusPanel, null), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_functional.MonitorList, {
    dangerColor: colors.danger,
    hasActiveFilters: !!esFilters,
    implementsCustomErrorState: true,
    linkParameters: linkParameters,
    pageSize: monitorListPageSize,
    setPageSize: setMonitorListPageSize,
    successColor: colors.success,
    variables: _objectSpread({}, sharedProps, {
      pagination: pagination,
      pageSize: monitorListPageSize
    })
  })));
};

exports.OverviewPageComponent = OverviewPageComponent;
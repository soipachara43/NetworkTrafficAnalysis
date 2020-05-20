"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventsByDataset = void 0;

var _eui = require("@elastic/eui");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _react = _interopRequireWildcard(require("react"));

var _charts = require("@elastic/charts");

var _translations = require("../../../components/events_viewer/translations");

var _keury = require("../../../lib/keury");

var _redirect_to_hosts = require("../../../components/link_to/redirect_to_hosts");

var _events_query_tab_body = require("../../../pages/hosts/navigation/events_query_tab_body");

var _matrix_histogram = require("../../../components/matrix_histogram");

var _navigation = require("../../hosts/navigation");

var _kibana = require("../../../lib/kibana");

var _public = require("../../../../../../../../src/plugins/data/public");

var _model = require("../../../store/hosts/model");

var _constants = require("../../../../common/constants");

var i18n = _interopRequireWildcard(require("../translations"));

var _use_get_url_search = require("../../../components/navigation/use_get_url_search");

var _home_navigations = require("../../home/home_navigations");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var NO_FILTERS = [];
var DEFAULT_QUERY = {
  query: '',
  language: 'kuery'
};
var DEFAULT_STACK_BY = 'event.dataset';
var ID = 'eventsByDatasetOverview';

var EventsByDatasetComponent = function EventsByDatasetComponent(_ref) {
  var deleteQuery = _ref.deleteQuery,
      _ref$filters = _ref.filters,
      filters = _ref$filters === void 0 ? NO_FILTERS : _ref$filters,
      from = _ref.from,
      indexPattern = _ref.indexPattern,
      _ref$query = _ref.query,
      query = _ref$query === void 0 ? DEFAULT_QUERY : _ref$query,
      setQuery = _ref.setQuery,
      to = _ref.to;
  (0, _react.useEffect)(function () {
    return function () {
      if (deleteQuery) {
        deleteQuery({
          id: ID
        });
      }
    };
  }, [deleteQuery]);
  var kibana = (0, _kibana.useKibana)();

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_NUMBER_FORMAT),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      defaultNumberFormat = _useUiSetting$2[0];

  var urlSearch = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.hosts);
  var eventsCountViewEventsButton = (0, _react.useMemo)(function () {
    return _react.default.createElement(_eui.EuiButton, {
      href: (0, _redirect_to_hosts.getTabsOnHostsUrl)(_model.HostsTableType.events, urlSearch)
    }, i18n.VIEW_EVENTS);
  }, [urlSearch]);
  var filterQuery = (0, _react.useMemo)(function () {
    return (0, _keury.convertToBuildEsQuery)({
      config: _public.esQuery.getEsQueryConfig(kibana.services.uiSettings),
      indexPattern: indexPattern,
      queries: [query],
      filters: filters
    });
  }, [kibana, indexPattern, query, filters]);
  var eventsByDatasetHistogramConfigs = (0, _react.useMemo)(function () {
    var _eventsStackByOptions;

    return _objectSpread({}, _events_query_tab_body.histogramConfigs, {
      defaultStackByOption: (_eventsStackByOptions = _navigation.eventsStackByOptions.find(function (o) {
        return o.text === DEFAULT_STACK_BY;
      })) !== null && _eventsStackByOptions !== void 0 ? _eventsStackByOptions : _navigation.eventsStackByOptions[0],
      legendPosition: _charts.Position.Right,
      subtitle: function subtitle(totalCount) {
        return "".concat(_translations.SHOWING, ": ").concat((0, _numeral.default)(totalCount).format(defaultNumberFormat), " ").concat((0, _translations.UNIT)(totalCount));
      }
    });
  }, []);
  return _react.default.createElement(_matrix_histogram.MatrixHistogramContainer, _extends({
    endDate: to,
    filterQuery: filterQuery,
    headerChildren: eventsCountViewEventsButton,
    id: ID,
    setQuery: setQuery,
    sourceId: "default",
    startDate: from,
    type: _model.HostsType.page
  }, eventsByDatasetHistogramConfigs));
};

EventsByDatasetComponent.displayName = 'EventsByDatasetComponent';

var EventsByDataset = _react.default.memo(EventsByDatasetComponent);

exports.EventsByDataset = EventsByDataset;
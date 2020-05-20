"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterGroup = exports.Container = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _hooks = require("../../../hooks");

var _parse_filter_map = require("../../functional/filter_group/parse_filter_map");

var _actions = require("../../../state/actions");

var _filter_group = require("../../functional/filter_group");

var _contexts = require("../../../contexts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Container = function Container(_ref) {
  var esKuery = _ref.esKuery,
      esFilters = _ref.esFilters,
      loading = _ref.loading,
      loadFilterGroup = _ref.loadFilterGroup,
      overviewFilters = _ref.overviewFilters;

  var _useContext = (0, _react.useContext)(_contexts.UptimeRefreshContext),
      lastRefresh = _useContext.lastRefresh;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 2),
      getUrlParams = _useUrlParams2[0],
      updateUrl = _useUrlParams2[1];

  var _getUrlParams = getUrlParams(),
      dateRangeStart = _getUrlParams.dateRangeStart,
      dateRangeEnd = _getUrlParams.dateRangeEnd,
      statusFilter = _getUrlParams.statusFilter,
      urlFilters = _getUrlParams.filters;

  (0, _react.useEffect)(function () {
    var _filterSelections$loc, _filterSelections$por, _filterSelections$sch, _filterSelections$tag;

    var filterSelections = (0, _parse_filter_map.parseFiltersMap)(urlFilters);
    loadFilterGroup({
      dateRangeStart: dateRangeStart,
      dateRangeEnd: dateRangeEnd,
      locations: (_filterSelections$loc = filterSelections.locations) !== null && _filterSelections$loc !== void 0 ? _filterSelections$loc : [],
      ports: (_filterSelections$por = filterSelections.ports) !== null && _filterSelections$por !== void 0 ? _filterSelections$por : [],
      schemes: (_filterSelections$sch = filterSelections.schemes) !== null && _filterSelections$sch !== void 0 ? _filterSelections$sch : [],
      search: esKuery,
      statusFilter: statusFilter,
      tags: (_filterSelections$tag = filterSelections.tags) !== null && _filterSelections$tag !== void 0 ? _filterSelections$tag : []
    });
  }, [lastRefresh, dateRangeStart, dateRangeEnd, esKuery, esFilters, statusFilter, urlFilters, loadFilterGroup]); // update filters in the URL from filter group

  var onFilterUpdate = function onFilterUpdate(filtersKuery) {
    if (urlFilters !== filtersKuery) {
      updateUrl({
        filters: filtersKuery,
        pagination: ''
      });
    }
  };

  return _react.default.createElement(_filter_group.FilterGroupComponent, {
    currentFilter: urlFilters,
    overviewFilters: overviewFilters,
    loading: loading,
    onFilterUpdate: onFilterUpdate
  });
};

exports.Container = Container;

var mapStateToProps = function mapStateToProps(_ref2) {
  var _ref2$overviewFilters = _ref2.overviewFilters,
      loading = _ref2$overviewFilters.loading,
      filters = _ref2$overviewFilters.filters,
      _ref2$ui = _ref2.ui,
      esKuery = _ref2$ui.esKuery,
      lastRefresh = _ref2$ui.lastRefresh;
  return {
    esKuery: esKuery,
    overviewFilters: filters,
    lastRefresh: lastRefresh,
    loading: loading
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadFilterGroup: function loadFilterGroup(payload) {
      return dispatch((0, _actions.fetchOverviewFilters)(payload));
    }
  };
};

var FilterGroup = (0, _reactRedux.connect)( // @ts-ignore connect is expecting null | undefined for some reason
mapStateToProps, mapDispatchToProps)(Container);
exports.FilterGroup = FilterGroup;
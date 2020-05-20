"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulOverview = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactSticky = require("react-sticky");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _alerts_by_category = require("./alerts_by_category");

var _filters_global = require("../../components/filters_global");

var _search_bar = require("../../components/search_bar");

var _wrapper_page = require("../../components/wrapper_page");

var _global_time = require("../../containers/global_time");

var _source = require("../../containers/source");

var _events_by_dataset = require("./events_by_dataset");

var _event_counts = require("./event_counts");

var _overview_empty = require("./overview_empty");

var _sidebar = require("./sidebar");

var _signals_by_category = require("./signals_by_category");

var _store = require("../../store");

var _actions = require("../../store/inputs/actions");

var _spy_routes = require("../../utils/route/spy_routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DEFAULT_QUERY = {
  query: '',
  language: 'kuery'
};
var NO_FILTERS = [];
var SidebarFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "SidebarFlexItem",
  componentId: "m8qyvs-0"
})(["margin-right:24px;"]);

var OverviewComponent = function OverviewComponent(_ref) {
  var _ref$filters = _ref.filters,
      filters = _ref$filters === void 0 ? NO_FILTERS : _ref$filters,
      _ref$query = _ref.query,
      query = _ref$query === void 0 ? DEFAULT_QUERY : _ref$query,
      setAbsoluteRangeDatePicker = _ref.setAbsoluteRangeDatePicker;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_source.WithSource, {
    sourceId: "default"
  }, function (_ref2) {
    var indicesExist = _ref2.indicesExist,
        indexPattern = _ref2.indexPattern;
    return (0, _source.indicesExistOrDataTemporarilyUnavailable)(indicesExist) ? _react.default.createElement(_reactSticky.StickyContainer, null, _react.default.createElement(_filters_global.FiltersGlobal, null, _react.default.createElement(_search_bar.SiemSearchBar, {
      id: "global",
      indexPattern: indexPattern
    })), _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "none",
      justifyContent: "spaceBetween"
    }, _react.default.createElement(SidebarFlexItem, {
      grow: false
    }, _react.default.createElement(_sidebar.StatefulSidebar, null)), _react.default.createElement(_eui.EuiFlexItem, {
      grow: true
    }, _react.default.createElement(_global_time.GlobalTime, null, function (_ref3) {
      var from = _ref3.from,
          deleteQuery = _ref3.deleteQuery,
          setQuery = _ref3.setQuery,
          to = _ref3.to;
      return _react.default.createElement(_eui.EuiFlexGroup, {
        direction: "column",
        gutterSize: "none"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_signals_by_category.SignalsByCategory, {
        filters: filters,
        from: from,
        indexPattern: indexPattern,
        query: query,
        setAbsoluteRangeDatePicker: setAbsoluteRangeDatePicker,
        setQuery: setQuery,
        to: to
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "l"
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_alerts_by_category.AlertsByCategory, {
        deleteQuery: deleteQuery,
        filters: filters,
        from: from,
        indexPattern: indexPattern,
        query: query,
        setQuery: setQuery,
        to: to
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_events_by_dataset.EventsByDataset, {
        deleteQuery: deleteQuery,
        filters: filters,
        from: from,
        indexPattern: indexPattern,
        query: query,
        setQuery: setQuery,
        to: to
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_event_counts.EventCounts, {
        filters: filters,
        from: from,
        indexPattern: indexPattern,
        query: query,
        setQuery: setQuery,
        to: to
      })));
    }))))) : _react.default.createElement(_overview_empty.OverviewEmpty, null);
  }), _react.default.createElement(_spy_routes.SpyRoute, null));
};

var makeMapStateToProps = function makeMapStateToProps() {
  var getGlobalFiltersQuerySelector = _store.inputsSelectors.globalFiltersQuerySelector();

  var getGlobalQuerySelector = _store.inputsSelectors.globalQuerySelector();

  var mapStateToProps = function mapStateToProps(state) {
    return {
      query: getGlobalQuerySelector(state),
      filters: getGlobalFiltersQuerySelector(state)
    };
  };

  return mapStateToProps;
};

var mapDispatchToProps = {
  setAbsoluteRangeDatePicker: _actions.setAbsoluteRangeDatePicker
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var StatefulOverview = connector(_react.default.memo(OverviewComponent));
exports.StatefulOverview = StatefulOverview;
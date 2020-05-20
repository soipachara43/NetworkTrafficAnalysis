"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulRecentTimelines = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _all = require("../../containers/timeline/all");

var _types = require("../../graphql/types");

var _helpers = require("../open_timeline/helpers");

var _loading_placeholders = require("../page/overview/loading_placeholders");

var _actions = require("../../store/timeline/actions");

var _recent_timelines = require("./recent_timelines");

var i18n = _interopRequireWildcard(require("./translations"));

var _use_get_url_search = require("../navigation/use_get_url_search");

var _home_navigations = require("../../pages/home/home_navigations");

var _redirect_to_timelines = require("../link_to/redirect_to_timelines");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PAGE_SIZE = 3;

var StatefulRecentTimelinesComponent = _react.default.memo(function (_ref) {
  var apolloClient = _ref.apolloClient,
      filterBy = _ref.filterBy,
      updateIsLoading = _ref.updateIsLoading,
      updateTimeline = _ref.updateTimeline;
  var onOpenTimeline = (0, _react.useCallback)(function (_ref2) {
    var duplicate = _ref2.duplicate,
        timelineId = _ref2.timelineId;
    (0, _helpers.queryTimelineById)({
      apolloClient: apolloClient,
      duplicate: duplicate,
      timelineId: timelineId,
      updateIsLoading: updateIsLoading,
      updateTimeline: updateTimeline
    });
  }, [apolloClient, updateIsLoading, updateTimeline]);
  var noTimelinesMessage = filterBy === 'favorites' ? i18n.NO_FAVORITE_TIMELINES : i18n.NO_TIMELINES;
  var urlSearch = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.timelines);
  var linkAllTimelines = (0, _react.useMemo)(function () {
    return _react.default.createElement(_eui.EuiLink, {
      href: (0, _redirect_to_timelines.getTimelinesUrl)(urlSearch)
    }, i18n.VIEW_ALL_TIMELINES);
  }, [urlSearch]);
  var loadingPlaceholders = (0, _react.useMemo)(function () {
    return _react.default.createElement(_loading_placeholders.LoadingPlaceholders, {
      lines: 2,
      placeholders: filterBy === 'favorites' ? 1 : PAGE_SIZE
    });
  }, [filterBy]);
  return _react.default.createElement(_all.AllTimelinesQuery, {
    pageInfo: {
      pageIndex: 1,
      pageSize: PAGE_SIZE
    },
    search: '',
    sort: {
      sortField: _types.SortFieldTimeline.updated,
      sortOrder: _types.Direction.desc
    },
    onlyUserFavorite: filterBy === 'favorites'
  }, function (_ref3) {
    var timelines = _ref3.timelines,
        loading = _ref3.loading;
    return _react.default.createElement(_react.default.Fragment, null, loading ? loadingPlaceholders : _react.default.createElement(_recent_timelines.RecentTimelines, {
      noTimelinesMessage: noTimelinesMessage,
      onOpenTimeline: onOpenTimeline,
      timelines: timelines
    }), _react.default.createElement(_eui.EuiHorizontalRule, {
      margin: "s"
    }), _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, linkAllTimelines));
  });
});

StatefulRecentTimelinesComponent.displayName = 'StatefulRecentTimelinesComponent';

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateIsLoading: function updateIsLoading(_ref4) {
      var id = _ref4.id,
          isLoading = _ref4.isLoading;
      return dispatch((0, _actions.updateIsLoading)({
        id: id,
        isLoading: isLoading
      }));
    },
    updateTimeline: (0, _helpers.dispatchUpdateTimeline)(dispatch)
  };
};

var connector = (0, _reactRedux.connect)(null, mapDispatchToProps);
var StatefulRecentTimelines = connector(StatefulRecentTimelinesComponent);
exports.StatefulRecentTimelines = StatefulRecentTimelines;
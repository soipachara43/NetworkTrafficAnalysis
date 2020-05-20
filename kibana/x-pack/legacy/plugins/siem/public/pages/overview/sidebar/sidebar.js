"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _filters = require("../../../components/recent_cases/filters");

var _filters2 = require("../../../components/recent_timelines/filters");

var _constants = require("../../../../common/constants");

var _recent_cases = require("../../../components/recent_cases");

var _recent_timelines = require("../../../components/recent_timelines");

var _news_feed = require("../../../components/news_feed");

var _use_get_cases = require("../../../containers/case/use_get_cases");

var _sidebar_header = require("../../../components/sidebar_header");

var _kibana = require("../../../lib/kibana");

var _apollo_context = require("../../../utils/apollo_context");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SidebarFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "SidebarFlexGroup",
  componentId: "sc-1fyy74d-0"
})(["width:305px;"]);

var SidebarSpacerComponent = function SidebarSpacerComponent() {
  return _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "xxl"
  }));
};

SidebarSpacerComponent.displayName = 'SidebarSpacerComponent';

var Spacer = _react.default.memo(SidebarSpacerComponent);

var Sidebar = _react.default.memo(function (_ref) {
  var recentCasesFilterBy = _ref.recentCasesFilterBy,
      recentTimelinesFilterBy = _ref.recentTimelinesFilterBy,
      setRecentCasesFilterBy = _ref.setRecentCasesFilterBy,
      setRecentTimelinesFilterBy = _ref.setRecentTimelinesFilterBy;
  var currentUser = (0, _kibana.useCurrentUser)();
  var apolloClient = (0, _apollo_context.useApolloClient)();
  var recentCasesFilters = (0, _react.useMemo)(function () {
    return _react.default.createElement(_filters.Filters, {
      filterBy: recentCasesFilterBy,
      setFilterBy: setRecentCasesFilterBy,
      showMyRecentlyReported: currentUser != null
    });
  }, [currentUser, recentCasesFilterBy, setRecentCasesFilterBy]);
  var recentCasesFilterOptions = (0, _react.useMemo)(function () {
    return recentCasesFilterBy === 'myRecentlyReported' && currentUser != null ? _objectSpread({}, _use_get_cases.DEFAULT_FILTER_OPTIONS, {
      reporters: [{
        email: currentUser.email,
        full_name: currentUser.fullName,
        username: currentUser.username
      }]
    }) : _use_get_cases.DEFAULT_FILTER_OPTIONS;
  }, [currentUser, recentCasesFilterBy]);
  var recentTimelinesFilters = (0, _react.useMemo)(function () {
    return _react.default.createElement(_filters2.Filters, {
      filterBy: recentTimelinesFilterBy,
      setFilterBy: setRecentTimelinesFilterBy
    });
  }, [recentTimelinesFilterBy, setRecentTimelinesFilterBy]);
  return _react.default.createElement(SidebarFlexGroup, {
    direction: "column",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_sidebar_header.SidebarHeader, {
    title: i18n.RECENT_CASES
  }, recentCasesFilters), _react.default.createElement(_recent_cases.StatefulRecentCases, {
    filterOptions: recentCasesFilterOptions
  })), _react.default.createElement(Spacer, null), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_sidebar_header.SidebarHeader, {
    title: i18n.RECENT_TIMELINES
  }, recentTimelinesFilters), _react.default.createElement(_recent_timelines.StatefulRecentTimelines, {
    apolloClient: apolloClient,
    filterBy: recentTimelinesFilterBy
  })), _react.default.createElement(Spacer, null), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_news_feed.StatefulNewsFeed, {
    enableNewsFeedSetting: _constants.ENABLE_NEWS_FEED_SETTING,
    newsFeedSetting: _constants.NEWS_FEED_URL_SETTING
  })));
});

exports.Sidebar = Sidebar;
Sidebar.displayName = 'Sidebar';
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabNavigation = exports.TabNavigationComponent = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _telemetry = require("../../../lib/telemetry");

var _helpers = require("../helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TabNavigationItemComponent = function TabNavigationItemComponent(_ref) {
  var href = _ref.href,
      hrefWithSearch = _ref.hrefWithSearch,
      id = _ref.id,
      disabled = _ref.disabled,
      name = _ref.name,
      isSelected = _ref.isSelected;
  var handleClick = (0, _react.useCallback)(function () {
    (0, _telemetry.track)(_telemetry.METRIC_TYPE.CLICK, "".concat(_telemetry.TELEMETRY_EVENT.TAB_CLICKED).concat(id));
  }, [id]);
  return _react.default.createElement(_eui.EuiTab, {
    "data-href": href,
    "data-test-subj": "navigation-".concat(id),
    disabled: disabled,
    href: hrefWithSearch,
    isSelected: isSelected,
    onClick: handleClick
  }, name);
};

var TabNavigationItem = _react.default.memo(TabNavigationItemComponent);

var TabNavigationComponent = function TabNavigationComponent(props) {
  var display = props.display,
      navTabs = props.navTabs,
      pageName = props.pageName,
      tabName = props.tabName;
  var mapLocationToTab = (0, _react.useCallback)(function () {
    return (0, _fp.getOr)('', 'id', Object.values(navTabs).find(function (item) {
      return tabName === item.id || pageName === item.id;
    }));
  }, [pageName, tabName, navTabs]);

  var _useState = (0, _react.useState)(mapLocationToTab()),
      _useState2 = _slicedToArray(_useState, 2),
      selectedTabId = _useState2[0],
      setSelectedTabId = _useState2[1];

  (0, _react.useEffect)(function () {
    var currentTabSelected = mapLocationToTab();

    if (currentTabSelected !== selectedTabId) {
      setSelectedTabId(currentTabSelected);
    } // we do need navTabs in case the selectedTabId appears after initial load (ex. checking permissions for anomalies)

  }, [pageName, tabName, navTabs, mapLocationToTab, selectedTabId]);
  var renderTabs = (0, _react.useMemo)(function () {
    return Object.values(navTabs).map(function (tab) {
      var isSelected = selectedTabId === tab.id;
      var query = props.query,
          filters = props.filters,
          savedQuery = props.savedQuery,
          timerange = props.timerange,
          timeline = props.timeline;
      var hrefWithSearch = tab.href + (0, _helpers.getSearch)(tab, {
        query: query,
        filters: filters,
        savedQuery: savedQuery,
        timerange: timerange,
        timeline: timeline
      });
      return _react.default.createElement(TabNavigationItem, {
        key: "navigation-".concat(tab.id),
        id: tab.id,
        href: tab.href,
        name: tab.name,
        disabled: tab.disabled,
        hrefWithSearch: hrefWithSearch,
        isSelected: isSelected
      });
    });
  }, [navTabs, selectedTabId, props]);
  return _react.default.createElement(_eui.EuiTabs, {
    display: display
  }, renderTabs);
};

exports.TabNavigationComponent = TabNavigationComponent;
TabNavigationComponent.displayName = 'TabNavigationComponent';

var TabNavigation = _react.default.memo(TabNavigationComponent);

exports.TabNavigation = TabNavigation;
TabNavigation.displayName = 'TabNavigation';
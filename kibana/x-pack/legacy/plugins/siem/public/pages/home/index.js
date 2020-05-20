"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomePage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("../../components/utils");

var _drag_drop_context_wrapper = require("../../components/drag_and_drop/drag_drop_context_wrapper");

var _flyout = require("../../components/flyout");

var _header_global = require("../../components/header_global");

var _help_menu = require("../../components/help_menu");

var _link_to = require("../../components/link_to");

var _ml_host_conditional_container = require("../../components/ml/conditional_links/ml_host_conditional_container");

var _ml_network_conditional_container = require("../../components/ml/conditional_links/ml_network_conditional_container");

var _auto_save_warning = require("../../components/timeline/auto_save_warning");

var _url_state = require("../../components/url_state");

var _source = require("../../containers/source");

var _spy_routes = require("../../utils/route/spy_routes");

var _use_show_timeline = require("../../utils/timeline/use_show_timeline");

var _ = require("../404");

var _detection_engine = require("../detection_engine");

var _hosts = require("../hosts");

var _network = require("../network");

var _overview = require("../overview");

var _case = require("../case");

var _timelines = require("../timelines");

var _home_navigations = require("./home_navigations");

var _types = require("./types");

require("uiExports/embeddableFactories");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WrappedByAutoSizer = _styledComponents.default.div.withConfig({
  displayName: "WrappedByAutoSizer",
  componentId: "b8skib-0"
})(["height:100%;"]);

WrappedByAutoSizer.displayName = 'WrappedByAutoSizer';

var Main = _styledComponents.default.main.withConfig({
  displayName: "Main",
  componentId: "b8skib-1"
})(["height:100%;"]);

Main.displayName = 'Main';
var usersViewing = ['elastic']; // TODO: get the users viewing this timeline from Elasticsearch (persistance)

/** the global Kibana navigation at the top of every page */

var globalHeaderHeightPx = 48;

var calculateFlyoutHeight = function calculateFlyoutHeight(_ref) {
  var globalHeaderSize = _ref.globalHeaderSize,
      windowHeight = _ref.windowHeight;
  return Math.max(0, windowHeight - globalHeaderSize);
};

var HomePage = function HomePage() {
  var _useThrottledResizeOb = (0, _utils.useThrottledResizeObserver)(),
      measureRef = _useThrottledResizeOb.ref,
      _useThrottledResizeOb2 = _useThrottledResizeOb.height,
      windowHeight = _useThrottledResizeOb2 === void 0 ? 0 : _useThrottledResizeOb2;

  var flyoutHeight = (0, _react.useMemo)(function () {
    return calculateFlyoutHeight({
      globalHeaderSize: globalHeaderHeightPx,
      windowHeight: windowHeight
    });
  }, [windowHeight]);

  var _useShowTimeline = (0, _use_show_timeline.useShowTimeline)(),
      _useShowTimeline2 = _slicedToArray(_useShowTimeline, 1),
      showTimeline = _useShowTimeline2[0];

  return _react.default.createElement(WrappedByAutoSizer, {
    "data-test-subj": "wrapped-by-auto-sizer",
    ref: measureRef
  }, _react.default.createElement(_header_global.HeaderGlobal, null), _react.default.createElement(Main, {
    "data-test-subj": "pageContainer"
  }, _react.default.createElement(_source.WithSource, {
    sourceId: "default"
  }, function (_ref2) {
    var browserFields = _ref2.browserFields,
        indexPattern = _ref2.indexPattern,
        indicesExist = _ref2.indicesExist;
    return _react.default.createElement(_drag_drop_context_wrapper.DragDropContextWrapper, {
      browserFields: browserFields
    }, _react.default.createElement(_url_state.UseUrlState, {
      indexPattern: indexPattern,
      navTabs: _home_navigations.navTabs
    }), (0, _source.indicesExistOrDataTemporarilyUnavailable)(indicesExist) && showTimeline && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_auto_save_warning.AutoSaveWarningMsg, null), _react.default.createElement(_flyout.Flyout, {
      flyoutHeight: flyoutHeight,
      timelineId: "timeline-1",
      usersViewing: usersViewing
    })), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Redirect, {
      exact: true,
      from: "/",
      to: "/".concat(_types.SiemPageName.overview)
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/:pageName(".concat(_types.SiemPageName.overview, ")"),
      render: function render() {
        return _react.default.createElement(_overview.Overview, null);
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/:pageName(".concat(_types.SiemPageName.hosts, ")"),
      render: function render(_ref3) {
        var match = _ref3.match;
        return _react.default.createElement(_hosts.HostsContainer, {
          url: match.url
        });
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/:pageName(".concat(_types.SiemPageName.network, ")"),
      render: function render(_ref4) {
        var location = _ref4.location,
            match = _ref4.match;
        return _react.default.createElement(_network.NetworkContainer, {
          location: location,
          url: match.url
        });
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/:pageName(".concat(_types.SiemPageName.detections, ")"),
      render: function render(_ref5) {
        var location = _ref5.location,
            match = _ref5.match;
        return _react.default.createElement(_detection_engine.DetectionEngineContainer, {
          location: location,
          url: match.url
        });
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/:pageName(".concat(_types.SiemPageName.timelines, ")"),
      render: function render() {
        return _react.default.createElement(_timelines.Timelines, null);
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/link-to",
      render: function render(props) {
        return _react.default.createElement(_link_to.LinkToPage, props);
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/ml-hosts",
      render: function render(_ref6) {
        var location = _ref6.location,
            match = _ref6.match;
        return _react.default.createElement(_ml_host_conditional_container.MlHostConditionalContainer, {
          location: location,
          url: match.url
        });
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/ml-network",
      render: function render(_ref7) {
        var location = _ref7.location,
            match = _ref7.match;
        return _react.default.createElement(_ml_network_conditional_container.MlNetworkConditionalContainer, {
          location: location,
          url: match.url
        });
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/:pageName(".concat(_types.SiemPageName.case, ")")
    }, _react.default.createElement(_case.Case, null)), _react.default.createElement(_reactRouterDom.Route, {
      render: function render() {
        return _react.default.createElement(_.NotFoundPage, null);
      }
    })));
  })), _react.default.createElement(_help_menu.HelpMenu, null), _react.default.createElement(_spy_routes.SpyRoute, null));
};

exports.HomePage = HomePage;
HomePage.displayName = 'HomePage';
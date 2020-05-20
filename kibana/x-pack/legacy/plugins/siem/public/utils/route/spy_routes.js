"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpyRoute = exports.SpyRouteComponent = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _use_route_spy = require("./use_route_spy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SpyRouteComponent = (0, _react.memo)(function (_ref) {
  var _ref$location = _ref.location,
      pathname = _ref$location.pathname,
      search = _ref$location.search,
      history = _ref.history,
      _ref$match$params = _ref.match.params,
      pageName = _ref$match$params.pageName,
      detailName = _ref$match$params.detailName,
      tabName = _ref$match$params.tabName,
      flowTarget = _ref$match$params.flowTarget,
      state = _ref.state;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isInitializing = _useState2[0],
      setIsInitializing = _useState2[1];

  var _useRouteSpy = (0, _use_route_spy.useRouteSpy)(),
      _useRouteSpy2 = _slicedToArray(_useRouteSpy, 2),
      route = _useRouteSpy2[0],
      dispatch = _useRouteSpy2[1];

  (0, _react.useEffect)(function () {
    if (isInitializing && search !== '') {
      dispatch({
        type: 'updateSearch',
        search: search
      });
      setIsInitializing(false);
    }
  }, [search]);
  (0, _react.useEffect)(function () {
    if (pageName && !(0, _fastDeepEqual.default)(route.pathName, pathname)) {
      if (isInitializing && detailName == null) {
        dispatch({
          type: 'updateRouteWithOutSearch',
          route: {
            detailName: detailName,
            flowTarget: flowTarget,
            history: history,
            pageName: pageName,
            pathName: pathname,
            state: state,
            tabName: tabName
          }
        });
        setIsInitializing(false);
      } else {
        dispatch({
          type: 'updateRoute',
          route: {
            detailName: detailName,
            flowTarget: flowTarget,
            history: history,
            pageName: pageName,
            pathName: pathname,
            search: search,
            state: state,
            tabName: tabName
          }
        });
      }
    } else {
      if (pageName && !(0, _fastDeepEqual.default)(state, route.state)) {
        dispatch({
          type: 'updateRoute',
          route: {
            detailName: detailName,
            flowTarget: flowTarget,
            history: history,
            pageName: pageName,
            pathName: pathname,
            search: search,
            state: state,
            tabName: tabName
          }
        });
      }
    }
  }, [pathname, search, pageName, detailName, tabName, flowTarget, state]);
  return null;
});
exports.SpyRouteComponent = SpyRouteComponent;
var SpyRoute = (0, _reactRouterDom.withRouter)(SpyRouteComponent);
exports.SpyRoute = SpyRoute;
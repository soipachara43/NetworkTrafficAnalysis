"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SiemNavigation = exports.SiemNavigationRedux = exports.SiemNavigationComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _kibana = require("../../lib/kibana");

var _use_route_spy = require("../../utils/route/use_route_spy");

var _helpers = require("../url_state/helpers");

var _breadcrumbs = require("./breadcrumbs");

var _tab_navigation = require("./tab_navigation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SiemNavigationComponent = function SiemNavigationComponent(_ref) {
  var detailName = _ref.detailName,
      display = _ref.display,
      navTabs = _ref.navTabs,
      pageName = _ref.pageName,
      pathName = _ref.pathName,
      search = _ref.search,
      tabName = _ref.tabName,
      urlState = _ref.urlState,
      flowTarget = _ref.flowTarget,
      state = _ref.state;
  var chrome = (0, _kibana.useKibana)().services.chrome;
  (0, _react.useEffect)(function () {
    if (pathName) {
      (0, _breadcrumbs.setBreadcrumbs)({
        query: urlState.query,
        detailName: detailName,
        filters: urlState.filters,
        navTabs: navTabs,
        pageName: pageName,
        pathName: pathName,
        savedQuery: urlState.savedQuery,
        search: search,
        tabName: tabName,
        flowTarget: flowTarget,
        timerange: urlState.timerange,
        timeline: urlState.timeline,
        state: state
      }, chrome);
    }
  }, [chrome, pathName, search, navTabs, urlState, state]);
  return _react.default.createElement(_tab_navigation.TabNavigation, {
    query: urlState.query,
    display: display,
    filters: urlState.filters,
    navTabs: navTabs,
    pageName: pageName,
    pathName: pathName,
    savedQuery: urlState.savedQuery,
    tabName: tabName,
    timeline: urlState.timeline,
    timerange: urlState.timerange
  });
};

exports.SiemNavigationComponent = SiemNavigationComponent;
var SiemNavigationRedux = (0, _redux.compose)((0, _reactRedux.connect)(_helpers.makeMapStateToProps))(_react.default.memo(SiemNavigationComponent, function (prevProps, nextProps) {
  return prevProps.pathName === nextProps.pathName && prevProps.search === nextProps.search && (0, _fastDeepEqual.default)(prevProps.navTabs, nextProps.navTabs) && (0, _fastDeepEqual.default)(prevProps.urlState, nextProps.urlState) && (0, _fastDeepEqual.default)(prevProps.state, nextProps.state);
}));
exports.SiemNavigationRedux = SiemNavigationRedux;

var SiemNavigationContainer = function SiemNavigationContainer(props) {
  var _useRouteSpy = (0, _use_route_spy.useRouteSpy)(),
      _useRouteSpy2 = _slicedToArray(_useRouteSpy, 1),
      routeProps = _useRouteSpy2[0];

  var stateNavReduxProps = _objectSpread({}, routeProps, {}, props);

  return _react.default.createElement(SiemNavigationRedux, stateNavReduxProps);
};

var SiemNavigation = SiemNavigationContainer;
exports.SiemNavigation = SiemNavigation;
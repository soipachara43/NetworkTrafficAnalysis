"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseUrlState = exports.UrlStateRedux = exports.UrlStateContainer = void 0;

var _react = _interopRequireDefault(require("react"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _actions = require("../../store/actions");

var _use_route_spy = require("../../utils/route/use_route_spy");

var _use_url_state = require("./use_url_state");

var _helpers = require("../open_timeline/helpers");

var _initialize_redux_by_url = require("./initialize_redux_by_url");

var _helpers2 = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var UrlStateContainer = function UrlStateContainer(props) {
  (0, _use_url_state.useUrlStateHooks)(props);
  return null;
};

exports.UrlStateContainer = UrlStateContainer;

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setInitialStateFromUrl: (0, _initialize_redux_by_url.dispatchSetInitialStateFromUrl)(dispatch),
    updateTimeline: (0, _helpers.dispatchUpdateTimeline)(dispatch),
    updateTimelineIsLoading: function updateTimelineIsLoading(_ref) {
      var id = _ref.id,
          isLoading = _ref.isLoading;
      return dispatch(_actions.timelineActions.updateIsLoading({
        id: id,
        isLoading: isLoading
      }));
    }
  };
};

var UrlStateRedux = (0, _redux.compose)((0, _reactRedux.connect)(_helpers2.makeMapStateToProps, mapDispatchToProps))(_react.default.memo(UrlStateContainer, function (prevProps, nextProps) {
  return prevProps.pathName === nextProps.pathName && (0, _fastDeepEqual.default)(prevProps.urlState, nextProps.urlState);
}));
exports.UrlStateRedux = UrlStateRedux;

var UseUrlStateComponent = function UseUrlStateComponent(props) {
  var _useRouteSpy = (0, _use_route_spy.useRouteSpy)(),
      _useRouteSpy2 = _slicedToArray(_useRouteSpy, 1),
      routeProps = _useRouteSpy2[0];

  var urlStateReduxProps = _objectSpread({}, routeProps, {}, props);

  return _react.default.createElement(UrlStateRedux, urlStateReduxProps);
};

var UseUrlState = _react.default.memo(UseUrlStateComponent);

exports.UseUrlState = UseUrlState;
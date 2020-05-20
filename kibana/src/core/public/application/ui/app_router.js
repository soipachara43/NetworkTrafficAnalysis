"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppRouter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactUse = require("react-use");

var _types = require("../types");

var _app_container = require("./app_container");

var _scoped_history = require("../scoped_history");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var AppRouter = function AppRouter(_ref) {
  var history = _ref.history,
      mounters = _ref.mounters,
      setAppLeaveHandler = _ref.setAppLeaveHandler,
      appStatuses$ = _ref.appStatuses$;
  var appStatuses = (0, _reactUse.useObservable)(appStatuses$, new Map());
  var createScopedHistory = (0, _react.useMemo)(function () {
    return function (appPath) {
      return new _scoped_history.ScopedHistory(history, appPath);
    };
  }, [history]);
  return _react.default.createElement(_reactRouterDom.Router, {
    history: history
  }, _react.default.createElement(_reactRouterDom.Switch, null, _toConsumableArray(mounters).flatMap(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        appId = _ref3[0],
        mounter = _ref3[1];

    return (// Remove /app paths from the routes as they will be handled by the
      // "named" route parameter `:appId` below
      mounter.appBasePath.startsWith('/app') ? [] : [_react.default.createElement(_reactRouterDom.Route, {
        key: mounter.appRoute,
        path: mounter.appRoute,
        render: function render(_ref4) {
          var _appStatuses$get;

          var url = _ref4.match.url;
          return _react.default.createElement(_app_container.AppContainer, _extends({
            appPath: url,
            appStatus: (_appStatuses$get = appStatuses.get(appId)) !== null && _appStatuses$get !== void 0 ? _appStatuses$get : _types.AppStatus.inaccessible,
            createScopedHistory: createScopedHistory
          }, {
            appId: appId,
            mounter: mounter,
            setAppLeaveHandler: setAppLeaveHandler
          }));
        }
      })]
    );
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/app/:appId",
    render: function render(_ref5) {
      var _filter$, _appStatuses$get2;

      var _ref5$match = _ref5.match,
          appId = _ref5$match.params.appId,
          url = _ref5$match.url;

      // Find the mounter including legacy mounters with subapps:
      var _ref6 = mounters.has(appId) ? [appId, mounters.get(appId)] : (_filter$ = _toConsumableArray(mounters).filter(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 1),
            key = _ref9[0];

        return key.split(':')[0] === appId;
      })[0]) !== null && _filter$ !== void 0 ? _filter$ : [],
          _ref7 = _slicedToArray(_ref6, 2),
          id = _ref7[0],
          mounter = _ref7[1];

      return _react.default.createElement(_app_container.AppContainer, _extends({
        appPath: url,
        appId: id,
        appStatus: (_appStatuses$get2 = appStatuses.get(id)) !== null && _appStatuses$get2 !== void 0 ? _appStatuses$get2 : _types.AppStatus.inaccessible,
        createScopedHistory: createScopedHistory
      }, {
        mounter: mounter,
        setAppLeaveHandler: setAppLeaveHandler
      }));
    }
  })));
};

exports.AppRouter = AppRouter;
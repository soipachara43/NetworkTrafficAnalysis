"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UptimeRefreshContextProvider = exports.UptimeRefreshContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _state = require("../state");

var _actions = require("../state/actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultContext = {
  lastRefresh: 0,
  refreshApp: function refreshApp() {
    throw new Error('App refresh was not initialized, set it when you invoke the context');
  }
};
var UptimeRefreshContext = (0, _react.createContext)(defaultContext);
exports.UptimeRefreshContext = UptimeRefreshContext;

var UptimeRefreshContextProvider = function UptimeRefreshContextProvider(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)(Date.now()),
      _useState2 = _slicedToArray(_useState, 2),
      lastRefresh = _useState2[0],
      setLastRefresh = _useState2[1];

  var refreshApp = function refreshApp() {
    var refreshTime = Date.now();
    setLastRefresh(refreshTime); // @ts-ignore

    _state.store.dispatch((0, _actions.triggerAppRefresh)(refreshTime));
  };

  var value = (0, _react.useMemo)(function () {
    return {
      lastRefresh: lastRefresh,
      refreshApp: refreshApp
    };
  }, [lastRefresh]);
  return _react.default.createElement(UptimeRefreshContext.Provider, {
    value: value,
    children: children
  });
};

exports.UptimeRefreshContextProvider = UptimeRefreshContextProvider;
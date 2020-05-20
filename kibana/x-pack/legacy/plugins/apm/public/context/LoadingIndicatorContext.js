"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingIndicatorProvider = LoadingIndicatorProvider;
exports.LoadingIndicatorContext = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _useDelayedVisibility = require("../components/shared/useDelayedVisibility");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LoadingIndicatorContext = _react.default.createContext({
  statuses: {},
  dispatchStatus: function dispatchStatus(action) {
    return undefined;
  }
});

exports.LoadingIndicatorContext = LoadingIndicatorContext;

function reducer(statuses, action) {
  // add loading status
  if (action.isLoading) {
    return _objectSpread({}, statuses, _defineProperty({}, action.id, true));
  } // remove loading status


  var _action$id = action.id,
      statusToRemove = statuses[_action$id],
      restStatuses = _objectWithoutProperties(statuses, [_action$id].map(_toPropertyKey));

  return restStatuses;
}

function getIsAnyLoading(statuses) {
  return Object.values(statuses).some(function (isLoading) {
    return isLoading;
  });
}

function LoadingIndicatorProvider(_ref) {
  var children = _ref.children;

  var _useReducer = (0, _react.useReducer)(reducer, {}),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      statuses = _useReducer2[0],
      dispatchStatus = _useReducer2[1];

  var isLoading = (0, _react.useMemo)(function () {
    return getIsAnyLoading(statuses);
  }, [statuses]);
  var shouldShowLoadingIndicator = (0, _useDelayedVisibility.useDelayedVisibility)(isLoading);

  var contextValue = _react.default.useMemo(function () {
    return {
      statuses: statuses,
      dispatchStatus: dispatchStatus
    };
  }, [statuses]);

  return _react.default.createElement(_react.Fragment, null, shouldShowLoadingIndicator && _react.default.createElement(_eui.EuiPortal, null, _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    position: "fixed"
  })), _react.default.createElement(LoadingIndicatorContext.Provider, {
    value: contextValue,
    children: children
  }));
}
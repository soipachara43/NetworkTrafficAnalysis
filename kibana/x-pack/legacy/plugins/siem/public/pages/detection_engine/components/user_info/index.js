"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUserInfo = exports.ManageUserInfo = exports.userInfoReducer = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _use_privilege_user = require("../../../../containers/detection_engine/signals/use_privilege_user");

var _use_signal_index = require("../../../../containers/detection_engine/signals/use_signal_index");

var _kibana = require("../../../../lib/kibana");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  canUserCRUD: null,
  hasIndexManage: null,
  hasIndexWrite: null,
  isSignalIndexExists: null,
  isAuthenticated: null,
  hasEncryptionKey: null,
  loading: true,
  signalIndexName: null
};

var userInfoReducer = function userInfoReducer(state, action) {
  switch (action.type) {
    case 'updateLoading':
      {
        return _objectSpread({}, state, {
          loading: action.loading
        });
      }

    case 'updateHasIndexManage':
      {
        return _objectSpread({}, state, {
          hasIndexManage: action.hasIndexManage
        });
      }

    case 'updateHasIndexWrite':
      {
        return _objectSpread({}, state, {
          hasIndexWrite: action.hasIndexWrite
        });
      }

    case 'updateIsSignalIndexExists':
      {
        return _objectSpread({}, state, {
          isSignalIndexExists: action.isSignalIndexExists
        });
      }

    case 'updateIsAuthenticated':
      {
        return _objectSpread({}, state, {
          isAuthenticated: action.isAuthenticated
        });
      }

    case 'updateHasEncryptionKey':
      {
        return _objectSpread({}, state, {
          hasEncryptionKey: action.hasEncryptionKey
        });
      }

    case 'updateCanUserCRUD':
      {
        return _objectSpread({}, state, {
          canUserCRUD: action.canUserCRUD
        });
      }

    case 'updateSignalIndexName':
      {
        return _objectSpread({}, state, {
          signalIndexName: action.signalIndexName
        });
      }

    default:
      return state;
  }
};

exports.userInfoReducer = userInfoReducer;
var StateUserInfoContext = (0, _react.createContext)([initialState, function () {
  return _fp.noop;
}]);

var useUserData = function useUserData() {
  return (0, _react.useContext)(StateUserInfoContext);
};

var ManageUserInfo = function ManageUserInfo(_ref) {
  var children = _ref.children;
  return _react.default.createElement(StateUserInfoContext.Provider, {
    value: (0, _react.useReducer)(userInfoReducer, initialState)
  }, children);
};

exports.ManageUserInfo = ManageUserInfo;

var useUserInfo = function useUserInfo() {
  var _useUserData = useUserData(),
      _useUserData2 = _slicedToArray(_useUserData, 2),
      _useUserData2$ = _useUserData2[0],
      canUserCRUD = _useUserData2$.canUserCRUD,
      hasIndexManage = _useUserData2$.hasIndexManage,
      hasIndexWrite = _useUserData2$.hasIndexWrite,
      isSignalIndexExists = _useUserData2$.isSignalIndexExists,
      isAuthenticated = _useUserData2$.isAuthenticated,
      hasEncryptionKey = _useUserData2$.hasEncryptionKey,
      loading = _useUserData2$.loading,
      signalIndexName = _useUserData2$.signalIndexName,
      dispatch = _useUserData2[1];

  var _usePrivilegeUser = (0, _use_privilege_user.usePrivilegeUser)(),
      privilegeLoading = _usePrivilegeUser.loading,
      isApiAuthenticated = _usePrivilegeUser.isAuthenticated,
      isApiEncryptionKey = _usePrivilegeUser.hasEncryptionKey,
      hasApiIndexManage = _usePrivilegeUser.hasIndexManage,
      hasApiIndexWrite = _usePrivilegeUser.hasIndexWrite;

  var _useSignalIndex = (0, _use_signal_index.useSignalIndex)(),
      indexNameLoading = _useSignalIndex.loading,
      isApiSignalIndexExists = _useSignalIndex.signalIndexExists,
      apiSignalIndexName = _useSignalIndex.signalIndexName,
      createSignalIndex = _useSignalIndex.createDeSignalIndex;

  var uiCapabilities = (0, _kibana.useKibana)().services.application.capabilities;
  var capabilitiesCanUserCRUD = typeof uiCapabilities.siem.crud === 'boolean' ? uiCapabilities.siem.crud : false;
  (0, _react.useEffect)(function () {
    if (loading !== privilegeLoading || indexNameLoading) {
      dispatch({
        type: 'updateLoading',
        loading: privilegeLoading || indexNameLoading
      });
    }
  }, [loading, privilegeLoading, indexNameLoading]);
  (0, _react.useEffect)(function () {
    if (!loading && hasIndexManage !== hasApiIndexManage && hasApiIndexManage != null) {
      dispatch({
        type: 'updateHasIndexManage',
        hasIndexManage: hasApiIndexManage
      });
    }
  }, [loading, hasIndexManage, hasApiIndexManage]);
  (0, _react.useEffect)(function () {
    if (!loading && hasIndexWrite !== hasApiIndexWrite && hasApiIndexWrite != null) {
      dispatch({
        type: 'updateHasIndexWrite',
        hasIndexWrite: hasApiIndexWrite
      });
    }
  }, [loading, hasIndexWrite, hasApiIndexWrite]);
  (0, _react.useEffect)(function () {
    if (!loading && isSignalIndexExists !== isApiSignalIndexExists && isApiSignalIndexExists != null) {
      dispatch({
        type: 'updateIsSignalIndexExists',
        isSignalIndexExists: isApiSignalIndexExists
      });
    }
  }, [loading, isSignalIndexExists, isApiSignalIndexExists]);
  (0, _react.useEffect)(function () {
    if (!loading && isAuthenticated !== isApiAuthenticated && isApiAuthenticated != null) {
      dispatch({
        type: 'updateIsAuthenticated',
        isAuthenticated: isApiAuthenticated
      });
    }
  }, [loading, isAuthenticated, isApiAuthenticated]);
  (0, _react.useEffect)(function () {
    if (!loading && hasEncryptionKey !== isApiEncryptionKey && isApiEncryptionKey != null) {
      dispatch({
        type: 'updateHasEncryptionKey',
        hasEncryptionKey: isApiEncryptionKey
      });
    }
  }, [loading, hasEncryptionKey, isApiEncryptionKey]);
  (0, _react.useEffect)(function () {
    if (!loading && canUserCRUD !== capabilitiesCanUserCRUD && capabilitiesCanUserCRUD != null) {
      dispatch({
        type: 'updateCanUserCRUD',
        canUserCRUD: capabilitiesCanUserCRUD
      });
    }
  }, [loading, canUserCRUD, capabilitiesCanUserCRUD]);
  (0, _react.useEffect)(function () {
    if (!loading && signalIndexName !== apiSignalIndexName && apiSignalIndexName != null) {
      dispatch({
        type: 'updateSignalIndexName',
        signalIndexName: apiSignalIndexName
      });
    }
  }, [loading, signalIndexName, apiSignalIndexName]);
  (0, _react.useEffect)(function () {
    if (isAuthenticated && hasEncryptionKey && hasIndexManage && isSignalIndexExists != null && !isSignalIndexExists && createSignalIndex != null) {
      createSignalIndex();
    }
  }, [createSignalIndex, isAuthenticated, hasEncryptionKey, isSignalIndexExists, hasIndexManage]);
  return {
    loading: loading,
    isSignalIndexExists: isSignalIndexExists,
    isAuthenticated: isAuthenticated,
    hasEncryptionKey: hasEncryptionKey,
    canUserCRUD: canUserCRUD,
    hasIndexManage: hasIndexManage,
    hasIndexWrite: hasIndexWrite,
    signalIndexName: signalIndexName
  };
};

exports.useUserInfo = useUserInfo;
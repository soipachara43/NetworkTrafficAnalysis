"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  StateToasterContext: true,
  useStateToaster: true,
  ManageGlobalToaster: true,
  GlobalToaster: true
};
exports.GlobalToaster = exports.ManageGlobalToaster = exports.useStateToaster = exports.StateToasterContext = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _modal_all_errors = require("./modal_all_errors");

var i18n = _interopRequireWildcard(require("./translations"));

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

var _errors = require("./errors");

Object.keys(_errors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _errors[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialToasterState = {
  toasts: []
};
var StateToasterContext = (0, _react.createContext)([initialToasterState, function () {
  return _fp.noop;
}]);
exports.StateToasterContext = StateToasterContext;

var useStateToaster = function useStateToaster() {
  return (0, _react.useContext)(StateToasterContext);
};

exports.useStateToaster = useStateToaster;

var ManageGlobalToaster = function ManageGlobalToaster(_ref) {
  var children = _ref.children;

  var reducerToaster = function reducerToaster(state, action) {
    switch (action.type) {
      case 'addToaster':
        return _objectSpread({}, state, {
          toasts: [].concat(_toConsumableArray(state.toasts), [action.toast])
        });

      case 'deleteToaster':
        return _objectSpread({}, state, {
          toasts: state.toasts.filter(function (msg) {
            return msg.id !== action.id;
          })
        });

      default:
        return state;
    }
  };

  return _react.default.createElement(StateToasterContext.Provider, {
    value: (0, _react.useReducer)(reducerToaster, initialToasterState)
  }, children);
};

exports.ManageGlobalToaster = ManageGlobalToaster;

var GlobalToasterListContainer = _styledComponents.default.div.withConfig({
  displayName: "GlobalToasterListContainer",
  componentId: "sc-1sulctq-0"
})(["position:absolute;right:0;bottom:0;"]);

var GlobalToaster = function GlobalToaster(_ref2) {
  var _ref2$toastLifeTimeMs = _ref2.toastLifeTimeMs,
      toastLifeTimeMs = _ref2$toastLifeTimeMs === void 0 ? 5000 : _ref2$toastLifeTimeMs;

  var _useStateToaster = useStateToaster(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      toasts = _useStateToaster2[0].toasts,
      dispatch = _useStateToaster2[1];

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isShowing = _useState2[0],
      setIsShowing = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      toastInModal = _useState4[0],
      setToastInModal = _useState4[1];

  var toggle = function toggle(toast) {
    if (isShowing) {
      dispatch({
        type: 'deleteToaster',
        id: toast.id
      });
      setToastInModal(null);
    } else {
      setToastInModal(toast);
    }

    setIsShowing(!isShowing);
  };

  return _react.default.createElement(_react.default.Fragment, null, toasts.length > 0 && !isShowing && _react.default.createElement(GlobalToasterListContainer, null, _react.default.createElement(_eui.EuiGlobalToastList, {
    toasts: [formatToErrorToastIfNeeded(toasts[0], toggle)],
    dismissToast: function dismissToast(_ref3) {
      var id = _ref3.id;
      dispatch({
        type: 'deleteToaster',
        id: id
      });
    },
    toastLifeTimeMs: toastLifeTimeMs
  })), toastInModal != null && _react.default.createElement(_modal_all_errors.ModalAllErrors, {
    isShowing: isShowing,
    toast: toastInModal,
    toggle: toggle
  }));
};

exports.GlobalToaster = GlobalToaster;

var formatToErrorToastIfNeeded = function formatToErrorToastIfNeeded(toast, toggle) {
  if (toast != null && toast.errors != null && toast.errors.length > 0) {
    toast.text = _react.default.createElement(ErrorToastContainer, null, _react.default.createElement(_eui.EuiButton, {
      "data-test-subj": "toaster-show-all-error-modal",
      size: "s",
      color: "danger",
      onClick: function onClick() {
        return toast != null && toggle(toast);
      }
    }, i18n.SEE_ALL_ERRORS));
  }

  return toast;
};

var ErrorToastContainer = _styledComponents.default.div.withConfig({
  displayName: "ErrorToastContainer",
  componentId: "sc-1sulctq-1"
})(["text-align:right;"]);

ErrorToastContainer.displayName = 'ErrorToastContainer';
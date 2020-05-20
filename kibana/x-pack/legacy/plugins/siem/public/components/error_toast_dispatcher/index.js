"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorToastDispatcher = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _store = require("../../store");

var _app = require("../../store/app");

var _toasters = require("../toasters");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ErrorToastDispatcherComponent = function ErrorToastDispatcherComponent(_ref) {
  var _ref$toastLifeTimeMs = _ref.toastLifeTimeMs,
      toastLifeTimeMs = _ref$toastLifeTimeMs === void 0 ? 5000 : _ref$toastLifeTimeMs,
      _ref$errors = _ref.errors,
      errors = _ref$errors === void 0 ? [] : _ref$errors,
      removeError = _ref.removeError;

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      toasts = _useStateToaster2[0].toasts,
      dispatchToaster = _useStateToaster2[1];

  (0, _react.useEffect)(function () {
    errors.forEach(function (_ref2) {
      var id = _ref2.id,
          title = _ref2.title,
          message = _ref2.message;

      if (!toasts.some(function (toast) {
        return toast.id === id;
      })) {
        dispatchToaster({
          type: 'addToaster',
          toast: {
            color: 'danger',
            id: id,
            iconType: 'alert',
            title: title,
            errors: message,
            toastLifeTimeMs: toastLifeTimeMs
          }
        });
      }

      removeError({
        id: id
      });
    });
  });
  return null;
};

var makeMapStateToProps = function makeMapStateToProps() {
  var getErrorSelector = _store.appSelectors.errorsSelector();

  return function (state) {
    return getErrorSelector(state);
  };
};

var mapDispatchToProps = {
  removeError: _app.appActions.removeError
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var ErrorToastDispatcher = connector(ErrorToastDispatcherComponent);
exports.ErrorToastDispatcher = ErrorToastDispatcher;
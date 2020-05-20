"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFetcher = useFetcher;
exports.FETCH_STATUS = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _LoadingIndicatorContext = require("../context/LoadingIndicatorContext");

var _createCallApmApi = require("../services/rest/createCallApmApi");

var _useApmPluginContext = require("./useApmPluginContext");

var _useLoadingIndicator2 = require("./useLoadingIndicator");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FETCH_STATUS;
exports.FETCH_STATUS = FETCH_STATUS;

(function (FETCH_STATUS) {
  FETCH_STATUS["LOADING"] = "loading";
  FETCH_STATUS["SUCCESS"] = "success";
  FETCH_STATUS["FAILURE"] = "failure";
  FETCH_STATUS["PENDING"] = "pending";
})(FETCH_STATUS || (exports.FETCH_STATUS = FETCH_STATUS = {}));

function useFetcher(fn, fnDeps) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var notifications = (0, _useApmPluginContext.useApmPluginContext)().core.notifications;
  var _options$preservePrev = options.preservePreviousData,
      preservePreviousData = _options$preservePrev === void 0 ? true : _options$preservePrev;

  var _useLoadingIndicator = (0, _useLoadingIndicator2.useLoadingIndicator)(),
      setIsLoading = _useLoadingIndicator.setIsLoading;

  var _useContext = (0, _react.useContext)(_LoadingIndicatorContext.LoadingIndicatorContext),
      dispatchStatus = _useContext.dispatchStatus;

  var _useState = (0, _react.useState)({
    data: undefined,
    status: FETCH_STATUS.PENDING
  }),
      _useState2 = _slicedToArray(_useState, 2),
      result = _useState2[0],
      setResult = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      counter = _useState4[0],
      setCounter = _useState4[1];

  (0, _react.useEffect)(function () {
    var didCancel = false;

    function doFetch() {
      return _doFetch.apply(this, arguments);
    }

    function _doFetch() {
      _doFetch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var promise, data, err, _err$response, _err$response2, _err$response3, errorDetails;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                promise = fn(_createCallApmApi.callApmApi); // if `fn` doesn't return a promise it is a signal that data fetching was not initiated.
                // This can happen if the data fetching is conditional (based on certain inputs).
                // In these cases it is not desirable to invoke the global loading spinner, or change the status to success

                if (promise) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                setIsLoading(true);
                setResult(function (prevResult) {
                  return {
                    data: preservePreviousData ? prevResult.data : undefined,
                    // preserve data from previous state while loading next state
                    status: FETCH_STATUS.LOADING,
                    error: undefined
                  };
                });
                _context.prev = 5;
                _context.next = 8;
                return promise;

              case 8:
                data = _context.sent;

                if (!didCancel) {
                  setIsLoading(false);
                  setResult({
                    data: data,
                    status: FETCH_STATUS.SUCCESS,
                    error: undefined
                  });
                }

                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](5);
                err = _context.t0;

                if (!didCancel) {
                  errorDetails = 'response' in err ? _react.default.createElement(_react.default.Fragment, null, (_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.statusText, " (", (_err$response2 = err.response) === null || _err$response2 === void 0 ? void 0 : _err$response2.status, ")", _react.default.createElement("h5", null, _i18n.i18n.translate('xpack.apm.fetcher.error.url', {
                    defaultMessage: "URL"
                  })), (_err$response3 = err.response) === null || _err$response3 === void 0 ? void 0 : _err$response3.url) : err.message;
                  notifications.toasts.addWarning({
                    title: _i18n.i18n.translate('xpack.apm.fetcher.error.title', {
                      defaultMessage: "Error while fetching resource"
                    }),
                    text: (0, _public.toMountPoint)(_react.default.createElement("div", null, _react.default.createElement("h5", null, _i18n.i18n.translate('xpack.apm.fetcher.error.status', {
                      defaultMessage: "Error"
                    })), errorDetails))
                  });
                  setIsLoading(false);
                  setResult({
                    data: undefined,
                    status: FETCH_STATUS.FAILURE,
                    error: _context.t0
                  });
                }

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 12]]);
      }));
      return _doFetch.apply(this, arguments);
    }

    doFetch();
    return function () {
      setIsLoading(false);
      didCancel = true;
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [counter, preservePreviousData, dispatchStatus, setIsLoading].concat(_toConsumableArray(fnDeps)));
  return (0, _react.useMemo)(function () {
    return _objectSpread({}, result, {
      refetch: function refetch() {
        // this will invalidate the deps to `useEffect` and will result in a new request
        setCounter(function (count) {
          return count + 1;
        });
      }
    });
  }, [result]);
}
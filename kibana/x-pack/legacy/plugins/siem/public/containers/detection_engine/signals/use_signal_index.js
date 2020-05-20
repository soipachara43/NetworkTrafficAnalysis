"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSignalIndex = void 0;

var _react = require("react");

var _toasters = require("../../../components/toasters");

var _api = require("./api");

var i18n = _interopRequireWildcard(require("./translations"));

var _api2 = require("../../../utils/api");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Hook for managing signal index
 *
 *
 */
var useSignalIndex = function useSignalIndex() {
  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)({
    signalIndexExists: null,
    signalIndexName: null,
    createDeSignalIndex: null
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      signalIndex = _useState4[0],
      setSignalIndex = _useState4[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    var abortCtrl = new AbortController();

    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var signal;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                setLoading(true);
                _context.next = 4;
                return (0, _api.getSignalIndex)({
                  signal: abortCtrl.signal
                });

              case 4:
                signal = _context.sent;

                if (isSubscribed && signal != null) {
                  setSignalIndex({
                    signalIndexExists: true,
                    signalIndexName: signal.name,
                    createDeSignalIndex: createIndex
                  });
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                if (isSubscribed) {
                  setSignalIndex({
                    signalIndexExists: false,
                    signalIndexName: null,
                    createDeSignalIndex: createIndex
                  });

                  if ((0, _api2.isApiError)(_context.t0) && _context.t0.body.status_code !== 404) {
                    (0, _toasters.errorToToaster)({
                      title: i18n.SIGNAL_GET_NAME_FAILURE,
                      error: _context.t0,
                      dispatchToaster: dispatchToaster
                    });
                  }
                }

              case 11:
                if (isSubscribed) {
                  setLoading(false);
                }

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    var createIndex =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var isFetchingData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                isFetchingData = false;
                _context2.prev = 1;
                setLoading(true);
                _context2.next = 5;
                return (0, _api.createSignalIndex)({
                  signal: abortCtrl.signal
                });

              case 5:
                if (isSubscribed) {
                  isFetchingData = true;
                  fetchData();
                }

                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);

                if (isSubscribed) {
                  if ((0, _api2.isApiError)(_context2.t0) && _context2.t0.body.status_code === 409) {
                    fetchData();
                  } else {
                    setSignalIndex({
                      signalIndexExists: false,
                      signalIndexName: null,
                      createDeSignalIndex: createIndex
                    });
                    (0, _toasters.errorToToaster)({
                      title: i18n.SIGNAL_POST_FAILURE,
                      error: _context2.t0,
                      dispatchToaster: dispatchToaster
                    });
                  }
                }

              case 11:
                if (isSubscribed && !isFetchingData) {
                  setLoading(false);
                }

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      return function createIndex() {
        return _ref2.apply(this, arguments);
      };
    }();

    fetchData();
    return function () {
      isSubscribed = false;
      abortCtrl.abort();
    };
  }, []);
  return _objectSpread({
    loading: loading
  }, signalIndex);
};

exports.useSignalIndex = useSignalIndex;
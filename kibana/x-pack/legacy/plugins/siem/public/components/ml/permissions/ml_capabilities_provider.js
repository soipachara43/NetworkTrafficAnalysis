"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MlCapabilitiesProvider = exports.MlCapabilitiesContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _get_ml_capabilities = require("../api/get_ml_capabilities");

var _empty_ml_capabilities = require("../empty_ml_capabilities");

var _toasters = require("../../toasters");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var emptyMlCapabilitiesProvider = _objectSpread({}, _empty_ml_capabilities.emptyMlCapabilities, {
  capabilitiesFetched: false
});

var MlCapabilitiesContext = _react.default.createContext(emptyMlCapabilitiesProvider);

exports.MlCapabilitiesContext = MlCapabilitiesContext;
MlCapabilitiesContext.displayName = 'MlCapabilitiesContext';

var MlCapabilitiesProvider = _react.default.memo(function (_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)(emptyMlCapabilitiesProvider),
      _useState2 = _slicedToArray(_useState, 2),
      capabilities = _useState2[0],
      setCapabilities = _useState2[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    var abortCtrl = new AbortController();

    function fetchMlCapabilities() {
      return _fetchMlCapabilities.apply(this, arguments);
    }

    function _fetchMlCapabilities() {
      _fetchMlCapabilities = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var mlCapabilities;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _get_ml_capabilities.getMlCapabilities)(abortCtrl.signal);

              case 3:
                mlCapabilities = _context.sent;

                if (isSubscribed) {
                  setCapabilities(_objectSpread({}, mlCapabilities, {
                    capabilitiesFetched: true
                  }));
                }

                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);

                if (isSubscribed) {
                  (0, _toasters.errorToToaster)({
                    title: i18n.MACHINE_LEARNING_PERMISSIONS_FAILURE,
                    error: _context.t0,
                    dispatchToaster: dispatchToaster
                  });
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));
      return _fetchMlCapabilities.apply(this, arguments);
    }

    fetchMlCapabilities();
    return function () {
      isSubscribed = false;
      abortCtrl.abort();
    };
  }, []);
  return _react.default.createElement(MlCapabilitiesContext.Provider, {
    value: capabilities
  }, children);
});

exports.MlCapabilitiesProvider = MlCapabilitiesProvider;
MlCapabilitiesProvider.displayName = 'MlCapabilitiesProvider';
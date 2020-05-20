"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCaseConfigure = void 0;

var _react = require("react");

var _api = require("./api");

var _toasters = require("../../../components/toasters");

var i18n = _interopRequireWildcard(require("./translations"));

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

var useCaseConfigure = function useCaseConfigure(_ref) {
  var setConnector = _ref.setConnector,
      setClosureType = _ref.setClosureType,
      setCurrentConfiguration = _ref.setCurrentConfiguration;

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      firstLoad = _useState4[0],
      setFirstLoad = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      persistLoading = _useState6[0],
      setPersistLoading = _useState6[1];

  var _useState7 = (0, _react.useState)(''),
      _useState8 = _slicedToArray(_useState7, 2),
      version = _useState8[0],
      setVersion = _useState8[1];

  var refetchCaseConfigure = (0, _react.useCallback)(function () {
    var didCancel = false;
    var abortCtrl = new AbortController();

    var fetchCaseConfiguration =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                setLoading(true);
                _context.next = 4;
                return (0, _api.getCaseConfigure)({
                  signal: abortCtrl.signal
                });

              case 4:
                res = _context.sent;

                if (!didCancel) {
                  setLoading(false);

                  if (res != null) {
                    setConnector(res.connectorId, res.connectorName);

                    if (setClosureType != null) {
                      setClosureType(res.closureType);
                    }

                    setVersion(res.version);

                    if (!firstLoad) {
                      setFirstLoad(true);

                      if (setCurrentConfiguration != null) {
                        setCurrentConfiguration({
                          connectorId: res.connectorId,
                          closureType: res.closureType
                        });
                      }
                    }
                  }
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                if (!didCancel) {
                  setLoading(false);
                  (0, _toasters.errorToToaster)({
                    title: i18n.ERROR_TITLE,
                    error: _context.t0.body && _context.t0.body.message ? new Error(_context.t0.body.message) : _context.t0,
                    dispatchToaster: dispatchToaster
                  });
                }

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      return function fetchCaseConfiguration() {
        return _ref2.apply(this, arguments);
      };
    }();

    fetchCaseConfiguration();
    return function () {
      didCancel = true;
      abortCtrl.abort();
    };
  }, []);
  var persistCaseConfigure = (0, _react.useCallback)(
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(_ref4) {
      var connectorId, connectorName, closureType, didCancel, abortCtrl, saveCaseConfiguration;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              connectorId = _ref4.connectorId, connectorName = _ref4.connectorName, closureType = _ref4.closureType;
              didCancel = false;
              abortCtrl = new AbortController();

              saveCaseConfiguration =
              /*#__PURE__*/
              function () {
                var _ref5 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee2() {
                  var connectorObj, res;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.prev = 0;
                          setPersistLoading(true);
                          connectorObj = {
                            connector_id: connectorId,
                            connector_name: connectorName,
                            closure_type: closureType
                          };

                          if (!(version.length === 0)) {
                            _context2.next = 9;
                            break;
                          }

                          _context2.next = 6;
                          return (0, _api.postCaseConfigure)(connectorObj, abortCtrl.signal);

                        case 6:
                          _context2.t0 = _context2.sent;
                          _context2.next = 12;
                          break;

                        case 9:
                          _context2.next = 11;
                          return (0, _api.patchCaseConfigure)(_objectSpread({}, connectorObj, {
                            version: version
                          }), abortCtrl.signal);

                        case 11:
                          _context2.t0 = _context2.sent;

                        case 12:
                          res = _context2.t0;

                          if (!didCancel) {
                            setPersistLoading(false);
                            setConnector(res.connectorId);

                            if (setClosureType) {
                              setClosureType(res.closureType);
                            }

                            setVersion(res.version);

                            if (setCurrentConfiguration != null) {
                              setCurrentConfiguration({
                                connectorId: res.connectorId,
                                closureType: res.closureType
                              });
                            }

                            (0, _toasters.displaySuccessToast)(i18n.SUCCESS_CONFIGURE, dispatchToaster);
                          }

                          _context2.next = 19;
                          break;

                        case 16:
                          _context2.prev = 16;
                          _context2.t1 = _context2["catch"](0);

                          if (!didCancel) {
                            setPersistLoading(false);
                            (0, _toasters.errorToToaster)({
                              title: i18n.ERROR_TITLE,
                              error: _context2.t1.body && _context2.t1.body.message ? new Error(_context2.t1.body.message) : _context2.t1,
                              dispatchToaster: dispatchToaster
                            });
                          }

                        case 19:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, null, [[0, 16]]);
                }));

                return function saveCaseConfiguration() {
                  return _ref5.apply(this, arguments);
                };
              }();

              saveCaseConfiguration();
              return _context3.abrupt("return", function () {
                didCancel = true;
                abortCtrl.abort();
              });

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), [version]);
  (0, _react.useEffect)(function () {
    refetchCaseConfigure();
  }, []);
  return {
    loading: loading,
    refetchCaseConfigure: refetchCaseConfigure,
    persistCaseConfigure: persistCaseConfigure,
    persistLoading: persistLoading
  };
};

exports.useCaseConfigure = useCaseConfigure;
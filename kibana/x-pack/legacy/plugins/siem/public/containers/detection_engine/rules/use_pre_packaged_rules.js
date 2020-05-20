"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrePackagedRules = void 0;

var _react = require("react");

var _toasters = require("../../../components/toasters");

var _api = require("./api");

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

/**
 * Hook for using to get status about pre-packaged Rules from the Detection Engine API
 *
 * @param hasIndexWrite boolean
 * @param isAuthenticated boolean
 * @param hasEncryptionKey boolean
 * @param isSignalIndexExists boolean
 *
 */
var usePrePackagedRules = function usePrePackagedRules(_ref) {
  var canUserCRUD = _ref.canUserCRUD,
      hasIndexWrite = _ref.hasIndexWrite,
      isAuthenticated = _ref.isAuthenticated,
      hasEncryptionKey = _ref.hasEncryptionKey,
      isSignalIndexExists = _ref.isSignalIndexExists;

  var _useState = (0, _react.useState)({
    createPrePackagedRules: null,
    refetchPrePackagedRulesStatus: null,
    rulesCustomInstalled: null,
    rulesInstalled: null,
    rulesNotInstalled: null,
    rulesNotUpdated: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      rulesStatus = _useState2[0],
      setRuleStatus = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loadingCreatePrePackagedRules = _useState4[0],
      setLoadingCreatePrePackagedRules = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    var abortCtrl = new AbortController();

    var fetchPrePackagedRules =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var prePackagedRuleStatusResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                setLoading(true);
                _context.next = 4;
                return (0, _api.getPrePackagedRulesStatus)({
                  signal: abortCtrl.signal
                });

              case 4:
                prePackagedRuleStatusResponse = _context.sent;

                if (isSubscribed) {
                  setRuleStatus({
                    createPrePackagedRules: createElasticRules,
                    refetchPrePackagedRulesStatus: fetchPrePackagedRules,
                    rulesCustomInstalled: prePackagedRuleStatusResponse.rules_custom_installed,
                    rulesInstalled: prePackagedRuleStatusResponse.rules_installed,
                    rulesNotInstalled: prePackagedRuleStatusResponse.rules_not_installed,
                    rulesNotUpdated: prePackagedRuleStatusResponse.rules_not_updated
                  });
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                if (isSubscribed) {
                  setRuleStatus({
                    createPrePackagedRules: null,
                    refetchPrePackagedRulesStatus: null,
                    rulesCustomInstalled: null,
                    rulesInstalled: null,
                    rulesNotInstalled: null,
                    rulesNotUpdated: null
                  });
                  (0, _toasters.errorToToaster)({
                    title: i18n.RULE_FETCH_FAILURE,
                    error: _context.t0,
                    dispatchToaster: dispatchToaster
                  });
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

      return function fetchPrePackagedRules() {
        return _ref2.apply(this, arguments);
      };
    }();

    var createElasticRules =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3(resolve) {
                    var iterationTryOfFetchingPrePackagedCount, timeoutId, stopTimeOut, reFetch;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.prev = 0;

                            if (!(canUserCRUD && hasIndexWrite && isAuthenticated && hasEncryptionKey && isSignalIndexExists)) {
                              _context3.next = 8;
                              break;
                            }

                            setLoadingCreatePrePackagedRules(true);
                            _context3.next = 5;
                            return (0, _api.createPrepackagedRules)({
                              signal: abortCtrl.signal
                            });

                          case 5:
                            if (isSubscribed) {
                              iterationTryOfFetchingPrePackagedCount = 0;
                              timeoutId = -1;

                              stopTimeOut = function stopTimeOut() {
                                if (timeoutId !== -1) {
                                  window.clearTimeout(timeoutId);
                                }
                              };

                              reFetch = function reFetch() {
                                return window.setTimeout(
                                /*#__PURE__*/
                                _asyncToGenerator(
                                /*#__PURE__*/
                                regeneratorRuntime.mark(function _callee2() {
                                  var prePackagedRuleStatusResponse;
                                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                      switch (_context2.prev = _context2.next) {
                                        case 0:
                                          iterationTryOfFetchingPrePackagedCount = iterationTryOfFetchingPrePackagedCount + 1;
                                          _context2.next = 3;
                                          return (0, _api.getPrePackagedRulesStatus)({
                                            signal: abortCtrl.signal
                                          });

                                        case 3:
                                          prePackagedRuleStatusResponse = _context2.sent;

                                          if (isSubscribed && (prePackagedRuleStatusResponse.rules_not_installed === 0 && prePackagedRuleStatusResponse.rules_not_updated === 0 || iterationTryOfFetchingPrePackagedCount > 100)) {
                                            setLoadingCreatePrePackagedRules(false);
                                            setRuleStatus({
                                              createPrePackagedRules: createElasticRules,
                                              refetchPrePackagedRulesStatus: fetchPrePackagedRules,
                                              rulesCustomInstalled: prePackagedRuleStatusResponse.rules_custom_installed,
                                              rulesInstalled: prePackagedRuleStatusResponse.rules_installed,
                                              rulesNotInstalled: prePackagedRuleStatusResponse.rules_not_installed,
                                              rulesNotUpdated: prePackagedRuleStatusResponse.rules_not_updated
                                            });
                                            (0, _toasters.displaySuccessToast)(i18n.RULE_PREPACKAGED_SUCCESS, dispatchToaster);
                                            stopTimeOut();
                                            resolve(true);
                                          } else {
                                            timeoutId = reFetch();
                                          }

                                        case 5:
                                        case "end":
                                          return _context2.stop();
                                      }
                                    }
                                  }, _callee2);
                                })), 300);
                              };

                              timeoutId = reFetch();
                            }

                            _context3.next = 9;
                            break;

                          case 8:
                            resolve(false);

                          case 9:
                            _context3.next = 14;
                            break;

                          case 11:
                            _context3.prev = 11;
                            _context3.t0 = _context3["catch"](0);

                            if (isSubscribed) {
                              setLoadingCreatePrePackagedRules(false);
                              (0, _toasters.errorToToaster)({
                                title: i18n.RULE_PREPACKAGED_FAILURE,
                                error: _context3.t0,
                                dispatchToaster: dispatchToaster
                              });
                              resolve(false);
                            }

                          case 14:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, null, [[0, 11]]);
                  }));

                  return function (_x) {
                    return _ref4.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function createElasticRules() {
        return _ref3.apply(this, arguments);
      };
    }();

    fetchPrePackagedRules();
    return function () {
      isSubscribed = false;
      abortCtrl.abort();
    };
  }, [canUserCRUD, hasIndexWrite, isAuthenticated, hasEncryptionKey, isSignalIndexExists]);
  return _objectSpread({
    loading: loading,
    loadingCreatePrePackagedRules: loadingCreatePrePackagedRules
  }, rulesStatus);
};

exports.usePrePackagedRules = usePrePackagedRules;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRulesStatuses = exports.useRuleStatus = void 0;

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
 * Hook for using to get a Rule from the Detection Engine API
 *
 * @param id desired Rule ID's (not rule_id)
 *
 */
var useRuleStatus = function useRuleStatus(id) {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      ruleStatus = _useState2[0],
      setRuleStatus = _useState2[1];

  var fetchRuleStatus = (0, _react.useRef)(null);

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

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
      regeneratorRuntime.mark(function _callee(idToFetch) {
        var ruleStatusResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                setLoading(true);
                _context.next = 4;
                return (0, _api.getRuleStatusById)({
                  id: idToFetch,
                  signal: abortCtrl.signal
                });

              case 4:
                ruleStatusResponse = _context.sent;

                if (isSubscribed) {
                  setRuleStatus(ruleStatusResponse[id !== null && id !== void 0 ? id : '']);
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                if (isSubscribed) {
                  setRuleStatus(null);
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

      return function fetchData(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    if (id != null) {
      fetchData(id);
    }

    fetchRuleStatus.current = fetchData;
    return function () {
      isSubscribed = false;
      abortCtrl.abort();
    };
  }, [id]);
  return [loading, ruleStatus, fetchRuleStatus.current];
};
/**
 * Hook for using to get all the statuses for all given rule ids
 *
 * @param ids desired Rule ID's (not rule_id)
 *
 */


exports.useRuleStatus = useRuleStatus;

var useRulesStatuses = function useRulesStatuses(rules) {
  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      rulesStatuses = _useState6[0],
      setRuleStatuses = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      loading = _useState8[0],
      setLoading = _useState8[1];

  var _useStateToaster3 = (0, _toasters.useStateToaster)(),
      _useStateToaster4 = _slicedToArray(_useStateToaster3, 2),
      dispatchToaster = _useStateToaster4[1];

  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    var abortCtrl = new AbortController();

    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(ids) {
        var ruleStatusesResponse;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                setLoading(true);
                _context2.next = 4;
                return (0, _api.getRulesStatusByIds)({
                  ids: ids,
                  signal: abortCtrl.signal
                });

              case 4:
                ruleStatusesResponse = _context2.sent;

                if (isSubscribed) {
                  setRuleStatuses(rules.map(function (rule) {
                    return _objectSpread({
                      id: rule.id,
                      activate: rule.enabled,
                      name: rule.name
                    }, ruleStatusesResponse[rule.id]);
                  }));
                }

                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);

                if (isSubscribed) {
                  setRuleStatuses([]);
                  (0, _toasters.errorToToaster)({
                    title: i18n.RULE_FETCH_FAILURE,
                    error: _context2.t0,
                    dispatchToaster: dispatchToaster
                  });
                }

              case 11:
                if (isSubscribed) {
                  setLoading(false);
                }

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      return function fetchData(_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    if (rules != null && rules.length > 0) {
      fetchData(rules.map(function (r) {
        return r.id;
      }));
    }

    return function () {
      isSubscribed = false;
      abortCtrl.abort();
    };
  }, [rules]);
  return {
    loading: loading,
    rulesStatuses: rulesStatuses
  };
};

exports.useRulesStatuses = useRulesStatuses;
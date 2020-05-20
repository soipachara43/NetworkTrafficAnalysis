"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRules = void 0;

var _fp = require("lodash/fp");

var _react = require("react");

var _toasters = require("../../../components/toasters");

var _api = require("./api");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Hook for using the list of Rules from the Detection Engine API
 *
 * @param pagination desired pagination options (e.g. page/perPage)
 * @param filterOptions desired filters (e.g. filter/sortField/sortOrder)
 */
var useRules = function useRules(_ref) {
  var _filterOptions$tags;

  var pagination = _ref.pagination,
      filterOptions = _ref.filterOptions,
      refetchPrePackagedRulesStatus = _ref.refetchPrePackagedRulesStatus,
      dispatchRulesInReducer = _ref.dispatchRulesInReducer;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      rules = _useState2[0],
      setRules = _useState2[1];

  var reFetchRules = (0, _react.useRef)(_fp.noop);

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

    function fetchData() {
      return _fetchData.apply(this, arguments);
    }

    function _fetchData() {
      _fetchData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var forceReload,
            fetchRulesResult,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                forceReload = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
                _context.prev = 1;
                setLoading(true);
                _context.next = 5;
                return (0, _api.fetchRules)({
                  filterOptions: filterOptions,
                  pagination: pagination,
                  signal: abortCtrl.signal
                });

              case 5:
                fetchRulesResult = _context.sent;

                if (isSubscribed) {
                  setRules(fetchRulesResult);

                  if (dispatchRulesInReducer != null) {
                    dispatchRulesInReducer(fetchRulesResult.data, {
                      page: fetchRulesResult.page,
                      perPage: fetchRulesResult.perPage,
                      total: fetchRulesResult.total
                    });
                  }
                }

                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);

                if (isSubscribed) {
                  (0, _toasters.errorToToaster)({
                    title: i18n.RULE_FETCH_FAILURE,
                    error: _context.t0,
                    dispatchToaster: dispatchToaster
                  });

                  if (dispatchRulesInReducer != null) {
                    dispatchRulesInReducer([], {});
                  }
                }

              case 12:
                if (isSubscribed) {
                  setLoading(false);
                }

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9]]);
      }));
      return _fetchData.apply(this, arguments);
    }

    fetchData();

    reFetchRules.current = function () {
      var refreshPrePackagedRule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      fetchData(true);

      if (refreshPrePackagedRule && refetchPrePackagedRulesStatus != null) {
        refetchPrePackagedRulesStatus();
      }
    };

    return function () {
      isSubscribed = false;
      abortCtrl.abort();
    };
  }, [pagination.page, pagination.perPage, filterOptions.filter, filterOptions.sortField, filterOptions.sortOrder, (_filterOptions$tags = filterOptions.tags) === null || _filterOptions$tags === void 0 ? void 0 : _filterOptions$tags.sort().join(), filterOptions.showCustomRules, filterOptions.showElasticRules, refetchPrePackagedRulesStatus]);
  return [loading, rules, reFetchRules.current];
};

exports.useRules = useRules;
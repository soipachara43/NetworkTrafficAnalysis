"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetCases = exports.DEFAULT_QUERY_PARAMS = exports.DEFAULT_FILTER_OPTIONS = void 0;

var _react = require("react");

var _constants = require("./constants");

var _types = require("./types");

var _toasters = require("../../components/toasters");

var i18n = _interopRequireWildcard(require("./translations"));

var _api = require("./api");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var dataFetchReducer = function dataFetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return _objectSpread({}, state, {
        isError: false,
        loading: [].concat(_toConsumableArray(state.loading.filter(function (e) {
          return e !== action.payload;
        })), [action.payload])
      });

    case 'FETCH_UPDATE_CASE_SUCCESS':
      return _objectSpread({}, state, {
        loading: state.loading.filter(function (e) {
          return e !== 'caseUpdate';
        })
      });

    case 'FETCH_CASES_SUCCESS':
      return _objectSpread({}, state, {
        data: action.payload,
        isError: false,
        loading: state.loading.filter(function (e) {
          return e !== 'cases';
        })
      });

    case 'FETCH_FAILURE':
      return _objectSpread({}, state, {
        isError: true,
        loading: state.loading.filter(function (e) {
          return e !== action.payload;
        })
      });

    case 'UPDATE_FILTER_OPTIONS':
      return _objectSpread({}, state, {
        filterOptions: _objectSpread({}, state.filterOptions, {}, action.payload)
      });

    case 'UPDATE_QUERY_PARAMS':
      return _objectSpread({}, state, {
        queryParams: _objectSpread({}, state.queryParams, {}, action.payload)
      });

    case 'UPDATE_TABLE_SELECTIONS':
      return _objectSpread({}, state, {
        selectedCases: action.payload
      });

    default:
      return state;
  }
};

var DEFAULT_FILTER_OPTIONS = {
  search: '',
  reporters: [],
  status: 'open',
  tags: []
};
exports.DEFAULT_FILTER_OPTIONS = DEFAULT_FILTER_OPTIONS;
var DEFAULT_QUERY_PARAMS = {
  page: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
  perPage: _constants.DEFAULT_TABLE_LIMIT,
  sortField: _types.SortFieldCase.createdAt,
  sortOrder: 'desc'
};
exports.DEFAULT_QUERY_PARAMS = DEFAULT_QUERY_PARAMS;
var initialData = {
  cases: [],
  countClosedCases: null,
  countOpenCases: null,
  page: 0,
  perPage: 0,
  total: 0
};

var useGetCases = function useGetCases(initialQueryParams) {
  var _useReducer = (0, _react.useReducer)(dataFetchReducer, {
    data: initialData,
    filterOptions: DEFAULT_FILTER_OPTIONS,
    isError: false,
    loading: [],
    queryParams: initialQueryParams !== null && initialQueryParams !== void 0 ? initialQueryParams : DEFAULT_QUERY_PARAMS,
    selectedCases: []
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var setSelectedCases = (0, _react.useCallback)(function (mySelectedCases) {
    dispatch({
      type: 'UPDATE_TABLE_SELECTIONS',
      payload: mySelectedCases
    });
  }, []);
  var setQueryParams = (0, _react.useCallback)(function (newQueryParams) {
    dispatch({
      type: 'UPDATE_QUERY_PARAMS',
      payload: newQueryParams
    });
  }, []);
  var setFilters = (0, _react.useCallback)(function (newFilters) {
    dispatch({
      type: 'UPDATE_FILTER_OPTIONS',
      payload: newFilters
    });
  }, []);
  var fetchCases = (0, _react.useCallback)(function (filterOptions, queryParams) {
    var didCancel = false;
    var abortCtrl = new AbortController();

    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch({
                  type: 'FETCH_INIT',
                  payload: 'cases'
                });
                _context.prev = 1;
                _context.next = 4;
                return (0, _api.getCases)({
                  filterOptions: filterOptions,
                  queryParams: queryParams,
                  signal: abortCtrl.signal
                });

              case 4:
                response = _context.sent;

                if (!didCancel) {
                  dispatch({
                    type: 'FETCH_CASES_SUCCESS',
                    payload: response
                  });
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);

                if (!didCancel) {
                  (0, _toasters.errorToToaster)({
                    title: i18n.ERROR_TITLE,
                    error: _context.t0.body && _context.t0.body.message ? new Error(_context.t0.body.message) : _context.t0,
                    dispatchToaster: dispatchToaster
                  });
                  dispatch({
                    type: 'FETCH_FAILURE',
                    payload: 'cases'
                  });
                }

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    fetchData();
    return function () {
      abortCtrl.abort();
      didCancel = true;
    };
  }, []);
  (0, _react.useEffect)(function () {
    return fetchCases(state.filterOptions, state.queryParams);
  }, [state.queryParams, state.filterOptions]);
  var dispatchUpdateCaseProperty = (0, _react.useCallback)(function (_ref2) {
    var updateKey = _ref2.updateKey,
        updateValue = _ref2.updateValue,
        caseId = _ref2.caseId,
        refetchCasesStatus = _ref2.refetchCasesStatus,
        version = _ref2.version;
    var didCancel = false;
    var abortCtrl = new AbortController();

    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dispatch({
                  type: 'FETCH_INIT',
                  payload: 'caseUpdate'
                });
                _context2.prev = 1;
                _context2.next = 4;
                return (0, _api.patchCase)(caseId, _defineProperty({}, updateKey, updateValue), // saved object versions are typed as string | undefined, hope that's not true
                version !== null && version !== void 0 ? version : '', abortCtrl.signal);

              case 4:
                if (!didCancel) {
                  dispatch({
                    type: 'FETCH_UPDATE_CASE_SUCCESS'
                  });
                  fetchCases(state.filterOptions, state.queryParams);
                  refetchCasesStatus();
                }

                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](1);

                if (!didCancel) {
                  (0, _toasters.errorToToaster)({
                    title: i18n.ERROR_TITLE,
                    error: _context2.t0,
                    dispatchToaster: dispatchToaster
                  });
                  dispatch({
                    type: 'FETCH_FAILURE',
                    payload: 'caseUpdate'
                  });
                }

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 7]]);
      }));

      return function fetchData() {
        return _ref3.apply(this, arguments);
      };
    }();

    fetchData();
    return function () {
      abortCtrl.abort();
      didCancel = true;
    };
  }, [state.filterOptions, state.queryParams]);
  var refetchCases = (0, _react.useCallback)(function () {
    fetchCases(state.filterOptions, state.queryParams);
  }, [state.filterOptions, state.queryParams]);
  return _objectSpread({}, state, {
    dispatchUpdateCaseProperty: dispatchUpdateCaseProperty,
    refetchCases: refetchCases,
    setFilters: setFilters,
    setQueryParams: setQueryParams,
    setSelectedCases: setSelectedCases
  });
};

exports.useGetCases = useGetCases;
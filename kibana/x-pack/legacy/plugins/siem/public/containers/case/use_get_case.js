"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetCase = void 0;

var _react = require("react");

var i18n = _interopRequireWildcard(require("./translations"));

var _toasters = require("../../components/toasters");

var _api = require("./api");

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

var dataFetchReducer = function dataFetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return _objectSpread({}, state, {
        isLoading: true,
        isError: false
      });

    case 'FETCH_SUCCESS':
      return _objectSpread({}, state, {
        isLoading: false,
        isError: false,
        data: action.payload
      });

    case 'FETCH_FAILURE':
      return _objectSpread({}, state, {
        isLoading: false,
        isError: true
      });

    case 'UPDATE_CASE':
      return _objectSpread({}, state, {
        data: action.payload
      });

    default:
      return state;
  }
};

var initialData = {
  id: '',
  closedAt: null,
  closedBy: null,
  createdAt: '',
  comments: [],
  createdBy: {
    username: ''
  },
  description: '',
  externalService: null,
  status: '',
  tags: [],
  title: '',
  totalComment: 0,
  updatedAt: null,
  updatedBy: null,
  version: ''
};

var useGetCase = function useGetCase(caseId) {
  var _useReducer = (0, _react.useReducer)(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: initialData
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var updateCase = (0, _react.useCallback)(function (newCase) {
    dispatch({
      type: 'UPDATE_CASE',
      payload: newCase
    });
  }, []);
  var callFetch = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var didCancel, abortCtrl, fetchData;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            didCancel = false;
            abortCtrl = new AbortController();

            fetchData =
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        dispatch({
                          type: 'FETCH_INIT'
                        });
                        _context.prev = 1;
                        _context.next = 4;
                        return (0, _api.getCase)(caseId, true, abortCtrl.signal);

                      case 4:
                        response = _context.sent;

                        if (!didCancel) {
                          dispatch({
                            type: 'FETCH_SUCCESS',
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
                            type: 'FETCH_FAILURE'
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
                return _ref2.apply(this, arguments);
              };
            }();

            fetchData();
            return _context2.abrupt("return", function () {
              didCancel = true;
              abortCtrl.abort();
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), [caseId]);
  (0, _react.useEffect)(function () {
    callFetch();
  }, [caseId]);
  return _objectSpread({}, state, {
    fetchCase: callFetch,
    updateCase: updateCase
  });
};

exports.useGetCase = useGetCase;
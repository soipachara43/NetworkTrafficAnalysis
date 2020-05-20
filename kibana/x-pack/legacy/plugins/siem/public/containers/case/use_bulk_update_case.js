"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUpdateCases = void 0;

var _react = require("react");

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
        isUpdated: action.payload
      });

    case 'FETCH_FAILURE':
      return _objectSpread({}, state, {
        isLoading: false,
        isError: true
      });

    case 'RESET_IS_UPDATED':
      return _objectSpread({}, state, {
        isUpdated: false
      });

    default:
      return state;
  }
};

var useUpdateCases = function useUpdateCases() {
  var _useReducer = (0, _react.useReducer)(dataFetchReducer, {
    isLoading: false,
    isError: false,
    isUpdated: false
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var dispatchUpdateCases = (0, _react.useCallback)(function (cases) {
    var cancel = false;
    var abortCtrl = new AbortController();

    var patchData =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var patchResponse, resultCount, firstTitle, messageArgs, message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                dispatch({
                  type: 'FETCH_INIT'
                });
                _context.next = 4;
                return (0, _api.patchCasesStatus)(cases, abortCtrl.signal);

              case 4:
                patchResponse = _context.sent;

                if (!cancel) {
                  resultCount = Object.keys(patchResponse).length;
                  firstTitle = patchResponse[0].title;
                  dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: true
                  });
                  messageArgs = {
                    totalCases: resultCount,
                    caseTitle: resultCount === 1 ? firstTitle : ''
                  };
                  message = resultCount && patchResponse[0].status === 'open' ? i18n.REOPENED_CASES(messageArgs) : i18n.CLOSED_CASES(messageArgs);
                  (0, _toasters.displaySuccessToast)(message, dispatchToaster);
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                if (!cancel) {
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
        }, _callee, null, [[0, 8]]);
      }));

      return function patchData() {
        return _ref.apply(this, arguments);
      };
    }();

    patchData();
    return function () {
      cancel = true;
      abortCtrl.abort();
    };
  }, []);
  var dispatchResetIsUpdated = (0, _react.useCallback)(function () {
    dispatch({
      type: 'RESET_IS_UPDATED'
    });
  }, []);
  var updateBulkStatus = (0, _react.useCallback)(function (cases, status) {
    var updateCasesStatus = cases.map(function (theCase) {
      return {
        status: status,
        id: theCase.id,
        version: theCase.version
      };
    });
    dispatchUpdateCases(updateCasesStatus);
  }, []);
  return _objectSpread({}, state, {
    updateBulkStatus: updateBulkStatus,
    dispatchResetIsUpdated: dispatchResetIsUpdated
  });
};

exports.useUpdateCases = useUpdateCases;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUpdateComment = void 0;

var _react = require("react");

var _toasters = require("../../components/toasters");

var _api = require("./api");

var i18n = _interopRequireWildcard(require("./translations"));

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
        isLoadingIds: [].concat(_toConsumableArray(state.isLoadingIds), [action.payload]),
        isError: false
      });

    case 'FETCH_SUCCESS':
      return _objectSpread({}, state, {
        isLoadingIds: state.isLoadingIds.filter(function (id) {
          return action.payload.commentId !== id;
        }),
        isError: false
      });

    case 'FETCH_FAILURE':
      return _objectSpread({}, state, {
        isLoadingIds: state.isLoadingIds.filter(function (id) {
          return action.payload !== id;
        }),
        isError: true
      });

    default:
      return state;
  }
};

var useUpdateComment = function useUpdateComment() {
  var _useReducer = (0, _react.useReducer)(dataFetchReducer, {
    isLoadingIds: [],
    isError: false
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var dispatchUpdateComment = (0, _react.useCallback)(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref2) {
      var caseId, commentId, commentUpdate, fetchUserActions, updateCase, version, cancel, abortCtrl, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              caseId = _ref2.caseId, commentId = _ref2.commentId, commentUpdate = _ref2.commentUpdate, fetchUserActions = _ref2.fetchUserActions, updateCase = _ref2.updateCase, version = _ref2.version;
              cancel = false;
              abortCtrl = new AbortController();
              _context.prev = 3;
              dispatch({
                type: 'FETCH_INIT',
                payload: commentId
              });
              _context.next = 7;
              return (0, _api.patchComment)(caseId, commentId, commentUpdate, version, abortCtrl.signal);

            case 7:
              response = _context.sent;

              if (!cancel) {
                updateCase(response);
                fetchUserActions();
                dispatch({
                  type: 'FETCH_SUCCESS',
                  payload: {
                    commentId: commentId
                  }
                });
              }

              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);

              if (!cancel) {
                (0, _toasters.errorToToaster)({
                  title: i18n.ERROR_TITLE,
                  error: _context.t0.body && _context.t0.body.message ? new Error(_context.t0.body.message) : _context.t0,
                  dispatchToaster: dispatchToaster
                });
                dispatch({
                  type: 'FETCH_FAILURE',
                  payload: commentId
                });
              }

            case 14:
              return _context.abrupt("return", function () {
                cancel = true;
                abortCtrl.abort();
              });

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 11]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), []);
  return _objectSpread({}, state, {
    patchComment: dispatchUpdateComment
  });
};

exports.useUpdateComment = useUpdateComment;
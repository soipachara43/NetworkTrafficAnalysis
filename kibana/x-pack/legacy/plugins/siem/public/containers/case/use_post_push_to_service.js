"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePostPushToService = void 0;

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dataFetchReducer = function dataFetchReducer(state, action) {
  var _action$payload, _action$payload2;

  switch (action.type) {
    case 'FETCH_INIT':
      return _objectSpread({}, state, {
        isLoading: true,
        isError: false
      });

    case 'FETCH_SUCCESS_PUSH_SERVICE':
      return _objectSpread({}, state, {
        isLoading: false,
        isError: false,
        serviceData: (_action$payload = action.payload) !== null && _action$payload !== void 0 ? _action$payload : null
      });

    case 'FETCH_SUCCESS_PUSH_CASE':
      return _objectSpread({}, state, {
        isLoading: false,
        isError: false,
        pushedCaseData: (_action$payload2 = action.payload) !== null && _action$payload2 !== void 0 ? _action$payload2 : null
      });

    case 'FETCH_FAILURE':
      return _objectSpread({}, state, {
        isLoading: false,
        isError: true
      });

    default:
      return state;
  }
};

var usePostPushToService = function usePostPushToService() {
  var _useReducer = (0, _react.useReducer)(dataFetchReducer, {
    serviceData: null,
    pushedCaseData: null,
    isLoading: false,
    isError: false
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var postPushToService = (0, _react.useCallback)(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref2) {
      var caseId, connectorId, connectorName, updateCase, cancel, abortCtrl, casePushData, responseService, responseCase;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              caseId = _ref2.caseId, connectorId = _ref2.connectorId, connectorName = _ref2.connectorName, updateCase = _ref2.updateCase;
              cancel = false;
              abortCtrl = new AbortController();
              _context.prev = 3;
              dispatch({
                type: 'FETCH_INIT'
              });
              _context.next = 7;
              return (0, _api.getCase)(caseId, true, abortCtrl.signal);

            case 7:
              casePushData = _context.sent;
              _context.next = 10;
              return (0, _api.pushToService)(connectorId, formatServiceRequestData(casePushData), abortCtrl.signal);

            case 10:
              responseService = _context.sent;
              _context.next = 13;
              return (0, _api.pushCase)(caseId, {
                connector_id: connectorId,
                connector_name: connectorName,
                external_id: responseService.incidentId,
                external_title: responseService.number,
                external_url: responseService.url
              }, abortCtrl.signal);

            case 13:
              responseCase = _context.sent;

              if (!cancel) {
                dispatch({
                  type: 'FETCH_SUCCESS_PUSH_SERVICE',
                  payload: responseService
                });
                dispatch({
                  type: 'FETCH_SUCCESS_PUSH_CASE',
                  payload: responseCase
                });
                updateCase(responseCase);
                (0, _toasters.displaySuccessToast)(i18n.SUCCESS_SEND_TO_EXTERNAL_SERVICE, dispatchToaster);
              }

              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](3);

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

            case 20:
              return _context.abrupt("return", function () {
                cancel = true;
                abortCtrl.abort();
              });

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 17]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), []);
  return _objectSpread({}, state, {
    postPushToService: postPushToService
  });
};

exports.usePostPushToService = usePostPushToService;

var formatServiceRequestData = function formatServiceRequestData(myCase) {
  var _createdBy$fullName, _ref3, _ref4, _updatedBy$fullName, _updatedBy$username;

  var caseId = myCase.id,
      createdAt = myCase.createdAt,
      createdBy = myCase.createdBy,
      comments = myCase.comments,
      description = myCase.description,
      externalService = myCase.externalService,
      title = myCase.title,
      updatedAt = myCase.updatedAt,
      updatedBy = myCase.updatedBy;
  return {
    caseId: caseId,
    createdAt: createdAt,
    createdBy: {
      fullName: (_createdBy$fullName = createdBy.fullName) !== null && _createdBy$fullName !== void 0 ? _createdBy$fullName : null,
      username: (_ref3 = createdBy === null || createdBy === void 0 ? void 0 : createdBy.username) !== null && _ref3 !== void 0 ? _ref3 : ''
    },
    comments: comments.filter(function (c) {
      var lastPush = c.pushedAt != null ? new Date(c.pushedAt) : null;
      var lastUpdate = c.updatedAt != null ? new Date(c.updatedAt) : null;

      if (lastPush === null || lastPush != null && lastUpdate != null && lastPush.getTime() < (lastUpdate === null || lastUpdate === void 0 ? void 0 : lastUpdate.getTime())) {
        return true;
      }

      return false;
    }).map(function (c) {
      var _c$createdBy$fullName, _c$createdBy$username, _c$updatedBy$fullName, _c$updatedBy$username;

      return {
        commentId: c.id,
        comment: c.comment,
        createdAt: c.createdAt,
        createdBy: {
          fullName: (_c$createdBy$fullName = c.createdBy.fullName) !== null && _c$createdBy$fullName !== void 0 ? _c$createdBy$fullName : null,
          username: (_c$createdBy$username = c.createdBy.username) !== null && _c$createdBy$username !== void 0 ? _c$createdBy$username : ''
        },
        updatedAt: c.updatedAt,
        updatedBy: c.updatedBy != null ? {
          fullName: (_c$updatedBy$fullName = c.updatedBy.fullName) !== null && _c$updatedBy$fullName !== void 0 ? _c$updatedBy$fullName : null,
          username: (_c$updatedBy$username = c.updatedBy.username) !== null && _c$updatedBy$username !== void 0 ? _c$updatedBy$username : ''
        } : null
      };
    }),
    description: description,
    incidentId: (_ref4 = externalService === null || externalService === void 0 ? void 0 : externalService.externalId) !== null && _ref4 !== void 0 ? _ref4 : null,
    title: title,
    updatedAt: updatedAt,
    updatedBy: updatedBy != null ? {
      fullName: (_updatedBy$fullName = updatedBy.fullName) !== null && _updatedBy$fullName !== void 0 ? _updatedBy$fullName : null,
      username: (_updatedBy$username = updatedBy.username) !== null && _updatedBy$username !== void 0 ? _updatedBy$username : ''
    } : null
  };
};
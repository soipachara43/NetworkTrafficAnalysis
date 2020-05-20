"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetCaseUserActions = void 0;

var _fp = require("lodash/fp");

var _react = require("react");

var _toasters = require("../../components/toasters");

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

var initialData = {
  caseUserActions: [],
  firstIndexPushToService: -1,
  lastIndexPushToService: -1,
  hasDataToPush: false,
  isLoading: true,
  isError: false,
  participants: []
};

var getPushedInfo = function getPushedInfo(caseUserActions) {
  var firstIndexPushToService = caseUserActions.findIndex(function (cua) {
    return cua.action === 'push-to-service';
  });
  var lastIndexPushToService = caseUserActions.map(function (cua) {
    return cua.action;
  }).lastIndexOf('push-to-service');
  var hasDataToPush = lastIndexPushToService === -1 || lastIndexPushToService < caseUserActions.length - 1;
  return {
    firstIndexPushToService: firstIndexPushToService,
    lastIndexPushToService: lastIndexPushToService,
    hasDataToPush: hasDataToPush
  };
};

var useGetCaseUserActions = function useGetCaseUserActions(caseId) {
  var _useState = (0, _react.useState)(initialData),
      _useState2 = _slicedToArray(_useState, 2),
      caseUserActionsState = _useState2[0],
      setCaseUserActionsState = _useState2[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var fetchCaseUserActions = (0, _react.useCallback)(function (thisCaseId) {
    var didCancel = false;
    var abortCtrl = new AbortController();

    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var response, participants, caseUserActions;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setCaseUserActionsState(_objectSpread({}, caseUserActionsState, {
                  isLoading: true
                }));
                _context.prev = 1;
                _context.next = 4;
                return (0, _api.getCaseUserActions)(thisCaseId, abortCtrl.signal);

              case 4:
                response = _context.sent;

                if (!didCancel) {
                  // Attention Future developer
                  // We are removing the first item because it will always be the creation of the case
                  // and we do not want it to simplify our life
                  participants = !(0, _fp.isEmpty)(response) ? (0, _fp.uniqBy)('actionBy.username', response).map(function (cau) {
                    return cau.actionBy;
                  }) : [];
                  caseUserActions = !(0, _fp.isEmpty)(response) ? response.slice(1) : [];
                  setCaseUserActionsState(_objectSpread({
                    caseUserActions: caseUserActions
                  }, getPushedInfo(caseUserActions), {
                    isLoading: false,
                    isError: false,
                    participants: participants
                  }));
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
                  setCaseUserActionsState({
                    caseUserActions: [],
                    firstIndexPushToService: -1,
                    lastIndexPushToService: -1,
                    hasDataToPush: false,
                    isLoading: false,
                    isError: true,
                    participants: []
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
      didCancel = true;
      abortCtrl.abort();
    };
  }, [caseUserActionsState]);
  (0, _react.useEffect)(function () {
    if (!(0, _fp.isEmpty)(caseId)) {
      fetchCaseUserActions(caseId);
    }
  }, [caseId]);
  return _objectSpread({}, caseUserActionsState, {
    fetchCaseUserActions: fetchCaseUserActions
  });
};

exports.useGetCaseUserActions = useGetCaseUserActions;
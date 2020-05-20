"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandedRowMessagesPane = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _ml_api_service = require("../../../../../services/ml_api_service");

var _common = require("../../../../common");

var _job_messages = require("../../../../../components/job_messages");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ExpandedRowMessagesPane = function ExpandedRowMessagesPane(_ref) {
  var analyticsId = _ref.analyticsId;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      messages = _useState2[0],
      setMessages = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      errorMessage = _useState6[0],
      setErrorMessage = _useState6[1];

  var getMessagesFactory = function getMessagesFactory() {
    var concurrentLoads = 0;
    return (
      /*#__PURE__*/
      function () {
        var _getMessages = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var messagesResp;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  concurrentLoads++;

                  if (!(concurrentLoads > 1)) {
                    _context.next = 4;
                    break;
                  }

                  return _context.abrupt("return");

                case 4:
                  setIsLoading(true);
                  _context.next = 7;
                  return _ml_api_service.ml.dataFrameAnalytics.getAnalyticsAuditMessages(analyticsId);

                case 7:
                  messagesResp = _context.sent;
                  setIsLoading(false);
                  setMessages(messagesResp);
                  concurrentLoads--;

                  if (concurrentLoads > 0) {
                    concurrentLoads = 0;
                    getMessages();
                  }

                  _context.next = 18;
                  break;

                case 14:
                  _context.prev = 14;
                  _context.t0 = _context["catch"](0);
                  setIsLoading(false);
                  setErrorMessage(_i18n.i18n.translate('xpack.ml.dfAnalyticsList.analyticsDetails.messagesPane.errorMessage', {
                    defaultMessage: 'Messages could not be loaded'
                  }));

                case 18:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 14]]);
        }));

        function getMessages() {
          return _getMessages.apply(this, arguments);
        }

        return getMessages;
      }()
    );
  };

  (0, _common.useRefreshAnalyticsList)({
    onRefresh: getMessagesFactory()
  });
  return _react.default.createElement(_job_messages.JobMessages, {
    messages: messages,
    loading: isLoading,
    error: errorMessage
  });
};

exports.ExpandedRowMessagesPane = ExpandedRowMessagesPane;
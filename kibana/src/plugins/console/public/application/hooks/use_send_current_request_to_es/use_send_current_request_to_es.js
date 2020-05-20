"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSendCurrentRequestToES = void 0;

var _i18n = require("@kbn/i18n");

var _react = require("react");

var _editor_registry = require("../../contexts/editor_context/editor_registry");

var _contexts = require("../../contexts");

var _send_request_to_es = require("./send_request_to_es");

var _track = require("./track");

var _mappings = _interopRequireDefault(require("../../../lib/mappings/mappings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useSendCurrentRequestToES = function useSendCurrentRequestToES() {
  var _useServicesContext = (0, _contexts.useServicesContext)(),
      _useServicesContext$s = _useServicesContext.services,
      history = _useServicesContext$s.history,
      settings = _useServicesContext$s.settings,
      notifications = _useServicesContext$s.notifications,
      trackUiMetric = _useServicesContext$s.trackUiMetric;

  var dispatch = (0, _contexts.useRequestActionContext)();
  return (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var editor, requests, results, _settings$toJSON, polling;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            editor = _editor_registry.instance.getInputEditor();
            _context.next = 4;
            return editor.getRequestsInRange();

          case 4:
            requests = _context.sent;

            if (requests.length) {
              _context.next = 8;
              break;
            }

            notifications.toasts.add(_i18n.i18n.translate('console.notification.error.noRequestSelectedTitle', {
              defaultMessage: 'No request selected. Select a request by placing the cursor inside it.'
            }));
            return _context.abrupt("return");

          case 8:
            dispatch({
              type: 'sendRequest',
              payload: undefined
            }); // Fire and forget

            setTimeout(function () {
              return (0, _track.track)(requests, editor, trackUiMetric);
            }, 0);
            _context.next = 12;
            return (0, _send_request_to_es.sendRequestToES)({
              requests: requests
            });

          case 12:
            results = _context.sent;
            results.forEach(function (_ref2) {
              var _ref2$request = _ref2.request,
                  path = _ref2$request.path,
                  method = _ref2$request.method,
                  data = _ref2$request.data;

              try {
                history.addToHistory(path, method, data);
              } catch (e) {
                // Best effort, but notify the user.
                notifications.toasts.addError(e, {
                  title: _i18n.i18n.translate('console.notification.error.couldNotSaveRequestTitle', {
                    defaultMessage: 'Could not save request to history.'
                  })
                });
              }
            });
            _settings$toJSON = settings.toJSON(), polling = _settings$toJSON.polling;

            if (polling) {
              // If the user has submitted a request against ES, something in the fields, indices, aliases,
              // or templates may have changed, so we'll need to update this data. Assume that if
              // the user disables polling they're trying to optimize performance or otherwise
              // preserve resources, so they won't want this request sent either.
              _mappings.default.retrieveAutoCompleteInfo(settings, settings.getAutocomplete());
            }

            dispatch({
              type: 'requestSuccess',
              payload: {
                data: results
              }
            });
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);

            if (_context.t0 === null || _context.t0 === void 0 ? void 0 : _context.t0.response) {
              dispatch({
                type: 'requestFail',
                payload: _context.t0
              });
            } else {
              dispatch({
                type: 'requestFail',
                payload: undefined
              });
              notifications.toasts.addError(_context.t0, {
                title: _i18n.i18n.translate('console.notification.error.unknownErrorTitle', {
                  defaultMessage: 'Unknown Request Error'
                })
              });
            }

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 19]]);
  })), [dispatch, settings, history, notifications, trackUiMetric]);
};

exports.useSendCurrentRequestToES = useSendCurrentRequestToES;
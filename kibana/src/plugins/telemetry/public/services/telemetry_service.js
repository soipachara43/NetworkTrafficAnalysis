"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelemetryService = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TelemetryService =
/*#__PURE__*/
function () {
  function TelemetryService(_ref) {
    var _this = this;

    var config = _ref.config,
        http = _ref.http,
        notifications = _ref.notifications,
        _ref$reportOptInStatu = _ref.reportOptInStatusChange,
        reportOptInStatusChange = _ref$reportOptInStatu === void 0 ? true : _ref$reportOptInStatu;

    _classCallCheck(this, TelemetryService);

    _defineProperty(this, "http", void 0);

    _defineProperty(this, "reportOptInStatusChange", void 0);

    _defineProperty(this, "notifications", void 0);

    _defineProperty(this, "defaultConfig", void 0);

    _defineProperty(this, "updatedConfig", void 0);

    _defineProperty(this, "getCanChangeOptInStatus", function () {
      var allowChangingOptInStatus = _this.config.allowChangingOptInStatus;
      return allowChangingOptInStatus;
    });

    _defineProperty(this, "getOptInStatusUrl", function () {
      var telemetryOptInStatusUrl = _this.config.optInStatusUrl;
      return telemetryOptInStatusUrl;
    });

    _defineProperty(this, "getTelemetryUrl", function () {
      var telemetryUrl = _this.config.url;
      return telemetryUrl;
    });

    _defineProperty(this, "getUserHasSeenOptedInNotice", function () {
      return _this.config.telemetryNotifyUserAboutOptInDefault || false;
    });

    _defineProperty(this, "getIsOptedIn", function () {
      return _this.isOptedIn;
    });

    _defineProperty(this, "fetchExample",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.fetchTelemetry({
                unencrypted: true
              });

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(this, "fetchTelemetry",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _ref4,
            _ref4$unencrypted,
            unencrypted,
            now,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref4 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, _ref4$unencrypted = _ref4.unencrypted, unencrypted = _ref4$unencrypted === void 0 ? false : _ref4$unencrypted;
                now = (0, _moment.default)();
                return _context2.abrupt("return", _this.http.post('/api/telemetry/v2/clusters/_stats', {
                  body: JSON.stringify({
                    unencrypted: unencrypted,
                    timeRange: {
                      min: now.clone() // Need to clone it to avoid mutation (and max being the same value)
                      .subtract(20, 'minutes').toISOString(),
                      max: now.toISOString()
                    }
                  })
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function () {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(this, "setOptIn",
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(optedIn) {
        var canChangeOptInStatus, optInPayload;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                canChangeOptInStatus = _this.getCanChangeOptInStatus();

                if (canChangeOptInStatus) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", false);

              case 3:
                _context3.prev = 3;
                _context3.next = 6;
                return _this.http.post('/api/telemetry/v2/optIn', {
                  body: JSON.stringify({
                    enabled: optedIn
                  })
                });

              case 6:
                optInPayload = _context3.sent;

                if (!_this.reportOptInStatusChange) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 10;
                return _this.reportOptInStatus(optInPayload);

              case 10:
                _this.isOptedIn = optedIn;
                _context3.next = 17;
                break;

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](3);

                _this.notifications.toasts.addError(_context3.t0, {
                  title: _i18n.i18n.translate('telemetry.optInErrorToastTitle', {
                    defaultMessage: 'Error'
                  }),
                  toastMessage: _i18n.i18n.translate('telemetry.optInErrorToastText', {
                    defaultMessage: 'An error occurred while trying to set the usage statistics preference.'
                  })
                });

                return _context3.abrupt("return", false);

              case 17:
                return _context3.abrupt("return", true);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 13]]);
      }));

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(this, "setUserHasSeenNotice",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _this.http.put('/api/telemetry/v2/userHasSeenNotice');

            case 3:
              _this.userHasSeenOptedInNotice = true;
              _context4.next = 10;
              break;

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);

              _this.notifications.toasts.addError(_context4.t0, {
                title: _i18n.i18n.translate('telemetry.optInNoticeSeenErrorTitle', {
                  defaultMessage: 'Error'
                }),
                toastMessage: _i18n.i18n.translate('telemetry.optInNoticeSeenErrorToastText', {
                  defaultMessage: 'An error occurred dismissing the notice'
                })
              });

              _this.userHasSeenOptedInNotice = false;

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 6]]);
    })));

    _defineProperty(this, "reportOptInStatus",
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(optInPayload) {
        var telemetryOptInStatusUrl;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                telemetryOptInStatusUrl = _this.getOptInStatusUrl();
                _context5.prev = 1;
                _context5.next = 4;
                return fetch(telemetryOptInStatusUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(optInPayload)
                });

              case 4:
                _context5.next = 8;
                break;

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](1);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 6]]);
      }));

      return function (_x2) {
        return _ref7.apply(this, arguments);
      };
    }());

    this.defaultConfig = config;
    this.reportOptInStatusChange = reportOptInStatusChange;
    this.notifications = notifications;
    this.http = http;
  }

  _createClass(TelemetryService, [{
    key: "config",
    set: function set(updatedConfig) {
      this.updatedConfig = updatedConfig;
    },
    get: function get() {
      return _objectSpread({}, this.defaultConfig, {}, this.updatedConfig);
    }
  }, {
    key: "isOptedIn",
    get: function get() {
      return this.config.optIn;
    },
    set: function set(optIn) {
      this.config = _objectSpread({}, this.config, {
        optIn: optIn
      });
    }
  }, {
    key: "userHasSeenOptedInNotice",
    get: function get() {
      return this.config.telemetryNotifyUserAboutOptInDefault;
    },
    set: function set(telemetryNotifyUserAboutOptInDefault) {
      this.config = _objectSpread({}, this.config, {
        telemetryNotifyUserAboutOptInDefault: telemetryNotifyUserAboutOptInDefault
      });
    }
  }]);

  return TelemetryService;
}();

exports.TelemetryService = TelemetryService;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelemetryPlugin = void 0;

var _services = require("./services");

var _telemetry_config = require("../common/telemetry_config");

var _get_telemetry_notify_user_about_optin_default = require("../common/telemetry_config/get_telemetry_notify_user_about_optin_default");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TelemetryPlugin =
/*#__PURE__*/
function () {
  function TelemetryPlugin(initializerContext) {
    _classCallCheck(this, TelemetryPlugin);

    _defineProperty(this, "currentKibanaVersion", void 0);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "telemetrySender", void 0);

    _defineProperty(this, "telemetryNotifications", void 0);

    _defineProperty(this, "telemetryService", void 0);

    this.currentKibanaVersion = initializerContext.env.packageInfo.version;
    this.config = initializerContext.config.get();
  }

  _createClass(TelemetryPlugin, [{
    key: "setup",
    value: function setup(_ref) {
      var http = _ref.http,
          notifications = _ref.notifications;
      var config = this.config;
      this.telemetryService = new _services.TelemetryService({
        config: config,
        http: http,
        notifications: notifications
      });
      this.telemetrySender = new _services.TelemetrySender(this.telemetryService);
      return {
        telemetryService: this.telemetryService
      };
    }
  }, {
    key: "start",
    value: function start(_ref2) {
      var _this = this;

      var http = _ref2.http,
          overlays = _ref2.overlays,
          application = _ref2.application,
          savedObjects = _ref2.savedObjects;

      if (!this.telemetryService) {
        throw Error('Telemetry plugin failed to initialize properly.');
      }

      this.telemetryNotifications = new _services.TelemetryNotifications({
        overlays: overlays,
        telemetryService: this.telemetryService
      });
      application.currentAppId$.subscribe(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var isUnauthenticated, telemetrySavedObject, updatedConfig, telemetryBanner;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isUnauthenticated = _this.getIsUnauthenticated(http);

                if (!isUnauthenticated) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                _context.next = 5;
                return _this.getTelemetrySavedObject(savedObjects.client);

              case 5:
                telemetrySavedObject = _context.sent;
                _context.next = 8;
                return _this.updateConfigsBasedOnSavedObjects(telemetrySavedObject);

              case 8:
                updatedConfig = _context.sent;
                _this.telemetryService.config = updatedConfig;
                telemetryBanner = updatedConfig.banner;

                _this.maybeStartTelemetryPoller();

                if (telemetryBanner) {
                  _this.maybeShowOptedInNotificationBanner();

                  _this.maybeShowOptInBanner();
                }

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
      return {
        telemetryService: this.telemetryService,
        telemetryNotifications: this.telemetryNotifications
      };
    }
  }, {
    key: "getIsUnauthenticated",
    value: function getIsUnauthenticated(http) {
      var anonymousPaths = http.anonymousPaths;
      return anonymousPaths.isAnonymous(window.location.pathname);
    }
  }, {
    key: "maybeStartTelemetryPoller",
    value: function maybeStartTelemetryPoller() {
      if (!this.telemetrySender) {
        return;
      }

      this.telemetrySender.startChecking();
    }
  }, {
    key: "maybeShowOptedInNotificationBanner",
    value: function maybeShowOptedInNotificationBanner() {
      if (!this.telemetryNotifications) {
        return;
      }

      var shouldShowBanner = this.telemetryNotifications.shouldShowOptedInNoticeBanner();

      if (shouldShowBanner) {
        this.telemetryNotifications.renderOptedInNoticeBanner();
      }
    }
  }, {
    key: "maybeShowOptInBanner",
    value: function maybeShowOptInBanner() {
      if (!this.telemetryNotifications) {
        return;
      }

      var shouldShowBanner = this.telemetryNotifications.shouldShowOptInBanner();

      if (shouldShowBanner) {
        this.telemetryNotifications.renderOptInBanner();
      }
    }
  }, {
    key: "updateConfigsBasedOnSavedObjects",
    value: function () {
      var _updateConfigsBasedOnSavedObjects = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(telemetrySavedObject) {
        var configTelemetrySendUsageFrom, configTelemetryOptIn, configTelemetryAllowChangingOptInStatus, currentKibanaVersion, allowChangingOptInStatus, optIn, sendUsageFrom, telemetryNotifyUserAboutOptInDefault;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                configTelemetrySendUsageFrom = this.config.sendUsageFrom;
                configTelemetryOptIn = this.config.optIn;
                configTelemetryAllowChangingOptInStatus = this.config.allowChangingOptInStatus;
                currentKibanaVersion = this.currentKibanaVersion;
                allowChangingOptInStatus = (0, _telemetry_config.getTelemetryAllowChangingOptInStatus)({
                  configTelemetryAllowChangingOptInStatus: configTelemetryAllowChangingOptInStatus,
                  telemetrySavedObject: telemetrySavedObject
                });
                optIn = (0, _telemetry_config.getTelemetryOptIn)({
                  configTelemetryOptIn: configTelemetryOptIn,
                  allowChangingOptInStatus: allowChangingOptInStatus,
                  telemetrySavedObject: telemetrySavedObject,
                  currentKibanaVersion: currentKibanaVersion
                });
                sendUsageFrom = (0, _telemetry_config.getTelemetrySendUsageFrom)({
                  configTelemetrySendUsageFrom: configTelemetrySendUsageFrom,
                  telemetrySavedObject: telemetrySavedObject
                });
                telemetryNotifyUserAboutOptInDefault = (0, _get_telemetry_notify_user_about_optin_default.getNotifyUserAboutOptInDefault)({
                  telemetrySavedObject: telemetrySavedObject,
                  allowChangingOptInStatus: allowChangingOptInStatus,
                  configTelemetryOptIn: configTelemetryOptIn,
                  telemetryOptedIn: optIn
                });
                return _context2.abrupt("return", _objectSpread({}, this.config, {
                  optIn: optIn,
                  sendUsageFrom: sendUsageFrom,
                  telemetryNotifyUserAboutOptInDefault: telemetryNotifyUserAboutOptInDefault
                }));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateConfigsBasedOnSavedObjects(_x) {
        return _updateConfigsBasedOnSavedObjects.apply(this, arguments);
      }

      return updateConfigsBasedOnSavedObjects;
    }()
  }, {
    key: "getTelemetrySavedObject",
    value: function () {
      var _getTelemetrySavedObject = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(savedObjectsClient) {
        var _ref4, attributes, errorCode;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return savedObjectsClient.get('telemetry', 'telemetry');

              case 3:
                _ref4 = _context3.sent;
                attributes = _ref4.attributes;
                return _context3.abrupt("return", attributes);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                errorCode = _context3.t0[Symbol('SavedObjectsClientErrorCode')];

                if (!(errorCode === 'SavedObjectsClient/notFound')) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt("return", null);

              case 13:
                if (!(errorCode === 'SavedObjectsClient/forbidden')) {
                  _context3.next = 15;
                  break;
                }

                return _context3.abrupt("return", false);

              case 15:
                throw _context3.t0;

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 8]]);
      }));

      function getTelemetrySavedObject(_x2) {
        return _getTelemetrySavedObject.apply(this, arguments);
      }

      return getTelemetrySavedObject;
    }()
  }]);

  return TelemetryPlugin;
}();

exports.TelemetryPlugin = TelemetryPlugin;
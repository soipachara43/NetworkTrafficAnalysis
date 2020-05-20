"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelemetryNotifications = void 0;

var _render_opted_in_notice_banner = require("./render_opted_in_notice_banner");

var _render_opt_in_banner = require("./render_opt_in_banner");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TelemetryNotifications = function TelemetryNotifications(_ref) {
  var _this = this;

  var overlays = _ref.overlays,
      telemetryService = _ref.telemetryService;

  _classCallCheck(this, TelemetryNotifications);

  _defineProperty(this, "overlays", void 0);

  _defineProperty(this, "telemetryService", void 0);

  _defineProperty(this, "optedInNoticeBannerId", void 0);

  _defineProperty(this, "optInBannerId", void 0);

  _defineProperty(this, "shouldShowOptedInNoticeBanner", function () {
    var userHasSeenOptedInNotice = _this.telemetryService.getUserHasSeenOptedInNotice();

    var bannerOnScreen = typeof _this.optedInNoticeBannerId !== 'undefined';
    return !bannerOnScreen && userHasSeenOptedInNotice;
  });

  _defineProperty(this, "renderOptedInNoticeBanner", function () {
    var bannerId = (0, _render_opted_in_notice_banner.renderOptedInNoticeBanner)({
      onSeen: _this.setOptedInNoticeSeen,
      overlays: _this.overlays
    });
    _this.optedInNoticeBannerId = bannerId;
  });

  _defineProperty(this, "shouldShowOptInBanner", function () {
    var isOptedIn = _this.telemetryService.getIsOptedIn();

    var bannerOnScreen = typeof _this.optInBannerId !== 'undefined';
    return !bannerOnScreen && isOptedIn === null;
  });

  _defineProperty(this, "renderOptInBanner", function () {
    var bannerId = (0, _render_opt_in_banner.renderOptInBanner)({
      setOptIn: _this.onSetOptInClick,
      overlays: _this.overlays
    });
    _this.optInBannerId = bannerId;
  });

  _defineProperty(this, "onSetOptInClick",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(isOptIn) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.optInBannerId) {
                _this.overlays.banners.remove(_this.optInBannerId);

                _this.optInBannerId = undefined;
              }

              _context.next = 3;
              return _this.telemetryService.setOptIn(isOptIn);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "setOptedInNoticeSeen",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (_this.optedInNoticeBannerId) {
              _this.overlays.banners.remove(_this.optedInNoticeBannerId);

              _this.optedInNoticeBannerId = undefined;
            }

            _context2.next = 3;
            return _this.telemetryService.setUserHasSeenNotice();

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));

  this.telemetryService = telemetryService;
  this.overlays = overlays;
};

exports.TelemetryNotifications = TelemetryNotifications;
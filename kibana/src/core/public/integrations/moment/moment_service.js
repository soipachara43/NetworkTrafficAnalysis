"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MomentService = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var MomentService =
/*#__PURE__*/
function () {
  function MomentService() {
    _classCallCheck(this, MomentService);

    _defineProperty(this, "uiSettingsSubscription", void 0);
  }

  _createClass(MomentService, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function setup() {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref) {
        var uiSettings, setDefaultTimezone, setStartDayOfWeek;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                uiSettings = _ref.uiSettings;

                setDefaultTimezone = function setDefaultTimezone(tz) {
                  var zone = _momentTimezone.default.tz.zone(tz);

                  if (zone) _momentTimezone.default.tz.setDefault(zone.name);
                };

                setStartDayOfWeek = function setStartDayOfWeek(day) {
                  var dow = _momentTimezone.default.weekdays().indexOf(day);

                  _momentTimezone.default.updateLocale(_momentTimezone.default.locale(), {
                    week: {
                      dow: dow
                    }
                  });
                };

                this.uiSettingsSubscription = (0, _rxjs.merge)(uiSettings.get$('dateFormat:tz').pipe((0, _operators.tap)(setDefaultTimezone)), uiSettings.get$('dateFormat:dow').pipe((0, _operators.tap)(setStartDayOfWeek))).subscribe();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function start(_x) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.uiSettingsSubscription) {
                  this.uiSettingsSubscription.unsubscribe();
                  this.uiSettingsSubscription = undefined;
                }

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function stop() {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
  }]);

  return MomentService;
}();

exports.MomentService = MomentService;
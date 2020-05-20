"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelemetrySender = void 0;

var _constants = require("../../common/constants");

var _public = require("../../../kibana_utils/public");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TelemetrySender = function TelemetrySender(telemetryService) {
  var _this = this;

  _classCallCheck(this, TelemetrySender);

  _defineProperty(this, "telemetryService", void 0);

  _defineProperty(this, "isSending", false);

  _defineProperty(this, "lastReported", void 0);

  _defineProperty(this, "storage", void 0);

  _defineProperty(this, "intervalId", void 0);

  _defineProperty(this, "saveToBrowser", function () {
    // we are the only code that manipulates this key, so it's safe to blindly overwrite the whole object
    _this.storage.set(_constants.LOCALSTORAGE_KEY, {
      lastReport: _this.lastReported
    });
  });

  _defineProperty(this, "shouldSendReport", function () {
    // check if opt-in for telemetry is enabled
    if (_this.telemetryService.getIsOptedIn()) {
      if (!_this.lastReported) {
        return true;
      } // returns NaN for any malformed or unset (null/undefined) value


      var lastReported = parseInt(_this.lastReported, 10); // If it's been a day since we last sent telemetry

      if (isNaN(lastReported) || Date.now() - lastReported > _constants.REPORT_INTERVAL_MS) {
        return true;
      }
    }

    return false;
  });

  _defineProperty(this, "sendIfDue",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var telemetryUrl, telemetryData, clusters;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(_this.isSending || !_this.shouldSendReport())) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            // mark that we are working so future requests are ignored until we're done
            _this.isSending = true;
            _context2.prev = 3;
            telemetryUrl = _this.telemetryService.getTelemetryUrl();
            _context2.next = 7;
            return _this.telemetryService.fetchTelemetry();

          case 7:
            telemetryData = _context2.sent;
            clusters = [].concat(telemetryData);
            _context2.next = 11;
            return Promise.all(clusters.map(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(cluster) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return fetch(telemetryUrl, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: cluster
                        });

                      case 2:
                        return _context.abrupt("return", _context.sent);

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
            }()));

          case 11:
            _this.lastReported = "".concat(Date.now());

            _this.saveToBrowser();

            _context2.next = 17;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](3);

          case 17:
            _context2.prev = 17;
            _this.isSending = false;
            return _context2.finish(17);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 15, 17, 20]]);
  })));

  _defineProperty(this, "startChecking", function () {
    if (typeof _this.intervalId === 'undefined') {
      _this.intervalId = window.setInterval(_this.sendIfDue, 60000);
    }
  });

  this.telemetryService = telemetryService;
  this.storage = new _public.Storage(window.localStorage);
  var attributes = this.storage.get(_constants.LOCALSTORAGE_KEY);

  if (attributes) {
    this.lastReported = attributes.lastReport;
  }
};

exports.TelemetrySender = TelemetrySender;
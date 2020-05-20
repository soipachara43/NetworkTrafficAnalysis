"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setReportManager = setReportManager;
exports.stopReportManager = stopReportManager;
exports.trackUiEvent = trackUiEvent;
exports.trackSuggestionEvent = trackSuggestionEvent;
exports.LensReportManager = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _common = require("../../../../../plugins/lens/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var STORAGE_KEY = 'lens-ui-telemetry';
var reportManager;

function setReportManager(newManager) {
  if (reportManager) {
    reportManager.stop();
  }

  reportManager = newManager;
}

function stopReportManager() {
  if (reportManager) {
    reportManager.stop();
  }
}

function trackUiEvent(name) {
  if (reportManager) {
    reportManager.trackEvent(name);
  }
}

function trackSuggestionEvent(name) {
  if (reportManager) {
    reportManager.trackSuggestionEvent(name);
  }
}

var LensReportManager =
/*#__PURE__*/
function () {
  function LensReportManager(_ref) {
    var _this = this;

    var storage = _ref.storage,
        http = _ref.http;

    _classCallCheck(this, LensReportManager);

    _defineProperty(this, "events", {});

    _defineProperty(this, "suggestionEvents", {});

    _defineProperty(this, "storage", void 0);

    _defineProperty(this, "http", void 0);

    _defineProperty(this, "timer", void 0);

    this.storage = storage;
    this.http = http;
    this.readFromStorage();
    this.timer = setInterval(function () {
      _this.postToServer();
    }, 10000);
  }

  _createClass(LensReportManager, [{
    key: "trackEvent",
    value: function trackEvent(name) {
      this.readFromStorage();
      this.trackTo(this.events, name);
    }
  }, {
    key: "trackSuggestionEvent",
    value: function trackSuggestionEvent(name) {
      this.readFromStorage();
      this.trackTo(this.suggestionEvents, name);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  }, {
    key: "readFromStorage",
    value: function readFromStorage() {
      var data = this.storage.get(STORAGE_KEY);

      if (data && _typeof(data.events) === 'object' && _typeof(data.suggestionEvents) === 'object') {
        this.events = data.events;
        this.suggestionEvents = data.suggestionEvents;
      }
    }
  }, {
    key: "postToServer",
    value: function () {
      var _postToServer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.readFromStorage();

                if (!(Object.keys(this.events).length || Object.keys(this.suggestionEvents).length)) {
                  _context.next = 12;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return this.http.post("".concat(_common.BASE_API_URL, "/telemetry"), {
                  body: JSON.stringify({
                    events: this.events,
                    suggestionEvents: this.suggestionEvents
                  })
                });

              case 5:
                this.events = {};
                this.suggestionEvents = {};
                this.write();
                _context.next = 12;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
      }));

      function postToServer() {
        return _postToServer.apply(this, arguments);
      }

      return postToServer;
    }()
  }, {
    key: "trackTo",
    value: function trackTo(target, name) {
      var date = (0, _moment.default)().utc().format('YYYY-MM-DD');

      if (!target[date]) {
        target[date] = _defineProperty({}, name, 1);
      } else if (!target[date][name]) {
        target[date][name] = 1;
      } else {
        target[date][name] += 1;
      }

      this.write();
    }
  }, {
    key: "write",
    value: function write() {
      this.storage.set(STORAGE_KEY, {
        events: this.events,
        suggestionEvents: this.suggestionEvents
      });
    }
  }]);

  return LensReportManager;
}();

exports.LensReportManager = LensReportManager;
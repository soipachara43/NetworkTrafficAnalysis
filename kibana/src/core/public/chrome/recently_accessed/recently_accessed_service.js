"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentlyAccessedService = void 0;

var _persisted_log = require("./persisted_log");

var _create_log_key = require("./create_log_key");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @internal */
var RecentlyAccessedService =
/*#__PURE__*/
function () {
  function RecentlyAccessedService() {
    _classCallCheck(this, RecentlyAccessedService);
  }

  _createClass(RecentlyAccessedService, [{
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var http, logKey, history;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                http = _ref.http;
                _context.next = 3;
                return (0, _create_log_key.createLogKey)('recentlyAccessed', http.basePath.get());

              case 3:
                logKey = _context.sent;
                history = new _persisted_log.PersistedLog(logKey, {
                  maxLength: 20,
                  isEqual: function isEqual(oldItem, newItem) {
                    return oldItem.id === newItem.id;
                  }
                });
                return _context.abrupt("return", {
                  /** Adds a new item to the history. */
                  add: function add(link, label, id) {
                    history.add({
                      link: link,
                      label: label,
                      id: id
                    });
                  },

                  /** Gets the current array of history items. */
                  get: function get() {
                    return history.get();
                  },

                  /** Gets an observable of the current array of history items. */
                  get$: function get$() {
                    return history.get$();
                  }
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function start(_x) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }]);

  return RecentlyAccessedService;
}();
/**
 * {@link ChromeRecentlyAccessed | APIs} for recently accessed history.
 * @public
 */


exports.RecentlyAccessedService = RecentlyAccessedService;
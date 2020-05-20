"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegacyDependenciesPlugin = void 0;

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _timelion_legacy_module = require("./timelion_legacy_module");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LegacyDependenciesPlugin =
/*#__PURE__*/
function () {
  function LegacyDependenciesPlugin() {
    _classCallCheck(this, LegacyDependenciesPlugin);
  }

  _createClass(LegacyDependenciesPlugin, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(core, timelionPanels) {
        var $injector;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _timelion_legacy_module.initTimelionLegacyModule)(timelionPanels);
                _context.next = 3;
                return _chrome.default.dangerouslyGetActiveInjector();

              case 3:
                $injector = _context.sent;
                return _context.abrupt("return", {
                  $rootScope: $injector.get('$rootScope'),
                  $compile: $injector.get('$compile')
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function setup(_x, _x2) {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: "start",
    value: function start() {// nothing to do here yet
    }
  }]);

  return LegacyDependenciesPlugin;
}();

exports.LegacyDependenciesPlugin = LegacyDependenciesPlugin;
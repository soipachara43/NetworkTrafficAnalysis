"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelionPlugin = void 0;

var _timechart = require("./panels/timechart/timechart");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var TimelionPlugin =
/*#__PURE__*/
function () {
  function TimelionPlugin(initializerContext) {
    _classCallCheck(this, TimelionPlugin);

    _defineProperty(this, "initializerContext", void 0);

    this.initializerContext = initializerContext;
  }

  _createClass(TimelionPlugin, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(core, _ref) {
        var __LEGACY, timelionPanels, dependencies;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                __LEGACY = _ref.__LEGACY;
                timelionPanels = new Map();
                _context.t0 = _objectSpread;
                _context.t1 = {
                  uiSettings: core.uiSettings,
                  timelionPanels: timelionPanels
                };
                _context.next = 6;
                return __LEGACY.setup(core, timelionPanels);

              case 6:
                _context.t2 = _context.sent;
                dependencies = (0, _context.t0)(_context.t1, _context.t2);
                this.registerPanels(dependencies);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setup(_x, _x2) {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: "registerPanels",
    value: function registerPanels(dependencies) {
      var timeChartPanel = (0, _timechart.getTimeChart)(dependencies);
      dependencies.timelionPanels.set(timeChartPanel.name, timeChartPanel);
    }
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return TimelionPlugin;
}();

exports.TimelionPlugin = TimelionPlugin;
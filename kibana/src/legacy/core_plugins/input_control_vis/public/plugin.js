"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputControlVisPlugin = void 0;

var _input_control_fn = require("./input_control_fn");

var _input_control_vis_type = require("./input_control_vis_type");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @internal */
var InputControlVisPlugin =
/*#__PURE__*/
function () {
  function InputControlVisPlugin(initializerContext) {
    _classCallCheck(this, InputControlVisPlugin);

    this.initializerContext = initializerContext;
  }

  _createClass(InputControlVisPlugin, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(core, _ref) {
        var expressions, visualizations, data, visualizationDependencies;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                expressions = _ref.expressions, visualizations = _ref.visualizations, data = _ref.data;
                visualizationDependencies = {
                  core: core,
                  data: data
                };
                expressions.registerFunction(_input_control_fn.createInputControlVisFn);
                visualizations.createBaseVisualization((0, _input_control_vis_type.createInputControlVisTypeDefinition)(visualizationDependencies));

              case 4:
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
    value: function start(core, deps) {// nothing to do here
    }
  }]);

  return InputControlVisPlugin;
}();

exports.InputControlVisPlugin = InputControlVisPlugin;
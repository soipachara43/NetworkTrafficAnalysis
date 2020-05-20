"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisTypeVislibPlugin = void 0;

var _vis_type_vislib_vis_fn = require("./vis_type_vislib_vis_fn");

var _pie_fn = require("./pie_fn");

var _vis_type_vislib_vis_types = require("./vis_type_vislib_vis_types");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @internal */
var VisTypeVislibPlugin =
/*#__PURE__*/
function () {
  function VisTypeVislibPlugin(initializerContext) {
    _classCallCheck(this, VisTypeVislibPlugin);

    this.initializerContext = initializerContext;
  }

  _createClass(VisTypeVislibPlugin, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(core, _ref) {
        var expressions, visualizations, charts, visualizationDependencies, vislibTypes, vislibFns, visTypeXy, convertedTypes, convertedFns;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                expressions = _ref.expressions, visualizations = _ref.visualizations, charts = _ref.charts;
                visualizationDependencies = {
                  uiSettings: core.uiSettings,
                  charts: charts
                };
                vislibTypes = [_vis_type_vislib_vis_types.createHistogramVisTypeDefinition, _vis_type_vislib_vis_types.createLineVisTypeDefinition, _vis_type_vislib_vis_types.createPieVisTypeDefinition, _vis_type_vislib_vis_types.createAreaVisTypeDefinition, _vis_type_vislib_vis_types.createHeatmapVisTypeDefinition, _vis_type_vislib_vis_types.createHorizontalBarVisTypeDefinition, _vis_type_vislib_vis_types.createGaugeVisTypeDefinition, _vis_type_vislib_vis_types.createGoalVisTypeDefinition];
                vislibFns = [(0, _vis_type_vislib_vis_fn.createVisTypeVislibVisFn)(), (0, _pie_fn.createPieVisFn)()];
                visTypeXy = core.injectedMetadata.getInjectedVar('visTypeXy'); // if visTypeXy plugin is disabled it's config will be undefined

                if (!visTypeXy || !visTypeXy.enabled) {
                  convertedTypes = [];
                  convertedFns = []; // Register legacy vislib types that have been converted

                  convertedFns.forEach(expressions.registerFunction);
                  convertedTypes.forEach(function (vis) {
                    return visualizations.createBaseVisualization(vis(visualizationDependencies));
                  });
                } // Register non-converted types


                vislibFns.forEach(expressions.registerFunction);
                vislibTypes.forEach(function (vis) {
                  return visualizations.createBaseVisualization(vis(visualizationDependencies));
                });

              case 8:
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

  return VisTypeVislibPlugin;
}();

exports.VisTypeVislibPlugin = VisTypeVislibPlugin;
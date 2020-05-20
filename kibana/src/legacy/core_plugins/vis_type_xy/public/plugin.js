"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisTypeXyPlugin = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/** @internal */

/** @internal */

/** @internal */
var VisTypeXyPlugin =
/*#__PURE__*/
function () {
  function VisTypeXyPlugin(initializerContext) {
    _classCallCheck(this, VisTypeXyPlugin);

    this.initializerContext = initializerContext;
  }

  _createClass(VisTypeXyPlugin, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(core, _ref) {
        var expressions, visualizations, charts, visualizationDependencies, visTypeDefinitions, visFunctions;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                expressions = _ref.expressions, visualizations = _ref.visualizations, charts = _ref.charts;
                // eslint-disable-next-line no-console
                console.warn('The visTypeXy plugin is enabled\n\n', 'This may negatively alter existing vislib visualization configurations if saved.');
                visualizationDependencies = {
                  uiSettings: core.uiSettings,
                  charts: charts
                };
                visTypeDefinitions = [];
                visFunctions = [];
                visFunctions.forEach(function (fn) {
                  return expressions.registerFunction(fn);
                });
                visTypeDefinitions.forEach(function (vis) {
                  return visualizations.createBaseVisualization(vis(visualizationDependencies));
                });

              case 7:
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

  return VisTypeXyPlugin;
}();

exports.VisTypeXyPlugin = VisTypeXyPlugin;
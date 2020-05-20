"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitoringPlugin = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MonitoringPlugin =
/*#__PURE__*/
function () {
  function MonitoringPlugin(ctx) {
    _classCallCheck(this, MonitoringPlugin);
  }

  _createClass(MonitoringPlugin, [{
    key: "setup",
    value: function setup(core, plugins) {
      var app = {
        id: 'monitoring',
        title: 'Monitoring',
        mount: function () {
          var _mount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(context, params) {
            var _ref, AngularApp, monitoringApp;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return import('../np_imports/angular');

                  case 2:
                    _ref = _context.sent;
                    AngularApp = _ref.AngularApp;
                    monitoringApp = new AngularApp(context, params);
                    return _context.abrupt("return", monitoringApp.destroy);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function mount(_x, _x2) {
            return _mount.apply(this, arguments);
          }

          return mount;
        }()
      };
      core.application.register(app);
    }
  }, {
    key: "start",
    value: function start(core, plugins) {}
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return MonitoringPlugin;
}();

exports.MonitoringPlugin = MonitoringPlugin;
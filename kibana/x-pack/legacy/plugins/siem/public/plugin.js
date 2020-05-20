"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AppMountParameters", {
  enumerable: true,
  get: function get() {
    return _public.AppMountParameters;
  }
});
Object.defineProperty(exports, "CoreSetup", {
  enumerable: true,
  get: function get() {
    return _public.CoreSetup;
  }
});
Object.defineProperty(exports, "CoreStart", {
  enumerable: true,
  get: function get() {
    return _public.CoreStart;
  }
});
Object.defineProperty(exports, "PluginInitializerContext", {
  enumerable: true,
  get: function get() {
    return _public.PluginInitializerContext;
  }
});
exports.Plugin = void 0;

var _public = require("../../../../../src/core/public");

var _telemetry = require("./lib/telemetry");

var _kibana = require("./lib/kibana");

var _connectors = require("./lib/connectors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Plugin =
/*#__PURE__*/
function () {
  function Plugin(initializerContext) {
    _classCallCheck(this, Plugin);

    this.initializerContext = initializerContext;

    _defineProperty(this, "id", 'siem');

    _defineProperty(this, "name", 'SIEM');
  }

  _createClass(Plugin, [{
    key: "setup",
    value: function setup(core, plugins) {
      (0, _telemetry.initTelemetry)(plugins.usageCollection, this.id);
      var security = plugins.security;
      core.application.register({
        id: this.id,
        title: this.name,
        mount: function mount(context, params) {
          return _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var _ref, _ref2, coreStart, startPlugins, _ref3, renderApp;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return core.getStartServices();

                  case 2:
                    _ref = _context.sent;
                    _ref2 = _slicedToArray(_ref, 2);
                    coreStart = _ref2[0];
                    startPlugins = _ref2[1];
                    _context.next = 8;
                    return import('./app');

                  case 8:
                    _ref3 = _context.sent;
                    renderApp = _ref3.renderApp;
                    plugins.triggers_actions_ui.actionTypeRegistry.register((0, _connectors.serviceNowActionType)());
                    return _context.abrupt("return", renderApp(coreStart, _objectSpread({}, startPlugins, {
                      security: security
                    }), params));

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }))();
        }
      });
      return {};
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      _kibana.KibanaServices.init(_objectSpread({}, core, {}, plugins));

      return {};
    }
  }, {
    key: "stop",
    value: function stop() {
      return {};
    }
  }]);

  return Plugin;
}();

exports.Plugin = Plugin;
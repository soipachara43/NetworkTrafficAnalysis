"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CoreStart", {
  enumerable: true,
  get: function get() {
    return _public.CoreStart;
  }
});
exports.CanvasPlugin = void 0;

var _public = require("../../../../../src/core/public");

var _loading_indicator = require("./lib/loading_indicator");

var _feature_catalogue_entry = require("./feature_catalogue_entry");

var _arg_types = require("./expression_types/arg_types");

var _transitions = require("./transitions");

var _legacy_plugin_support = require("./legacy_plugin_support");

var _plugin_api = require("./plugin_api");

var _functions = require("./functions");

var _plugin = require("../canvas_plugin_src/plugin");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// eslint-disable-line @typescript-eslint/no-empty-interface

/** @internal */
var CanvasPlugin =
/*#__PURE__*/
function () {
  function CanvasPlugin() {
    _classCallCheck(this, CanvasPlugin);
  }

  _createClass(CanvasPlugin, [{
    key: "setup",
    value: function setup(core, plugins) {
      var _getPluginApi = (0, _plugin_api.getPluginApi)(plugins.expressions),
          canvasApi = _getPluginApi.api,
          registries = _getPluginApi.registries;

      core.application.register({
        id: 'canvas',
        title: 'Canvas App',
        mount: function mount(context, params) {
          return _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var _ref, renderApp, initializeCanvas, teardownCanvas, _ref2, _ref3, coreStart, depsStart, canvasStore, unmount;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return import('./application');

                  case 2:
                    _ref = _context.sent;
                    renderApp = _ref.renderApp;
                    initializeCanvas = _ref.initializeCanvas;
                    teardownCanvas = _ref.teardownCanvas;
                    _context.next = 8;
                    return core.getStartServices();

                  case 8:
                    _ref2 = _context.sent;
                    _ref3 = _slicedToArray(_ref2, 2);
                    coreStart = _ref3[0];
                    depsStart = _ref3[1];
                    _context.next = 14;
                    return initializeCanvas(core, coreStart, plugins, depsStart, registries);

                  case 14:
                    canvasStore = _context.sent;
                    unmount = renderApp(coreStart, depsStart, params, canvasStore);
                    return _context.abrupt("return", function () {
                      unmount();
                      teardownCanvas(coreStart, depsStart);
                    });

                  case 17:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }))();
        }
      });
      plugins.home.featureCatalogue.register(_feature_catalogue_entry.featureCatalogueEntry); // Register Legacy plugin stuff

      canvasApi.addFunctions(_legacy_plugin_support.legacyRegistries.browserFunctions.getOriginalFns());
      canvasApi.addElements(_legacy_plugin_support.legacyRegistries.elements.getOriginalFns());
      canvasApi.addTypes(_legacy_plugin_support.legacyRegistries.types.getOriginalFns()); // TODO: Do we want to completely move canvas_plugin_src into it's own plugin?

      var srcPlugin = new _plugin.CanvasSrcPlugin();
      srcPlugin.setup(core, {
        canvas: canvasApi
      }); // Register core canvas stuff

      canvasApi.addFunctions((0, _functions.initFunctions)({
        typesRegistry: plugins.expressions.__LEGACY.types
      }));
      canvasApi.addArgumentUIs(_arg_types.argTypeSpecs);
      canvasApi.addTransitions(_transitions.transitions);
      return _objectSpread({}, canvasApi);
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      (0, _loading_indicator.initLoadingIndicator)(core.http.addLoadingCountSource);
      return {};
    }
  }]);

  return CanvasPlugin;
}();

exports.CanvasPlugin = CanvasPlugin;
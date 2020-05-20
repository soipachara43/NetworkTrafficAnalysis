"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexLifecycleManagementPlugin = void 0;

var _constants = require("../../common/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IndexLifecycleManagementPlugin =
/*#__PURE__*/
function () {
  function IndexLifecycleManagementPlugin() {
    _classCallCheck(this, IndexLifecycleManagementPlugin);
  }

  _createClass(IndexLifecycleManagementPlugin, [{
    key: "setup",
    value: function setup(core, plugins) {
      // Extract individual core dependencies.
      var application = core.application,
          toasts = core.notifications.toasts,
          fatalErrors = core.fatalErrors,
          http = core.http; // The Plugin interface won't allow us to pass __LEGACY as a third argument, so we'll just
      // sneak it inside of the plugins parameter for now.

      var __LEGACY = plugins.__LEGACY;
      application.register({
        id: _constants.PLUGIN.ID,
        title: _constants.PLUGIN.TITLE,
        mount: function mount(config, mountPoint) {
          return _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var _config$core, docLinks, I18nContext, element, _ref, renderApp;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _config$core = config.core, docLinks = _config$core.docLinks, I18nContext = _config$core.i18n.Context;
                    element = mountPoint.element;
                    _context.next = 4;
                    return import('./application');

                  case 4:
                    _ref = _context.sent;
                    renderApp = _ref.renderApp;
                    return _context.abrupt("return", renderApp({
                      legacy: _objectSpread({}, __LEGACY),
                      I18nContext: I18nContext,
                      http: http,
                      toasts: toasts,
                      fatalErrors: fatalErrors,
                      docLinks: docLinks,
                      element: element
                    }));

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }))();
        }
      });
    }
  }, {
    key: "start",
    value: function start(core, plugins) {}
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return IndexLifecycleManagementPlugin;
}();

exports.IndexLifecycleManagementPlugin = IndexLifecycleManagementPlugin;
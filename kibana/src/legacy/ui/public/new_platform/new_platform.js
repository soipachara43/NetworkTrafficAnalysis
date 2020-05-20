"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__reset__ = __reset__;
exports.__setup__ = __setup__;
exports.__start__ = __start__;
exports.legacyAppRegister = exports.npStart = exports.npSetup = void 0;

var _history = require("history");

var _public = require("../../../../core/public");

var _services = require("../../../../plugins/data/public/services");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var npSetup = {
  core: null,
  plugins: {}
};
exports.npSetup = npSetup;
var npStart = {
  core: null,
  plugins: {}
};
/**
 * Only used by unit tests
 * @internal
 */

exports.npStart = npStart;

function __reset__() {
  npSetup.core = null;
  npSetup.plugins = {};
  npStart.core = null;
  npStart.plugins = {};
  legacyAppRegistered = false;
}

function __setup__(coreSetup, plugins) {
  npSetup.core = coreSetup;
  npSetup.plugins = plugins; // Setup compatibility layer for AppService in legacy platform

  npSetup.core.application.register = legacyAppRegister; // Services that need to be set in the legacy platform since the legacy data plugin
  // which previously provided them has been removed.

  (0, _services.setInjectedMetadata)(npSetup.core.injectedMetadata);
}

function __start__(coreStart, plugins) {
  npStart.core = coreStart;
  npStart.plugins = plugins; // Services that need to be set in the legacy platform since the legacy data plugin
  // which previously provided them has been removed.

  (0, _services.setHttp)(npStart.core.http);
  (0, _services.setNotifications)(npStart.core.notifications);
  (0, _services.setOverlays)(npStart.core.overlays);
  (0, _services.setUiSettings)(npStart.core.uiSettings);
  (0, _services.setFieldFormats)(npStart.plugins.data.fieldFormats);
  (0, _services.setIndexPatterns)(npStart.plugins.data.indexPatterns);
  (0, _services.setQueryService)(npStart.plugins.data.query);
  (0, _services.setSearchService)(npStart.plugins.data.search);
}
/** Flag used to ensure `legacyAppRegister` is only called once. */


var legacyAppRegistered = false;
/**
 * Exported for testing only. Use `npSetup.core.application.register` in legacy apps.
 * @internal
 */

var legacyAppRegister = function legacyAppRegister(app) {
  if (legacyAppRegistered) {
    throw new Error("core.application.register may only be called once for legacy plugins.");
  }

  legacyAppRegistered = true;

  require('ui/chrome').setRootController(app.id, function ($scope, $element) {
    var element = $element[0]; // Root controller cannot return a Promise so use an internal async function and call it immediately

    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var appRoute, appBasePath, params, unmount;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              appRoute = app.appRoute || "/app/".concat(app.id);
              appBasePath = npSetup.core.http.basePath.prepend(appRoute);
              params = {
                element: element,
                appBasePath: appBasePath,
                history: new _public.ScopedHistory((0, _history.createBrowserHistory)({
                  basename: npSetup.core.http.basePath.get()
                }), appRoute),
                onAppLeave: function onAppLeave() {
                  return undefined;
                }
              };

              if (!isAppMountDeprecated(app.mount)) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return app.mount({
                core: npStart.core
              }, params);

            case 6:
              _context.t0 = _context.sent;
              _context.next = 12;
              break;

            case 9:
              _context.next = 11;
              return app.mount(params);

            case 11:
              _context.t0 = _context.sent;

            case 12:
              unmount = _context.t0;
              $scope.$on('$destroy', function () {
                unmount();
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  });
};

exports.legacyAppRegister = legacyAppRegister;

function isAppMountDeprecated(mount) {
  // Mount functions with two arguments are assumed to expect deprecated `context` object.
  return mount.length === 2;
}
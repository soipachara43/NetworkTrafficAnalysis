"use strict";

var _new_platform = require("ui/new_platform");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _routes = _interopRequireDefault(require("ui/routes"));

var _management = require("ui/management");

var _public = require("../../../../../src/legacy/core_plugins/ui_metric/public");

var _constants = require("../common/constants");

var _np_ready = require("./np_ready");

var _extend_index_management = require("./np_ready/extend_index_management");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (_chrome.default.getInjected('ilmUiEnabled')) {
  // We have to initialize this outside of the NP lifecycle, otherwise these extensions won't
  // be available in Index Management unless the user visits ILM first.
  if (_new_platform.npSetup.plugins.indexManagement) {
    (0, _extend_index_management.addAllExtensions)(_new_platform.npSetup.plugins.indexManagement.extensionsService);
  } // This method handles the cleanup needed when route is scope is destroyed.  It also prevents Angular
  // from destroying scope when route changes and both old route and new route are this same route.


  var manageAngularLifecycle = function manageAngularLifecycle($scope, $route, unmount) {
    var lastRoute = $route.current;
    var deregister = $scope.$on('$locationChangeSuccess', function () {
      var currentRoute = $route.current; // if templates are the same we are on the same route

      if (lastRoute.$$route.template === currentRoute.$$route.template) {
        // this prevents angular from destroying scope
        $route.current = lastRoute;
      }
    });
    $scope.$on('$destroy', function () {
      if (deregister) {
        deregister();
      }

      unmount();
    });
  }; // Once this app no longer depends upon Angular's routing (e.g. for the "redirect" service), we can
  // use the Management plugin's API to register this app within the Elasticsearch section.


  var esSection = _management.management.getSection('elasticsearch');

  esSection.register('index_lifecycle_policies', {
    visible: true,
    display: _constants.PLUGIN.TITLE,
    order: 2,
    url: "#".concat(_constants.BASE_PATH, "policies")
  });
  var REACT_ROOT_ID = 'indexLifecycleManagementReactRoot';
  var template = "<kbn-management-app section=\"elasticsearch/index_lifecycle_policies\">\n    <div id=\"".concat(REACT_ROOT_ID, "\" class=\"policyTable__horizontalScrollContainer\"/>\n  </kbn-management-app>\n  ");

  _routes.default.when("".concat(_constants.BASE_PATH, ":view?/:action?/:id?"), {
    template: template,
    controllerAs: 'indexLifecycleManagement',
    controller: function IndexLifecycleManagementController($scope, $route, kbnUrl, $rootScope) {
      _classCallCheck(this, IndexLifecycleManagementController);

      $scope.$$postDigest(function () {
        var element = document.getElementById(REACT_ROOT_ID);
        var core = _new_platform.npSetup.core;

        var coreDependencies = _objectSpread({}, core, {
          application: _objectSpread({}, core.application, {
            register: function register(app) {
              return _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var unmountApp;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return app.mount(_objectSpread({}, _new_platform.npStart), {
                          element: element,
                          appBasePath: '',
                          onAppLeave: function onAppLeave() {
                            return undefined;
                          },
                          // TODO: adapt to use Core's ScopedHistory
                          history: {}
                        });

                      case 2:
                        unmountApp = _context.sent;
                        manageAngularLifecycle($scope, $route, unmountApp);

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }))();
            }
          })
        }); // The Plugin interface won't allow us to pass __LEGACY as a third argument, so we'll just
        // sneak it inside of the plugins argument for now.


        var pluginDependencies = {
          __LEGACY: {
            redirect: function redirect(path) {
              $scope.$evalAsync(function () {
                kbnUrl.redirect(path);
              });
            },
            createUiStatsReporter: _public.createUiStatsReporter
          }
        };
        var plugin = (0, _np_ready.createPlugin)({});
        plugin.setup(coreDependencies, pluginDependencies);
      });
    }
  });
}
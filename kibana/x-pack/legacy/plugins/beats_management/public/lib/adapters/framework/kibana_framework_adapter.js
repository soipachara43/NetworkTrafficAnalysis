"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaFrameworkAdapter = void 0;

var _PathReporter = require("io-ts/lib/PathReporter");

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _Either = require("fp-ts/lib/Either");

var _new_platform = require("ui/new_platform");

var _adapter_types = require("./adapter_types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KibanaFrameworkAdapter =
/*#__PURE__*/
function () {
  _createClass(KibanaFrameworkAdapter, [{
    key: "info",
    get: function get() {
      if (this.xpackInfo) {
        return this.xpackInfo;
      } else {
        throw new Error('framework adapter must have init called before anything else');
      }
    }
  }, {
    key: "currentUser",
    get: function get() {
      return this.shieldUser;
    }
  }]);

  function KibanaFrameworkAdapter(PLUGIN_ID, management, routes, getBasePath, onKibanaReady, xpackInfoService, version) {
    var _this = this;

    _classCallCheck(this, KibanaFrameworkAdapter);

    this.PLUGIN_ID = PLUGIN_ID;
    this.management = management;
    this.routes = routes;
    this.getBasePath = getBasePath;
    this.onKibanaReady = onKibanaReady;
    this.xpackInfoService = xpackInfoService;
    this.version = version;

    _defineProperty(this, "xpackInfo", null);

    _defineProperty(this, "adapterService", void 0);

    _defineProperty(this, "shieldUser", null);

    _defineProperty(this, "setUISettings", function (key, value) {
      _this.adapterService.callOrBuffer(function (_ref) {
        var config = _ref.config;
        config.set(key, value);
      });
    });

    this.adapterService = new KibanaAdapterServiceProvider();
  }

  _createClass(KibanaFrameworkAdapter, [{
    key: "waitUntilFrameworkReady",
    value: function () {
      var _waitUntilFrameworkReady = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var xpackInfo, xpackInfoUnpacked, assertData, securitySetup, assertUser;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.onKibanaReady();

              case 2:
                xpackInfo = this.xpackInfoService;
                _context.prev = 3;
                xpackInfoUnpacked = {
                  basePath: this.getBasePath(),
                  license: {
                    type: xpackInfo ? xpackInfo.getLicense().type : 'oss',
                    expired: xpackInfo ? !xpackInfo.getLicense().isActive : false,
                    expiry_date_in_millis: xpackInfo.getLicense().expiryDateInMillis !== undefined ? xpackInfo.getLicense().expiryDateInMillis : -1
                  },
                  security: {
                    enabled: xpackInfo ? xpackInfo.get("features.".concat(this.PLUGIN_ID, ".security.enabled"), false) : false,
                    available: xpackInfo ? xpackInfo.get("features.".concat(this.PLUGIN_ID, ".security.available"), false) : false
                  },
                  settings: xpackInfo ? xpackInfo.get("features.".concat(this.PLUGIN_ID, ".settings")) : {}
                };
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](3);
                throw new Error("Unexpected data structure from xpackInfoService, ".concat(JSON.stringify(_context.t0)));

              case 10:
                assertData = _adapter_types.RuntimeFrameworkInfo.decode(xpackInfoUnpacked);

                if (!(0, _Either.isLeft)(assertData)) {
                  _context.next = 13;
                  break;
                }

                throw new Error("Error parsing xpack info in ".concat(this.PLUGIN_ID, ",   ").concat(_PathReporter.PathReporter.report(assertData)[0]));

              case 13:
                this.xpackInfo = xpackInfoUnpacked;
                securitySetup = _new_platform.npSetup.plugins.security;
                _context.prev = 15;
                _context.next = 18;
                return securitySetup === null || securitySetup === void 0 ? void 0 : securitySetup.authc.getCurrentUser();

              case 18:
                _context.t1 = _context.sent;

                if (_context.t1) {
                  _context.next = 21;
                  break;
                }

                _context.t1 = null;

              case 21:
                this.shieldUser = _context.t1;
                assertUser = _adapter_types.RuntimeFrameworkUser.decode(this.shieldUser);

                if (!(0, _Either.isLeft)(assertUser)) {
                  _context.next = 25;
                  break;
                }

                throw new Error("Error parsing user info in ".concat(this.PLUGIN_ID, ",   ").concat(_PathReporter.PathReporter.report(assertUser)[0]));

              case 25:
                _context.next = 30;
                break;

              case 27:
                _context.prev = 27;
                _context.t2 = _context["catch"](15);
                this.shieldUser = null;

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 7], [15, 27]]);
      }));

      function waitUntilFrameworkReady() {
        return _waitUntilFrameworkReady.apply(this, arguments);
      }

      return waitUntilFrameworkReady;
    }()
  }, {
    key: "renderUIAtPath",
    value: function renderUIAtPath(path, component) {
      var _this2 = this;

      var toController = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'self';
      var adapter = this;
      this.routes.when("".concat(path).concat(_toConsumableArray(Array(6)).map(function (e, n) {
        return "/:arg".concat(n, "?");
      }).join('')), // Hack because angular 1 does not support wildcards
      {
        template: toController === 'self' ? "<".concat(this.PLUGIN_ID, "><div id=\"").concat(this.PLUGIN_ID, "ReactRoot\"></div></").concat(this.PLUGIN_ID, ">") : "<kbn-management-app section=\"".concat(this.PLUGIN_ID.replace('_', '-'), "\">\n                <div id=\"management-sidenav\" class=\"euiPageSideBar\" style=\"position: static;\"></div>\n                <div id=\"").concat(this.PLUGIN_ID, "ReactRoot\" />\n               </kbn-management-app>"),
        // eslint-disable-next-line max-classes-per-file
        controller: function controller($scope, $route) {
          try {
            $scope.$$postDigest(function () {
              var elem = document.getElementById("".concat(_this2.PLUGIN_ID, "ReactRoot"));
              ReactDOM.render(component, elem);
              adapter.manageAngularLifecycle($scope, $route, elem);
            });

            $scope.$onInit = function () {
              $scope.topNavMenu = [];
            };
          } catch (e) {
            throw new Error("Error rendering Beats CM to the dom, ".concat(e.message));
          }
        }
      });
    }
  }, {
    key: "registerManagementSection",
    value: function registerManagementSection(settings) {
      var sectionId = settings.id || this.PLUGIN_ID;

      if (!this.management.hasItem(sectionId)) {
        this.management.register(sectionId, {
          display: settings.name,
          icon: settings.iconName,
          order: settings.order || 30
        });
      }
    }
  }, {
    key: "registerManagementUI",
    value: function registerManagementUI(settings) {
      var sectionId = settings.sectionId || this.PLUGIN_ID;

      if (!this.management.hasItem(sectionId)) {
        throw new Error("registerManagementUI was called with a sectionId of ".concat(sectionId, ", and that is is not yet regestered as a section"));
      }

      var section = this.management.getSection(sectionId);
      section.register(sectionId, {
        visible: settings.visable || true,
        display: settings.name,
        order: settings.order || 30,
        url: "#".concat(settings.basePath)
      });
    }
  }, {
    key: "manageAngularLifecycle",
    value: function manageAngularLifecycle($scope, $route, elem) {
      var lastRoute = $route.current;
      var deregister = $scope.$on('$locationChangeSuccess', function () {
        var currentRoute = $route.current; // if templates are the same we are on the same route

        if (lastRoute.$$route.template === currentRoute.$$route.template) {
          // this prevents angular from destroying scope
          $route.current = lastRoute;
        } else {
          if (elem) {
            ReactDOM.unmountComponentAtNode(elem);
            elem.remove();
          }
        }
      });
      $scope.$on('$destroy', function () {
        if (deregister) {
          deregister();
        } // manually unmount component when scope is destroyed


        if (elem) {
          ReactDOM.unmountComponentAtNode(elem);
          elem.remove();
        }
      });
    }
  }]);

  return KibanaFrameworkAdapter;
}();

exports.KibanaFrameworkAdapter = KibanaFrameworkAdapter;

var KibanaAdapterServiceProvider =
/*#__PURE__*/
function () {
  function KibanaAdapterServiceProvider() {
    _classCallCheck(this, KibanaAdapterServiceProvider);

    _defineProperty(this, "serviceRefs", null);

    _defineProperty(this, "bufferedCalls", []);
  }

  _createClass(KibanaAdapterServiceProvider, [{
    key: "$get",
    value: function $get($rootScope, config) {
      this.serviceRefs = {
        config: config,
        rootScope: $rootScope
      };
      this.applyBufferedCalls(this.bufferedCalls);
      return this;
    }
  }, {
    key: "callOrBuffer",
    value: function callOrBuffer(serviceCall) {
      if (this.serviceRefs !== null) {
        this.applyBufferedCalls([serviceCall]);
      } else {
        this.bufferedCalls.push(serviceCall);
      }
    }
  }, {
    key: "applyBufferedCalls",
    value: function applyBufferedCalls(bufferedCalls) {
      var _this3 = this;

      if (!this.serviceRefs) {
        return;
      }

      this.serviceRefs.rootScope.$apply(function () {
        bufferedCalls.forEach(function (serviceCall) {
          if (!_this3.serviceRefs) {
            return;
          }

          return serviceCall(_this3.serviceRefs);
        });
      });
    }
  }]);

  return KibanaAdapterServiceProvider;
}();
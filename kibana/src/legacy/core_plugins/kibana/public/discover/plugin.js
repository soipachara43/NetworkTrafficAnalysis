"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoverPlugin = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _angular = _interopRequireDefault(require("angular"));

var _public = require("../../../../../plugins/data/public");

var _register_feature = require("./np_ready/register_feature");

var _kibana_services = require("./kibana_services");

var _get_inner_angular = require("./get_inner_angular");

var _build_services = require("./build_services");

var _public2 = require("../../../../../plugins/kibana_utils/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var innerAngularName = 'app/discover';
var embeddableAngularName = 'app/discoverEmbeddable';
/**
 * Contains Discover, one of the oldest parts of Kibana
 * There are 2 kinds of Angular bootstrapped for rendering, additionally to the main Angular
 * Discover provides embeddables, those contain a slimmer Angular
 */

var DiscoverPlugin =
/*#__PURE__*/
function () {
  function DiscoverPlugin() {
    _classCallCheck(this, DiscoverPlugin);

    _defineProperty(this, "servicesInitialized", false);

    _defineProperty(this, "innerAngularInitialized", false);

    _defineProperty(this, "embeddableInjector", null);

    _defineProperty(this, "getEmbeddableInjector", null);

    _defineProperty(this, "appStateUpdater", new _rxjs.BehaviorSubject(function () {
      return {};
    }));

    _defineProperty(this, "stopUrlTracking", undefined);

    _defineProperty(this, "initializeInnerAngular", void 0);

    _defineProperty(this, "initializeServices", void 0);
  }

  _createClass(DiscoverPlugin, [{
    key: "setup",
    value: function setup(core, plugins) {
      var _this = this;

      var _createKbnUrlTracker = (0, _public2.createKbnUrlTracker)({
        baseUrl: core.http.basePath.prepend('/app/kibana'),
        defaultSubUrl: '#/discover',
        storageKey: "lastUrl:".concat(core.http.basePath.get(), ":discover"),
        navLinkUpdater$: this.appStateUpdater,
        toastNotifications: core.notifications.toasts,
        stateParams: [{
          kbnUrlKey: '_g',
          stateUpdate$: plugins.data.query.state$.pipe((0, _operators.filter)(function (_ref) {
            var changes = _ref.changes;
            return !!(changes.globalFilters || changes.time || changes.refreshInterval);
          }), (0, _operators.map)(function (_ref2) {
            var _state$filters;

            var state = _ref2.state;
            return _objectSpread({}, state, {
              filters: (_state$filters = state.filters) === null || _state$filters === void 0 ? void 0 : _state$filters.filter(_public.esFilters.isFilterPinned)
            });
          }))
        }]
      }),
          appMounted = _createKbnUrlTracker.appMounted,
          appUnMounted = _createKbnUrlTracker.appUnMounted,
          stopUrlTracker = _createKbnUrlTracker.stop,
          setTrackedUrl = _createKbnUrlTracker.setActiveUrl;

      (0, _kibana_services.setUrlTracker)({
        setTrackedUrl: setTrackedUrl
      });

      this.stopUrlTracking = function () {
        stopUrlTracker();
      };

      this.getEmbeddableInjector = this.getInjector.bind(this);
      plugins.discover.docViews.setAngularInjectorGetter(this.getEmbeddableInjector);
      plugins.kibanaLegacy.registerLegacyApp({
        id: 'discover',
        title: 'Discover',
        updater$: this.appStateUpdater.asObservable(),
        navLinkId: 'kibana:discover',
        order: -1004,
        euiIconType: 'discoverApp',
        mount: function () {
          var _mount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(params) {
            var _ref3, renderApp, unmount;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (_this.initializeServices) {
                      _context.next = 2;
                      break;
                    }

                    throw Error('Discover plugin method initializeServices is undefined');

                  case 2:
                    if (_this.initializeInnerAngular) {
                      _context.next = 4;
                      break;
                    }

                    throw Error('Discover plugin method initializeInnerAngular is undefined');

                  case 4:
                    appMounted();
                    _context.next = 7;
                    return _this.initializeServices();

                  case 7:
                    _context.next = 9;
                    return _this.initializeInnerAngular();

                  case 9:
                    _context.next = 11;
                    return import('./np_ready/application');

                  case 11:
                    _ref3 = _context.sent;
                    renderApp = _ref3.renderApp;
                    _context.next = 15;
                    return renderApp(innerAngularName, params.element);

                  case 15:
                    unmount = _context.sent;
                    return _context.abrupt("return", function () {
                      unmount();
                      appUnMounted();
                    });

                  case 17:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function mount(_x) {
            return _mount.apply(this, arguments);
          }

          return mount;
        }()
      });
      (0, _register_feature.registerFeature)(plugins.home);
      this.registerEmbeddable(core, plugins);
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      var _this2 = this;

      // we need to register the application service at setup, but to render it
      // there are some start dependencies necessary, for this reason
      // initializeInnerAngular + initializeServices are assigned at start and used
      // when the application/embeddable is mounted
      this.initializeInnerAngular =
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var module;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this2.innerAngularInitialized) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                // this is used by application mount and tests
                module = (0, _get_inner_angular.getInnerAngularModule)(innerAngularName, core, plugins);
                (0, _kibana_services.setAngularModule)(module);
                _this2.innerAngularInitialized = true;

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      this.initializeServices =
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var services;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!_this2.servicesInitialized) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", {
                  core: core,
                  plugins: plugins
                });

              case 2:
                _context3.next = 4;
                return (0, _build_services.buildServices)(core, plugins);

              case 4:
                services = _context3.sent;
                (0, _kibana_services.setServices)(services);
                _this2.servicesInitialized = true;
                return _context3.abrupt("return", {
                  core: core,
                  plugins: plugins
                });

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.stopUrlTracking) {
        this.stopUrlTracking();
      }
    }
    /**
     * register embeddable with a slimmer embeddable version of inner angular
     */

  }, {
    key: "registerEmbeddable",
    value: function () {
      var _registerEmbeddable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(core, plugins) {
        var _ref6, SearchEmbeddableFactory, getStartServices, factory;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return import('./np_ready/embeddable');

              case 2:
                _ref6 = _context5.sent;
                SearchEmbeddableFactory = _ref6.SearchEmbeddableFactory;

                if (this.getEmbeddableInjector) {
                  _context5.next = 6;
                  break;
                }

                throw Error('Discover plugin method getEmbeddableInjector is undefined');

              case 6:
                getStartServices =
                /*#__PURE__*/
                function () {
                  var _ref7 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee4() {
                    var _ref8, _ref9, coreStart, deps;

                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return core.getStartServices();

                          case 2:
                            _ref8 = _context4.sent;
                            _ref9 = _slicedToArray(_ref8, 2);
                            coreStart = _ref9[0];
                            deps = _ref9[1];
                            return _context4.abrupt("return", {
                              executeTriggerActions: deps.uiActions.executeTriggerActions,
                              isEditable: function isEditable() {
                                return coreStart.application.capabilities.discover.save;
                              }
                            });

                          case 7:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function getStartServices() {
                    return _ref7.apply(this, arguments);
                  };
                }();

                factory = new SearchEmbeddableFactory(getStartServices, this.getEmbeddableInjector);
                plugins.embeddable.registerEmbeddableFactory(factory.type, factory);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function registerEmbeddable(_x2, _x3) {
        return _registerEmbeddable.apply(this, arguments);
      }

      return registerEmbeddable;
    }()
  }, {
    key: "getInjector",
    value: function () {
      var _getInjector = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var _ref10, core, plugins, mountpoint;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.embeddableInjector) {
                  _context6.next = 11;
                  break;
                }

                if (this.initializeServices) {
                  _context6.next = 3;
                  break;
                }

                throw Error('Discover plugin getEmbeddableInjector:  initializeServices is undefined');

              case 3:
                _context6.next = 5;
                return this.initializeServices();

              case 5:
                _ref10 = _context6.sent;
                core = _ref10.core;
                plugins = _ref10.plugins;
                (0, _get_inner_angular.getInnerAngularModuleEmbeddable)(embeddableAngularName, core, plugins);
                mountpoint = document.createElement('div');
                this.embeddableInjector = _angular.default.bootstrap(mountpoint, [embeddableAngularName]);

              case 11:
                return _context6.abrupt("return", this.embeddableInjector);

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getInjector() {
        return _getInjector.apply(this, arguments);
      }

      return getInjector;
    }()
  }]);

  return DiscoverPlugin;
}();

exports.DiscoverPlugin = DiscoverPlugin;
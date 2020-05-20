"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardPlugin = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../plugins/data/public");

var _public2 = require("../../../../../plugins/kibana_utils/public");

var _dashboard_constants = require("./np_ready/dashboard_constants");

var _public3 = require("../../../../../plugins/home/public");

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

var DashboardPlugin =
/*#__PURE__*/
function () {
  function DashboardPlugin(initializerContext) {
    _classCallCheck(this, DashboardPlugin);

    this.initializerContext = initializerContext;

    _defineProperty(this, "startDependencies", null);

    _defineProperty(this, "appStateUpdater", new _rxjs.BehaviorSubject(function () {
      return {};
    }));

    _defineProperty(this, "stopUrlTracking", undefined);
  }

  _createClass(DashboardPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var _this = this;

      var home = _ref.home,
          kibanaLegacy = _ref.kibanaLegacy,
          data = _ref.data;

      var _createKbnUrlTracker = (0, _public2.createKbnUrlTracker)({
        baseUrl: core.http.basePath.prepend('/app/kibana'),
        defaultSubUrl: "#".concat(_dashboard_constants.DashboardConstants.LANDING_PAGE_PATH),
        shouldTrackUrlUpdate: function shouldTrackUrlUpdate(pathname) {
          var targetAppName = pathname.split('/')[1];
          return targetAppName === _dashboard_constants.DashboardConstants.DASHBOARDS_ID || targetAppName === _dashboard_constants.DashboardConstants.DASHBOARD_ID;
        },
        storageKey: "lastUrl:".concat(core.http.basePath.get(), ":dashboard"),
        navLinkUpdater$: this.appStateUpdater,
        toastNotifications: core.notifications.toasts,
        stateParams: [{
          kbnUrlKey: '_g',
          stateUpdate$: data.query.state$.pipe((0, _operators.filter)(function (_ref2) {
            var changes = _ref2.changes;
            return !!(changes.globalFilters || changes.time || changes.refreshInterval);
          }), (0, _operators.map)(function (_ref3) {
            var _state$filters;

            var state = _ref3.state;
            return _objectSpread({}, state, {
              filters: (_state$filters = state.filters) === null || _state$filters === void 0 ? void 0 : _state$filters.filter(_public.esFilters.isFilterPinned)
            });
          }))
        }]
      }),
          appMounted = _createKbnUrlTracker.appMounted,
          appUnMounted = _createKbnUrlTracker.appUnMounted,
          stopUrlTracker = _createKbnUrlTracker.stop;

      this.stopUrlTracking = function () {
        stopUrlTracker();
      };

      var app = {
        id: '',
        title: 'Dashboards',
        mount: function () {
          var _mount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(params) {
            var _ref4, _ref5, coreStart, _this$startDependenci, savedObjectsClient, embeddable, navigation, share, dataStart, dashboardConfig, getSavedDashboardLoader, savedDashboards, deps, _ref6, renderApp, unmount;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return core.getStartServices();

                  case 2:
                    _ref4 = _context.sent;
                    _ref5 = _slicedToArray(_ref4, 1);
                    coreStart = _ref5[0];

                    if (!(_this.startDependencies === null)) {
                      _context.next = 7;
                      break;
                    }

                    throw new Error('not started yet');

                  case 7:
                    appMounted();
                    _this$startDependenci = _this.startDependencies, savedObjectsClient = _this$startDependenci.savedObjectsClient, embeddable = _this$startDependenci.embeddable, navigation = _this$startDependenci.navigation, share = _this$startDependenci.share, dataStart = _this$startDependenci.data, dashboardConfig = _this$startDependenci.dashboardConfig, getSavedDashboardLoader = _this$startDependenci.dashboard.getSavedDashboardLoader;
                    savedDashboards = getSavedDashboardLoader();
                    deps = {
                      pluginInitializerContext: _this.initializerContext,
                      core: coreStart,
                      dashboardConfig: dashboardConfig,
                      navigation: navigation,
                      share: share,
                      data: dataStart,
                      savedObjectsClient: savedObjectsClient,
                      savedDashboards: savedDashboards,
                      chrome: coreStart.chrome,
                      addBasePath: coreStart.http.basePath.prepend,
                      uiSettings: coreStart.uiSettings,
                      config: kibanaLegacy.config,
                      savedQueryService: dataStart.query.savedQueries,
                      embeddable: embeddable,
                      dashboardCapabilities: coreStart.application.capabilities.dashboard,
                      embeddableCapabilities: {
                        visualizeCapabilities: coreStart.application.capabilities.visualize,
                        mapsCapabilities: coreStart.application.capabilities.maps
                      },
                      localStorage: new _public2.Storage(localStorage)
                    };
                    _context.next = 13;
                    return import('./np_ready/application');

                  case 13:
                    _ref6 = _context.sent;
                    renderApp = _ref6.renderApp;
                    unmount = renderApp(params.element, params.appBasePath, deps);
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
      };
      kibanaLegacy.registerLegacyApp(_objectSpread({}, app, {
        id: _dashboard_constants.DashboardConstants.DASHBOARD_ID,
        // only register the updater in once app, otherwise all updates would happen twice
        updater$: this.appStateUpdater.asObservable(),
        navLinkId: 'kibana:dashboard'
      }));
      kibanaLegacy.registerLegacyApp(_objectSpread({}, app, {
        id: _dashboard_constants.DashboardConstants.DASHBOARDS_ID
      }));
      home.featureCatalogue.register({
        id: _dashboard_constants.DashboardConstants.DASHBOARD_ID,
        title: _i18n.i18n.translate('kbn.dashboard.featureCatalogue.dashboardTitle', {
          defaultMessage: 'Dashboard'
        }),
        description: _i18n.i18n.translate('kbn.dashboard.featureCatalogue.dashboardDescription', {
          defaultMessage: 'Display and share a collection of visualizations and saved searches.'
        }),
        icon: 'dashboardApp',
        path: "/app/kibana#".concat(_dashboard_constants.DashboardConstants.LANDING_PAGE_PATH),
        showOnHomePage: true,
        category: _public3.FeatureCatalogueCategory.DATA
      });
    }
  }, {
    key: "start",
    value: function start(_ref7, _ref8) {
      var savedObjectsClient = _ref7.savedObjects.client;
      var embeddable = _ref8.embeddable,
          navigation = _ref8.navigation,
          data = _ref8.data,
          share = _ref8.share,
          dashboardConfig = _ref8.kibanaLegacy.dashboardConfig,
          dashboard = _ref8.dashboard;
      this.startDependencies = {
        data: data,
        savedObjectsClient: savedObjectsClient,
        embeddable: embeddable,
        navigation: navigation,
        share: share,
        dashboardConfig: dashboardConfig,
        dashboard: dashboard
      };
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.stopUrlTracking) {
        this.stopUrlTracking();
      }
    }
  }]);

  return DashboardPlugin;
}();

exports.DashboardPlugin = DashboardPlugin;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizePlugin = void 0;

var _rxjs = require("rxjs");

var _i18n = require("@kbn/i18n");

var _operators = require("rxjs/operators");

var _public = require("../../../../../plugins/kibana_utils/public");

var _public2 = require("../../../../../plugins/data/public");

var _visualize_constants = require("./np_ready/visualize_constants");

var _kibana_services = require("./kibana_services");

var _public3 = require("../../../../../plugins/home/public");

var _public4 = require("../../../vis_default_editor/public");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VisualizePlugin =
/*#__PURE__*/
function () {
  function VisualizePlugin(initializerContext) {
    _classCallCheck(this, VisualizePlugin);

    this.initializerContext = initializerContext;

    _defineProperty(this, "startDependencies", null);

    _defineProperty(this, "appStateUpdater", new _rxjs.BehaviorSubject(function () {
      return {};
    }));

    _defineProperty(this, "stopUrlTracking", undefined);
  }

  _createClass(VisualizePlugin, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(core, _ref) {
        var _this = this;

        var home, kibanaLegacy, usageCollection, data, _createKbnUrlTracker, appMounted, appUnMounted, stopUrlTracker, setActiveUrl;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                home = _ref.home, kibanaLegacy = _ref.kibanaLegacy, usageCollection = _ref.usageCollection, data = _ref.data;
                _createKbnUrlTracker = (0, _public.createKbnUrlTracker)({
                  baseUrl: core.http.basePath.prepend('/app/kibana'),
                  defaultSubUrl: '#/visualize',
                  storageKey: "lastUrl:".concat(core.http.basePath.get(), ":visualize"),
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
                        filters: (_state$filters = state.filters) === null || _state$filters === void 0 ? void 0 : _state$filters.filter(_public2.esFilters.isFilterPinned)
                      });
                    }))
                  }]
                }), appMounted = _createKbnUrlTracker.appMounted, appUnMounted = _createKbnUrlTracker.appUnMounted, stopUrlTracker = _createKbnUrlTracker.stop, setActiveUrl = _createKbnUrlTracker.setActiveUrl;

                this.stopUrlTracking = function () {
                  stopUrlTracker();
                };

                kibanaLegacy.registerLegacyApp({
                  id: 'visualize',
                  title: 'Visualize',
                  updater$: this.appStateUpdater.asObservable(),
                  navLinkId: 'kibana:visualize',
                  mount: function () {
                    var _mount = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee(params) {
                      var _ref4, _ref5, coreStart, _this$startDependenci, savedObjectsClient, embeddable, navigation, visualizations, dataStart, share, deps, _ref6, renderApp, unmount;

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
                              _this$startDependenci = _this.startDependencies, savedObjectsClient = _this$startDependenci.savedObjectsClient, embeddable = _this$startDependenci.embeddable, navigation = _this$startDependenci.navigation, visualizations = _this$startDependenci.visualizations, dataStart = _this$startDependenci.data, share = _this$startDependenci.share;
                              deps = {
                                pluginInitializerContext: _this.initializerContext,
                                addBasePath: coreStart.http.basePath.prepend,
                                core: coreStart,
                                chrome: coreStart.chrome,
                                data: dataStart,
                                embeddable: embeddable,
                                getBasePath: core.http.basePath.get,
                                indexPatterns: dataStart.indexPatterns,
                                localStorage: new _public.Storage(localStorage),
                                navigation: navigation,
                                savedObjectsClient: savedObjectsClient,
                                savedVisualizations: visualizations.savedVisualizationsLoader,
                                savedQueryService: dataStart.query.savedQueries,
                                share: share,
                                toastNotifications: coreStart.notifications.toasts,
                                uiSettings: coreStart.uiSettings,
                                config: kibanaLegacy.config,
                                visualizeCapabilities: coreStart.application.capabilities.visualize,
                                visualizations: visualizations,
                                usageCollection: usageCollection,
                                I18nContext: coreStart.i18n.Context,
                                setActiveUrl: setActiveUrl,
                                DefaultVisualizationEditor: _public4.DefaultEditorController
                              };
                              (0, _kibana_services.setServices)(deps);
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

                    function mount(_x3) {
                      return _mount.apply(this, arguments);
                    }

                    return mount;
                  }()
                });
                home.featureCatalogue.register({
                  id: 'visualize',
                  title: 'Visualize',
                  description: _i18n.i18n.translate('kbn.visualize.visualizeDescription', {
                    defaultMessage: 'Create visualizations and aggregate data stores in your Elasticsearch indices.'
                  }),
                  icon: 'visualizeApp',
                  path: "/app/kibana#".concat(_visualize_constants.VisualizeConstants.LANDING_PAGE_PATH),
                  showOnHomePage: true,
                  category: _public3.FeatureCatalogueCategory.DATA
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setup(_x, _x2) {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: "start",
    value: function start(core, _ref7) {
      var embeddable = _ref7.embeddable,
          navigation = _ref7.navigation,
          data = _ref7.data,
          share = _ref7.share,
          visualizations = _ref7.visualizations;
      this.startDependencies = {
        data: data,
        embeddable: embeddable,
        navigation: navigation,
        savedObjectsClient: core.savedObjects.client,
        share: share,
        visualizations: visualizations
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

  return VisualizePlugin;
}();

exports.VisualizePlugin = VisualizePlugin;
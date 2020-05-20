"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomePublicPlugin = void 0;

var _services = require("./services");

var _kibana_services = require("./application/kibana_services");

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

var HomePublicPlugin =
/*#__PURE__*/
function () {
  function HomePublicPlugin(initializerContext) {
    _classCallCheck(this, HomePublicPlugin);

    this.initializerContext = initializerContext;

    _defineProperty(this, "featuresCatalogueRegistry", new _services.FeatureCatalogueRegistry());

    _defineProperty(this, "environmentService", new _services.EnvironmentService());

    _defineProperty(this, "tutorialService", new _services.TutorialService());
  }

  _createClass(HomePublicPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var _this = this;

      var kibanaLegacy = _ref.kibanaLegacy,
          usageCollection = _ref.usageCollection;
      kibanaLegacy.registerLegacyApp({
        id: 'home',
        title: 'Home',
        mount: function () {
          var _mount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(params) {
            var trackUiMetric, _ref2, _ref3, coreStart, _ref3$, telemetry, data, _ref4, renderApp;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    trackUiMetric = usageCollection ? usageCollection.reportUiStats.bind(usageCollection, 'Kibana_home') : function () {};
                    _context.next = 3;
                    return core.getStartServices();

                  case 3:
                    _ref2 = _context.sent;
                    _ref3 = _slicedToArray(_ref2, 2);
                    coreStart = _ref3[0];
                    _ref3$ = _ref3[1];
                    telemetry = _ref3$.telemetry;
                    data = _ref3$.data;
                    (0, _kibana_services.setServices)({
                      trackUiMetric: trackUiMetric,
                      kibanaVersion: _this.initializerContext.env.packageInfo.version,
                      http: coreStart.http,
                      toastNotifications: core.notifications.toasts,
                      banners: coreStart.overlays.banners,
                      docLinks: coreStart.docLinks,
                      savedObjectsClient: coreStart.savedObjects.client,
                      chrome: coreStart.chrome,
                      telemetry: telemetry,
                      uiSettings: core.uiSettings,
                      addBasePath: core.http.basePath.prepend,
                      getBasePath: core.http.basePath.get,
                      indexPatternService: data.indexPatterns,
                      environmentService: _this.environmentService,
                      config: kibanaLegacy.config,
                      homeConfig: _this.initializerContext.config.get(),
                      tutorialService: _this.tutorialService,
                      featureCatalogue: _this.featuresCatalogueRegistry
                    });
                    _context.next = 12;
                    return import('./application');

                  case 12:
                    _ref4 = _context.sent;
                    renderApp = _ref4.renderApp;
                    _context.next = 16;
                    return renderApp(params.element);

                  case 16:
                    return _context.abrupt("return", _context.sent);

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
      return {
        featureCatalogue: _objectSpread({}, this.featuresCatalogueRegistry.setup()),
        environment: _objectSpread({}, this.environmentService.setup()),
        tutorials: _objectSpread({}, this.tutorialService.setup())
      };
    }
  }, {
    key: "start",
    value: function start(_ref5) {
      var capabilities = _ref5.application.capabilities;
      this.featuresCatalogueRegistry.start({
        capabilities: capabilities
      });
    }
  }]);

  return HomePublicPlugin;
}();
/** @public */


exports.HomePublicPlugin = HomePublicPlugin;
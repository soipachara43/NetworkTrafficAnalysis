"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LensPlugin = exports.isRisonObject = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _reactRouterDom = require("react-router-dom");

var _reactDom = require("react-dom");

var _risonNode = _interopRequireDefault(require("rison-node"));

var _lodash = require("lodash");

var _public = require("../../../../../src/plugins/kibana_utils/public");

var _editor_frame_service = require("./editor_frame_service");

var _indexpattern_datasource = require("./indexpattern_datasource");

var _help_menu_util = require("./help_menu_util");

var _persistence = require("./persistence");

var _xy_visualization = require("./xy_visualization");

var _metric_visualization = require("./metric_visualization");

var _datatable_visualization = require("./datatable_visualization");

var _app_plugin = require("./app_plugin");

var _lens_ui_telemetry = require("./lens_ui_telemetry");

var _common = require("../../../../plugins/lens/common");

var _url_helper = require("../../../../../src/legacy/core_plugins/kibana/public/dashboard/np_ready/url_helper");

var _vis_type_alias = require("./vis_type_alias");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var isRisonObject = function isRisonObject(value) {
  return (0, _lodash.isObject)(value);
};

exports.isRisonObject = isRisonObject;

var LensPlugin =
/*#__PURE__*/
function () {
  function LensPlugin() {
    _classCallCheck(this, LensPlugin);

    _defineProperty(this, "datatableVisualization", void 0);

    _defineProperty(this, "editorFrameService", void 0);

    _defineProperty(this, "createEditorFrame", null);

    _defineProperty(this, "indexpatternDatasource", void 0);

    _defineProperty(this, "xyVisualization", void 0);

    _defineProperty(this, "metricVisualization", void 0);

    this.datatableVisualization = new _datatable_visualization.DatatableVisualization();
    this.editorFrameService = new _editor_frame_service.EditorFrameService();
    this.indexpatternDatasource = new _indexpattern_datasource.IndexPatternDatasource();
    this.xyVisualization = new _xy_visualization.XyVisualization();
    this.metricVisualization = new _metric_visualization.MetricVisualization();
  }

  _createClass(LensPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var _this = this;

      var kibanaLegacy = _ref.kibanaLegacy,
          expressions = _ref.expressions,
          data = _ref.data,
          embeddable = _ref.embeddable,
          _ref$__LEGACY = _ref.__LEGACY,
          formatFactory = _ref$__LEGACY.formatFactory,
          visualizations = _ref$__LEGACY.visualizations;
      var editorFrameSetupInterface = this.editorFrameService.setup(core, {
        data: data,
        embeddable: embeddable,
        expressions: expressions
      });
      var dependencies = {
        expressions: expressions,
        data: data,
        editorFrame: editorFrameSetupInterface,
        formatFactory: formatFactory
      };
      this.indexpatternDatasource.setup(core, dependencies);
      this.xyVisualization.setup(core, dependencies);
      this.datatableVisualization.setup(core, dependencies);
      this.metricVisualization.setup(core, dependencies);
      visualizations.registerAlias((0, _vis_type_alias.getLensAliasConfig)());
      kibanaLegacy.registerLegacyApp({
        id: 'lens',
        title: _common.NOT_INTERNATIONALIZED_PRODUCT_NAME,
        mount: function () {
          var _mount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(params) {
            var _ref2, _ref3, coreStart, startDependencies, dataStart, savedObjectsClient, instance, updateUrlTime, _redirectTo, renderEditor, NotFound;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    NotFound = function _ref4() {
                      (0, _lens_ui_telemetry.trackUiEvent)('loaded_404');
                      return _react.default.createElement(_react2.FormattedMessage, {
                        id: "xpack.lens.app404",
                        defaultMessage: "404 Not Found"
                      });
                    };

                    _context.next = 3;
                    return core.getStartServices();

                  case 3:
                    _ref2 = _context.sent;
                    _ref3 = _slicedToArray(_ref2, 2);
                    coreStart = _ref3[0];
                    startDependencies = _ref3[1];
                    dataStart = startDependencies.data;
                    savedObjectsClient = coreStart.savedObjects.client;
                    (0, _help_menu_util.addHelpMenuToAppChrome)(coreStart.chrome);
                    _context.next = 12;
                    return _this.createEditorFrame();

                  case 12:
                    instance = _context.sent;
                    (0, _lens_ui_telemetry.setReportManager)(new _lens_ui_telemetry.LensReportManager({
                      storage: new _public.Storage(localStorage),
                      http: core.http
                    }));

                    updateUrlTime = function updateUrlTime(urlVars) {
                      var decoded = _risonNode.default.decode(urlVars._g);

                      if (!isRisonObject(decoded)) {
                        return;
                      } // @ts-ignore


                      decoded.time = dataStart.query.timefilter.timefilter.getTime();
                      urlVars._g = _risonNode.default.encode(decoded);
                    };

                    _redirectTo = function redirectTo(routeProps, addToDashboardMode, id) {
                      if (!id) {
                        routeProps.history.push('/lens');
                      } else if (!addToDashboardMode) {
                        routeProps.history.push("/lens/edit/".concat(id));
                      } else if (addToDashboardMode && id) {
                        routeProps.history.push("/lens/edit/".concat(id));
                        var url = coreStart.chrome.navLinks.get('kibana:dashboard');

                        if (!url) {
                          throw new Error('Cannot get last dashboard url');
                        }

                        var lastDashboardAbsoluteUrl = url.url;
                        var basePath = coreStart.http.basePath.get();
                        var lensUrl = (0, _url_helper.getLensUrlFromDashboardAbsoluteUrl)(lastDashboardAbsoluteUrl, basePath, id);

                        if (!lastDashboardAbsoluteUrl || !lensUrl) {
                          throw new Error('Cannot get last dashboard url');
                        }

                        window.history.pushState({}, '', lensUrl);
                        var urlVars = (0, _url_helper.getUrlVars)(lastDashboardAbsoluteUrl);
                        updateUrlTime(urlVars); // we need to pass in timerange in query params directly

                        var dashboardParsedUrl = (0, _url_helper.addEmbeddableToDashboardUrl)(lastDashboardAbsoluteUrl, basePath, id, urlVars);

                        if (!dashboardParsedUrl) {
                          throw new Error('Problem parsing dashboard url');
                        }

                        window.history.pushState({}, '', dashboardParsedUrl);
                      }
                    };

                    renderEditor = function renderEditor(routeProps) {
                      (0, _lens_ui_telemetry.trackUiEvent)('loaded');
                      var addToDashboardMode = !!routeProps.location.search && routeProps.location.search.includes('addToDashboard');
                      return _react.default.createElement(_app_plugin.App, {
                        core: coreStart,
                        data: dataStart,
                        editorFrame: instance,
                        storage: new _public.Storage(localStorage),
                        docId: routeProps.match.params.id,
                        docStorage: new _persistence.SavedObjectIndexStore(savedObjectsClient),
                        redirectTo: function redirectTo(id) {
                          return _redirectTo(routeProps, addToDashboardMode, id);
                        },
                        addToDashboardMode: addToDashboardMode
                      });
                    };

                    (0, _reactDom.render)(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_reactRouterDom.HashRouter, null, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
                      exact: true,
                      path: "/lens/edit/:id",
                      render: renderEditor
                    }), _react.default.createElement(_reactRouterDom.Route, {
                      exact: true,
                      path: "/lens",
                      render: renderEditor
                    }), _react.default.createElement(_reactRouterDom.Route, {
                      path: "/lens",
                      component: NotFound
                    })))), params.element);
                    return _context.abrupt("return", function () {
                      instance.unmount();
                      (0, _reactDom.unmountComponentAtNode)(params.element);
                    });

                  case 19:
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
    }
  }, {
    key: "start",
    value: function start(core, startDependencies) {
      this.createEditorFrame = this.editorFrameService.start(core, startDependencies).createInstance;
      this.xyVisualization.start(core, startDependencies);
    }
  }, {
    key: "stop",
    value: function stop() {
      (0, _lens_ui_telemetry.stopReportManager)();
    }
  }]);

  return LensPlugin;
}();

exports.LensPlugin = LensPlugin;
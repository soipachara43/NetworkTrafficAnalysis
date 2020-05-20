"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardEmbeddableContainerPublicPlugin = void 0;

var React = _interopRequireWildcard(require("react"));

var _public = require("../../../plugins/embeddable/public");

var _actions = require("./actions");

var _dashboard_container_factory = require("./embeddable/dashboard_container_factory");

var _public2 = require("../../../plugins/saved_objects/public");

var _public3 = require("../../../plugins/kibana_react/public");

var _expand_panel_action = require("./actions/expand_panel_action");

var _replace_panel_action = require("./actions/replace_panel_action");

var _url_generator = require("./url_generator");

var _saved_dashboards = require("./saved_dashboards");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DashboardEmbeddableContainerPublicPlugin =
/*#__PURE__*/
function () {
  function DashboardEmbeddableContainerPublicPlugin(initializerContext) {
    _classCallCheck(this, DashboardEmbeddableContainerPublicPlugin);
  }

  _createClass(DashboardEmbeddableContainerPublicPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var share = _ref.share,
          uiActions = _ref.uiActions,
          embeddable = _ref.embeddable;
      var expandPanelAction = new _actions.ExpandPanelAction();
      uiActions.registerAction(expandPanelAction);
      uiActions.attachAction(_public.CONTEXT_MENU_TRIGGER, expandPanelAction);
      var startServices = core.getStartServices();

      if (share) {
        share.urlGenerators.registerUrlGenerator((0, _url_generator.createDirectAccessDashboardLinkGenerator)(
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return startServices;

                case 2:
                  _context.t0 = _context.sent[0].application.getUrlForApp('dashboard');
                  _context.next = 5;
                  return startServices;

                case 5:
                  _context.t1 = _context.sent[0].uiSettings.get('state:storeInSessionStorage');
                  return _context.abrupt("return", {
                    appBasePath: _context.t0,
                    useHashedUrl: _context.t1
                  });

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))));
      }

      var getStartServices =
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var _ref4, _ref5, coreStart, deps, useHideChrome, ExitFullScreenButton;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return core.getStartServices();

                case 2:
                  _ref4 = _context2.sent;
                  _ref5 = _slicedToArray(_ref4, 2);
                  coreStart = _ref5[0];
                  deps = _ref5[1];

                  useHideChrome = function useHideChrome() {
                    React.useEffect(function () {
                      coreStart.chrome.setIsVisible(false);
                      return function () {
                        return coreStart.chrome.setIsVisible(true);
                      };
                    }, []);
                  };

                  ExitFullScreenButton = function ExitFullScreenButton(props) {
                    useHideChrome();
                    return React.createElement(_public3.ExitFullScreenButton, props);
                  };

                  return _context2.abrupt("return", {
                    capabilities: coreStart.application.capabilities,
                    application: coreStart.application,
                    notifications: coreStart.notifications,
                    overlays: coreStart.overlays,
                    embeddable: deps.embeddable,
                    inspector: deps.inspector,
                    SavedObjectFinder: (0, _public2.getSavedObjectFinder)(coreStart.savedObjects, coreStart.uiSettings),
                    ExitFullScreenButton: ExitFullScreenButton,
                    uiActions: deps.uiActions
                  });

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function getStartServices() {
          return _ref3.apply(this, arguments);
        };
      }();

      var factory = new _dashboard_container_factory.DashboardContainerFactory(getStartServices);
      embeddable.registerEmbeddableFactory(factory.type, factory);
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      var notifications = core.notifications;
      var uiActions = plugins.uiActions,
          indexPatterns = plugins.data.indexPatterns;
      var SavedObjectFinder = (0, _public2.getSavedObjectFinder)(core.savedObjects, core.uiSettings);
      var changeViewAction = new _actions.ReplacePanelAction(core, SavedObjectFinder, notifications, plugins.embeddable.getEmbeddableFactories);
      uiActions.registerAction(changeViewAction);
      uiActions.attachAction(_public.CONTEXT_MENU_TRIGGER, changeViewAction);
      var savedDashboardLoader = (0, _saved_dashboards.createSavedDashboardLoader)({
        savedObjectsClient: core.savedObjects.client,
        indexPatterns: indexPatterns,
        chrome: core.chrome,
        overlays: core.overlays
      });
      return {
        getSavedDashboardLoader: function getSavedDashboardLoader() {
          return savedDashboardLoader;
        }
      };
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return DashboardEmbeddableContainerPublicPlugin;
}();

exports.DashboardEmbeddableContainerPublicPlugin = DashboardEmbeddableContainerPublicPlugin;
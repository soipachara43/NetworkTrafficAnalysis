"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKibanaFrameworkAdapter = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _alert_types = require("../../alert_types");

var _uptime_app = require("../../../uptime_app");

var _capabilities_adapter = require("./capabilities_adapter");

var _constants = require("../../../../common/constants");

var _apollo_client_adapter = require("./apollo_client_adapter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getKibanaFrameworkAdapter = function getKibanaFrameworkAdapter(core, plugins) {
  var capabilities = core.application.capabilities,
      _core$chrome = core.chrome,
      setBadge = _core$chrome.setBadge,
      setHelpExtension = _core$chrome.setHelpExtension,
      _core$docLinks = core.docLinks,
      DOC_LINK_VERSION = _core$docLinks.DOC_LINK_VERSION,
      ELASTIC_WEBSITE_URL = _core$docLinks.ELASTIC_WEBSITE_URL,
      basePath = core.http.basePath,
      i18n = core.i18n;
  var autocomplete = plugins.data.autocomplete,
      triggers_actions_ui = plugins.triggers_actions_ui;

  _alert_types.alertTypeInitializers.forEach(function (init) {
    return triggers_actions_ui.alertTypeRegistry.register(init({
      autocomplete: autocomplete
    }));
  });

  var breadcrumbs = [];
  core.chrome.getBreadcrumbs$().subscribe(function (nextBreadcrumbs) {
    breadcrumbs = nextBreadcrumbs || [];
  });

  var _getIntegratedAppAvai = (0, _capabilities_adapter.getIntegratedAppAvailability)(capabilities, _constants.INTEGRATED_SOLUTIONS),
      apm = _getIntegratedAppAvai.apm,
      infrastructure = _getIntegratedAppAvai.infrastructure,
      logs = _getIntegratedAppAvai.logs;

  var canSave = (0, _lodash.get)(capabilities, 'uptime.save', false);
  var props = {
    basePath: basePath.get(),
    canSave: canSave,
    client: (0, _apollo_client_adapter.createApolloClient)("".concat(basePath.get(), "/api/uptime/graphql"), 'true'),
    core: core,
    darkMode: core.uiSettings.get(_constants.DEFAULT_DARK_MODE),
    commonlyUsedRanges: core.uiSettings.get(_constants.DEFAULT_TIMEPICKER_QUICK_RANGES),
    i18n: i18n,
    isApmAvailable: apm,
    isInfraAvailable: infrastructure,
    isLogsAvailable: logs,
    kibanaBreadcrumbs: breadcrumbs,
    plugins: plugins,
    renderGlobalHelpControls: function renderGlobalHelpControls() {
      return setHelpExtension({
        appName: _i18n.i18n.translate('xpack.uptime.header.appName', {
          defaultMessage: 'Uptime'
        }),
        links: [{
          linkType: 'documentation',
          href: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/xpack-uptime.html")
        }, {
          linkType: 'discuss',
          href: 'https://discuss.elastic.co/c/uptime'
        }]
      });
    },
    routerBasename: basePath.prepend(_constants.PLUGIN.ROUTER_BASE_NAME),
    setBadge: setBadge,
    setBreadcrumbs: core.chrome.setBreadcrumbs
  };
  return {
    render: function () {
      var _render = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(element) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (element) {
                  _reactDom.default.render(_react.default.createElement(_uptime_app.UptimeApp, props), element);
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function render(_x) {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  };
};

exports.getKibanaFrameworkAdapter = getKibanaFrameworkAdapter;
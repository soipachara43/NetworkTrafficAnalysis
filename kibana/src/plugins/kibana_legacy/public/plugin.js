"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaLegacyPlugin = void 0;

var _dashboard_config = require("./dashboard_config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KibanaLegacyPlugin =
/*#__PURE__*/
function () {
  function KibanaLegacyPlugin(initializerContext) {
    _classCallCheck(this, KibanaLegacyPlugin);

    this.initializerContext = initializerContext;

    _defineProperty(this, "apps", []);

    _defineProperty(this, "forwards", []);
  }

  _createClass(KibanaLegacyPlugin, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      return {
        /**
         * @deprecated
         * Register an app to be managed by the application service.
         * This method works exactly as `core.application.register`.
         *
         * When an app is mounted, it is responsible for routing. The app
         * won't be mounted again if the route changes within the prefix
         * of the app (its id). It is fine to use whatever means for handling
         * routing within the app.
         *
         * When switching to a URL outside of the current prefix, the app router
         * shouldn't do anything because it doesn't own the routing anymore -
         * the local application service takes over routing again,
         * unmounts the current app and mounts the next app.
         *
         * @param app The app descriptor
         */
        registerLegacyApp: function registerLegacyApp(app) {
          _this.apps.push(app);
        },

        /**
         * @deprecated
         * Forwards every URL starting with `legacyAppId` to the same URL starting
         * with `newAppId` - e.g. `/legacy/my/legacy/path?q=123` gets forwarded to
         * `/newApp/my/legacy/path?q=123`.
         *
         * When setting the `keepPrefix` option, the new app id is simply prepended.
         * The example above would become `/newApp/legacy/my/legacy/path?q=123`.
         *
         * This method can be used to provide backwards compatibility for URLs when
         * renaming or nesting plugins. For route changes after the prefix, please
         * use the routing mechanism of your app.
         *
         * @param legacyAppId The name of the old app to forward URLs from
         * @param newAppId The name of the new app that handles the URLs now
         * @param options Whether the prefix of the old app is kept to nest the legacy
         * path into the new path
         */
        forwardApp: function forwardApp(legacyAppId, newAppId) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
            keepPrefix: false
          };

          _this.forwards.push(_objectSpread({
            legacyAppId: legacyAppId,
            newAppId: newAppId
          }, options));
        },

        /**
         * @deprecated
         * The `defaultAppId` config key is temporarily exposed to be used in the legacy platform.
         * As this setting is going away, no new code should depend on it.
         */
        config: this.initializerContext.config.get(),

        /**
         * @deprecated
         * Temporarily exposing the NP env to simulate initializer contexts in the LP.
         */
        env: this.initializerContext.env
      };
    }
  }, {
    key: "start",
    value: function start(_ref) {
      var _this2 = this;

      var application = _ref.application;
      return {
        /**
         * @deprecated
         * Just exported for wiring up with legacy platform, should not be used.
         */
        getApps: function getApps() {
          return _this2.apps;
        },

        /**
         * @deprecated
         * Just exported for wiring up with legacy platform, should not be used.
         */
        getForwards: function getForwards() {
          return _this2.forwards;
        },
        config: this.initializerContext.config.get(),
        dashboardConfig: (0, _dashboard_config.getDashboardConfig)(!application.capabilities.dashboard.showWriteControls)
      };
    }
  }]);

  return KibanaLegacyPlugin;
}();

exports.KibanaLegacyPlugin = KibanaLegacyPlugin;
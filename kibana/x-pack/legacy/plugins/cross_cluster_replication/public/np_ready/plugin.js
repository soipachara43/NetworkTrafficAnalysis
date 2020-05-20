"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrossClusterReplicationUIPlugin = void 0;

var _api = require("./app/services/api");

var _breadcrumbs = require("./app/services/breadcrumbs");

var _documentation_links = require("./app/services/documentation_links");

var _notifications = require("./app/services/notifications");

var _extend_index_management = require("./extend_index_management");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CrossClusterReplicationUIPlugin =
/*#__PURE__*/
function () {
  // @ts-ignore
  function CrossClusterReplicationUIPlugin(ctx) {
    _classCallCheck(this, CrossClusterReplicationUIPlugin);

    this.ctx = ctx;
  }

  _createClass(CrossClusterReplicationUIPlugin, [{
    key: "setup",
    value: function setup(_ref, deps) {
      var http = _ref.http,
          notifications = _ref.notifications,
          fatalErrors = _ref.fatalErrors;
      (0, _api.setHttpClient)(http);
      (0, _breadcrumbs.setBreadcrumbSetter)(deps);
      (0, _documentation_links.setDocLinks)(deps.__LEGACY.docLinks);
      (0, _notifications.setNotifications)(notifications, fatalErrors);
      (0, _extend_index_management.extendIndexManagement)(deps.indexManagement);
    }
  }, {
    key: "start",
    value: function start() {}
  }]);

  return CrossClusterReplicationUIPlugin;
}();

exports.CrossClusterReplicationUIPlugin = CrossClusterReplicationUIPlugin;
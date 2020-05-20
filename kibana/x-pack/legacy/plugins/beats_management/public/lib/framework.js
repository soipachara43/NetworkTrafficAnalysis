"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrameworkLib = void 0;

var _lodash = require("lodash");

var _security = require("../../common/constants/security");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FrameworkLib =
/*#__PURE__*/
function () {
  function FrameworkLib(adapter) {
    _classCallCheck(this, FrameworkLib);

    this.adapter = adapter;

    _defineProperty(this, "waitUntilFrameworkReady", this.adapter.waitUntilFrameworkReady.bind(this.adapter));

    _defineProperty(this, "renderUIAtPath", this.adapter.renderUIAtPath.bind(this.adapter));

    _defineProperty(this, "registerManagementSection", this.adapter.registerManagementSection.bind(this.adapter));

    _defineProperty(this, "registerManagementUI", this.adapter.registerManagementUI.bind(this.adapter));
  }

  _createClass(FrameworkLib, [{
    key: "licenseIsAtLeast",
    value: function licenseIsAtLeast(type) {
      return _security.LICENSES.indexOf((0, _lodash.get)(this.adapter.info, 'license.type', 'oss')) >= _security.LICENSES.indexOf(type);
    }
  }, {
    key: "versionGreaterThen",
    value: function versionGreaterThen(version) {
      var pa = this.adapter.version.split('.');
      var pb = version.split('.');

      for (var i = 0; i < 3; i++) {
        var na = Number(pa[i]);
        var nb = Number(pb[i]); // version is greater

        if (na > nb) {
          return true;
        } // version is less then


        if (nb > na) {
          return false;
        }

        if (!isNaN(na) && isNaN(nb)) {
          return true;
        }

        if (isNaN(na) && !isNaN(nb)) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "currentUserHasOneOfRoles",
    value: function currentUserHasOneOfRoles(roles) {
      // If the user has at least one of the roles requested, the returnd difference will be less
      // then the orig array size. difference only compares based on the left side arg
      return (0, _lodash.difference)(roles, (0, _lodash.get)(this.currentUser, 'roles', [])).length < roles.length;
    }
  }, {
    key: "currentUser",
    get: function get() {
      return this.adapter.currentUser;
    }
  }, {
    key: "info",
    get: function get() {
      return this.adapter.info;
    }
  }]);

  return FrameworkLib;
}();

exports.FrameworkLib = FrameworkLib;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaServices = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var KibanaServices =
/*#__PURE__*/
function () {
  function KibanaServices() {
    _classCallCheck(this, KibanaServices);
  }

  _createClass(KibanaServices, null, [{
    key: "init",
    value: function init(_ref) {
      var http = _ref.http,
          uiSettings = _ref.uiSettings;
      this.services = {
        http: http,
        uiSettings: uiSettings
      };
    }
  }, {
    key: "get",
    value: function get() {
      if (!this.services) {
        throw new Error('Kibana services not set - are you trying to import this module from outside of the SIEM app?');
      }

      return this.services;
    }
  }]);

  return KibanaServices;
}();

exports.KibanaServices = KibanaServices;

_defineProperty(KibanaServices, "services", void 0);
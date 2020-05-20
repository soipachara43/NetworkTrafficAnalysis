"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Configuration: true
};
Object.defineProperty(exports, "Configuration", {
  enumerable: true,
  get: function () {
    return _server.ConfigType;
  }
});

var _server = require("../../../../../plugins/siem/server");

var _hosts = require("./hosts");

Object.keys(_hosts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hosts[key];
    }
  });
});
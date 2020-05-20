"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _saved_dashboard_references = require("./saved_dashboard_references");

Object.keys(_saved_dashboard_references).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _saved_dashboard_references[key];
    }
  });
});

var _saved_dashboard = require("./saved_dashboard");

Object.keys(_saved_dashboard).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _saved_dashboard[key];
    }
  });
});

var _saved_dashboards = require("./saved_dashboards");

Object.keys(_saved_dashboards).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _saved_dashboards[key];
    }
  });
});
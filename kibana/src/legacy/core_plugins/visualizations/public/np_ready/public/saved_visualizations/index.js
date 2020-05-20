"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _saved_visualizations = require("./saved_visualizations");

Object.keys(_saved_visualizations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _saved_visualizations[key];
    }
  });
});
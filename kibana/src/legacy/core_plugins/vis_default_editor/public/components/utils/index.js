"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _editor_config = require("./editor_config");

Object.keys(_editor_config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _editor_config[key];
    }
  });
});
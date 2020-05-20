"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _native_renderer = require("./native_renderer");

Object.keys(_native_renderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _native_renderer[key];
    }
  });
});
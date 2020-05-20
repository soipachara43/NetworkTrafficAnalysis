"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _editor_frame = require("./editor_frame");

Object.keys(_editor_frame).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _editor_frame[key];
    }
  });
});
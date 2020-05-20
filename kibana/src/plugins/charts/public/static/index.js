"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color_maps = require("./color_maps");

Object.keys(_color_maps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _color_maps[key];
    }
  });
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _factory = require("./factory");

Object.keys(_factory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _factory[key];
    }
  });
});
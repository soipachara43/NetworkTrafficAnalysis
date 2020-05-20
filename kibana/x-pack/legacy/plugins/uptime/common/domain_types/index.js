"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _monitors = require("./monitors");

Object.keys(_monitors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _monitors[key];
    }
  });
});
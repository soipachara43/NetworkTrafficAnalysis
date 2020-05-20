"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _triggers = require("./triggers");

Object.keys(_triggers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _triggers[key];
    }
  });
});
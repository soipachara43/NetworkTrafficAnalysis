"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ping_list = require("./ping_list");

Object.keys(_ping_list).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ping_list[key];
    }
  });
});
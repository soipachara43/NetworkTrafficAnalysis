"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _histogram = require("./ping/histogram");

Object.keys(_histogram).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _histogram[key];
    }
  });
});
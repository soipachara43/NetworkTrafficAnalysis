"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require("./server/");

Object.keys(_server).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _server[key];
    }
  });
});
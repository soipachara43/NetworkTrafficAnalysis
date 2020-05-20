"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _details = require("./details");

Object.keys(_details).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _details[key];
    }
  });
});

var _locations = require("./locations");

Object.keys(_locations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _locations[key];
    }
  });
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("whatwg-fetch");

require("babel-polyfill");

var _shareable = require("./shareable");

Object.keys(_shareable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _shareable[key];
    }
  });
});
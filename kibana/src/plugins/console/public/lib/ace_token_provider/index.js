"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _token_provider = require("./token_provider");

Object.keys(_token_provider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _token_provider[key];
    }
  });
});
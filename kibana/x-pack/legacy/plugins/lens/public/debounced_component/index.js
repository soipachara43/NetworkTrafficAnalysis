"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debounced_component = require("./debounced_component");

Object.keys(_debounced_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _debounced_component[key];
    }
  });
});
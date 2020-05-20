"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _saved_object_store = require("./saved_object_store");

Object.keys(_saved_object_store).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _saved_object_store[key];
    }
  });
});
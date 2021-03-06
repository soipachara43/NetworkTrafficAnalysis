"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _legacy_core_editor = require("./legacy_core_editor/legacy_core_editor");

Object.keys(_legacy_core_editor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _legacy_core_editor[key];
    }
  });
});

var _sense_editor = require("./sense_editor");

Object.keys(_sense_editor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sense_editor[key];
    }
  });
});
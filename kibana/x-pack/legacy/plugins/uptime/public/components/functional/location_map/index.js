"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _location_map = require("./location_map");

Object.keys(_location_map).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _location_map[key];
    }
  });
});

var _location_status_tags = require("./location_status_tags");

Object.keys(_location_status_tags).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _location_status_tags[key];
    }
  });
});
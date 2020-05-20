"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _embeddable_panel = require("./embeddable_panel");

Object.keys(_embeddable_panel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _embeddable_panel[key];
    }
  });
});

var _panel_header = require("./panel_header");

Object.keys(_panel_header).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _panel_header[key];
    }
  });
});
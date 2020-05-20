"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _panel_actions = require("./panel_actions");

Object.keys(_panel_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _panel_actions[key];
    }
  });
});
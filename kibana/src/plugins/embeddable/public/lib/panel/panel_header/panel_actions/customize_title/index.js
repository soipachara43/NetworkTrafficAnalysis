"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _customize_panel_action = require("./customize_panel_action");

Object.keys(_customize_panel_action).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _customize_panel_action[key];
    }
  });
});
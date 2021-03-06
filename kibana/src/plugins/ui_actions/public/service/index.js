"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ui_actions_service = require("./ui_actions_service");

Object.keys(_ui_actions_service).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ui_actions_service[key];
    }
  });
});
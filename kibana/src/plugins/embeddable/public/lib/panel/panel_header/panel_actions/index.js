"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inspect_panel_action = require("./inspect_panel_action");

Object.keys(_inspect_panel_action).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _inspect_panel_action[key];
    }
  });
});

var _add_panel = require("./add_panel");

Object.keys(_add_panel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _add_panel[key];
    }
  });
});

var _remove_panel_action = require("./remove_panel_action");

Object.keys(_remove_panel_action).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _remove_panel_action[key];
    }
  });
});

var _customize_title = require("./customize_title");

Object.keys(_customize_title).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _customize_title[key];
    }
  });
});
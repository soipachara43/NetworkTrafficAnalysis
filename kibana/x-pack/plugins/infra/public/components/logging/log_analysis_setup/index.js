"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setup_page = require("./setup_page");

Object.keys(_setup_page).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _setup_page[key];
    }
  });
});

var _initial_configuration_step = require("./initial_configuration_step");

Object.keys(_initial_configuration_step).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _initial_configuration_step[key];
    }
  });
});

var _process_step = require("./process_step");

Object.keys(_process_step).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _process_step[key];
    }
  });
});

var _missing_results_privileges_prompt = require("./missing_results_privileges_prompt");

Object.keys(_missing_results_privileges_prompt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _missing_results_privileges_prompt[key];
    }
  });
});

var _missing_setup_privileges_prompt = require("./missing_setup_privileges_prompt");

Object.keys(_missing_setup_privileges_prompt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _missing_setup_privileges_prompt[key];
    }
  });
});

var _ml_unavailable_prompt = require("./ml_unavailable_prompt");

Object.keys(_ml_unavailable_prompt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ml_unavailable_prompt[key];
    }
  });
});

var _setup_status_unknown_prompt = require("./setup_status_unknown_prompt");

Object.keys(_setup_status_unknown_prompt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _setup_status_unknown_prompt[key];
    }
  });
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authentications_table = require("./authentications_table");

Object.keys(_authentications_table).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _authentications_table[key];
    }
  });
});

var _hosts_table = require("./hosts_table");

Object.keys(_hosts_table).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hosts_table[key];
    }
  });
});

var _uncommon_process_table = require("./uncommon_process_table");

Object.keys(_uncommon_process_table).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _uncommon_process_table[key];
    }
  });
});

var _kpi_hosts = require("./kpi_hosts");

Object.keys(_kpi_hosts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _kpi_hosts[key];
    }
  });
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "registerTelemetryUsageCollector", {
  enumerable: true,
  get: function () {
    return _usage.registerTelemetryUsageCollector;
  }
});
Object.defineProperty(exports, "registerUiMetricUsageCollector", {
  enumerable: true,
  get: function () {
    return _ui_metric.registerUiMetricUsageCollector;
  }
});
Object.defineProperty(exports, "registerTelemetryPluginUsageCollector", {
  enumerable: true,
  get: function () {
    return _telemetry_plugin.registerTelemetryPluginUsageCollector;
  }
});
Object.defineProperty(exports, "registerManagementUsageCollector", {
  enumerable: true,
  get: function () {
    return _management.registerManagementUsageCollector;
  }
});
Object.defineProperty(exports, "registerApplicationUsageCollector", {
  enumerable: true,
  get: function () {
    return _application_usage.registerApplicationUsageCollector;
  }
});
Object.defineProperty(exports, "registerKibanaUsageCollector", {
  enumerable: true,
  get: function () {
    return _kibana.registerKibanaUsageCollector;
  }
});
Object.defineProperty(exports, "registerOpsStatsCollector", {
  enumerable: true,
  get: function () {
    return _ops_stats.registerOpsStatsCollector;
  }
});

var _usage = require("./usage");

var _ui_metric = require("./ui_metric");

var _telemetry_plugin = require("./telemetry_plugin");

var _management = require("./management");

var _application_usage = require("./application_usage");

var _kibana = require("./kibana");

var _ops_stats = require("./ops_stats");
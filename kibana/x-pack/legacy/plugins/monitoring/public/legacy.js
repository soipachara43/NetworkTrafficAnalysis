"use strict";

require("plugins/monitoring/filters");

require("plugins/monitoring/services/clusters");

require("plugins/monitoring/services/features");

require("plugins/monitoring/services/executor");

require("plugins/monitoring/services/license");

require("plugins/monitoring/services/title");

require("plugins/monitoring/services/breadcrumbs");

require("plugins/monitoring/directives/all");

require("plugins/monitoring/views/all");

var _legacy_imports = require("../public/np_imports/legacy_imports");

var _np_ready = require("./np_ready");

var _local_application_service = require("../../../../../src/legacy/core_plugins/kibana/public/local_application_service");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pluginInstance = (0, _np_ready.plugin)({});
pluginInstance.setup(_legacy_imports.npSetup.core, _legacy_imports.npSetup.plugins);
pluginInstance.start(_legacy_imports.npStart.core, _objectSpread({}, _legacy_imports.npStart.plugins, {
  __LEGACY: {
    localApplicationService: _local_application_service.localApplicationService
  }
}));
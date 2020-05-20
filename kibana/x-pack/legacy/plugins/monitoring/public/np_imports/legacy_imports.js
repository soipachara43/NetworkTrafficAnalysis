"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "npSetup", {
  enumerable: true,
  get: function get() {
    return _new_platform.npSetup;
  }
});
Object.defineProperty(exports, "npStart", {
  enumerable: true,
  get: function get() {
    return _new_platform.npStart;
  }
});
Object.defineProperty(exports, "GlobalStateProvider", {
  enumerable: true,
  get: function get() {
    return _global_state.GlobalStateProvider;
  }
});
Object.defineProperty(exports, "StateManagementConfigProvider", {
  enumerable: true,
  get: function get() {
    return _config_provider.StateManagementConfigProvider;
  }
});
Object.defineProperty(exports, "AppStateProvider", {
  enumerable: true,
  get: function get() {
    return _app_state.AppStateProvider;
  }
});
Object.defineProperty(exports, "EventsProvider", {
  enumerable: true,
  get: function get() {
    return _events.EventsProvider;
  }
});
Object.defineProperty(exports, "KbnUrlProvider", {
  enumerable: true,
  get: function get() {
    return _url.KbnUrlProvider;
  }
});
Object.defineProperty(exports, "registerTimefilterWithGlobalStateFactory", {
  enumerable: true,
  get: function get() {
    return _setup_router.registerTimefilterWithGlobalStateFactory;
  }
});

var _new_platform = require("ui/new_platform");

var _global_state = require("ui/state_management/global_state");

var _config_provider = require("ui/state_management/config_provider");

var _app_state = require("ui/state_management/app_state");

var _events = require("ui/events");

var _url = require("ui/url");

var _setup_router = require("ui/timefilter/setup_router");
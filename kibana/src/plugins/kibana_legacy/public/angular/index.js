"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  PromiseServiceCreator: true,
  watchMultiDecorator: true,
  createTopNavDirective: true,
  createTopNavHelper: true,
  loadKbnTopNavDirectives: true,
  subscribeWithScope: true
};
Object.defineProperty(exports, "PromiseServiceCreator", {
  enumerable: true,
  get: function get() {
    return _promises.PromiseServiceCreator;
  }
});
Object.defineProperty(exports, "watchMultiDecorator", {
  enumerable: true,
  get: function get() {
    return _watch_multi.watchMultiDecorator;
  }
});
Object.defineProperty(exports, "createTopNavDirective", {
  enumerable: true,
  get: function get() {
    return _kbn_top_nav.createTopNavDirective;
  }
});
Object.defineProperty(exports, "createTopNavHelper", {
  enumerable: true,
  get: function get() {
    return _kbn_top_nav.createTopNavHelper;
  }
});
Object.defineProperty(exports, "loadKbnTopNavDirectives", {
  enumerable: true,
  get: function get() {
    return _kbn_top_nav.loadKbnTopNavDirectives;
  }
});
Object.defineProperty(exports, "subscribeWithScope", {
  enumerable: true,
  get: function get() {
    return _subscribe_with_scope.subscribeWithScope;
  }
});

var _promises = require("./promises");

var _watch_multi = require("./watch_multi");

var _angular_config = require("./angular_config");

Object.keys(_angular_config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _angular_config[key];
    }
  });
});

var _kbn_top_nav = require("./kbn_top_nav");

var _subscribe_with_scope = require("./subscribe_with_scope");
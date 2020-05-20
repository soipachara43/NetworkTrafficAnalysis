"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizationsPlugin = void 0;

var _saved_objects = require("./saved_objects");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class VisualizationsPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "logger", void 0);

    this.logger = initializerContext.logger.get();
  }

  setup(core) {
    this.logger.debug('visualizations: Setup');
    core.savedObjects.registerType(_saved_objects.visualizationSavedObjectType);
    return {};
  }

  start(core) {
    this.logger.debug('visualizations: Started');
    return {};
  }

  stop() {}

}

exports.VisualizationsPlugin = VisualizationsPlugin;
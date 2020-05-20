"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasSrcPlugin = void 0;

var _browser = require("./functions/browser");

var _expression_types = require("./expression_types");

var _renderers = require("./renderers");

var _elements = require("./elements");

var _transforms = require("./uis/transforms");

var _datasources = require("./uis/datasources");

var _models = require("./uis/models");

var _views = require("./uis/views");

var _arguments = require("./uis/arguments");

var _tags = require("./uis/tags");

var _templates = require("./templates");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore: untyped local
// @ts-ignore Untyped Local
// @ts-ignore Untyped Local
// @ts-ignore Untyped Local
// @ts-ignore Untyped Local
// @ts-ignore Untyped Local

/** @internal */
class CanvasSrcPlugin {
  setup(core, plugins) {
    plugins.canvas.addFunctions(_browser.functions);
    plugins.canvas.addTypes(_expression_types.typeFunctions);
    plugins.canvas.addRenderers(_renderers.renderFunctions);
    plugins.canvas.addElements(_elements.elementSpecs);
    plugins.canvas.addDatasourceUIs(_datasources.datasourceSpecs);
    plugins.canvas.addModelUIs(_models.modelSpecs);
    plugins.canvas.addViewUIs(_views.viewSpecs);
    plugins.canvas.addArgumentUIs(_arguments.args);
    plugins.canvas.addTagUIs(_tags.tagSpecs);
    plugins.canvas.addTemplates(_templates.templateSpecs);
    plugins.canvas.addTransformUIs(_transforms.transformSpecs);
    return {};
  }

  start(core, plugins) {
    return {};
  }

}

exports.CanvasSrcPlugin = CanvasSrcPlugin;
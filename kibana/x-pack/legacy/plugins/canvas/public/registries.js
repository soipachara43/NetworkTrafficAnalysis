"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRegistries = initRegistries;
exports.populateRegistries = populateRegistries;
exports.destroyRegistries = destroyRegistries;
exports.registries = void 0;

var _common = require("@kbn/interpreter/common");

var _elements_registry = require("./lib/elements_registry");

var _templates_registry = require("./lib/templates_registry");

var _tags_registry = require("./lib/tags_registry");

var _transitions_registry = require("./lib/transitions_registry");

var _expression_types = require("./expression_types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped module
// @ts-ignore untyped local
// @ts-ignore untyped local
// @ts-ignore untyped local
var registries = {};
exports.registries = registries;

function initRegistries() {
  (0, _common.addRegistries)(registries, {
    elements: _elements_registry.elementsRegistry,
    transformUIs: _expression_types.transformRegistry,
    datasourceUIs: _expression_types.datasourceRegistry,
    modelUIs: _expression_types.modelRegistry,
    viewUIs: _expression_types.viewRegistry,
    argumentUIs: _expression_types.argTypeRegistry,
    templates: _templates_registry.templatesRegistry,
    tagUIs: _tags_registry.tagsRegistry,
    transitions: _transitions_registry.transitionsRegistry
  });
}

function populateRegistries(setupRegistries) {
  (0, _common.register)(registries, setupRegistries);
}

function destroyRegistries() {
  exports.registries = registries = {};
}
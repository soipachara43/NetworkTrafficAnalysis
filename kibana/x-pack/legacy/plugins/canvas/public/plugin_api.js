"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPluginApi = getPluginApi;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getPluginApi(expressionsPluginSetup) {
  var registries = {
    elements: [],
    transformUIs: [],
    datasourceUIs: [],
    modelUIs: [],
    viewUIs: [],
    argumentUIs: [],
    templates: [],
    tagUIs: [],
    transitions: []
  };
  var api = {
    // Functions, types and renderers are registered directly to expression plugin
    addFunctions: function addFunctions(fns) {
      fns.forEach(function (fn) {
        expressionsPluginSetup.registerFunction(fn);
      });
    },
    addTypes: function addTypes(types) {
      types.forEach(function (type) {
        expressionsPluginSetup.registerType(type);
      });
    },
    addRenderers: function addRenderers(renderers) {
      renderers.forEach(function (r) {
        expressionsPluginSetup.registerRenderer(r);
      });
    },
    // All these others are local to canvas, and they will only register on start
    addElements: function addElements(elements) {
      var _registries$elements;

      return (_registries$elements = registries.elements).push.apply(_registries$elements, _toConsumableArray(elements));
    },
    addTransformUIs: function addTransformUIs(transforms) {
      var _registries$transform;

      return (_registries$transform = registries.transformUIs).push.apply(_registries$transform, _toConsumableArray(transforms));
    },
    addDatasourceUIs: function addDatasourceUIs(datasources) {
      var _registries$datasourc;

      return (_registries$datasourc = registries.datasourceUIs).push.apply(_registries$datasourc, _toConsumableArray(datasources));
    },
    addModelUIs: function addModelUIs(models) {
      var _registries$modelUIs;

      return (_registries$modelUIs = registries.modelUIs).push.apply(_registries$modelUIs, _toConsumableArray(models));
    },
    addViewUIs: function addViewUIs(views) {
      var _registries$viewUIs;

      return (_registries$viewUIs = registries.viewUIs).push.apply(_registries$viewUIs, _toConsumableArray(views));
    },
    addArgumentUIs: function addArgumentUIs(args) {
      var _registries$argumentU;

      return (_registries$argumentU = registries.argumentUIs).push.apply(_registries$argumentU, _toConsumableArray(args));
    },
    addTemplates: function addTemplates(templates) {
      var _registries$templates;

      return (_registries$templates = registries.templates).push.apply(_registries$templates, _toConsumableArray(templates));
    },
    addTagUIs: function addTagUIs(tags) {
      var _registries$tagUIs;

      return (_registries$tagUIs = registries.tagUIs).push.apply(_registries$tagUIs, _toConsumableArray(tags));
    },
    addTransitions: function addTransitions(transitions) {
      var _registries$transitio;

      return (_registries$transitio = registries.transitions).push.apply(_registries$transitio, _toConsumableArray(transitions));
    }
  };
  return {
    api: api,
    registries: registries
  };
}
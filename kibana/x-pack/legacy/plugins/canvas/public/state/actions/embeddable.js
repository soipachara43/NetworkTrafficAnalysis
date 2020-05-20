"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchEmbeddableRenderable = exports.updateEmbeddableExpression = exports.UpdateEmbeddableExpressionActionType = void 0;

var _reduxActions = require("redux-actions");

var _reduxThunks = require("redux-thunks");

var _elements = require("./elements");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore Untyped
// @ts-ignore Untyped Local
var UpdateEmbeddableExpressionActionType = 'updateEmbeddableExpression';
exports.UpdateEmbeddableExpressionActionType = UpdateEmbeddableExpressionActionType;
var updateEmbeddableExpression = (0, _reduxActions.createAction)(UpdateEmbeddableExpressionActionType);
exports.updateEmbeddableExpression = updateEmbeddableExpression;
var fetchEmbeddableRenderable = (0, _reduxThunks.createThunk)('fetchEmbeddableRenderable', function (_ref, elementId) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  var pageWithElement = getState().persistent.workpad.pages.find(function (page) {
    return page.elements.find(function (element) {
      return element.id === elementId;
    }) !== undefined;
  });

  if (pageWithElement) {
    var element = pageWithElement.elements.find(function (el) {
      return el.id === elementId;
    });
    dispatch((0, _elements.fetchRenderable)(element));
  }
});
exports.fetchEmbeddableRenderable = fetchEmbeddableRenderable;
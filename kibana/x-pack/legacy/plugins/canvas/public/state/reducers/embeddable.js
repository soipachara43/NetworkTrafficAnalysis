"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.embeddableReducer = void 0;

var _common = require("@kbn/interpreter/common");

var _reduxActions = require("redux-actions");

var _embeddable = require("../actions/embeddable");

var _elements = require("./elements");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var embeddableReducer = (0, _reduxActions.handleActions)(_defineProperty({}, _embeddable.UpdateEmbeddableExpressionActionType, function (workpadState, _ref) {
  var payload = _ref.payload;

  if (!payload) {
    return workpadState;
  }

  var elementId = payload.elementId,
      embeddableExpression = payload.embeddableExpression; // Find the element

  var pageWithElement = workpadState.pages.find(function (page) {
    return page.elements.find(function (element) {
      return element.id === elementId;
    }) !== undefined;
  });

  if (!pageWithElement) {
    return workpadState;
  }

  var element = pageWithElement.elements.find(function (elem) {
    return elem.id === elementId;
  });

  if (!element) {
    return workpadState;
  }

  var existingAst = (0, _common.fromExpression)(element.expression);
  var newAst = (0, _common.fromExpression)(embeddableExpression);
  var searchForFunction = newAst.chain[0].function; // Find the first matching function in the existing ASt

  var existingAstFunction = existingAst.chain.find(function (f) {
    return f.function === searchForFunction;
  });

  if (!existingAstFunction) {
    return workpadState;
  }

  existingAstFunction.arguments = newAst.chain[0].arguments;
  var updatedExpression = (0, _common.toExpression)(existingAst);
  return (0, _elements.assignNodeProperties)(workpadState, pageWithElement.id, elementId, {
    expression: updatedExpression
  });
}), {});
exports.embeddableReducer = embeddableReducer;
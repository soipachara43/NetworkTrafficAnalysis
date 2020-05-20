"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFunctionReferenceStr = getFunctionReferenceStr;
exports.getArgReferenceStr = getArgReferenceStr;

var _i18n = require("../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.ComponentStrings.ExpressionInput;
/**
 * Given an expression function, this function returns a markdown string
 * that includes the context the function accepts, what the function returns
 * as well as the general help/documentation text associated with the function
 */

function getFunctionReferenceStr(fnDef) {
  var help = fnDef.help,
      type = fnDef.type,
      inputTypes = fnDef.inputTypes;
  var acceptTypes = inputTypes ? inputTypes.join(' | ') : 'null';
  var returnType = type ? type : 'null';
  var doc = "".concat(strings.getFunctionReferenceAcceptsDetail(acceptTypes), " ").concat(strings.getFunctionReferenceReturnsDetail(returnType), "\n\n\n").concat(help);
  return doc;
}
/**
 * Given an argument definition, this function returns a markdown string
 * that includes the aliases of the argument, types accepted for the argument,
 * the default value of the argument, whether or not its required, and
 * the general help/documentation text associated with the argument
 */


function getArgReferenceStr(argDef) {
  var aliases = argDef.aliases,
      types = argDef.types,
      def = argDef.default,
      required = argDef.required,
      help = argDef.help;
  var secondLineArr = [];

  if (def != null) {
    secondLineArr.push(strings.getArgReferenceDefaultDetail(String(def)));
  }

  if (aliases && aliases.length) {
    secondLineArr.push(strings.getArgReferenceAliasesDetail(aliases.join(' | ')));
  }

  var typesStr = types && types.length ? types.join(' | ') : 'null';
  var requiredStr = String(Boolean(required));
  var ref = "".concat(strings.getArgReferenceTypesDetail(typesStr), " ").concat(strings.getArgReferenceRequiredDetail(requiredStr), "\n  \n\n").concat(secondLineArr.join(' '), "\n  \n\n").concat(help);
  return ref;
}
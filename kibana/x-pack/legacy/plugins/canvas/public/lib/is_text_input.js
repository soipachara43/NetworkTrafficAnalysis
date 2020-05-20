"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTextInput = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// input types that aren't variations of text input
var nonTextInputs = ['button', 'checkbox', 'color', 'file', 'image', 'radio', 'range', 'reset', 'submit'];

var isTextInput = function isTextInput(_ref) {
  var tagName = _ref.tagName,
      type = _ref.type;

  switch (tagName.toLowerCase()) {
    case 'input':
      return !nonTextInputs.includes(type);

    case 'textarea':
      return true;

    default:
      return false;
  }
};

exports.isTextInput = isTextInput;
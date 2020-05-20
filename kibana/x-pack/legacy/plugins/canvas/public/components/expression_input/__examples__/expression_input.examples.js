"use strict";

var _addonActions = require("@storybook/addon-actions");

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _monaco = require("@kbn/ui-shared-deps/monaco");

var _expression_input = require("../expression_input");

var _monaco_language_def = require("../../../lib/monaco_language_def");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var sampleFunctionDef = {
  name: 'markdown',
  type: 'render',
  aliases: [],
  help: 'Adds an element that renders Markdown text. TIP: Use the `markdown` function for single numbers, metrics, and paragraphs of text.',
  args: {
    content: {
      name: 'content',
      required: false,
      help: 'A string of text that contains Markdown. To concatenate, pass the `string` function multiple times.',
      types: ['string'],
      default: '""',
      aliases: ['_', 'expression'],
      multi: true,
      resolve: false,
      options: []
    },
    font: {
      name: 'font',
      required: false,
      help: 'The CSS font properties for the content. For example, font-family or font-weight.',
      types: ['style'],
      default: '{font}',
      aliases: [],
      multi: false,
      resolve: true,
      options: []
    }
  },
  context: {
    types: ['datatable', 'null']
  },
  fn: function fn() {
    return true;
  }
};
_monaco_language_def.language.keywords = [sampleFunctionDef.name];

_monaco.monaco.languages.register({
  id: _monaco_language_def.LANGUAGE_ID
});

_monaco.monaco.languages.setMonarchTokensProvider(_monaco_language_def.LANGUAGE_ID, _monaco_language_def.language);

(0, _react.storiesOf)('components/ExpressionInput', module).add('default', function () {
  return _react2.default.createElement(_expression_input.ExpressionInput, {
    value: "markdown",
    isCompact: true,
    onChange: (0, _addonActions.action)('onChange'),
    functionDefinitions: [sampleFunctionDef]
  });
});
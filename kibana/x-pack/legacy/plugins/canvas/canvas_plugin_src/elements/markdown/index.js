"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markdown = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const markdown = () => ({
  name: 'markdown',
  displayName: 'Markdown',
  tags: ['text'],
  help: 'Markup from Markdown',
  image: _header.default,
  expression: `filters
| demodata
| markdown "### Welcome to the Markdown element

Good news! You're already connected to some demo data!

The data table contains
**{{rows.length}} rows**, each containing
 the following columns:
{{#each columns}}
 **{{name}}**
{{/each}}

You can use standard Markdown in here, but you can also access your piped-in data using Handlebars. If you want to know more, check out the [Handlebars documentation](https://handlebarsjs.com/guide/expressions.html).

#### Enjoy!" | render`
});

exports.markdown = markdown;
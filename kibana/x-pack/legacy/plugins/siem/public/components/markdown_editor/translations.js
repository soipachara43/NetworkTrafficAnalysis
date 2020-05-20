"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PREVIEW = exports.MARKDOWN = exports.MARKDOWN_SYNTAX_HELP = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MARKDOWN_SYNTAX_HELP = _i18n.i18n.translate('xpack.siem.markdownEditor.markdownInputHelp', {
  defaultMessage: 'Markdown syntax help'
});

exports.MARKDOWN_SYNTAX_HELP = MARKDOWN_SYNTAX_HELP;

var MARKDOWN = _i18n.i18n.translate('xpack.siem.markdownEditor.markdown', {
  defaultMessage: 'Markdown'
});

exports.MARKDOWN = MARKDOWN;

var PREVIEW = _i18n.i18n.translate('xpack.siem.markdownEditor.preview', {
  defaultMessage: 'Preview'
});

exports.PREVIEW = PREVIEW;
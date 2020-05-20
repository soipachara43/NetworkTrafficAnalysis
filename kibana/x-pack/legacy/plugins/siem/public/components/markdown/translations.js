"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MARKDOWN_HINT_IMAGE_URL = exports.MARKDOWN_HINT_STRIKETHROUGH = exports.MARKDOWN_HINT_QUOTE = exports.MARKDOWN_HINT_PREFORMATTED = exports.MARKDOWN_HINT_BULLET = exports.MARKDOWN_HINT_URL = exports.MARKDOWN_HINT_CODE = exports.MARKDOWN_HINT_ITALICS = exports.MARKDOWN_HINT_BOLD = exports.MARKDOWN_HINT_HEADING = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MARKDOWN_HINT_HEADING = _i18n.i18n.translate('xpack.siem.markdown.hint.headingLabel', {
  defaultMessage: '# heading'
});

exports.MARKDOWN_HINT_HEADING = MARKDOWN_HINT_HEADING;

var MARKDOWN_HINT_BOLD = _i18n.i18n.translate('xpack.siem.markdown.hint.boldLabel', {
  defaultMessage: '**bold**'
});

exports.MARKDOWN_HINT_BOLD = MARKDOWN_HINT_BOLD;

var MARKDOWN_HINT_ITALICS = _i18n.i18n.translate('xpack.siem.markdown.hint.italicsLabel', {
  defaultMessage: '_italics_'
});

exports.MARKDOWN_HINT_ITALICS = MARKDOWN_HINT_ITALICS;

var MARKDOWN_HINT_CODE = _i18n.i18n.translate('xpack.siem.markdown.hint.codeLabel', {
  defaultMessage: '`code`'
});

exports.MARKDOWN_HINT_CODE = MARKDOWN_HINT_CODE;

var MARKDOWN_HINT_URL = _i18n.i18n.translate('xpack.siem.markdown.hint.urlLabel', {
  defaultMessage: '[link](url)'
});

exports.MARKDOWN_HINT_URL = MARKDOWN_HINT_URL;

var MARKDOWN_HINT_BULLET = _i18n.i18n.translate('xpack.siem.markdown.hint.bulletLabel', {
  defaultMessage: '* bullet'
});

exports.MARKDOWN_HINT_BULLET = MARKDOWN_HINT_BULLET;

var MARKDOWN_HINT_PREFORMATTED = _i18n.i18n.translate('xpack.siem.markdown.hint.preformattedLabel', {
  defaultMessage: '```preformatted```'
});

exports.MARKDOWN_HINT_PREFORMATTED = MARKDOWN_HINT_PREFORMATTED;

var MARKDOWN_HINT_QUOTE = _i18n.i18n.translate('xpack.siem.markdown.hint.quoteLabel', {
  defaultMessage: '>quote'
});

exports.MARKDOWN_HINT_QUOTE = MARKDOWN_HINT_QUOTE;

var MARKDOWN_HINT_STRIKETHROUGH = _i18n.i18n.translate('xpack.siem.markdown.hint.strikethroughLabel', {
  defaultMessage: 'strikethrough'
});

exports.MARKDOWN_HINT_STRIKETHROUGH = MARKDOWN_HINT_STRIKETHROUGH;

var MARKDOWN_HINT_IMAGE_URL = _i18n.i18n.translate('xpack.siem.markdown.hint.imageUrlLabel', {
  defaultMessage: '![image](url)'
});

exports.MARKDOWN_HINT_IMAGE_URL = MARKDOWN_HINT_IMAGE_URL;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsLink = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** prevents links to the new pages from accessing `window.opener` */
var REL_NOOPENER = 'noopener';
/** prevents search engine manipulation by noting the linked document is not trusted or endorsed by us */

var REL_NOFOLLOW = 'nofollow';
/** prevents the browser from sending the current address as referrer via the Referer HTTP header */

var REL_NOREFERRER = 'noreferrer';
/** A hyperlink to a (presumed to be external) news site */

var NewsLink = function NewsLink(_ref) {
  var href = _ref.href,
      children = _ref.children;
  return _react.default.createElement(_eui.EuiLink, {
    href: href,
    rel: "".concat(REL_NOOPENER, " ").concat(REL_NOFOLLOW, " ").concat(REL_NOREFERRER),
    target: "_blank"
  }, children);
};

exports.NewsLink = NewsLink;
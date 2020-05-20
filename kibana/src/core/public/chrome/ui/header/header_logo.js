"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderLogo = HeaderLogo;

var _url = _interopRequireDefault(require("url"));

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function findClosestAnchor(element) {
  var current = element;

  while (current) {
    if (current.tagName === 'A') {
      return current;
    }

    if (!current.parentElement || current.parentElement === document.body) {
      return undefined;
    }

    current = current.parentElement;
  }
}

function _onClick(event, forceNavigation, navLinks) {
  var anchor = findClosestAnchor(event.nativeEvent.target);

  if (!anchor) {
    return;
  }

  var navLink = navLinks.find(function (item) {
    return item.href === anchor.href;
  });

  if (navLink && navLink.isDisabled) {
    event.preventDefault();
    return;
  }

  if (!forceNavigation || event.isDefaultPrevented() || event.altKey || event.metaKey || event.ctrlKey) {
    return;
  }

  var toParsed = _url.default.parse(anchor.href);

  var fromParsed = _url.default.parse(document.location.href);

  var sameProto = toParsed.protocol === fromParsed.protocol;
  var sameHost = toParsed.host === fromParsed.host;
  var samePath = toParsed.path === fromParsed.path;

  if (sameProto && sameHost && samePath) {
    if (toParsed.hash) {
      document.location.reload();
    } // event.preventDefault() keeps the browser from seeing the new url as an update
    // and even setting window.location does not mimic that behavior, so instead
    // we use stopPropagation() to prevent angular from seeing the click and
    // starting a digest cycle/attempting to handle it in the router.


    event.stopPropagation();
  }
}

function HeaderLogo(_ref) {
  var href = _ref.href,
      forceNavigation = _ref.forceNavigation,
      navLinks = _ref.navLinks;
  return _react.default.createElement(_eui.EuiHeaderLogo, {
    "data-test-subj": "logo",
    iconType: "logoKibana",
    onClick: function onClick(e) {
      return _onClick(e, forceNavigation, navLinks);
    },
    href: href,
    "aria-label": _i18n.i18n.translate('core.ui.chrome.headerGlobalNav.goHomePageIconAriaLabel', {
      defaultMessage: 'Go to home page'
    })
  });
}
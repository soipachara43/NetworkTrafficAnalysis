"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.truncateRecentItemLabel = truncateRecentItemLabel;
exports.RecentLinks = RecentLinks;

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
// @ts-ignore
// Providing a buffer between the limit and the cut off index
// protects from truncating just the last couple (6) characters
var TRUNCATE_LIMIT = 64;
var TRUNCATE_AT = 58;

function truncateRecentItemLabel(label) {
  if (label.length > TRUNCATE_LIMIT) {
    label = "".concat(label.substring(0, TRUNCATE_AT), "\u2026");
  }

  return label;
}
/**
 * @param {string} url - a relative or root relative url.  If a relative path is given then the
 * absolute url returned will depend on the current page where this function is called from. For example
 * if you are on page "http://www.mysite.com/shopping/kids" and you pass this function "adults", you would get
 * back "http://www.mysite.com/shopping/adults".  If you passed this function a root relative path, or one that
 * starts with a "/", for example "/account/cart", you would get back "http://www.mysite.com/account/cart".
 * @return {string} the relative url transformed into an absolute url
 */


function relativeToAbsolute(url) {
  var a = document.createElement('a');
  a.setAttribute('href', url);
  return a.href;
}

function prepareForEUI(recentlyAccessed, navLinks, basePath) {
  return recentlyAccessed.map(function (_ref) {
    var link = _ref.link,
        label = _ref.label;
    var href = relativeToAbsolute(basePath.prepend(link));
    var navLink = navLinks.find(function (nl) {
      var _nl$baseUrl;

      return href.startsWith((_nl$baseUrl = nl.baseUrl) !== null && _nl$baseUrl !== void 0 ? _nl$baseUrl : nl.subUrlBase);
    });
    var titleAndAriaLabel = label;

    if (navLink) {
      titleAndAriaLabel = _i18n.i18n.translate('core.ui.recentLinks.linkItem.screenReaderLabel', {
        defaultMessage: '{recentlyAccessedItemLinklabel}, type: {pageType}',
        values: {
          recentlyAccessedItemLinklabel: label,
          pageType: navLink.title
        }
      });
    }

    return {
      href: href,
      label: truncateRecentItemLabel(label),
      title: titleAndAriaLabel,
      'aria-label': titleAndAriaLabel,
      iconType: navLink === null || navLink === void 0 ? void 0 : navLink.euiIconType
    };
  });
}

function RecentLinks(_ref2) {
  var recentlyAccessedItems = _ref2.recentlyAccessedItems,
      navLinks = _ref2.navLinks,
      basePath = _ref2.basePath;
  return _react.default.createElement(_eui.EuiNavDrawerGroup, {
    listItems: [{
      label: _i18n.i18n.translate('core.ui.chrome.sideGlobalNav.viewRecentItemsLabel', {
        defaultMessage: 'Recently viewed'
      }),
      iconType: 'recentlyViewedApp',
      isDisabled: recentlyAccessedItems.length === 0,
      flyoutMenu: {
        title: _i18n.i18n.translate('core.ui.chrome.sideGlobalNav.viewRecentItemsFlyoutTitle', {
          defaultMessage: 'Recent items'
        }),
        listItems: prepareForEUI(recentlyAccessedItems, navLinks, basePath)
      }
    }],
    "aria-label": _i18n.i18n.translate('core.ui.recentLinks.screenReaderLabel', {
      defaultMessage: 'Recently viewed links, navigation'
    })
  });
}
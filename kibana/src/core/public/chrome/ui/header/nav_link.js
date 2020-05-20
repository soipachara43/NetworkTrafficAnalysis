"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.euiNavLink = euiNavLink;

var _react = _interopRequireDefault(require("react"));

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
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function LinkIcon(_ref) {
  var url = _ref.url;
  return _react.default.createElement(_eui.EuiImage, {
    size: "s",
    alt: "",
    "aria-hidden": true,
    url: url
  });
}

function euiNavLink(navLink, legacyMode, currentAppId, basePath, navigateToApp) {
  var legacy = navLink.legacy,
      url = navLink.url,
      active = navLink.active,
      baseUrl = navLink.baseUrl,
      id = navLink.id,
      title = navLink.title,
      disabled = navLink.disabled,
      euiIconType = navLink.euiIconType,
      icon = navLink.icon,
      category = navLink.category,
      order = navLink.order,
      tooltip = navLink.tooltip;
  var href = navLink.baseUrl;

  if (legacy) {
    href = url && !active ? url : baseUrl;
  }

  return {
    category: category,
    key: id,
    label: tooltip !== null && tooltip !== void 0 ? tooltip : title,
    href: href,
    // Use href and onClick to support "open in new tab" and SPA navigation in the same link
    onClick: function onClick(event) {
      if (!legacyMode && // ignore when in legacy mode
      !legacy && // ignore links to legacy apps
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();
          navigateToApp(navLink.id);
        }
    },
    // Legacy apps use `active` property, NP apps should match the current app
    isActive: active || currentAppId === id,
    isDisabled: disabled,
    iconType: euiIconType,
    icon: !euiIconType && icon ? _react.default.createElement(LinkIcon, {
      url: basePath.prepend("/".concat(icon))
    }) : undefined,
    order: order,
    'data-test-subj': 'navDrawerAppsMenuLink'
  };
}
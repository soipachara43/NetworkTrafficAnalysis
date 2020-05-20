"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavDrawer = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _recent_links = require("./recent_links");

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
function navDrawerRenderer(_ref, ref) {
  var isLocked = _ref.isLocked,
      onIsLockedUpdate = _ref.onIsLockedUpdate,
      navLinks = _ref.navLinks,
      chromeNavLinks = _ref.chromeNavLinks,
      recentlyAccessedItems = _ref.recentlyAccessedItems,
      basePath = _ref.basePath;
  return _react.default.createElement(_eui.EuiNavDrawer, {
    ref: ref,
    "data-test-subj": "navDrawer",
    isLocked: isLocked,
    onIsLockedUpdate: onIsLockedUpdate,
    "aria-label": _i18n.i18n.translate('core.ui.primaryNav.screenReaderLabel', {
      defaultMessage: 'Primary'
    })
  }, (0, _recent_links.RecentLinks)({
    recentlyAccessedItems: recentlyAccessedItems,
    navLinks: chromeNavLinks,
    basePath: basePath
  }), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "none"
  }), _react.default.createElement(_eui.EuiNavDrawerGroup, {
    "data-test-subj": "navDrawerAppsMenu",
    listItems: navLinks,
    "aria-label": _i18n.i18n.translate('core.ui.primaryNavList.screenReaderLabel', {
      defaultMessage: 'Primary navigation links'
    })
  }));
}

var NavDrawer = _react.default.forwardRef(navDrawerRenderer);

exports.NavDrawer = NavDrawer;
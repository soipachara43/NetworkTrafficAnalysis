"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategoryName = getCategoryName;

var _i18n = require("@kbn/i18n");

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
var upperFirst = function upperFirst() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return str.replace(/^./, function (strng) {
    return strng.toUpperCase();
  });
};

var names = {
  general: _i18n.i18n.translate('advancedSettings.categoryNames.generalLabel', {
    defaultMessage: 'General'
  }),
  timelion: _i18n.i18n.translate('advancedSettings.categoryNames.timelionLabel', {
    defaultMessage: 'Timelion'
  }),
  notifications: _i18n.i18n.translate('advancedSettings.categoryNames.notificationsLabel', {
    defaultMessage: 'Notifications'
  }),
  visualizations: _i18n.i18n.translate('advancedSettings.categoryNames.visualizationsLabel', {
    defaultMessage: 'Visualizations'
  }),
  discover: _i18n.i18n.translate('advancedSettings.categoryNames.discoverLabel', {
    defaultMessage: 'Discover'
  }),
  dashboard: _i18n.i18n.translate('advancedSettings.categoryNames.dashboardLabel', {
    defaultMessage: 'Dashboard'
  }),
  reporting: _i18n.i18n.translate('advancedSettings.categoryNames.reportingLabel', {
    defaultMessage: 'Reporting'
  }),
  search: _i18n.i18n.translate('advancedSettings.categoryNames.searchLabel', {
    defaultMessage: 'Search'
  }),
  siem: _i18n.i18n.translate('advancedSettings.categoryNames.siemLabel', {
    defaultMessage: 'SIEM'
  })
};

function getCategoryName(category) {
  return category ? names[category] || upperFirst(category) : '';
}
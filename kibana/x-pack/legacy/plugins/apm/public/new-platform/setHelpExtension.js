"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHelpExtension = setHelpExtension;

var _url = _interopRequireDefault(require("url"));

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function setHelpExtension(_ref) {
  var chrome = _ref.chrome,
      http = _ref.http;
  chrome.setHelpExtension({
    appName: _i18n.i18n.translate('xpack.apm.feedbackMenu.appName', {
      defaultMessage: 'APM'
    }),
    links: [{
      linkType: 'discuss',
      href: 'https://discuss.elastic.co/c/apm'
    }, {
      linkType: 'custom',
      href: _url.default.format({
        pathname: http.basePath.prepend('/app/kibana'),
        hash: '/management/elasticsearch/upgrade_assistant'
      }),
      content: _i18n.i18n.translate('xpack.apm.helpMenu.upgradeAssistantLink', {
        defaultMessage: 'Upgrade assistant'
      })
    }]
  });
}
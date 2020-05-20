"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DISMISS_CALLOUT = exports.NO_API_INTEGRATION_KEY_CALLOUT_MSG = exports.NO_API_INTEGRATION_KEY_CALLOUT_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NO_API_INTEGRATION_KEY_CALLOUT_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.noApiIntegrationKeyCallOutTitle', {
  defaultMessage: 'API integration key required'
});

exports.NO_API_INTEGRATION_KEY_CALLOUT_TITLE = NO_API_INTEGRATION_KEY_CALLOUT_TITLE;

var NO_API_INTEGRATION_KEY_CALLOUT_MSG = _i18n.i18n.translate('xpack.siem.detectionEngine.noApiIntegrationKeyCallOutMsg', {
  defaultMessage: "A new encryption key is generated for saved objects each time you start Kibana. Without a persistent key, you cannot delete or modify rules after Kibana restarts. To set a persistent key, add the xpack.encryptedSavedObjects.encryptionKey setting with any text value of 32 or more characters to the kibana.yml file."
});

exports.NO_API_INTEGRATION_KEY_CALLOUT_MSG = NO_API_INTEGRATION_KEY_CALLOUT_MSG;

var DISMISS_CALLOUT = _i18n.i18n.translate('xpack.siem.detectionEngine.dismissNoApiIntegrationKeyButton', {
  defaultMessage: 'Dismiss'
});

exports.DISMISS_CALLOUT = DISMISS_CALLOUT;
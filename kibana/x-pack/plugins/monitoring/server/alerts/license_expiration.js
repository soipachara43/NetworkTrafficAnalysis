"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLicenseExpiration = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _constants = require("../../common/constants");

var _fetch_licenses = require("../lib/alerts/fetch_licenses");

var _fetch_default_email_address = require("../lib/alerts/fetch_default_email_address");

var _fetch_clusters = require("../lib/alerts/fetch_clusters");

var _fetch_available_ccs = require("../lib/alerts/fetch_available_ccs");

var _get_ccs_index_pattern = require("../lib/alerts/get_ccs_index_pattern");

var _license_expiration = require("../lib/alerts/license_expiration.lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const EXPIRES_DAYS = [60, 30, 14, 7];

const getLicenseExpiration = (getUiSettingsService, monitoringCluster, getLogger, ccsEnabled) => {
  async function getCallCluster(services) {
    if (!monitoringCluster) {
      return services.callCluster;
    }

    return monitoringCluster.callAsInternalUser;
  }

  const logger = getLogger(_constants.ALERT_TYPE_LICENSE_EXPIRATION);
  return {
    id: _constants.ALERT_TYPE_LICENSE_EXPIRATION,
    name: 'Monitoring Alert - License Expiration',
    actionGroups: [{
      id: 'default',
      name: _i18n.i18n.translate('xpack.monitoring.alerts.licenseExpiration.actionGroups.default', {
        defaultMessage: 'Default'
      })
    }],
    defaultActionGroupId: 'default',

    async executor({
      services,
      params,
      state
    }) {
      logger.debug(`Firing alert with params: ${JSON.stringify(params)} and state: ${JSON.stringify(state)}`);
      const callCluster = await getCallCluster(services); // Support CCS use cases by querying to find available remote clusters
      // and then adding those to the index pattern we are searching against

      let esIndexPattern = _constants.INDEX_PATTERN_ELASTICSEARCH;

      if (ccsEnabled) {
        const availableCcs = await (0, _fetch_available_ccs.fetchAvailableCcs)(callCluster);

        if (availableCcs.length > 0) {
          esIndexPattern = (0, _get_ccs_index_pattern.getCcsIndexPattern)(esIndexPattern, availableCcs);
        }
      }

      const clusters = await (0, _fetch_clusters.fetchClusters)(callCluster, esIndexPattern); // Fetch licensing information from cluster_stats documents

      const licenses = await (0, _fetch_licenses.fetchLicenses)(callCluster, clusters, esIndexPattern);

      if (licenses.length === 0) {
        logger.warn(`No license found for ${_constants.ALERT_TYPE_LICENSE_EXPIRATION}.`);
        return state;
      }

      const uiSettings = (await getUiSettingsService()).asScopedToClient(services.savedObjectsClient);
      const dateFormat = await uiSettings.get('dateFormat');
      const timezone = await uiSettings.get('dateFormat:tz');
      const emailAddress = await (0, _fetch_default_email_address.fetchDefaultEmailAddress)(uiSettings);

      if (!emailAddress) {
        // TODO: we can do more here
        logger.warn(`Unable to send email for ${_constants.ALERT_TYPE_LICENSE_EXPIRATION} because there is no email configured.`);
        return;
      }

      const result = { ...state
      };

      for (const license of licenses) {
        const licenseState = state[license.clusterUuid] || {};

        const $expiry = _momentTimezone.default.utc(license.expiryDateMS);

        let isExpired = false;
        let severity = 0;

        if (license.status !== 'active') {
          isExpired = true;
          severity = 2001;
        } else if (license.expiryDateMS) {
          for (let i = EXPIRES_DAYS.length - 1; i >= 0; i--) {
            if (license.type === 'trial' && i < 2) {
              break;
            }

            const $fromNow = _momentTimezone.default.utc().add(EXPIRES_DAYS[i], 'days');

            if ($fromNow.isAfter($expiry)) {
              isExpired = true;
              severity = 1000 * i;
              break;
            }
          }
        }

        const ui = (0, _lodash.get)(licenseState, 'ui', {
          isFiring: false,
          message: null,
          severity: 0,
          resolvedMS: 0,
          expirationTime: 0
        });
        let resolved = ui.resolvedMS;
        let message = ui.message;
        let expiredCheckDate = licenseState.expiredCheckDateMS;
        const instance = services.alertInstanceFactory(_constants.ALERT_TYPE_LICENSE_EXPIRATION);

        if (isExpired) {
          if (!licenseState.expiredCheckDateMS) {
            logger.debug(`License will expire soon, sending email`);
            (0, _license_expiration.executeActions)(instance, license, $expiry, dateFormat, emailAddress);
            expiredCheckDate = (0, _momentTimezone.default)().valueOf();
          }

          message = (0, _license_expiration.getUiMessage)(license, timezone);
          resolved = 0;
        } else if (!isExpired && licenseState.expiredCheckDateMS) {
          logger.debug(`License expiration has been resolved, sending email`);
          (0, _license_expiration.executeActions)(instance, license, $expiry, dateFormat, emailAddress, true);
          expiredCheckDate = 0;
          message = (0, _license_expiration.getUiMessage)(license, timezone, true);
          resolved = (0, _momentTimezone.default)().valueOf();
        }

        result[license.clusterUuid] = {
          expiredCheckDateMS: expiredCheckDate,
          ui: {
            message,
            expirationTime: license.expiryDateMS,
            isFiring: expiredCheckDate > 0,
            severity,
            resolvedMS: resolved
          }
        };
      }

      return result;
    }

  };
};

exports.getLicenseExpiration = getLicenseExpiration;
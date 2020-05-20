"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMonitoringError = formatMonitoringError;
exports.ajaxErrorHandlersProvider = ajaxErrorHandlersProvider;

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _notify = require("ui/notify");

var _public = require("../../../../../../src/plugins/kibana_legacy/public");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _public2 = require("../../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// eslint-disable-line import/order
function formatMonitoringError(err) {
  // TODO: We should stop using Boom for errors and instead write a custom handler to return richer error objects
  // then we can do better messages, such as highlighting the Cluster UUID instead of requiring it be part of the message
  if (err.status && err.status !== -1 && err.data) {
    return _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, err.data.message), _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.monitoring.ajaxErrorHandler.httpErrorMessage",
      defaultMessage: "HTTP {errStatus}",
      values: {
        errStatus: err.status
      }
    })));
  }

  return (0, _public.formatMsg)(err);
}

function ajaxErrorHandlersProvider($injector) {
  var kbnUrl = $injector.get('kbnUrl');
  return function (err) {
    if (err.status === 403) {
      // redirect to error message view
      kbnUrl.redirect('access-denied');
    } else if (err.status === 404 && !(0, _lodash.contains)(window.location.hash, 'no-data')) {
      // pass through if this is a 404 and we're already on the no-data page
      _notify.toastNotifications.addDanger({
        title: (0, _public2.toMountPoint)(_react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.monitoring.ajaxErrorHandler.requestFailedNotificationTitle",
          defaultMessage: "Monitoring Request Failed"
        })),
        text: (0, _public2.toMountPoint)(_react.default.createElement("div", null, formatMonitoringError(err), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiButton, {
          size: "s",
          color: "danger",
          onClick: function onClick() {
            return window.location.reload();
          }
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.monitoring.ajaxErrorHandler.requestFailedNotification.retryButtonLabel",
          defaultMessage: "Retry"
        }))))
      });
    } else {
      _notify.toastNotifications.addDanger({
        title: (0, _public2.toMountPoint)(_react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.monitoring.ajaxErrorHandler.requestErrorNotificationTitle",
          defaultMessage: "Monitoring Request Error"
        })),
        text: (0, _public2.toMountPoint)(formatMonitoringError(err))
      });
    }

    return Promise.reject(err);
  };
}
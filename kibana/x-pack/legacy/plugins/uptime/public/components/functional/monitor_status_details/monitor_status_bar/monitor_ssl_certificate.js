"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorSSLCertificate = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MonitorSSLCertificate = function MonitorSSLCertificate(_ref) {
  var _ref2;

  var tls = _ref.tls;
  var certValidityDate = new Date((_ref2 = tls === null || tls === void 0 ? void 0 : tls.certificate_not_valid_after) !== null && _ref2 !== void 0 ? _ref2 : '');
  var isValidDate = !isNaN(certValidityDate.valueOf());
  var dateIn30Days = (0, _moment.default)().add('30', 'days');
  var isExpiringInMonth = isValidDate && dateIn30Days > (0, _moment.default)(certValidityDate);
  return isValidDate ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, {
    grow: false,
    size: "s",
    "aria-label": _i18n.i18n.translate('xpack.uptime.monitorStatusBar.sslCertificateExpiry.label.ariaLabel', {
      defaultMessage: 'SSL certificate expires {validityDate}',
      values: {
        validityDate: (0, _moment.default)(certValidityDate).fromNow()
      }
    })
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.monitorStatusBar.sslCertificateExpiry.badgeContent",
    defaultMessage: "SSL certificate expires {emphasizedText}",
    values: {
      emphasizedText: _react.default.createElement(_eui.EuiBadge, {
        color: isExpiringInMonth ? 'warning' : 'default'
      }, (0, _moment.default)(certValidityDate).fromNow())
    }
  }))) : null;
};

exports.MonitorSSLCertificate = MonitorSSLCertificate;
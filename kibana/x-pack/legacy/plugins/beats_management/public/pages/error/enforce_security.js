"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnforceSecurityPage = void 0;

var _react = require("@kbn/i18n/react");

var React = _interopRequireWildcard(require("react"));

var _no_data = require("../../components/layouts/no_data");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EnforceSecurityPage = (0, _react.injectI18n)(function (_ref) {
  var intl = _ref.intl;
  return React.createElement(_no_data.NoDataLayout, {
    title: intl.formatMessage({
      id: 'xpack.beatsManagement.disabledSecurityTitle',
      defaultMessage: 'Security is not enabled'
    }),
    actionSection: []
  }, React.createElement("p", null, React.createElement(_react.FormattedMessage, {
    id: "xpack.beatsManagement.disabledSecurityDescription",
    defaultMessage: "You must enable security in Kibana and Elasticsearch to use Beats central management."
  })));
});
exports.EnforceSecurityPage = EnforceSecurityPage;
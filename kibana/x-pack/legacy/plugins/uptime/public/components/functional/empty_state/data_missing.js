"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataMissing = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _contexts = require("../../../contexts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DataMissing = function DataMissing(_ref) {
  var headingMessage = _ref.headingMessage;

  var _useContext = (0, _react2.useContext)(_contexts.UptimeSettingsContext),
      basePath = _useContext.basePath;

  return _react2.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    "data-test-subj": "data-missing"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react2.default.createElement(_eui.EuiPanel, null, _react2.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "uptimeApp",
    title: _react2.default.createElement(_eui.EuiTitle, {
      size: "l"
    }, _react2.default.createElement("h3", null, headingMessage)),
    body: _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.uptime.dataMissing.configureHeartbeatToGetStartedMessage",
      defaultMessage: "{configureHeartbeatLink} to start logging uptime data.",
      values: {
        configureHeartbeatLink: _react2.default.createElement(_eui.EuiLink, {
          target: "_blank",
          href: "".concat(basePath, "/app/kibana#/home/tutorial/uptimeMonitors")
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.uptime.emptyState.configureHeartbeatLinkText",
          defaultMessage: "Configure Heartbeat"
        }))
      }
    }))
  }))));
};

exports.DataMissing = DataMissing;
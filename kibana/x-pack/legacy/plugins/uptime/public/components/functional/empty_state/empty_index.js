"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyIndex = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyIndex = function EmptyIndex(_ref) {
  var basePath = _ref.basePath;
  return _react2.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react2.default.createElement(_eui.EuiPanel, null, _react2.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "uptimeApp",
    title: _react2.default.createElement(_eui.EuiTitle, {
      size: "l"
    }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.uptime.emptyState.noDataTitle",
      defaultMessage: "No uptime data available"
    }))),
    body: _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.uptime.emptyState.configureHeartbeatToGetStartedMessage",
      defaultMessage: "{configureHeartbeatLink} to start collecting uptime data.",
      values: {
        configureHeartbeatLink: _react2.default.createElement(_eui.EuiLink, {
          target: "_blank",
          href: "".concat(basePath, "/app/kibana#/home/tutorial/uptimeMonitors")
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.uptime.emptyState.configureHeartbeatLinkText",
          defaultMessage: "Configure Heartbeat"
        }))
      }
    })))
  }))));
};

exports.EmptyIndex = EmptyIndex;
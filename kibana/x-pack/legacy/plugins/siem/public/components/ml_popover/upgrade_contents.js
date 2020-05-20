"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpgradeContents = exports.UpgradeContentsComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _kibana = require("../../lib/kibana");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PopoverContentsDiv = _styledComponents.default.div.withConfig({
  displayName: "PopoverContentsDiv",
  componentId: "sc-1x9oz32-0"
})(["width:384px;"]);

PopoverContentsDiv.displayName = 'PopoverContentsDiv';

var UpgradeContentsComponent = function UpgradeContentsComponent() {
  return _react.default.createElement(PopoverContentsDiv, {
    "data-test-subj": "ml-popover-upgrade-contents"
  }, _react.default.createElement(_eui.EuiPopoverTitle, null, i18n.UPGRADE_TITLE), _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.siem.components.mlPopup.upgradeDescription",
    defaultMessage: "To access SIEM\u2019s anomaly detection features, you must update your license to Platinum, start a free 30-day trial, or spin up a {cloudLink} on AWS, GCP, or Azure. You can then run Machine Learning jobs and view anomalies.",
    values: {
      cloudLink: _react.default.createElement(_eui.EuiLink, {
        href: "https://www.elastic.co/cloud/",
        target: "_blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.siem.components.mlPopup.cloudLink",
        defaultMessage: "cloud deployment"
      }))
    }
  })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    wrap: true
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    href: "https://www.elastic.co/subscriptions",
    iconType: "popout",
    iconSide: "right",
    target: "_blank"
  }, i18n.UPGRADE_BUTTON)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    href: "".concat((0, _kibana.useBasePath)(), "/app/kibana#/management/elasticsearch/license_management"),
    iconType: "gear",
    target: "_blank"
  }, i18n.LICENSE_BUTTON))));
};

exports.UpgradeContentsComponent = UpgradeContentsComponent;

var UpgradeContents = _react.default.memo(UpgradeContentsComponent);

exports.UpgradeContents = UpgradeContents;
UpgradeContents.displayName = 'UpgradeContents';
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorListActionsPopoverComponent = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _integration_group = require("./integration_group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MonitorListActionsPopoverComponent = function MonitorListActionsPopoverComponent(_ref) {
  var summary = _ref.summary,
      popoverState = _ref.popoverState,
      togglePopoverIsVisible = _ref.togglePopoverIsVisible;
  var popoverId = "".concat(summary.monitor_id, "_popover");
  var monitorUrl = (0, _lodash.get)(summary, 'state.url.full', undefined);
  var isPopoverOpen = !!popoverState && popoverState.open && popoverState.id === popoverId;
  return _react.default.createElement(_eui.EuiPopover, {
    button: _react.default.createElement(_eui.EuiButton, {
      "aria-label": _i18n.i18n.translate('xpack.uptime.monitorList.observabilityIntegrationsColumn.popoverIconButton.ariaLabel', {
        defaultMessage: 'Opens integrations popover for monitor with url {monitorUrl}',
        description: 'A message explaining that this button opens a popover with links to other apps for a given monitor',
        values: {
          monitorUrl: monitorUrl
        }
      }),
      onClick: function onClick() {
        return togglePopoverIsVisible({
          id: popoverId,
          open: true
        });
      },
      iconType: "arrowDown",
      iconSide: "right"
    }, "Integrations"),
    closePopover: function closePopover() {
      return togglePopoverIsVisible({
        id: popoverId,
        open: false
      });
    },
    id: popoverId,
    isOpen: isPopoverOpen
  }, _react.default.createElement(_integration_group.IntegrationGroup, {
    summary: summary
  }));
};

exports.MonitorListActionsPopoverComponent = MonitorListActionsPopoverComponent;
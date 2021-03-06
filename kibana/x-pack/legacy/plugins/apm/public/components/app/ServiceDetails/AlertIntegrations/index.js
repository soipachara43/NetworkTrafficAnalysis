"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertIntegrations = AlertIntegrations;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _alert_types = require("../../../../../../../../plugins/apm/common/alert_types");

var _AlertingFlyout = require("./AlertingFlyout");

var _useApmPluginContext = require("../../../../hooks/useApmPluginContext");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var alertLabel = _i18n.i18n.translate('xpack.apm.serviceDetails.alertsMenu.alerts', {
  defaultMessage: 'Alerts'
});

var createThresholdAlertLabel = _i18n.i18n.translate('xpack.apm.serviceDetails.alertsMenu.createThresholdAlert', {
  defaultMessage: 'Create threshold alert'
});

var CREATE_THRESHOLD_ALERT_PANEL_ID = 'create_threshold';

function AlertIntegrations(props) {
  var canSaveAlerts = props.canSaveAlerts,
      canReadAlerts = props.canReadAlerts;
  var plugin = (0, _useApmPluginContext.useApmPluginContext)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      popoverOpen = _useState2[0],
      setPopoverOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      alertType = _useState4[0],
      setAlertType = _useState4[1];

  var button = _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "arrowDown",
    iconSide: "right",
    onClick: function onClick() {
      return setPopoverOpen(true);
    }
  }, _i18n.i18n.translate('xpack.apm.serviceDetails.alertsMenu.alerts', {
    defaultMessage: 'Alerts'
  }));

  var panels = [{
    id: 0,
    title: alertLabel,
    items: [].concat(_toConsumableArray(canSaveAlerts ? [{
      name: createThresholdAlertLabel,
      panel: CREATE_THRESHOLD_ALERT_PANEL_ID,
      icon: 'bell'
    }] : []), _toConsumableArray(canReadAlerts ? [{
      name: _i18n.i18n.translate('xpack.apm.serviceDetails.alertsMenu.viewActiveAlerts', {
        defaultMessage: 'View active alerts'
      }),
      href: plugin.core.http.basePath.prepend('/app/kibana#/management/kibana/triggersActions/alerts'),
      icon: 'tableOfContents'
    }] : []))
  }, {
    id: CREATE_THRESHOLD_ALERT_PANEL_ID,
    title: createThresholdAlertLabel,
    items: [{
      name: _i18n.i18n.translate('xpack.apm.serviceDetails.alertsMenu.transactionDuration', {
        defaultMessage: 'Transaction duration'
      }),
      onClick: function onClick() {
        setAlertType(_alert_types.AlertType.TransactionDuration);
      }
    }, {
      name: _i18n.i18n.translate('xpack.apm.serviceDetails.alertsMenu.errorRate', {
        defaultMessage: 'Error rate'
      }),
      onClick: function onClick() {
        setAlertType(_alert_types.AlertType.ErrorRate);
      }
    }]
  }];
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPopover, {
    id: "integrations-menu",
    button: button,
    isOpen: popoverOpen,
    closePopover: function closePopover() {
      return setPopoverOpen(false);
    },
    panelPaddingSize: "none",
    anchorPosition: "downRight"
  }, _react.default.createElement(_eui.EuiContextMenu, {
    initialPanelId: 0,
    panels: panels
  })), _react.default.createElement(_AlertingFlyout.AlertingFlyout, {
    alertType: alertType,
    addFlyoutVisible: !!alertType,
    setAddFlyoutVisibility: function setAddFlyoutVisibility(visible) {
      if (!visible) {
        setAlertType(null);
      }
    }
  }));
}
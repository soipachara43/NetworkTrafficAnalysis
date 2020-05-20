"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleAlertFlyoutButtonComponent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../../src/plugins/kibana_react/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ToggleAlertFlyoutButtonComponent = function ToggleAlertFlyoutButtonComponent(_ref) {
  var _kibana$services, _kibana$services$appl;

  var setAlertFlyoutVisible = _ref.setAlertFlyoutVisible;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var kibana = (0, _public.useKibana)();
  return _react.default.createElement(_eui.EuiPopover, {
    button: _react.default.createElement(_eui.EuiButtonEmpty, {
      "aria-label": _i18n.i18n.translate('xpack.uptime.alertsPopover.toggleButton.ariaLabel', {
        defaultMessage: 'Open alert context menu'
      }),
      "data-test-subj": "xpack.uptime.alertsPopover.toggleButton",
      iconType: "arrowDown",
      iconSide: "right",
      onClick: function onClick() {
        return setIsOpen(!isOpen);
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.uptime.alerts.toggleAlertFlyoutButtonText",
      defaultMessage: "Alerts"
    })),
    closePopover: function closePopover() {
      return setIsOpen(false);
    },
    isOpen: isOpen,
    ownFocus: true
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    items: [_react.default.createElement(_eui.EuiContextMenuItem, {
      "aria-label": _i18n.i18n.translate('xpack.uptime.toggleAlertFlyout.ariaLabel', {
        defaultMessage: 'Open add alert flyout'
      }),
      "data-test-subj": "xpack.uptime.toggleAlertFlyout",
      key: "create-alert",
      icon: "bell",
      onClick: function onClick() {
        setAlertFlyoutVisible(true);
        setIsOpen(false);
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.uptime.toggleAlertButton.content",
      defaultMessage: "Create alert"
    })), _react.default.createElement(_eui.EuiContextMenuItem, {
      "aria-label": _i18n.i18n.translate('xpack.uptime.navigateToAlertingUi', {
        defaultMessage: 'Leave Uptime and go to Alerting Management page'
      }),
      "data-test-subj": "xpack.uptime.navigateToAlertingUi",
      icon: "tableOfContents",
      key: "navigate-to-alerting",
      href: (_kibana$services = kibana.services) === null || _kibana$services === void 0 ? void 0 : (_kibana$services$appl = _kibana$services.application) === null || _kibana$services$appl === void 0 ? void 0 : _kibana$services$appl.getUrlForApp('kibana#/management/kibana/triggersActions/alerts')
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.uptime.navigateToAlertingButton.content",
      defaultMessage: "Manage alerts"
    }))]
  }));
};

exports.ToggleAlertFlyoutButtonComponent = ToggleAlertFlyoutButtonComponent;
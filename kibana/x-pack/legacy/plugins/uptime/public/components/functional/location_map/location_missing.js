"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocationMissingWarning = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react2 = require("@kbn/i18n/react");

var _monitor_list_drawer = require("../monitor_list/monitor_list_drawer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EuiPopoverRight = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "EuiPopoverRight",
  componentId: "sc-9s6pc4-0"
})(["margin-left:auto;margin-bottom:3px;"]);

var LocationMissingWarning = function LocationMissingWarning() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var togglePopover = function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  };

  var button = _react.default.createElement(_eui.EuiButton, {
    iconType: "alert",
    size: "s",
    color: "warning",
    onClick: togglePopover
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.locationMap.locations.missing.title",
    defaultMessage: "Geo Information Missing"
  }));

  return _react.default.createElement(_eui.EuiFlexGroup, {
    "data-test-subj": "xpack.uptime.locationMap.locationMissing",
    gutterSize: "none",
    responsive: false
  }, _react.default.createElement(EuiPopoverRight, {
    grow: false
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "popover",
    button: button,
    isOpen: isPopoverOpen,
    closePopover: togglePopover
  }, _react.default.createElement(_eui.EuiText, {
    style: {
      width: '350px'
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.locationMap.locations.missing.message",
    defaultMessage: "Important geo location configuration is missing. You can use the {codeBlock} field to create distinctive geographic regions for your uptime checks.",
    values: {
      codeBlock: _react.default.createElement(_eui.EuiCode, null, "observer.geo.??")
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_eui.EuiText, {
    style: {
      width: '350px'
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.locationMap.locations.missing.message1",
    defaultMessage: "Get more information in our documentation."
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_monitor_list_drawer.LocationLink, null)))));
};

exports.LocationMissingWarning = LocationMissingWarning;
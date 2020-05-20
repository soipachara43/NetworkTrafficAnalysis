"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultFieldRendererOverflow = exports.MoreContainer = exports.DefaultFieldRenderer = exports.DefaultFieldRendererComponent = exports.reputationRenderer = exports.whoisRenderer = exports.hostNameRenderer = exports.hostIdRenderer = exports.autonomousSystemRenderer = exports.dateRenderer = exports.locationRenderer = exports.DEFAULT_MORE_MAX_HEIGHT = exports.IpOverviewId = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _fp = require("lodash/fp");

var _react2 = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../drag_and_drop/helpers");

var _draggables = require("../draggables");

var _empty_value = require("../empty_value");

var _formatted_date = require("../formatted_date");

var _links = require("../links");

var _page = require("../page");

var i18n = _interopRequireWildcard(require("../page/network/ip_overview/translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DraggableContainerFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "DraggableContainerFlexGroup",
  componentId: "np40zo-0"
})(["flex-grow:unset;"]);
var IpOverviewId = 'ip-overview';
/** The default max-height of the popover used to show "+n More" items (e.g. `+9 More`) */

exports.IpOverviewId = IpOverviewId;
var DEFAULT_MORE_MAX_HEIGHT = '200px';
exports.DEFAULT_MORE_MAX_HEIGHT = DEFAULT_MORE_MAX_HEIGHT;

var locationRenderer = function locationRenderer(fieldNames, data) {
  return fieldNames.length > 0 && fieldNames.every(function (fieldName) {
    return (0, _fp.getOr)(null, fieldName, data);
  }) ? _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none",
    "data-test-subj": "location-field"
  }, fieldNames.map(function (fieldName, index) {
    var locationValue = (0, _fp.getOr)('', fieldName, data);
    return _react2.default.createElement(_react2.Fragment, {
      key: "".concat(IpOverviewId, "-").concat(fieldName)
    }, index ? ",\xA0" : '', _react2.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react2.default.createElement(_draggables.DefaultDraggable, {
      id: "location-renderer-default-draggable-".concat(IpOverviewId, "-").concat(fieldName),
      field: fieldName,
      value: locationValue
    })));
  })) : (0, _empty_value.getEmptyTagValue)();
};

exports.locationRenderer = locationRenderer;

var dateRenderer = function dateRenderer(timestamp) {
  return _react2.default.createElement(_formatted_date.FormattedRelativePreferenceDate, {
    value: timestamp
  });
};

exports.dateRenderer = dateRenderer;

var autonomousSystemRenderer = function autonomousSystemRenderer(as, flowTarget) {
  return as && as.organization && as.organization.name && as.number ? _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_draggables.DefaultDraggable, {
    id: "autonomous-system-renderer-default-draggable-".concat(IpOverviewId, "-").concat(flowTarget, ".as.organization.name"),
    field: "".concat(flowTarget, ".as.organization.name"),
    value: as.organization.name
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, '/'), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_draggables.DefaultDraggable, {
    id: "autonomous-system-renderer-default-draggable-".concat(IpOverviewId, "-").concat(flowTarget, ".as.number"),
    field: "".concat(flowTarget, ".as.number"),
    value: "".concat(as.number)
  }))) : (0, _empty_value.getEmptyTagValue)();
};

exports.autonomousSystemRenderer = autonomousSystemRenderer;

var hostIdRenderer = function hostIdRenderer(_ref) {
  var host = _ref.host,
      ipFilter = _ref.ipFilter,
      noLink = _ref.noLink;
  return host.id && host.ip && (ipFilter == null || host.ip.includes(ipFilter)) ? _react2.default.createElement(_react2.default.Fragment, null, host.name && host.name[0] != null ? _react2.default.createElement(_draggables.DefaultDraggable, {
    id: "host-id-renderer-default-draggable-".concat(IpOverviewId, "-host-id"),
    field: "host.id",
    value: host.id[0]
  }, noLink ? _react2.default.createElement(_react2.default.Fragment, null, host.id) : _react2.default.createElement(_links.HostDetailsLink, {
    hostName: host.name[0]
  }, host.id)) : _react2.default.createElement(_react2.default.Fragment, null, host.id)) : (0, _empty_value.getEmptyTagValue)();
};

exports.hostIdRenderer = hostIdRenderer;

var hostNameRenderer = function hostNameRenderer(host, ipFilter) {
  return host.name && host.name[0] && host.ip && (!(ipFilter != null) || host.ip.includes(ipFilter)) ? _react2.default.createElement(_draggables.DefaultDraggable, {
    id: "host-name-renderer-default-draggable-".concat(IpOverviewId, "-host-name"),
    field: 'host.name',
    value: host.name[0]
  }, _react2.default.createElement(_links.HostDetailsLink, {
    hostName: host.name[0]
  }, host.name ? host.name : (0, _empty_value.getEmptyTagValue)())) : (0, _empty_value.getEmptyTagValue)();
};

exports.hostNameRenderer = hostNameRenderer;

var whoisRenderer = function whoisRenderer(ip) {
  return _react2.default.createElement(_links.WhoIsLink, {
    domain: ip
  }, i18n.VIEW_WHOIS);
};

exports.whoisRenderer = whoisRenderer;

var reputationRenderer = function reputationRenderer(ip) {
  return _react2.default.createElement(_links.ReputationLink, {
    domain: ip,
    direction: "column"
  });
};

exports.reputationRenderer = reputationRenderer;

// TODO: This causes breaks between elements until the ticket below is fixed
// https://github.com/elastic/ingest-dev/issues/474
var DefaultFieldRendererComponent = function DefaultFieldRendererComponent(_ref2) {
  var attrName = _ref2.attrName,
      _ref2$displayCount = _ref2.displayCount,
      displayCount = _ref2$displayCount === void 0 ? 1 : _ref2$displayCount,
      idPrefix = _ref2.idPrefix,
      _ref2$moreMaxHeight = _ref2.moreMaxHeight,
      moreMaxHeight = _ref2$moreMaxHeight === void 0 ? DEFAULT_MORE_MAX_HEIGHT : _ref2$moreMaxHeight,
      render = _ref2.render,
      rowItems = _ref2.rowItems;

  if (rowItems != null && rowItems.length > 0) {
    var draggables = rowItems.slice(0, displayCount).map(function (rowItem, index) {
      var id = (0, _helpers.escapeDataProviderId)("default-field-renderer-default-draggable-".concat(idPrefix, "-").concat(attrName, "-").concat(rowItem));
      return _react2.default.createElement(_eui.EuiFlexItem, {
        key: id,
        grow: false
      }, index !== 0 && _react2.default.createElement(_react2.default.Fragment, null, ',', _react2.default.createElement(_page.Spacer, null)), typeof rowItem === 'string' && _react2.default.createElement(_draggables.DefaultDraggable, {
        id: id,
        field: attrName,
        value: rowItem
      }, render ? render(rowItem) : rowItem));
    });
    return draggables.length > 0 ? _react2.default.createElement(DraggableContainerFlexGroup, {
      alignItems: "center",
      gutterSize: "none",
      component: "span"
    }, _react2.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, draggables, " "), _react2.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react2.default.createElement(DefaultFieldRendererOverflow, {
      rowItems: rowItems,
      idPrefix: idPrefix,
      render: render,
      overflowIndexStart: displayCount,
      moreMaxHeight: moreMaxHeight
    }))) : (0, _empty_value.getEmptyTagValue)();
  } else {
    return (0, _empty_value.getEmptyTagValue)();
  }
};

exports.DefaultFieldRendererComponent = DefaultFieldRendererComponent;

var DefaultFieldRenderer = _react2.default.memo(DefaultFieldRendererComponent);

exports.DefaultFieldRenderer = DefaultFieldRenderer;
DefaultFieldRenderer.displayName = 'DefaultFieldRenderer';

/** A container (with overflow) for showing "More" items in a popover */
var MoreContainer = _react2.default.memo(function (_ref3) {
  var idPrefix = _ref3.idPrefix,
      render = _ref3.render,
      rowItems = _ref3.rowItems,
      moreMaxHeight = _ref3.moreMaxHeight,
      overflowIndexStart = _ref3.overflowIndexStart;
  return _react2.default.createElement("div", {
    "data-test-subj": "more-container",
    style: {
      maxHeight: moreMaxHeight,
      overflow: 'auto',
      paddingRight: '2px'
    }
  }, rowItems.slice(overflowIndexStart).map(function (rowItem, i) {
    return _react2.default.createElement(_eui.EuiText, {
      key: "".concat(idPrefix, "-").concat(rowItem, "-").concat(i),
      size: "s"
    }, render ? render(rowItem) : rowItem);
  }));
});

exports.MoreContainer = MoreContainer;
MoreContainer.displayName = 'MoreContainer';

var DefaultFieldRendererOverflow = _react2.default.memo(function (_ref4) {
  var idPrefix = _ref4.idPrefix,
      moreMaxHeight = _ref4.moreMaxHeight,
      _ref4$overflowIndexSt = _ref4.overflowIndexStart,
      overflowIndexStart = _ref4$overflowIndexSt === void 0 ? 5 : _ref4$overflowIndexSt,
      render = _ref4.render,
      rowItems = _ref4.rowItems;

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  return _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, rowItems.length > overflowIndexStart && _react2.default.createElement(_eui.EuiPopover, {
    id: "popover",
    button: _react2.default.createElement(_react2.default.Fragment, null, ' ,', _react2.default.createElement(_eui.EuiButtonEmpty, {
      size: "xs",
      onClick: function onClick() {
        return setIsOpen(!isOpen);
      }
    }, "+".concat(rowItems.length - overflowIndexStart, " "), _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.fieldRenderers.moreLabel",
      defaultMessage: "More"
    }))),
    isOpen: isOpen,
    closePopover: function closePopover() {
      return setIsOpen(!isOpen);
    }
  }, _react2.default.createElement(MoreContainer, {
    idPrefix: idPrefix,
    render: render,
    rowItems: rowItems,
    moreMaxHeight: moreMaxHeight,
    overflowIndexStart: overflowIndexStart
  })));
});

exports.DefaultFieldRendererOverflow = DefaultFieldRendererOverflow;
DefaultFieldRendererOverflow.displayName = 'DefaultFieldRendererOverflow';
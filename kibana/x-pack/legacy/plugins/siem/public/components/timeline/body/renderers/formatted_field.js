"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormattedFieldValue = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../draggables");

var _bytes = require("../../../bytes");

var _duration = require("../../../duration");

var _empty_value = require("../../../empty_value");

var _formatted_date = require("../../../formatted_date");

var _formatted_ip = require("../../../formatted_ip");

var _links = require("../../../links");

var _port = require("../../../port");

var _truncatable_text = require("../../../truncatable_text");

var _constants = require("./constants");

var _formatted_field_helpers = require("./formatted_field_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// simple black-list to prevent dragging and dropping fields such as message name
var columnNamesNotDraggable = [_constants.MESSAGE_FIELD_NAME];

var FormattedFieldValueComponent = function FormattedFieldValueComponent(_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      fieldFormat = _ref.fieldFormat,
      fieldName = _ref.fieldName,
      fieldType = _ref.fieldType,
      truncate = _ref.truncate,
      value = _ref.value,
      linkValue = _ref.linkValue;

  if (fieldType === _constants.IP_FIELD_TYPE) {
    return _react.default.createElement(_formatted_ip.FormattedIp, {
      eventId: eventId,
      contextId: contextId,
      fieldName: fieldName,
      value: !(0, _fp.isNumber)(value) ? value : String(value)
    });
  } else if (fieldType === _constants.DATE_FIELD_TYPE) {
    return _react.default.createElement(_draggables.DefaultDraggable, {
      field: fieldName,
      id: "event-details-value-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(fieldName, "-").concat(value),
      tooltipContent: null,
      value: "".concat(value)
    }, _react.default.createElement(_formatted_date.FormattedDate, {
      fieldName: fieldName,
      value: value
    }));
  } else if (_port.PORT_NAMES.some(function (portName) {
    return fieldName === portName;
  })) {
    return _react.default.createElement(_port.Port, {
      contextId: contextId,
      eventId: eventId,
      fieldName: fieldName,
      value: "".concat(value)
    });
  } else if (fieldName === _duration.EVENT_DURATION_FIELD_NAME) {
    return _react.default.createElement(_duration.Duration, {
      contextId: contextId,
      eventId: eventId,
      fieldName: fieldName,
      value: "".concat(value)
    });
  } else if (fieldName === _constants.HOST_NAME_FIELD_NAME) {
    var hostname = "".concat(value);
    return (0, _fp.isString)(value) && hostname.length > 0 ? _react.default.createElement(_draggables.DefaultDraggable, {
      field: fieldName,
      id: "event-details-value-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(fieldName, "-").concat(value),
      tooltipContent: value,
      value: value
    }, _react.default.createElement(_links.HostDetailsLink, {
      "data-test-subj": "host-details-link",
      hostName: hostname
    }, _react.default.createElement(_truncatable_text.TruncatableText, {
      "data-test-subj": "draggable-truncatable-content"
    }, value))) : (0, _empty_value.getEmptyTagValue)();
  } else if (fieldFormat === _bytes.BYTES_FORMAT) {
    return _react.default.createElement(_bytes.Bytes, {
      contextId: contextId,
      eventId: eventId,
      fieldName: fieldName,
      value: "".concat(value)
    });
  } else if (fieldName === _constants.SIGNAL_RULE_NAME_FIELD_NAME) {
    return (0, _formatted_field_helpers.renderRuleName)({
      contextId: contextId,
      eventId: eventId,
      fieldName: fieldName,
      linkValue: linkValue,
      truncate: truncate,
      value: value
    });
  } else if (fieldName === _constants.EVENT_MODULE_FIELD_NAME) {
    return (0, _formatted_field_helpers.renderEventModule)({
      contextId: contextId,
      eventId: eventId,
      fieldName: fieldName,
      linkValue: linkValue,
      truncate: truncate,
      value: value
    });
  } else if (fieldName === _constants.RULE_REFERENCE_FIELD_NAME) {
    return (0, _formatted_field_helpers.renderRulReference)({
      contextId: contextId,
      eventId: eventId,
      fieldName: fieldName,
      linkValue: linkValue,
      truncate: truncate,
      value: value
    });
  } else if (columnNamesNotDraggable.includes(fieldName)) {
    return truncate && !(0, _fp.isEmpty)(value) ? _react.default.createElement(_truncatable_text.TruncatableText, {
      "data-test-subj": "truncatable-message"
    }, _react.default.createElement(_eui.EuiToolTip, {
      "data-test-subj": "message-tool-tip",
      content: _react.default.createElement(_eui.EuiFlexGroup, {
        direction: "column",
        gutterSize: "none"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement("span", null, fieldName)), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement("span", null, value)))
    }, _react.default.createElement(_react.default.Fragment, null, value))) : _react.default.createElement(_react.default.Fragment, null, value);
  } else {
    var contentValue = (0, _empty_value.getOrEmptyTagFromValue)(value);
    var content = truncate ? _react.default.createElement(_truncatable_text.TruncatableText, null, contentValue) : contentValue;
    return _react.default.createElement(_draggables.DefaultDraggable, {
      field: fieldName,
      id: "event-details-value-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(fieldName, "-").concat(value),
      value: "".concat(value),
      tooltipContent: fieldType === _constants.DATE_FIELD_TYPE || fieldType === _duration.EVENT_DURATION_FIELD_NAME ? null : fieldName
    }, content);
  }
};

var FormattedFieldValue = _react.default.memo(FormattedFieldValueComponent);

exports.FormattedFieldValue = FormattedFieldValue;
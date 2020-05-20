"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LastEventTime = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _last_event_time = require("../../containers/events/last_event_time");

var _empty_value = require("../empty_value");

var _formatted_date = require("../formatted_date");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LastEventTime = (0, _react2.memo)(function (_ref) {
  var hostName = _ref.hostName,
      indexKey = _ref.indexKey,
      ip = _ref.ip;

  var _useLastEventTimeQuer = (0, _last_event_time.useLastEventTimeQuery)(indexKey, {
    hostName: hostName,
    ip: ip
  }, 'default'),
      loading = _useLastEventTimeQuer.loading,
      lastSeen = _useLastEventTimeQuer.lastSeen,
      errorMessage = _useLastEventTimeQuer.errorMessage;

  if (errorMessage != null) {
    return _react2.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: errorMessage,
      "data-test-subj": "last_event_time_error",
      "aria-label": "last_event_time_error",
      id: "last_event_time_error-".concat(indexKey)
    }, _react2.default.createElement(_eui.EuiIcon, {
      "aria-describedby": "last_event_time_error-".concat(indexKey),
      type: "alert"
    }));
  }

  return _react2.default.createElement(_react2.default.Fragment, null, loading && _react2.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  }), !loading && lastSeen != null && new Date(lastSeen).toString() === 'Invalid Date' ? lastSeen : !loading && lastSeen != null && _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.siem.headerPage.pageSubtitle",
    defaultMessage: "Last event: {beat}",
    values: {
      beat: _react2.default.createElement(_formatted_date.FormattedRelativePreferenceDate, {
        value: lastSeen
      })
    }
  }), !loading && lastSeen == null && (0, _empty_value.getEmptyTagValue)());
});
exports.LastEventTime = LastEventTime;
LastEventTime.displayName = 'LastEventTime';
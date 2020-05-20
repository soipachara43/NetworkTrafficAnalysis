"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirstLastSeenHost = exports.FirstLastSeenHostType = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactApollo = require("react-apollo");

var _first_last_seen = require("../../../../containers/hosts/first_last_seen");

var _empty_value = require("../../../empty_value");

var _formatted_date = require("../../../formatted_date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FirstLastSeenHostType;
exports.FirstLastSeenHostType = FirstLastSeenHostType;

(function (FirstLastSeenHostType) {
  FirstLastSeenHostType["FIRST_SEEN"] = "first-seen";
  FirstLastSeenHostType["LAST_SEEN"] = "last-seen";
})(FirstLastSeenHostType || (exports.FirstLastSeenHostType = FirstLastSeenHostType = {}));

var FirstLastSeenHost = _react.default.memo(function (_ref) {
  var hostname = _ref.hostname,
      type = _ref.type;
  return _react.default.createElement(_reactApollo.ApolloConsumer, null, function (client) {
    var _useFirstLastSeenHost = (0, _first_last_seen.useFirstLastSeenHostQuery)(hostname, 'default', client),
        loading = _useFirstLastSeenHost.loading,
        firstSeen = _useFirstLastSeenHost.firstSeen,
        lastSeen = _useFirstLastSeenHost.lastSeen,
        errorMessage = _useFirstLastSeenHost.errorMessage;

    if (errorMessage != null) {
      return _react.default.createElement(_eui.EuiToolTip, {
        position: "top",
        content: errorMessage,
        "data-test-subj": "firstLastSeenErrorToolTip",
        "aria-label": "firstLastSeenError-".concat(type),
        id: "firstLastSeenError-".concat(hostname, "-").concat(type)
      }, _react.default.createElement(_eui.EuiIcon, {
        "aria-describedby": "firstLastSeenError-".concat(hostname, "-").concat(type),
        type: "alert"
      }));
    }

    var valueSeen = type === FirstLastSeenHostType.FIRST_SEEN ? firstSeen : lastSeen;
    return _react.default.createElement(_react.default.Fragment, null, loading && _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "m"
    }), !loading && valueSeen != null && new Date(valueSeen).toString() === 'Invalid Date' ? valueSeen : !loading && valueSeen != null && _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement(_formatted_date.FormattedRelativePreferenceDate, {
      value: "".concat(valueSeen)
    })), !loading && valueSeen == null && (0, _empty_value.getEmptyTagValue)());
  });
});

exports.FirstLastSeenHost = FirstLastSeenHost;
FirstLastSeenHost.displayName = 'FirstLastSeenHost';
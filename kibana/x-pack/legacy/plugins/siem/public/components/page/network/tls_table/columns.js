"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTlsColumns = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _helpers = require("../../../tables/helpers");

var _localized_date_tooltip = require("../../../localized_date_tooltip");

var _formatted_date = require("../../../formatted_date");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var getTlsColumns = function getTlsColumns(tableId) {
  return [{
    field: 'node',
    name: i18n.ISSUER,
    truncateText: false,
    hideForMobile: false,
    sortable: false,
    render: function render(_ref) {
      var _id = _ref._id,
          issuers = _ref.issuers;
      return (0, _helpers.getRowItemDraggables)({
        rowItems: issuers,
        attrName: 'tls.server.issuer',
        idPrefix: "".concat(tableId, "-").concat(_id, "-table-issuers")
      });
    }
  }, {
    field: 'node',
    name: i18n.SUBJECT,
    truncateText: false,
    hideForMobile: false,
    sortable: false,
    render: function render(_ref2) {
      var _id = _ref2._id,
          subjects = _ref2.subjects;
      return (0, _helpers.getRowItemDraggables)({
        rowItems: subjects,
        attrName: 'tls.server.subject',
        idPrefix: "".concat(tableId, "-").concat(_id, "-table-subjects")
      });
    }
  }, {
    field: 'node._id',
    name: i18n.SHA1_FINGERPRINT,
    truncateText: false,
    hideForMobile: false,
    sortable: true,
    render: function render(sha1) {
      return (0, _helpers.getRowItemDraggable)({
        rowItem: sha1,
        attrName: 'tls.server_certificate.fingerprint.sha1',
        idPrefix: "".concat(tableId, "-").concat(sha1, "-table-sha1")
      });
    }
  }, {
    field: 'node',
    name: i18n.JA3_FINGERPRINT,
    truncateText: false,
    hideForMobile: false,
    sortable: false,
    render: function render(_ref3) {
      var _id = _ref3._id,
          ja3 = _ref3.ja3;
      return (0, _helpers.getRowItemDraggables)({
        rowItems: ja3,
        attrName: 'tls.fingerprints.ja3.hash',
        idPrefix: "".concat(tableId, "-").concat(_id, "-table-ja3")
      });
    }
  }, {
    field: 'node',
    name: i18n.VALID_UNTIL,
    truncateText: false,
    hideForMobile: false,
    sortable: false,
    render: function render(_ref4) {
      var _id = _ref4._id,
          notAfter = _ref4.notAfter;
      return (0, _helpers.getRowItemDraggables)({
        rowItems: notAfter,
        attrName: 'tls.server_certificate.not_after',
        idPrefix: "".concat(tableId, "-").concat(_id, "-table-notAfter"),
        render: function render(validUntil) {
          return _react.default.createElement(_localized_date_tooltip.LocalizedDateTooltip, {
            date: (0, _moment.default)(new Date(validUntil)).toDate()
          }, _react.default.createElement(_formatted_date.PreferenceFormattedDate, {
            value: new Date(validUntil)
          }));
        }
      });
    }
  }];
};

exports.getTlsColumns = getTlsColumns;
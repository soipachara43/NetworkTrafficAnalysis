"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Package = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../../draggables");

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Package = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      packageName = _ref.packageName,
      packageSummary = _ref.packageSummary,
      packageVersion = _ref.packageVersion;

  if (packageName != null || packageSummary != null || packageVersion != null) {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
      grow: false,
      component: "span"
    }, _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      eventId: eventId,
      field: "system.audit.package.name",
      value: packageName,
      iconType: "document"
    })), _react.default.createElement(_helpers.TokensFlexItem, {
      grow: false,
      component: "span"
    }, _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      eventId: eventId,
      field: "system.audit.package.version",
      value: packageVersion,
      iconType: "document"
    })), _react.default.createElement(_helpers.TokensFlexItem, {
      grow: false,
      component: "span"
    }, _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      eventId: eventId,
      field: "system.audit.package.summary",
      value: packageSummary
    })));
  } else {
    return null;
  }
});

exports.Package = Package;
Package.displayName = 'Package';
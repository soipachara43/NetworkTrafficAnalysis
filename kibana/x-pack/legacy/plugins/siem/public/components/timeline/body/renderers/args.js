"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Args = exports.ArgsComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../draggables");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ArgsComponent = function ArgsComponent(_ref) {
  var args = _ref.args,
      contextId = _ref.contextId,
      eventId = _ref.eventId,
      processTitle = _ref.processTitle;

  if ((0, _helpers.isNillEmptyOrNotFinite)(args) && (0, _helpers.isNillEmptyOrNotFinite)(processTitle)) {
    return null;
  }

  return _react.default.createElement(_react.default.Fragment, null, args != null && args.map(function (arg, i) {
    return _react.default.createElement(_helpers.TokensFlexItem, {
      key: "".concat(contextId, "-args-").concat(i, "-").concat(arg),
      grow: false,
      component: "span"
    }, _react.default.createElement(_draggables.DraggableBadge, {
      contextId: "".concat(contextId, "-args-").concat(i, "-").concat(arg),
      eventId: eventId,
      field: "process.args",
      value: arg
    }));
  }), !(0, _helpers.isNillEmptyOrNotFinite)(processTitle) && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "process.title",
    value: processTitle
  })));
};

exports.ArgsComponent = ArgsComponent;
ArgsComponent.displayName = 'ArgsComponent';

var Args = _react.default.memo(ArgsComponent);

exports.Args = Args;
Args.displayName = 'Args';
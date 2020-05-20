"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowTargetSelect = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _types = require("../../graphql/types");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var toggleTargetOptions = function toggleTargetOptions(id, displayText) {
  return [{
    id: "".concat(id, "-select-flow-target-").concat(_types.FlowTarget.source),
    value: _types.FlowTarget.source,
    inputDisplay: displayText[0] || i18n.SOURCE,
    directions: [_types.FlowDirection.uniDirectional, _types.FlowDirection.biDirectional]
  }, {
    id: "".concat(id, "-select-flow-target-").concat(_types.FlowTarget.destination),
    value: _types.FlowTarget.destination,
    inputDisplay: displayText[1] || i18n.DESTINATION,
    directions: [_types.FlowDirection.uniDirectional, _types.FlowDirection.biDirectional]
  }, {
    id: "".concat(id, "-select-flow-target-").concat(_types.FlowTarget.client),
    value: _types.FlowTarget.client,
    inputDisplay: displayText[2] || i18n.CLIENT,
    directions: [_types.FlowDirection.biDirectional]
  }, {
    id: "".concat(id, "-select-flow-target-").concat(_types.FlowTarget.server),
    value: _types.FlowTarget.server,
    inputDisplay: displayText[3] || i18n.SERVER,
    directions: [_types.FlowDirection.biDirectional]
  }];
};

var FlowTargetSelectComponent = function FlowTargetSelectComponent(_ref) {
  var id = _ref.id,
      _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      selectedDirection = _ref.selectedDirection,
      selectedTarget = _ref.selectedTarget,
      _ref$displayTextOverr = _ref.displayTextOverride,
      displayTextOverride = _ref$displayTextOverr === void 0 ? [] : _ref$displayTextOverr,
      updateFlowTargetAction = _ref.updateFlowTargetAction;
  return _react.default.createElement(_eui.EuiSuperSelect, {
    options: selectedDirection ? toggleTargetOptions(id, displayTextOverride).filter(function (option) {
      return option.directions.includes(selectedDirection);
    }) : toggleTargetOptions(id, displayTextOverride),
    valueOfSelected: selectedTarget,
    onChange: updateFlowTargetAction,
    isLoading: isLoading
  });
};

var FlowTargetSelect = _react.default.memo(FlowTargetSelectComponent);

exports.FlowTargetSelect = FlowTargetSelect;
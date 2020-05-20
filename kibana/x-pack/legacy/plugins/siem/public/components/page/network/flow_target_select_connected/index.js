"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowTargetSelectConnected = exports.FlowTargetSelectConnectedComponent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _types = require("../../../../graphql/types");

var i18nIp = _interopRequireWildcard(require("../ip_overview/translations"));

var _flow_target_select = require("../../../flow_controls/flow_target_select");

var _field_renderers = require("../../../field_renderers/field_renderers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SelectTypeItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "SelectTypeItem",
  componentId: "xmyyfs-0"
})(["min-width:180px;"]);
SelectTypeItem.displayName = 'SelectTypeItem';

var getUpdatedFlowTargetPath = function getUpdatedFlowTargetPath(location, currentFlowTarget, newFlowTarget) {
  var newPathame = location.pathname.replace(currentFlowTarget, newFlowTarget);
  return "".concat(newPathame).concat(location.search);
};

var FlowTargetSelectConnectedComponent = function FlowTargetSelectConnectedComponent(_ref) {
  var flowTarget = _ref.flowTarget;
  var history = (0, _reactRouterDom.useHistory)();
  var location = (0, _reactRouterDom.useLocation)();
  var updateIpDetailsFlowTarget = (0, _react.useCallback)(function (newFlowTarget) {
    var newPath = getUpdatedFlowTargetPath(location, flowTarget, newFlowTarget);
    history.push(newPath);
  }, [history, location, flowTarget]);
  return _react.default.createElement(SelectTypeItem, {
    grow: false,
    "data-test-subj": "".concat(_field_renderers.IpOverviewId, "-select-flow-target")
  }, _react.default.createElement(_flow_target_select.FlowTargetSelect, {
    id: _field_renderers.IpOverviewId,
    isLoading: !flowTarget,
    selectedDirection: _types.FlowDirection.uniDirectional,
    selectedTarget: flowTarget,
    displayTextOverride: [i18nIp.AS_SOURCE, i18nIp.AS_DESTINATION],
    updateFlowTargetAction: updateIpDetailsFlowTarget
  }));
};

exports.FlowTargetSelectConnectedComponent = FlowTargetSelectConnectedComponent;

var FlowTargetSelectConnected = _react.default.memo(FlowTargetSelectConnectedComponent);

exports.FlowTargetSelectConnected = FlowTargetSelectConnected;
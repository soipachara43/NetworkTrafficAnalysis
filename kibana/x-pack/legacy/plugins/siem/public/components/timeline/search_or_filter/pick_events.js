"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickEventType = exports.eventTypeOptions = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AllEuiHealth = (0, _styledComponents.default)(_eui.EuiHealth).withConfig({
  displayName: "AllEuiHealth",
  componentId: "xyzd9l-0"
})(["margin-left:-2px;svg{stroke:#fff;stroke-width:1px;stroke-linejoin:round;width:19px;height:19px;margin-top:1px;z-index:1;}"]);
var WarningEuiHealth = (0, _styledComponents.default)(_eui.EuiHealth).withConfig({
  displayName: "WarningEuiHealth",
  componentId: "xyzd9l-1"
})(["margin-left:-17px;svg{z-index:0;}"]);

var PickEventContainer = _styledComponents.default.div.withConfig({
  displayName: "PickEventContainer",
  componentId: "xyzd9l-2"
})([".euiSuperSelect{width:155px;max-width:155px;button.euiSuperSelectControl{padding-top:3px;}}"]);

var eventTypeOptions = [{
  value: 'all',
  inputDisplay: _react.default.createElement(AllEuiHealth, {
    color: "subdued"
  }, _react.default.createElement(WarningEuiHealth, {
    color: "warning"
  }, i18n.ALL_EVENT))
}, {
  value: 'raw',
  inputDisplay: _react.default.createElement(_eui.EuiHealth, {
    color: "subdued"
  }, i18n.RAW_EVENT)
}, {
  value: 'signal',
  inputDisplay: _react.default.createElement(_eui.EuiHealth, {
    color: "warning"
  }, i18n.SIGNAL_EVENT)
}];
exports.eventTypeOptions = eventTypeOptions;

var PickEventTypeComponents = function PickEventTypeComponents(_ref) {
  var eventType = _ref.eventType,
      onChangeEventType = _ref.onChangeEventType;
  return _react.default.createElement(PickEventContainer, null, _react.default.createElement(_eui.EuiSuperSelect, {
    "data-test-subj": "pick-event-type",
    fullWidth: false,
    valueOfSelected: eventType,
    onChange: onChangeEventType,
    options: eventTypeOptions
  }));
};

var PickEventType = (0, _react.memo)(PickEventTypeComponents);
exports.PickEventType = PickEventType;
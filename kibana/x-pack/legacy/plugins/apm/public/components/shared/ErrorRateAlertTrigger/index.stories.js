"use strict";

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('app/ErrorRateAlertTrigger', module).add('example', function (props) {
  var params = {
    threshold: 2,
    window: '5m'
  };
  return _react2.default.createElement("div", {
    style: {
      width: 400
    }
  }, _react2.default.createElement(_.ErrorRateAlertTrigger, {
    alertParams: params,
    setAlertParams: function setAlertParams() {
      return undefined;
    },
    setAlertProperty: function setAlertProperty() {
      return undefined;
    }
  }));
});
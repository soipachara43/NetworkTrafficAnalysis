"use strict";

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _ApmPluginContext = require("../../../context/ApmPluginContext");

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('app/LicensePrompt', module).add('example', function () {
  var contextMock = {
    core: {
      http: {
        basePath: {
          prepend: function prepend() {}
        }
      }
    }
  };
  return _react2.default.createElement(_ApmPluginContext.ApmPluginContext.Provider, {
    value: contextMock
  }, _react2.default.createElement(_.LicensePrompt, {
    text: "To create Feature name, you must be subscribed to an Elastic X license or above."
  }));
}, {
  info: {
    source: false
  }
});
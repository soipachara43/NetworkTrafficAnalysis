"use strict";

var _react = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _react2 = _interopRequireDefault(require("react"));

var _pdf_panel = require("../pdf_panel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('components/Export/PDFPanel', module).addParameters({
  info: {
    inline: true,
    styles: {
      infoBody: {
        margin: 20
      },
      infoStory: {
        margin: '20px 30px',
        width: '290px'
      }
    }
  }
}).add('default', function () {
  return _react2.default.createElement("div", {
    className: "euiPanel"
  }, _react2.default.createElement(_pdf_panel.PDFPanel, {
    pdfURL: "pdfUrl",
    onCopy: (0, _addonActions.action)('onCopy'),
    onExport: (0, _addonActions.action)('onExport')
  }));
});
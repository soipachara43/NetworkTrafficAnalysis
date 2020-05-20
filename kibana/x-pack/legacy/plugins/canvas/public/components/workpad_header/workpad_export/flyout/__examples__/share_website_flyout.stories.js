"use strict";

var _react = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _react2 = _interopRequireDefault(require("react"));

var _share_website_flyout = require("../share_website_flyout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('components/Export/ShareWebsiteFlyout', module).addParameters({
  info: {
    inline: true,
    styles: {
      infoBody: {
        margin: 20
      },
      infoStory: {
        margin: '20px 30px',
        width: '620px'
      }
    }
  }
}).add('default', function () {
  return _react2.default.createElement(_share_website_flyout.ShareWebsiteFlyout, {
    onCopy: (0, _addonActions.action)('onCopy'),
    onDownload: (0, _addonActions.action)('onDownload'),
    onClose: (0, _addonActions.action)('onClose')
  });
}).add('unsupported renderers', function () {
  return _react2.default.createElement(_share_website_flyout.ShareWebsiteFlyout, {
    onCopy: (0, _addonActions.action)('onCopy'),
    onDownload: (0, _addonActions.action)('onDownload'),
    onClose: (0, _addonActions.action)('onClose'),
    unsupportedRenderers: ['rendererOne', 'rendererTwo']
  });
});
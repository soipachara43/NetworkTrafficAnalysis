"use strict";

var _addonActions = require("@storybook/addon-actions");

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _asset = require("../asset");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AIRPLANE = {
  '@created': '2018-10-13T16:44:44.648Z',
  id: 'airplane',
  type: 'dataurl',
  value: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1Ni4zMSA1Ni4zMSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmY7c3Ryb2tlOiMwMDc4YTA7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlBsYW5lIEljb248L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDkuNTEsNDguOTMsNDEuMjYsMjIuNTIsNTMuNzYsMTBhNS4yOSw1LjI5LDAsMCwwLTcuNDgtNy40N2wtMTIuNSwxMi41TDcuMzgsNi43OUEuNy43LDAsMCwwLDYuNjksN0wxLjIsMTIuNDVhLjcuNywwLDAsMCwwLDFMMTkuODUsMjlsLTcuMjQsNy4yNC03Ljc0LS42YS43MS43MSwwLDAsMC0uNTMuMkwxLjIxLDM5YS42Ny42NywwLDAsMCwuMDgsMUw5LjQ1LDQ2bC4wNywwYy4xMS4xMy4yMi4yNi4zNC4zOHMuMjUuMjMuMzguMzRhLjM2LjM2LDAsMCwwLDAsLjA3TDE2LjMzLDU1YS42OC42OCwwLDAsMCwxLC4wN0wyMC40OSw1MmEuNjcuNjcsMCwwLDAsLjE5LS41NGwtLjU5LTcuNzQsNy4yNC03LjI0TDQyLjg1LDU1LjA2YS42OC42OCwwLDAsMCwxLDBsNS41LTUuNUEuNjYuNjYsMCwwLDAsNDkuNTEsNDguOTNaIi8+PC9nPjwvZz48L3N2Zz4='
};
var MARKER = {
  '@created': '2018-10-13T16:44:44.648Z',
  id: 'marker',
  type: 'dataurl',
  value: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzOC4zOSA1Ny41NyI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmY7c3Ryb2tlOiMwMTliOGY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkxvY2F0aW9uIEljb248L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTkuMTksMUExOC4xOSwxOC4xOSwwLDAsMCwyLjk0LDI3LjM2aDBhMTkuNTEsMTkuNTEsMCwwLDAsMSwxLjc4TDE5LjE5LDU1LjU3LDM0LjM4LDI5LjIxQTE4LjE5LDE4LjE5LDAsMCwwLDE5LjE5LDFabTAsMjMuMjlhNS41Myw1LjUzLDAsMSwxLDUuNTMtNS41M0E1LjUzLDUuNTMsMCwwLDEsMTkuMTksMjQuMjlaIi8+PC9nPjwvZz48L3N2Zz4='
};
(0, _react.storiesOf)('components/Assets/Asset', module).addDecorator(function (story) {
  return _react2.default.createElement("div", {
    style: {
      width: '215px'
    }
  }, story());
}).add('airplane', function () {
  return _react2.default.createElement(_asset.Asset, {
    asset: AIRPLANE,
    onCreate: (0, _addonActions.action)('onCreate'),
    onCopy: (0, _addonActions.action)('onCopy'),
    onDelete: (0, _addonActions.action)('onDelete')
  });
}).add('marker', function () {
  return _react2.default.createElement(_asset.Asset, {
    asset: MARKER,
    onCreate: (0, _addonActions.action)('onCreate'),
    onCopy: (0, _addonActions.action)('onCopy'),
    onDelete: (0, _addonActions.action)('onDelete')
  });
});
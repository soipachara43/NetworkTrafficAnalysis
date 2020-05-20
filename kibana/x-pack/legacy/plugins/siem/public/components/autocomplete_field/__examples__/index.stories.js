"use strict";

var React = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _styledComponents = require("styled-components");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _public = require("../../../../../../../../src/plugins/data/public");

var _suggestion_item = require("../suggestion_item");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var suggestion = {
  description: 'Description...',
  end: 3,
  start: 1,
  text: 'Text...',
  type: _public.QuerySuggestionTypes.Value
};
(0, _react2.storiesOf)('components/SuggestionItem', module).add('example', function () {
  return React.createElement(_styledComponents.ThemeProvider, {
    theme: function theme() {
      return {
        eui: _eui_theme_light.default,
        darkMode: false
      };
    }
  }, React.createElement(_suggestion_item.SuggestionItem, {
    suggestion: suggestion
  }));
});
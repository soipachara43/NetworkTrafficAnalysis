"use strict";

var _eui = require("@elastic/eui");

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _readable_color = require("../../../lib/readable_color");

var _color_dot = require("../../color_dot");

var _item_grid = require("../item_grid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('components/ItemGrid', module).add('simple grid', function () {
  return _react2.default.createElement(_item_grid.ItemGrid, {
    items: ['a', 'b', 'c'],
    children: function children(item) {
      return _react2.default.createElement("div", {
        key: item
      }, item);
    }
  });
}).add('icon grid', function () {
  return _react2.default.createElement(_item_grid.ItemGrid, {
    items: ['plusInCircle', 'minusInCircle', 'check'],
    children: function children(item) {
      return _react2.default.createElement(_eui.EuiIcon, {
        key: item,
        type: item
      });
    }
  });
}).add('color dot grid', function () {
  return _react2.default.createElement(_item_grid.ItemGrid, {
    items: ['#fff', '#666', '#000']
  }, function (item) {
    return _react2.default.createElement(_color_dot.ColorDot, {
      key: item,
      value: item
    });
  });
}).add('complex grid', function () {
  return _react2.default.createElement(_item_grid.ItemGrid, {
    items: [{
      color: '#fff',
      icon: 'plusInCircle'
    }, {
      color: '#666',
      icon: 'minusInCircle'
    }, {
      color: '#000',
      icon: 'check'
    }]
  }, function (item) {
    return _react2.default.createElement(_color_dot.ColorDot, {
      key: item.color,
      value: item.color
    }, _react2.default.createElement(_eui.EuiIcon, {
      type: item.icon,
      color: (0, _readable_color.readableColor)(item.color)
    }));
  });
});
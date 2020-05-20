"use strict";

var _eui = require("@elastic/eui");

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _color_dot = require("../color_dot");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('components/Color/ColorDot', module).addParameters({
  info: {
    propTablesExclude: [_eui.EuiIcon]
  }
}).add('color dots', function () {
  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_color_dot.ColorDot, {
    key: "1",
    value: "white"
  }), _react2.default.createElement(_color_dot.ColorDot, {
    key: "2",
    value: "#000"
  }), _react2.default.createElement(_color_dot.ColorDot, {
    key: "3",
    value: "#abcd"
  }), _react2.default.createElement(_color_dot.ColorDot, {
    key: "4",
    value: "#aabbcc"
  }), _react2.default.createElement(_color_dot.ColorDot, {
    key: "5",
    value: "#aabbccdd"
  }), _react2.default.createElement(_color_dot.ColorDot, {
    key: "6",
    value: "rgb(100, 150, 250)"
  }), _react2.default.createElement(_color_dot.ColorDot, {
    key: "7",
    value: "rgba(100, 150, 250, .5)"
  }));
}).add('invalid dots', function () {
  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_color_dot.ColorDot, {
    key: "1",
    value: "elastic"
  }), _react2.default.createElement(_color_dot.ColorDot, {
    key: "2",
    value: "#xyz"
  }), _react2.default.createElement(_color_dot.ColorDot, {
    key: "3",
    value: "#ghij"
  }), _react2.default.createElement(_color_dot.ColorDot, {
    key: "4",
    value: "#canvas"
  }), _react2.default.createElement(_color_dot.ColorDot, {
    key: "5",
    value: "#12345xyz"
  }), _react2.default.createElement(_color_dot.ColorDot, {
    key: "6",
    value: "rgb(a,b,c)"
  }), _react2.default.createElement(_color_dot.ColorDot, {
    key: "7",
    value: "rgba(w,x,y,z)"
  }));
}).add('color dots with children', function () {
  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_color_dot.ColorDot, {
    key: "1",
    value: "#FFF"
  }, _react2.default.createElement(_eui.EuiIcon, {
    type: "plusInCircle",
    color: "#000"
  })), _react2.default.createElement(_color_dot.ColorDot, {
    key: "2",
    value: "#666"
  }, _react2.default.createElement(_eui.EuiIcon, {
    type: "minusInCircle",
    color: "#fff"
  })), _react2.default.createElement(_color_dot.ColorDot, {
    key: "3",
    value: "rgba(100, 150, 250, .5)"
  }, _react2.default.createElement(_eui.EuiIcon, {
    type: "alert",
    color: "#fff"
  })), _react2.default.createElement(_color_dot.ColorDot, {
    key: "4",
    value: "#000"
  }, _react2.default.createElement(_eui.EuiIcon, {
    type: "check",
    color: "#fff"
  })));
});
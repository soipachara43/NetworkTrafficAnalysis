"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArgAddPopover = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _popover = require("../popover");

var _arg_add = require("../arg_add");

var _i18n = require("../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local
// @ts-ignore untyped local
var strings = _i18n.ComponentStrings.ArgAddPopover;

var ArgAddPopover = function ArgAddPopover(_ref) {
  var options = _ref.options;

  var button = function button(handleClick) {
    return _react.default.createElement(_eui.EuiButtonIcon, {
      iconType: "plusInCircle",
      "aria-label": strings.getAddAriaLabel(),
      onClick: handleClick,
      className: "canvasArg__addArg"
    });
  };

  return _react.default.createElement(_popover.Popover, {
    id: "arg-add-popover",
    panelClassName: "canvasArg__addPopover",
    panelPaddingSize: "none",
    button: button
  }, function (_ref2) {
    var closePopover = _ref2.closePopover;
    return options.map(function (opt) {
      return _react.default.createElement(_arg_add.ArgAdd, {
        key: "".concat(opt.arg.name, "-add"),
        displayName: opt.arg.displayName,
        help: opt.arg.help,
        onValueAdd: function onValueAdd() {
          opt.onValueAdd();
          closePopover();
        }
      });
    });
  });
};

exports.ArgAddPopover = ArgAddPopover;
ArgAddPopover.propTypes = {
  options: _propTypes.default.array.isRequired
};
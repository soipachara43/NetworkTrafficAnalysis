"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkpadShortcuts = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _workpad_shortcuts = require("./workpad_shortcuts");

var _element_handler_creators = require("../../lib/element_handler_creators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var WorkpadShortcuts = (0, _recompose.compose)((0, _recompose.withHandlers)(_element_handler_creators.groupHandlerCreators), (0, _recompose.withHandlers)(_element_handler_creators.layerHandlerCreators), (0, _recompose.withHandlers)(_element_handler_creators.basicHandlerCreators), (0, _recompose.withHandlers)(_element_handler_creators.clipboardHandlerCreators), (0, _recompose.withHandlers)(_element_handler_creators.positionHandlerCreators))(_workpad_shortcuts.WorkpadShortcuts);
exports.WorkpadShortcuts = WorkpadShortcuts;
WorkpadShortcuts.propTypes = {
  pageId: _propTypes.default.string.isRequired,
  selectedNodes: _propTypes.default.arrayOf(_propTypes.default.object),
  elementLayer: _propTypes.default.func.isRequired,
  insertNodes: _propTypes.default.func.isRequired,
  removeNodes: _propTypes.default.func.isRequired,
  selectToplevelNodes: _propTypes.default.func.isRequired,
  commit: _propTypes.default.func.isRequired
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zeekRowRenderer = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _row_renderer = require("../row_renderer");

var _zeek_details = require("./zeek_details");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var zeekRowRenderer = {
  isInstance: function isInstance(ecs) {
    var module = (0, _fp.get)('event.module[0]', ecs);
    return module != null && module.toLowerCase() === 'zeek';
  },
  renderRow: function renderRow(_ref) {
    var browserFields = _ref.browserFields,
        data = _ref.data,
        timelineId = _ref.timelineId;
    return _react.default.createElement(_row_renderer.RowRendererContainer, null, _react.default.createElement(_zeek_details.ZeekDetails, {
      data: data,
      browserFields: browserFields,
      timelineId: timelineId
    }));
  }
};
exports.zeekRowRenderer = zeekRowRenderer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suricataRowRenderer = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _row_renderer = require("../row_renderer");

var _suricata_details = require("./suricata_details");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var suricataRowRenderer = {
  isInstance: function isInstance(ecs) {
    var module = (0, _fp.get)('event.module[0]', ecs);
    return module != null && module.toLowerCase() === 'suricata';
  },
  renderRow: function renderRow(_ref) {
    var browserFields = _ref.browserFields,
        data = _ref.data,
        timelineId = _ref.timelineId;
    return _react.default.createElement(_row_renderer.RowRendererContainer, null, _react.default.createElement(_suricata_details.SuricataDetails, {
      data: data,
      browserFields: browserFields,
      timelineId: timelineId
    }));
  }
};
exports.suricataRowRenderer = suricataRowRenderer;
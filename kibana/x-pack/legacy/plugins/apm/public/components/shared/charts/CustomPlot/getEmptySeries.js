"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmptySeries = void 0;

var _d = _interopRequireDefault(require("d3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getEmptySeries = function getEmptySeries() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now() - 3600000;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.now();

  var dates = _d.default.time.scale().domain([new Date(start), new Date(end)]).ticks();

  return [{
    title: '',
    type: 'line',
    legendValue: '',
    color: '',
    data: dates.map(function (x) {
      return {
        x: x.getTime(),
        y: null
      };
    })
  }];
};

exports.getEmptySeries = getEmptySeries;
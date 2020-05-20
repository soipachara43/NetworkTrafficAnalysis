"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timelines = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactApollo = require("react-apollo");

var _timelines_page = require("./timelines_page");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Timelines = _react.default.memo(function () {
  return _react.default.createElement(_reactApollo.ApolloConsumer, null, function (client) {
    return _react.default.createElement(_timelines_page.TimelinesPage, {
      apolloClient: client
    });
  });
});

exports.Timelines = Timelines;
Timelines.displayName = 'Timelines';
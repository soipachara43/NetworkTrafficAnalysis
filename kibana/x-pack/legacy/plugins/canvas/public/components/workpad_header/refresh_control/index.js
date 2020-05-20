"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshControl = void 0;

var _reactRedux = require("react-redux");

var _elements = require("../../../state/actions/elements");

var _resolved_args = require("../../../state/selectors/resolved_args");

var _refresh_control = require("./refresh_control");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local
// @ts-ignore untyped local
var mapStateToProps = function mapStateToProps(state) {
  return {
    inFlight: (0, _resolved_args.getInFlight)(state)
  };
};

var mapDispatchToProps = {
  doRefresh: _elements.fetchAllRenderables
};
var RefreshControl = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_refresh_control.RefreshControl);
exports.RefreshControl = RefreshControl;
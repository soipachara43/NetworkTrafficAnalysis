"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetUrlSearch = void 0;

var _fp = require("lodash/fp");

var _react = require("react");

var _reactRedux = require("react-redux");

var _helpers = require("../url_state/helpers");

var _helpers2 = require("./helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useGetUrlSearch = function useGetUrlSearch(tab) {
  var mapState = (0, _helpers.makeMapStateToProps)();

  var _useSelector = (0, _reactRedux.useSelector)(mapState, _fp.isEqual),
      urlState = _useSelector.urlState;

  var urlSearch = (0, _react.useMemo)(function () {
    return (0, _helpers2.getSearch)(tab, urlState);
  }, [tab, urlState]);
  return urlSearch;
};

exports.useGetUrlSearch = useGetUrlSearch;
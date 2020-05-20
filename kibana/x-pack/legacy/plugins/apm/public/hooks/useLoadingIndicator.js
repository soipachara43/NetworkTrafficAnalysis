"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLoadingIndicator = useLoadingIndicator;

var _react = require("react");

var _LoadingIndicatorContext = require("../context/LoadingIndicatorContext");

var _useComponentId = require("./useComponentId");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useLoadingIndicator() {
  var _useContext = (0, _react.useContext)(_LoadingIndicatorContext.LoadingIndicatorContext),
      dispatchStatus = _useContext.dispatchStatus;

  var id = (0, _useComponentId.useComponentId)();
  (0, _react.useEffect)(function () {
    return function () {
      dispatchStatus({
        id: id,
        isLoading: false
      });
    };
  }, [dispatchStatus, id]);
  return (0, _react.useMemo)(function () {
    return {
      setIsLoading: function setIsLoading(loading) {
        dispatchStatus({
          id: id,
          isLoading: loading
        });
      }
    };
  }, [dispatchStatus, id]);
}
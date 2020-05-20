"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventDetailsWidthProvider = exports.useEventDetailsWidthContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EventDetailsWidthContext = (0, _react.createContext)(0);

var useEventDetailsWidthContext = function useEventDetailsWidthContext() {
  return (0, _react.useContext)(EventDetailsWidthContext);
};

exports.useEventDetailsWidthContext = useEventDetailsWidthContext;

var EventDetailsWidthProvider = _react.default.memo(function (_ref) {
  var children = _ref.children;

  var _useThrottledResizeOb = (0, _utils.useThrottledResizeObserver)(),
      ref = _useThrottledResizeOb.ref,
      width = _useThrottledResizeOb.width;

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(EventDetailsWidthContext.Provider, {
    value: width
  }, children), _react.default.createElement("div", {
    ref: ref
  }));
});

exports.EventDetailsWidthProvider = EventDetailsWidthProvider;
EventDetailsWidthProvider.displayName = 'EventDetailsWidthProvider';
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCanvasShareableState = exports.CanvasShareableStateProvider = exports.CanvasShareableContext = exports.initialCanvasShareableState = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reducer = require("./reducer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * The initial state for the Canvas Shareable Runtime.
 */
const initialCanvasShareableState = {
  renderers: {},
  workpad: null,
  stage: {
    page: 0,
    height: 400,
    width: 600
  },
  footer: {
    isScrubberVisible: false
  },
  settings: {
    autoplay: {
      isEnabled: false,
      interval: '5s'
    },
    toolbar: {
      isAutohide: false
    }
  },
  refs: {
    stage: _react.default.createRef()
  }
};
exports.initialCanvasShareableState = initialCanvasShareableState;
const CanvasShareableContext = (0, _react.createContext)([initialCanvasShareableState, () => {}]);
exports.CanvasShareableContext = CanvasShareableContext;

const CanvasShareableStateProvider = ({
  initialState,
  children
}) => _react.default.createElement(CanvasShareableContext.Provider, {
  value: (0, _react.useReducer)(_reducer.reducer, initialState)
}, children);

exports.CanvasShareableStateProvider = CanvasShareableStateProvider;

const useCanvasShareableState = () => (0, _react.useContext)(CanvasShareableContext);

exports.useCanvasShareableState = useCanvasShareableState;
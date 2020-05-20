"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockLayoutInstance = void 0;

var _layouts = require("../export_types/common/layouts");

var _constants = require("../export_types/common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createMockLayoutInstance = __LEGACY => {
  const mockLayout = (0, _layouts.createLayout)(__LEGACY, {
    id: _constants.LayoutTypes.PRESERVE_LAYOUT,
    dimensions: {
      height: 12,
      width: 12
    }
  });
  mockLayout.selectors = {
    renderComplete: 'renderedSelector',
    itemsCountAttribute: 'itemsSelector',
    screenshot: 'screenshotSelector',
    timefilterDurationAttribute: 'timefilterDurationSelector'
  };
  return mockLayout;
};

exports.createMockLayoutInstance = createMockLayoutInstance;
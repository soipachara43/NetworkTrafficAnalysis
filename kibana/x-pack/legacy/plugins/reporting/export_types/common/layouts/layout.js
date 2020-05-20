"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = exports.getDefaultLayoutSelectors = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getDefaultLayoutSelectors = () => ({
  screenshot: '[data-shared-items-container]',
  renderComplete: '[data-shared-item]',
  itemsCountAttribute: 'data-shared-items-count',
  timefilterDurationAttribute: 'data-shared-timefilter-duration'
});

exports.getDefaultLayoutSelectors = getDefaultLayoutSelectors;

class Layout {
  constructor(id) {
    _defineProperty(this, "id", '');

    this.id = id;
  }

}

exports.Layout = Layout;
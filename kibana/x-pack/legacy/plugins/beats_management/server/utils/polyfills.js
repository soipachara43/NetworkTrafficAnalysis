"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.entries = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const entries = obj => {
  const ownProps = Object.keys(obj);
  let i = ownProps.length;
  const resArray = new Array(i); // preallocate the Array

  while (i--) {
    resArray[i] = [ownProps[i], obj[ownProps[i]]];
  }

  return resArray;
};

exports.entries = entries;
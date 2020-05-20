"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGenericData = exports.getDnsParsedData = void 0;

var _fp = require("lodash/fp");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getDnsParsedData = (data, keyBucket) => {
  let result = [];
  data.forEach(bucketData => {
    const time = (0, _fp.get)('key', bucketData);
    const histData = (0, _fp.getOr)([], keyBucket, bucketData).map(({
      key,
      doc_count
    }) => ({
      x: time,
      y: doc_count,
      g: key
    }));
    result = [...result, ...histData];
  });
  return result;
};

exports.getDnsParsedData = getDnsParsedData;

const getGenericData = (data, keyBucket) => {
  let result = [];
  data.forEach(bucketData => {
    const group = (0, _fp.get)('key', bucketData);
    const histData = (0, _fp.getOr)([], keyBucket, bucketData).map(({
      key,
      doc_count
    }) => ({
      x: key,
      y: doc_count,
      g: group
    }));
    result = [...result, ...histData];
  });
  return result;
};

exports.getGenericData = getGenericData;
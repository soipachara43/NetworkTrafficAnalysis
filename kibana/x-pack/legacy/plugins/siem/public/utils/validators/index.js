"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUrlInvalid = void 0;

var _fp = require("lodash/fp");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var urlExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

var isUrlInvalid = function isUrlInvalid(url) {
  if (!(0, _fp.isEmpty)(url) && url != null && url.match(urlExpression) == null) {
    return true;
  }

  return false;
};

exports.isUrlInvalid = isUrlInvalid;
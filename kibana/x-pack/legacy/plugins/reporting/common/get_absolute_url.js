"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAbsoluteUrlFactory = void 0;

var _url = _interopRequireDefault(require("url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getAbsoluteUrlFactory = ({
  protocol,
  hostname,
  port,
  defaultBasePath
}) => {
  return function getAbsoluteUrl({
    basePath = defaultBasePath,
    hash = '',
    path = '/app/kibana',
    search = ''
  } = {}) {
    return _url.default.format({
      protocol,
      hostname,
      port,
      pathname: basePath + path,
      hash,
      search
    });
  };
};

exports.getAbsoluteUrlFactory = getAbsoluteUrlFactory;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.download = download;

var _fs = require("fs");

var _crypto = require("crypto");

var _path = require("path");

var _axios = _interopRequireDefault(require("axios"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Download a url and calculate it's checksum
 * @param  {String} url
 * @param  {String} path
 * @return {Promise<String>} checksum of the downloaded file
 */
async function download(url, path) {
  (0, _util.log)(`Downloading ${url}`);
  const hash = (0, _crypto.createHash)('md5');
  (0, _fs.mkdirSync)((0, _path.dirname)(path), {
    recursive: true
  });
  const handle = (0, _fs.openSync)(path, 'w');

  try {
    const resp = await _axios.default.request({
      url,
      method: 'GET',
      responseType: 'stream'
    });
    resp.data.on('data', chunk => {
      (0, _fs.writeSync)(handle, chunk);
      hash.update(chunk);
    });
    await new Promise((resolve, reject) => {
      resp.data.on('error', reject).on('end', resolve);
    });
  } finally {
    (0, _fs.closeSync)(handle);
  }

  return hash.digest('hex');
}
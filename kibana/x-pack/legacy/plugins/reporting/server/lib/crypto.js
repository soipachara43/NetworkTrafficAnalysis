"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cryptoFactory = void 0;

var _nodeCrypto = _interopRequireDefault(require("@elastic/node-crypto"));

var _once_per_server = require("./once_per_server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function cryptoFn(server) {
  const encryptionKey = server.config().get('xpack.reporting.encryptionKey');
  return (0, _nodeCrypto.default)({
    encryptionKey
  });
}

const cryptoFactory = (0, _once_per_server.oncePerServer)(cryptoFn);
exports.cryptoFactory = cryptoFactory;
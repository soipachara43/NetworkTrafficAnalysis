"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuntimeFrameworkUser = exports.RuntimeFrameworkInfo = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _security = require("./../../../../common/constants/security");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/no-empty-interface */
var RuntimeFrameworkInfo = t.type({
  basePath: t.string,
  license: t.type({
    type: t.keyof(Object.fromEntries(_security.LICENSES.map(function (s) {
      return [s, null];
    }))),
    expired: t.boolean,
    expiry_date_in_millis: t.number
  }),
  security: t.type({
    enabled: t.boolean,
    available: t.boolean
  }),
  settings: t.type({
    encryptionKey: t.string,
    enrollmentTokensTtlInSeconds: t.number,
    defaultUserRoles: t.array(t.string)
  })
});
exports.RuntimeFrameworkInfo = RuntimeFrameworkInfo;
var RuntimeFrameworkUser = t.interface({
  username: t.string,
  roles: t.array(t.string),
  full_name: t.union([t.null, t.string]),
  email: t.union([t.null, t.string]),
  enabled: t.boolean
}, 'FrameworkUser');
exports.RuntimeFrameworkUser = RuntimeFrameworkUser;
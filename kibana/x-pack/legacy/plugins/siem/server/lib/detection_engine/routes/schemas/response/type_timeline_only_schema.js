"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeAndTimelineOnlySchema = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _schemas = require("./schemas");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/camelcase */

/* eslint-enable @typescript-eslint/camelcase */

/**
 * Special schema type that is only the type and the timeline_id.
 * This is used for dependent type checking only.
 */
const typeAndTimelineOnlySchema = t.intersection([t.exact(t.type({
  type: _schemas.type
})), t.exact(t.partial({
  timeline_id: _schemas.timeline_id
}))]);
exports.typeAndTimelineOnlySchema = typeAndTimelineOnlySchema;
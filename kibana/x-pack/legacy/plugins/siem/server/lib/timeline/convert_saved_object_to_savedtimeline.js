"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertSavedObjectToSavedTimeline = void 0;

var _PathReporter = require("io-ts/lib/PathReporter");

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _types = require("./types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const convertSavedObjectToSavedTimeline = savedObject => {
  const timeline = (0, _pipeable.pipe)(_types.TimelineSavedObjectRuntimeType.decode(savedObject), (0, _Either.map)(savedTimeline => ({
    savedObjectId: savedTimeline.id,
    version: savedTimeline.version,
    ...savedTimeline.attributes
  })), (0, _Either.fold)(errors => {
    throw new Error((0, _PathReporter.failure)(errors).join('\n'));
  }, _function.identity));
  return timeline;
};

exports.convertSavedObjectToSavedTimeline = convertSavedObjectToSavedTimeline;
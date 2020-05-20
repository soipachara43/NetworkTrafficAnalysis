"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickSavedTimeline = void 0;

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const pickSavedTimeline = (timelineId, savedTimeline, userInfo) => {
  const dateNow = new Date().valueOf();

  if (timelineId == null) {
    var _ref, _ref2;

    savedTimeline.created = dateNow;
    savedTimeline.createdBy = (_ref = userInfo === null || userInfo === void 0 ? void 0 : userInfo.username) !== null && _ref !== void 0 ? _ref : _constants.UNAUTHENTICATED_USER;
    savedTimeline.updated = dateNow;
    savedTimeline.updatedBy = (_ref2 = userInfo === null || userInfo === void 0 ? void 0 : userInfo.username) !== null && _ref2 !== void 0 ? _ref2 : _constants.UNAUTHENTICATED_USER;
  } else if (timelineId != null) {
    var _ref3;

    savedTimeline.updated = dateNow;
    savedTimeline.updatedBy = (_ref3 = userInfo === null || userInfo === void 0 ? void 0 : userInfo.username) !== null && _ref3 !== void 0 ? _ref3 : _constants.UNAUTHENTICATED_USER;
  }

  return savedTimeline;
};

exports.pickSavedTimeline = pickSavedTimeline;
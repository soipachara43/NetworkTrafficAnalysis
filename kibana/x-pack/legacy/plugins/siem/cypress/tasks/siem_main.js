"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openTimelineIfClosed = exports.openTimeline = void 0;

var _siem_main = require("../screens/siem_main");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const openTimeline = () => {
  cy.get(_siem_main.TIMELINE_TOGGLE_BUTTON).click();
};

exports.openTimeline = openTimeline;

const openTimelineIfClosed = () => {
  cy.get(_siem_main.MAIN_PAGE).then($page => {
    if ($page.find(_siem_main.TIMELINE_TOGGLE_BUTTON).length === 1) {
      openTimeline();
    }
  });
};

exports.openTimelineIfClosed = openTimelineIfClosed;
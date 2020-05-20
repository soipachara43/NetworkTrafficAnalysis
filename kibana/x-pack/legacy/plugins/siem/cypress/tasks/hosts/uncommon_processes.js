"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForUncommonProcessesToBeLoaded = void 0;

var _uncommon_processes = require("../../screens/hosts/uncommon_processes");

var _siem_header = require("../../screens/siem_header");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const waitForUncommonProcessesToBeLoaded = () => {
  cy.get(_uncommon_processes.UNCOMMON_PROCESSES_TABLE).should('exist');
  cy.get(_siem_header.REFRESH_BUTTON).invoke('text').should('not.equal', 'Updating');
};

exports.waitForUncommonProcessesToBeLoaded = waitForUncommonProcessesToBeLoaded;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForAllHostsToBeLoaded = exports.openFirstHostDetails = exports.dragFirstHostToTimeline = exports.dragFirstHostToEmptyTimelineDataProviders = exports.dragAndDropFirstHostToTimeline = void 0;

var _all_hosts = require("../../screens/hosts/all_hosts");

var _timeline = require("../../screens/timeline");

var _common = require("../../tasks/common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const dragAndDropFirstHostToTimeline = () => {
  cy.get(_all_hosts.HOSTS_NAMES_DRAGGABLE).first().then(firstHost => (0, _common.drag)(firstHost));
  cy.get(_timeline.TIMELINE_DATA_PROVIDERS).then(dataProvidersDropArea => (0, _common.drop)(dataProvidersDropArea));
};

exports.dragAndDropFirstHostToTimeline = dragAndDropFirstHostToTimeline;

const dragFirstHostToEmptyTimelineDataProviders = () => {
  cy.get(_all_hosts.HOSTS_NAMES_DRAGGABLE).first().then(host => (0, _common.drag)(host));
  cy.get(_timeline.TIMELINE_DATA_PROVIDERS_EMPTY).then(dataProvidersDropArea => (0, _common.dragWithoutDrop)(dataProvidersDropArea));
};

exports.dragFirstHostToEmptyTimelineDataProviders = dragFirstHostToEmptyTimelineDataProviders;

const dragFirstHostToTimeline = () => {
  cy.get(_all_hosts.HOSTS_NAMES_DRAGGABLE).first().then(host => (0, _common.drag)(host));
};

exports.dragFirstHostToTimeline = dragFirstHostToTimeline;

const openFirstHostDetails = () => {
  cy.get(_all_hosts.HOSTS_NAMES).first().click({
    force: true
  });
};

exports.openFirstHostDetails = openFirstHostDetails;

const waitForAllHostsToBeLoaded = () => {
  cy.get(_all_hosts.ALL_HOSTS_TABLE).should('exist');
};

exports.waitForAllHostsToBeLoaded = waitForAllHostsToBeLoaded;
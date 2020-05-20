"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIMELINES_PAGE = exports.OVERVIEW_PAGE = exports.NETWORK_PAGE = exports.HOSTS_PAGE_TAB_URLS = exports.HOSTS_PAGE = exports.DETECTIONS = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const DETECTIONS = 'app/siem#/detections';
exports.DETECTIONS = DETECTIONS;
const HOSTS_PAGE = '/app/siem#/hosts/allHosts';
exports.HOSTS_PAGE = HOSTS_PAGE;
const HOSTS_PAGE_TAB_URLS = {
  allHosts: '/app/siem#/hosts/allHosts',
  anomalies: '/app/siem#/hosts/anomalies',
  authentications: '/app/siem#/hosts/authentications',
  events: '/app/siem#/hosts/events',
  uncommonProcesses: '/app/siem#/hosts/uncommonProcesses'
};
exports.HOSTS_PAGE_TAB_URLS = HOSTS_PAGE_TAB_URLS;
const NETWORK_PAGE = '/app/siem#/network';
exports.NETWORK_PAGE = NETWORK_PAGE;
const OVERVIEW_PAGE = '/app/siem#/overview';
exports.OVERVIEW_PAGE = OVERVIEW_PAGE;
const TIMELINES_PAGE = '/app/siem#/timelines';
exports.TIMELINES_PAGE = TIMELINES_PAGE;
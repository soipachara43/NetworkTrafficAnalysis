"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RANKED_LICENSE_TYPES = exports.LICENSE_TYPE_TRIAL = exports.LICENSE_TYPE_ENTERPRISE = exports.LICENSE_TYPE_PLATINUM = exports.LICENSE_TYPE_GOLD = exports.LICENSE_TYPE_STANDARD = exports.LICENSE_TYPE_BASIC = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const LICENSE_TYPE_BASIC = 'basic';
exports.LICENSE_TYPE_BASIC = LICENSE_TYPE_BASIC;
const LICENSE_TYPE_STANDARD = 'standard';
exports.LICENSE_TYPE_STANDARD = LICENSE_TYPE_STANDARD;
const LICENSE_TYPE_GOLD = 'gold';
exports.LICENSE_TYPE_GOLD = LICENSE_TYPE_GOLD;
const LICENSE_TYPE_PLATINUM = 'platinum';
exports.LICENSE_TYPE_PLATINUM = LICENSE_TYPE_PLATINUM;
const LICENSE_TYPE_ENTERPRISE = 'enterprise';
exports.LICENSE_TYPE_ENTERPRISE = LICENSE_TYPE_ENTERPRISE;
const LICENSE_TYPE_TRIAL = 'trial';
exports.LICENSE_TYPE_TRIAL = LICENSE_TYPE_TRIAL;
// These are ordered from least featureful to most featureful, so we can assume that someone holding
// a license at a particular index cannot access any features unlocked by the licenses that follow it.
const RANKED_LICENSE_TYPES = [LICENSE_TYPE_BASIC, LICENSE_TYPE_STANDARD, LICENSE_TYPE_GOLD, LICENSE_TYPE_PLATINUM, LICENSE_TYPE_ENTERPRISE, LICENSE_TYPE_TRIAL];
exports.RANKED_LICENSE_TYPES = RANKED_LICENSE_TYPES;
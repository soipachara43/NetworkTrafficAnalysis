"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TACTIC_PLACEHOLDER = exports.TECHNIQUES_PLACEHOLDER = exports.ADD_MITRE_ATTACK = exports.TECHNIQUE = exports.TACTIC = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TACTIC = _i18n.i18n.translate('xpack.siem.detectionEngine.mitreAttack.tacticsDescription', {
  defaultMessage: 'tactic'
});

exports.TACTIC = TACTIC;

var TECHNIQUE = _i18n.i18n.translate('xpack.siem.detectionEngine.mitreAttack.techniquesDescription', {
  defaultMessage: 'techniques'
});

exports.TECHNIQUE = TECHNIQUE;

var ADD_MITRE_ATTACK = _i18n.i18n.translate('xpack.siem.detectionEngine.mitreAttack.addTitle', {
  defaultMessage: "Add MITRE ATT&CK\\u2122 threat"
});

exports.ADD_MITRE_ATTACK = ADD_MITRE_ATTACK;

var TECHNIQUES_PLACEHOLDER = _i18n.i18n.translate('xpack.siem.detectionEngine.mitreAttack.techniquesPlaceHolderDescription', {
  defaultMessage: 'Select techniques ...'
});

exports.TECHNIQUES_PLACEHOLDER = TECHNIQUES_PLACEHOLDER;

var TACTIC_PLACEHOLDER = _i18n.i18n.translate('xpack.siem.detectionEngine.mitreAttack.tacticPlaceHolderDescription', {
  defaultMessage: 'Select tactic ...'
});

exports.TACTIC_PLACEHOLDER = TACTIC_PLACEHOLDER;
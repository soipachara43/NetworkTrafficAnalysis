"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BIDIRECTIONAL = exports.UNIDIRECTIONAL = exports.SERVER = exports.CLIENT = exports.DESTINATION = exports.SOURCE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SOURCE = _i18n.i18n.translate('xpack.siem.components.flowControls.selectFlowTarget.sourceDropDownOptionLabel', {
  defaultMessage: 'Source'
});

exports.SOURCE = SOURCE;

var DESTINATION = _i18n.i18n.translate('xpack.siem.components.flowControls.selectFlowTarget.destinationDropDownOptionLabel', {
  defaultMessage: 'Destination'
});

exports.DESTINATION = DESTINATION;

var CLIENT = _i18n.i18n.translate('xpack.siem.components.flowControls.selectFlowTarget.clientDropDownOptionLabel', {
  defaultMessage: 'CLIENT'
});

exports.CLIENT = CLIENT;

var SERVER = _i18n.i18n.translate('xpack.siem.components.flowControls.selectFlowTarget.serverDropDownOptionLabel', {
  defaultMessage: 'SERVER'
});

exports.SERVER = SERVER;

var UNIDIRECTIONAL = _i18n.i18n.translate('xpack.siem.components.flowControls.selectFlowDirection.unidirectionalButtonLabel', {
  defaultMessage: 'Unidirectional'
});

exports.UNIDIRECTIONAL = UNIDIRECTIONAL;

var BIDIRECTIONAL = _i18n.i18n.translate('xpack.siem.components.flowControls.selectFlowDirection.bidirectionalButtonLabel', {
  defaultMessage: 'Bidirectional'
});

exports.BIDIRECTIONAL = BIDIRECTIONAL;
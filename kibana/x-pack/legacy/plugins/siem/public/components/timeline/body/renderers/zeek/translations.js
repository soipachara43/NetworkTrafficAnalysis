"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OTH = exports.SHR = exports.SH = exports.RSTRH = exports.RSTOS0 = exports.RSTR = exports.RSTO = exports.REJ = exports.SF = exports.S3 = exports.S2 = exports.S1 = exports.S0 = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// English Text for these codes are shortened from
// https://docs.zeek.org/en/stable/scripts/base/protocols/conn/main.bro.html
var S0 = _i18n.i18n.translate('xpack.siem.zeek.s0Description', {
  defaultMessage: 'Connection attempt seen, no reply'
});

exports.S0 = S0;

var S1 = _i18n.i18n.translate('xpack.siem.zeek.s1Description', {
  defaultMessage: 'Connection established, not terminated'
});

exports.S1 = S1;

var S2 = _i18n.i18n.translate('xpack.siem.zeek.s2Description', {
  defaultMessage: 'Connection established and close attempt by originator seen (but no reply from responder)'
});

exports.S2 = S2;

var S3 = _i18n.i18n.translate('xpack.siem.zeek.s3Description', {
  defaultMessage: 'Connection established and close attempt by responder seen (but no reply from originator)'
});

exports.S3 = S3;

var SF = _i18n.i18n.translate('xpack.siem.zeek.sfDescription', {
  defaultMessage: 'Normal SYN/FIN completion'
});

exports.SF = SF;

var REJ = _i18n.i18n.translate('xpack.siem.zeek.rejDescription', {
  defaultMessage: 'Connection attempt rejected'
});

exports.REJ = REJ;

var RSTO = _i18n.i18n.translate('xpack.siem.zeek.rstoODescription', {
  defaultMessage: 'Connection established, originator aborted (sent a RST)'
});

exports.RSTO = RSTO;

var RSTR = _i18n.i18n.translate('xpack.siem.zeek.rstrDescription', {
  defaultMessage: 'Established, responder aborted'
});

exports.RSTR = RSTR;

var RSTOS0 = _i18n.i18n.translate('xpack.siem.zeek.rstosoDescription', {
  defaultMessage: 'Originator sent a SYN followed by a RST, no SYN-ACK from the responder'
});

exports.RSTOS0 = RSTOS0;

var RSTRH = _i18n.i18n.translate('xpack.siem.zeek.rstrhDescription', {
  defaultMessage: 'Responder sent a SYN ACK followed by a RST, no SYN from the (purported) originator'
});

exports.RSTRH = RSTRH;

var SH = _i18n.i18n.translate('xpack.siem.zeek.shDescription', {
  defaultMessage: 'Originator sent a SYN followed by a FIN, no SYN ACK from the responder'
});

exports.SH = SH;

var SHR = _i18n.i18n.translate('xpack.siem.zeek.shrDescription', {
  defaultMessage: 'Responder sent a SYN ACK followed by a FIN, no SYN from the originator'
});

exports.SHR = SHR;

var OTH = _i18n.i18n.translate('xpack.siem.zeek.othDescription', {
  defaultMessage: 'No SYN seen, just midstream traffic'
});

exports.OTH = OTH;
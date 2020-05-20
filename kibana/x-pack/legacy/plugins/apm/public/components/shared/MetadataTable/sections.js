"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MESSAGE_SPAN = exports.MESSAGE_TRANSACTION = exports.CUSTOM_TRANSACTION = exports.CUSTOM_ERROR = exports.ERROR = exports.TRACE = exports.TRANSACTION = exports.SPAN = exports.PAGE = exports.USER_AGENT = exports.USER = exports.URL = exports.AGENT = exports.PROCESS = exports.SERVICE = exports.CONTAINER = exports.CLIENT = exports.HOST = exports.HTTP = exports.LABELS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LABELS = {
  key: 'labels',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.labelsLabel', {
    defaultMessage: 'Labels'
  })
};
exports.LABELS = LABELS;
var HTTP = {
  key: 'http',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.httpLabel', {
    defaultMessage: 'HTTP'
  })
};
exports.HTTP = HTTP;
var HOST = {
  key: 'host',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.hostLabel', {
    defaultMessage: 'Host'
  })
};
exports.HOST = HOST;
var CLIENT = {
  key: 'client',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.clientLabel', {
    defaultMessage: 'Client'
  }),
  properties: ['ip']
};
exports.CLIENT = CLIENT;
var CONTAINER = {
  key: 'container',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.containerLabel', {
    defaultMessage: 'Container'
  })
};
exports.CONTAINER = CONTAINER;
var SERVICE = {
  key: 'service',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.serviceLabel', {
    defaultMessage: 'Service'
  })
};
exports.SERVICE = SERVICE;
var PROCESS = {
  key: 'process',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.processLabel', {
    defaultMessage: 'Process'
  })
};
exports.PROCESS = PROCESS;
var AGENT = {
  key: 'agent',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.agentLabel', {
    defaultMessage: 'Agent'
  })
};
exports.AGENT = AGENT;
var URL = {
  key: 'url',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.urlLabel', {
    defaultMessage: 'URL'
  })
};
exports.URL = URL;
var USER = {
  key: 'user',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.userLabel', {
    defaultMessage: 'User'
  })
};
exports.USER = USER;
var USER_AGENT = {
  key: 'user_agent',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.userAgentLabel', {
    defaultMessage: 'User agent'
  })
};
exports.USER_AGENT = USER_AGENT;
var PAGE = {
  key: 'page',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.pageLabel', {
    defaultMessage: 'Page'
  })
};
exports.PAGE = PAGE;
var SPAN = {
  key: 'span',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.spanLabel', {
    defaultMessage: 'Span'
  }),
  properties: ['id']
};
exports.SPAN = SPAN;
var TRANSACTION = {
  key: 'transaction',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.transactionLabel', {
    defaultMessage: 'Transaction'
  }),
  properties: ['id']
};
exports.TRANSACTION = TRANSACTION;
var TRACE = {
  key: 'trace',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.traceLabel', {
    defaultMessage: 'Trace'
  })
};
exports.TRACE = TRACE;
var ERROR = {
  key: 'error',
  label: _i18n.i18n.translate('xpack.apm.metadataTable.section.errorLabel', {
    defaultMessage: 'Error'
  }),
  properties: ['id']
};
exports.ERROR = ERROR;

var customLabel = _i18n.i18n.translate('xpack.apm.metadataTable.section.customLabel', {
  defaultMessage: 'Custom'
});

var CUSTOM_ERROR = {
  key: 'error.custom',
  label: customLabel
};
exports.CUSTOM_ERROR = CUSTOM_ERROR;
var CUSTOM_TRANSACTION = {
  key: 'transaction.custom',
  label: customLabel
};
exports.CUSTOM_TRANSACTION = CUSTOM_TRANSACTION;

var messageLabel = _i18n.i18n.translate('xpack.apm.metadataTable.section.messageLabel', {
  defaultMessage: 'Message'
});

var MESSAGE_TRANSACTION = {
  key: 'transaction.message',
  label: messageLabel
};
exports.MESSAGE_TRANSACTION = MESSAGE_TRANSACTION;
var MESSAGE_SPAN = {
  key: 'span.message',
  label: messageLabel
};
exports.MESSAGE_SPAN = MESSAGE_SPAN;
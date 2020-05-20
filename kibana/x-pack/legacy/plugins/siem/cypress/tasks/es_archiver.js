"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.esArchiverResetKibana = exports.esArchiverUnloadEmptyKibana = exports.esArchiverUnload = exports.esArchiverLoad = exports.esArchiverLoadEmptyKibana = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const esArchiverLoadEmptyKibana = () => {
  cy.exec(`node ../../../../scripts/es_archiver empty_kibana load empty--dir ../../../test/siem_cypress/es_archives --config ../../../../test/functional/config.js --es-url ${Cypress.env('ELASTICSEARCH_URL')} --kibana-url ${Cypress.config().baseUrl}`);
};

exports.esArchiverLoadEmptyKibana = esArchiverLoadEmptyKibana;

const esArchiverLoad = folder => {
  cy.exec(`node ../../../../scripts/es_archiver load ${folder} --dir ../../../test/siem_cypress/es_archives --config ../../../../test/functional/config.js --es-url ${Cypress.env('ELASTICSEARCH_URL')} --kibana-url ${Cypress.config().baseUrl}`);
};

exports.esArchiverLoad = esArchiverLoad;

const esArchiverUnload = folder => {
  cy.exec(`node ../../../../scripts/es_archiver unload ${folder} --dir ../../../test/siem_cypress/es_archives --config ../../../../test/functional/config.js --es-url ${Cypress.env('ELASTICSEARCH_URL')} --kibana-url ${Cypress.config().baseUrl}`);
};

exports.esArchiverUnload = esArchiverUnload;

const esArchiverUnloadEmptyKibana = () => {
  cy.exec(`node ../../../../scripts/es_archiver unload empty_kibana empty--dir ../../../test/siem_cypress/es_archives --config ../../../../test/functional/config.js --es-url ${Cypress.env('ELASTICSEARCH_URL')} --kibana-url ${Cypress.config().baseUrl}`);
};

exports.esArchiverUnloadEmptyKibana = esArchiverUnloadEmptyKibana;

const esArchiverResetKibana = () => {
  cy.exec(`node ../../../../scripts/es_archiver empty-kibana-index --config ../../../../test/functional/config.js --es-url ${Cypress.env('ELASTICSEARCH_URL')} --kibana-url ${Cypress.config().baseUrl}`);
};

exports.esArchiverResetKibana = esArchiverResetKibana;
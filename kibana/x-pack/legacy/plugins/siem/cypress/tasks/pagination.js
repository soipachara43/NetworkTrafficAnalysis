"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goToThirdPage = exports.goToFirstPage = void 0;

var _pagination = require("../screens/pagination");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const goToFirstPage = () => {
  cy.get(_pagination.FIRST_PAGE_SELECTOR).click({
    force: true
  });
};

exports.goToFirstPage = goToFirstPage;

const goToThirdPage = () => {
  cy.get(_pagination.THIRD_PAGE_SELECTOR).click({
    force: true
  });
};

exports.goToThirdPage = goToThirdPage;
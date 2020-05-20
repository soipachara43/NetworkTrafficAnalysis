"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contractTests = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const contractTests = (testName, config) => {
  describe(testName, () => {
    let frameworkAdapter;
    beforeAll(config.before);
    afterAll(config.after);
    beforeEach(async () => {
      frameworkAdapter = config.adapterSetup();
    });
    it('Should have tests here', () => {
      expect(frameworkAdapter.info).toHaveProperty('server');
      expect(frameworkAdapter).toHaveProperty('server');
    });
  });
};

exports.contractTests = contractTests;
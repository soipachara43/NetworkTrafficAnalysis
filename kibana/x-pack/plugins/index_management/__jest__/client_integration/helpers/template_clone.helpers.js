"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = void 0;

var _test_utils = require("../../../../../test_utils");

var _constants = require("../../../common/constants");

var _template_clone = require("../../../public/application/sections/template_clone");

var _template_form = require("./template_form.helpers");

var _constants2 = require("./constants");

var _setup_environment = require("./setup_environment");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-line @kbn/eslint/no-restricted-paths
const testBedConfig = {
  memoryRouter: {
    initialEntries: [`${_constants.BASE_PATH}clone_template/${_constants2.TEMPLATE_NAME}`],
    componentRoutePath: `${_constants.BASE_PATH}clone_template/:name`
  },
  doMountAsync: true
};
const initTestBed = (0, _test_utils.registerTestBed)((0, _setup_environment.WithAppDependencies)(_template_clone.TemplateClone), testBedConfig);

const setup = _template_form.formSetup.bind(null, initTestBed);

exports.setup = setup;
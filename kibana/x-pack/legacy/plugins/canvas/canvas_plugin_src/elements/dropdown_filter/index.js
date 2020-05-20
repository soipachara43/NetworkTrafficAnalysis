"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropdownFilter = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const dropdownFilter = () => ({
  name: 'dropdown_filter',
  displayName: 'Dropdown filter',
  tags: ['filter'],
  help: 'A dropdown from which you can select values for an "exactly" filter',
  image: _header.default,
  height: 50,
  expression: `demodata
| dropdownControl valueColumn=project filterColumn=project | render`,
  filter: ''
});

exports.dropdownFilter = dropdownFilter;
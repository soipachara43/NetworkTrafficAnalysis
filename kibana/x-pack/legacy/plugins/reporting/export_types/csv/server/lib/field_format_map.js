"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldFormatMapFactory = fieldFormatMapFactory;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 *  Create a map of FieldFormat instances for index pattern fields
 *
 *  @param {Object} indexPatternSavedObject
 *  @param {FieldFormatsService} fieldFormats
 *  @return {Map} key: field name, value: FieldFormat instance
 */
function fieldFormatMapFactory(indexPatternSavedObject, fieldFormatsRegistry) {
  const formatsMap = new Map(); // Add FieldFormat instances for fields with custom formatters

  if (_lodash.default.has(indexPatternSavedObject, 'attributes.fieldFormatMap')) {
    const fieldFormatMap = JSON.parse(indexPatternSavedObject.attributes.fieldFormatMap);
    Object.keys(fieldFormatMap).forEach(fieldName => {
      const formatConfig = fieldFormatMap[fieldName];

      if (!_lodash.default.isEmpty(formatConfig)) {
        formatsMap.set(fieldName, fieldFormatsRegistry.getInstance(formatConfig.id, formatConfig.params));
      }
    });
  } // Add default FieldFormat instances for all other fields


  const indexFields = JSON.parse(_lodash.default.get(indexPatternSavedObject, 'attributes.fields', '[]'));
  indexFields.forEach(field => {
    if (!formatsMap.has(field.name)) {
      formatsMap.set(field.name, fieldFormatsRegistry.getDefaultInstance(field.type));
    }
  });
  return formatsMap;
}
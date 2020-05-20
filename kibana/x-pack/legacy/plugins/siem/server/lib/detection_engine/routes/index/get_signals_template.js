"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSignalsTemplate = void 0;

var _signals_mapping = _interopRequireDefault(require("./signals_mapping.json"));

var _ecs_mapping = _interopRequireDefault(require("./ecs_mapping.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getSignalsTemplate = index => {
  _ecs_mapping.default.mappings.properties.signal = _signals_mapping.default.mappings.properties.signal;
  const template = {
    settings: {
      index: {
        lifecycle: {
          name: index,
          rollover_alias: index
        }
      }
    },
    index_patterns: [`${index}-*`],
    mappings: _ecs_mapping.default.mappings
  };
  return template;
};

exports.getSignalsTemplate = getSignalsTemplate;
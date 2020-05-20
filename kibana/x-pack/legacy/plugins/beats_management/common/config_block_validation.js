"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateConfigurationBlocks = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _PathReporter = require("io-ts/lib/PathReporter");

var _Either = require("fp-ts/lib/Either");

var _config_schemas = require("./config_schemas");

var _domain_types = require("./domain_types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const validateConfigurationBlocks = configurationBlocks => {
  const validationMap = {
    isHosts: t.array(t.string),
    isString: t.string,
    isPeriod: t.string,
    isPath: t.string,
    isPaths: t.array(t.string),
    isYaml: t.string
  };

  for (const [index, block] of configurationBlocks.entries()) {
    const blockSchema = _config_schemas.configBlockSchemas.find(s => s.id === block.type);

    if (!blockSchema) {
      throw new Error(`Invalid config type of ${block.type} used in 'configuration_blocks' at index ${index}`);
    }

    const interfaceConfig = blockSchema.configs.reduce((props, config) => {
      if (config.options) {
        props[config.id] = t.keyof(Object.fromEntries(config.options.map(opt => [opt.value, null])));
      } else if (config.validation) {
        props[config.id] = validationMap[config.validation];
      }

      return props;
    }, {});
    const runtimeInterface = (0, _domain_types.createConfigurationBlockInterface)(t.literal(blockSchema.id), t.interface(interfaceConfig));
    const validationResults = runtimeInterface.decode(block);

    if ((0, _Either.isLeft)(validationResults)) {
      throw new Error(`configuration_blocks validation error, configuration_blocks at index ${index} is invalid. ${_PathReporter.PathReporter.report(validationResults)[0]}`);
    }
  }
};

exports.validateConfigurationBlocks = validateConfigurationBlocks;
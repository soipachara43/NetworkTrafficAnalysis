"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuntimeBeatEvent = exports.RuntimeBeatTag = exports.createConfigurationBlockInterface = exports.OutputTypesArray = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _config_schemas = require("./config_schemas");

var _io_ts_types = require("./io_ts_types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const OutputTypesArray = ['elasticsearch', 'logstash', 'kafka', 'redis']; // Here we create the runtime check for a generic, unknown beat config type.
// We can also pass in optional params to create spacific runtime checks that
// can be used to validate blocs on the API and UI

exports.OutputTypesArray = OutputTypesArray;

const createConfigurationBlockInterface = (configType = t.keyof(Object.fromEntries(_config_schemas.configBlockSchemas.map(s => [s.id, null]))), beatConfigInterface = t.Dictionary) => t.interface({
  id: t.union([t.undefined, t.string]),
  type: configType,
  description: t.union([t.undefined, t.string]),
  tag: t.string,
  config: beatConfigInterface,
  last_updated: t.union([t.undefined, t.number])
}, 'ConfigBlock');

exports.createConfigurationBlockInterface = createConfigurationBlockInterface;
const BaseConfigurationBlock = createConfigurationBlockInterface();
const RuntimeBeatTag = t.interface({
  id: t.union([t.undefined, t.string]),
  name: t.string,
  color: t.string,
  hasConfigurationBlocksTypes: t.array(t.string)
}, 'CMBeat');
exports.RuntimeBeatTag = RuntimeBeatTag;
const RuntimeBeatEvent = t.interface({
  type: t.union([t.literal('STATE'), t.literal('ERROR')]),
  beat: t.union([t.undefined, t.string]),
  timestamp: _io_ts_types.DateFromString,
  event: t.type({
    type: t.union([t.literal('RUNNING'), t.literal('STARTING'), t.literal('IN_PROGRESS'), t.literal('CONFIG'), t.literal('FAILED'), t.literal('STOPPED')]),
    message: t.string,
    uuid: t.union([t.undefined, t.string])
  })
}, 'BeatEvent');
exports.RuntimeBeatEvent = RuntimeBeatEvent;
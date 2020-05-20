"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mappings = void 0;

var _constants = require("../common/lib/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore converting /libs/constants to TS breaks CI
const mappings = {
  [_constants.CANVAS_TYPE]: {
    dynamic: false,
    properties: {
      name: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword'
          }
        }
      },
      '@timestamp': {
        type: 'date'
      },
      '@created': {
        type: 'date'
      }
    }
  },
  [_constants.CUSTOM_ELEMENT_TYPE]: {
    dynamic: false,
    properties: {
      name: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword'
          }
        }
      },
      help: {
        type: 'text'
      },
      content: {
        type: 'text'
      },
      image: {
        type: 'text'
      },
      '@timestamp': {
        type: 'date'
      },
      '@created': {
        type: 'date'
      }
    }
  }
};
exports.mappings = mappings;
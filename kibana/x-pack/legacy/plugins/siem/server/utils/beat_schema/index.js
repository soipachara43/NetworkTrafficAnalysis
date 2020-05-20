"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  convertSchemaToAssociativeArray: true,
  getIndexAlias: true,
  getIndexSchemaDoc: true,
  hasDocumentation: true,
  getDocumentation: true,
  baseCategoryFields: true
};
Object.defineProperty(exports, "baseCategoryFields", {
  enumerable: true,
  get: function () {
    return _.baseCategoryFields;
  }
});
exports.getDocumentation = exports.hasDocumentation = exports.getIndexSchemaDoc = exports.getIndexAlias = exports.convertSchemaToAssociativeArray = void 0;

var _fp = require("lodash/fp");

var _ = require("./8.0.0");

var _type = require("./type");

Object.keys(_type).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _type[key];
    }
  });
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const convertSchemaToAssociativeArray = schema => schema.reduce((accumulator, item) => {
  if (item.fields != null && !(0, _fp.isEmpty)(item.fields)) {
    return { ...accumulator,
      ...convertFieldsToAssociativeArray(item)
    };
  }

  return accumulator;
}, {});

exports.convertSchemaToAssociativeArray = convertSchemaToAssociativeArray;
const paramsToPick = ['description', 'example', 'name', 'type', 'format'];

const onlyStringOrNumber = fields => Object.keys(fields).reduce((acc, item) => {
  const value = (0, _fp.get)(item, fields);
  return { ...acc,
    [item]: (0, _fp.isString)(value) || (0, _fp.isNumber)(value) ? value : JSON.stringify(value)
  };
}, {});

const convertFieldsToAssociativeArray = (schemaFields, path = '') => schemaFields.fields && (0, _fp.isArray)(schemaFields.fields) ? schemaFields.fields.reduce((accumulator, item) => {
  if (item.name) {
    const attr = (0, _fp.isEmpty)(path) ? item.name : `${path}.${item.name}`;

    if (!(0, _fp.isEmpty)(item.fields) && (0, _fp.isEmpty)(path)) {
      return { ...accumulator,
        [attr]: { ...onlyStringOrNumber((0, _fp.pick)(paramsToPick, item)),
          fields: { ...convertFieldsToAssociativeArray(item, attr)
          }
        }
      };
    } else if (!(0, _fp.isEmpty)(item.fields) && !(0, _fp.isEmpty)(path)) {
      return { ...accumulator,
        [attr]: onlyStringOrNumber((0, _fp.pick)(paramsToPick, item)),
        ...convertFieldsToAssociativeArray(item, attr)
      };
    } else {
      return { ...accumulator,
        [attr]: onlyStringOrNumber((0, _fp.pick)(paramsToPick, item))
      };
    }
  }

  return accumulator;
}, {}) : {};

const getIndexAlias = (defaultIndex, indexName) => {
  const found = defaultIndex.find(index => `\\${indexName}`.match(`\\${index}`) != null);

  if (found != null) {
    return found;
  } else {
    return 'unknown';
  }
};

exports.getIndexAlias = getIndexAlias;
const getIndexSchemaDoc = (0, _fp.memoize)(index => {
  if (index.match('auditbeat') != null) {
    return { ..._.extraSchemaField,
      ...convertSchemaToAssociativeArray(_.auditbeatSchema)
    };
  } else if (index.match('filebeat') != null) {
    return { ..._.extraSchemaField,
      ...convertSchemaToAssociativeArray(_.filebeatSchema)
    };
  } else if (index.match('packetbeat') != null) {
    return { ..._.extraSchemaField,
      ...convertSchemaToAssociativeArray(_.packetbeatSchema)
    };
  } else if (index.match('winlogbeat') != null) {
    return { ..._.extraSchemaField,
      ...convertSchemaToAssociativeArray(_.winlogbeatSchema)
    };
  }

  return { ..._.extraSchemaField,
    ...convertSchemaToAssociativeArray(_.ecsSchema)
  };
});
exports.getIndexSchemaDoc = getIndexSchemaDoc;

const hasDocumentation = (index, path) => {
  const splitPath = path.split('.');
  const category = splitPath.length > 0 ? splitPath[0] : null;

  if (category === null) {
    return false;
  }

  if (splitPath.length > 1) {
    return (0, _fp.has)([category, 'fields', path], getIndexSchemaDoc(index));
  }

  return (0, _fp.has)(category, getIndexSchemaDoc(index));
};

exports.hasDocumentation = hasDocumentation;

const getDocumentation = (index, path) => {
  const splitPath = path.split('.');
  const category = splitPath.length > 0 ? splitPath[0] : null;

  if (category === null) {
    return {};
  }

  if (splitPath.length > 1) {
    return (0, _fp.get)([category, 'fields', path], getIndexSchemaDoc(index)) || {};
  }

  return (0, _fp.get)(category, getIndexSchemaDoc(index)) || {};
};

exports.getDocumentation = getDocumentation;
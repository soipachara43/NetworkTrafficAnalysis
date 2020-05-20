"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEntitiesToKql = exports.entitiesToKql = exports.entityToKql = void 0;

var _risonNode = require("rison-node");

var _rison_helpers = require("./rison_helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var entityToKql = function entityToKql(entityNames, entity) {
  if (entityNames.length === 1) {
    return "".concat(entityNames[0], ": \"").concat(entity, "\"");
  } else {
    return entityNames.reduce(function (accum, entityName, index, array) {
      if (index === 0) {
        return "(".concat(entityName, ": \"").concat(entity, "\"");
      } else if (index === array.length - 1) {
        return "".concat(accum, " or ").concat(entityName, ": \"").concat(entity, "\")");
      } else {
        return "".concat(accum, " or ").concat(entityName, ": \"").concat(entity, "\"");
      }
    }, '');
  }
};

exports.entityToKql = entityToKql;

var entitiesToKql = function entitiesToKql(entityNames, entities) {
  return entities.reduce(function (accum, entity, index) {
    var entityKql = entityToKql(entityNames, entity);

    if (index === 0) {
      return entityKql;
    } else {
      return "".concat(accum, " or ").concat(entityKql);
    }
  }, '');
};

exports.entitiesToKql = entitiesToKql;

var addEntitiesToKql = function addEntitiesToKql(entityNames, entities, kqlQuery) {
  var value = (0, _rison_helpers.decodeRison)(kqlQuery);

  if ((0, _rison_helpers.isRisonObject)(value)) {
    var appQuery = value;

    if ((0, _rison_helpers.isRisonObject)(appQuery)) {
      if ((0, _rison_helpers.isRegularString)(appQuery.query)) {
        var entitiesKql = entitiesToKql(entityNames, entities);

        if (appQuery.query !== '' && entitiesKql !== '') {
          appQuery.query = "(".concat(entitiesKql, ") and (").concat(appQuery.query, ")");
        } else if (appQuery.query === '' && entitiesKql !== '') {
          appQuery.query = "(".concat(entitiesKql, ")");
        }

        return (0, _risonNode.encode)(value);
      }
    }
  } else if (value == null) {
    var _entitiesKql = entitiesToKql(entityNames, entities);

    return (0, _risonNode.encode)({
      query: "(".concat(_entitiesKql, ")"),
      language: 'kuery'
    });
  }

  return kqlQuery;
};

exports.addEntitiesToKql = addEntitiesToKql;
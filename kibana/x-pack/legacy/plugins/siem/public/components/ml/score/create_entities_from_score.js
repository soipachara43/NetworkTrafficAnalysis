"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEntitiesFromScore = exports.createInfluencersFromScore = exports.createEntity = exports.createEntityFromRecord = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createEntityFromRecord = function createEntityFromRecord(entity) {
  return createEntity(Object.keys(entity)[0], Object.values(entity)[0]);
};

exports.createEntityFromRecord = createEntityFromRecord;

var createEntity = function createEntity(entityName, entityValue) {
  return "".concat(entityName, ":'").concat(entityValue, "'");
};

exports.createEntity = createEntity;

var createInfluencersFromScore = function createInfluencersFromScore() {
  var influencers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return influencers.reduce(function (accum, item, index) {
    if (index === 0) {
      return createEntityFromRecord(item);
    } else {
      return "".concat(accum, ",").concat(createEntityFromRecord(item));
    }
  }, '');
};

exports.createInfluencersFromScore = createInfluencersFromScore;

var createEntitiesFromScore = function createEntitiesFromScore(score) {
  var influencers = createInfluencersFromScore(score.influencers);

  if (influencers.length === 0) {
    return createEntity(score.entityName, score.entityValue);
  } else if (!influencers.includes(score.entityName)) {
    return "".concat(influencers, ",").concat(createEntity(score.entityName, score.entityValue));
  } else {
    return influencers;
  }
};

exports.createEntitiesFromScore = createEntitiesFromScore;
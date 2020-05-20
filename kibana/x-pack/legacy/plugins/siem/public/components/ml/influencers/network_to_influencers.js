"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.networkToInfluencers = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var networkToInfluencers = function networkToInfluencers(ip) {
  var influencers = [{
    fieldName: 'source.ip',
    fieldValue: ip
  }, {
    fieldName: 'destination.ip',
    fieldValue: ip
  }];
  return influencers;
};

exports.networkToInfluencers = networkToInfluencers;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hostToInfluencers = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var hostToInfluencers = function hostToInfluencers(hostItem) {
  if (hostItem.host != null && hostItem.host.name != null) {
    var influencers = [{
      fieldName: 'host.name',
      fieldValue: hostItem.host.name[0]
    }];
    return influencers;
  } else {
    return null;
  }
};

exports.hostToInfluencers = hostToInfluencers;
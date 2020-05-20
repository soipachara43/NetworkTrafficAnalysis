"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendIndexManagement = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var propertyPath = 'isFollowerIndex';
var followerBadgeExtension = {
  matchIndex: function matchIndex(index) {
    return (0, _lodash.get)(index, propertyPath);
  },
  label: _i18n.i18n.translate('xpack.crossClusterReplication.indexMgmtBadge.followerLabel', {
    defaultMessage: 'Follower'
  }),
  color: 'default',
  filterExpression: 'isFollowerIndex:true'
};

var extendIndexManagement = function extendIndexManagement(indexManagement) {
  if (indexManagement) {
    indexManagement.extensionsService.addBadge(followerBadgeExtension);
  }
};

exports.extendIndexManagement = extendIndexManagement;
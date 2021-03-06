"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createId = createId;
exports.createWaffleMapNode = createWaffleMapNode;
exports.nodesToWaffleMap = nodesToWaffleMap;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _type_guards = require("./type_guards");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createId(path) {
  return path.map(function (p) {
    return p.value;
  }).join('/');
}

function findOrCreateGroupWithNodes(groups, path) {
  var id = path.length === 0 ? '__all__' : createId(path);
  /**
   * If the group is going to be a top level group then we can just
   * look for the full id. Otherwise we need to find the parent group and
   * then look for the group in it's sub groups.
   */

  if (path.length === 2) {
    var parentId = (0, _lodash.first)(path).value;
    var existingParentGroup = groups.find(function (g) {
      return g.id === parentId;
    });

    if ((0, _type_guards.isWaffleMapGroupWithGroups)(existingParentGroup)) {
      var existingSubGroup = existingParentGroup.groups.find(function (g) {
        return g.id === id;
      });

      if ((0, _type_guards.isWaffleMapGroupWithNodes)(existingSubGroup)) {
        return existingSubGroup;
      }
    }
  }

  var lastPath = (0, _lodash.last)(path);
  var existingGroup = groups.find(function (g) {
    return g.id === id;
  });

  if ((0, _type_guards.isWaffleMapGroupWithNodes)(existingGroup)) {
    return existingGroup;
  }

  return {
    id: id,
    name: id === '__all__' ? _i18n.i18n.translate('xpack.infra.nodesToWaffleMap.groupsWithNodes.allName', {
      defaultMessage: 'All'
    }) : lastPath && lastPath.label || 'Unknown Group',
    count: 0,
    width: 0,
    squareSize: 0,
    nodes: []
  };
}

function findOrCreateGroupWithGroups(groups, path) {
  var id = path.length === 0 ? '__all__' : createId(path);
  var lastPath = (0, _lodash.last)(path);
  var existingGroup = groups.find(function (g) {
    return g.id === id;
  });

  if ((0, _type_guards.isWaffleMapGroupWithGroups)(existingGroup)) {
    return existingGroup;
  }

  return {
    id: id,
    name: id === '__all__' ? _i18n.i18n.translate('xpack.infra.nodesToWaffleMap.groupsWithGroups.allName', {
      defaultMessage: 'All'
    }) : lastPath && lastPath.label || 'Unknown Group',
    count: 0,
    width: 0,
    squareSize: 0,
    groups: []
  };
}

function createWaffleMapNode(node) {
  var nodePathItem = (0, _lodash.last)(node.path);

  if (!nodePathItem) {
    throw new Error('There must be at least one node path item');
  }

  return {
    pathId: node.path.map(function (p) {
      return p.value;
    }).join('/'),
    path: node.path,
    id: nodePathItem.value,
    ip: nodePathItem.ip,
    name: nodePathItem.label || nodePathItem.value,
    metric: node.metric
  };
}

function withoutGroup(group) {
  return function (subject) {
    return subject.id !== group.id;
  };
}

function nodesToWaffleMap(nodes) {
  return nodes.reduce(function (groups, node) {
    var waffleNode = createWaffleMapNode(node);

    if (node.path.length === 2) {
      var parentGroup = findOrCreateGroupWithNodes(groups, node.path.slice(0, node.path.length - 1));
      parentGroup.nodes.push(waffleNode);
      return groups.filter(withoutGroup(parentGroup)).concat([parentGroup]);
    }

    if (node.path.length === 3) {
      var _parentGroup = findOrCreateGroupWithNodes(groups, node.path.slice(0, node.path.length - 1));

      _parentGroup.nodes.push(waffleNode);

      var topGroup = findOrCreateGroupWithGroups(groups, node.path.slice(0, node.path.length - 2));
      topGroup.groups = topGroup.groups.filter(withoutGroup(_parentGroup)).concat([_parentGroup]);
      return groups.filter(withoutGroup(topGroup)).concat([topGroup]);
    }

    var allGroup = findOrCreateGroupWithNodes(groups, []);
    allGroup.nodes.push(waffleNode);
    return groups.filter(withoutGroup(allGroup)).concat([allGroup]);
  }, []);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsersColumns = void 0;

var _empty_value = require("../../../empty_value");

var i18n = _interopRequireWildcard(require("./translations"));

var _helpers = require("../../../tables/helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getUsersColumns = function getUsersColumns(flowTarget, tableId) {
  return [{
    field: 'node.user.name',
    name: i18n.USER_NAME,
    truncateText: false,
    hideForMobile: false,
    sortable: true,
    render: function render(userName) {
      return (0, _helpers.getRowItemDraggable)({
        rowItem: userName,
        attrName: 'user.name',
        idPrefix: "".concat(tableId, "-table-").concat(flowTarget, "-user")
      });
    }
  }, {
    field: 'node.user.id',
    name: i18n.USER_ID,
    truncateText: false,
    hideForMobile: false,
    sortable: false,
    render: function render(userIds) {
      return (0, _helpers.getRowItemDraggables)({
        rowItems: userIds,
        attrName: 'user.id',
        idPrefix: "".concat(tableId, "-table-").concat(flowTarget)
      });
    }
  }, {
    field: 'node.user.groupName',
    name: i18n.GROUP_NAME,
    truncateText: false,
    hideForMobile: false,
    sortable: false,
    render: function render(groupNames) {
      return (0, _helpers.getRowItemDraggables)({
        rowItems: groupNames,
        attrName: 'user.group.name',
        idPrefix: "".concat(tableId, "-table-").concat(flowTarget)
      });
    }
  }, {
    field: 'node.user.groupId',
    name: i18n.GROUP_ID,
    truncateText: false,
    hideForMobile: false,
    sortable: false,
    render: function render(groupId) {
      return (0, _helpers.getRowItemDraggables)({
        rowItems: groupId,
        attrName: 'user.group.id',
        idPrefix: "".concat(tableId, "-table-").concat(flowTarget)
      });
    }
  }, {
    align: 'right',
    field: 'node.user.count',
    name: i18n.DOCUMENT_COUNT,
    truncateText: false,
    hideForMobile: false,
    sortable: true,
    render: function render(docCount) {
      return (0, _empty_value.defaultToEmptyTag)(docCount);
    }
  }];
};

exports.getUsersColumns = getUsersColumns;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROWS_10 = exports.ROWS_5 = exports.DOCUMENT_COUNT = exports.GROUP_ID = exports.GROUP_NAME = exports.USER_ID = exports.USER_NAME = exports.UNIT = exports.USERS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var USERS = _i18n.i18n.translate('xpack.siem.network.ipDetails.usersTable.usersTitle', {
  defaultMessage: 'Users'
});

exports.USERS = USERS;

var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.network.ipDetails.usersTable.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "{totalCount, plural, =1 {user} other {users}}"
  });
}; // Columns


exports.UNIT = UNIT;

var USER_NAME = _i18n.i18n.translate('xpack.siem.network.ipDetails.usersTable.columns.userNameTitle', {
  defaultMessage: 'User'
});

exports.USER_NAME = USER_NAME;

var USER_ID = _i18n.i18n.translate('xpack.siem.network.ipDetails.usersTable.columns.userIdTitle', {
  defaultMessage: 'ID'
});

exports.USER_ID = USER_ID;

var GROUP_NAME = _i18n.i18n.translate('xpack.siem.network.ipDetails.usersTable.columns.groupNameTitle', {
  defaultMessage: 'Group name'
});

exports.GROUP_NAME = GROUP_NAME;

var GROUP_ID = _i18n.i18n.translate('xpack.siem.network.ipDetails.usersTable.columns.groupIdTitle', {
  defaultMessage: 'Group ID'
});

exports.GROUP_ID = GROUP_ID;

var DOCUMENT_COUNT = _i18n.i18n.translate('xpack.siem.network.ipDetails.usersTable.columns.documentCountTitle', {
  defaultMessage: 'Document count'
}); // Row Select


exports.DOCUMENT_COUNT = DOCUMENT_COUNT;

var ROWS_5 = _i18n.i18n.translate('xpack.siem.network.ipDetails.usersTable.rows', {
  values: {
    numRows: 5
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_5 = ROWS_5;

var ROWS_10 = _i18n.i18n.translate('xpack.siem.network.ipDetails.usersTable.rows', {
  values: {
    numRows: 10
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_10 = ROWS_10;
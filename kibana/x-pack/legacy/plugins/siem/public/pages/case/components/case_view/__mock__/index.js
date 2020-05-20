"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.caseUserActions = exports.dataClosed = exports.data = exports.caseClosedProps = exports.caseProps = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var updateCase = jest.fn();
var fetchCase = jest.fn();
var caseProps = {
  caseId: '3c4ddcc0-4e99-11ea-9290-35d05cb55c15',
  userCanCrud: true,
  caseData: {
    closedAt: null,
    closedBy: null,
    id: '3c4ddcc0-4e99-11ea-9290-35d05cb55c15',
    comments: [{
      comment: 'Solve this fast!',
      id: 'a357c6a0-5435-11ea-b427-fb51a1fcb7b8',
      createdAt: '2020-02-20T23:06:33.798Z',
      createdBy: {
        fullName: 'Steph Milovic',
        username: 'smilovic',
        email: 'notmyrealemailfool@elastic.co'
      },
      pushedAt: null,
      pushedBy: null,
      updatedAt: '2020-02-20T23:06:33.798Z',
      updatedBy: {
        username: 'elastic'
      },
      version: 'WzQ3LDFd'
    }],
    createdAt: '2020-02-13T19:44:23.627Z',
    createdBy: {
      fullName: null,
      email: 'testemail@elastic.co',
      username: 'elastic'
    },
    description: 'Security banana Issue',
    externalService: null,
    status: 'open',
    tags: ['defacement'],
    title: 'Another horrible breach!!',
    totalComment: 1,
    updatedAt: '2020-02-19T15:02:57.995Z',
    updatedBy: {
      username: 'elastic'
    },
    version: 'WzQ3LDFd'
  },
  fetchCase: fetchCase,
  updateCase: updateCase
};
exports.caseProps = caseProps;

var caseClosedProps = _objectSpread({}, caseProps, {
  caseData: _objectSpread({}, caseProps.caseData, {
    closedAt: '2020-02-20T23:06:33.798Z',
    closedBy: {
      username: 'elastic'
    },
    status: 'closed'
  })
});

exports.caseClosedProps = caseClosedProps;

var data = _objectSpread({}, caseProps.caseData);

exports.data = data;

var dataClosed = _objectSpread({}, caseClosedProps.caseData);

exports.dataClosed = dataClosed;
var caseUserActions = [{
  actionField: ['comment'],
  action: 'create',
  actionAt: '2020-03-20T17:10:09.814Z',
  actionBy: {
    fullName: 'Steph Milovic',
    username: 'smilovic',
    email: 'notmyrealemailfool@elastic.co'
  },
  newValue: 'Solve this fast!',
  oldValue: null,
  actionId: '3c4ddcc0-4e99-11ea-9290-35d05cb55c15',
  caseId: '9b833a50-6acd-11ea-8fad-af86b1071bd9',
  commentId: 'a357c6a0-5435-11ea-b427-fb51a1fcb7b8'
}];
exports.caseUserActions = caseUserActions;
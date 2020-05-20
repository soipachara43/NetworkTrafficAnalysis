"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagConfigActions = exports.tagListActions = exports.beatsListActions = exports.ActionComponentType = void 0;

var _i18n = require("@kbn/i18n");

var _table = require("./table");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ActionComponentType;
exports.ActionComponentType = ActionComponentType;

(function (ActionComponentType) {
  ActionComponentType[ActionComponentType["Action"] = 0] = "Action";
  ActionComponentType[ActionComponentType["Popover"] = 1] = "Popover";
  ActionComponentType[ActionComponentType["SelectionCount"] = 2] = "SelectionCount";
  ActionComponentType[ActionComponentType["TagBadgeList"] = 3] = "TagBadgeList";
})(ActionComponentType || (exports.ActionComponentType = ActionComponentType = {}));

var beatsListActions = [{
  grow: false,
  name: _i18n.i18n.translate('xpack.beatsManagement.beatsListAssignmentOptions.unenrollButtonLabel', {
    defaultMessage: 'Unenroll selected'
  }),
  showWarning: true,
  type: ActionComponentType.Action,
  warningHeading: _i18n.i18n.translate('xpack.beatsManagement.beatsListAssignmentOptions.unenrollBeatsWarninigTitle', {
    defaultMessage: 'Unenroll selected beats?'
  }),
  warningMessage: _i18n.i18n.translate('xpack.beatsManagement.beatsListAssignmentOptions.unenrollBeatsWarninigMessage', {
    defaultMessage: 'The selected Beats will no longer use central management'
  }),
  action: _table.AssignmentActionType.Delete,
  danger: true
}, {
  name: _i18n.i18n.translate('xpack.beatsManagement.beatsListAssignmentOptions.setTagsButtonLabel', {
    defaultMessage: 'Set tags'
  }),
  grow: false,
  type: ActionComponentType.TagBadgeList,
  actionDataKey: 'tags',
  lazyLoad: true
}];
exports.beatsListActions = beatsListActions;
var tagListActions = [{
  danger: true,
  grow: false,
  name: _i18n.i18n.translate('xpack.beatsManagement.tagListAssignmentOptions.removeTagsButtonLabel', {
    defaultMessage: 'Remove selected'
  }),
  type: ActionComponentType.Action,
  showWarning: true,
  warningHeading: _i18n.i18n.translate('xpack.beatsManagement.tagListAssignmentOptions.removeTagsWarninigTitle', {
    defaultMessage: 'Remove tag(s)'
  }),
  warningMessage: _i18n.i18n.translate('xpack.beatsManagement.tagListAssignmentOptions.removeTagWarninigMessage', {
    defaultMessage: 'Remove the tag?'
  }),
  action: _table.AssignmentActionType.Delete
}];
exports.tagListActions = tagListActions;
var tagConfigActions = [{
  danger: true,
  grow: false,
  name: _i18n.i18n.translate('xpack.beatsManagement.tagConfigAssignmentOptions.removeTagsButtonLabel', {
    defaultMessage: 'Remove tag(s)'
  }),
  type: ActionComponentType.Action,
  showWarning: true,
  warningHeading: _i18n.i18n.translate('xpack.beatsManagement.tagConfigAssignmentOptions.removeTagsWarninigTitle', {
    defaultMessage: 'Remove tag(s)'
  }),
  warningMessage: _i18n.i18n.translate('xpack.beatsManagement.tagConfigAssignmentOptions.removeTagsWarninigMessage', {
    defaultMessage: 'Remove the tag from the selected beat(s)?'
  }),
  action: _table.AssignmentActionType.Delete
}];
exports.tagConfigActions = tagConfigActions;
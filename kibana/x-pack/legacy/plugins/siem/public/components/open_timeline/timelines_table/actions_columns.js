"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionsColumns = void 0;

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */

/**
 * Returns the action columns (e.g. delete, open duplicate timeline)
 */
var getActionsColumns = function getActionsColumns(_ref) {
  var actionTimelineToShow = _ref.actionTimelineToShow,
      deleteTimelines = _ref.deleteTimelines,
      enableExportTimelineDownloader = _ref.enableExportTimelineDownloader,
      onOpenDeleteTimelineModal = _ref.onOpenDeleteTimelineModal,
      onOpenTimeline = _ref.onOpenTimeline;
  var openAsDuplicateColumn = {
    name: i18n.OPEN_AS_DUPLICATE,
    icon: 'copy',
    onClick: function onClick(_ref2) {
      var savedObjectId = _ref2.savedObjectId;
      onOpenTimeline({
        duplicate: true,
        timelineId: savedObjectId !== null && savedObjectId !== void 0 ? savedObjectId : ''
      });
    },
    type: 'icon',
    enabled: function enabled(_ref3) {
      var savedObjectId = _ref3.savedObjectId;
      return savedObjectId != null;
    },
    description: i18n.OPEN_AS_DUPLICATE,
    'data-test-subj': 'open-duplicate'
  };
  var exportTimelineAction = {
    name: i18n.EXPORT_SELECTED,
    icon: 'exportAction',
    onClick: function onClick(selectedTimeline) {
      if (enableExportTimelineDownloader != null) enableExportTimelineDownloader(selectedTimeline);
    },
    enabled: function enabled(_ref4) {
      var savedObjectId = _ref4.savedObjectId;
      return savedObjectId != null;
    },
    description: i18n.EXPORT_SELECTED,
    'data-test-subj': 'export-timeline'
  };
  var deleteTimelineColumn = {
    name: i18n.DELETE_SELECTED,
    icon: 'trash',
    onClick: function onClick(selectedTimeline) {
      if (onOpenDeleteTimelineModal != null) onOpenDeleteTimelineModal(selectedTimeline);
    },
    enabled: function enabled(_ref5) {
      var savedObjectId = _ref5.savedObjectId;
      return savedObjectId != null;
    },
    description: i18n.DELETE_SELECTED,
    'data-test-subj': 'delete-timeline'
  };
  return [{
    width: '40px',
    actions: [actionTimelineToShow.includes('duplicate') ? openAsDuplicateColumn : null, actionTimelineToShow.includes('export') ? exportTimelineAction : null, actionTimelineToShow.includes('delete') && deleteTimelines != null ? deleteTimelineColumn : null].filter(function (action) {
      return action != null;
    })
  }];
};

exports.getActionsColumns = getActionsColumns;
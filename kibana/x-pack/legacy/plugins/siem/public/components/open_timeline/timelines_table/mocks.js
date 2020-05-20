"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMockTimelinesTableProps = void 0;

var _timelines_page = require("../../../pages/timelines/timelines_page");

var _constants = require("../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getMockTimelinesTableProps = function getMockTimelinesTableProps(mockOpenTimelineResults) {
  return {
    actionTimelineToShow: ['delete', 'duplicate', 'selectable'],
    deleteTimelines: jest.fn(),
    defaultPageSize: _timelines_page.DEFAULT_SEARCH_RESULTS_PER_PAGE,
    enableExportTimelineDownloader: jest.fn(),
    itemIdToExpandedNotesRowMap: {},
    loading: false,
    onOpenDeleteTimelineModal: jest.fn(),
    onOpenTimeline: jest.fn(),
    onSelectionChange: jest.fn(),
    onTableChange: jest.fn(),
    onToggleShowNotes: jest.fn(),
    pageIndex: 0,
    pageSize: _timelines_page.DEFAULT_SEARCH_RESULTS_PER_PAGE,
    searchResults: mockOpenTimelineResults,
    showExtendedColumns: true,
    sortDirection: _constants.DEFAULT_SORT_DIRECTION,
    sortField: _constants.DEFAULT_SORT_FIELD,
    totalSearchResultsCount: mockOpenTimelineResults.length
  };
};

exports.getMockTimelinesTableProps = getMockTimelinesTableProps;
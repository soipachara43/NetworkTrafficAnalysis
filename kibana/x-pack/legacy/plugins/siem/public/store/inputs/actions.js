"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSearchBarFilter = exports.setSavedQuery = exports.setFilterQuery = exports.addGlobalLinkTo = exports.removeGlobalLinkTo = exports.addTimelineLinkTo = exports.removeTimelineLinkTo = exports.toggleTimelineLinkTo = exports.deleteAllQuery = exports.setInspectionParameter = exports.deleteOneQuery = exports.setQuery = exports.stopAutoReload = exports.startAutoReload = exports.setDuration = exports.setRelativeRangeDatePicker = exports.setTimelineRangeDatePicker = exports.setAbsoluteRangeDatePicker = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var actionCreator = (0, _typescriptFsa.default)('x-pack/siem/local/inputs');
var setAbsoluteRangeDatePicker = actionCreator('SET_ABSOLUTE_RANGE_DATE_PICKER');
exports.setAbsoluteRangeDatePicker = setAbsoluteRangeDatePicker;
var setTimelineRangeDatePicker = actionCreator('SET_TIMELINE_RANGE_DATE_PICKER');
exports.setTimelineRangeDatePicker = setTimelineRangeDatePicker;
var setRelativeRangeDatePicker = actionCreator('SET_RELATIVE_RANGE_DATE_PICKER');
exports.setRelativeRangeDatePicker = setRelativeRangeDatePicker;
var setDuration = actionCreator('SET_DURATION');
exports.setDuration = setDuration;
var startAutoReload = actionCreator('START_KQL_AUTO_RELOAD');
exports.startAutoReload = startAutoReload;
var stopAutoReload = actionCreator('STOP_KQL_AUTO_RELOAD');
exports.stopAutoReload = stopAutoReload;
var setQuery = actionCreator('SET_QUERY');
exports.setQuery = setQuery;
var deleteOneQuery = actionCreator('DELETE_QUERY');
exports.deleteOneQuery = deleteOneQuery;
var setInspectionParameter = actionCreator('SET_INSPECTION_PARAMETER');
exports.setInspectionParameter = setInspectionParameter;
var deleteAllQuery = actionCreator('DELETE_ALL_QUERY');
exports.deleteAllQuery = deleteAllQuery;
var toggleTimelineLinkTo = actionCreator('TOGGLE_TIMELINE_LINK_TO');
exports.toggleTimelineLinkTo = toggleTimelineLinkTo;
var removeTimelineLinkTo = actionCreator('REMOVE_TIMELINE_LINK_TO');
exports.removeTimelineLinkTo = removeTimelineLinkTo;
var addTimelineLinkTo = actionCreator('ADD_TIMELINE_LINK_TO');
exports.addTimelineLinkTo = addTimelineLinkTo;
var removeGlobalLinkTo = actionCreator('REMOVE_GLOBAL_LINK_TO');
exports.removeGlobalLinkTo = removeGlobalLinkTo;
var addGlobalLinkTo = actionCreator('ADD_GLOBAL_LINK_TO');
exports.addGlobalLinkTo = addGlobalLinkTo;
var setFilterQuery = actionCreator('SET_FILTER_QUERY');
exports.setFilterQuery = setFilterQuery;
var setSavedQuery = actionCreator('SET_SAVED_QUERY');
exports.setSavedQuery = setSavedQuery;
var setSearchBarFilter = actionCreator('SET_SEARCH_BAR_FILTER');
exports.setSearchBarFilter = setSearchBarFilter;
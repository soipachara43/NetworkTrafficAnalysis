"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStablePatternTitles = exports.searchFilter = exports.filterJobs = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Returns a filtered array of Jobs according to JobsTableFilters selections
 *
 * @param jobs to filter
 * @param selectedGroups groups to filter on
 * @param showCustomJobs whether or not to show all Custom Jobs (Non-embedded Jobs in SIEM Group)
 * @param showElasticJobs whether or not to show Elastic Jobs (Embedded ConfigTemplate Jobs)
 * @param filterQuery user-provided search string to filter for occurrence in job names/description
 */
var filterJobs = function filterJobs(_ref) {
  var jobs = _ref.jobs,
      selectedGroups = _ref.selectedGroups,
      showCustomJobs = _ref.showCustomJobs,
      showElasticJobs = _ref.showElasticJobs,
      filterQuery = _ref.filterQuery;
  return searchFilter(jobs.filter(function (job) {
    return !showCustomJobs || showCustomJobs && !job.isElasticJob;
  }).filter(function (job) {
    return !showElasticJobs || showElasticJobs && job.isElasticJob;
  }).filter(function (job) {
    return selectedGroups.length === 0 || selectedGroups.some(function (g) {
      return job.groups.includes(g);
    });
  }), filterQuery);
};
/**
 * Returns filtered array of Jobs based on user-provided search string to filter for occurrence in job names/description
 *
 * @param jobs to filter
 * @param filterQuery user-provided search string to filter for occurrence in job names/description
 */


exports.filterJobs = filterJobs;

var searchFilter = function searchFilter(jobs, filterQuery) {
  return jobs.filter(function (job) {
    return filterQuery == null ? true : job.id.includes(filterQuery) || job.description.includes(filterQuery);
  });
};
/**
 * Given an array of titles this will always return the same string for usage within
 * useEffect and other shallow compare areas.
 * This won't return a stable reference for case sensitive strings intentionally for speed.
 * @param patterns string[] string array that will return a stable reference regardless of ordering or case sensitivity.
 */


exports.searchFilter = searchFilter;

var getStablePatternTitles = function getStablePatternTitles(patterns) {
  return patterns.sort().join();
};

exports.getStablePatternTitles = getStablePatternTitles;
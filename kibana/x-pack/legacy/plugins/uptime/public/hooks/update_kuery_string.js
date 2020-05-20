"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUpdateKueryString = void 0;

var _helper = require("../lib/helper");

var _public = require("../../../../../../src/plugins/data/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getKueryString = function getKueryString(urlFilters) {
  var kueryString = ''; // We are using try/catch here because this is user entered value
  // and JSON.parse and stringifyKueries can have hard time parsing
  // all possible scenarios, we can safely ignore if we can't parse them

  try {
    if (urlFilters !== '') {
      var filterMap = new Map(JSON.parse(urlFilters));
      kueryString = (0, _helper.stringifyKueries)(filterMap);
    }
  } catch (_unused) {
    kueryString = '';
  }

  return kueryString;
};

var useUpdateKueryString = function useUpdateKueryString(indexPattern) {
  var filterQueryString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var urlFilters = arguments.length > 2 ? arguments[2] : undefined;
  var kueryString = getKueryString(urlFilters);
  var combinedFilterString = (0, _helper.combineFiltersAndUserSearch)(filterQueryString, kueryString);
  var esFilters; // this try catch is necessary to evaluate user input in kuery bar,
  // this error will be actually shown in UI for user to see

  try {
    if ((filterQueryString || urlFilters) && indexPattern) {
      var ast = _public.esKuery.fromKueryExpression(combinedFilterString);

      var elasticsearchQuery = _public.esKuery.toElasticsearchQuery(ast, indexPattern);

      esFilters = JSON.stringify(elasticsearchQuery);
    }

    return [esFilters];
  } catch (err) {
    return [urlFilters, err];
  }
};

exports.useUpdateKueryString = useUpdateKueryString;
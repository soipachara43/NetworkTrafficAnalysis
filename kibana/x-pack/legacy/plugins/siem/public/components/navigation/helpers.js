"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearch = void 0;

var _fp = require("lodash/fp");

var _constants = require("../url_state/constants");

var _types = require("../url_state/types");

var _helpers = require("../url_state/helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getSearch = function getSearch(tab, urlState) {
  if (tab && tab.urlKey != null && _types.URL_STATE_KEYS[tab.urlKey] != null) {
    return _types.URL_STATE_KEYS[tab.urlKey].reduce(function (myLocation, urlKey) {
      var urlStateToReplace = '';

      if (urlKey === _constants.CONSTANTS.appQuery && urlState.query != null) {
        if (urlState.query.query === '') {
          urlStateToReplace = '';
        } else {
          urlStateToReplace = urlState.query;
        }
      } else if (urlKey === _constants.CONSTANTS.filters && urlState.filters != null) {
        if ((0, _fp.isEmpty)(urlState.filters)) {
          urlStateToReplace = '';
        } else {
          urlStateToReplace = urlState.filters;
        }
      } else if (urlKey === _constants.CONSTANTS.timerange) {
        urlStateToReplace = urlState[_constants.CONSTANTS.timerange];
      } else if (urlKey === _constants.CONSTANTS.timeline && urlState[_constants.CONSTANTS.timeline] != null) {
        var timeline = urlState[_constants.CONSTANTS.timeline];

        if (timeline.id === '') {
          urlStateToReplace = '';
        } else {
          urlStateToReplace = timeline;
        }
      }

      return (0, _helpers.replaceQueryStringInLocation)(myLocation, (0, _helpers.replaceStateKeyInQueryString)(urlKey, urlStateToReplace)((0, _helpers.getQueryStringFromLocation)(myLocation.search)));
    }, {
      pathname: '',
      hash: '',
      search: '',
      state: ''
    }).search;
  }

  return '';
};

exports.getSearch = getSearch;
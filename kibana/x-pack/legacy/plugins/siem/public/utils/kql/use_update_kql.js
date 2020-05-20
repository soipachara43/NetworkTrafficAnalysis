"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUpdateKql = void 0;

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _actions = require("../../store/timeline/actions");

var _keury = require("../../lib/keury");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useUpdateKql = function useUpdateKql(_ref) {
  var indexPattern = _ref.indexPattern,
      kueryFilterQuery = _ref.kueryFilterQuery,
      kueryFilterQueryDraft = _ref.kueryFilterQueryDraft,
      storeType = _ref.storeType,
      timelineId = _ref.timelineId;

  var updateKql = function updateKql(dispatch) {
    if (kueryFilterQueryDraft != null && !(0, _fastDeepEqual.default)(kueryFilterQuery, kueryFilterQueryDraft)) {
      if (storeType === 'timelineType' && timelineId != null) {
        dispatch((0, _actions.applyKqlFilterQuery)({
          id: timelineId,
          filterQuery: {
            kuery: kueryFilterQueryDraft,
            serializedQuery: (0, _keury.convertKueryToElasticSearchQuery)(kueryFilterQueryDraft.expression, indexPattern)
          }
        }));
      }

      return true;
    }

    return false;
  };

  return updateKql;
};

exports.useUpdateKql = useUpdateKql;
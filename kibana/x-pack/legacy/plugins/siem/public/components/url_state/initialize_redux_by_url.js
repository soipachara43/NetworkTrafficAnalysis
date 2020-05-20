"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchSetInitialStateFromUrl = void 0;

var _fp = require("lodash/fp");

var _actions = require("../../store/actions");

var _constants = require("./constants");

var _helpers = require("./helpers");

var _normalize_time_range = require("./normalize_time_range");

var _helpers2 = require("../open_timeline/helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dispatchSetInitialStateFromUrl = function dispatchSetInitialStateFromUrl(dispatch) {
  return function (_ref) {
    var apolloClient = _ref.apolloClient,
        detailName = _ref.detailName,
        filterManager = _ref.filterManager,
        indexPattern = _ref.indexPattern,
        pageName = _ref.pageName,
        savedQueries = _ref.savedQueries,
        updateTimeline = _ref.updateTimeline,
        updateTimelineIsLoading = _ref.updateTimelineIsLoading,
        urlStateToUpdate = _ref.urlStateToUpdate;
    return function () {
      urlStateToUpdate.forEach(function (_ref2) {
        var urlKey = _ref2.urlKey,
            newUrlStateString = _ref2.newUrlStateString;

        if (urlKey === _constants.CONSTANTS.timerange) {
          updateTimerange(newUrlStateString, dispatch);
        }

        if (urlKey === _constants.CONSTANTS.appQuery && indexPattern != null) {
          var appQuery = (0, _helpers.decodeRisonUrlState)(newUrlStateString);

          if (appQuery != null) {
            dispatch(_actions.inputsActions.setFilterQuery({
              id: 'global',
              query: appQuery.query,
              language: appQuery.language
            }));
          }
        }

        if (urlKey === _constants.CONSTANTS.filters) {
          var filters = (0, _helpers.decodeRisonUrlState)(newUrlStateString);
          filterManager.setFilters(filters || []);
        }

        if (urlKey === _constants.CONSTANTS.savedQuery) {
          var savedQueryId = (0, _helpers.decodeRisonUrlState)(newUrlStateString);

          if (savedQueryId != null && savedQueryId !== '') {
            savedQueries.getSavedQuery(savedQueryId).then(function (savedQueryData) {
              filterManager.setFilters(savedQueryData.attributes.filters || []);
              dispatch(_actions.inputsActions.setFilterQuery(_objectSpread({
                id: 'global'
              }, savedQueryData.attributes.query)));
              dispatch(_actions.inputsActions.setSavedQuery({
                id: 'global',
                savedQuery: savedQueryData
              }));
            });
          }
        }

        if (urlKey === _constants.CONSTANTS.timeline) {
          var timeline = (0, _helpers.decodeRisonUrlState)(newUrlStateString);

          if (timeline != null && timeline.id !== '') {
            (0, _helpers2.queryTimelineById)({
              apolloClient: apolloClient,
              duplicate: false,
              timelineId: timeline.id,
              openTimeline: timeline.isOpen,
              updateIsLoading: updateTimelineIsLoading,
              updateTimeline: updateTimeline
            });
          }
        }
      });
    };
  };
};

exports.dispatchSetInitialStateFromUrl = dispatchSetInitialStateFromUrl;

var updateTimerange = function updateTimerange(newUrlStateString, dispatch) {
  var timerangeStateData = (0, _helpers.decodeRisonUrlState)(newUrlStateString);
  var globalId = 'global';
  var globalLinkTo = {
    linkTo: (0, _fp.get)('global.linkTo', timerangeStateData)
  };
  var globalType = (0, _fp.get)('global.timerange.kind', timerangeStateData);
  var timelineId = 'timeline';
  var timelineLinkTo = {
    linkTo: (0, _fp.get)('timeline.linkTo', timerangeStateData)
  };
  var timelineType = (0, _fp.get)('timeline.timerange.kind', timerangeStateData);

  if ((0, _fp.isEmpty)(globalLinkTo.linkTo)) {
    dispatch(_actions.inputsActions.removeGlobalLinkTo());
  } else {
    dispatch(_actions.inputsActions.addGlobalLinkTo({
      linkToId: 'timeline'
    }));
  }

  if ((0, _fp.isEmpty)(timelineLinkTo.linkTo)) {
    dispatch(_actions.inputsActions.removeTimelineLinkTo());
  } else {
    dispatch(_actions.inputsActions.addTimelineLinkTo({
      linkToId: 'global'
    }));
  }

  if (timelineType) {
    if (timelineType === 'absolute') {
      var absoluteRange = (0, _normalize_time_range.normalizeTimeRange)((0, _fp.get)('timeline.timerange', timerangeStateData));
      dispatch(_actions.inputsActions.setAbsoluteRangeDatePicker(_objectSpread({}, absoluteRange, {
        id: timelineId
      })));
    }

    if (timelineType === 'relative') {
      var relativeRange = (0, _normalize_time_range.normalizeTimeRange)((0, _fp.get)('timeline.timerange', timerangeStateData));
      dispatch(_actions.inputsActions.setRelativeRangeDatePicker(_objectSpread({}, relativeRange, {
        id: timelineId
      })));
    }
  }

  if (globalType) {
    if (globalType === 'absolute') {
      var _absoluteRange = (0, _normalize_time_range.normalizeTimeRange)((0, _fp.get)('global.timerange', timerangeStateData));

      dispatch(_actions.inputsActions.setAbsoluteRangeDatePicker(_objectSpread({}, _absoluteRange, {
        id: globalId
      })));
    }

    if (globalType === 'relative') {
      var _relativeRange = (0, _normalize_time_range.normalizeTimeRange)((0, _fp.get)('global.timerange', timerangeStateData));

      dispatch(_actions.inputsActions.setRelativeRangeDatePicker(_objectSpread({}, _relativeRange, {
        id: globalId
      })));
    }
  }
};
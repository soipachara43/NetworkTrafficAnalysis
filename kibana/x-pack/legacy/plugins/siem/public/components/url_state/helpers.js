"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceStateInLocation = exports.updateUrlStateString = exports.updateTimerangeUrl = exports.makeMapStateToProps = exports.getTitle = exports.getUrlType = exports.replaceQueryStringInLocation = exports.replaceStateKeyInQueryString = exports.getParamFromQueryString = exports.getQueryStringFromLocation = exports.encodeRisonUrlState = exports.decodeRisonUrlState = void 0;

var _fp = require("lodash/fp");

var _queryString = require("query-string");

var _risonNode = require("rison-node");

var _public = require("../../../../../../../src/plugins/kibana_utils/public");

var _types = require("../../pages/home/types");

var _store = require("../../store");

var _super_date_picker = require("../super_date_picker");

var _constants = require("./constants");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var decodeRisonUrlState = function decodeRisonUrlState(value) {
  try {
    return value ? (0, _risonNode.decode)(value) : null;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('rison decoder error')) {
      return null;
    }

    throw error;
  }
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any


exports.decodeRisonUrlState = decodeRisonUrlState;

var encodeRisonUrlState = function encodeRisonUrlState(state) {
  return (0, _risonNode.encode)(state);
};

exports.encodeRisonUrlState = encodeRisonUrlState;

var getQueryStringFromLocation = function getQueryStringFromLocation(search) {
  return search.substring(1);
};

exports.getQueryStringFromLocation = getQueryStringFromLocation;

var getParamFromQueryString = function getParamFromQueryString(queryString, key) {
  var parsedQueryString = (0, _queryString.parse)(queryString, {
    sort: false
  });
  var queryParam = parsedQueryString[key];
  return Array.isArray(queryParam) ? queryParam[0] : queryParam;
};

exports.getParamFromQueryString = getParamFromQueryString;

var replaceStateKeyInQueryString = function replaceStateKeyInQueryString(stateKey, urlState) {
  return function (queryString) {
    var previousQueryValues = (0, _queryString.parse)(queryString, {
      sort: false
    });

    if (urlState == null || typeof urlState === 'string' && urlState === '') {
      delete previousQueryValues[stateKey];
      return (0, _queryString.stringify)(_public.url.encodeQuery(previousQueryValues), {
        sort: false,
        encode: false
      });
    } // ಠ_ಠ Code was copied from x-pack/legacy/plugins/infra/public/utils/url_state.tsx ಠ_ಠ
    // Remove this if these utilities are promoted to kibana core


    var encodedUrlState = typeof urlState !== 'undefined' ? encodeRisonUrlState(urlState) : undefined;
    return (0, _queryString.stringify)(_public.url.encodeQuery(_objectSpread({}, previousQueryValues, _defineProperty({}, stateKey, encodedUrlState))), {
      sort: false,
      encode: false
    });
  };
};

exports.replaceStateKeyInQueryString = replaceStateKeyInQueryString;

var replaceQueryStringInLocation = function replaceQueryStringInLocation(location, queryString) {
  if (queryString === getQueryStringFromLocation(location.search)) {
    return location;
  } else {
    return _objectSpread({}, location, {
      search: "?".concat(queryString)
    });
  }
};

exports.replaceQueryStringInLocation = replaceQueryStringInLocation;

var getUrlType = function getUrlType(pageName) {
  if (pageName === _types.SiemPageName.overview) {
    return 'overview';
  } else if (pageName === _types.SiemPageName.hosts) {
    return 'host';
  } else if (pageName === _types.SiemPageName.network) {
    return 'network';
  } else if (pageName === _types.SiemPageName.detections) {
    return 'detections';
  } else if (pageName === _types.SiemPageName.timelines) {
    return 'timeline';
  } else if (pageName === _types.SiemPageName.case) {
    return 'case';
  }

  return 'overview';
};

exports.getUrlType = getUrlType;

var getTitle = function getTitle(pageName, detailName, navTabs) {
  if (detailName != null) return detailName;
  return navTabs[pageName] != null ? navTabs[pageName].name : '';
};

exports.getTitle = getTitle;

var makeMapStateToProps = function makeMapStateToProps() {
  var getInputsSelector = _store.inputsSelectors.inputsSelector();

  var getGlobalQuerySelector = _store.inputsSelectors.globalQuerySelector();

  var getGlobalFiltersQuerySelector = _store.inputsSelectors.globalFiltersQuerySelector();

  var getGlobalSavedQuerySelector = _store.inputsSelectors.globalSavedQuerySelector();

  var getTimelines = _store.timelineSelectors.getTimelines();

  var mapStateToProps = function mapStateToProps(state) {
    var _searchAttr, _global, _timeline, _objectSpread3;

    var inputState = getInputsSelector(state);
    var _inputState$global = inputState.global,
        globalLinkTo = _inputState$global.linkTo,
        globalTimerange = _inputState$global.timerange;
    var _inputState$timeline = inputState.timeline,
        timelineLinkTo = _inputState$timeline.linkTo,
        timelineTimerange = _inputState$timeline.timerange;
    var timeline = Object.entries(getTimelines(state)).reduce(function (obj, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          timelineId = _ref2[0],
          timelineObj = _ref2[1];

      return {
        id: timelineObj.savedObjectId != null ? timelineObj.savedObjectId : '',
        isOpen: timelineObj.show
      };
    }, {
      id: '',
      isOpen: false
    });
    var searchAttr = (_searchAttr = {}, _defineProperty(_searchAttr, _constants.CONSTANTS.appQuery, getGlobalQuerySelector(state)), _defineProperty(_searchAttr, _constants.CONSTANTS.filters, getGlobalFiltersQuerySelector(state)), _searchAttr);
    var savedQuery = getGlobalSavedQuerySelector(state);

    if (savedQuery != null && savedQuery.id !== '') {
      searchAttr = _defineProperty({}, _constants.CONSTANTS.savedQuery, savedQuery.id);
    }

    return {
      urlState: _objectSpread({}, searchAttr, (_objectSpread3 = {}, _defineProperty(_objectSpread3, _constants.CONSTANTS.timerange, {
        global: (_global = {}, _defineProperty(_global, _constants.CONSTANTS.timerange, globalTimerange), _defineProperty(_global, "linkTo", globalLinkTo), _global),
        timeline: (_timeline = {}, _defineProperty(_timeline, _constants.CONSTANTS.timerange, timelineTimerange), _defineProperty(_timeline, "linkTo", timelineLinkTo), _timeline)
      }), _defineProperty(_objectSpread3, _constants.CONSTANTS.timeline, timeline), _objectSpread3))
    };
  };

  return mapStateToProps;
};

exports.makeMapStateToProps = makeMapStateToProps;

var updateTimerangeUrl = function updateTimerangeUrl(timeRange, isInitializing) {
  if (timeRange.global.timerange.kind === 'relative') {
    timeRange.global.timerange.from = (0, _super_date_picker.formatDate)(timeRange.global.timerange.fromStr);
    timeRange.global.timerange.to = (0, _super_date_picker.formatDate)(timeRange.global.timerange.toStr, {
      roundUp: true
    });
  }

  if (timeRange.timeline.timerange.kind === 'relative' && isInitializing) {
    timeRange.timeline.timerange.from = (0, _super_date_picker.formatDate)(timeRange.timeline.timerange.fromStr);
    timeRange.timeline.timerange.to = (0, _super_date_picker.formatDate)(timeRange.timeline.timerange.toStr, {
      roundUp: true
    });
  }

  return timeRange;
};

exports.updateTimerangeUrl = updateTimerangeUrl;

var updateUrlStateString = function updateUrlStateString(_ref3) {
  var isInitializing = _ref3.isInitializing,
      history = _ref3.history,
      newUrlStateString = _ref3.newUrlStateString,
      pathName = _ref3.pathName,
      search = _ref3.search,
      updateTimerange = _ref3.updateTimerange,
      urlKey = _ref3.urlKey;

  if (urlKey === _constants.CONSTANTS.appQuery) {
    var queryState = decodeRisonUrlState(newUrlStateString);

    if (queryState != null && queryState.query === '') {
      return replaceStateInLocation({
        history: history,
        pathName: pathName,
        search: search,
        urlStateToReplace: '',
        urlStateKey: urlKey
      });
    }
  } else if (urlKey === _constants.CONSTANTS.timerange && updateTimerange) {
    var _queryState = decodeRisonUrlState(newUrlStateString);

    if (_queryState != null && _queryState.global != null) {
      return replaceStateInLocation({
        history: history,
        pathName: pathName,
        search: search,
        urlStateToReplace: updateTimerangeUrl(_queryState, isInitializing),
        urlStateKey: urlKey
      });
    }
  } else if (urlKey === _constants.CONSTANTS.filters) {
    var _queryState2 = decodeRisonUrlState(newUrlStateString);

    if ((0, _fp.isEmpty)(_queryState2)) {
      return replaceStateInLocation({
        history: history,
        pathName: pathName,
        search: search,
        urlStateToReplace: '',
        urlStateKey: urlKey
      });
    }
  } else if (urlKey === _constants.CONSTANTS.timeline) {
    var _queryState3 = decodeRisonUrlState(newUrlStateString);

    if (_queryState3 != null && _queryState3.id === '') {
      return replaceStateInLocation({
        history: history,
        pathName: pathName,
        search: search,
        urlStateToReplace: '',
        urlStateKey: urlKey
      });
    }
  }

  return search;
};

exports.updateUrlStateString = updateUrlStateString;

var replaceStateInLocation = function replaceStateInLocation(_ref4) {
  var history = _ref4.history,
      urlStateToReplace = _ref4.urlStateToReplace,
      urlStateKey = _ref4.urlStateKey,
      pathName = _ref4.pathName,
      search = _ref4.search;
  var newLocation = replaceQueryStringInLocation({
    hash: '',
    pathname: pathName,
    search: search,
    state: ''
  }, replaceStateKeyInQueryString(urlStateKey, urlStateToReplace)(getQueryStringFromLocation(search)));

  if (history) {
    history.replace(newLocation);
  }

  return newLocation.search;
};

exports.replaceStateInLocation = replaceStateInLocation;
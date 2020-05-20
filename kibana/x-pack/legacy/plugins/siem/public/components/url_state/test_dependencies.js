"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testCases = exports.getMockPropsObj = exports.getMockProps = exports.defaultProps = exports.mockHistory = exports.mockSetRelativeRangeDatePicker = exports.mockSetAbsoluteRangeDatePicker = exports.mockRemoveTimelineLinkTo = exports.mockRemoveGlobalLinkTo = exports.mockAddTimelineLinkTo = exports.mockAddGlobalLinkTo = exports.mockSetFilterQuery = exports.getFilterQuery = void 0;

var _home_navigations = require("../../pages/home/home_navigations");

var _types = require("../../pages/home/types");

var _store = require("../../store");

var _actions = require("../../store/actions");

var _model = require("../../store/hosts/model");

var _constants = require("./constants");

var _initialize_redux_by_url = require("./initialize_redux_by_url");

var _global, _timeline, _urlState;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pop = 'POP';

var getFilterQuery = function getFilterQuery() {
  return {
    query: 'host.name:"siem-es"',
    language: 'kuery'
  };
};

exports.getFilterQuery = getFilterQuery;
var mockSetFilterQuery = _actions.inputsActions.setFilterQuery;
exports.mockSetFilterQuery = mockSetFilterQuery;
var mockAddGlobalLinkTo = _actions.inputsActions.addGlobalLinkTo;
exports.mockAddGlobalLinkTo = mockAddGlobalLinkTo;
var mockAddTimelineLinkTo = _actions.inputsActions.addTimelineLinkTo;
exports.mockAddTimelineLinkTo = mockAddTimelineLinkTo;
var mockRemoveGlobalLinkTo = _actions.inputsActions.removeGlobalLinkTo;
exports.mockRemoveGlobalLinkTo = mockRemoveGlobalLinkTo;
var mockRemoveTimelineLinkTo = _actions.inputsActions.removeTimelineLinkTo;
exports.mockRemoveTimelineLinkTo = mockRemoveTimelineLinkTo;
var mockSetAbsoluteRangeDatePicker = _actions.inputsActions.setAbsoluteRangeDatePicker;
exports.mockSetAbsoluteRangeDatePicker = mockSetAbsoluteRangeDatePicker;
var mockSetRelativeRangeDatePicker = _actions.inputsActions.setRelativeRangeDatePicker;
exports.mockSetRelativeRangeDatePicker = mockSetRelativeRangeDatePicker;
jest.mock('../../store/actions', function () {
  return {
    inputsActions: {
      addGlobalLinkTo: jest.fn(),
      addTimelineLinkTo: jest.fn(),
      removeGlobalLinkTo: jest.fn(),
      removeTimelineLinkTo: jest.fn(),
      setAbsoluteRangeDatePicker: jest.fn(),
      setRelativeRangeDatePicker: jest.fn(),
      setFilterQuery: jest.fn()
    }
  };
});
var defaultLocation = {
  hash: '',
  pathname: '/network',
  search: '',
  state: ''
};
var mockDispatch = jest.fn();
mockDispatch.mockImplementation(function (fn) {
  return fn;
});
var mockHistory = {
  action: pop,
  block: jest.fn(),
  createHref: jest.fn(),
  go: jest.fn(),
  goBack: jest.fn(),
  goForward: jest.fn(),
  length: 2,
  listen: jest.fn(),
  location: defaultLocation,
  push: jest.fn(),
  replace: jest.fn()
};
exports.mockHistory = mockHistory;
var defaultProps = {
  pageName: _types.SiemPageName.network,
  detailName: undefined,
  tabName: _model.HostsTableType.authentications,
  search: '',
  pathName: '/network',
  navTabs: _home_navigations.navTabs,
  indexPattern: {
    fields: [{
      aggregatable: true,
      name: '@timestamp',
      searchable: true,
      type: 'date'
    }],
    title: 'filebeat-*,packetbeat-*'
  },
  urlState: (_urlState = {}, _defineProperty(_urlState, _constants.CONSTANTS.timerange, {
    global: (_global = {}, _defineProperty(_global, _constants.CONSTANTS.timerange, {
      from: 1558048243696,
      fromStr: 'now-24h',
      kind: 'relative',
      to: 1558134643697,
      toStr: 'now'
    }), _defineProperty(_global, "linkTo", ['timeline']), _global),
    timeline: (_timeline = {}, _defineProperty(_timeline, _constants.CONSTANTS.timerange, {
      from: 1558048243696,
      fromStr: 'now-24h',
      kind: 'relative',
      to: 1558134643697,
      toStr: 'now'
    }), _defineProperty(_timeline, "linkTo", ['global']), _timeline)
  }), _defineProperty(_urlState, _constants.CONSTANTS.appQuery, {
    query: '',
    language: 'kuery'
  }), _defineProperty(_urlState, _constants.CONSTANTS.filters, []), _defineProperty(_urlState, _constants.CONSTANTS.timeline, {
    id: '',
    isOpen: false
  }), _urlState),
  setInitialStateFromUrl: (0, _initialize_redux_by_url.dispatchSetInitialStateFromUrl)(mockDispatch),
  updateTimeline: jest.fn(),
  updateTimelineIsLoading: jest.fn(),
  history: _objectSpread({}, mockHistory, {
    location: defaultLocation
  })
};
exports.defaultProps = defaultProps;

var getMockProps = function getMockProps() {
  var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultLocation;
  var kqlQueryKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.CONSTANTS.networkPage;
  var kqlQueryValue = arguments.length > 2 ? arguments[2] : undefined;
  var pageName = arguments.length > 3 ? arguments[3] : undefined;
  var detailName = arguments.length > 4 ? arguments[4] : undefined;
  return _objectSpread({}, defaultProps, {
    urlState: _objectSpread({}, defaultProps.urlState, _defineProperty({}, _constants.CONSTANTS.appQuery, kqlQueryValue || {
      query: '',
      language: 'kuery'
    })),
    history: _objectSpread({}, mockHistory, {
      location: location
    }),
    detailName: detailName,
    pageName: pageName,
    pathName: location.pathname,
    search: location.search
  });
};

exports.getMockProps = getMockProps;

var getMockPropsObj = function getMockPropsObj(_ref) {
  var page = _ref.page,
      examplePath = _ref.examplePath,
      namespaceLower = _ref.namespaceLower,
      pageName = _ref.pageName,
      detailName = _ref.detailName;
  return {
    noSearch: {
      undefinedQuery: getMockProps({
        hash: '',
        pathname: examplePath,
        search: '?',
        state: ''
      }, page, null, pageName, detailName),
      definedQuery: getMockProps({
        hash: '',
        pathname: examplePath,
        search: '?',
        state: ''
      }, page, getFilterQuery(), pageName, detailName)
    },
    relativeTimeSearch: {
      undefinedQuery: getMockProps({
        hash: '',
        pathname: examplePath,
        search: "?query=(language:kuery,query:'host.name:%22siem-es%22')&timerange=(global:(linkTo:!(),timerange:(from:1558591200000,fromStr:now-1d%2Fd,kind:relative,to:1558677599999,toStr:now-1d%2Fd)),timeline:(linkTo:!(),timerange:(from:1558732849370,fromStr:now-15m,kind:relative,to:1558733749370,toStr:now)))",
        state: ''
      }, page, null, pageName, detailName),
      definedQuery: getMockProps({
        hash: '',
        pathname: examplePath,
        search: "?query=(language:kuery,query:'host.name:%22siem-es%22')&timerange=(global:(linkTo:!(),timerange:(from:1558591200000,fromStr:now-1d%2Fd,kind:relative,to:1558677599999,toStr:now-1d%2Fd)),timeline:(linkTo:!(),timerange:(from:1558732849370,fromStr:now-15m,kind:relative,to:1558733749370,toStr:now)))",
        state: ''
      }, page, getFilterQuery(), pageName, detailName),
      undefinedLinkQuery: getMockProps({
        hash: '',
        pathname: examplePath,
        search: "?query=(language:kuery,query:'host.name:%22siem-es%22')&timerange=(global:(linkTo:!(timeline),timerange:(from:1558591200000,fromStr:now-1d%2Fd,kind:relative,to:1558677599999,toStr:now-1d%2Fd)),timeline:(linkTo:!(global),timerange:(from:1558732849370,fromStr:now-15m,kind:relative,to:1558733749370,toStr:now)))",
        state: ''
      }, page, null, pageName, detailName)
    },
    absoluteTimeSearch: {
      undefinedQuery: getMockProps({
        hash: '',
        pathname: examplePath,
        search: '?timerange=(global:(linkTo:!(timeline),timerange:(from:1556736012685,kind:absolute,to:1556822416082)),timeline:(linkTo:!(global),timerange:(from:1556736012685,kind:absolute,to:1556822416082)))',
        state: ''
      }, page, null, pageName, detailName),
      definedQuery: getMockProps({
        hash: '',
        pathname: examplePath,
        search: '?timerange=(global:(linkTo:!(timeline),timerange:(from:1556736012685,kind:absolute,to:1556822416082)),timeline:(linkTo:!(global),timerange:(from:1556736012685,kind:absolute,to:1556822416082)))',
        state: ''
      }, page, getFilterQuery(), pageName, detailName)
    },
    oppositeQueryLocationSearch: {
      undefinedQuery: getMockProps({
        hash: '',
        pathname: examplePath,
        search: "?query=(query:'host.name:%22siem-es%22',language:kuery)&timerange=(global:(linkTo:!(),timerange:(from:1558591200000,fromStr:now-1d%2Fd,kind:relative,to:1558677599999,toStr:now-1d%2Fd)),timeline:(linkTo:!(),timerange:(from:1558732849370,fromStr:now-15m,kind:relative,to:1558733749370,toStr:now)))",
        state: ''
      }, page, null, pageName, detailName)
    }
  };
}; // silly that this needs to be an array and not an object
// https://jestjs.io/docs/en/api#testeachtable-name-fn-timeout


exports.getMockPropsObj = getMockPropsObj;
var testCases = [[
/* page */
_constants.CONSTANTS.networkPage,
/* namespaceLower */
'network',
/* namespaceUpper */
'Network',
/* pathName */
'/network',
/* type */
_store.networkModel.NetworkType.page,
/* pageName */
_types.SiemPageName.network,
/* detailName */
undefined], [
/* page */
_constants.CONSTANTS.hostsPage,
/* namespaceLower */
'hosts',
/* namespaceUpper */
'Hosts',
/* pathName */
'/hosts',
/* type */
_store.hostsModel.HostsType.page,
/* pageName */
_types.SiemPageName.hosts,
/* detailName */
undefined], [
/* page */
_constants.CONSTANTS.hostsDetails,
/* namespaceLower */
'hosts',
/* namespaceUpper */
'Hosts',
/* pathName */
'/hosts/siem-es',
/* type */
_store.hostsModel.HostsType.details,
/* pageName */
_types.SiemPageName.hosts,
/* detailName */
'host-test'], [
/* page */
_constants.CONSTANTS.networkDetails,
/* namespaceLower */
'network',
/* namespaceUpper */
'Network',
/* pathName */
'/network/ip/100.90.80',
/* type */
_store.networkModel.NetworkType.details,
/* pageName */
_types.SiemPageName.network,
/* detailName */
'100.90.80'], [
/* page */
_constants.CONSTANTS.overviewPage,
/* namespaceLower */
'overview',
/* namespaceUpper */
'Overview',
/* pathName */
'/overview',
/* type */
null,
/* pageName */
_types.SiemPageName.overview,
/* detailName */
undefined], [
/* page */
_constants.CONSTANTS.timelinePage,
/* namespaceLower */
'timeline',
/* namespaceUpper */
'Timeline',
/* pathName */
'/timeline',
/* type */
null,
/* pageName */
_types.SiemPageName.timelines,
/* detailName */
undefined]];
exports.testCases = testCases;
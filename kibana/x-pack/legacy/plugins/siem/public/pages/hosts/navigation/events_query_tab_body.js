"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventsQueryTabBody = exports.histogramConfigs = exports.eventsStackByOptions = void 0;

var _react = _interopRequireWildcard(require("react"));

var _events_viewer = require("../../../components/events_viewer");

var _hosts = require("../../../store/hosts");

var _default_model = require("../../../components/events_viewer/default_model");

var _matrix_histogram = require("../../../components/matrix_histogram");

var i18n = _interopRequireWildcard(require("../translations"));

var _types = require("../../../graphql/types");

var _eventsStackByOptions;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var HOSTS_PAGE_TIMELINE_ID = 'hosts-page';
var EVENTS_HISTOGRAM_ID = 'eventsOverTimeQuery';
var eventsStackByOptions = [{
  text: 'event.action',
  value: 'event.action'
}, {
  text: 'event.dataset',
  value: 'event.dataset'
}, {
  text: 'event.module',
  value: 'event.module'
}];
exports.eventsStackByOptions = eventsStackByOptions;
var DEFAULT_STACK_BY = 'event.action';
var histogramConfigs = {
  defaultStackByOption: (_eventsStackByOptions = eventsStackByOptions.find(function (o) {
    return o.text === DEFAULT_STACK_BY;
  })) !== null && _eventsStackByOptions !== void 0 ? _eventsStackByOptions : eventsStackByOptions[0],
  errorMessage: i18n.ERROR_FETCHING_EVENTS_DATA,
  histogramType: _types.HistogramType.events,
  stackByOptions: eventsStackByOptions,
  subtitle: undefined,
  title: i18n.NAVIGATION_EVENTS_TITLE
};
exports.histogramConfigs = histogramConfigs;

var EventsQueryTabBody = function EventsQueryTabBody(_ref) {
  var deleteQuery = _ref.deleteQuery,
      endDate = _ref.endDate,
      filterQuery = _ref.filterQuery,
      pageFilters = _ref.pageFilters,
      setQuery = _ref.setQuery,
      startDate = _ref.startDate;
  (0, _react.useEffect)(function () {
    return function () {
      if (deleteQuery) {
        deleteQuery({
          id: EVENTS_HISTOGRAM_ID
        });
      }
    };
  }, [deleteQuery]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_matrix_histogram.MatrixHistogramContainer, _extends({
    endDate: endDate,
    filterQuery: filterQuery,
    setQuery: setQuery,
    sourceId: "default",
    startDate: startDate,
    type: _hosts.hostsModel.HostsType.page,
    id: EVENTS_HISTOGRAM_ID
  }, histogramConfigs)), _react.default.createElement(_events_viewer.StatefulEventsViewer, {
    defaultModel: _default_model.eventsDefaultModel,
    end: endDate,
    id: HOSTS_PAGE_TIMELINE_ID,
    start: startDate,
    pageFilters: pageFilters
  }));
};

exports.EventsQueryTabBody = EventsQueryTabBody;
EventsQueryTabBody.displayName = 'EventsQueryTabBody';
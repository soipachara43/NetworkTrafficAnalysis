"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monitorStatesQuery = exports.monitorStatesQueryString = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var monitorStatesQueryString = "\nquery MonitorStates($dateRangeStart: String!, $dateRangeEnd: String!, $pagination: String, $filters: String, $statusFilter: String, $pageSize: Int) {\n  monitorStates: getMonitorStates(\n    dateRangeStart: $dateRangeStart\n    dateRangeEnd: $dateRangeEnd\n    pagination: $pagination\n    filters: $filters\n    statusFilter: $statusFilter\n    pageSize: $pageSize\n  ) {\n    prevPagePagination\n    nextPagePagination\n    totalSummaryCount\n    summaries {\n      monitor_id\n      histogram {\n        count\n        points {\n          timestamp\n          up\n          down\n        }\n      }\n      state {\n        agent {\n          id\n        }\n        checks {\n          agent {\n            id\n          }\n          container {\n            id\n          }\n          kubernetes {\n            pod {\n              uid\n            }\n          }\n          monitor {\n            ip\n            name\n            status\n          }\n          observer {\n            geo {\n              name\n              location {\n                lat\n                lon\n              }\n            }\n          }\n          timestamp\n        }\n        geo {\n          name\n          location {\n            lat\n            lon\n          }\n        }\n        observer {\n          geo {\n            name\n            location {\n              lat\n              lon\n            }\n          }\n        }\n        monitor {\n          id\n          name\n          status\n          type\n        }\n        summary {\n          up\n          down\n          geo {\n            name\n            location {\n              lat\n              lon\n            }\n          }\n        }\n        url {\n          full\n          domain\n        }\n        timestamp\n      }\n    }\n  }\n}\n";
exports.monitorStatesQueryString = monitorStatesQueryString;
var monitorStatesQuery = (0, _graphqlTag.default)(_templateObject(), monitorStatesQueryString);
exports.monitorStatesQuery = monitorStatesQuery;
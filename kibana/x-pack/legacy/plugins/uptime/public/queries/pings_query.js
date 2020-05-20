"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pingsQuery = exports.pingsQueryString = void 0;

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

var pingsQueryString = "\nquery PingList(\n  $dateRangeStart: String!\n  $dateRangeEnd: String!\n  $monitorId: String\n  $status: String\n  $sort: String\n  $size: Int\n  $location: String\n  $page: Int\n) {\n  allPings(\n    dateRangeStart: $dateRangeStart\n    dateRangeEnd: $dateRangeEnd\n    monitorId: $monitorId\n    status: $status\n    sort: $sort\n    size: $size\n    location: $location\n    page: $page\n  ) {\n      total\n      locations\n      pings {\n        id\n        timestamp\n        http {\n          response {\n            status_code \n            body {\n              bytes\n              hash\n              content\n              content_bytes\n            }\n          }\n        }\n        error {\n          message\n          type\n        }\n        monitor {\n          duration {\n            us\n          }\n          id\n          ip\n          name\n          scheme\n          status\n          type\n        }\n        observer {\n          geo {\n            name\n          }\n        }\n      }\n    }\n  }\n";
exports.pingsQueryString = pingsQueryString;
var pingsQuery = (0, _graphqlTag.default)(_templateObject(), pingsQueryString);
exports.pingsQuery = pingsQuery;
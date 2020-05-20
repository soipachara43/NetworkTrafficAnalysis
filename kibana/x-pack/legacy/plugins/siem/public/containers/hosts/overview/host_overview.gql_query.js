"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostOverviewQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetHostOverviewQuery(\n    $sourceId: ID!\n    $hostName: String!\n    $timerange: TimerangeInput!\n    $defaultIndex: [String!]!\n    $inspect: Boolean!\n  ) {\n    source(id: $sourceId) {\n      id\n      HostOverview(hostName: $hostName, timerange: $timerange, defaultIndex: $defaultIndex) {\n        _id\n        host {\n          architecture\n          id\n          ip\n          mac\n          name\n          os {\n            family\n            name\n            platform\n            version\n          }\n          type\n        }\n        cloud {\n          instance {\n            id\n          }\n          machine {\n            type\n          }\n          provider\n          region\n        }\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var HostOverviewQuery = (0, _graphqlTag.default)(_templateObject());
exports.HostOverviewQuery = HostOverviewQuery;
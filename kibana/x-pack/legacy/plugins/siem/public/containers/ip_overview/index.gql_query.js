"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ipOverviewQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetIpOverviewQuery(\n    $sourceId: ID!\n    $filterQuery: String\n    $ip: String!\n    $defaultIndex: [String!]!\n    $inspect: Boolean!\n  ) {\n    source(id: $sourceId) {\n      id\n      IpOverview(filterQuery: $filterQuery, ip: $ip, defaultIndex: $defaultIndex) {\n        source {\n          firstSeen\n          lastSeen\n          autonomousSystem {\n            number\n            organization {\n              name\n            }\n          }\n          geo {\n            continent_name\n            city_name\n            country_iso_code\n            country_name\n            location {\n              lat\n              lon\n            }\n            region_iso_code\n            region_name\n          }\n        }\n        destination {\n          firstSeen\n          lastSeen\n          autonomousSystem {\n            number\n            organization {\n              name\n            }\n          }\n          geo {\n            continent_name\n            city_name\n            country_iso_code\n            country_name\n            location {\n              lat\n              lon\n            }\n            region_iso_code\n            region_name\n          }\n        }\n        host {\n          architecture\n          id\n          ip\n          mac\n          name\n          os {\n            family\n            name\n            platform\n            version\n          }\n          type\n        }\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ipOverviewQuery = (0, _graphqlTag.default)(_templateObject());
exports.ipOverviewQuery = ipOverviewQuery;
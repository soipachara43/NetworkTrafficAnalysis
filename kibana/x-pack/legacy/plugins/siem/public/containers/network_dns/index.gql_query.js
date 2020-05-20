"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.networkDnsQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetNetworkDnsQuery(\n    $defaultIndex: [String!]!\n    $filterQuery: String\n    $inspect: Boolean!\n    $isPtrIncluded: Boolean!\n    $pagination: PaginationInputPaginated!\n    $sort: NetworkDnsSortField!\n    $sourceId: ID!\n    $stackByField: String\n    $timerange: TimerangeInput!\n  ) {\n    source(id: $sourceId) {\n      id\n      NetworkDns(\n        isPtrIncluded: $isPtrIncluded\n        sort: $sort\n        timerange: $timerange\n        pagination: $pagination\n        filterQuery: $filterQuery\n        defaultIndex: $defaultIndex\n        stackByField: $stackByField\n      ) {\n        totalCount\n        edges {\n          node {\n            _id\n            dnsBytesIn\n            dnsBytesOut\n            dnsName\n            queryCount\n            uniqueDomains\n          }\n          cursor {\n            value\n          }\n        }\n        pageInfo {\n          activePage\n          fakeTotalCount\n          showMorePagesIndicator\n        }\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var networkDnsQuery = (0, _graphqlTag.default)(_templateObject());
exports.networkDnsQuery = networkDnsQuery;
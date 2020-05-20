"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tlsQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetTlsQuery(\n    $sourceId: ID!\n    $filterQuery: String\n    $flowTarget: FlowTargetSourceDest!\n    $ip: String!\n    $pagination: PaginationInputPaginated!\n    $sort: TlsSortField!\n    $timerange: TimerangeInput!\n    $defaultIndex: [String!]!\n    $inspect: Boolean!\n  ) {\n    source(id: $sourceId) {\n      id\n      Tls(\n        filterQuery: $filterQuery\n        flowTarget: $flowTarget\n        ip: $ip\n        pagination: $pagination\n        sort: $sort\n        timerange: $timerange\n        defaultIndex: $defaultIndex\n      ) {\n        totalCount\n        edges {\n          node {\n            _id\n            subjects\n            ja3\n            issuers\n            notAfter\n          }\n          cursor {\n            value\n          }\n        }\n        pageInfo {\n          activePage\n          fakeTotalCount\n          showMorePagesIndicator\n        }\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var tlsQuery = (0, _graphqlTag.default)(_templateObject());
exports.tlsQuery = tlsQuery;
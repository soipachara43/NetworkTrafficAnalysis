"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationsQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetAuthenticationsQuery(\n    $sourceId: ID!\n    $timerange: TimerangeInput!\n    $pagination: PaginationInputPaginated!\n    $filterQuery: String\n    $defaultIndex: [String!]!\n    $inspect: Boolean!\n  ) {\n    source(id: $sourceId) {\n      id\n      Authentications(\n        timerange: $timerange\n        pagination: $pagination\n        filterQuery: $filterQuery\n        defaultIndex: $defaultIndex\n      ) {\n        totalCount\n        edges {\n          node {\n            _id\n            failures\n            successes\n            user {\n              name\n            }\n            lastSuccess {\n              timestamp\n              source {\n                ip\n              }\n              host {\n                id\n                name\n              }\n            }\n            lastFailure {\n              timestamp\n              source {\n                ip\n              }\n              host {\n                id\n                name\n              }\n            }\n          }\n          cursor {\n            value\n          }\n        }\n        pageInfo {\n          activePage\n          fakeTotalCount\n          showMorePagesIndicator\n        }\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var authenticationsQuery = (0, _graphqlTag.default)(_templateObject());
exports.authenticationsQuery = authenticationsQuery;
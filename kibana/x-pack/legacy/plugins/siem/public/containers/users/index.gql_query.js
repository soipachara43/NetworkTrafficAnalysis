"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetUsersQuery(\n    $sourceId: ID!\n    $filterQuery: String\n    $flowTarget: FlowTarget!\n    $ip: String!\n    $pagination: PaginationInputPaginated!\n    $sort: UsersSortField!\n    $timerange: TimerangeInput!\n    $defaultIndex: [String!]!\n    $inspect: Boolean!\n  ) {\n    source(id: $sourceId) {\n      id\n      Users(\n        filterQuery: $filterQuery\n        flowTarget: $flowTarget\n        ip: $ip\n        pagination: $pagination\n        sort: $sort\n        timerange: $timerange\n        defaultIndex: $defaultIndex\n      ) {\n        totalCount\n        edges {\n          node {\n            user {\n              name\n              id\n              groupId\n              groupName\n              count\n            }\n          }\n          cursor {\n            value\n          }\n        }\n        pageInfo {\n          activePage\n          fakeTotalCount\n          showMorePagesIndicator\n        }\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var usersQuery = (0, _graphqlTag.default)(_templateObject());
exports.usersQuery = usersQuery;
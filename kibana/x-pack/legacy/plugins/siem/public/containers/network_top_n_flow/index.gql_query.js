"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.networkTopNFlowQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetNetworkTopNFlowQuery(\n    $sourceId: ID!\n    $ip: String\n    $filterQuery: String\n    $pagination: PaginationInputPaginated!\n    $sort: NetworkTopTablesSortField!\n    $flowTarget: FlowTargetSourceDest!\n    $timerange: TimerangeInput!\n    $defaultIndex: [String!]!\n    $inspect: Boolean!\n  ) {\n    source(id: $sourceId) {\n      id\n      NetworkTopNFlow(\n        filterQuery: $filterQuery\n        flowTarget: $flowTarget\n        ip: $ip\n        pagination: $pagination\n        sort: $sort\n        timerange: $timerange\n        defaultIndex: $defaultIndex\n      ) {\n        totalCount\n        edges {\n          node {\n            source {\n              autonomous_system {\n                name\n                number\n              }\n              domain\n              ip\n              location {\n                geo {\n                  continent_name\n                  country_name\n                  country_iso_code\n                  city_name\n                  region_iso_code\n                  region_name\n                }\n                flowTarget\n              }\n              flows\n              destination_ips\n            }\n            destination {\n              autonomous_system {\n                name\n                number\n              }\n              domain\n              ip\n              location {\n                geo {\n                  continent_name\n                  country_name\n                  country_iso_code\n                  city_name\n                  region_iso_code\n                  region_name\n                }\n                flowTarget\n              }\n              flows\n              source_ips\n            }\n            network {\n              bytes_in\n              bytes_out\n            }\n          }\n          cursor {\n            value\n          }\n        }\n        pageInfo {\n          activePage\n          fakeTotalCount\n          showMorePagesIndicator\n        }\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var networkTopNFlowQuery = (0, _graphqlTag.default)(_templateObject());
exports.networkTopNFlowQuery = networkTopNFlowQuery;
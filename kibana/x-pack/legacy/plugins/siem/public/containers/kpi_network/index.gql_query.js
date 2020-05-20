"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kpiNetworkQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  fragment KpiNetworkChartFields on KpiNetworkHistogramData {\n    x\n    y\n  }\n\n  query GetKpiNetworkQuery(\n    $sourceId: ID!\n    $timerange: TimerangeInput!\n    $filterQuery: String\n    $defaultIndex: [String!]!\n    $inspect: Boolean!\n  ) {\n    source(id: $sourceId) {\n      id\n      KpiNetwork(timerange: $timerange, filterQuery: $filterQuery, defaultIndex: $defaultIndex) {\n        networkEvents\n        uniqueFlowId\n        uniqueSourcePrivateIps\n        uniqueSourcePrivateIpsHistogram {\n          ...KpiNetworkChartFields\n        }\n        uniqueDestinationPrivateIps\n        uniqueDestinationPrivateIpsHistogram {\n          ...KpiNetworkChartFields\n        }\n        dnsQueries\n        tlsHandshakes\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var kpiNetworkQuery = (0, _graphqlTag.default)(_templateObject());
exports.kpiNetworkQuery = kpiNetworkQuery;
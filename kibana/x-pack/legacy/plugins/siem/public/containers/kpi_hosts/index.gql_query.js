"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kpiHostsQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  fragment KpiHostChartFields on KpiHostHistogramData {\n    x\n    y\n  }\n\n  query GetKpiHostsQuery(\n    $sourceId: ID!\n    $timerange: TimerangeInput!\n    $filterQuery: String\n    $defaultIndex: [String!]!\n    $inspect: Boolean!\n  ) {\n    source(id: $sourceId) {\n      id\n      KpiHosts(timerange: $timerange, filterQuery: $filterQuery, defaultIndex: $defaultIndex) {\n        hosts\n        hostsHistogram {\n          ...KpiHostChartFields\n        }\n        authSuccess\n        authSuccessHistogram {\n          ...KpiHostChartFields\n        }\n        authFailure\n        authFailureHistogram {\n          ...KpiHostChartFields\n        }\n        uniqueSourceIps\n        uniqueSourceIpsHistogram {\n          ...KpiHostChartFields\n        }\n        uniqueDestinationIps\n        uniqueDestinationIpsHistogram {\n          ...KpiHostChartFields\n        }\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var kpiHostsQuery = (0, _graphqlTag.default)(_templateObject());
exports.kpiHostsQuery = kpiHostsQuery;
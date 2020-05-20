"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kpiHostDetailsQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  fragment KpiHostDetailsChartFields on KpiHostHistogramData {\n    x\n    y\n  }\n\n  query GetKpiHostDetailsQuery(\n    $sourceId: ID!\n    $timerange: TimerangeInput!\n    $filterQuery: String\n    $defaultIndex: [String!]!\n    $inspect: Boolean!\n  ) {\n    source(id: $sourceId) {\n      id\n      KpiHostDetails(\n        timerange: $timerange\n        filterQuery: $filterQuery\n        defaultIndex: $defaultIndex\n      ) {\n        authSuccess\n        authSuccessHistogram {\n          ...KpiHostDetailsChartFields\n        }\n        authFailure\n        authFailureHistogram {\n          ...KpiHostDetailsChartFields\n        }\n        uniqueSourceIps\n        uniqueSourceIpsHistogram {\n          ...KpiHostDetailsChartFields\n        }\n        uniqueDestinationIps\n        uniqueDestinationIpsHistogram {\n          ...KpiHostDetailsChartFields\n        }\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var kpiHostDetailsQuery = (0, _graphqlTag.default)(_templateObject());
exports.kpiHostDetailsQuery = kpiHostDetailsQuery;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatrixHistogramGqlQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetMatrixHistogramQuery(\n    $defaultIndex: [String!]!\n    $filterQuery: String\n    $histogramType: HistogramType!\n    $inspect: Boolean!\n    $sourceId: ID!\n    $stackByField: String!\n    $timerange: TimerangeInput!\n  ) {\n    source(id: $sourceId) {\n      id\n      MatrixHistogram(\n        timerange: $timerange\n        filterQuery: $filterQuery\n        defaultIndex: $defaultIndex\n        stackByField: $stackByField\n        histogramType: $histogramType\n      ) {\n        matrixHistogramData {\n          x\n          y\n          g\n        }\n        totalCount\n        inspect @include(if: $inspect) {\n          dsl\n          response\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MatrixHistogramGqlQuery = (0, _graphqlTag.default)(_templateObject());
exports.MatrixHistogramGqlQuery = MatrixHistogramGqlQuery;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matrixHistogramSchema = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const matrixHistogramSchema = (0, _graphqlTag.default)`
  type MatrixOverTimeHistogramData {
    x: Float
    y: Float
    g: String
  }

  type MatrixHistogramOverTimeData {
    inspect: Inspect
    matrixHistogramData: [MatrixOverTimeHistogramData!]!
    totalCount: Float!
  }

  enum HistogramType {
    authentications
    anomalies
    events
    alerts
    dns
  }

  extend type Source {
    MatrixHistogram(
      filterQuery: String
      defaultIndex: [String!]!
      timerange: TimerangeInput!
      stackByField: String!
      histogramType: HistogramType!
    ): MatrixHistogramOverTimeData!
  }
`;
exports.matrixHistogramSchema = matrixHistogramSchema;
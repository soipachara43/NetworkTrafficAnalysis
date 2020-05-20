"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticsearchMatrixHistogramAdapter = void 0;

var _fp = require("lodash/fp");

var _types = require("../../graphql/types");

var _build_query = require("../../utils/build_query");

var _queryAnomalies_over_time = require("./query.anomalies_over_time.dsl");

var _query_dns_histogram = require("./query_dns_histogram.dsl");

var _queryEvents_over_time = require("./query.events_over_time.dsl");

var _utils = require("./utils");

var _queryAuthentications_over_time = require("./query.authentications_over_time.dsl");

var _query_alerts = require("./query_alerts.dsl");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const matrixHistogramConfig = {
  [_types.HistogramType.alerts]: {
    buildDsl: _query_alerts.buildAlertsHistogramQuery,
    aggName: 'aggregations.alertsGroup.buckets',
    parseKey: 'alerts.buckets'
  },
  [_types.HistogramType.anomalies]: {
    buildDsl: _queryAnomalies_over_time.buildAnomaliesOverTimeQuery,
    aggName: 'aggregations.anomalyActionGroup.buckets',
    parseKey: 'anomalies.buckets'
  },
  [_types.HistogramType.authentications]: {
    buildDsl: _queryAuthentications_over_time.buildAuthenticationsOverTimeQuery,
    aggName: 'aggregations.eventActionGroup.buckets',
    parseKey: 'events.buckets'
  },
  [_types.HistogramType.dns]: {
    buildDsl: _query_dns_histogram.buildDnsHistogramQuery,
    aggName: 'aggregations.NetworkDns.buckets',
    parseKey: 'dns.buckets',
    parser: _utils.getDnsParsedData
  },
  [_types.HistogramType.events]: {
    buildDsl: _queryEvents_over_time.buildEventsOverTimeQuery,
    aggName: 'aggregations.eventActionGroup.buckets',
    parseKey: 'events.buckets'
  }
};

class ElasticsearchMatrixHistogramAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getHistogramData(request, options) {
    const myConfig = (0, _fp.getOr)(null, options.histogramType, matrixHistogramConfig);

    if (myConfig == null) {
      throw new Error(`This histogram type ${options.histogramType} is unknown to the server side`);
    }

    const dsl = myConfig.buildDsl(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const totalCount = (0, _fp.getOr)(0, 'hits.total.value', response);
    const matrixHistogramData = (0, _fp.getOr)([], myConfig.aggName, response);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    return {
      inspect,
      matrixHistogramData: myConfig.parser ? myConfig.parser(matrixHistogramData, myConfig.parseKey) : (0, _utils.getGenericData)(matrixHistogramData, myConfig.parseKey),
      totalCount
    };
  }

}

exports.ElasticsearchMatrixHistogramAdapter = ElasticsearchMatrixHistogramAdapter;
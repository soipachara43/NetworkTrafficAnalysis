"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;

var _authentications = require("../authentications");

var _elasticsearch_adapter = require("../authentications/elasticsearch_adapter");

var _events = require("../events");

var _kibana_framework_adapter = require("../framework/kibana_framework_adapter");

var _hosts = require("../hosts");

var _kpi_hosts = require("../kpi_hosts");

var _elasticsearch_adapter2 = require("../kpi_hosts/elasticsearch_adapter");

var _index_fields = require("../index_fields");

var _ip_details = require("../ip_details");

var _tls = require("../tls");

var _kpi_network = require("../kpi_network");

var _elasticsearch_adapter3 = require("../kpi_network/elasticsearch_adapter");

var _network = require("../network");

var _overview = require("../overview");

var _elasticsearch_adapter4 = require("../overview/elasticsearch_adapter");

var _source_status = require("../source_status");

var _sources = require("../sources");

var _uncommon_processes = require("../uncommon_processes");

var _saved_object = require("../note/saved_object");

var _saved_object2 = require("../pinned_event/saved_object");

var _saved_object3 = require("../timeline/saved_object");

var _matrix_histogram = require("../matrix_histogram");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function compose(core, plugins, isProductionMode) {
  const framework = new _kibana_framework_adapter.KibanaBackendFrameworkAdapter(core, plugins, isProductionMode);
  const sources = new _sources.Sources(new _sources.ConfigurationSourcesAdapter());
  const sourceStatus = new _source_status.SourceStatus(new _source_status.ElasticsearchSourceStatusAdapter(framework));
  const timeline = new _saved_object3.Timeline();
  const note = new _saved_object.Note();
  const pinnedEvent = new _saved_object2.PinnedEvent();
  const domainLibs = {
    authentications: new _authentications.Authentications(new _elasticsearch_adapter.ElasticsearchAuthenticationAdapter(framework)),
    events: new _events.Events(new _events.ElasticsearchEventsAdapter(framework)),
    fields: new _index_fields.IndexFields(new _index_fields.ElasticsearchIndexFieldAdapter(framework)),
    hosts: new _hosts.Hosts(new _hosts.ElasticsearchHostsAdapter(framework)),
    ipDetails: new _ip_details.IpDetails(new _ip_details.ElasticsearchIpDetailsAdapter(framework)),
    tls: new _tls.TLS(new _tls.ElasticsearchTlsAdapter(framework)),
    kpiHosts: new _kpi_hosts.KpiHosts(new _elasticsearch_adapter2.ElasticsearchKpiHostsAdapter(framework)),
    kpiNetwork: new _kpi_network.KpiNetwork(new _elasticsearch_adapter3.ElasticsearchKpiNetworkAdapter(framework)),
    matrixHistogram: new _matrix_histogram.MatrixHistogram(new _matrix_histogram.ElasticsearchMatrixHistogramAdapter(framework)),
    network: new _network.Network(new _network.ElasticsearchNetworkAdapter(framework)),
    overview: new _overview.Overview(new _elasticsearch_adapter4.ElasticsearchOverviewAdapter(framework)),
    uncommonProcesses: new _uncommon_processes.UncommonProcesses(new _uncommon_processes.ElasticsearchUncommonProcessesAdapter(framework))
  };
  const libs = {
    framework,
    sourceStatus,
    sources,
    ...domainLibs,
    timeline,
    note,
    pinnedEvent
  };
  return libs;
}
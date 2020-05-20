"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initServer = void 0;

var _graphqlTools = require("graphql-tools");

var _graphql = require("./graphql");

var _authentications = require("./graphql/authentications");

var _ecs = require("./graphql/ecs");

var _events = require("./graphql/events");

var _hosts = require("./graphql/hosts");

var _ip_details = require("./graphql/ip_details");

var _kpi_hosts = require("./graphql/kpi_hosts");

var _kpi_network = require("./graphql/kpi_network");

var _network = require("./graphql/network");

var _note = require("./graphql/note");

var _pinned_event = require("./graphql/pinned_event");

var _overview = require("./graphql/overview");

var _scalar_date = require("./graphql/scalar_date");

var _scalar_to_any = require("./graphql/scalar_to_any");

var _scalar_to_boolean_array = require("./graphql/scalar_to_boolean_array");

var _scalar_to_date_array = require("./graphql/scalar_to_date_array");

var _scalar_to_number_array = require("./graphql/scalar_to_number_array");

var _source_status = require("./graphql/source_status");

var _sources = require("./graphql/sources");

var _timeline = require("./graphql/timeline");

var _uncommon_processes = require("./graphql/uncommon_processes");

var _who_am_i = require("./graphql/who_am_i");

var _tls = require("./graphql/tls");

var _matrix_histogram = require("./graphql/matrix_histogram");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const initServer = libs => {
  const schema = (0, _graphqlTools.makeExecutableSchema)({
    resolvers: [(0, _authentications.createAuthenticationsResolvers)(libs), (0, _events.createEsValueResolvers)(), (0, _events.createEventsResolvers)(libs), (0, _hosts.createHostsResolvers)(libs), (0, _ip_details.createIpDetailsResolvers)(libs), (0, _kpi_network.createKpiNetworkResolvers)(libs), (0, _matrix_histogram.createMatrixHistogramResolvers)(libs), (0, _note.createNoteResolvers)(libs), (0, _pinned_event.createPinnedEventResolvers)(libs), (0, _sources.createSourcesResolvers)(libs), (0, _ecs.createScalarToStringArrayValueResolvers)(), (0, _overview.createOverviewResolvers)(libs), (0, _network.createNetworkResolvers)(libs), (0, _scalar_date.createScalarDateResolvers)(), (0, _scalar_to_date_array.createScalarToDateArrayValueResolvers)(), (0, _scalar_to_any.createScalarToAnyValueResolvers)(), (0, _scalar_to_boolean_array.createScalarToBooleanArrayValueResolvers)(), (0, _scalar_to_number_array.createScalarToNumberArrayValueResolvers)(), (0, _sources.createSourcesResolvers)(libs), (0, _source_status.createSourceStatusResolvers)(libs), (0, _timeline.createTimelineResolvers)(libs), (0, _tls.createTlsResolvers)(libs), (0, _uncommon_processes.createUncommonProcessesResolvers)(libs), (0, _who_am_i.createWhoAmIResolvers)(), (0, _kpi_hosts.createKpiHostsResolvers)(libs)],
    typeDefs: _graphql.schemas
  });
  libs.framework.registerGraphQLEndpoint('/api/siem/graphql', schema);
};

exports.initServer = initServer;
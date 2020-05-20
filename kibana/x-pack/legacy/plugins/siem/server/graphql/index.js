"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemas = void 0;

var _root = require("../../common/graphql/root");

var _shared = require("../../common/graphql/shared");

var _authentications = require("./authentications");

var _ecs = require("./ecs");

var _events = require("./events");

var _hosts = require("./hosts");

var _ip_details = require("./ip_details");

var _kpi_hosts = require("./kpi_hosts");

var _kpi_network = require("./kpi_network");

var _network = require("./network");

var _overview = require("./overview");

var _scalar_date = require("./scalar_date");

var _note = require("./note");

var _pinned_event = require("./pinned_event");

var _scalar_to_any = require("./scalar_to_any");

var _scalar_to_boolean_array = require("./scalar_to_boolean_array");

var _scalar_to_date_array = require("./scalar_to_date_array");

var _scalar_to_number_array = require("./scalar_to_number_array");

var _source_status = require("./source_status");

var _sources = require("./sources");

var _timeline = require("./timeline");

var _tls = require("./tls");

var _uncommon_processes = require("./uncommon_processes");

var _who_am_i = require("./who_am_i");

var _matrix_histogram = require("./matrix_histogram");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const schemas = [_authentications.authenticationsSchema, _ecs.ecsSchema, _events.eventsSchema, _scalar_date.dateSchema, _scalar_to_any.toAnySchema, _scalar_to_number_array.toNumberSchema, _scalar_to_date_array.toDateSchema, _scalar_to_boolean_array.toBooleanSchema, _hosts.hostsSchema, ..._ip_details.ipDetailsSchemas, _kpi_network.kpiNetworkSchema, _kpi_hosts.kpiHostsSchema, _matrix_histogram.matrixHistogramSchema, _network.networkSchema, _note.noteSchema, _overview.overviewSchema, _pinned_event.pinnedEventSchema, _root.rootSchema, _sources.sourcesSchema, _source_status.sourceStatusSchema, _shared.sharedSchema, _timeline.timelineSchema, _tls.tlsSchema, _uncommon_processes.uncommonProcessesSchema, _who_am_i.whoAmISchema];
exports.schemas = schemas;
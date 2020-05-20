"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KpiNetworkChartFields = exports.KpiHostChartFields = exports.KpiHostDetailsChartFields = exports.GetUsersQuery = exports.GetUncommonProcessesQuery = exports.GetTlsQuery = exports.PersistTimelinePinnedEventMutation = exports.PersistTimelineMutation = exports.GetOneTimeline = exports.PersistTimelineNoteMutation = exports.GetTimelineQuery = exports.PersistTimelineFavoriteMutation = exports.GetTimelineDetailsQuery = exports.DeleteTimelineMutation = exports.GetAllTimeline = exports.SourceQuery = exports.GetOverviewNetworkQuery = exports.GetOverviewHostQuery = exports.GetNetworkTopNFlowQuery = exports.GetNetworkTopCountriesQuery = exports.GetNetworkHttpQuery = exports.GetNetworkDnsQuery = exports.GetMatrixHistogramQuery = exports.GetKpiNetworkQuery = exports.GetKpiHostsQuery = exports.GetKpiHostDetailsQuery = exports.GetIpOverviewQuery = exports.GetHostOverviewQuery = exports.GetHostsTableQuery = exports.GetHostFirstLastSeenQuery = exports.GetLastEventTimeQuery = exports.GetAuthenticationsQuery = exports.FlowDirection = exports.NetworkHttpFields = exports.NetworkDirectionEcs = exports.SortFieldTimeline = exports.TlsFields = exports.NetworkDnsFields = exports.NetworkTopTablesFields = exports.FlowTargetSourceDest = exports.HistogramType = exports.FlowTarget = exports.UsersFields = exports.HostsFields = exports.LastEventIndexKey = exports.Direction = exports.SortFieldNote = void 0;

/* tslint:disable */

/* eslint-disable */

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SortFieldNote;
exports.SortFieldNote = SortFieldNote;

(function (SortFieldNote) {
  SortFieldNote["updatedBy"] = "updatedBy";
  SortFieldNote["updated"] = "updated";
})(SortFieldNote || (exports.SortFieldNote = SortFieldNote = {}));

var Direction;
exports.Direction = Direction;

(function (Direction) {
  Direction["asc"] = "asc";
  Direction["desc"] = "desc";
})(Direction || (exports.Direction = Direction = {}));

var LastEventIndexKey;
exports.LastEventIndexKey = LastEventIndexKey;

(function (LastEventIndexKey) {
  LastEventIndexKey["hostDetails"] = "hostDetails";
  LastEventIndexKey["hosts"] = "hosts";
  LastEventIndexKey["ipDetails"] = "ipDetails";
  LastEventIndexKey["network"] = "network";
})(LastEventIndexKey || (exports.LastEventIndexKey = LastEventIndexKey = {}));

var HostsFields;
exports.HostsFields = HostsFields;

(function (HostsFields) {
  HostsFields["hostName"] = "hostName";
  HostsFields["lastSeen"] = "lastSeen";
})(HostsFields || (exports.HostsFields = HostsFields = {}));

var UsersFields;
exports.UsersFields = UsersFields;

(function (UsersFields) {
  UsersFields["name"] = "name";
  UsersFields["count"] = "count";
})(UsersFields || (exports.UsersFields = UsersFields = {}));

var FlowTarget;
exports.FlowTarget = FlowTarget;

(function (FlowTarget) {
  FlowTarget["client"] = "client";
  FlowTarget["destination"] = "destination";
  FlowTarget["server"] = "server";
  FlowTarget["source"] = "source";
})(FlowTarget || (exports.FlowTarget = FlowTarget = {}));

var HistogramType;
exports.HistogramType = HistogramType;

(function (HistogramType) {
  HistogramType["authentications"] = "authentications";
  HistogramType["anomalies"] = "anomalies";
  HistogramType["events"] = "events";
  HistogramType["alerts"] = "alerts";
  HistogramType["dns"] = "dns";
})(HistogramType || (exports.HistogramType = HistogramType = {}));

var FlowTargetSourceDest;
exports.FlowTargetSourceDest = FlowTargetSourceDest;

(function (FlowTargetSourceDest) {
  FlowTargetSourceDest["destination"] = "destination";
  FlowTargetSourceDest["source"] = "source";
})(FlowTargetSourceDest || (exports.FlowTargetSourceDest = FlowTargetSourceDest = {}));

var NetworkTopTablesFields;
exports.NetworkTopTablesFields = NetworkTopTablesFields;

(function (NetworkTopTablesFields) {
  NetworkTopTablesFields["bytes_in"] = "bytes_in";
  NetworkTopTablesFields["bytes_out"] = "bytes_out";
  NetworkTopTablesFields["flows"] = "flows";
  NetworkTopTablesFields["destination_ips"] = "destination_ips";
  NetworkTopTablesFields["source_ips"] = "source_ips";
})(NetworkTopTablesFields || (exports.NetworkTopTablesFields = NetworkTopTablesFields = {}));

var NetworkDnsFields;
exports.NetworkDnsFields = NetworkDnsFields;

(function (NetworkDnsFields) {
  NetworkDnsFields["dnsName"] = "dnsName";
  NetworkDnsFields["queryCount"] = "queryCount";
  NetworkDnsFields["uniqueDomains"] = "uniqueDomains";
  NetworkDnsFields["dnsBytesIn"] = "dnsBytesIn";
  NetworkDnsFields["dnsBytesOut"] = "dnsBytesOut";
})(NetworkDnsFields || (exports.NetworkDnsFields = NetworkDnsFields = {}));

var TlsFields;
exports.TlsFields = TlsFields;

(function (TlsFields) {
  TlsFields["_id"] = "_id";
})(TlsFields || (exports.TlsFields = TlsFields = {}));

var SortFieldTimeline;
exports.SortFieldTimeline = SortFieldTimeline;

(function (SortFieldTimeline) {
  SortFieldTimeline["title"] = "title";
  SortFieldTimeline["description"] = "description";
  SortFieldTimeline["updated"] = "updated";
  SortFieldTimeline["created"] = "created";
})(SortFieldTimeline || (exports.SortFieldTimeline = SortFieldTimeline = {}));

var NetworkDirectionEcs;
exports.NetworkDirectionEcs = NetworkDirectionEcs;

(function (NetworkDirectionEcs) {
  NetworkDirectionEcs["inbound"] = "inbound";
  NetworkDirectionEcs["outbound"] = "outbound";
  NetworkDirectionEcs["internal"] = "internal";
  NetworkDirectionEcs["external"] = "external";
  NetworkDirectionEcs["incoming"] = "incoming";
  NetworkDirectionEcs["outgoing"] = "outgoing";
  NetworkDirectionEcs["listening"] = "listening";
  NetworkDirectionEcs["unknown"] = "unknown";
})(NetworkDirectionEcs || (exports.NetworkDirectionEcs = NetworkDirectionEcs = {}));

var NetworkHttpFields;
exports.NetworkHttpFields = NetworkHttpFields;

(function (NetworkHttpFields) {
  NetworkHttpFields["domains"] = "domains";
  NetworkHttpFields["lastHost"] = "lastHost";
  NetworkHttpFields["lastSourceIp"] = "lastSourceIp";
  NetworkHttpFields["methods"] = "methods";
  NetworkHttpFields["path"] = "path";
  NetworkHttpFields["requestCount"] = "requestCount";
  NetworkHttpFields["statuses"] = "statuses";
})(NetworkHttpFields || (exports.NetworkHttpFields = NetworkHttpFields = {}));

var FlowDirection;
exports.FlowDirection = FlowDirection;

(function (FlowDirection) {
  FlowDirection["uniDirectional"] = "uniDirectional";
  FlowDirection["biDirectional"] = "biDirectional";
})(FlowDirection || (exports.FlowDirection = FlowDirection = {}));

// ====================================================
// Documents
// ====================================================
var GetAuthenticationsQuery;
exports.GetAuthenticationsQuery = GetAuthenticationsQuery;

(function (_GetAuthenticationsQuery) {})(GetAuthenticationsQuery || (exports.GetAuthenticationsQuery = GetAuthenticationsQuery = {}));

var GetLastEventTimeQuery;
exports.GetLastEventTimeQuery = GetLastEventTimeQuery;

(function (_GetLastEventTimeQuery) {})(GetLastEventTimeQuery || (exports.GetLastEventTimeQuery = GetLastEventTimeQuery = {}));

var GetHostFirstLastSeenQuery;
exports.GetHostFirstLastSeenQuery = GetHostFirstLastSeenQuery;

(function (_GetHostFirstLastSeenQuery) {})(GetHostFirstLastSeenQuery || (exports.GetHostFirstLastSeenQuery = GetHostFirstLastSeenQuery = {}));

var GetHostsTableQuery;
exports.GetHostsTableQuery = GetHostsTableQuery;

(function (_GetHostsTableQuery) {})(GetHostsTableQuery || (exports.GetHostsTableQuery = GetHostsTableQuery = {}));

var GetHostOverviewQuery;
exports.GetHostOverviewQuery = GetHostOverviewQuery;

(function (_GetHostOverviewQuery) {})(GetHostOverviewQuery || (exports.GetHostOverviewQuery = GetHostOverviewQuery = {}));

var GetIpOverviewQuery;
exports.GetIpOverviewQuery = GetIpOverviewQuery;

(function (_GetIpOverviewQuery) {})(GetIpOverviewQuery || (exports.GetIpOverviewQuery = GetIpOverviewQuery = {}));

var GetKpiHostDetailsQuery;
exports.GetKpiHostDetailsQuery = GetKpiHostDetailsQuery;

(function (_GetKpiHostDetailsQuery) {})(GetKpiHostDetailsQuery || (exports.GetKpiHostDetailsQuery = GetKpiHostDetailsQuery = {}));

var GetKpiHostsQuery;
exports.GetKpiHostsQuery = GetKpiHostsQuery;

(function (_GetKpiHostsQuery) {})(GetKpiHostsQuery || (exports.GetKpiHostsQuery = GetKpiHostsQuery = {}));

var GetKpiNetworkQuery;
exports.GetKpiNetworkQuery = GetKpiNetworkQuery;

(function (_GetKpiNetworkQuery) {})(GetKpiNetworkQuery || (exports.GetKpiNetworkQuery = GetKpiNetworkQuery = {}));

var GetMatrixHistogramQuery;
exports.GetMatrixHistogramQuery = GetMatrixHistogramQuery;

(function (_GetMatrixHistogramQuery) {})(GetMatrixHistogramQuery || (exports.GetMatrixHistogramQuery = GetMatrixHistogramQuery = {}));

var GetNetworkDnsQuery;
exports.GetNetworkDnsQuery = GetNetworkDnsQuery;

(function (_GetNetworkDnsQuery) {})(GetNetworkDnsQuery || (exports.GetNetworkDnsQuery = GetNetworkDnsQuery = {}));

var GetNetworkHttpQuery;
exports.GetNetworkHttpQuery = GetNetworkHttpQuery;

(function (_GetNetworkHttpQuery) {})(GetNetworkHttpQuery || (exports.GetNetworkHttpQuery = GetNetworkHttpQuery = {}));

var GetNetworkTopCountriesQuery;
exports.GetNetworkTopCountriesQuery = GetNetworkTopCountriesQuery;

(function (_GetNetworkTopCountriesQuery) {})(GetNetworkTopCountriesQuery || (exports.GetNetworkTopCountriesQuery = GetNetworkTopCountriesQuery = {}));

var GetNetworkTopNFlowQuery;
exports.GetNetworkTopNFlowQuery = GetNetworkTopNFlowQuery;

(function (_GetNetworkTopNFlowQuery) {})(GetNetworkTopNFlowQuery || (exports.GetNetworkTopNFlowQuery = GetNetworkTopNFlowQuery = {}));

var GetOverviewHostQuery;
exports.GetOverviewHostQuery = GetOverviewHostQuery;

(function (_GetOverviewHostQuery) {})(GetOverviewHostQuery || (exports.GetOverviewHostQuery = GetOverviewHostQuery = {}));

var GetOverviewNetworkQuery;
exports.GetOverviewNetworkQuery = GetOverviewNetworkQuery;

(function (_GetOverviewNetworkQuery) {})(GetOverviewNetworkQuery || (exports.GetOverviewNetworkQuery = GetOverviewNetworkQuery = {}));

var SourceQuery;
exports.SourceQuery = SourceQuery;

(function (_SourceQuery) {})(SourceQuery || (exports.SourceQuery = SourceQuery = {}));

var GetAllTimeline;
exports.GetAllTimeline = GetAllTimeline;

(function (_GetAllTimeline) {})(GetAllTimeline || (exports.GetAllTimeline = GetAllTimeline = {}));

var DeleteTimelineMutation;
exports.DeleteTimelineMutation = DeleteTimelineMutation;

(function (_DeleteTimelineMutation) {})(DeleteTimelineMutation || (exports.DeleteTimelineMutation = DeleteTimelineMutation = {}));

var GetTimelineDetailsQuery;
exports.GetTimelineDetailsQuery = GetTimelineDetailsQuery;

(function (_GetTimelineDetailsQuery) {})(GetTimelineDetailsQuery || (exports.GetTimelineDetailsQuery = GetTimelineDetailsQuery = {}));

var PersistTimelineFavoriteMutation;
exports.PersistTimelineFavoriteMutation = PersistTimelineFavoriteMutation;

(function (_PersistTimelineFavoriteMutation) {})(PersistTimelineFavoriteMutation || (exports.PersistTimelineFavoriteMutation = PersistTimelineFavoriteMutation = {}));

var GetTimelineQuery;
exports.GetTimelineQuery = GetTimelineQuery;

(function (_GetTimelineQuery) {})(GetTimelineQuery || (exports.GetTimelineQuery = GetTimelineQuery = {}));

var PersistTimelineNoteMutation;
exports.PersistTimelineNoteMutation = PersistTimelineNoteMutation;

(function (_PersistTimelineNoteMutation) {})(PersistTimelineNoteMutation || (exports.PersistTimelineNoteMutation = PersistTimelineNoteMutation = {}));

var GetOneTimeline;
exports.GetOneTimeline = GetOneTimeline;

(function (_GetOneTimeline) {})(GetOneTimeline || (exports.GetOneTimeline = GetOneTimeline = {}));

var PersistTimelineMutation;
exports.PersistTimelineMutation = PersistTimelineMutation;

(function (_PersistTimelineMutation) {})(PersistTimelineMutation || (exports.PersistTimelineMutation = PersistTimelineMutation = {}));

var PersistTimelinePinnedEventMutation;
exports.PersistTimelinePinnedEventMutation = PersistTimelinePinnedEventMutation;

(function (_PersistTimelinePinnedEventMutation) {})(PersistTimelinePinnedEventMutation || (exports.PersistTimelinePinnedEventMutation = PersistTimelinePinnedEventMutation = {}));

var GetTlsQuery;
exports.GetTlsQuery = GetTlsQuery;

(function (_GetTlsQuery) {})(GetTlsQuery || (exports.GetTlsQuery = GetTlsQuery = {}));

var GetUncommonProcessesQuery;
exports.GetUncommonProcessesQuery = GetUncommonProcessesQuery;

(function (_GetUncommonProcessesQuery) {})(GetUncommonProcessesQuery || (exports.GetUncommonProcessesQuery = GetUncommonProcessesQuery = {}));

var GetUsersQuery;
exports.GetUsersQuery = GetUsersQuery;

(function (_GetUsersQuery) {})(GetUsersQuery || (exports.GetUsersQuery = GetUsersQuery = {}));

var KpiHostDetailsChartFields;
exports.KpiHostDetailsChartFields = KpiHostDetailsChartFields;

(function (_KpiHostDetailsChartFields) {})(KpiHostDetailsChartFields || (exports.KpiHostDetailsChartFields = KpiHostDetailsChartFields = {}));

var KpiHostChartFields;
exports.KpiHostChartFields = KpiHostChartFields;

(function (_KpiHostChartFields) {})(KpiHostChartFields || (exports.KpiHostChartFields = KpiHostChartFields = {}));

var KpiNetworkChartFields;
exports.KpiNetworkChartFields = KpiNetworkChartFields;

(function (_KpiNetworkChartFields) {})(KpiNetworkChartFields || (exports.KpiNetworkChartFields = KpiNetworkChartFields = {}));
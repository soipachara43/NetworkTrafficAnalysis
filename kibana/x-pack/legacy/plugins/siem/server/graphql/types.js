"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutonomousSystemResolvers = exports.OverviewResolvers = exports.IpOverviewDataResolvers = exports.FirstLastSeenHostResolvers = exports.CloudMachineResolvers = exports.CloudInstanceResolvers = exports.CloudFieldsResolvers = exports.HostItemResolvers = exports.HostsEdgesResolvers = exports.HostsDataResolvers = exports.LastEventTimeDataResolvers = exports.DetailItemResolvers = exports.TimelineDetailsDataResolvers = exports.PageInfoResolvers = exports.SshEcsFieldsResolvers = exports.AuthEcsFieldsResolvers = exports.PackageEcsFieldsResolvers = exports.AuditEcsFieldsResolvers = exports.SystemEcsFieldResolvers = exports.FileFieldsResolvers = exports.ThreadResolvers = exports.ProcessHashDataResolvers = exports.ProcessEcsFieldsResolvers = exports.WinlogEcsFieldsResolvers = exports.UrlEcsFieldsResolvers = exports.HttpResponseDataResolvers = exports.HttpBodyDataResolvers = exports.HttpRequestDataResolvers = exports.HttpEcsFieldsResolvers = exports.ZeekSslDataResolvers = exports.ZeekFileDataResolvers = exports.ZeekHttpDataResolvers = exports.ZeekDnsDataResolvers = exports.ZeekNoticeDataResolvers = exports.ZeekConnectionDataResolvers = exports.ZeekEcsFieldsResolvers = exports.TlsServerCertificateDataResolvers = exports.TlsJa3DataResolvers = exports.TlsFingerprintsDataResolvers = exports.FingerprintDataResolvers = exports.TlsClientCertificateDataResolvers = exports.TlsEcsFieldsResolvers = exports.SuricataAlertDataResolvers = exports.SuricataEveDataResolvers = exports.SuricataEcsFieldsResolvers = exports.RuleFieldResolvers = exports.SignalFieldResolvers = exports.RuleEcsFieldResolvers = exports.NetworkEcsFieldResolvers = exports.EventEcsFieldsResolvers = exports.EndgameEcsFieldsResolvers = exports.DnsQuestionDataResolvers = exports.DnsEcsFieldsResolvers = exports.DestinationEcsFieldsResolvers = exports.PrimarySecondaryResolvers = exports.SummaryResolvers = exports.AuditdDataResolvers = exports.AuditdEcsFieldsResolvers = exports.EcsResolvers = exports.TimelineNonEcsDataResolvers = exports.TimelineItemResolvers = exports.TimelineEdgesResolvers = exports.TimelineDataResolvers = exports.InspectResolvers = exports.PageInfoPaginatedResolvers = exports.CursorTypeResolvers = exports.OsEcsFieldsResolvers = exports.HostEcsFieldsResolvers = exports.LocationResolvers = exports.GeoEcsFieldsResolvers = exports.SourceEcsFieldsResolvers = exports.LastSourceHostResolvers = exports.UserEcsFieldsResolvers = exports.AuthenticationItemResolvers = exports.AuthenticationsEdgesResolvers = exports.AuthenticationsDataResolvers = exports.IndexFieldResolvers = exports.SourceStatusResolvers = exports.SourceFieldsResolvers = exports.SourceConfigurationResolvers = exports.SourceResolvers = exports.PinnedEventResolvers = exports.ResponseNotesResolvers = exports.NoteResultResolvers = exports.QueryResolvers = exports.FlowDirection = exports.NetworkHttpFields = exports.NetworkDirectionEcs = exports.SortFieldTimeline = exports.TlsFields = exports.NetworkDnsFields = exports.NetworkTopTablesFields = exports.FlowTargetSourceDest = exports.HistogramType = exports.FlowTarget = exports.UsersFields = exports.HostsFields = exports.LastEventIndexKey = exports.Direction = exports.SortFieldNote = void 0;
exports.HostFieldsResolvers = exports.OsFieldsResolvers = exports.EventsTimelineDataResolvers = exports.EcsEdgesResolvers = exports.ResponseFavoriteTimelineResolvers = exports.ResponseTimelineResolvers = exports.ResponseNoteResolvers = exports.MutationResolvers = exports.ResponseTimelinesResolvers = exports.SortTimelineResultResolvers = exports.KueryFilterQueryResultResolvers = exports.SerializedKueryQueryResultResolvers = exports.SerializedFilterQueryResultResolvers = exports.FilterMetaTimelineResultResolvers = exports.FilterTimelineResultResolvers = exports.FavoriteTimelineResultResolvers = exports.DateRangePickerResultResolvers = exports.QueryMatchResultResolvers = exports.DataProviderResultResolvers = exports.ColumnHeaderResultResolvers = exports.TimelineResultResolvers = exports.SayMyNameResolvers = exports.UncommonProcessItemResolvers = exports.UncommonProcessesEdgesResolvers = exports.UncommonProcessesDataResolvers = exports.TlsNodeResolvers = exports.TlsEdgesResolvers = exports.TlsDataResolvers = exports.OverviewHostDataResolvers = exports.OverviewNetworkDataResolvers = exports.NetworkHttpItemResolvers = exports.NetworkHttpEdgesResolvers = exports.NetworkHttpDataResolvers = exports.NetworkDsOverTimeDataResolvers = exports.MatrixOverOrdinalHistogramDataResolvers = exports.NetworkDnsItemResolvers = exports.NetworkDnsEdgesResolvers = exports.NetworkDnsDataResolvers = exports.TopNFlowItemDestinationResolvers = exports.AutonomousSystemItemResolvers = exports.TopNFlowItemSourceResolvers = exports.NetworkTopNFlowItemResolvers = exports.NetworkTopNFlowEdgesResolvers = exports.NetworkTopNFlowDataResolvers = exports.TopNetworkTablesEcsFieldResolvers = exports.TopCountriesItemDestinationResolvers = exports.GeoItemResolvers = exports.TopCountriesItemSourceResolvers = exports.NetworkTopCountriesItemResolvers = exports.NetworkTopCountriesEdgesResolvers = exports.NetworkTopCountriesDataResolvers = exports.MatrixOverTimeHistogramDataResolvers = exports.MatrixHistogramOverTimeDataResolvers = exports.KpiHostDetailsDataResolvers = exports.KpiHostHistogramDataResolvers = exports.KpiHostsDataResolvers = exports.KpiNetworkHistogramDataResolvers = exports.KpiNetworkDataResolvers = exports.UsersItemResolvers = exports.UsersNodeResolvers = exports.UsersEdgesResolvers = exports.UsersDataResolvers = exports.AutonomousSystemOrganizationResolvers = void 0;

/* tslint:disable */

/* eslint-disable */

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
let SortFieldNote;
exports.SortFieldNote = SortFieldNote;

(function (SortFieldNote) {
  SortFieldNote["updatedBy"] = "updatedBy";
  SortFieldNote["updated"] = "updated";
})(SortFieldNote || (exports.SortFieldNote = SortFieldNote = {}));

let Direction;
exports.Direction = Direction;

(function (Direction) {
  Direction["asc"] = "asc";
  Direction["desc"] = "desc";
})(Direction || (exports.Direction = Direction = {}));

let LastEventIndexKey;
exports.LastEventIndexKey = LastEventIndexKey;

(function (LastEventIndexKey) {
  LastEventIndexKey["hostDetails"] = "hostDetails";
  LastEventIndexKey["hosts"] = "hosts";
  LastEventIndexKey["ipDetails"] = "ipDetails";
  LastEventIndexKey["network"] = "network";
})(LastEventIndexKey || (exports.LastEventIndexKey = LastEventIndexKey = {}));

let HostsFields;
exports.HostsFields = HostsFields;

(function (HostsFields) {
  HostsFields["hostName"] = "hostName";
  HostsFields["lastSeen"] = "lastSeen";
})(HostsFields || (exports.HostsFields = HostsFields = {}));

let UsersFields;
exports.UsersFields = UsersFields;

(function (UsersFields) {
  UsersFields["name"] = "name";
  UsersFields["count"] = "count";
})(UsersFields || (exports.UsersFields = UsersFields = {}));

let FlowTarget;
exports.FlowTarget = FlowTarget;

(function (FlowTarget) {
  FlowTarget["client"] = "client";
  FlowTarget["destination"] = "destination";
  FlowTarget["server"] = "server";
  FlowTarget["source"] = "source";
})(FlowTarget || (exports.FlowTarget = FlowTarget = {}));

let HistogramType;
exports.HistogramType = HistogramType;

(function (HistogramType) {
  HistogramType["authentications"] = "authentications";
  HistogramType["anomalies"] = "anomalies";
  HistogramType["events"] = "events";
  HistogramType["alerts"] = "alerts";
  HistogramType["dns"] = "dns";
})(HistogramType || (exports.HistogramType = HistogramType = {}));

let FlowTargetSourceDest;
exports.FlowTargetSourceDest = FlowTargetSourceDest;

(function (FlowTargetSourceDest) {
  FlowTargetSourceDest["destination"] = "destination";
  FlowTargetSourceDest["source"] = "source";
})(FlowTargetSourceDest || (exports.FlowTargetSourceDest = FlowTargetSourceDest = {}));

let NetworkTopTablesFields;
exports.NetworkTopTablesFields = NetworkTopTablesFields;

(function (NetworkTopTablesFields) {
  NetworkTopTablesFields["bytes_in"] = "bytes_in";
  NetworkTopTablesFields["bytes_out"] = "bytes_out";
  NetworkTopTablesFields["flows"] = "flows";
  NetworkTopTablesFields["destination_ips"] = "destination_ips";
  NetworkTopTablesFields["source_ips"] = "source_ips";
})(NetworkTopTablesFields || (exports.NetworkTopTablesFields = NetworkTopTablesFields = {}));

let NetworkDnsFields;
exports.NetworkDnsFields = NetworkDnsFields;

(function (NetworkDnsFields) {
  NetworkDnsFields["dnsName"] = "dnsName";
  NetworkDnsFields["queryCount"] = "queryCount";
  NetworkDnsFields["uniqueDomains"] = "uniqueDomains";
  NetworkDnsFields["dnsBytesIn"] = "dnsBytesIn";
  NetworkDnsFields["dnsBytesOut"] = "dnsBytesOut";
})(NetworkDnsFields || (exports.NetworkDnsFields = NetworkDnsFields = {}));

let TlsFields;
exports.TlsFields = TlsFields;

(function (TlsFields) {
  TlsFields["_id"] = "_id";
})(TlsFields || (exports.TlsFields = TlsFields = {}));

let SortFieldTimeline;
exports.SortFieldTimeline = SortFieldTimeline;

(function (SortFieldTimeline) {
  SortFieldTimeline["title"] = "title";
  SortFieldTimeline["description"] = "description";
  SortFieldTimeline["updated"] = "updated";
  SortFieldTimeline["created"] = "created";
})(SortFieldTimeline || (exports.SortFieldTimeline = SortFieldTimeline = {}));

let NetworkDirectionEcs;
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

let NetworkHttpFields;
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

let FlowDirection;
exports.FlowDirection = FlowDirection;

(function (FlowDirection) {
  FlowDirection["uniDirectional"] = "uniDirectional";
  FlowDirection["biDirectional"] = "biDirectional";
})(FlowDirection || (exports.FlowDirection = FlowDirection = {}));

let QueryResolvers;
exports.QueryResolvers = QueryResolvers;

(function (_QueryResolvers) {})(QueryResolvers || (exports.QueryResolvers = QueryResolvers = {}));

let NoteResultResolvers;
exports.NoteResultResolvers = NoteResultResolvers;

(function (_NoteResultResolvers) {})(NoteResultResolvers || (exports.NoteResultResolvers = NoteResultResolvers = {}));

let ResponseNotesResolvers;
exports.ResponseNotesResolvers = ResponseNotesResolvers;

(function (_ResponseNotesResolvers) {})(ResponseNotesResolvers || (exports.ResponseNotesResolvers = ResponseNotesResolvers = {}));

let PinnedEventResolvers;
exports.PinnedEventResolvers = PinnedEventResolvers;

(function (_PinnedEventResolvers) {})(PinnedEventResolvers || (exports.PinnedEventResolvers = PinnedEventResolvers = {}));

let SourceResolvers;
/** A set of configuration options for a security data source */

exports.SourceResolvers = SourceResolvers;

(function (_SourceResolvers) {})(SourceResolvers || (exports.SourceResolvers = SourceResolvers = {}));

let SourceConfigurationResolvers;
/** A mapping of semantic fields to their document counterparts */

exports.SourceConfigurationResolvers = SourceConfigurationResolvers;

(function (_SourceConfigurationResolvers) {})(SourceConfigurationResolvers || (exports.SourceConfigurationResolvers = SourceConfigurationResolvers = {}));

let SourceFieldsResolvers;
/** The status of an infrastructure data source */

exports.SourceFieldsResolvers = SourceFieldsResolvers;

(function (_SourceFieldsResolvers) {})(SourceFieldsResolvers || (exports.SourceFieldsResolvers = SourceFieldsResolvers = {}));

let SourceStatusResolvers;
/** A descriptor of a field in an index */

exports.SourceStatusResolvers = SourceStatusResolvers;

(function (_SourceStatusResolvers) {})(SourceStatusResolvers || (exports.SourceStatusResolvers = SourceStatusResolvers = {}));

let IndexFieldResolvers;
exports.IndexFieldResolvers = IndexFieldResolvers;

(function (_IndexFieldResolvers) {})(IndexFieldResolvers || (exports.IndexFieldResolvers = IndexFieldResolvers = {}));

let AuthenticationsDataResolvers;
exports.AuthenticationsDataResolvers = AuthenticationsDataResolvers;

(function (_AuthenticationsDataResolvers) {})(AuthenticationsDataResolvers || (exports.AuthenticationsDataResolvers = AuthenticationsDataResolvers = {}));

let AuthenticationsEdgesResolvers;
exports.AuthenticationsEdgesResolvers = AuthenticationsEdgesResolvers;

(function (_AuthenticationsEdgesResolvers) {})(AuthenticationsEdgesResolvers || (exports.AuthenticationsEdgesResolvers = AuthenticationsEdgesResolvers = {}));

let AuthenticationItemResolvers;
exports.AuthenticationItemResolvers = AuthenticationItemResolvers;

(function (_AuthenticationItemResolvers) {})(AuthenticationItemResolvers || (exports.AuthenticationItemResolvers = AuthenticationItemResolvers = {}));

let UserEcsFieldsResolvers;
exports.UserEcsFieldsResolvers = UserEcsFieldsResolvers;

(function (_UserEcsFieldsResolvers) {})(UserEcsFieldsResolvers || (exports.UserEcsFieldsResolvers = UserEcsFieldsResolvers = {}));

let LastSourceHostResolvers;
exports.LastSourceHostResolvers = LastSourceHostResolvers;

(function (_LastSourceHostResolvers) {})(LastSourceHostResolvers || (exports.LastSourceHostResolvers = LastSourceHostResolvers = {}));

let SourceEcsFieldsResolvers;
exports.SourceEcsFieldsResolvers = SourceEcsFieldsResolvers;

(function (_SourceEcsFieldsResolvers) {})(SourceEcsFieldsResolvers || (exports.SourceEcsFieldsResolvers = SourceEcsFieldsResolvers = {}));

let GeoEcsFieldsResolvers;
exports.GeoEcsFieldsResolvers = GeoEcsFieldsResolvers;

(function (_GeoEcsFieldsResolvers) {})(GeoEcsFieldsResolvers || (exports.GeoEcsFieldsResolvers = GeoEcsFieldsResolvers = {}));

let LocationResolvers;
exports.LocationResolvers = LocationResolvers;

(function (_LocationResolvers) {})(LocationResolvers || (exports.LocationResolvers = LocationResolvers = {}));

let HostEcsFieldsResolvers;
exports.HostEcsFieldsResolvers = HostEcsFieldsResolvers;

(function (_HostEcsFieldsResolvers) {})(HostEcsFieldsResolvers || (exports.HostEcsFieldsResolvers = HostEcsFieldsResolvers = {}));

let OsEcsFieldsResolvers;
exports.OsEcsFieldsResolvers = OsEcsFieldsResolvers;

(function (_OsEcsFieldsResolvers) {})(OsEcsFieldsResolvers || (exports.OsEcsFieldsResolvers = OsEcsFieldsResolvers = {}));

let CursorTypeResolvers;
exports.CursorTypeResolvers = CursorTypeResolvers;

(function (_CursorTypeResolvers) {})(CursorTypeResolvers || (exports.CursorTypeResolvers = CursorTypeResolvers = {}));

let PageInfoPaginatedResolvers;
exports.PageInfoPaginatedResolvers = PageInfoPaginatedResolvers;

(function (_PageInfoPaginatedResolvers) {})(PageInfoPaginatedResolvers || (exports.PageInfoPaginatedResolvers = PageInfoPaginatedResolvers = {}));

let InspectResolvers;
exports.InspectResolvers = InspectResolvers;

(function (_InspectResolvers) {})(InspectResolvers || (exports.InspectResolvers = InspectResolvers = {}));

let TimelineDataResolvers;
exports.TimelineDataResolvers = TimelineDataResolvers;

(function (_TimelineDataResolvers) {})(TimelineDataResolvers || (exports.TimelineDataResolvers = TimelineDataResolvers = {}));

let TimelineEdgesResolvers;
exports.TimelineEdgesResolvers = TimelineEdgesResolvers;

(function (_TimelineEdgesResolvers) {})(TimelineEdgesResolvers || (exports.TimelineEdgesResolvers = TimelineEdgesResolvers = {}));

let TimelineItemResolvers;
exports.TimelineItemResolvers = TimelineItemResolvers;

(function (_TimelineItemResolvers) {})(TimelineItemResolvers || (exports.TimelineItemResolvers = TimelineItemResolvers = {}));

let TimelineNonEcsDataResolvers;
exports.TimelineNonEcsDataResolvers = TimelineNonEcsDataResolvers;

(function (_TimelineNonEcsDataResolvers) {})(TimelineNonEcsDataResolvers || (exports.TimelineNonEcsDataResolvers = TimelineNonEcsDataResolvers = {}));

let EcsResolvers;
exports.EcsResolvers = EcsResolvers;

(function (_EcsResolvers) {})(EcsResolvers || (exports.EcsResolvers = EcsResolvers = {}));

let AuditdEcsFieldsResolvers;
exports.AuditdEcsFieldsResolvers = AuditdEcsFieldsResolvers;

(function (_AuditdEcsFieldsResolvers) {})(AuditdEcsFieldsResolvers || (exports.AuditdEcsFieldsResolvers = AuditdEcsFieldsResolvers = {}));

let AuditdDataResolvers;
exports.AuditdDataResolvers = AuditdDataResolvers;

(function (_AuditdDataResolvers) {})(AuditdDataResolvers || (exports.AuditdDataResolvers = AuditdDataResolvers = {}));

let SummaryResolvers;
exports.SummaryResolvers = SummaryResolvers;

(function (_SummaryResolvers) {})(SummaryResolvers || (exports.SummaryResolvers = SummaryResolvers = {}));

let PrimarySecondaryResolvers;
exports.PrimarySecondaryResolvers = PrimarySecondaryResolvers;

(function (_PrimarySecondaryResolvers) {})(PrimarySecondaryResolvers || (exports.PrimarySecondaryResolvers = PrimarySecondaryResolvers = {}));

let DestinationEcsFieldsResolvers;
exports.DestinationEcsFieldsResolvers = DestinationEcsFieldsResolvers;

(function (_DestinationEcsFieldsResolvers) {})(DestinationEcsFieldsResolvers || (exports.DestinationEcsFieldsResolvers = DestinationEcsFieldsResolvers = {}));

let DnsEcsFieldsResolvers;
exports.DnsEcsFieldsResolvers = DnsEcsFieldsResolvers;

(function (_DnsEcsFieldsResolvers) {})(DnsEcsFieldsResolvers || (exports.DnsEcsFieldsResolvers = DnsEcsFieldsResolvers = {}));

let DnsQuestionDataResolvers;
exports.DnsQuestionDataResolvers = DnsQuestionDataResolvers;

(function (_DnsQuestionDataResolvers) {})(DnsQuestionDataResolvers || (exports.DnsQuestionDataResolvers = DnsQuestionDataResolvers = {}));

let EndgameEcsFieldsResolvers;
exports.EndgameEcsFieldsResolvers = EndgameEcsFieldsResolvers;

(function (_EndgameEcsFieldsResolvers) {})(EndgameEcsFieldsResolvers || (exports.EndgameEcsFieldsResolvers = EndgameEcsFieldsResolvers = {}));

let EventEcsFieldsResolvers;
exports.EventEcsFieldsResolvers = EventEcsFieldsResolvers;

(function (_EventEcsFieldsResolvers) {})(EventEcsFieldsResolvers || (exports.EventEcsFieldsResolvers = EventEcsFieldsResolvers = {}));

let NetworkEcsFieldResolvers;
exports.NetworkEcsFieldResolvers = NetworkEcsFieldResolvers;

(function (_NetworkEcsFieldResolvers) {})(NetworkEcsFieldResolvers || (exports.NetworkEcsFieldResolvers = NetworkEcsFieldResolvers = {}));

let RuleEcsFieldResolvers;
exports.RuleEcsFieldResolvers = RuleEcsFieldResolvers;

(function (_RuleEcsFieldResolvers) {})(RuleEcsFieldResolvers || (exports.RuleEcsFieldResolvers = RuleEcsFieldResolvers = {}));

let SignalFieldResolvers;
exports.SignalFieldResolvers = SignalFieldResolvers;

(function (_SignalFieldResolvers) {})(SignalFieldResolvers || (exports.SignalFieldResolvers = SignalFieldResolvers = {}));

let RuleFieldResolvers;
exports.RuleFieldResolvers = RuleFieldResolvers;

(function (_RuleFieldResolvers) {})(RuleFieldResolvers || (exports.RuleFieldResolvers = RuleFieldResolvers = {}));

let SuricataEcsFieldsResolvers;
exports.SuricataEcsFieldsResolvers = SuricataEcsFieldsResolvers;

(function (_SuricataEcsFieldsResolvers) {})(SuricataEcsFieldsResolvers || (exports.SuricataEcsFieldsResolvers = SuricataEcsFieldsResolvers = {}));

let SuricataEveDataResolvers;
exports.SuricataEveDataResolvers = SuricataEveDataResolvers;

(function (_SuricataEveDataResolvers) {})(SuricataEveDataResolvers || (exports.SuricataEveDataResolvers = SuricataEveDataResolvers = {}));

let SuricataAlertDataResolvers;
exports.SuricataAlertDataResolvers = SuricataAlertDataResolvers;

(function (_SuricataAlertDataResolvers) {})(SuricataAlertDataResolvers || (exports.SuricataAlertDataResolvers = SuricataAlertDataResolvers = {}));

let TlsEcsFieldsResolvers;
exports.TlsEcsFieldsResolvers = TlsEcsFieldsResolvers;

(function (_TlsEcsFieldsResolvers) {})(TlsEcsFieldsResolvers || (exports.TlsEcsFieldsResolvers = TlsEcsFieldsResolvers = {}));

let TlsClientCertificateDataResolvers;
exports.TlsClientCertificateDataResolvers = TlsClientCertificateDataResolvers;

(function (_TlsClientCertificateDataResolvers) {})(TlsClientCertificateDataResolvers || (exports.TlsClientCertificateDataResolvers = TlsClientCertificateDataResolvers = {}));

let FingerprintDataResolvers;
exports.FingerprintDataResolvers = FingerprintDataResolvers;

(function (_FingerprintDataResolvers) {})(FingerprintDataResolvers || (exports.FingerprintDataResolvers = FingerprintDataResolvers = {}));

let TlsFingerprintsDataResolvers;
exports.TlsFingerprintsDataResolvers = TlsFingerprintsDataResolvers;

(function (_TlsFingerprintsDataResolvers) {})(TlsFingerprintsDataResolvers || (exports.TlsFingerprintsDataResolvers = TlsFingerprintsDataResolvers = {}));

let TlsJa3DataResolvers;
exports.TlsJa3DataResolvers = TlsJa3DataResolvers;

(function (_TlsJa3DataResolvers) {})(TlsJa3DataResolvers || (exports.TlsJa3DataResolvers = TlsJa3DataResolvers = {}));

let TlsServerCertificateDataResolvers;
exports.TlsServerCertificateDataResolvers = TlsServerCertificateDataResolvers;

(function (_TlsServerCertificateDataResolvers) {})(TlsServerCertificateDataResolvers || (exports.TlsServerCertificateDataResolvers = TlsServerCertificateDataResolvers = {}));

let ZeekEcsFieldsResolvers;
exports.ZeekEcsFieldsResolvers = ZeekEcsFieldsResolvers;

(function (_ZeekEcsFieldsResolvers) {})(ZeekEcsFieldsResolvers || (exports.ZeekEcsFieldsResolvers = ZeekEcsFieldsResolvers = {}));

let ZeekConnectionDataResolvers;
exports.ZeekConnectionDataResolvers = ZeekConnectionDataResolvers;

(function (_ZeekConnectionDataResolvers) {})(ZeekConnectionDataResolvers || (exports.ZeekConnectionDataResolvers = ZeekConnectionDataResolvers = {}));

let ZeekNoticeDataResolvers;
exports.ZeekNoticeDataResolvers = ZeekNoticeDataResolvers;

(function (_ZeekNoticeDataResolvers) {})(ZeekNoticeDataResolvers || (exports.ZeekNoticeDataResolvers = ZeekNoticeDataResolvers = {}));

let ZeekDnsDataResolvers;
exports.ZeekDnsDataResolvers = ZeekDnsDataResolvers;

(function (_ZeekDnsDataResolvers) {})(ZeekDnsDataResolvers || (exports.ZeekDnsDataResolvers = ZeekDnsDataResolvers = {}));

let ZeekHttpDataResolvers;
exports.ZeekHttpDataResolvers = ZeekHttpDataResolvers;

(function (_ZeekHttpDataResolvers) {})(ZeekHttpDataResolvers || (exports.ZeekHttpDataResolvers = ZeekHttpDataResolvers = {}));

let ZeekFileDataResolvers;
exports.ZeekFileDataResolvers = ZeekFileDataResolvers;

(function (_ZeekFileDataResolvers) {})(ZeekFileDataResolvers || (exports.ZeekFileDataResolvers = ZeekFileDataResolvers = {}));

let ZeekSslDataResolvers;
exports.ZeekSslDataResolvers = ZeekSslDataResolvers;

(function (_ZeekSslDataResolvers) {})(ZeekSslDataResolvers || (exports.ZeekSslDataResolvers = ZeekSslDataResolvers = {}));

let HttpEcsFieldsResolvers;
exports.HttpEcsFieldsResolvers = HttpEcsFieldsResolvers;

(function (_HttpEcsFieldsResolvers) {})(HttpEcsFieldsResolvers || (exports.HttpEcsFieldsResolvers = HttpEcsFieldsResolvers = {}));

let HttpRequestDataResolvers;
exports.HttpRequestDataResolvers = HttpRequestDataResolvers;

(function (_HttpRequestDataResolvers) {})(HttpRequestDataResolvers || (exports.HttpRequestDataResolvers = HttpRequestDataResolvers = {}));

let HttpBodyDataResolvers;
exports.HttpBodyDataResolvers = HttpBodyDataResolvers;

(function (_HttpBodyDataResolvers) {})(HttpBodyDataResolvers || (exports.HttpBodyDataResolvers = HttpBodyDataResolvers = {}));

let HttpResponseDataResolvers;
exports.HttpResponseDataResolvers = HttpResponseDataResolvers;

(function (_HttpResponseDataResolvers) {})(HttpResponseDataResolvers || (exports.HttpResponseDataResolvers = HttpResponseDataResolvers = {}));

let UrlEcsFieldsResolvers;
exports.UrlEcsFieldsResolvers = UrlEcsFieldsResolvers;

(function (_UrlEcsFieldsResolvers) {})(UrlEcsFieldsResolvers || (exports.UrlEcsFieldsResolvers = UrlEcsFieldsResolvers = {}));

let WinlogEcsFieldsResolvers;
exports.WinlogEcsFieldsResolvers = WinlogEcsFieldsResolvers;

(function (_WinlogEcsFieldsResolvers) {})(WinlogEcsFieldsResolvers || (exports.WinlogEcsFieldsResolvers = WinlogEcsFieldsResolvers = {}));

let ProcessEcsFieldsResolvers;
exports.ProcessEcsFieldsResolvers = ProcessEcsFieldsResolvers;

(function (_ProcessEcsFieldsResolvers) {})(ProcessEcsFieldsResolvers || (exports.ProcessEcsFieldsResolvers = ProcessEcsFieldsResolvers = {}));

let ProcessHashDataResolvers;
exports.ProcessHashDataResolvers = ProcessHashDataResolvers;

(function (_ProcessHashDataResolvers) {})(ProcessHashDataResolvers || (exports.ProcessHashDataResolvers = ProcessHashDataResolvers = {}));

let ThreadResolvers;
exports.ThreadResolvers = ThreadResolvers;

(function (_ThreadResolvers) {})(ThreadResolvers || (exports.ThreadResolvers = ThreadResolvers = {}));

let FileFieldsResolvers;
exports.FileFieldsResolvers = FileFieldsResolvers;

(function (_FileFieldsResolvers) {})(FileFieldsResolvers || (exports.FileFieldsResolvers = FileFieldsResolvers = {}));

let SystemEcsFieldResolvers;
exports.SystemEcsFieldResolvers = SystemEcsFieldResolvers;

(function (_SystemEcsFieldResolvers) {})(SystemEcsFieldResolvers || (exports.SystemEcsFieldResolvers = SystemEcsFieldResolvers = {}));

let AuditEcsFieldsResolvers;
exports.AuditEcsFieldsResolvers = AuditEcsFieldsResolvers;

(function (_AuditEcsFieldsResolvers) {})(AuditEcsFieldsResolvers || (exports.AuditEcsFieldsResolvers = AuditEcsFieldsResolvers = {}));

let PackageEcsFieldsResolvers;
exports.PackageEcsFieldsResolvers = PackageEcsFieldsResolvers;

(function (_PackageEcsFieldsResolvers) {})(PackageEcsFieldsResolvers || (exports.PackageEcsFieldsResolvers = PackageEcsFieldsResolvers = {}));

let AuthEcsFieldsResolvers;
exports.AuthEcsFieldsResolvers = AuthEcsFieldsResolvers;

(function (_AuthEcsFieldsResolvers) {})(AuthEcsFieldsResolvers || (exports.AuthEcsFieldsResolvers = AuthEcsFieldsResolvers = {}));

let SshEcsFieldsResolvers;
exports.SshEcsFieldsResolvers = SshEcsFieldsResolvers;

(function (_SshEcsFieldsResolvers) {})(SshEcsFieldsResolvers || (exports.SshEcsFieldsResolvers = SshEcsFieldsResolvers = {}));

let PageInfoResolvers;
exports.PageInfoResolvers = PageInfoResolvers;

(function (_PageInfoResolvers) {})(PageInfoResolvers || (exports.PageInfoResolvers = PageInfoResolvers = {}));

let TimelineDetailsDataResolvers;
exports.TimelineDetailsDataResolvers = TimelineDetailsDataResolvers;

(function (_TimelineDetailsDataResolvers) {})(TimelineDetailsDataResolvers || (exports.TimelineDetailsDataResolvers = TimelineDetailsDataResolvers = {}));

let DetailItemResolvers;
exports.DetailItemResolvers = DetailItemResolvers;

(function (_DetailItemResolvers) {})(DetailItemResolvers || (exports.DetailItemResolvers = DetailItemResolvers = {}));

let LastEventTimeDataResolvers;
exports.LastEventTimeDataResolvers = LastEventTimeDataResolvers;

(function (_LastEventTimeDataResolvers) {})(LastEventTimeDataResolvers || (exports.LastEventTimeDataResolvers = LastEventTimeDataResolvers = {}));

let HostsDataResolvers;
exports.HostsDataResolvers = HostsDataResolvers;

(function (_HostsDataResolvers) {})(HostsDataResolvers || (exports.HostsDataResolvers = HostsDataResolvers = {}));

let HostsEdgesResolvers;
exports.HostsEdgesResolvers = HostsEdgesResolvers;

(function (_HostsEdgesResolvers) {})(HostsEdgesResolvers || (exports.HostsEdgesResolvers = HostsEdgesResolvers = {}));

let HostItemResolvers;
exports.HostItemResolvers = HostItemResolvers;

(function (_HostItemResolvers) {})(HostItemResolvers || (exports.HostItemResolvers = HostItemResolvers = {}));

let CloudFieldsResolvers;
exports.CloudFieldsResolvers = CloudFieldsResolvers;

(function (_CloudFieldsResolvers) {})(CloudFieldsResolvers || (exports.CloudFieldsResolvers = CloudFieldsResolvers = {}));

let CloudInstanceResolvers;
exports.CloudInstanceResolvers = CloudInstanceResolvers;

(function (_CloudInstanceResolvers) {})(CloudInstanceResolvers || (exports.CloudInstanceResolvers = CloudInstanceResolvers = {}));

let CloudMachineResolvers;
exports.CloudMachineResolvers = CloudMachineResolvers;

(function (_CloudMachineResolvers) {})(CloudMachineResolvers || (exports.CloudMachineResolvers = CloudMachineResolvers = {}));

let FirstLastSeenHostResolvers;
exports.FirstLastSeenHostResolvers = FirstLastSeenHostResolvers;

(function (_FirstLastSeenHostResolvers) {})(FirstLastSeenHostResolvers || (exports.FirstLastSeenHostResolvers = FirstLastSeenHostResolvers = {}));

let IpOverviewDataResolvers;
exports.IpOverviewDataResolvers = IpOverviewDataResolvers;

(function (_IpOverviewDataResolvers) {})(IpOverviewDataResolvers || (exports.IpOverviewDataResolvers = IpOverviewDataResolvers = {}));

let OverviewResolvers;
exports.OverviewResolvers = OverviewResolvers;

(function (_OverviewResolvers) {})(OverviewResolvers || (exports.OverviewResolvers = OverviewResolvers = {}));

let AutonomousSystemResolvers;
exports.AutonomousSystemResolvers = AutonomousSystemResolvers;

(function (_AutonomousSystemResolvers) {})(AutonomousSystemResolvers || (exports.AutonomousSystemResolvers = AutonomousSystemResolvers = {}));

let AutonomousSystemOrganizationResolvers;
exports.AutonomousSystemOrganizationResolvers = AutonomousSystemOrganizationResolvers;

(function (_AutonomousSystemOrganizationResolvers) {})(AutonomousSystemOrganizationResolvers || (exports.AutonomousSystemOrganizationResolvers = AutonomousSystemOrganizationResolvers = {}));

let UsersDataResolvers;
exports.UsersDataResolvers = UsersDataResolvers;

(function (_UsersDataResolvers) {})(UsersDataResolvers || (exports.UsersDataResolvers = UsersDataResolvers = {}));

let UsersEdgesResolvers;
exports.UsersEdgesResolvers = UsersEdgesResolvers;

(function (_UsersEdgesResolvers) {})(UsersEdgesResolvers || (exports.UsersEdgesResolvers = UsersEdgesResolvers = {}));

let UsersNodeResolvers;
exports.UsersNodeResolvers = UsersNodeResolvers;

(function (_UsersNodeResolvers) {})(UsersNodeResolvers || (exports.UsersNodeResolvers = UsersNodeResolvers = {}));

let UsersItemResolvers;
exports.UsersItemResolvers = UsersItemResolvers;

(function (_UsersItemResolvers) {})(UsersItemResolvers || (exports.UsersItemResolvers = UsersItemResolvers = {}));

let KpiNetworkDataResolvers;
exports.KpiNetworkDataResolvers = KpiNetworkDataResolvers;

(function (_KpiNetworkDataResolvers) {})(KpiNetworkDataResolvers || (exports.KpiNetworkDataResolvers = KpiNetworkDataResolvers = {}));

let KpiNetworkHistogramDataResolvers;
exports.KpiNetworkHistogramDataResolvers = KpiNetworkHistogramDataResolvers;

(function (_KpiNetworkHistogramDataResolvers) {})(KpiNetworkHistogramDataResolvers || (exports.KpiNetworkHistogramDataResolvers = KpiNetworkHistogramDataResolvers = {}));

let KpiHostsDataResolvers;
exports.KpiHostsDataResolvers = KpiHostsDataResolvers;

(function (_KpiHostsDataResolvers) {})(KpiHostsDataResolvers || (exports.KpiHostsDataResolvers = KpiHostsDataResolvers = {}));

let KpiHostHistogramDataResolvers;
exports.KpiHostHistogramDataResolvers = KpiHostHistogramDataResolvers;

(function (_KpiHostHistogramDataResolvers) {})(KpiHostHistogramDataResolvers || (exports.KpiHostHistogramDataResolvers = KpiHostHistogramDataResolvers = {}));

let KpiHostDetailsDataResolvers;
exports.KpiHostDetailsDataResolvers = KpiHostDetailsDataResolvers;

(function (_KpiHostDetailsDataResolvers) {})(KpiHostDetailsDataResolvers || (exports.KpiHostDetailsDataResolvers = KpiHostDetailsDataResolvers = {}));

let MatrixHistogramOverTimeDataResolvers;
exports.MatrixHistogramOverTimeDataResolvers = MatrixHistogramOverTimeDataResolvers;

(function (_MatrixHistogramOverTimeDataResolvers) {})(MatrixHistogramOverTimeDataResolvers || (exports.MatrixHistogramOverTimeDataResolvers = MatrixHistogramOverTimeDataResolvers = {}));

let MatrixOverTimeHistogramDataResolvers;
exports.MatrixOverTimeHistogramDataResolvers = MatrixOverTimeHistogramDataResolvers;

(function (_MatrixOverTimeHistogramDataResolvers) {})(MatrixOverTimeHistogramDataResolvers || (exports.MatrixOverTimeHistogramDataResolvers = MatrixOverTimeHistogramDataResolvers = {}));

let NetworkTopCountriesDataResolvers;
exports.NetworkTopCountriesDataResolvers = NetworkTopCountriesDataResolvers;

(function (_NetworkTopCountriesDataResolvers) {})(NetworkTopCountriesDataResolvers || (exports.NetworkTopCountriesDataResolvers = NetworkTopCountriesDataResolvers = {}));

let NetworkTopCountriesEdgesResolvers;
exports.NetworkTopCountriesEdgesResolvers = NetworkTopCountriesEdgesResolvers;

(function (_NetworkTopCountriesEdgesResolvers) {})(NetworkTopCountriesEdgesResolvers || (exports.NetworkTopCountriesEdgesResolvers = NetworkTopCountriesEdgesResolvers = {}));

let NetworkTopCountriesItemResolvers;
exports.NetworkTopCountriesItemResolvers = NetworkTopCountriesItemResolvers;

(function (_NetworkTopCountriesItemResolvers) {})(NetworkTopCountriesItemResolvers || (exports.NetworkTopCountriesItemResolvers = NetworkTopCountriesItemResolvers = {}));

let TopCountriesItemSourceResolvers;
exports.TopCountriesItemSourceResolvers = TopCountriesItemSourceResolvers;

(function (_TopCountriesItemSourceResolvers) {})(TopCountriesItemSourceResolvers || (exports.TopCountriesItemSourceResolvers = TopCountriesItemSourceResolvers = {}));

let GeoItemResolvers;
exports.GeoItemResolvers = GeoItemResolvers;

(function (_GeoItemResolvers) {})(GeoItemResolvers || (exports.GeoItemResolvers = GeoItemResolvers = {}));

let TopCountriesItemDestinationResolvers;
exports.TopCountriesItemDestinationResolvers = TopCountriesItemDestinationResolvers;

(function (_TopCountriesItemDestinationResolvers) {})(TopCountriesItemDestinationResolvers || (exports.TopCountriesItemDestinationResolvers = TopCountriesItemDestinationResolvers = {}));

let TopNetworkTablesEcsFieldResolvers;
exports.TopNetworkTablesEcsFieldResolvers = TopNetworkTablesEcsFieldResolvers;

(function (_TopNetworkTablesEcsFieldResolvers) {})(TopNetworkTablesEcsFieldResolvers || (exports.TopNetworkTablesEcsFieldResolvers = TopNetworkTablesEcsFieldResolvers = {}));

let NetworkTopNFlowDataResolvers;
exports.NetworkTopNFlowDataResolvers = NetworkTopNFlowDataResolvers;

(function (_NetworkTopNFlowDataResolvers) {})(NetworkTopNFlowDataResolvers || (exports.NetworkTopNFlowDataResolvers = NetworkTopNFlowDataResolvers = {}));

let NetworkTopNFlowEdgesResolvers;
exports.NetworkTopNFlowEdgesResolvers = NetworkTopNFlowEdgesResolvers;

(function (_NetworkTopNFlowEdgesResolvers) {})(NetworkTopNFlowEdgesResolvers || (exports.NetworkTopNFlowEdgesResolvers = NetworkTopNFlowEdgesResolvers = {}));

let NetworkTopNFlowItemResolvers;
exports.NetworkTopNFlowItemResolvers = NetworkTopNFlowItemResolvers;

(function (_NetworkTopNFlowItemResolvers) {})(NetworkTopNFlowItemResolvers || (exports.NetworkTopNFlowItemResolvers = NetworkTopNFlowItemResolvers = {}));

let TopNFlowItemSourceResolvers;
exports.TopNFlowItemSourceResolvers = TopNFlowItemSourceResolvers;

(function (_TopNFlowItemSourceResolvers) {})(TopNFlowItemSourceResolvers || (exports.TopNFlowItemSourceResolvers = TopNFlowItemSourceResolvers = {}));

let AutonomousSystemItemResolvers;
exports.AutonomousSystemItemResolvers = AutonomousSystemItemResolvers;

(function (_AutonomousSystemItemResolvers) {})(AutonomousSystemItemResolvers || (exports.AutonomousSystemItemResolvers = AutonomousSystemItemResolvers = {}));

let TopNFlowItemDestinationResolvers;
exports.TopNFlowItemDestinationResolvers = TopNFlowItemDestinationResolvers;

(function (_TopNFlowItemDestinationResolvers) {})(TopNFlowItemDestinationResolvers || (exports.TopNFlowItemDestinationResolvers = TopNFlowItemDestinationResolvers = {}));

let NetworkDnsDataResolvers;
exports.NetworkDnsDataResolvers = NetworkDnsDataResolvers;

(function (_NetworkDnsDataResolvers) {})(NetworkDnsDataResolvers || (exports.NetworkDnsDataResolvers = NetworkDnsDataResolvers = {}));

let NetworkDnsEdgesResolvers;
exports.NetworkDnsEdgesResolvers = NetworkDnsEdgesResolvers;

(function (_NetworkDnsEdgesResolvers) {})(NetworkDnsEdgesResolvers || (exports.NetworkDnsEdgesResolvers = NetworkDnsEdgesResolvers = {}));

let NetworkDnsItemResolvers;
exports.NetworkDnsItemResolvers = NetworkDnsItemResolvers;

(function (_NetworkDnsItemResolvers) {})(NetworkDnsItemResolvers || (exports.NetworkDnsItemResolvers = NetworkDnsItemResolvers = {}));

let MatrixOverOrdinalHistogramDataResolvers;
exports.MatrixOverOrdinalHistogramDataResolvers = MatrixOverOrdinalHistogramDataResolvers;

(function (_MatrixOverOrdinalHistogramDataResolvers) {})(MatrixOverOrdinalHistogramDataResolvers || (exports.MatrixOverOrdinalHistogramDataResolvers = MatrixOverOrdinalHistogramDataResolvers = {}));

let NetworkDsOverTimeDataResolvers;
exports.NetworkDsOverTimeDataResolvers = NetworkDsOverTimeDataResolvers;

(function (_NetworkDsOverTimeDataResolvers) {})(NetworkDsOverTimeDataResolvers || (exports.NetworkDsOverTimeDataResolvers = NetworkDsOverTimeDataResolvers = {}));

let NetworkHttpDataResolvers;
exports.NetworkHttpDataResolvers = NetworkHttpDataResolvers;

(function (_NetworkHttpDataResolvers) {})(NetworkHttpDataResolvers || (exports.NetworkHttpDataResolvers = NetworkHttpDataResolvers = {}));

let NetworkHttpEdgesResolvers;
exports.NetworkHttpEdgesResolvers = NetworkHttpEdgesResolvers;

(function (_NetworkHttpEdgesResolvers) {})(NetworkHttpEdgesResolvers || (exports.NetworkHttpEdgesResolvers = NetworkHttpEdgesResolvers = {}));

let NetworkHttpItemResolvers;
exports.NetworkHttpItemResolvers = NetworkHttpItemResolvers;

(function (_NetworkHttpItemResolvers) {})(NetworkHttpItemResolvers || (exports.NetworkHttpItemResolvers = NetworkHttpItemResolvers = {}));

let OverviewNetworkDataResolvers;
exports.OverviewNetworkDataResolvers = OverviewNetworkDataResolvers;

(function (_OverviewNetworkDataResolvers) {})(OverviewNetworkDataResolvers || (exports.OverviewNetworkDataResolvers = OverviewNetworkDataResolvers = {}));

let OverviewHostDataResolvers;
exports.OverviewHostDataResolvers = OverviewHostDataResolvers;

(function (_OverviewHostDataResolvers) {})(OverviewHostDataResolvers || (exports.OverviewHostDataResolvers = OverviewHostDataResolvers = {}));

let TlsDataResolvers;
exports.TlsDataResolvers = TlsDataResolvers;

(function (_TlsDataResolvers) {})(TlsDataResolvers || (exports.TlsDataResolvers = TlsDataResolvers = {}));

let TlsEdgesResolvers;
exports.TlsEdgesResolvers = TlsEdgesResolvers;

(function (_TlsEdgesResolvers) {})(TlsEdgesResolvers || (exports.TlsEdgesResolvers = TlsEdgesResolvers = {}));

let TlsNodeResolvers;
exports.TlsNodeResolvers = TlsNodeResolvers;

(function (_TlsNodeResolvers) {})(TlsNodeResolvers || (exports.TlsNodeResolvers = TlsNodeResolvers = {}));

let UncommonProcessesDataResolvers;
exports.UncommonProcessesDataResolvers = UncommonProcessesDataResolvers;

(function (_UncommonProcessesDataResolvers) {})(UncommonProcessesDataResolvers || (exports.UncommonProcessesDataResolvers = UncommonProcessesDataResolvers = {}));

let UncommonProcessesEdgesResolvers;
exports.UncommonProcessesEdgesResolvers = UncommonProcessesEdgesResolvers;

(function (_UncommonProcessesEdgesResolvers) {})(UncommonProcessesEdgesResolvers || (exports.UncommonProcessesEdgesResolvers = UncommonProcessesEdgesResolvers = {}));

let UncommonProcessItemResolvers;
exports.UncommonProcessItemResolvers = UncommonProcessItemResolvers;

(function (_UncommonProcessItemResolvers) {})(UncommonProcessItemResolvers || (exports.UncommonProcessItemResolvers = UncommonProcessItemResolvers = {}));

let SayMyNameResolvers;
exports.SayMyNameResolvers = SayMyNameResolvers;

(function (_SayMyNameResolvers) {})(SayMyNameResolvers || (exports.SayMyNameResolvers = SayMyNameResolvers = {}));

let TimelineResultResolvers;
exports.TimelineResultResolvers = TimelineResultResolvers;

(function (_TimelineResultResolvers) {})(TimelineResultResolvers || (exports.TimelineResultResolvers = TimelineResultResolvers = {}));

let ColumnHeaderResultResolvers;
exports.ColumnHeaderResultResolvers = ColumnHeaderResultResolvers;

(function (_ColumnHeaderResultResolvers) {})(ColumnHeaderResultResolvers || (exports.ColumnHeaderResultResolvers = ColumnHeaderResultResolvers = {}));

let DataProviderResultResolvers;
exports.DataProviderResultResolvers = DataProviderResultResolvers;

(function (_DataProviderResultResolvers) {})(DataProviderResultResolvers || (exports.DataProviderResultResolvers = DataProviderResultResolvers = {}));

let QueryMatchResultResolvers;
exports.QueryMatchResultResolvers = QueryMatchResultResolvers;

(function (_QueryMatchResultResolvers) {})(QueryMatchResultResolvers || (exports.QueryMatchResultResolvers = QueryMatchResultResolvers = {}));

let DateRangePickerResultResolvers;
exports.DateRangePickerResultResolvers = DateRangePickerResultResolvers;

(function (_DateRangePickerResultResolvers) {})(DateRangePickerResultResolvers || (exports.DateRangePickerResultResolvers = DateRangePickerResultResolvers = {}));

let FavoriteTimelineResultResolvers;
exports.FavoriteTimelineResultResolvers = FavoriteTimelineResultResolvers;

(function (_FavoriteTimelineResultResolvers) {})(FavoriteTimelineResultResolvers || (exports.FavoriteTimelineResultResolvers = FavoriteTimelineResultResolvers = {}));

let FilterTimelineResultResolvers;
exports.FilterTimelineResultResolvers = FilterTimelineResultResolvers;

(function (_FilterTimelineResultResolvers) {})(FilterTimelineResultResolvers || (exports.FilterTimelineResultResolvers = FilterTimelineResultResolvers = {}));

let FilterMetaTimelineResultResolvers;
exports.FilterMetaTimelineResultResolvers = FilterMetaTimelineResultResolvers;

(function (_FilterMetaTimelineResultResolvers) {})(FilterMetaTimelineResultResolvers || (exports.FilterMetaTimelineResultResolvers = FilterMetaTimelineResultResolvers = {}));

let SerializedFilterQueryResultResolvers;
exports.SerializedFilterQueryResultResolvers = SerializedFilterQueryResultResolvers;

(function (_SerializedFilterQueryResultResolvers) {})(SerializedFilterQueryResultResolvers || (exports.SerializedFilterQueryResultResolvers = SerializedFilterQueryResultResolvers = {}));

let SerializedKueryQueryResultResolvers;
exports.SerializedKueryQueryResultResolvers = SerializedKueryQueryResultResolvers;

(function (_SerializedKueryQueryResultResolvers) {})(SerializedKueryQueryResultResolvers || (exports.SerializedKueryQueryResultResolvers = SerializedKueryQueryResultResolvers = {}));

let KueryFilterQueryResultResolvers;
exports.KueryFilterQueryResultResolvers = KueryFilterQueryResultResolvers;

(function (_KueryFilterQueryResultResolvers) {})(KueryFilterQueryResultResolvers || (exports.KueryFilterQueryResultResolvers = KueryFilterQueryResultResolvers = {}));

let SortTimelineResultResolvers;
exports.SortTimelineResultResolvers = SortTimelineResultResolvers;

(function (_SortTimelineResultResolvers) {})(SortTimelineResultResolvers || (exports.SortTimelineResultResolvers = SortTimelineResultResolvers = {}));

let ResponseTimelinesResolvers;
exports.ResponseTimelinesResolvers = ResponseTimelinesResolvers;

(function (_ResponseTimelinesResolvers) {})(ResponseTimelinesResolvers || (exports.ResponseTimelinesResolvers = ResponseTimelinesResolvers = {}));

let MutationResolvers;
exports.MutationResolvers = MutationResolvers;

(function (_MutationResolvers) {})(MutationResolvers || (exports.MutationResolvers = MutationResolvers = {}));

let ResponseNoteResolvers;
exports.ResponseNoteResolvers = ResponseNoteResolvers;

(function (_ResponseNoteResolvers) {})(ResponseNoteResolvers || (exports.ResponseNoteResolvers = ResponseNoteResolvers = {}));

let ResponseTimelineResolvers;
exports.ResponseTimelineResolvers = ResponseTimelineResolvers;

(function (_ResponseTimelineResolvers) {})(ResponseTimelineResolvers || (exports.ResponseTimelineResolvers = ResponseTimelineResolvers = {}));

let ResponseFavoriteTimelineResolvers;
exports.ResponseFavoriteTimelineResolvers = ResponseFavoriteTimelineResolvers;

(function (_ResponseFavoriteTimelineResolvers) {})(ResponseFavoriteTimelineResolvers || (exports.ResponseFavoriteTimelineResolvers = ResponseFavoriteTimelineResolvers = {}));

let EcsEdgesResolvers;
exports.EcsEdgesResolvers = EcsEdgesResolvers;

(function (_EcsEdgesResolvers) {})(EcsEdgesResolvers || (exports.EcsEdgesResolvers = EcsEdgesResolvers = {}));

let EventsTimelineDataResolvers;
exports.EventsTimelineDataResolvers = EventsTimelineDataResolvers;

(function (_EventsTimelineDataResolvers) {})(EventsTimelineDataResolvers || (exports.EventsTimelineDataResolvers = EventsTimelineDataResolvers = {}));

let OsFieldsResolvers;
exports.OsFieldsResolvers = OsFieldsResolvers;

(function (_OsFieldsResolvers) {})(OsFieldsResolvers || (exports.OsFieldsResolvers = OsFieldsResolvers = {}));

let HostFieldsResolvers;
/** Directs the executor to skip this field or fragment when the `if` argument is true. */

exports.HostFieldsResolvers = HostFieldsResolvers;

(function (_HostFieldsResolvers) {})(HostFieldsResolvers || (exports.HostFieldsResolvers = HostFieldsResolvers = {}));
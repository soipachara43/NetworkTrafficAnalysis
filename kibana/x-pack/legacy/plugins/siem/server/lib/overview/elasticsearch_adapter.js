"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticsearchOverviewAdapter = void 0;

var _fp = require("lodash/fp");

var _build_query = require("../../utils/build_query");

var _query = require("./query.dsl");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class ElasticsearchOverviewAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getOverviewNetwork(request, options) {
    const dsl = (0, _query.buildOverviewNetworkQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    return {
      inspect,
      auditbeatSocket: (0, _fp.getOr)(null, 'aggregations.unique_socket_count.doc_count', response),
      filebeatCisco: (0, _fp.getOr)(null, 'aggregations.unique_filebeat_count.unique_cisco_count.doc_count', response),
      filebeatNetflow: (0, _fp.getOr)(null, 'aggregations.unique_filebeat_count.unique_netflow_count.doc_count', response),
      filebeatPanw: (0, _fp.getOr)(null, 'aggregations.unique_filebeat_count.unique_panw_count.doc_count', response),
      filebeatSuricata: (0, _fp.getOr)(null, 'aggregations.unique_suricata_count.doc_count', response),
      filebeatZeek: (0, _fp.getOr)(null, 'aggregations.unique_zeek_count.doc_count', response),
      packetbeatDNS: (0, _fp.getOr)(null, 'aggregations.unique_dns_count.doc_count', response),
      packetbeatFlow: (0, _fp.getOr)(null, 'aggregations.unique_flow_count.doc_count', response),
      packetbeatTLS: (0, _fp.getOr)(null, 'aggregations.unique_packetbeat_count.unique_tls_count.doc_count', response)
    };
  }

  async getOverviewHost(request, options) {
    const dsl = (0, _query.buildOverviewHostQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    return {
      inspect,
      auditbeatAuditd: (0, _fp.getOr)(null, 'aggregations.auditd_count.doc_count', response),
      auditbeatFIM: (0, _fp.getOr)(null, 'aggregations.fim_count.doc_count', response),
      auditbeatLogin: (0, _fp.getOr)(null, 'aggregations.system_module.login_count.doc_count', response),
      auditbeatPackage: (0, _fp.getOr)(null, 'aggregations.system_module.package_count.doc_count', response),
      auditbeatProcess: (0, _fp.getOr)(null, 'aggregations.system_module.process_count.doc_count', response),
      auditbeatUser: (0, _fp.getOr)(null, 'aggregations.system_module.user_count.doc_count', response),
      endgameDns: (0, _fp.getOr)(null, 'aggregations.endgame_module.dns_event_count.doc_count', response),
      endgameFile: (0, _fp.getOr)(null, 'aggregations.endgame_module.file_event_count.doc_count', response),
      endgameImageLoad: (0, _fp.getOr)(null, 'aggregations.endgame_module.image_load_event_count.doc_count', response),
      endgameNetwork: (0, _fp.getOr)(null, 'aggregations.endgame_module.network_event_count.doc_count', response),
      endgameProcess: (0, _fp.getOr)(null, 'aggregations.endgame_module.process_event_count.doc_count', response),
      endgameRegistry: (0, _fp.getOr)(null, 'aggregations.endgame_module.registry_event.doc_count', response),
      endgameSecurity: (0, _fp.getOr)(null, 'aggregations.endgame_module.security_event_count.doc_count', response),
      filebeatSystemModule: (0, _fp.getOr)(null, 'aggregations.system_module.filebeat_count.doc_count', response),
      winlogbeatSecurity: (0, _fp.getOr)(null, 'aggregations.winlog_module.security_event_count.doc_count', response),
      winlogbeatMWSysmonOperational: (0, _fp.getOr)(null, 'aggregations.winlog_module.mwsysmon_operational_event_count.doc_count', response)
    };
  }

}

exports.ElasticsearchOverviewAdapter = ElasticsearchOverviewAdapter;
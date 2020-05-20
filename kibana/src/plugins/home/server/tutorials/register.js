"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.builtInTutorials = void 0;

var _system_logs = require("./system_logs");

var _system_metrics = require("./system_metrics");

var _apache_logs = require("./apache_logs");

var _apache_metrics = require("./apache_metrics");

var _elasticsearch_logs = require("./elasticsearch_logs");

var _iis_logs = require("./iis_logs");

var _kafka_logs = require("./kafka_logs");

var _logstash_logs = require("./logstash_logs");

var _nginx_logs = require("./nginx_logs");

var _nginx_metrics = require("./nginx_metrics");

var _mysql_logs = require("./mysql_logs");

var _mysql_metrics = require("./mysql_metrics");

var _mongodb_metrics = require("./mongodb_metrics");

var _osquery_logs = require("./osquery_logs");

var _php_fpm_metrics = require("./php_fpm_metrics");

var _postgresql_metrics = require("./postgresql_metrics");

var _postgresql_logs = require("./postgresql_logs");

var _rabbitmq_metrics = require("./rabbitmq_metrics");

var _redis_logs = require("./redis_logs");

var _redis_metrics = require("./redis_metrics");

var _suricata_logs = require("./suricata_logs");

var _docker_metrics = require("./docker_metrics");

var _kubernetes_metrics = require("./kubernetes_metrics");

var _uwsgi_metrics = require("./uwsgi_metrics");

var _netflow = require("./netflow");

var _traefik_logs = require("./traefik_logs");

var _ceph_metrics = require("./ceph_metrics");

var _aerospike_metrics = require("./aerospike_metrics");

var _couchbase_metrics = require("./couchbase_metrics");

var _dropwizard_metrics = require("./dropwizard_metrics");

var _elasticsearch_metrics = require("./elasticsearch_metrics");

var _etcd_metrics = require("./etcd_metrics");

var _haproxy_metrics = require("./haproxy_metrics");

var _kafka_metrics = require("./kafka_metrics");

var _kibana_metrics = require("./kibana_metrics");

var _memcached_metrics = require("./memcached_metrics");

var _munin_metrics = require("./munin_metrics");

var _vsphere_metrics = require("./vsphere_metrics");

var _windows_metrics = require("./windows_metrics");

var _windows_event_logs = require("./windows_event_logs");

var _golang_metrics = require("./golang_metrics");

var _logstash_metrics = require("./logstash_metrics");

var _prometheus_metrics = require("./prometheus_metrics");

var _zookeeper_metrics = require("./zookeeper_metrics");

var _uptime_monitors = require("./uptime_monitors");

var _cloudwatch_logs = require("./cloudwatch_logs");

var _aws_metrics = require("./aws_metrics");

var _mssql_metrics = require("./mssql_metrics");

var _nats_metrics = require("./nats_metrics");

var _nats_logs = require("./nats_logs");

var _zeek_logs = require("./zeek_logs");

var _coredns_metrics = require("./coredns_metrics");

var _coredns_logs = require("./coredns_logs");

var _auditbeat = require("./auditbeat");

var _iptables_logs = require("./iptables_logs");

var _cisco_logs = require("./cisco_logs");

var _envoyproxy_logs = require("./envoyproxy_logs");

var _couchdb_metrics = require("./couchdb_metrics");

var _consul_metrics = require("./consul_metrics");

var _cockroachdb_metrics = require("./cockroachdb_metrics");

var _traefik_metrics = require("./traefik_metrics");

var _aws_logs = require("./aws_logs");

var _activemq_logs = require("./activemq_logs");

var _activemq_metrics = require("./activemq_metrics");

var _azure_metrics = require("./azure_metrics");

var _ibmmq_logs = require("./ibmmq_logs");

var _stan_metrics = require("./stan_metrics");

var _envoyproxy_metrics = require("./envoyproxy_metrics");

var _ibmmq_metrics = require("./ibmmq_metrics");

var _statsd_metrics = require("./statsd_metrics");

var _redisenterprise_metrics = require("./redisenterprise_metrics");

var _openmetrics_metrics = require("./openmetrics_metrics");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const builtInTutorials = [_system_logs.systemLogsSpecProvider, _system_metrics.systemMetricsSpecProvider, _apache_logs.apacheLogsSpecProvider, _apache_metrics.apacheMetricsSpecProvider, _elasticsearch_logs.elasticsearchLogsSpecProvider, _iis_logs.iisLogsSpecProvider, _kafka_logs.kafkaLogsSpecProvider, _logstash_logs.logstashLogsSpecProvider, _nginx_logs.nginxLogsSpecProvider, _nginx_metrics.nginxMetricsSpecProvider, _mysql_logs.mysqlLogsSpecProvider, _mysql_metrics.mysqlMetricsSpecProvider, _mongodb_metrics.mongodbMetricsSpecProvider, _osquery_logs.osqueryLogsSpecProvider, _php_fpm_metrics.phpfpmMetricsSpecProvider, _postgresql_metrics.postgresqlMetricsSpecProvider, _postgresql_logs.postgresqlLogsSpecProvider, _rabbitmq_metrics.rabbitmqMetricsSpecProvider, _redis_logs.redisLogsSpecProvider, _redis_metrics.redisMetricsSpecProvider, _suricata_logs.suricataLogsSpecProvider, _docker_metrics.dockerMetricsSpecProvider, _kubernetes_metrics.kubernetesMetricsSpecProvider, _uwsgi_metrics.uwsgiMetricsSpecProvider, _netflow.netflowSpecProvider, _traefik_logs.traefikLogsSpecProvider, _ceph_metrics.cephMetricsSpecProvider, _aerospike_metrics.aerospikeMetricsSpecProvider, _couchbase_metrics.couchbaseMetricsSpecProvider, _dropwizard_metrics.dropwizardMetricsSpecProvider, _elasticsearch_metrics.elasticsearchMetricsSpecProvider, _etcd_metrics.etcdMetricsSpecProvider, _haproxy_metrics.haproxyMetricsSpecProvider, _kafka_metrics.kafkaMetricsSpecProvider, _kibana_metrics.kibanaMetricsSpecProvider, _memcached_metrics.memcachedMetricsSpecProvider, _munin_metrics.muninMetricsSpecProvider, _vsphere_metrics.vSphereMetricsSpecProvider, _windows_metrics.windowsMetricsSpecProvider, _windows_event_logs.windowsEventLogsSpecProvider, _golang_metrics.golangMetricsSpecProvider, _logstash_metrics.logstashMetricsSpecProvider, _prometheus_metrics.prometheusMetricsSpecProvider, _zookeeper_metrics.zookeeperMetricsSpecProvider, _uptime_monitors.uptimeMonitorsSpecProvider, _cloudwatch_logs.cloudwatchLogsSpecProvider, _aws_metrics.awsMetricsSpecProvider, _mssql_metrics.mssqlMetricsSpecProvider, _nats_metrics.natsMetricsSpecProvider, _nats_logs.natsLogsSpecProvider, _zeek_logs.zeekLogsSpecProvider, _coredns_metrics.corednsMetricsSpecProvider, _coredns_logs.corednsLogsSpecProvider, _auditbeat.auditbeatSpecProvider, _iptables_logs.iptablesLogsSpecProvider, _cisco_logs.ciscoLogsSpecProvider, _envoyproxy_logs.envoyproxyLogsSpecProvider, _couchdb_metrics.couchdbMetricsSpecProvider, _consul_metrics.consulMetricsSpecProvider, _cockroachdb_metrics.cockroachdbMetricsSpecProvider, _traefik_metrics.traefikMetricsSpecProvider, _aws_logs.awsLogsSpecProvider, _activemq_logs.activemqLogsSpecProvider, _activemq_metrics.activemqMetricsSpecProvider, _azure_metrics.azureMetricsSpecProvider, _ibmmq_logs.ibmmqLogsSpecProvider, _ibmmq_metrics.ibmmqMetricsSpecProvider, _stan_metrics.stanMetricsSpecProvider, _envoyproxy_metrics.envoyproxyMetricsSpecProvider, _statsd_metrics.statsdMetricsSpecProvider, _redisenterprise_metrics.redisenterpriseMetricsSpecProvider, _openmetrics_metrics.openmetricsMetricsSpecProvider];
exports.builtInTutorials = builtInTutorials;
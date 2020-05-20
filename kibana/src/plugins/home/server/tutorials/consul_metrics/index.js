"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consulMetricsSpecProvider = consulMetricsSpecProvider;

var _i18n = require("@kbn/i18n");

var _tutorials = require("../../services/tutorials");

var _metricbeat_instructions = require("../instructions/metricbeat_instructions");

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
function consulMetricsSpecProvider(context) {
  const moduleName = 'consul';
  return {
    id: 'consulMetrics',
    name: _i18n.i18n.translate('home.tutorials.consulMetrics.nameTitle', {
      defaultMessage: 'Consul metrics'
    }),
    category: _tutorials.TutorialsCategory.METRICS,
    shortDescription: _i18n.i18n.translate('home.tutorials.consulMetrics.shortDescription', {
      defaultMessage: 'Fetch monitoring metrics from the Consul server.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.consulMetrics.longDescription', {
      defaultMessage: 'The `consul` Metricbeat module fetches monitoring metrics from Consul. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.metricbeat}/metricbeat-module-consul.html'
      }
    }),
    euiIconType: '/plugins/kibana/home/tutorial_resources/logos/consul.svg',
    artifacts: {
      dashboards: [{
        id: '496910f0-b952-11e9-a579-f5c0a5d81340',
        linkLabel: _i18n.i18n.translate('home.tutorials.consulMetrics.artifacts.dashboards.linkLabel', {
          defaultMessage: 'Consul metrics dashboard'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-consul.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/consul_metrics/screenshot.png',
    onPrem: (0, _metricbeat_instructions.onPremInstructions)(moduleName, context),
    elasticCloud: (0, _metricbeat_instructions.cloudInstructions)(moduleName),
    onPremElasticCloud: (0, _metricbeat_instructions.onPremCloudInstructions)(moduleName)
  };
}
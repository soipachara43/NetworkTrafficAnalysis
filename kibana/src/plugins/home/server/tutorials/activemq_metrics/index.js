"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activemqMetricsSpecProvider = activemqMetricsSpecProvider;

var _i18n = require("@kbn/i18n");

var _metricbeat_instructions = require("../instructions/metricbeat_instructions");

var _tutorials_registry_types = require("../../services/tutorials/lib/tutorials_registry_types");

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
function activemqMetricsSpecProvider(context) {
  const moduleName = 'activemq';
  return {
    id: 'activemqMetrics',
    name: _i18n.i18n.translate('home.tutorials.activemqMetrics.nameTitle', {
      defaultMessage: 'ActiveMQ metrics'
    }),
    category: _tutorials_registry_types.TutorialsCategory.METRICS,
    shortDescription: _i18n.i18n.translate('home.tutorials.activemqMetrics.shortDescription', {
      defaultMessage: 'Fetch monitoring metrics from ActiveMQ instances.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.activemqMetrics.longDescription', {
      defaultMessage: 'The `activemq` Metricbeat module fetches monitoring metrics from ActiveMQ instances \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.metricbeat}/metricbeat-module-activemq.html'
      }
    }),
    euiIconType: '/plugins/kibana/home/tutorial_resources/logos/activemq.svg',
    isBeta: true,
    artifacts: {
      application: {
        label: _i18n.i18n.translate('home.tutorials.activemqMetrics.artifacts.application.label', {
          defaultMessage: 'Discover'
        }),
        path: '/app/kibana#/discover'
      },
      dashboards: [],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-activemq.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _metricbeat_instructions.onPremInstructions)(moduleName, context),
    elasticCloud: (0, _metricbeat_instructions.cloudInstructions)(moduleName),
    onPremElasticCloud: (0, _metricbeat_instructions.onPremCloudInstructions)(moduleName)
  };
}
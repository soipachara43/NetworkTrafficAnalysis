"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ibmmqMetricsSpecProvider = ibmmqMetricsSpecProvider;

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
function ibmmqMetricsSpecProvider(context) {
  const moduleName = 'ibmmq';
  return {
    id: 'ibmmqMetrics',
    name: _i18n.i18n.translate('home.tutorials.ibmmqMetrics.nameTitle', {
      defaultMessage: 'IBM MQ metrics'
    }),
    category: _tutorials.TutorialsCategory.METRICS,
    shortDescription: _i18n.i18n.translate('home.tutorials.ibmmqMetrics.shortDescription', {
      defaultMessage: 'Fetch monitoring metrics from IBM MQ instances.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.ibmmqMetrics.longDescription', {
      defaultMessage: 'The `ibmmq` Metricbeat module fetches monitoring metrics from IBM MQ instances \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.metricbeat}/metricbeat-module-ibmmq.html'
      }
    }),
    euiIconType: '/plugins/kibana/home/tutorial_resources/logos/ibmmq.svg',
    isBeta: true,
    artifacts: {
      application: {
        label: _i18n.i18n.translate('home.tutorials.ibmmqMetrics.artifacts.application.label', {
          defaultMessage: 'Discover'
        }),
        path: '/app/kibana#/discover'
      },
      dashboards: [],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-ibmmq.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/ibmmq_metrics/screenshot.png',
    onPrem: (0, _metricbeat_instructions.onPremInstructions)(moduleName, context),
    elasticCloud: (0, _metricbeat_instructions.cloudInstructions)(moduleName),
    onPremElasticCloud: (0, _metricbeat_instructions.onPremCloudInstructions)(moduleName)
  };
}
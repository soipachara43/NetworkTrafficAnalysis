"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cockroachdbMetricsSpecProvider = cockroachdbMetricsSpecProvider;

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
function cockroachdbMetricsSpecProvider(context) {
  const moduleName = 'cockroachdb';
  return {
    id: 'cockroachdbMetrics',
    name: _i18n.i18n.translate('home.tutorials.cockroachdbMetrics.nameTitle', {
      defaultMessage: 'CockroachDB metrics'
    }),
    category: _tutorials.TutorialsCategory.METRICS,
    shortDescription: _i18n.i18n.translate('home.tutorials.cockroachdbMetrics.shortDescription', {
      defaultMessage: 'Fetch monitoring metrics from the CockroachDB server.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.cockroachdbMetrics.longDescription', {
      defaultMessage: 'The `cockroachdb` Metricbeat module fetches monitoring metrics from CockroachDB. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.metricbeat}/metricbeat-module-cockroachdb.html'
      }
    }),
    euiIconType: '/plugins/kibana/home/tutorial_resources/logos/cockroachdb.svg',
    artifacts: {
      dashboards: [{
        id: 'e3ba0c30-9766-11e9-9eea-6f554992ec1f',
        linkLabel: _i18n.i18n.translate('home.tutorials.cockroachdbMetrics.artifacts.dashboards.linkLabel', {
          defaultMessage: 'CockroachDB metrics dashboard'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-cockroachdb.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/cockroachdb_metrics/screenshot.png',
    onPrem: (0, _metricbeat_instructions.onPremInstructions)(moduleName, context),
    elasticCloud: (0, _metricbeat_instructions.cloudInstructions)(moduleName),
    onPremElasticCloud: (0, _metricbeat_instructions.onPremCloudInstructions)(moduleName)
  };
}
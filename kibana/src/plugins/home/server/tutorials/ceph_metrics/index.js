"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cephMetricsSpecProvider = cephMetricsSpecProvider;

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
function cephMetricsSpecProvider(context) {
  const moduleName = 'ceph';
  return {
    id: 'cephMetrics',
    name: _i18n.i18n.translate('home.tutorials.cephMetrics.nameTitle', {
      defaultMessage: 'Ceph metrics'
    }),
    isBeta: false,
    category: _tutorials.TutorialsCategory.METRICS,
    shortDescription: _i18n.i18n.translate('home.tutorials.cephMetrics.shortDescription', {
      defaultMessage: 'Fetch internal metrics from the Ceph server.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.cephMetrics.longDescription', {
      defaultMessage: 'The `ceph` Metricbeat module fetches internal metrics from Ceph. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.metricbeat}/metricbeat-module-ceph.html'
      }
    }),
    euiIconType: 'logoCeph',
    artifacts: {
      application: {
        label: _i18n.i18n.translate('home.tutorials.cephMetrics.artifacts.application.label', {
          defaultMessage: 'Discover'
        }),
        path: '/app/kibana#/discover'
      },
      dashboards: [],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-ceph.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _metricbeat_instructions.onPremInstructions)(moduleName, context),
    elasticCloud: (0, _metricbeat_instructions.cloudInstructions)(moduleName),
    onPremElasticCloud: (0, _metricbeat_instructions.onPremCloudInstructions)(moduleName)
  };
}
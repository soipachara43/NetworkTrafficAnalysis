"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elasticsearchLogsSpecProvider = elasticsearchLogsSpecProvider;

var _i18n = require("@kbn/i18n");

var _tutorials = require("../../services/tutorials");

var _filebeat_instructions = require("../instructions/filebeat_instructions");

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
function elasticsearchLogsSpecProvider(context) {
  const moduleName = 'elasticsearch';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'elasticsearchLogs',
    name: _i18n.i18n.translate('home.tutorials.elasticsearchLogs.nameTitle', {
      defaultMessage: 'Elasticsearch logs'
    }),
    category: _tutorials.TutorialsCategory.LOGGING,
    isBeta: true,
    shortDescription: _i18n.i18n.translate('home.tutorials.elasticsearchLogs.shortDescription', {
      defaultMessage: 'Collect and parse logs created by Elasticsearch.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.elasticsearchLogs.longDescription', {
      defaultMessage: 'The `elasticsearch` Filebeat module parses logs created by Elasticsearch. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-elasticsearch.html'
      }
    }),
    euiIconType: 'logoElasticsearch',
    artifacts: {
      application: {
        label: _i18n.i18n.translate('home.tutorials.elasticsearchLogs.artifacts.application.label', {
          defaultMessage: 'Discover'
        }),
        path: '/app/kibana#/discover'
      },
      dashboards: [],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-elasticsearch.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context),
    elasticCloud: (0, _filebeat_instructions.cloudInstructions)(moduleName, platforms),
    onPremElasticCloud: (0, _filebeat_instructions.onPremCloudInstructions)(moduleName, platforms)
  };
}
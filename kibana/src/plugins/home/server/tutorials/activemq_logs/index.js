"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activemqLogsSpecProvider = activemqLogsSpecProvider;

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
function activemqLogsSpecProvider(context) {
  const moduleName = 'activemq';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'activemqLogs',
    name: _i18n.i18n.translate('home.tutorials.activemqLogs.nameTitle', {
      defaultMessage: 'ActiveMQ logs'
    }),
    category: _tutorials.TutorialsCategory.LOGGING,
    shortDescription: _i18n.i18n.translate('home.tutorials.activemqLogs.shortDescription', {
      defaultMessage: 'Collect ActiveMQ logs with Filebeat.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.activemqLogs.longDescription', {
      defaultMessage: 'Collect ActiveMQ logs with Filebeat. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-activemq.html'
      }
    }),
    euiIconType: '/plugins/kibana/home/tutorial_resources/logos/activemq.svg',
    artifacts: {
      dashboards: [{
        id: '26434790-1464-11ea-8fd8-030a13064883',
        linkLabel: _i18n.i18n.translate('home.tutorials.activemqLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'ActiveMQ Application Events'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-activemq.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/activemq_logs/screenshot.png',
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context),
    elasticCloud: (0, _filebeat_instructions.cloudInstructions)(moduleName, platforms),
    onPremElasticCloud: (0, _filebeat_instructions.onPremCloudInstructions)(moduleName, platforms)
  };
}
"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _rest = require("@octokit/rest");

var _lodash = require("lodash");

var _axios = _interopRequireDefault(require("axios"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _elasticsearch = require("elasticsearch");

var _yargs = require("yargs");

var _util = require("util");

var _consoleStamp = _interopRequireDefault(require("console-stamp"));

var _downloadTelemetryTemplate = require("./download-telemetry-template");

var _mappings = _interopRequireDefault(require("../../mappings.json"));

var _generateSampleDocuments = require("./generate-sample-documents");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// This script downloads the telemetry mapping, runs the APM telemetry tasks,
// generates a bunch of randomized data based on the downloaded sample,
// and uploads it to a cluster of your choosing in the same format as it is
// stored in the telemetry cluster. Its purpose is twofold:
// - Easier testing of the telemetry tasks
// - Validate whether we can run the queries we want to on the telemetry data
// @ts-ignore
// @ts-ignore
(0, _consoleStamp.default)(console, '[HH:MM:ss.l]');
const githubToken = process.env.GITHUB_TOKEN;

if (!githubToken) {
  throw new Error('GITHUB_TOKEN was not provided.');
}

const kibanaConfigDir = _path.default.join(__filename, '../../../../../../../config');

const kibanaDevConfig = _path.default.join(kibanaConfigDir, 'kibana.dev.yml');

const kibanaConfig = _path.default.join(kibanaConfigDir, 'kibana.yml');

const xpackTelemetryIndexName = 'xpack-phone-home';
const loadedKibanaConfig = _jsYaml.default.safeLoad(_fs.default.readFileSync(_fs.default.existsSync(kibanaDevConfig) ? kibanaDevConfig : kibanaConfig, 'utf8')) || {};
const cliEsCredentials = (0, _lodash.pick)({
  'elasticsearch.username': process.env.ELASTICSEARCH_USERNAME,
  'elasticsearch.password': process.env.ELASTICSEARCH_PASSWORD,
  'elasticsearch.hosts': process.env.ELASTICSEARCH_HOST
}, _lodash.identity);
const config = {
  'apm_oss.transactionIndices': 'apm-*',
  'apm_oss.metricsIndices': 'apm-*',
  'apm_oss.errorIndices': 'apm-*',
  'apm_oss.spanIndices': 'apm-*',
  'apm_oss.onboardingIndices': 'apm-*',
  'apm_oss.sourcemapIndices': 'apm-*',
  'elasticsearch.hosts': 'http://localhost:9200',
  ...loadedKibanaConfig,
  ...cliEsCredentials
};

async function uploadData() {
  const octokit = new _rest.Octokit({
    auth: githubToken
  });
  const telemetryTemplate = await (0, _downloadTelemetryTemplate.downloadTelemetryTemplate)(octokit);
  const kibanaMapping = _mappings.default['apm-telemetry'];
  const httpAuth = config['elasticsearch.username'] && config['elasticsearch.password'] ? {
    username: config['elasticsearch.username'],
    password: config['elasticsearch.password']
  } : null;
  const client = new _elasticsearch.Client({
    host: config['elasticsearch.hosts'],
    ...(httpAuth ? {
      httpAuth: `${httpAuth.username}:${httpAuth.password}`
    } : {})
  });

  if (_yargs.argv.clear) {
    try {
      await (0, _util.promisify)(client.indices.delete.bind(client))({
        index: xpackTelemetryIndexName
      });
    } catch (err) {
      // 404 = index not found, totally okay
      if (err.status !== 404) {
        throw err;
      }
    }
  }

  const axiosInstance = _axios.default.create({
    baseURL: config['elasticsearch.hosts'],
    ...(httpAuth ? {
      auth: httpAuth
    } : {})
  });

  const newTemplate = (0, _lodash.merge)(telemetryTemplate, {
    settings: {
      index: {
        mapping: {
          total_fields: {
            limit: 10000
          }
        }
      }
    }
  }); // override apm mapping instead of merging

  newTemplate.mappings.properties.stack_stats.properties.kibana.properties.plugins.properties.apm = kibanaMapping;
  await axiosInstance.put(`/_template/xpack-phone-home`, newTemplate);
  const sampleDocuments = await (0, _generateSampleDocuments.generateSampleDocuments)({
    collectTelemetryParams: {
      logger: console,
      indices: { ...config,
        apmCustomLinkIndex: '.apm-custom-links',
        apmAgentConfigurationIndex: '.apm-agent-configuration'
      },
      search: body => {
        return (0, _util.promisify)(client.search.bind(client))({ ...body,
          requestTimeout: 120000
        });
      },
      indicesStats: body => {
        return (0, _util.promisify)(client.indices.stats.bind(client))({ ...body,
          requestTimeout: 120000
        });
      },
      transportRequest: params => {
        return axiosInstance[params.method](params.path);
      }
    }
  });
  const chunks = (0, _lodash.chunk)(sampleDocuments, 250);
  await chunks.reduce((prev, documents) => {
    return prev.then(async () => {
      const body = (0, _lodash.flatten)(documents.map(doc => [{
        index: {
          _index: 'xpack-phone-home'
        }
      }, doc]));
      return (0, _util.promisify)(client.bulk.bind(client))({
        body,
        refresh: true
      }).then(response => {
        if (response.errors) {
          const firstError = response.items.filter(item => item.index.status >= 400)[0].index.error;
          throw new Error(`Failed to upload documents: ${firstError.reason} `);
        }
      });
    });
  }, Promise.resolve());
}

uploadData().catch(e => {
  if ('response' in e) {
    if (typeof e.response === 'string') {
      // eslint-disable-next-line no-console
      console.log(e.response);
    } else {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(e.response, ['status', 'statusText', 'headers', 'data'], 2));
    }
  } else {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  process.exit(1);
}).then(() => {
  // eslint-disable-next-line no-console
  console.log('Finished uploading generated telemetry data');
});
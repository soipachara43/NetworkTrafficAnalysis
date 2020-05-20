"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeJobFactory = void 0;

var _i18n = require("@kbn/i18n");

var _server = require("../../../../../../../src/core/server");

var _constants = require("../../../common/constants");

var _lib = require("../../../server/lib");

var _services = require("../../../server/services");

var _field_format_map = require("./lib/field_format_map");

var _generate_csv = require("./lib/generate_csv");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const executeJobFactory = async function executeJobFactoryFn(reporting, server, elasticsearch, parentLogger) {
  const crypto = (0, _lib.cryptoFactory)(server);
  const config = server.config();
  const logger = parentLogger.clone([_constants.CSV_JOB_TYPE, 'execute-job']);
  const serverBasePath = config.get('server.basePath');
  return async function executeJob(jobId, job, cancellationToken) {
    const jobLogger = logger.clone([jobId]);
    const {
      searchRequest,
      fields,
      indexPatternSavedObject,
      metaFields,
      conflictedTypesFields,
      headers,
      basePath
    } = job;

    const decryptHeaders = async () => {
      let decryptedHeaders;

      try {
        decryptedHeaders = await crypto.decrypt(headers);
      } catch (err) {
        logger.error(err);
        throw new Error(_i18n.i18n.translate('xpack.reporting.exportTypes.csv.executeJob.failedToDecryptReportJobDataErrorMessage', {
          defaultMessage: 'Failed to decrypt report job data. Please ensure that {encryptionKey} is set and re-generate this report. {err}',
          values: {
            encryptionKey: 'xpack.reporting.encryptionKey',
            err: err.toString()
          }
        })); // prettier-ignore
      }

      return decryptedHeaders;
    };

    const fakeRequest = _server.KibanaRequest.from({
      headers: await decryptHeaders(),
      // This is used by the spaces SavedObjectClientWrapper to determine the existing space.
      // We use the basePath from the saved job, which we'll have post spaces being implemented;
      // or we use the server base path, which uses the default space
      getBasePath: () => basePath || serverBasePath,
      path: '/',
      route: {
        settings: {}
      },
      url: {
        href: '/'
      },
      raw: {
        req: {
          url: '/'
        }
      }
    });

    const {
      callAsCurrentUser
    } = elasticsearch.dataClient.asScoped(fakeRequest);

    const callEndpoint = (endpoint, clientParams = {}, options = {}) => callAsCurrentUser(endpoint, clientParams, options);

    const savedObjectsClient = await reporting.getSavedObjectsClient(fakeRequest);
    const uiSettingsClient = await reporting.getUiSettingsServiceFactory(savedObjectsClient);

    const getFormatsMap = async client => {
      const fieldFormats = await (0, _services.getFieldFormats)().fieldFormatServiceFactory(client);
      return (0, _field_format_map.fieldFormatMapFactory)(indexPatternSavedObject, fieldFormats);
    };

    const getUiSettings = async client => {
      const [separator, quoteValues, timezone] = await Promise.all([client.get('csv:separator'), client.get('csv:quoteValues'), client.get('dateFormat:tz')]);

      if (timezone === 'Browser') {
        logger.warn(_i18n.i18n.translate('xpack.reporting.exportTypes.csv.executeJob.dateFormateSetting', {
          defaultMessage: 'Kibana Advanced Setting "{dateFormatTimezone}" is set to "Browser". Dates will be formatted as UTC to avoid ambiguity.',
          values: {
            dateFormatTimezone: 'dateFormat:tz'
          }
        })); // prettier-ignore
      }

      return {
        separator,
        quoteValues,
        timezone
      };
    };

    const [formatsMap, uiSettings] = await Promise.all([getFormatsMap(uiSettingsClient), getUiSettings(uiSettingsClient)]);
    const generateCsv = (0, _generate_csv.createGenerateCsv)(jobLogger);
    const {
      content,
      maxSizeReached,
      size,
      csvContainsFormulas
    } = await generateCsv({
      searchRequest,
      fields,
      metaFields,
      conflictedTypesFields,
      callEndpoint,
      cancellationToken,
      formatsMap,
      settings: { ...uiSettings,
        checkForFormulas: config.get('xpack.reporting.csv.checkForFormulas'),
        maxSizeBytes: config.get('xpack.reporting.csv.maxSizeBytes'),
        scroll: config.get('xpack.reporting.csv.scroll')
      }
    });
    return {
      content_type: 'text/csv',
      content,
      max_size_reached: maxSizeReached,
      size,
      csv_contains_formulas: csvContainsFormulas
    };
  };
};

exports.executeJobFactory = executeJobFactory;
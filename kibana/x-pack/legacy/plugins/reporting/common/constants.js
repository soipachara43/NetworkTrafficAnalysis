"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LICENSE_TYPE_ENTERPRISE = exports.LICENSE_TYPE_PLATINUM = exports.LICENSE_TYPE_GOLD = exports.LICENSE_TYPE_STANDARD = exports.LICENSE_TYPE_BASIC = exports.LICENSE_TYPE_TRIAL = exports.USES_HEADLESS_JOB_TYPES = exports.CSV_FROM_SAVEDOBJECT_JOB_TYPE = exports.CSV_JOB_TYPE = exports.PNG_JOB_TYPE = exports.PDF_JOB_TYPE = exports.KIBANA_REPORTING_TYPE = exports.UI_SETTINGS_CUSTOM_PDF_LOGO = exports.KBN_SCREENSHOT_HEADER_BLACKLIST = exports.WHITELISTED_JOB_CONTENT_TYPES = exports.CSV_REPORTING_ACTION = exports.CONTENT_TYPE_CSV = exports.API_GENERATE_IMMEDIATE = exports.API_LIST_URL = exports.API_BASE_GENERATE_V1 = exports.API_BASE_URL_V1 = exports.API_BASE_URL = exports.JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY = exports.BROWSER_TYPE = exports.PLUGIN_ID = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const PLUGIN_ID = 'reporting';
exports.PLUGIN_ID = PLUGIN_ID;
const BROWSER_TYPE = 'chromium';
exports.BROWSER_TYPE = BROWSER_TYPE;
const JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY = 'xpack.reporting.jobCompletionNotifications';
exports.JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY = JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY;
const API_BASE_URL = '/api/reporting'; // "Generation URL" from share menu

exports.API_BASE_URL = API_BASE_URL;
const API_BASE_URL_V1 = '/api/reporting/v1'; //

exports.API_BASE_URL_V1 = API_BASE_URL_V1;
const API_BASE_GENERATE_V1 = `${API_BASE_URL_V1}/generate`;
exports.API_BASE_GENERATE_V1 = API_BASE_GENERATE_V1;
const API_LIST_URL = '/api/reporting/jobs';
exports.API_LIST_URL = API_LIST_URL;
const API_GENERATE_IMMEDIATE = `${API_BASE_URL_V1}/generate/immediate/csv/saved-object`;
exports.API_GENERATE_IMMEDIATE = API_GENERATE_IMMEDIATE;
const CONTENT_TYPE_CSV = 'text/csv';
exports.CONTENT_TYPE_CSV = CONTENT_TYPE_CSV;
const CSV_REPORTING_ACTION = 'downloadCsvReport';
exports.CSV_REPORTING_ACTION = CSV_REPORTING_ACTION;
const WHITELISTED_JOB_CONTENT_TYPES = ['application/json', 'application/pdf', CONTENT_TYPE_CSV, 'image/png'];
exports.WHITELISTED_JOB_CONTENT_TYPES = WHITELISTED_JOB_CONTENT_TYPES;
const KBN_SCREENSHOT_HEADER_BLACKLIST = ['accept-encoding', 'connection', 'content-length', 'content-type', 'host', 'referer', // `Transfer-Encoding` is hop-by-hop header that is meaningful
// only for a single transport-level connection, and shouldn't
// be stored by caches or forwarded by proxies.
'transfer-encoding'];
exports.KBN_SCREENSHOT_HEADER_BLACKLIST = KBN_SCREENSHOT_HEADER_BLACKLIST;
const UI_SETTINGS_CUSTOM_PDF_LOGO = 'xpackReporting:customPdfLogo';
/**
 * The type name used within the Monitoring index to publish reporting stats.
 * @type {string}
 */

exports.UI_SETTINGS_CUSTOM_PDF_LOGO = UI_SETTINGS_CUSTOM_PDF_LOGO;
const KIBANA_REPORTING_TYPE = 'reporting';
exports.KIBANA_REPORTING_TYPE = KIBANA_REPORTING_TYPE;
const PDF_JOB_TYPE = 'printable_pdf';
exports.PDF_JOB_TYPE = PDF_JOB_TYPE;
const PNG_JOB_TYPE = 'PNG';
exports.PNG_JOB_TYPE = PNG_JOB_TYPE;
const CSV_JOB_TYPE = 'csv';
exports.CSV_JOB_TYPE = CSV_JOB_TYPE;
const CSV_FROM_SAVEDOBJECT_JOB_TYPE = 'csv_from_savedobject';
exports.CSV_FROM_SAVEDOBJECT_JOB_TYPE = CSV_FROM_SAVEDOBJECT_JOB_TYPE;
const USES_HEADLESS_JOB_TYPES = [PDF_JOB_TYPE, PNG_JOB_TYPE];
exports.USES_HEADLESS_JOB_TYPES = USES_HEADLESS_JOB_TYPES;
const LICENSE_TYPE_TRIAL = 'trial';
exports.LICENSE_TYPE_TRIAL = LICENSE_TYPE_TRIAL;
const LICENSE_TYPE_BASIC = 'basic';
exports.LICENSE_TYPE_BASIC = LICENSE_TYPE_BASIC;
const LICENSE_TYPE_STANDARD = 'standard';
exports.LICENSE_TYPE_STANDARD = LICENSE_TYPE_STANDARD;
const LICENSE_TYPE_GOLD = 'gold';
exports.LICENSE_TYPE_GOLD = LICENSE_TYPE_GOLD;
const LICENSE_TYPE_PLATINUM = 'platinum';
exports.LICENSE_TYPE_PLATINUM = LICENSE_TYPE_PLATINUM;
const LICENSE_TYPE_ENTERPRISE = 'enterprise';
exports.LICENSE_TYPE_ENTERPRISE = LICENSE_TYPE_ENTERPRISE;
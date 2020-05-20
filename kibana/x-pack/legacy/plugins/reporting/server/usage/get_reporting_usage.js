"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReportingUsage = getReportingUsage;

var _lodash = require("lodash");

var _decorate_range_stats = require("./decorate_range_stats");

var _get_export_type_handler = require("./get_export_type_handler");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const JOB_TYPES_KEY = 'jobTypes';
const JOB_TYPES_FIELD = 'jobtype';
const LAYOUT_TYPES_KEY = 'layoutTypes';
const LAYOUT_TYPES_FIELD = 'meta.layout.keyword';
const OBJECT_TYPES_KEY = 'objectTypes';
const OBJECT_TYPES_FIELD = 'meta.objectType.keyword';
const STATUS_TYPES_KEY = 'statusTypes';
const STATUS_TYPES_FIELD = 'status';
const DEFAULT_TERMS_SIZE = 10;
const PRINTABLE_PDF_JOBTYPE = 'printable_pdf'; // indexes some key/count buckets by the "key" property

const getKeyCount = buckets => buckets.reduce((accum, {
  key,
  doc_count: count
}) => ({ ...accum,
  [key]: count
}), {});

function getAggStats(aggs) {
  const {
    buckets: jobBuckets
  } = aggs[JOB_TYPES_KEY];
  const jobTypes = jobBuckets.reduce((accum, {
    key,
    doc_count: count
  }) => {
    return { ...accum,
      [key]: {
        total: count
      }
    };
  }, {}); // merge pdf stats into pdf jobtype key

  const pdfJobs = jobTypes[PRINTABLE_PDF_JOBTYPE];

  if (pdfJobs) {
    const pdfAppBuckets = (0, _lodash.get)(aggs[OBJECT_TYPES_KEY], '.pdf.buckets', []);
    const pdfLayoutBuckets = (0, _lodash.get)(aggs[LAYOUT_TYPES_KEY], '.pdf.buckets', []);
    pdfJobs.app = getKeyCount(pdfAppBuckets);
    pdfJobs.layout = getKeyCount(pdfLayoutBuckets);
  }

  const all = aggs.doc_count;
  let statusTypes = {};
  const statusBuckets = (0, _lodash.get)(aggs[STATUS_TYPES_KEY], 'buckets', []);

  if (statusBuckets) {
    statusTypes = getKeyCount(statusBuckets);
  }

  return {
    _all: all,
    status: statusTypes,
    ...jobTypes
  };
}

async function handleResponse(server, response) {
  const buckets = (0, _lodash.get)(response, 'aggregations.ranges.buckets');

  if (!buckets) {
    return {};
  }

  const {
    lastDay,
    last7Days,
    all
  } = buckets;
  const lastDayUsage = lastDay ? getAggStats(lastDay) : {};
  const last7DaysUsage = last7Days ? getAggStats(last7Days) : {};
  const allUsage = all ? getAggStats(all) : {};
  return {
    last7Days: last7DaysUsage,
    lastDay: lastDayUsage,
    ...allUsage
  };
}

async function getReportingUsage(server, callCluster, exportTypesRegistry) {
  const config = server.config();
  const reportingIndex = config.get('xpack.reporting.index');
  const params = {
    index: `${reportingIndex}-*`,
    filterPath: 'aggregations.*.buckets',
    body: {
      size: 0,
      aggs: {
        ranges: {
          filters: {
            filters: {
              all: {
                match_all: {}
              },
              lastDay: {
                range: {
                  created_at: {
                    gte: 'now-1d/d'
                  }
                }
              },
              last7Days: {
                range: {
                  created_at: {
                    gte: 'now-7d/d'
                  }
                }
              }
            }
          },
          aggs: {
            [JOB_TYPES_KEY]: {
              terms: {
                field: JOB_TYPES_FIELD,
                size: DEFAULT_TERMS_SIZE
              }
            },
            [STATUS_TYPES_KEY]: {
              terms: {
                field: STATUS_TYPES_FIELD,
                size: DEFAULT_TERMS_SIZE
              }
            },
            [OBJECT_TYPES_KEY]: {
              filter: {
                term: {
                  jobtype: PRINTABLE_PDF_JOBTYPE
                }
              },
              aggs: {
                pdf: {
                  terms: {
                    field: OBJECT_TYPES_FIELD,
                    size: DEFAULT_TERMS_SIZE
                  }
                }
              }
            },
            [LAYOUT_TYPES_KEY]: {
              filter: {
                term: {
                  jobtype: PRINTABLE_PDF_JOBTYPE
                }
              },
              aggs: {
                pdf: {
                  terms: {
                    field: LAYOUT_TYPES_FIELD,
                    size: DEFAULT_TERMS_SIZE
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  return callCluster('search', params).then(response => handleResponse(server, response)).then(usage => {
    // Allow this to explicitly throw an exception if/when this config is deprecated,
    // because we shouldn't collect browserType in that case!
    const browserType = config.get('xpack.reporting.capture.browser.type');
    const xpackInfo = server.plugins.xpack_main.info;
    const exportTypesHandler = (0, _get_export_type_handler.getExportTypesHandler)(exportTypesRegistry);
    const availability = exportTypesHandler.getAvailability(xpackInfo);
    const {
      lastDay,
      last7Days,
      ...all
    } = usage;
    return {
      available: true,
      browser_type: browserType,
      enabled: true,
      lastDay: (0, _decorate_range_stats.decorateRangeStats)(lastDay, availability),
      last7Days: (0, _decorate_range_stats.decorateRangeStats)(last7Days, availability),
      ...(0, _decorate_range_stats.decorateRangeStats)(all, availability)
    };
  });
}
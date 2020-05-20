"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBoolFilter = getBoolFilter;

var _elasticsearch_fieldnames = require("../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getBoolFilter(urlParams) {
  var start = urlParams.start,
      end = urlParams.end,
      serviceName = urlParams.serviceName,
      processorEvent = urlParams.processorEvent;

  if (!start || !end) {
    throw new Error('Date range was not defined');
  }

  var boolFilter = [{
    range: {
      '@timestamp': {
        gte: new Date(start).getTime(),
        lte: new Date(end).getTime(),
        format: 'epoch_millis'
      }
    }
  }];

  if (serviceName) {
    boolFilter.push({
      term: _defineProperty({}, _elasticsearch_fieldnames.SERVICE_NAME, serviceName)
    });
  }

  switch (processorEvent) {
    case 'transaction':
      boolFilter.push({
        term: _defineProperty({}, _elasticsearch_fieldnames.PROCESSOR_EVENT, 'transaction')
      });

      if (urlParams.transactionName) {
        boolFilter.push({
          term: _defineProperty({}, _elasticsearch_fieldnames.TRANSACTION_NAME, urlParams.transactionName)
        });
      }

      if (urlParams.transactionType) {
        boolFilter.push({
          term: _defineProperty({}, _elasticsearch_fieldnames.TRANSACTION_TYPE, urlParams.transactionType)
        });
      }

      break;

    case 'error':
      boolFilter.push({
        term: _defineProperty({}, _elasticsearch_fieldnames.PROCESSOR_EVENT, 'error')
      });

      if (urlParams.errorGroupId) {
        boolFilter.push({
          term: _defineProperty({}, _elasticsearch_fieldnames.ERROR_GROUP_ID, urlParams.errorGroupId)
        });
      }

      break;

    case 'metric':
      boolFilter.push({
        term: _defineProperty({}, _elasticsearch_fieldnames.PROCESSOR_EVENT, 'metric')
      });
      break;

    default:
      boolFilter.push({
        bool: {
          should: [{
            term: _defineProperty({}, _elasticsearch_fieldnames.PROCESSOR_EVENT, 'error')
          }, {
            term: _defineProperty({}, _elasticsearch_fieldnames.PROCESSOR_EVENT, 'transaction')
          }, {
            term: _defineProperty({}, _elasticsearch_fieldnames.PROCESSOR_EVENT, 'metric')
          }]
        }
      });
  }

  return boolFilter;
}
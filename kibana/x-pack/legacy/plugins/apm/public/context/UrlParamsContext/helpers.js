"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParsedDate = getParsedDate;
exports.getStart = getStart;
exports.getEnd = getEnd;
exports.toNumber = toNumber;
exports.toString = toString;
exports.toBoolean = toBoolean;
exports.getPathAsArray = getPathAsArray;
exports.removeUndefinedProps = removeUndefinedProps;
exports.getPathParams = getPathParams;

var _lodash = require("lodash");

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _processor_event = require("../../../../../../plugins/apm/common/processor_event");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getParsedDate(rawDate) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (rawDate) {
    var parsed = _datemath.default.parse(rawDate, opts);

    if (parsed) {
      return parsed.toISOString();
    }
  }
}

function getStart(prevState, rangeFrom) {
  if (prevState.rangeFrom !== rangeFrom) {
    return getParsedDate(rangeFrom);
  }

  return prevState.start;
}

function getEnd(prevState, rangeTo) {
  if (prevState.rangeTo !== rangeTo) {
    return getParsedDate(rangeTo, {
      roundUp: true
    });
  }

  return prevState.end;
}

function toNumber(value) {
  if (value !== undefined) {
    return parseInt(value, 10);
  }
}

function toString(value) {
  if (value === '' || value === 'null' || value === 'undefined') {
    return;
  }

  return value;
}

function toBoolean(value) {
  return value === 'true';
}

function getPathAsArray() {
  var pathname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (0, _lodash.compact)(pathname.split('/'));
}

function removeUndefinedProps(obj) {
  return (0, _lodash.pick)(obj, function (value) {
    return value !== undefined;
  });
}

function getPathParams() {
  var pathname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var paths = getPathAsArray(pathname);
  var pageName = paths[0]; // TODO: use react router's real match params instead of guessing the path order

  switch (pageName) {
    case 'services':
      var servicePageName = paths[2];
      var serviceName = paths[1];
      var serviceNodeName = paths[3];

      if (servicePageName === 'nodes' && paths.length > 3) {
        servicePageName = 'metrics';
      }

      switch (servicePageName) {
        case 'transactions':
          return {
            processorEvent: _processor_event.ProcessorEvent.transaction,
            serviceName: serviceName
          };

        case 'errors':
          return {
            processorEvent: _processor_event.ProcessorEvent.error,
            serviceName: serviceName,
            errorGroupId: paths[3]
          };

        case 'metrics':
          return {
            processorEvent: _processor_event.ProcessorEvent.metric,
            serviceName: serviceName,
            serviceNodeName: serviceNodeName
          };

        case 'nodes':
          return {
            processorEvent: _processor_event.ProcessorEvent.metric,
            serviceName: serviceName
          };

        case 'service-map':
          return {
            serviceName: serviceName
          };

        default:
          return {};
      }

    case 'traces':
      return {
        processorEvent: _processor_event.ProcessorEvent.transaction
      };

    case 'link-to':
      var link = paths[1];

      switch (link) {
        case 'trace':
          return {
            traceId: paths[2]
          };

        default:
          return {};
      }

    default:
      return {};
  }
}
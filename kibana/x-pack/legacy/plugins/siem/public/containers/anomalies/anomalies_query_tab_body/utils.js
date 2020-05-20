"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnomaliesFilterQuery = void 0;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _helpers = require("../../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getAnomaliesFilterQuery = function getAnomaliesFilterQuery(filterQuery) {
  var anomaliesFilterQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var siemJobs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var anomalyScore = arguments.length > 3 ? arguments[3] : undefined;
  var flowTarget = arguments.length > 4 ? arguments[4] : undefined;
  var ip = arguments.length > 5 ? arguments[5] : undefined;
  var siemJobIds = siemJobs.filter(function (job) {
    return job.isInstalled;
  }).map(function (job) {
    return job.id;
  }).map(function (jobId) {
    return {
      match_phrase: {
        job_id: jobId
      }
    };
  });
  var filterQueryString = (0, _helpers.createFilter)(filterQuery);
  var filterQueryObject = filterQueryString ? JSON.parse(filterQueryString) : {};

  var mergedFilterQuery = _deepmerge.default.all([filterQueryObject, anomaliesFilterQuery, {
    bool: {
      filter: [{
        bool: {
          should: siemJobIds,
          minimum_should_match: 1
        }
      }, {
        match_phrase: {
          result_type: 'record'
        }
      }, flowTarget && ip && {
        match_phrase: _defineProperty({}, "".concat(flowTarget, ".ip"), ip)
      }, {
        range: {
          record_score: {
            gte: anomalyScore
          }
        }
      }]
    }
  }]);

  return JSON.stringify(mergedFilterQuery);
};

exports.getAnomaliesFilterQuery = getAnomaliesFilterQuery;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwIfErrorAttached = exports.throwIfErrorAttachedToSetup = exports.tryParseResponse = void 0;

var i18n = _interopRequireWildcard(require("./translations"));

var _toasters = require("../../toasters");

var _errors = require("./errors");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var tryParseResponse = function tryParseResponse(response) {
  try {
    return JSON.stringify(JSON.parse(response), null, 2);
  } catch (error) {
    return response;
  }
};

exports.tryParseResponse = tryParseResponse;

var throwIfErrorAttachedToSetup = function throwIfErrorAttachedToSetup(setupResponse) {
  var jobIdErrorFilter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var jobErrors = setupResponse.jobs.reduce(function (accum, job) {
    return job.error != null && jobIdErrorFilter.includes(job.id) ? [].concat(_toConsumableArray(accum), [job.error.msg, tryParseResponse(job.error.response), "".concat(i18n.STATUS_CODE, " ").concat(job.error.statusCode)]) : accum;
  }, []);
  var dataFeedErrors = setupResponse.datafeeds.reduce(function (accum, dataFeed) {
    return dataFeed.error != null && jobIdErrorFilter.includes(dataFeed.id.substr('datafeed-'.length)) ? [].concat(_toConsumableArray(accum), [dataFeed.error.msg, tryParseResponse(dataFeed.error.response), "".concat(i18n.STATUS_CODE, " ").concat(dataFeed.error.statusCode)]) : accum;
  }, []);
  var errors = [].concat(_toConsumableArray(jobErrors), _toConsumableArray(dataFeedErrors));

  if (errors.length > 0) {
    throw new _toasters.ToasterError(errors);
  }
};

exports.throwIfErrorAttachedToSetup = throwIfErrorAttachedToSetup;

var throwIfErrorAttached = function throwIfErrorAttached(json, dataFeedIds) {
  var errors = dataFeedIds.reduce(function (accum, dataFeedId) {
    var dataFeed = json[dataFeedId];

    if ((0, _errors.isMlStartJobError)(dataFeed)) {
      return [].concat(_toConsumableArray(accum), [dataFeed.error.msg, tryParseResponse(dataFeed.error.response), "".concat(i18n.STATUS_CODE, " ").concat(dataFeed.error.statusCode)]);
    } else {
      return accum;
    }
  }, []);

  if (errors.length > 0) {
    throw new _toasters.ToasterError(errors);
  }
};

exports.throwIfErrorAttached = throwIfErrorAttached;
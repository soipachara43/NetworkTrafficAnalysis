"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSiemJobs = exports.composeModuleAndInstalledJobs = exports.getInstalledJobs = exports.getModuleJobs = exports.getAugmentedFields = exports.moduleToSiemJob = void 0;

var _ml_modules = require("../ml_modules");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Helper function for converting from ModuleJob -> SiemJob
 * @param module
 * @param moduleJob
 * @param isCompatible
 */
var moduleToSiemJob = function moduleToSiemJob(module, moduleJob, isCompatible) {
  return {
    datafeedId: '',
    datafeedIndices: [],
    datafeedState: '',
    hasDatafeed: false,
    isSingleMetricViewerJob: false,
    jobState: '',
    memory_status: '',
    processed_record_count: 0,
    id: moduleJob.id,
    description: moduleJob.config.description,
    groups: _toConsumableArray(moduleJob.config.groups).sort(),
    defaultIndexPattern: module.defaultIndexPattern,
    moduleId: module.id,
    isCompatible: isCompatible,
    isInstalled: false,
    isElasticJob: true
  };
};
/**
 * Returns fields necessary to augment a ModuleJob to a SiemJob
 *
 * @param jobId
 * @param moduleJobs
 * @param compatibleModuleIds
 */


exports.moduleToSiemJob = moduleToSiemJob;

var getAugmentedFields = function getAugmentedFields(jobId, moduleJobs, compatibleModuleIds) {
  var moduleJob = moduleJobs.find(function (mj) {
    return mj.id === jobId;
  });
  return moduleJob !== undefined ? {
    moduleId: moduleJob.moduleId,
    defaultIndexPattern: moduleJob.defaultIndexPattern,
    isCompatible: compatibleModuleIds.includes(moduleJob.moduleId),
    isElasticJob: true
  } : {
    moduleId: '',
    defaultIndexPattern: '',
    isCompatible: true,
    isElasticJob: false
  };
};
/**
 * Process Modules[] from the `get_module` ML API into SiemJobs[] by filtering to SIEM specific
 * modules and unpacking jobs from each module
 *
 * @param modulesData
 * @param compatibleModuleIds
 */


exports.getAugmentedFields = getAugmentedFields;

var getModuleJobs = function getModuleJobs(modulesData, compatibleModuleIds) {
  return modulesData.filter(function (module) {
    return _ml_modules.mlModules.includes(module.id);
  }).map(function (module) {
    return _toConsumableArray(module.jobs.map(function (moduleJob) {
      return moduleToSiemJob(module, moduleJob, compatibleModuleIds.includes(module.id));
    }));
  }).flat();
};
/**
 * Process JobSummary[] from the `jobs_summary` ML API into SiemJobs[] by filtering to to SIEM jobs
 * and augmenting with moduleId/defaultIndexPattern/isCompatible
 *
 * @param jobSummaryData
 * @param moduleJobs
 * @param compatibleModuleIds
 */


exports.getModuleJobs = getModuleJobs;

var getInstalledJobs = function getInstalledJobs(jobSummaryData, moduleJobs, compatibleModuleIds) {
  return jobSummaryData.filter(function (_ref) {
    var groups = _ref.groups;
    return groups.includes('siem');
  }).map(function (jobSummary) {
    return _objectSpread({}, jobSummary, {}, getAugmentedFields(jobSummary.id, moduleJobs, compatibleModuleIds), {
      isInstalled: true
    });
  });
};
/**
 * Combines installed jobs + moduleSiemJobs that don't overlap and sorts by name asc
 *
 * @param installedJobs
 * @param moduleSiemJobs
 */


exports.getInstalledJobs = getInstalledJobs;

var composeModuleAndInstalledJobs = function composeModuleAndInstalledJobs(installedJobs, moduleSiemJobs) {
  var installedJobsIds = installedJobs.map(function (installedJob) {
    return installedJob.id;
  });
  return [].concat(_toConsumableArray(installedJobs), _toConsumableArray(moduleSiemJobs.filter(function (mj) {
    return !installedJobsIds.includes(mj.id);
  }))).sort(function (a, b) {
    return a.id.localeCompare(b.id);
  });
};
/**
 * Creates a list of SiemJobs by composing JobSummary jobs (installed jobs) and Module
 * jobs (pre-packaged SIEM jobs) into a single job object that can be used throughout the SIEM app
 *
 * @param jobSummaryData
 * @param modulesData
 * @param compatibleModules
 */


exports.composeModuleAndInstalledJobs = composeModuleAndInstalledJobs;

var createSiemJobs = function createSiemJobs(jobSummaryData, modulesData, compatibleModules) {
  // Create lookup of compatible modules
  var compatibleModuleIds = compatibleModules.map(function (module) {
    return module.id;
  }); // Process modulesData: Filter to SIEM specific modules, and unpack jobs from modules

  var moduleSiemJobs = getModuleJobs(modulesData, compatibleModuleIds); // Process jobSummaryData: Filter to SIEM jobs, and augment with moduleId/defaultIndexPattern/isCompatible

  var installedJobs = getInstalledJobs(jobSummaryData, moduleSiemJobs, compatibleModuleIds); // Combine installed jobs + moduleSiemJobs that don't overlap, and sort by name asc

  return composeModuleAndInstalledJobs(installedJobs, moduleSiemJobs);
};

exports.createSiemJobs = createSiemJobs;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SET_PHASE_DATA: true,
  SET_SELECTED_NODE_ATTRS: true,
  PHASE_HOT: true,
  PHASE_WARM: true,
  PHASE_COLD: true,
  PHASE_DELETE: true,
  PHASE_ENABLED: true,
  PHASE_ROLLOVER_ENABLED: true,
  WARM_PHASE_ON_ROLLOVER: true,
  PHASE_ROLLOVER_ALIAS: true,
  PHASE_ROLLOVER_MAX_AGE: true,
  PHASE_ROLLOVER_MAX_AGE_UNITS: true,
  PHASE_ROLLOVER_MAX_SIZE_STORED: true,
  PHASE_ROLLOVER_MAX_DOCUMENTS: true,
  PHASE_ROLLOVER_MAX_SIZE_STORED_UNITS: true,
  PHASE_ROLLOVER_MINIMUM_AGE: true,
  PHASE_ROLLOVER_MINIMUM_AGE_UNITS: true,
  PHASE_FORCE_MERGE_SEGMENTS: true,
  PHASE_FORCE_MERGE_ENABLED: true,
  PHASE_FREEZE_ENABLED: true,
  PHASE_SHRINK_ENABLED: true,
  PHASE_NODE_ATTRS: true,
  PHASE_PRIMARY_SHARD_COUNT: true,
  PHASE_REPLICA_COUNT: true,
  PHASE_INDEX_PRIORITY: true,
  PHASE_ATTRIBUTES_THAT_ARE_NUMBERS_VALIDATE: true,
  PHASE_ATTRIBUTES_THAT_ARE_NUMBERS: true,
  STRUCTURE_INDEX_TEMPLATE: true,
  STRUCTURE_TEMPLATE_SELECTION: true,
  STRUCTURE_TEMPLATE_NAME: true,
  STRUCTURE_CONFIGURATION: true,
  STRUCTURE_NODE_ATTRS: true,
  STRUCTURE_PRIMARY_NODES: true,
  STRUCTURE_REPLICAS: true,
  STRUCTURE_POLICY_CONFIGURATION: true,
  STRUCTURE_REVIEW: true,
  STRUCTURE_POLICY_NAME: true,
  STRUCTURE_INDEX_NAME: true,
  STRUCTURE_ALIAS_NAME: true,
  ERROR_STRUCTURE: true
};
exports.ERROR_STRUCTURE = exports.STRUCTURE_ALIAS_NAME = exports.STRUCTURE_INDEX_NAME = exports.STRUCTURE_POLICY_NAME = exports.STRUCTURE_REVIEW = exports.STRUCTURE_POLICY_CONFIGURATION = exports.STRUCTURE_REPLICAS = exports.STRUCTURE_PRIMARY_NODES = exports.STRUCTURE_NODE_ATTRS = exports.STRUCTURE_CONFIGURATION = exports.STRUCTURE_TEMPLATE_NAME = exports.STRUCTURE_TEMPLATE_SELECTION = exports.STRUCTURE_INDEX_TEMPLATE = exports.PHASE_ATTRIBUTES_THAT_ARE_NUMBERS = exports.PHASE_ATTRIBUTES_THAT_ARE_NUMBERS_VALIDATE = exports.PHASE_INDEX_PRIORITY = exports.PHASE_REPLICA_COUNT = exports.PHASE_PRIMARY_SHARD_COUNT = exports.PHASE_NODE_ATTRS = exports.PHASE_SHRINK_ENABLED = exports.PHASE_FREEZE_ENABLED = exports.PHASE_FORCE_MERGE_ENABLED = exports.PHASE_FORCE_MERGE_SEGMENTS = exports.PHASE_ROLLOVER_MINIMUM_AGE_UNITS = exports.PHASE_ROLLOVER_MINIMUM_AGE = exports.PHASE_ROLLOVER_MAX_SIZE_STORED_UNITS = exports.PHASE_ROLLOVER_MAX_DOCUMENTS = exports.PHASE_ROLLOVER_MAX_SIZE_STORED = exports.PHASE_ROLLOVER_MAX_AGE_UNITS = exports.PHASE_ROLLOVER_MAX_AGE = exports.PHASE_ROLLOVER_ALIAS = exports.WARM_PHASE_ON_ROLLOVER = exports.PHASE_ROLLOVER_ENABLED = exports.PHASE_ENABLED = exports.PHASE_DELETE = exports.PHASE_COLD = exports.PHASE_WARM = exports.PHASE_HOT = exports.SET_SELECTED_NODE_ATTRS = exports.SET_PHASE_DATA = void 0;

var _ui_metric = require("./ui_metric");

Object.keys(_ui_metric).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ui_metric[key];
    }
  });
});

var _PHASE_HOT, _PHASE_WARM, _PHASE_COLD, _PHASE_DELETE, _ERROR_STRUCTURE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SET_PHASE_DATA = 'SET_PHASE_DATA';
exports.SET_PHASE_DATA = SET_PHASE_DATA;
var SET_SELECTED_NODE_ATTRS = 'SET_SELECTED_NODE_ATTRS';
exports.SET_SELECTED_NODE_ATTRS = SET_SELECTED_NODE_ATTRS;
var PHASE_HOT = 'hot';
exports.PHASE_HOT = PHASE_HOT;
var PHASE_WARM = 'warm';
exports.PHASE_WARM = PHASE_WARM;
var PHASE_COLD = 'cold';
exports.PHASE_COLD = PHASE_COLD;
var PHASE_DELETE = 'delete';
exports.PHASE_DELETE = PHASE_DELETE;
var PHASE_ENABLED = 'phaseEnabled';
exports.PHASE_ENABLED = PHASE_ENABLED;
var PHASE_ROLLOVER_ENABLED = 'rolloverEnabled';
exports.PHASE_ROLLOVER_ENABLED = PHASE_ROLLOVER_ENABLED;
var WARM_PHASE_ON_ROLLOVER = 'warmPhaseOnRollover';
exports.WARM_PHASE_ON_ROLLOVER = WARM_PHASE_ON_ROLLOVER;
var PHASE_ROLLOVER_ALIAS = 'selectedAlias';
exports.PHASE_ROLLOVER_ALIAS = PHASE_ROLLOVER_ALIAS;
var PHASE_ROLLOVER_MAX_AGE = 'selectedMaxAge';
exports.PHASE_ROLLOVER_MAX_AGE = PHASE_ROLLOVER_MAX_AGE;
var PHASE_ROLLOVER_MAX_AGE_UNITS = 'selectedMaxAgeUnits';
exports.PHASE_ROLLOVER_MAX_AGE_UNITS = PHASE_ROLLOVER_MAX_AGE_UNITS;
var PHASE_ROLLOVER_MAX_SIZE_STORED = 'selectedMaxSizeStored';
exports.PHASE_ROLLOVER_MAX_SIZE_STORED = PHASE_ROLLOVER_MAX_SIZE_STORED;
var PHASE_ROLLOVER_MAX_DOCUMENTS = 'selectedMaxDocuments';
exports.PHASE_ROLLOVER_MAX_DOCUMENTS = PHASE_ROLLOVER_MAX_DOCUMENTS;
var PHASE_ROLLOVER_MAX_SIZE_STORED_UNITS = 'selectedMaxSizeStoredUnits';
exports.PHASE_ROLLOVER_MAX_SIZE_STORED_UNITS = PHASE_ROLLOVER_MAX_SIZE_STORED_UNITS;
var PHASE_ROLLOVER_MINIMUM_AGE = 'selectedMinimumAge';
exports.PHASE_ROLLOVER_MINIMUM_AGE = PHASE_ROLLOVER_MINIMUM_AGE;
var PHASE_ROLLOVER_MINIMUM_AGE_UNITS = 'selectedMinimumAgeUnits';
exports.PHASE_ROLLOVER_MINIMUM_AGE_UNITS = PHASE_ROLLOVER_MINIMUM_AGE_UNITS;
var PHASE_FORCE_MERGE_SEGMENTS = 'selectedForceMergeSegments';
exports.PHASE_FORCE_MERGE_SEGMENTS = PHASE_FORCE_MERGE_SEGMENTS;
var PHASE_FORCE_MERGE_ENABLED = 'forceMergeEnabled';
exports.PHASE_FORCE_MERGE_ENABLED = PHASE_FORCE_MERGE_ENABLED;
var PHASE_FREEZE_ENABLED = 'freezeEnabled';
exports.PHASE_FREEZE_ENABLED = PHASE_FREEZE_ENABLED;
var PHASE_SHRINK_ENABLED = 'shrinkEnabled';
exports.PHASE_SHRINK_ENABLED = PHASE_SHRINK_ENABLED;
var PHASE_NODE_ATTRS = 'selectedNodeAttrs';
exports.PHASE_NODE_ATTRS = PHASE_NODE_ATTRS;
var PHASE_PRIMARY_SHARD_COUNT = 'selectedPrimaryShardCount';
exports.PHASE_PRIMARY_SHARD_COUNT = PHASE_PRIMARY_SHARD_COUNT;
var PHASE_REPLICA_COUNT = 'selectedReplicaCount';
exports.PHASE_REPLICA_COUNT = PHASE_REPLICA_COUNT;
var PHASE_INDEX_PRIORITY = 'phaseIndexPriority';
exports.PHASE_INDEX_PRIORITY = PHASE_INDEX_PRIORITY;
var PHASE_ATTRIBUTES_THAT_ARE_NUMBERS_VALIDATE = [PHASE_ROLLOVER_MINIMUM_AGE, PHASE_FORCE_MERGE_SEGMENTS, PHASE_PRIMARY_SHARD_COUNT, PHASE_REPLICA_COUNT, PHASE_INDEX_PRIORITY];
exports.PHASE_ATTRIBUTES_THAT_ARE_NUMBERS_VALIDATE = PHASE_ATTRIBUTES_THAT_ARE_NUMBERS_VALIDATE;
var PHASE_ATTRIBUTES_THAT_ARE_NUMBERS = [].concat(PHASE_ATTRIBUTES_THAT_ARE_NUMBERS_VALIDATE, [PHASE_ROLLOVER_MAX_AGE, PHASE_ROLLOVER_MAX_SIZE_STORED, PHASE_ROLLOVER_MAX_DOCUMENTS]);
exports.PHASE_ATTRIBUTES_THAT_ARE_NUMBERS = PHASE_ATTRIBUTES_THAT_ARE_NUMBERS;
var STRUCTURE_INDEX_TEMPLATE = 'indexTemplate';
exports.STRUCTURE_INDEX_TEMPLATE = STRUCTURE_INDEX_TEMPLATE;
var STRUCTURE_TEMPLATE_SELECTION = 'templateSelection';
exports.STRUCTURE_TEMPLATE_SELECTION = STRUCTURE_TEMPLATE_SELECTION;
var STRUCTURE_TEMPLATE_NAME = 'templateName';
exports.STRUCTURE_TEMPLATE_NAME = STRUCTURE_TEMPLATE_NAME;
var STRUCTURE_CONFIGURATION = 'configuration';
exports.STRUCTURE_CONFIGURATION = STRUCTURE_CONFIGURATION;
var STRUCTURE_NODE_ATTRS = 'node_attrs';
exports.STRUCTURE_NODE_ATTRS = STRUCTURE_NODE_ATTRS;
var STRUCTURE_PRIMARY_NODES = 'primary_nodes';
exports.STRUCTURE_PRIMARY_NODES = STRUCTURE_PRIMARY_NODES;
var STRUCTURE_REPLICAS = 'replicas';
exports.STRUCTURE_REPLICAS = STRUCTURE_REPLICAS;
var STRUCTURE_POLICY_CONFIGURATION = 'policyConfiguration';
exports.STRUCTURE_POLICY_CONFIGURATION = STRUCTURE_POLICY_CONFIGURATION;
var STRUCTURE_REVIEW = 'review';
exports.STRUCTURE_REVIEW = STRUCTURE_REVIEW;
var STRUCTURE_POLICY_NAME = 'policyName';
exports.STRUCTURE_POLICY_NAME = STRUCTURE_POLICY_NAME;
var STRUCTURE_INDEX_NAME = 'indexName';
exports.STRUCTURE_INDEX_NAME = STRUCTURE_INDEX_NAME;
var STRUCTURE_ALIAS_NAME = 'aliasName';
exports.STRUCTURE_ALIAS_NAME = STRUCTURE_ALIAS_NAME;
var ERROR_STRUCTURE = (_ERROR_STRUCTURE = {}, _defineProperty(_ERROR_STRUCTURE, PHASE_HOT, (_PHASE_HOT = {}, _defineProperty(_PHASE_HOT, PHASE_ROLLOVER_ALIAS, []), _defineProperty(_PHASE_HOT, PHASE_ROLLOVER_MAX_AGE, []), _defineProperty(_PHASE_HOT, PHASE_ROLLOVER_MAX_AGE_UNITS, []), _defineProperty(_PHASE_HOT, PHASE_ROLLOVER_MAX_SIZE_STORED, []), _defineProperty(_PHASE_HOT, PHASE_ROLLOVER_MAX_DOCUMENTS, []), _defineProperty(_PHASE_HOT, PHASE_ROLLOVER_MAX_SIZE_STORED_UNITS, []), _defineProperty(_PHASE_HOT, PHASE_INDEX_PRIORITY, []), _PHASE_HOT)), _defineProperty(_ERROR_STRUCTURE, PHASE_WARM, (_PHASE_WARM = {}, _defineProperty(_PHASE_WARM, PHASE_ROLLOVER_ALIAS, []), _defineProperty(_PHASE_WARM, PHASE_ROLLOVER_MINIMUM_AGE, []), _defineProperty(_PHASE_WARM, PHASE_ROLLOVER_MINIMUM_AGE_UNITS, []), _defineProperty(_PHASE_WARM, PHASE_NODE_ATTRS, []), _defineProperty(_PHASE_WARM, PHASE_PRIMARY_SHARD_COUNT, []), _defineProperty(_PHASE_WARM, PHASE_REPLICA_COUNT, []), _defineProperty(_PHASE_WARM, PHASE_FORCE_MERGE_SEGMENTS, []), _defineProperty(_PHASE_WARM, PHASE_INDEX_PRIORITY, []), _PHASE_WARM)), _defineProperty(_ERROR_STRUCTURE, PHASE_COLD, (_PHASE_COLD = {}, _defineProperty(_PHASE_COLD, PHASE_ROLLOVER_ALIAS, []), _defineProperty(_PHASE_COLD, PHASE_ROLLOVER_MINIMUM_AGE, []), _defineProperty(_PHASE_COLD, PHASE_ROLLOVER_MINIMUM_AGE_UNITS, []), _defineProperty(_PHASE_COLD, PHASE_NODE_ATTRS, []), _defineProperty(_PHASE_COLD, PHASE_REPLICA_COUNT, []), _defineProperty(_PHASE_COLD, PHASE_INDEX_PRIORITY, []), _PHASE_COLD)), _defineProperty(_ERROR_STRUCTURE, PHASE_DELETE, (_PHASE_DELETE = {}, _defineProperty(_PHASE_DELETE, PHASE_ROLLOVER_ALIAS, []), _defineProperty(_PHASE_DELETE, PHASE_ROLLOVER_MINIMUM_AGE, []), _defineProperty(_PHASE_DELETE, PHASE_ROLLOVER_MINIMUM_AGE_UNITS, []), _PHASE_DELETE)), _defineProperty(_ERROR_STRUCTURE, STRUCTURE_POLICY_NAME, []), _ERROR_STRUCTURE);
exports.ERROR_STRUCTURE = ERROR_STRUCTURE;
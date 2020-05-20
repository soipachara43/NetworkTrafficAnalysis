"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRollupSearchStrategy = void 0;

var _lodash = require("lodash");

var _call_with_request_factory = require("../call_with_request_factory");

var _merge_capabilities_with_fields = require("../merge_capabilities_with_fields");

var _map_capabilities = require("../map_capabilities");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ROLLUP_INDEX_CAPABILITIES_METHOD = 'rollup.rollupIndexCapabilities';

const getRollupIndices = rollupData => Object.keys(rollupData);

const isIndexPatternContainsWildcard = indexPattern => indexPattern.includes('*');

const isIndexPatternValid = indexPattern => indexPattern && (0, _lodash.isString)(indexPattern) && !isIndexPatternContainsWildcard(indexPattern);

const getRollupSearchStrategy = (AbstractSearchStrategy, RollupSearchRequest, RollupSearchCapabilities) => {
  var _temp;

  return _temp = class RollupSearchStrategy extends AbstractSearchStrategy {
    constructor(elasticsearchService) {
      super(elasticsearchService, _call_with_request_factory.callWithRequestFactory, RollupSearchRequest);

      _defineProperty(this, "name", 'rollup');
    }

    getRollupData(req, indexPattern) {
      const callWithRequest = this.getCallWithRequestInstance(req);
      return callWithRequest(ROLLUP_INDEX_CAPABILITIES_METHOD, {
        indexPattern
      }).catch(() => Promise.resolve({}));
    }

    async checkForViability(req, indexPattern) {
      let isViable = false;
      let capabilities = null;

      if (isIndexPatternValid(indexPattern)) {
        const rollupData = await this.getRollupData(req, indexPattern);
        const rollupIndices = getRollupIndices(rollupData);
        isViable = rollupIndices.length === 1;

        if (isViable) {
          const [rollupIndex] = rollupIndices;
          const fieldsCapabilities = (0, _map_capabilities.getCapabilitiesForRollupIndices)(rollupData);
          capabilities = new RollupSearchCapabilities(req, fieldsCapabilities, rollupIndex);
        }
      }

      return {
        isViable,
        capabilities
      };
    }

    async getFieldsForWildcard(req, indexPattern, {
      fieldsCapabilities,
      rollupIndex
    }) {
      const fields = await super.getFieldsForWildcard(req, indexPattern);
      const fieldsFromFieldCapsApi = (0, _lodash.indexBy)(fields, 'name');
      const rollupIndexCapabilities = fieldsCapabilities[rollupIndex].aggs;
      return (0, _merge_capabilities_with_fields.mergeCapabilitiesWithFields)(rollupIndexCapabilities, fieldsFromFieldCapsApi);
    }

  }, _temp;
};

exports.getRollupSearchStrategy = getRollupSearchStrategy;
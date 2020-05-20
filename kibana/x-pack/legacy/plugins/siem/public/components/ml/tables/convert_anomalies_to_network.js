"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNetworkFromEntity = exports.convertAnomaliesToNetwork = void 0;

var _types = require("../types");

var _get_network_from_influencers = require("../influencers/get_network_from_influencers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var convertAnomaliesToNetwork = function convertAnomaliesToNetwork(anomalies, ip) {
  if (anomalies == null) {
    return [];
  } else {
    return anomalies.anomalies.reduce(function (accum, item) {
      if ((0, _types.isDestinationOrSource)(item.entityName) && getNetworkFromEntity(item, ip)) {
        return [].concat(_toConsumableArray(accum), [{
          ip: item.entityValue,
          type: item.entityName,
          anomaly: item
        }]);
      } else {
        var network = (0, _get_network_from_influencers.getNetworkFromInfluencers)(item.influencers, ip);

        if (network != null) {
          return [].concat(_toConsumableArray(accum), [{
            ip: network.ip,
            type: network.type,
            anomaly: item
          }]);
        } else {
          return accum;
        }
      }
    }, []);
  }
};

exports.convertAnomaliesToNetwork = convertAnomaliesToNetwork;

var getNetworkFromEntity = function getNetworkFromEntity(anomaly, ip) {
  if ((0, _types.isDestinationOrSource)(anomaly.entityName)) {
    if (ip == null) {
      return true;
    } else {
      return anomaly.entityValue === ip;
    }
  } else {
    return false;
  }
};

exports.getNetworkFromEntity = getNetworkFromEntity;
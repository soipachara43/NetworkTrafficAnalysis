"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHostNameFromEntity = exports.convertAnomaliesToHosts = void 0;

var _get_host_name_from_influencers = require("../influencers/get_host_name_from_influencers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var convertAnomaliesToHosts = function convertAnomaliesToHosts(anomalies, hostName) {
  if (anomalies == null) {
    return [];
  } else {
    return anomalies.anomalies.reduce(function (accum, item) {
      if (getHostNameFromEntity(item, hostName)) {
        return [].concat(_toConsumableArray(accum), [{
          hostName: item.entityValue,
          anomaly: item
        }]);
      } else {
        var hostNameFromInfluencers = (0, _get_host_name_from_influencers.getHostNameFromInfluencers)(item.influencers, hostName);

        if (hostNameFromInfluencers != null) {
          return [].concat(_toConsumableArray(accum), [{
            hostName: hostNameFromInfluencers,
            anomaly: item
          }]);
        } else {
          return accum;
        }
      }
    }, []);
  }
};

exports.convertAnomaliesToHosts = convertAnomaliesToHosts;

var getHostNameFromEntity = function getHostNameFromEntity(anomaly, hostName) {
  if (anomaly.entityName !== 'host.name') {
    return false;
  } else if (hostName == null) {
    return true;
  } else {
    return anomaly.entityValue === hostName;
  }
};

exports.getHostNameFromEntity = getHostNameFromEntity;
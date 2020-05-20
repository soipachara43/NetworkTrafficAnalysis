"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHostNameFromInfluencers = void 0;

var _get_entries = require("../get_entries");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getHostNameFromInfluencers = function getHostNameFromInfluencers() {
  var influencers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var hostName = arguments.length > 1 ? arguments[1] : undefined;
  var recordFound = influencers.find(function (influencer) {
    var _getEntries = (0, _get_entries.getEntries)(influencer),
        _getEntries2 = _slicedToArray(_getEntries, 2),
        influencerName = _getEntries2[0],
        influencerValue = _getEntries2[1];

    if (influencerName === 'host.name') {
      if (hostName == null) {
        return true;
      } else {
        return influencerValue === hostName;
      }
    } else {
      return false;
    }
  });

  if (recordFound != null) {
    return Object.values(recordFound)[0];
  } else {
    return null;
  }
};

exports.getHostNameFromInfluencers = getHostNameFromInfluencers;
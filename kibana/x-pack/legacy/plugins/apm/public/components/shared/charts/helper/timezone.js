"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDomainTZ = exports.getTimeTicksTZ = void 0;

var _d2 = _interopRequireDefault(require("d3"));

var _getTimezoneOffsetInMs = require("../CustomPlot/getTimezoneOffsetInMs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getTimeTicksTZ = function getTimeTicksTZ(_ref) {
  var domain = _ref.domain,
      totalTicks = _ref.totalTicks,
      width = _ref.width;
  return _d2.default.time.scale.utc().domain(domain).range([0, width]).ticks(totalTicks).map(function (x) {
    var time = x.getTime();
    return new Date(time + (0, _getTimezoneOffsetInMs.getTimezoneOffsetInMs)(time));
  });
};

exports.getTimeTicksTZ = getTimeTicksTZ;

var getDomainTZ = function getDomainTZ(min, max) {
  var _map = [min, max].map(function (time) {
    return time - (0, _getTimezoneOffsetInMs.getTimezoneOffsetInMs)(time);
  }),
      _map2 = _slicedToArray(_map, 2),
      xMinZone = _map2[0],
      xMaxZone = _map2[1];

  return [xMinZone, xMaxZone];
};

exports.getDomainTZ = getDomainTZ;
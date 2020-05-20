"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInfluencers = exports.createKeyAndValue = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _fp = require("lodash/fp");

var _get_entries = require("../get_entries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createKeyAndValue = function createKeyAndValue(influencer) {
  var _getEntries = (0, _get_entries.getEntries)(influencer),
      _getEntries2 = _slicedToArray(_getEntries, 2),
      key = _getEntries2[0],
      value = _getEntries2[1];

  if (key != null && value != null) {
    return "".concat(key, ": \"").concat(value, "\"");
  } else {
    return '';
  }
};

exports.createKeyAndValue = createKeyAndValue;

var createInfluencers = function createInfluencers() {
  var influencers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return influencers.filter(function (influencer) {
    return !(0, _fp.isEmpty)(influencer);
  }).map(function (influencer) {
    var keyAndValue = createKeyAndValue(influencer);
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: keyAndValue,
      grow: false
    }, keyAndValue);
  });
};

exports.createInfluencers = createInfluencers;
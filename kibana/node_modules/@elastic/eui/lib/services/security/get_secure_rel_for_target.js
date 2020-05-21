"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSecureRelForTarget = void 0;

var _filter = _interopRequireDefault(require("lodash/filter"));

var _url = require("../url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Secures outbound links. For more info:
 * https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
 */
var getSecureRelForTarget = function getSecureRelForTarget(_ref) {
  var href = _ref.href,
      _ref$target = _ref.target,
      target = _ref$target === void 0 ? '' : _ref$target,
      rel = _ref.rel;
  var isElasticHref = !!href && (0, _url.isDomainSecure)(href);
  var relParts = !!rel ? (0, _filter.default)(rel.split(' '), function (part) {
    return !!part.length && part !== 'noreferrer';
  }) : [];

  if (!isElasticHref) {
    relParts.push('noreferrer');
  }

  if (target.includes('_blank') && relParts.indexOf('noopener') === -1) {
    relParts.push('noopener');
  }

  return relParts.sort().join(' ').trim();
};

exports.getSecureRelForTarget = getSecureRelForTarget;
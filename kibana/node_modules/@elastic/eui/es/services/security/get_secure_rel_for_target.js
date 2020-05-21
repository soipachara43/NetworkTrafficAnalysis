/**
 * Secures outbound links. For more info:
 * https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
 */
import filter from 'lodash/filter';
import { isDomainSecure } from '../url';
export var getSecureRelForTarget = function getSecureRelForTarget(_ref) {
  var href = _ref.href,
      _ref$target = _ref.target,
      target = _ref$target === void 0 ? '' : _ref$target,
      rel = _ref.rel;
  var isElasticHref = !!href && isDomainSecure(href);
  var relParts = !!rel ? filter(rel.split(' '), function (part) {
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
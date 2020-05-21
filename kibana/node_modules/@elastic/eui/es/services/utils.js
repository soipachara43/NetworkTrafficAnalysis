import _times from 'lodash/times';
import _memoize from 'lodash/memoize'; // wrap the lodash functions to avoid having lodash's TS type definition from being
// exported, which can conflict with the lodash namespace if other versions are used

/* eslint-disable import/export */

export function times(count, iteratee) {
  if (iteratee === undefined) {
    return _times(count);
  }

  return _times(count, iteratee);
}
/* eslint-enable import/export */
// eslint-disable-next-line space-before-function-paren

export function memoize(func, resolver) {
  return _memoize(func, resolver);
}
export var browserTick = function browserTick(callback) {
  requestAnimationFrame(callback);
};
import dateMath from '@elastic/datemath';
import { parseRelativeParts, toRelativeStringFromParts } from './relative_utils';
export var DATE_MODES = {
  ABSOLUTE: 'absolute',
  RELATIVE: 'relative',
  NOW: 'now'
};
export function getDateMode(value) {
  if (value === 'now') {
    return DATE_MODES.NOW;
  }

  if (value.includes('now')) {
    return DATE_MODES.RELATIVE;
  }

  return DATE_MODES.ABSOLUTE;
}
export function toAbsoluteString(value, roundUp) {
  var valueAsMoment = dateMath.parse(value, {
    roundUp: roundUp
  });

  if (!valueAsMoment) {
    return value;
  }

  return valueAsMoment.toISOString();
}
export function toRelativeString(value) {
  return toRelativeStringFromParts(parseRelativeParts(value));
}
import { hsvToRgb } from './hsv_to_rgb';
import { rgbToHex } from './rgb_to_hex';
export function hsvToHex(_ref) {
  var h = _ref.h,
      s = _ref.s,
      v = _ref.v;

  var _hsvToRgb = hsvToRgb({
    h: h,
    s: s,
    v: v
  }),
      r = _hsvToRgb.r,
      g = _hsvToRgb.g,
      b = _hsvToRgb.b;

  return rgbToHex("rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")"));
}
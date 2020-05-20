"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateFromString = exports.DateFromStringType = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _Either = require("fp-ts/lib/Either");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DateFromStringType extends t.Type {
  // eslint-disable-next-line
  constructor() {
    super('DateFromString', u => u instanceof Date, (u, c) => {
      const validation = t.string.validate(u, c);

      if (!(0, _Either.isRight)(validation)) {
        return validation;
      } else {
        const s = validation.right;
        const d = new Date(s);
        return isNaN(d.getTime()) ? t.failure(s, c) : t.success(d);
      }
    }, a => a.toISOString());

    _defineProperty(this, "_tag", 'DateFromISOStringType');
  }

} // eslint-disable-next-line


exports.DateFromStringType = DateFromStringType;
const DateFromString = new DateFromStringType();
exports.DateFromString = DateFromString;
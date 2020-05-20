"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonLayout = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _configSchema = require("@kbn/config-schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  literal,
  object
} = _configSchema.schema;
const jsonLayoutSchema = object({
  kind: literal('json')
});
/** @internal */

/**
 * Layout that just converts `LogRecord` into JSON string.
 * @internal
 */
class JsonLayout {
  static errorToSerializableObject(error) {
    if (error === undefined) {
      return error;
    }

    return {
      message: error.message,
      name: error.name,
      stack: error.stack
    };
  }

  format(record) {
    return JSON.stringify({
      '@timestamp': (0, _momentTimezone.default)(record.timestamp).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      context: record.context,
      error: JsonLayout.errorToSerializableObject(record.error),
      level: record.level.id.toUpperCase(),
      message: record.message,
      meta: record.meta,
      pid: record.pid
    });
  }

}

exports.JsonLayout = JsonLayout;

_defineProperty(JsonLayout, "configSchema", jsonLayoutSchema);
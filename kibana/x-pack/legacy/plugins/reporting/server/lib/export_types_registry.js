"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExportTypesRegistry = exports.ExportTypesRegistry = void 0;

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _lodash = require("lodash");

var _csv = require("../../export_types/csv");

var _csv_from_savedobject = require("../../export_types/csv_from_savedobject");

var _png = require("../../export_types/png");

var _printable_pdf = require("../../export_types/printable_pdf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// => ExportTypeDefinition<T, U, V, W>
class ExportTypesRegistry {
  constructor() {
    _defineProperty(this, "_map", new Map());
  }

  register(item) {
    if (!(0, _lodash.isString)(item.id)) {
      throw new Error(`'item' must have a String 'id' property `);
    }

    if (this._map.has(item.id)) {
      throw new Error(`'item' with id ${item.id} has already been registered`);
    } // TODO: Unwrap the execute function from the item's executeJobFactory
    // Move that work out of server/lib/create_worker to reduce dependence on ESQueue


    this._map.set(item.id, item);
  }

  getAll() {
    return Array.from(this._map.values());
  }

  getSize() {
    return this._map.size;
  }

  getById(id) {
    if (!this._map.has(id)) {
      throw new Error(`Unknown id ${id}`);
    }

    return this._map.get(id);
  }

  get(findType) {
    let result;

    for (const value of this._map.values()) {
      if (!findType(value)) {
        continue; // try next value
      }

      const foundResult = value;

      if (result) {
        throw new Error('Found multiple items matching predicate.');
      }

      result = foundResult;
    }

    if (!result) {
      throw new Error('Found no items matching predicate');
    }

    return result;
  }

}

exports.ExportTypesRegistry = ExportTypesRegistry;

function getExportTypesRegistryFn() {
  const registry = new ExportTypesRegistry();
  /* this replaces the previously async method of registering export types,
   * where this would run a directory scan and types would be registered via
   * discovery */

  const getTypeFns = [_csv.getExportType, _csv_from_savedobject.getExportType, _png.getExportType, _printable_pdf.getExportType];
  getTypeFns.forEach(getType => {
    registry.register(getType());
  });
  return registry;
} // FIXME: is this the best way to return a singleton?


const getExportTypesRegistry = (0, _memoizeOne.default)(getExportTypesRegistryFn);
exports.getExportTypesRegistry = getExportTypesRegistry;
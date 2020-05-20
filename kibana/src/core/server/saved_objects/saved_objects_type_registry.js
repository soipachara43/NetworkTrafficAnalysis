"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectTypeRegistry = void 0;

var _utils = require("../../utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Registry holding information about all the registered {@link SavedObjectsType | saved object types}.
 *
 * @public
 */
class SavedObjectTypeRegistry {
  constructor() {
    _defineProperty(this, "types", new Map());
  }

  /**
   * Register a {@link SavedObjectsType | type} inside the registry.
   * A type can only be registered once. subsequent calls with the same type name will throw an error.
   */
  registerType(type) {
    if (this.types.has(type.name)) {
      throw new Error(`Type '${type.name}' is already registered`);
    }

    this.types.set(type.name, (0, _utils.deepFreeze)(type));
  }
  /**
   * Return the {@link SavedObjectsType | type} definition for given type name.
   */


  getType(type) {
    return this.types.get(type);
  }
  /**
   * Return all {@link SavedObjectsType | types} currently registered.
   */


  getAllTypes() {
    return [...this.types.values()];
  }
  /**
   * Return all {@link SavedObjectsType | types} currently registered that are importable/exportable.
   */


  getImportableAndExportableTypes() {
    return this.getAllTypes().filter(type => this.isImportableAndExportable(type.name));
  }
  /**
   * Returns the `namespaceAgnostic` property for given type, or `false` if
   * the type is not registered.
   */


  isNamespaceAgnostic(type) {
    var _ref, _this$types$get;

    return (_ref = (_this$types$get = this.types.get(type)) === null || _this$types$get === void 0 ? void 0 : _this$types$get.namespaceAgnostic) !== null && _ref !== void 0 ? _ref : false;
  }
  /**
   * Returns the `hidden` property for given type, or `false` if
   * the type is not registered.
   */


  isHidden(type) {
    var _ref2, _this$types$get2;

    return (_ref2 = (_this$types$get2 = this.types.get(type)) === null || _this$types$get2 === void 0 ? void 0 : _this$types$get2.hidden) !== null && _ref2 !== void 0 ? _ref2 : false;
  }
  /**
   * Returns the `indexPattern` property for given type, or `undefined` if
   * the type is not registered.
   */


  getIndex(type) {
    var _this$types$get3;

    return (_this$types$get3 = this.types.get(type)) === null || _this$types$get3 === void 0 ? void 0 : _this$types$get3.indexPattern;
  }
  /**
   * Returns the `management.importableAndExportable` property for given type, or
   * `false` if the type is not registered or does not define a management section.
   */


  isImportableAndExportable(type) {
    var _ref3, _this$types$get4, _this$types$get4$mana;

    return (_ref3 = (_this$types$get4 = this.types.get(type)) === null || _this$types$get4 === void 0 ? void 0 : (_this$types$get4$mana = _this$types$get4.management) === null || _this$types$get4$mana === void 0 ? void 0 : _this$types$get4$mana.importableAndExportable) !== null && _ref3 !== void 0 ? _ref3 : false;
  }

}

exports.SavedObjectTypeRegistry = SavedObjectTypeRegistry;
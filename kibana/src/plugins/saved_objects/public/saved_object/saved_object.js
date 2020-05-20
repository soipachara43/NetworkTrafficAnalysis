"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSavedObjectClass = createSavedObjectClass;

var _build_saved_object = require("./helpers/build_saved_object");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createSavedObjectClass(services) {
  /**
   * The SavedObject class is a base class for saved objects loaded from the server and
   * provides additional functionality besides loading/saving/deleting/etc.
   *
   * It is overloaded and configured to provide type-aware functionality.
   * To just retrieve the attributes of saved objects, it is recommended to use SavedObjectLoader
   * which returns instances of SimpleSavedObject which don't introduce additional type-specific complexity.
   * @param {*} config
   */
  var SavedObjectClass = function SavedObjectClass() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SavedObjectClass);

    // @ts-ignore
    var self = this;
    (0, _build_saved_object.buildSavedObject)(self, config, services);
  };

  return SavedObjectClass;
}
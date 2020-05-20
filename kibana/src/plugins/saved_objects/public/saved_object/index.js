"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createSavedObjectClass", {
  enumerable: true,
  get: function get() {
    return _saved_object.createSavedObjectClass;
  }
});
Object.defineProperty(exports, "SavedObjectLoader", {
  enumerable: true,
  get: function get() {
    return _saved_object_loader.SavedObjectLoader;
  }
});
Object.defineProperty(exports, "checkForDuplicateTitle", {
  enumerable: true,
  get: function get() {
    return _check_for_duplicate_title.checkForDuplicateTitle;
  }
});
Object.defineProperty(exports, "saveWithConfirmation", {
  enumerable: true,
  get: function get() {
    return _save_with_confirmation.saveWithConfirmation;
  }
});
Object.defineProperty(exports, "isErrorNonFatal", {
  enumerable: true,
  get: function get() {
    return _save_saved_object.isErrorNonFatal;
  }
});

var _saved_object = require("./saved_object");

var _saved_object_loader = require("./saved_object_loader");

var _check_for_duplicate_title = require("./helpers/check_for_duplicate_title");

var _save_with_confirmation = require("./helpers/save_with_confirmation");

var _save_saved_object = require("./helpers/save_saved_object");
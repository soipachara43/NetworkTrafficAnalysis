"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "OnSaveProps", {
  enumerable: true,
  get: function get() {
    return _save_modal.OnSaveProps;
  }
});
Object.defineProperty(exports, "SavedObjectSaveModal", {
  enumerable: true,
  get: function get() {
    return _save_modal.SavedObjectSaveModal;
  }
});
Object.defineProperty(exports, "SaveResult", {
  enumerable: true,
  get: function get() {
    return _save_modal.SaveResult;
  }
});
Object.defineProperty(exports, "showSaveModal", {
  enumerable: true,
  get: function get() {
    return _save_modal.showSaveModal;
  }
});
Object.defineProperty(exports, "getSavedObjectFinder", {
  enumerable: true,
  get: function get() {
    return _finder.getSavedObjectFinder;
  }
});
Object.defineProperty(exports, "SavedObjectFinderUi", {
  enumerable: true,
  get: function get() {
    return _finder.SavedObjectFinderUi;
  }
});
Object.defineProperty(exports, "SavedObjectMetaData", {
  enumerable: true,
  get: function get() {
    return _finder.SavedObjectMetaData;
  }
});
Object.defineProperty(exports, "SavedObjectLoader", {
  enumerable: true,
  get: function get() {
    return _saved_object.SavedObjectLoader;
  }
});
Object.defineProperty(exports, "createSavedObjectClass", {
  enumerable: true,
  get: function get() {
    return _saved_object.createSavedObjectClass;
  }
});
Object.defineProperty(exports, "checkForDuplicateTitle", {
  enumerable: true,
  get: function get() {
    return _saved_object.checkForDuplicateTitle;
  }
});
Object.defineProperty(exports, "saveWithConfirmation", {
  enumerable: true,
  get: function get() {
    return _saved_object.saveWithConfirmation;
  }
});
Object.defineProperty(exports, "isErrorNonFatal", {
  enumerable: true,
  get: function get() {
    return _saved_object.isErrorNonFatal;
  }
});
Object.defineProperty(exports, "SavedObjectSaveOpts", {
  enumerable: true,
  get: function get() {
    return _types.SavedObjectSaveOpts;
  }
});
Object.defineProperty(exports, "SavedObjectKibanaServices", {
  enumerable: true,
  get: function get() {
    return _types.SavedObjectKibanaServices;
  }
});
Object.defineProperty(exports, "SavedObject", {
  enumerable: true,
  get: function get() {
    return _types.SavedObject;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _save_modal = require("./save_modal");

var _finder = require("./finder");

var _saved_object = require("./saved_object");

var _types = require("./types");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var plugin = function plugin() {
  return new _plugin.SavedObjectsPublicPlugin();
};

exports.plugin = plugin;
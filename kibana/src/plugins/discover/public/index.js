"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  DiscoverSetup: true,
  DiscoverStart: true,
  DocViewTable: true,
  JsonCodeBlock: true,
  DocViewInput: true,
  DocViewInputFn: true,
  DocViewerComponent: true,
  FieldName: true,
  createSavedSearchesLoader: true,
  SavedSearchLoader: true,
  SavedSearch: true
};
exports.plugin = plugin;
Object.defineProperty(exports, "DiscoverSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.DiscoverSetup;
  }
});
Object.defineProperty(exports, "DiscoverStart", {
  enumerable: true,
  get: function get() {
    return _plugin.DiscoverStart;
  }
});
Object.defineProperty(exports, "DocViewTable", {
  enumerable: true,
  get: function get() {
    return _table.DocViewTable;
  }
});
Object.defineProperty(exports, "JsonCodeBlock", {
  enumerable: true,
  get: function get() {
    return _json_code_block.JsonCodeBlock;
  }
});
Object.defineProperty(exports, "DocViewInput", {
  enumerable: true,
  get: function get() {
    return _doc_views_types.DocViewInput;
  }
});
Object.defineProperty(exports, "DocViewInputFn", {
  enumerable: true,
  get: function get() {
    return _doc_views_types.DocViewInputFn;
  }
});
Object.defineProperty(exports, "DocViewerComponent", {
  enumerable: true,
  get: function get() {
    return _doc_views_types.DocViewerComponent;
  }
});
Object.defineProperty(exports, "FieldName", {
  enumerable: true,
  get: function get() {
    return _field_name.FieldName;
  }
});
Object.defineProperty(exports, "createSavedSearchesLoader", {
  enumerable: true,
  get: function get() {
    return _saved_searches.createSavedSearchesLoader;
  }
});
Object.defineProperty(exports, "SavedSearchLoader", {
  enumerable: true,
  get: function get() {
    return _types.SavedSearchLoader;
  }
});
Object.defineProperty(exports, "SavedSearch", {
  enumerable: true,
  get: function get() {
    return _types.SavedSearch;
  }
});

var _plugin = require("./plugin");

var _table = require("./components/table/table");

var _json_code_block = require("./components/json_code_block/json_code_block");

var _doc_views_types = require("./doc_views/doc_views_types");

Object.keys(_doc_views_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _doc_views_types[key];
    }
  });
});

var _field_name = require("./components/field_name/field_name");

var _saved_searches = require("./saved_searches/saved_searches");

var _types = require("./saved_searches/types");

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
function plugin() {
  return new _plugin.DiscoverPlugin();
}
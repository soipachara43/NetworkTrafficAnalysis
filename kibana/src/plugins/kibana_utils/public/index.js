"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  calculateObjectHash: true,
  defer: true,
  Defer: true,
  Get: true,
  JsonArray: true,
  JsonObject: true,
  JsonValue: true,
  of: true,
  Set: true,
  UiComponent: true,
  UiComponentInstance: true,
  url: true,
  createGetterSetter: true,
  defaultFeedbackMessage: true,
  hashedItemStore: true,
  HashedItemStore: true,
  createStateHash: true,
  persistState: true,
  retrieveState: true,
  isStateHash: true,
  hashQuery: true,
  hashUrl: true,
  unhashUrl: true,
  unhashQuery: true,
  createUrlTracker: true,
  createKbnUrlTracker: true,
  createKbnUrlControls: true,
  getStateFromKbnUrl: true,
  getStatesFromKbnUrl: true,
  setStateToKbnUrl: true,
  syncState: true,
  syncStates: true,
  createKbnUrlStateStorage: true,
  createSessionStorageStateStorage: true,
  IStateSyncConfig: true,
  ISyncStateRef: true,
  IKbnUrlStateStorage: true,
  INullableBaseStateContainer: true,
  ISessionStorageStateStorage: true,
  StartSyncStateFnType: true,
  StopSyncStateFnType: true,
  removeQueryParam: true,
  redirectWhenMissing: true,
  ensureDefaultIndexPattern: true,
  applyDiff: true
};
exports.plugin = plugin;
Object.defineProperty(exports, "calculateObjectHash", {
  enumerable: true,
  get: function get() {
    return _common.calculateObjectHash;
  }
});
Object.defineProperty(exports, "defer", {
  enumerable: true,
  get: function get() {
    return _common.defer;
  }
});
Object.defineProperty(exports, "Defer", {
  enumerable: true,
  get: function get() {
    return _common.Defer;
  }
});
Object.defineProperty(exports, "Get", {
  enumerable: true,
  get: function get() {
    return _common.Get;
  }
});
Object.defineProperty(exports, "JsonArray", {
  enumerable: true,
  get: function get() {
    return _common.JsonArray;
  }
});
Object.defineProperty(exports, "JsonObject", {
  enumerable: true,
  get: function get() {
    return _common.JsonObject;
  }
});
Object.defineProperty(exports, "JsonValue", {
  enumerable: true,
  get: function get() {
    return _common.JsonValue;
  }
});
Object.defineProperty(exports, "of", {
  enumerable: true,
  get: function get() {
    return _common.of;
  }
});
Object.defineProperty(exports, "Set", {
  enumerable: true,
  get: function get() {
    return _common.Set;
  }
});
Object.defineProperty(exports, "UiComponent", {
  enumerable: true,
  get: function get() {
    return _common.UiComponent;
  }
});
Object.defineProperty(exports, "UiComponentInstance", {
  enumerable: true,
  get: function get() {
    return _common.UiComponentInstance;
  }
});
Object.defineProperty(exports, "url", {
  enumerable: true,
  get: function get() {
    return _common.url;
  }
});
Object.defineProperty(exports, "createGetterSetter", {
  enumerable: true,
  get: function get() {
    return _common.createGetterSetter;
  }
});
Object.defineProperty(exports, "defaultFeedbackMessage", {
  enumerable: true,
  get: function get() {
    return _common.defaultFeedbackMessage;
  }
});
Object.defineProperty(exports, "hashedItemStore", {
  enumerable: true,
  get: function get() {
    return _hashed_item_store.hashedItemStore;
  }
});
Object.defineProperty(exports, "HashedItemStore", {
  enumerable: true,
  get: function get() {
    return _hashed_item_store.HashedItemStore;
  }
});
Object.defineProperty(exports, "createStateHash", {
  enumerable: true,
  get: function get() {
    return _state_hash.createStateHash;
  }
});
Object.defineProperty(exports, "persistState", {
  enumerable: true,
  get: function get() {
    return _state_hash.persistState;
  }
});
Object.defineProperty(exports, "retrieveState", {
  enumerable: true,
  get: function get() {
    return _state_hash.retrieveState;
  }
});
Object.defineProperty(exports, "isStateHash", {
  enumerable: true,
  get: function get() {
    return _state_hash.isStateHash;
  }
});
Object.defineProperty(exports, "hashQuery", {
  enumerable: true,
  get: function get() {
    return _url.hashQuery;
  }
});
Object.defineProperty(exports, "hashUrl", {
  enumerable: true,
  get: function get() {
    return _url.hashUrl;
  }
});
Object.defineProperty(exports, "unhashUrl", {
  enumerable: true,
  get: function get() {
    return _url.unhashUrl;
  }
});
Object.defineProperty(exports, "unhashQuery", {
  enumerable: true,
  get: function get() {
    return _url.unhashQuery;
  }
});
Object.defineProperty(exports, "createUrlTracker", {
  enumerable: true,
  get: function get() {
    return _url.createUrlTracker;
  }
});
Object.defineProperty(exports, "createKbnUrlTracker", {
  enumerable: true,
  get: function get() {
    return _url.createKbnUrlTracker;
  }
});
Object.defineProperty(exports, "createKbnUrlControls", {
  enumerable: true,
  get: function get() {
    return _url.createKbnUrlControls;
  }
});
Object.defineProperty(exports, "getStateFromKbnUrl", {
  enumerable: true,
  get: function get() {
    return _url.getStateFromKbnUrl;
  }
});
Object.defineProperty(exports, "getStatesFromKbnUrl", {
  enumerable: true,
  get: function get() {
    return _url.getStatesFromKbnUrl;
  }
});
Object.defineProperty(exports, "setStateToKbnUrl", {
  enumerable: true,
  get: function get() {
    return _url.setStateToKbnUrl;
  }
});
Object.defineProperty(exports, "syncState", {
  enumerable: true,
  get: function get() {
    return _state_sync.syncState;
  }
});
Object.defineProperty(exports, "syncStates", {
  enumerable: true,
  get: function get() {
    return _state_sync.syncStates;
  }
});
Object.defineProperty(exports, "createKbnUrlStateStorage", {
  enumerable: true,
  get: function get() {
    return _state_sync.createKbnUrlStateStorage;
  }
});
Object.defineProperty(exports, "createSessionStorageStateStorage", {
  enumerable: true,
  get: function get() {
    return _state_sync.createSessionStorageStateStorage;
  }
});
Object.defineProperty(exports, "IStateSyncConfig", {
  enumerable: true,
  get: function get() {
    return _state_sync.IStateSyncConfig;
  }
});
Object.defineProperty(exports, "ISyncStateRef", {
  enumerable: true,
  get: function get() {
    return _state_sync.ISyncStateRef;
  }
});
Object.defineProperty(exports, "IKbnUrlStateStorage", {
  enumerable: true,
  get: function get() {
    return _state_sync.IKbnUrlStateStorage;
  }
});
Object.defineProperty(exports, "INullableBaseStateContainer", {
  enumerable: true,
  get: function get() {
    return _state_sync.INullableBaseStateContainer;
  }
});
Object.defineProperty(exports, "ISessionStorageStateStorage", {
  enumerable: true,
  get: function get() {
    return _state_sync.ISessionStorageStateStorage;
  }
});
Object.defineProperty(exports, "StartSyncStateFnType", {
  enumerable: true,
  get: function get() {
    return _state_sync.StartSyncStateFnType;
  }
});
Object.defineProperty(exports, "StopSyncStateFnType", {
  enumerable: true,
  get: function get() {
    return _state_sync.StopSyncStateFnType;
  }
});
Object.defineProperty(exports, "removeQueryParam", {
  enumerable: true,
  get: function get() {
    return _history.removeQueryParam;
  }
});
Object.defineProperty(exports, "redirectWhenMissing", {
  enumerable: true,
  get: function get() {
    return _history.redirectWhenMissing;
  }
});
Object.defineProperty(exports, "ensureDefaultIndexPattern", {
  enumerable: true,
  get: function get() {
    return _history.ensureDefaultIndexPattern;
  }
});
Object.defineProperty(exports, "applyDiff", {
  enumerable: true,
  get: function get() {
    return _diff_object.applyDiff;
  }
});

var _common = require("../common");

var _core = require("./core");

Object.keys(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _core[key];
    }
  });
});

var _errors = require("./errors");

Object.keys(_errors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _errors[key];
    }
  });
});

var _field_mapping = require("./field_mapping");

Object.keys(_field_mapping).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _field_mapping[key];
    }
  });
});

var _field_wildcard = require("./field_wildcard");

Object.keys(_field_wildcard).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _field_wildcard[key];
    }
  });
});

var _parse = require("./parse");

Object.keys(_parse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _parse[key];
    }
  });
});

var _render_complete = require("./render_complete");

Object.keys(_render_complete).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _render_complete[key];
    }
  });
});

var _resize_checker = require("./resize_checker");

Object.keys(_resize_checker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _resize_checker[key];
    }
  });
});

var _state_containers = require("../common/state_containers");

Object.keys(_state_containers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _state_containers[key];
    }
  });
});

var _storage = require("./storage");

Object.keys(_storage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _storage[key];
    }
  });
});

var _hashed_item_store = require("./storage/hashed_item_store");

var _state_hash = require("./state_management/state_hash");

var _url = require("./state_management/url");

var _state_sync = require("./state_sync");

var _history = require("./history");

var _diff_object = require("./state_management/utils/diff_object");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** dummy plugin, we just want kibanaUtils to have its own bundle */
function plugin() {
  return new (
  /*#__PURE__*/
  function () {
    function KibanaUtilsPlugin() {
      _classCallCheck(this, KibanaUtilsPlugin);
    }

    _createClass(KibanaUtilsPlugin, [{
      key: "setup",
      value: function setup() {}
    }, {
      key: "start",
      value: function start() {}
    }]);

    return KibanaUtilsPlugin;
  }())();
}
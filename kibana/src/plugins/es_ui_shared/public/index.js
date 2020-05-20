"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "JsonEditor", {
  enumerable: true,
  get: function get() {
    return _json_editor.JsonEditor;
  }
});
Object.defineProperty(exports, "OnJsonEditorUpdateHandler", {
  enumerable: true,
  get: function get() {
    return _json_editor.OnJsonEditorUpdateHandler;
  }
});
Object.defineProperty(exports, "SendRequestConfig", {
  enumerable: true,
  get: function get() {
    return _np_ready_request.SendRequestConfig;
  }
});
Object.defineProperty(exports, "SendRequestResponse", {
  enumerable: true,
  get: function get() {
    return _np_ready_request.SendRequestResponse;
  }
});
Object.defineProperty(exports, "UseRequestConfig", {
  enumerable: true,
  get: function get() {
    return _np_ready_request.UseRequestConfig;
  }
});
Object.defineProperty(exports, "UseRequestResponse", {
  enumerable: true,
  get: function get() {
    return _np_ready_request.UseRequestResponse;
  }
});
Object.defineProperty(exports, "sendRequest", {
  enumerable: true,
  get: function get() {
    return _np_ready_request.sendRequest;
  }
});
Object.defineProperty(exports, "useRequest", {
  enumerable: true,
  get: function get() {
    return _np_ready_request.useRequest;
  }
});
Object.defineProperty(exports, "indices", {
  enumerable: true,
  get: function get() {
    return _indices.indices;
  }
});
Object.defineProperty(exports, "useUIAceKeyboardMode", {
  enumerable: true,
  get: function get() {
    return _use_ui_ace_keyboard_mode.useUIAceKeyboardMode;
  }
});

var _json_editor = require("./components/json_editor");

var _np_ready_request = require("./request/np_ready_request");

var _indices = require("./indices");

var _use_ui_ace_keyboard_mode = require("./use_ui_ace_keyboard_mode");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** dummy plugin, we just want esUiShared to have its own bundle */
function plugin() {
  return new (
  /*#__PURE__*/
  function () {
    function EsUiSharedPlugin() {
      _classCallCheck(this, EsUiSharedPlugin);
    }

    _createClass(EsUiSharedPlugin, [{
      key: "setup",
      value: function setup() {}
    }, {
      key: "start",
      value: function start() {}
    }]);

    return EsUiSharedPlugin;
  }())();
}
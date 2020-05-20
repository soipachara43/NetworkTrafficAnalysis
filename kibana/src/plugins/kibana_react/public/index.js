"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  ValidatedDualRange: true,
  Markdown: true,
  MarkdownSimple: true,
  reactToUiComponent: true,
  uiToReactComponent: true,
  useUrlTracker: true,
  toMountPoint: true
};
exports.plugin = plugin;
Object.defineProperty(exports, "ValidatedDualRange", {
  enumerable: true,
  get: function get() {
    return _validated_range.ValidatedDualRange;
  }
});
Object.defineProperty(exports, "Markdown", {
  enumerable: true,
  get: function get() {
    return _markdown.Markdown;
  }
});
Object.defineProperty(exports, "MarkdownSimple", {
  enumerable: true,
  get: function get() {
    return _markdown.MarkdownSimple;
  }
});
Object.defineProperty(exports, "reactToUiComponent", {
  enumerable: true,
  get: function get() {
    return _adapters.reactToUiComponent;
  }
});
Object.defineProperty(exports, "uiToReactComponent", {
  enumerable: true,
  get: function get() {
    return _adapters.uiToReactComponent;
  }
});
Object.defineProperty(exports, "useUrlTracker", {
  enumerable: true,
  get: function get() {
    return _use_url_tracker.useUrlTracker;
  }
});
Object.defineProperty(exports, "toMountPoint", {
  enumerable: true,
  get: function get() {
    return _util.toMountPoint;
  }
});

var _code_editor = require("./code_editor");

Object.keys(_code_editor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _code_editor[key];
    }
  });
});

var _exit_full_screen_button = require("./exit_full_screen_button");

Object.keys(_exit_full_screen_button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _exit_full_screen_button[key];
    }
  });
});

var _context = require("./context");

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _context[key];
    }
  });
});

var _overlays = require("./overlays");

Object.keys(_overlays).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _overlays[key];
    }
  });
});

var _ui_settings = require("./ui_settings");

Object.keys(_ui_settings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ui_settings[key];
    }
  });
});

var _field_icon = require("./field_icon");

Object.keys(_field_icon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _field_icon[key];
    }
  });
});

var _table_list_view = require("./table_list_view");

Object.keys(_table_list_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _table_list_view[key];
    }
  });
});

var _split_panel = require("./split_panel");

Object.keys(_split_panel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _split_panel[key];
    }
  });
});

var _validated_range = require("./validated_range");

var _notifications = require("./notifications");

Object.keys(_notifications).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _notifications[key];
    }
  });
});

var _markdown = require("./markdown");

var _adapters = require("./adapters");

var _use_url_tracker = require("./use_url_tracker");

var _util = require("./util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** dummy plugin, we just want kibanaReact to have its own bundle */
function plugin() {
  return new (
  /*#__PURE__*/
  function () {
    function KibanaReactPlugin() {
      _classCallCheck(this, KibanaReactPlugin);
    }

    _createClass(KibanaReactPlugin, [{
      key: "setup",
      value: function setup() {}
    }, {
      key: "start",
      value: function start() {}
    }]);

    return KibanaReactPlugin;
  }())();
}
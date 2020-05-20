"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "injectDefaultVars", {
  enumerable: true,
  get: function () {
    return _modify_injected_vars.injectDefaultVars;
  }
});
Object.defineProperty(exports, "replaceInjectedVars", {
  enumerable: true,
  get: function () {
    return _modify_injected_vars.replaceInjectedVars;
  }
});
Object.defineProperty(exports, "mappings", {
  enumerable: true,
  get: function () {
    return _saved_object.mappings;
  }
});
Object.defineProperty(exports, "migrations", {
  enumerable: true,
  get: function () {
    return _saved_object.migrations;
  }
});
Object.defineProperty(exports, "savedObjectSchemas", {
  enumerable: true,
  get: function () {
    return _saved_object.savedObjectSchemas;
  }
});
Object.defineProperty(exports, "savedObjectsManagement", {
  enumerable: true,
  get: function () {
    return _saved_object.savedObjectsManagement;
  }
});
Object.defineProperty(exports, "validations", {
  enumerable: true,
  get: function () {
    return _saved_object.validations;
  }
});
Object.defineProperty(exports, "taskDefinitions", {
  enumerable: true,
  get: function () {
    return _task_definitions.taskDefinitions;
  }
});
Object.defineProperty(exports, "app", {
  enumerable: true,
  get: function () {
    return _ui_apps.app;
  }
});
Object.defineProperty(exports, "apps", {
  enumerable: true,
  get: function () {
    return _ui_apps.apps;
  }
});
Object.defineProperty(exports, "visTypes", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.visTypes;
  }
});
Object.defineProperty(exports, "visEditorTypes", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.visEditorTypes;
  }
});
Object.defineProperty(exports, "interpreter", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.interpreter;
  }
});
Object.defineProperty(exports, "savedObjectTypes", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.savedObjectTypes;
  }
});
Object.defineProperty(exports, "embeddableActions", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.embeddableActions;
  }
});
Object.defineProperty(exports, "embeddableFactories", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.embeddableFactories;
  }
});
Object.defineProperty(exports, "fieldFormats", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.fieldFormats;
  }
});
Object.defineProperty(exports, "fieldFormatEditors", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.fieldFormatEditors;
  }
});
Object.defineProperty(exports, "inspectorViews", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.inspectorViews;
  }
});
Object.defineProperty(exports, "chromeNavControls", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.chromeNavControls;
  }
});
Object.defineProperty(exports, "navbarExtensions", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.navbarExtensions;
  }
});
Object.defineProperty(exports, "contextMenuActions", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.contextMenuActions;
  }
});
Object.defineProperty(exports, "managementSections", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.managementSections;
  }
});
Object.defineProperty(exports, "indexManagement", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.indexManagement;
  }
});
Object.defineProperty(exports, "devTools", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.devTools;
  }
});
Object.defineProperty(exports, "docViews", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.docViews;
  }
});
Object.defineProperty(exports, "hacks", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.hacks;
  }
});
Object.defineProperty(exports, "home", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.home;
  }
});
Object.defineProperty(exports, "canvas", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.canvas;
  }
});
Object.defineProperty(exports, "visTypeEnhancers", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.visTypeEnhancers;
  }
});
Object.defineProperty(exports, "aliases", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.aliases;
  }
});
Object.defineProperty(exports, "visualize", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.visualize;
  }
});
Object.defineProperty(exports, "search", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.search;
  }
});
Object.defineProperty(exports, "shareContextMenuExtensions", {
  enumerable: true,
  get: function () {
    return _ui_app_extensions.shareContextMenuExtensions;
  }
});
Object.defineProperty(exports, "link", {
  enumerable: true,
  get: function () {
    return _ui_nav_links.link;
  }
});
Object.defineProperty(exports, "links", {
  enumerable: true,
  get: function () {
    return _ui_nav_links.links;
  }
});
Object.defineProperty(exports, "styleSheetPaths", {
  enumerable: true,
  get: function () {
    return _style_sheet_paths.styleSheetPaths;
  }
});
Object.defineProperty(exports, "uiSettingDefaults", {
  enumerable: true,
  get: function () {
    return _ui_settings.uiSettingDefaults;
  }
});
Object.defineProperty(exports, "unknown", {
  enumerable: true,
  get: function () {
    return _unknown.unknown;
  }
});
Object.defineProperty(exports, "noParse", {
  enumerable: true,
  get: function () {
    return _webpack_customizations.noParse;
  }
});
Object.defineProperty(exports, "__globalImportAliases__", {
  enumerable: true,
  get: function () {
    return _webpack_customizations.__globalImportAliases__;
  }
});
Object.defineProperty(exports, "__bundleProvider__", {
  enumerable: true,
  get: function () {
    return _webpack_customizations.__bundleProvider__;
  }
});
Object.defineProperty(exports, "__webpackPluginProvider__", {
  enumerable: true,
  get: function () {
    return _webpack_customizations.__webpackPluginProvider__;
  }
});

var _modify_injected_vars = require("./modify_injected_vars");

var _saved_object = require("./saved_object");

var _task_definitions = require("./task_definitions");

var _ui_apps = require("./ui_apps");

var _ui_app_extensions = require("./ui_app_extensions");

var _ui_nav_links = require("./ui_nav_links");

var _style_sheet_paths = require("./style_sheet_paths");

var _ui_settings = require("./ui_settings");

var _unknown = require("./unknown");

var _webpack_customizations = require("./webpack_customizations");
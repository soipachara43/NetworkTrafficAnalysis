"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentRegistry = void 0;

var _page_title = require("./page_title");

var _page_subtitle = require("./page_subtitle");

var _page_footer = require("./page_footer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var componentType = {
  PAGE_TITLE_COMPONENT: 'advanced_settings_page_title',
  PAGE_SUBTITLE_COMPONENT: 'advanced_settings_page_subtitle',
  PAGE_FOOTER_COMPONENT: 'advanced_settings_page_footer'
};

var ComponentRegistry =
/*#__PURE__*/
function () {
  function ComponentRegistry() {
    _classCallCheck(this, ComponentRegistry);

    _defineProperty(this, "registry", {});

    _defineProperty(this, "setup", {
      componentType: ComponentRegistry.componentType,
      register: this.register.bind(this)
    });

    _defineProperty(this, "start", {
      componentType: ComponentRegistry.componentType,
      get: this.get.bind(this)
    });
  }

  _createClass(ComponentRegistry, [{
    key: "register",

    /**
     * Attempts to register the provided component, with the ability to optionally allow
     * the component to override an existing one.
     *
     * If the intent is to override, then `allowOverride` must be set to true, otherwise an exception is thrown.
     *
     * @param {*} id the id of the component to register
     * @param {*} component the component
     * @param {*} allowOverride (default: false) - optional flag to allow this component to override a previously registered component
     */
    value: function register(id, component) {
      var allowOverride = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!allowOverride && id in this.registry) {
        throw new Error("Component with id ".concat(id, " is already registered."));
      } // Setting a display name if one does not already exist.
      // This enhances the snapshots, as well as the debugging experience.


      if (!component.displayName) {
        component.displayName = id;
      }

      this.registry[id] = component;
    }
    /**
     * Retrieve a registered component by its ID.
     * If the component does not exist, then an exception is thrown.
     *
     * @param {*} id the ID of the component to retrieve
     */

  }, {
    key: "get",
    value: function get(id) {
      return this.registry[id] || ComponentRegistry.defaultRegistry[id];
    }
  }]);

  return ComponentRegistry;
}();

exports.ComponentRegistry = ComponentRegistry;

_defineProperty(ComponentRegistry, "componentType", componentType);

_defineProperty(ComponentRegistry, "defaultRegistry", {
  advanced_settings_page_title: _page_title.PageTitle,
  advanced_settings_page_subtitle: _page_subtitle.PageSubtitle,
  advanced_settings_page_footer: _page_footer.PageFooter
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSettingsService = void 0;

var _operators = require("rxjs/operators");

var _ui_settings_config = require("./ui_settings_config");

var _ui_settings_client = require("./ui_settings_client");

var _utils = require("../../utils/");

var _saved_objects = require("./saved_objects");

var _routes = require("./routes");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
class UiSettingsService {
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "config$", void 0);

    _defineProperty(this, "uiSettingsDefaults", new Map());

    _defineProperty(this, "overrides", {});

    this.log = coreContext.logger.get('ui-settings-service');
    this.config$ = coreContext.configService.atPath(_ui_settings_config.config.path);
  }

  async setup({
    http,
    savedObjects
  }) {
    this.log.debug('Setting up ui settings service');
    savedObjects.registerType(_saved_objects.uiSettingsType);
    (0, _routes.registerRoutes)(http.createRouter(''));
    const config = await this.config$.pipe((0, _operators.first)()).toPromise();
    this.overrides = config.overrides;
    return {
      register: this.register.bind(this),
      asScopedToClient: this.getScopedClientFactory()
    };
  }

  async start() {
    this.validatesDefinitions();
    this.validatesOverrides();
    return {
      asScopedToClient: this.getScopedClientFactory()
    };
  }

  async stop() {}

  getScopedClientFactory() {
    const {
      version,
      buildNum
    } = this.coreContext.env.packageInfo;
    return savedObjectsClient => new _ui_settings_client.UiSettingsClient({
      type: 'config',
      id: version,
      buildNum,
      savedObjectsClient,
      defaults: (0, _utils.mapToObject)(this.uiSettingsDefaults),
      overrides: this.overrides,
      log: this.log
    });
  }

  register(settings = {}) {
    Object.entries(settings).forEach(([key, value]) => {
      if (this.uiSettingsDefaults.has(key)) {
        throw new Error(`uiSettings for the key [${key}] has been already registered`);
      }

      this.uiSettingsDefaults.set(key, value);
    });
  }

  validatesDefinitions() {
    for (const [key, definition] of this.uiSettingsDefaults) {
      if (definition.schema) {
        definition.schema.validate(definition.value, {}, `ui settings defaults [${key}]`);
      }
    }
  }

  validatesOverrides() {
    for (const [key, value] of Object.entries(this.overrides)) {
      const definition = this.uiSettingsDefaults.get(key);

      if (definition === null || definition === void 0 ? void 0 : definition.schema) {
        definition.schema.validate(value, {}, `ui settings overrides [${key}]`);
      }
    }
  }

}

exports.UiSettingsService = UiSettingsService;
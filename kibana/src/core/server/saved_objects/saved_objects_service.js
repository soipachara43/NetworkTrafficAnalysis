"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsService = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _ = require("./");

var _migrations = require("./migrations");

var _retry_call_cluster = require("../elasticsearch/retry_call_cluster");

var _saved_objects_config = require("./saved_objects_config");

var _repository = require("./service/lib/repository");

var _utils = require("./utils");

var _saved_objects_type_registry = require("./saved_objects_type_registry");

var _serialization = require("./serialization");

var _routes = require("./routes");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SavedObjectsService {
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "setupDeps", void 0);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "clientFactoryProvider", void 0);

    _defineProperty(this, "clientFactoryWrappers", []);

    _defineProperty(this, "migrator$", new _rxjs.Subject());

    _defineProperty(this, "typeRegistry", new _saved_objects_type_registry.SavedObjectTypeRegistry());

    _defineProperty(this, "validations", {});

    _defineProperty(this, "started", false);

    this.logger = coreContext.logger.get('savedobjects-service');
  }

  async setup(setupDeps) {
    this.logger.debug('Setting up SavedObjects service');
    this.setupDeps = setupDeps;
    const legacyTypes = (0, _utils.convertLegacyTypes)(setupDeps.legacyPlugins.uiExports, setupDeps.legacyPlugins.pluginExtendedConfig);
    legacyTypes.forEach(type => this.typeRegistry.registerType(type));
    this.validations = setupDeps.legacyPlugins.uiExports.savedObjectValidations || {};
    const savedObjectsConfig = await this.coreContext.configService.atPath('savedObjects').pipe((0, _operators.first)()).toPromise();
    const savedObjectsMigrationConfig = await this.coreContext.configService.atPath('migrations').pipe((0, _operators.first)()).toPromise();
    this.config = new _saved_objects_config.SavedObjectConfig(savedObjectsConfig, savedObjectsMigrationConfig);
    (0, _routes.registerRoutes)({
      http: setupDeps.http,
      logger: this.logger,
      config: this.config,
      migratorPromise: this.migrator$.pipe((0, _operators.first)()).toPromise()
    });
    return {
      setClientFactoryProvider: provider => {
        if (this.started) {
          throw new Error('cannot call `setClientFactoryProvider` after service startup.');
        }

        if (this.clientFactoryProvider) {
          throw new Error('custom client factory is already set, and can only be set once');
        }

        this.clientFactoryProvider = provider;
      },
      addClientWrapper: (priority, id, factory) => {
        if (this.started) {
          throw new Error('cannot call `addClientWrapper` after service startup.');
        }

        this.clientFactoryWrappers.push({
          priority,
          id,
          factory
        });
      },
      registerType: type => {
        if (this.started) {
          throw new Error('cannot call `registerType` after service startup.');
        }

        this.typeRegistry.registerType(type);
      },
      getImportExportObjectLimit: () => this.config.maxImportExportSize
    };
  }

  async start({
    pluginsInitialized = true
  }, migrationsRetryDelay) {
    if (!this.setupDeps || !this.config) {
      throw new Error('#setup() needs to be run first');
    }

    this.logger.debug('Starting SavedObjects service');
    const kibanaConfig = await this.coreContext.configService.atPath('kibana').pipe((0, _operators.first)()).toPromise();
    const adminClient = this.setupDeps.elasticsearch.adminClient;
    const migrator = this.createMigrator(kibanaConfig, this.config.migration, migrationsRetryDelay);
    this.migrator$.next(migrator);
    /**
     * Note: We want to ensure that migrations have completed before
     * continuing with further Core start steps that might use SavedObjects
     * such as running the legacy server, legacy plugins and allowing incoming
     * HTTP requests.
     *
     * However, our build system optimize step and some tests depend on the
     * HTTP server running without an Elasticsearch server being available.
     * So, when the `migrations.skip` is true, we skip migrations altogether.
     *
     * We also cannot safely run migrations if plugins are not initialized since
     * not plugin migrations won't be registered.
     */

    const skipMigrations = this.config.migration.skip || !pluginsInitialized;

    if (skipMigrations) {
      this.logger.warn('Skipping Saved Object migrations on startup. Note: Individual documents will still be migrated when read or written.');
    } else {
      this.logger.info('Waiting until all Elasticsearch nodes are compatible with Kibana before starting saved objects migrations...'); // TODO: Move to Status Service https://github.com/elastic/kibana/issues/41983

      this.setupDeps.elasticsearch.esNodesCompatibility$.subscribe(({
        isCompatible,
        message
      }) => {
        if (!isCompatible && message) {
          this.logger.error(message);
        }
      });
      await this.setupDeps.elasticsearch.esNodesCompatibility$.pipe((0, _operators.filter)(nodes => nodes.isCompatible), (0, _operators.take)(1)).toPromise();
      this.logger.info('Starting saved objects migrations');
      await migrator.runMigrations();
    }

    const createRepository = (callCluster, extraTypes = []) => {
      return _repository.SavedObjectsRepository.createRepository(migrator, this.typeRegistry, kibanaConfig.index, callCluster, extraTypes);
    };

    const repositoryFactory = {
      createInternalRepository: extraTypes => createRepository(adminClient.callAsInternalUser, extraTypes),
      createScopedRepository: (req, extraTypes) => createRepository(adminClient.asScoped(req).callAsCurrentUser, extraTypes)
    };
    const clientProvider = new _.SavedObjectsClientProvider({
      defaultClientFactory({
        request
      }) {
        const repository = repositoryFactory.createScopedRepository(request);
        return new _.SavedObjectsClient(repository);
      },

      typeRegistry: this.typeRegistry
    });

    if (this.clientFactoryProvider) {
      const clientFactory = this.clientFactoryProvider(repositoryFactory);
      clientProvider.setClientFactory(clientFactory);
    }

    this.clientFactoryWrappers.forEach(({
      id,
      factory,
      priority
    }) => {
      clientProvider.addClientWrapperFactory(priority, id, factory);
    });
    this.started = true;
    return {
      migrator,
      clientProvider,
      getScopedClient: clientProvider.getClient.bind(clientProvider),
      createScopedRepository: repositoryFactory.createScopedRepository,
      createInternalRepository: repositoryFactory.createInternalRepository,
      createSerializer: () => new _serialization.SavedObjectsSerializer(this.typeRegistry),
      getTypeRegistry: () => this.typeRegistry
    };
  }

  async stop() {}

  createMigrator(kibanaConfig, savedObjectsConfig, migrationsRetryDelay) {
    const adminClient = this.setupDeps.elasticsearch.adminClient;
    return new _migrations.KibanaMigrator({
      typeRegistry: this.typeRegistry,
      logger: this.logger,
      kibanaVersion: this.coreContext.env.packageInfo.version,
      savedObjectsConfig,
      savedObjectValidations: this.validations,
      kibanaConfig,
      callCluster: (0, _retry_call_cluster.migrationsRetryCallCluster)(adminClient.callAsInternalUser, this.logger, migrationsRetryDelay)
    });
  }

}

exports.SavedObjectsService = SavedObjectsService;
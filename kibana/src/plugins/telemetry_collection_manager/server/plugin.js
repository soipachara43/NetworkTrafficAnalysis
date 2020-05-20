"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelemetryCollectionManagerPlugin = void 0;

var _encryption = require("./encryption");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TelemetryCollectionManagerPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "collections", []);

    _defineProperty(this, "usageGetterMethodPriority", -1);

    _defineProperty(this, "usageCollection", void 0);

    _defineProperty(this, "isDev", void 0);

    _defineProperty(this, "version", void 0);

    _defineProperty(this, "getOptInStatsForCollection", async (collection, optInStatus, statsCollectionConfig) => {
      const context = {
        logger: this.logger.get(collection.title),
        isDev: this.isDev,
        version: this.version,
        ...collection.customContext
      };
      const clustersDetails = await collection.clusterDetailsGetter(statsCollectionConfig, context);
      return clustersDetails.map(({
        clusterUuid
      }) => ({
        cluster_uuid: clusterUuid,
        opt_in_status: optInStatus
      }));
    });

    this.logger = initializerContext.logger.get();
    this.isDev = initializerContext.env.mode.dev;
    this.version = initializerContext.env.packageInfo.version;
  }

  setup(core, {
    usageCollection
  }) {
    this.usageCollection = usageCollection;
    return {
      setCollection: this.setCollection.bind(this),
      getOptInStats: this.getOptInStats.bind(this),
      getStats: this.getStats.bind(this)
    };
  }

  start(core) {
    return {
      setCollection: this.setCollection.bind(this),
      getOptInStats: this.getOptInStats.bind(this),
      getStats: this.getStats.bind(this)
    };
  }

  stop() {}

  setCollection(collectionConfig) {
    const {
      title,
      priority,
      esCluster,
      statsGetter,
      clusterDetailsGetter,
      licenseGetter
    } = collectionConfig;

    if (typeof priority !== 'number') {
      throw new Error('priority must be set.');
    }

    if (priority === this.usageGetterMethodPriority) {
      throw new Error(`A Usage Getter with the same priority is already set.`);
    }

    if (priority > this.usageGetterMethodPriority) {
      if (!statsGetter) {
        throw Error('Stats getter method not set.');
      }

      if (!esCluster) {
        throw Error('esCluster name must be set for the getCluster method.');
      }

      if (!clusterDetailsGetter) {
        throw Error('Cluster UUIds method is not set.');
      }

      if (!licenseGetter) {
        throw Error('License getter method not set.');
      }

      this.collections.unshift({
        licenseGetter,
        statsGetter,
        clusterDetailsGetter,
        esCluster,
        title
      });
      this.usageGetterMethodPriority = priority;
    }
  }

  getStatsCollectionConfig(config, collection, usageCollection) {
    const {
      start,
      end,
      request
    } = config;
    const callCluster = config.unencrypted ? collection.esCluster.asScoped(request).callAsCurrentUser : collection.esCluster.callAsInternalUser;
    return {
      callCluster,
      start,
      end,
      usageCollection
    };
  }

  async getOptInStats(optInStatus, config) {
    if (!this.usageCollection) {
      return [];
    }

    for (const collection of this.collections) {
      const statsCollectionConfig = this.getStatsCollectionConfig(config, collection, this.usageCollection);

      try {
        const optInStats = await this.getOptInStatsForCollection(collection, optInStatus, statsCollectionConfig);

        if (optInStats && optInStats.length) {
          this.logger.debug(`Got Opt In stats using ${collection.title} collection.`);

          if (config.unencrypted) {
            return optInStats;
          }

          return (0, _encryption.encryptTelemetry)(optInStats, this.isDev);
        }
      } catch (err) {
        this.logger.debug(`Failed to collect any opt in stats with registered collections.`); // swallow error to try next collection;
      }
    }

    return [];
  }

  async getStats(config) {
    if (!this.usageCollection) {
      return [];
    }

    for (const collection of this.collections) {
      const statsCollectionConfig = this.getStatsCollectionConfig(config, collection, this.usageCollection);

      try {
        const usageData = await this.getUsageForCollection(collection, statsCollectionConfig);

        if (usageData.length) {
          this.logger.debug(`Got Usage using ${collection.title} collection.`);

          if (config.unencrypted) {
            return usageData;
          }

          return (0, _encryption.encryptTelemetry)(usageData, this.isDev);
        }
      } catch (err) {
        this.logger.debug(`Failed to collect any usage with registered collection ${collection.title}.`); // swallow error to try next collection;
      }
    }

    return [];
  }

  async getUsageForCollection(collection, statsCollectionConfig) {
    const context = {
      logger: this.logger.get(collection.title),
      isDev: this.isDev,
      version: this.version,
      ...collection.customContext
    };
    const clustersDetails = await collection.clusterDetailsGetter(statsCollectionConfig, context);

    if (clustersDetails.length === 0) {
      // don't bother doing a further lookup, try next collection.
      return [];
    }

    const [stats, licenses] = await Promise.all([collection.statsGetter(clustersDetails, statsCollectionConfig, context), collection.licenseGetter(clustersDetails, statsCollectionConfig, context)]);
    return stats.map(stat => {
      const license = licenses[stat.cluster_uuid];
      return { ...(license ? {
          license
        } : {}),
        ...stat,
        collectionSource: collection.title
      };
    });
  }

}

exports.TelemetryCollectionManagerPlugin = TelemetryCollectionManagerPlugin;
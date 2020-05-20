"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FetcherTask = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _operators = require("rxjs/operators");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _server = require("../../../core/server");

var _telemetry_config = require("../common/telemetry_config");

var _telemetry_repository = require("./telemetry_repository");

var _constants = require("../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FetcherTask {
  constructor(initializerContext) {
    _defineProperty(this, "initialCheckDelayMs", 60 * 1000 * 5);

    _defineProperty(this, "checkIntervalMs", 60 * 1000 * 60 * 12);

    _defineProperty(this, "config$", void 0);

    _defineProperty(this, "currentKibanaVersion", void 0);

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "intervalId", void 0);

    _defineProperty(this, "lastReported", void 0);

    _defineProperty(this, "isSending", false);

    _defineProperty(this, "internalRepository", void 0);

    _defineProperty(this, "telemetryCollectionManager", void 0);

    _defineProperty(this, "elasticsearchClient", void 0);

    this.config$ = initializerContext.config.create();
    this.currentKibanaVersion = initializerContext.env.packageInfo.version;
    this.logger = initializerContext.logger.get('fetcher');
  }

  start({
    savedObjects,
    elasticsearch
  }, {
    telemetryCollectionManager
  }) {
    this.internalRepository = new _server.SavedObjectsClient(savedObjects.createInternalRepository());
    this.telemetryCollectionManager = telemetryCollectionManager;
    this.elasticsearchClient = elasticsearch.legacy.createClient('telemetry-fetcher');
    setTimeout(() => {
      this.sendIfDue();
      this.intervalId = setInterval(() => this.sendIfDue(), this.checkIntervalMs);
    }, this.initialCheckDelayMs);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.elasticsearchClient) {
      this.elasticsearchClient.close();
    }
  }

  async sendIfDue() {
    if (this.isSending) {
      return;
    }

    const telemetryConfig = await this.getCurrentConfigs();

    if (!this.shouldSendReport(telemetryConfig)) {
      return;
    }

    try {
      this.isSending = true;
      const clusters = await this.fetchTelemetry();
      const {
        telemetryUrl
      } = telemetryConfig;

      for (const cluster of clusters) {
        await this.sendTelemetry(telemetryUrl, cluster);
      }

      await this.updateLastReported();
    } catch (err) {
      await this.updateReportFailure(telemetryConfig);
      this.logger.warn(`Error sending telemetry usage data: ${err}`);
    }

    this.isSending = false;
  }

  async getCurrentConfigs() {
    const telemetrySavedObject = await (0, _telemetry_repository.getTelemetrySavedObject)(this.internalRepository);
    const config = await this.config$.pipe((0, _operators.take)(1)).toPromise();
    const currentKibanaVersion = this.currentKibanaVersion;
    const configTelemetrySendUsageFrom = config.sendUsageFrom;
    const allowChangingOptInStatus = config.allowChangingOptInStatus;
    const configTelemetryOptIn = typeof config.optIn === 'undefined' ? null : config.optIn;
    const telemetryUrl = config.url;
    const {
      failureCount,
      failureVersion
    } = (0, _telemetry_config.getTelemetryFailureDetails)({
      telemetrySavedObject
    });
    return {
      telemetryOptIn: (0, _telemetry_config.getTelemetryOptIn)({
        currentKibanaVersion,
        telemetrySavedObject,
        allowChangingOptInStatus,
        configTelemetryOptIn
      }),
      telemetrySendUsageFrom: (0, _telemetry_config.getTelemetrySendUsageFrom)({
        telemetrySavedObject,
        configTelemetrySendUsageFrom
      }),
      telemetryUrl,
      failureCount,
      failureVersion
    };
  }

  async updateLastReported() {
    this.lastReported = Date.now();
    (0, _telemetry_repository.updateTelemetrySavedObject)(this.internalRepository, {
      reportFailureCount: 0,
      lastReported: this.lastReported
    });
  }

  async updateReportFailure({
    failureCount
  }) {
    (0, _telemetry_repository.updateTelemetrySavedObject)(this.internalRepository, {
      reportFailureCount: failureCount + 1,
      reportFailureVersion: this.currentKibanaVersion
    });
  }

  shouldSendReport({
    telemetryOptIn,
    telemetrySendUsageFrom,
    reportFailureCount,
    currentVersion,
    reportFailureVersion
  }) {
    if (reportFailureCount > 2 && reportFailureVersion === currentVersion) {
      return false;
    }

    if (telemetryOptIn && telemetrySendUsageFrom === 'server') {
      if (!this.lastReported || Date.now() - this.lastReported > _constants.REPORT_INTERVAL_MS) {
        return true;
      }
    }

    return false;
  }

  async fetchTelemetry() {
    return await this.telemetryCollectionManager.getStats({
      unencrypted: false,
      start: (0, _moment.default)().subtract(20, 'minutes').toISOString(),
      end: (0, _moment.default)().toISOString()
    });
  }

  async sendTelemetry(url, cluster) {
    this.logger.debug(`Sending usage stats.`);
    /**
     * send OPTIONS before sending usage data.
     * OPTIONS is less intrusive as it does not contain any payload and is used here to check if the endpoint is reachable.
     */

    await (0, _nodeFetch.default)(url, {
      method: 'options'
    });
    await (0, _nodeFetch.default)(url, {
      method: 'post',
      body: cluster
    });
  }

}

exports.FetcherTask = FetcherTask;
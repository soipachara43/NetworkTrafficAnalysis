"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsService = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _ops_metrics_collector = require("./ops_metrics_collector");

var _ops_config = require("./ops_config");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
class MetricsService {
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "metricsCollector", void 0);

    _defineProperty(this, "collectInterval", void 0);

    _defineProperty(this, "metrics$", new _rxjs.Subject());

    this.logger = coreContext.logger.get('metrics');
  }

  async setup({
    http
  }) {
    this.metricsCollector = new _ops_metrics_collector.OpsMetricsCollector(http.server);
    const metricsObservable = this.metrics$.asObservable();
    return {
      getOpsMetrics$: () => metricsObservable
    };
  }

  async start() {
    if (!this.metricsCollector) {
      throw new Error('#setup() needs to be run first');
    }

    const config = await this.coreContext.configService.atPath(_ops_config.opsConfig.path).pipe((0, _operators.first)()).toPromise();
    await this.refreshMetrics();
    this.collectInterval = setInterval(() => {
      this.refreshMetrics();
    }, config.interval.asMilliseconds());
    return {};
  }

  async refreshMetrics() {
    this.logger.debug('Refreshing metrics');
    const metrics = await this.metricsCollector.collect();
    this.metricsCollector.reset();
    this.metrics$.next(metrics);
  }

  async stop() {
    if (this.collectInterval) {
      clearInterval(this.collectInterval);
    }

    this.metrics$.complete();
  }

}

exports.MetricsService = MetricsService;
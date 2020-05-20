"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BfetchServerPlugin = void 0;

var _configSchema = require("@kbn/config-schema");

var _rxjs = require("rxjs");

var _common = require("../common");

var _streaming = require("./streaming");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BfetchServerPlugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "addStreamingResponseRoute", ({
      router,
      logger
    }) => (path, handler) => {
      router.post({
        path: `/${(0, _common.removeLeadingSlash)(path)}`,
        validate: {
          body: _configSchema.schema.any()
        }
      }, async (context, request, response) => {
        const handlerInstance = handler(request);
        const data = request.body;
        const headers = {
          'Content-Type': 'application/x-ndjson',
          Connection: 'keep-alive',
          'Transfer-Encoding': 'chunked',
          'Cache-Control': 'no-cache'
        };
        return response.ok({
          headers,
          body: (0, _streaming.createNDJSONStream)(data, handlerInstance, logger)
        });
      });
    });

    _defineProperty(this, "addBatchProcessingRoute", addStreamingResponseRoute => (path, handler) => {
      addStreamingResponseRoute(path, request => {
        const handlerInstance = handler(request);
        return {
          getResponseStream: ({
            batch
          }) => {
            const subject = new _rxjs.Subject();
            let cnt = batch.length;
            batch.forEach(async (batchItem, id) => {
              try {
                const result = await handlerInstance.onBatchItem(batchItem);
                subject.next({
                  id,
                  result
                });
              } catch (err) {
                const error = (0, _common.normalizeError)(err);
                subject.next({
                  id,
                  error
                });
              } finally {
                cnt--;
                if (!cnt) subject.complete();
              }
            });
            return subject;
          }
        };
      });
    });
  }

  setup(core, plugins) {
    const logger = this.initializerContext.logger.get();
    const router = core.http.createRouter();
    const addStreamingResponseRoute = this.addStreamingResponseRoute({
      router,
      logger
    });
    const addBatchProcessingRoute = this.addBatchProcessingRoute(addStreamingResponseRoute);
    return {
      addBatchProcessingRoute,
      addStreamingResponseRoute
    };
  }

  start(core, plugins) {
    return {};
  }

  stop() {}

}

exports.BfetchServerPlugin = BfetchServerPlugin;
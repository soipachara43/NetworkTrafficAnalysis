"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createErrorGroupWatch = createErrorGroupWatch;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _url = _interopRequireDefault(require("url"));

var _uuid = _interopRequireDefault(require("uuid"));

var _elasticsearch_fieldnames = require("../../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _watcher = require("../../../../services/rest/watcher");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getSlackPathUrl(slackUrl) {
  if (slackUrl) {
    var _url$parse = _url.default.parse(slackUrl),
        path = _url$parse.path;

    return path;
  }
}

function createErrorGroupWatch(_x) {
  return _createErrorGroupWatch.apply(this, arguments);
}

function _createErrorGroupWatch() {
  _createErrorGroupWatch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var http, _ref$emails, emails, schedule, serviceName, slackUrl, threshold, timeRange, apmIndexPatternTitle, id, slackUrlPath, emailTemplate, slackTemplate, actions, body;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            http = _ref.http, _ref$emails = _ref.emails, emails = _ref$emails === void 0 ? [] : _ref$emails, schedule = _ref.schedule, serviceName = _ref.serviceName, slackUrl = _ref.slackUrl, threshold = _ref.threshold, timeRange = _ref.timeRange, apmIndexPatternTitle = _ref.apmIndexPatternTitle;
            id = "apm-".concat(_uuid.default.v4());
            slackUrlPath = getSlackPathUrl(slackUrl);
            emailTemplate = _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.emailTemplateText', {
              defaultMessage: 'Your service {serviceName} has error groups which exceeds {threshold} occurrences within {timeRange}{br}' + '{br}' + '{errorGroupsBuckets}{br}' + '{errorLogMessage}{br}' + '{errorCulprit}N/A{slashErrorCulprit}{br}' + '{docCountParam} occurrences{br}' + '{slashErrorGroupsBucket}',
              values: {
                serviceName: '"{{ctx.metadata.serviceName}}"',
                threshold: '{{ctx.metadata.threshold}}',
                timeRange: '"{{ctx.metadata.timeRangeValue}}{{ctx.metadata.timeRangeUnit}}"',
                errorGroupsBuckets: '{{#ctx.payload.aggregations.error_groups.buckets}}',
                errorLogMessage: '<strong>{{sample.hits.hits.0._source.error.log.message}}{{^sample.hits.hits.0._source.error.log.message}}{{sample.hits.hits.0._source.error.exception.0.message}}{{/sample.hits.hits.0._source.error.log.message}}</strong>',
                errorCulprit: '{{sample.hits.hits.0._source.error.culprit}}{{^sample.hits.hits.0._source.error.culprit}}',
                slashErrorCulprit: '{{/sample.hits.hits.0._source.error.culprit}}',
                docCountParam: '{{doc_count}}',
                slashErrorGroupsBucket: '{{/ctx.payload.aggregations.error_groups.buckets}}',
                br: '<br/>'
              }
            });
            slackTemplate = _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.slackTemplateText', {
              defaultMessage: "Your service {serviceName} has error groups which exceeds {threshold} occurrences within {timeRange}\n{errorGroupsBuckets}\n{errorLogMessage}\n{errorCulprit}N/A{slashErrorCulprit}\n{docCountParam} occurrences\n{slashErrorGroupsBucket}",
              values: {
                serviceName: '"{{ctx.metadata.serviceName}}"',
                threshold: '{{ctx.metadata.threshold}}',
                timeRange: '"{{ctx.metadata.timeRangeValue}}{{ctx.metadata.timeRangeUnit}}"',
                errorGroupsBuckets: '{{#ctx.payload.aggregations.error_groups.buckets}}',
                errorLogMessage: '>*{{sample.hits.hits.0._source.error.log.message}}{{^sample.hits.hits.0._source.error.log.message}}{{sample.hits.hits.0._source.error.exception.0.message}}{{/sample.hits.hits.0._source.error.log.message}}*',
                errorCulprit: '>{{#sample.hits.hits.0._source.error.culprit}}`{{sample.hits.hits.0._source.error.culprit}}`{{/sample.hits.hits.0._source.error.culprit}}{{^sample.hits.hits.0._source.error.culprit}}',
                slashErrorCulprit: '{{/sample.hits.hits.0._source.error.culprit}}',
                docCountParam: '>{{doc_count}}',
                slashErrorGroupsBucket: '{{/ctx.payload.aggregations.error_groups.buckets}}'
              }
            });
            actions = {
              log_error: {
                logging: {
                  text: emailTemplate
                }
              }
            };
            body = {
              metadata: {
                emails: emails,
                trigger: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.triggerText', {
                  defaultMessage: 'This value must be changed in trigger section'
                }),
                serviceName: serviceName,
                threshold: threshold,
                timeRangeValue: timeRange.value,
                timeRangeUnit: timeRange.unit,
                slackUrlPath: slackUrlPath
              },
              trigger: {
                schedule: schedule
              },
              input: {
                search: {
                  request: {
                    indices: [apmIndexPatternTitle],
                    body: {
                      size: 0,
                      query: {
                        bool: {
                          filter: [{
                            term: _defineProperty({}, _elasticsearch_fieldnames.SERVICE_NAME, '{{ctx.metadata.serviceName}}')
                          }, {
                            term: _defineProperty({}, _elasticsearch_fieldnames.PROCESSOR_EVENT, 'error')
                          }, {
                            range: {
                              '@timestamp': {
                                gte: 'now-{{ctx.metadata.timeRangeValue}}{{ctx.metadata.timeRangeUnit}}'
                              }
                            }
                          }]
                        }
                      },
                      aggs: {
                        error_groups: {
                          terms: {
                            min_doc_count: '{{ctx.metadata.threshold}}',
                            field: _elasticsearch_fieldnames.ERROR_GROUP_ID,
                            size: 10,
                            order: {
                              _count: 'desc'
                            }
                          },
                          aggs: {
                            sample: {
                              top_hits: {
                                _source: [_elasticsearch_fieldnames.ERROR_LOG_MESSAGE, _elasticsearch_fieldnames.ERROR_EXC_MESSAGE, _elasticsearch_fieldnames.ERROR_EXC_HANDLED, _elasticsearch_fieldnames.ERROR_CULPRIT, _elasticsearch_fieldnames.ERROR_GROUP_ID, '@timestamp'],
                                sort: [{
                                  '@timestamp': 'desc'
                                }],
                                size: 1
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              condition: {
                script: {
                  source: 'return ctx.payload.aggregations.error_groups.buckets.length > 0'
                }
              },
              actions: actions
            };

            if (slackUrlPath) {
              body.actions.slack_webhook = {
                webhook: {
                  scheme: 'https',
                  host: 'hooks.slack.com',
                  port: 443,
                  method: 'POST',
                  path: '{{ctx.metadata.slackUrlPath}}',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: "__json__::".concat(JSON.stringify({
                    text: slackTemplate
                  }))
                }
              };
            }

            if (!(0, _lodash.isEmpty)(emails)) {
              body.actions.email = {
                email: {
                  to: '{{#join}}ctx.metadata.emails{{/join}}',
                  subject: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.emailSubjectText', {
                    defaultMessage: '{serviceName} has error groups which exceeds the threshold',
                    values: {
                      serviceName: '"{{ctx.metadata.serviceName}}"'
                    }
                  }),
                  body: {
                    html: emailTemplate
                  }
                }
              };
            }

            _context.next = 11;
            return (0, _watcher.createWatch)({
              http: http,
              id: id,
              watch: body
            });

          case 11:
            return _context.abrupt("return", id);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createErrorGroupWatch.apply(this, arguments);
}
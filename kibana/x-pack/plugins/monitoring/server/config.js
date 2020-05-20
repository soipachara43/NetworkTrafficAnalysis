"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const hostURISchema = _configSchema.schema.uri({
  scheme: ['http', 'https']
});

const DEFAULT_API_VERSION = 'master';

const configSchema = _configSchema.schema.object({
  enabled: _configSchema.schema.boolean({
    defaultValue: true
  }),
  elasticsearch: _configSchema.schema.object({
    logFetchCount: _configSchema.schema.number({
      defaultValue: 10
    }),
    sniffOnStart: _configSchema.schema.boolean({
      defaultValue: false
    }),
    sniffInterval: _configSchema.schema.oneOf([_configSchema.schema.duration(), _configSchema.schema.literal(false)], {
      defaultValue: false
    }),
    sniffOnConnectionFault: _configSchema.schema.boolean({
      defaultValue: false
    }),
    hosts: _configSchema.schema.maybe(_configSchema.schema.oneOf([hostURISchema, _configSchema.schema.arrayOf(hostURISchema, {
      minSize: 1
    })])),
    preserveHost: _configSchema.schema.boolean({
      defaultValue: true
    }),
    username: _configSchema.schema.maybe(_configSchema.schema.conditional(_configSchema.schema.contextRef('dist'), false, _configSchema.schema.string({
      validate: () => {}
    }), _configSchema.schema.string())),
    password: _configSchema.schema.maybe(_configSchema.schema.string()),
    requestHeadersWhitelist: _configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string())], {
      defaultValue: ['authorization']
    }),
    customHeaders: _configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.string(), {
      defaultValue: {}
    }),
    shardTimeout: _configSchema.schema.duration({
      defaultValue: '30s'
    }),
    requestTimeout: _configSchema.schema.duration({
      defaultValue: '30s'
    }),
    pingTimeout: _configSchema.schema.duration({
      defaultValue: _configSchema.schema.siblingRef('requestTimeout')
    }),
    startupTimeout: _configSchema.schema.duration({
      defaultValue: '5s'
    }),
    logQueries: _configSchema.schema.boolean({
      defaultValue: false
    }),
    ssl: _configSchema.schema.object({
      verificationMode: _configSchema.schema.oneOf([_configSchema.schema.literal('none'), _configSchema.schema.literal('certificate'), _configSchema.schema.literal('full')], {
        defaultValue: 'full'
      }),
      certificateAuthorities: _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string(), {
        minSize: 1
      })])),
      certificate: _configSchema.schema.maybe(_configSchema.schema.string()),
      key: _configSchema.schema.maybe(_configSchema.schema.string()),
      keyPassphrase: _configSchema.schema.maybe(_configSchema.schema.string()),
      keystore: _configSchema.schema.object({
        path: _configSchema.schema.maybe(_configSchema.schema.string()),
        password: _configSchema.schema.maybe(_configSchema.schema.string())
      }),
      truststore: _configSchema.schema.object({
        path: _configSchema.schema.maybe(_configSchema.schema.string()),
        password: _configSchema.schema.maybe(_configSchema.schema.string())
      }),
      alwaysPresentCertificate: _configSchema.schema.boolean({
        defaultValue: false
      })
    }, {
      validate: rawConfig => {
        if (rawConfig.key && rawConfig.keystore.path) {
          return 'cannot use [key] when [keystore.path] is specified';
        }

        if (rawConfig.certificate && rawConfig.keystore.path) {
          return 'cannot use [certificate] when [keystore.path] is specified';
        }
      }
    }),
    apiVersion: _configSchema.schema.string({
      defaultValue: DEFAULT_API_VERSION
    }),
    healthCheck: _configSchema.schema.object({
      delay: _configSchema.schema.duration({
        defaultValue: 2500
      })
    }),
    ignoreVersionMismatch: _configSchema.schema.conditional(_configSchema.schema.contextRef('dev'), false, _configSchema.schema.boolean({
      validate: rawValue => {
        if (rawValue === true) {
          return '"ignoreVersionMismatch" can only be set to true in development mode';
        }
      },
      defaultValue: false
    }), _configSchema.schema.boolean({
      defaultValue: false
    }))
  }),
  ui: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: true
    }),
    ccs: _configSchema.schema.object({
      enabled: _configSchema.schema.boolean({
        defaultValue: true
      })
    }),
    logs: _configSchema.schema.object({
      index: _configSchema.schema.string({
        defaultValue: 'filebeat-*'
      })
    }),
    max_bucket_size: _configSchema.schema.number({
      defaultValue: 10000
    }),
    elasticsearch: _configSchema.schema.object({
      logFetchCount: _configSchema.schema.number({
        defaultValue: 10
      }),
      sniffOnStart: _configSchema.schema.boolean({
        defaultValue: false
      }),
      sniffInterval: _configSchema.schema.oneOf([_configSchema.schema.duration(), _configSchema.schema.literal(false)], {
        defaultValue: false
      }),
      sniffOnConnectionFault: _configSchema.schema.boolean({
        defaultValue: false
      }),
      hosts: _configSchema.schema.maybe(_configSchema.schema.oneOf([hostURISchema, _configSchema.schema.arrayOf(hostURISchema, {
        minSize: 1
      })])),
      preserveHost: _configSchema.schema.boolean({
        defaultValue: true
      }),
      username: _configSchema.schema.maybe(_configSchema.schema.conditional(_configSchema.schema.contextRef('dist'), false, _configSchema.schema.string({
        validate: rawConfig => {
          if (rawConfig === 'elastic') {
            return 'value of "elastic" is forbidden. This is a superuser account that can obfuscate ' + 'privilege-related issues. You should use the "kibana" user instead.';
          }
        }
      }), _configSchema.schema.string())),
      password: _configSchema.schema.maybe(_configSchema.schema.string()),
      requestHeadersWhitelist: _configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string())], {
        defaultValue: ['authorization']
      }),
      customHeaders: _configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.string(), {
        defaultValue: {}
      }),
      shardTimeout: _configSchema.schema.duration({
        defaultValue: '30s'
      }),
      requestTimeout: _configSchema.schema.duration({
        defaultValue: '30s'
      }),
      pingTimeout: _configSchema.schema.duration({
        defaultValue: _configSchema.schema.siblingRef('requestTimeout')
      }),
      startupTimeout: _configSchema.schema.duration({
        defaultValue: '5s'
      }),
      logQueries: _configSchema.schema.boolean({
        defaultValue: false
      }),
      ssl: _configSchema.schema.object({
        verificationMode: _configSchema.schema.oneOf([_configSchema.schema.literal('none'), _configSchema.schema.literal('certificate'), _configSchema.schema.literal('full')], {
          defaultValue: 'full'
        }),
        certificateAuthorities: _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string(), {
          minSize: 1
        })])),
        certificate: _configSchema.schema.maybe(_configSchema.schema.string()),
        key: _configSchema.schema.maybe(_configSchema.schema.string()),
        keyPassphrase: _configSchema.schema.maybe(_configSchema.schema.string()),
        keystore: _configSchema.schema.object({
          path: _configSchema.schema.maybe(_configSchema.schema.string()),
          password: _configSchema.schema.maybe(_configSchema.schema.string())
        }),
        truststore: _configSchema.schema.object({
          path: _configSchema.schema.maybe(_configSchema.schema.string()),
          password: _configSchema.schema.maybe(_configSchema.schema.string())
        }),
        alwaysPresentCertificate: _configSchema.schema.boolean({
          defaultValue: false
        })
      }, {
        validate: rawConfig => {
          if (rawConfig.key && rawConfig.keystore.path) {
            return 'cannot use [key] when [keystore.path] is specified';
          }

          if (rawConfig.certificate && rawConfig.keystore.path) {
            return 'cannot use [certificate] when [keystore.path] is specified';
          }
        }
      }),
      apiVersion: _configSchema.schema.string({
        defaultValue: DEFAULT_API_VERSION
      }),
      healthCheck: _configSchema.schema.object({
        delay: _configSchema.schema.duration({
          defaultValue: 2500
        })
      }),
      ignoreVersionMismatch: _configSchema.schema.conditional(_configSchema.schema.contextRef('dev'), false, _configSchema.schema.boolean({
        validate: rawValue => {
          if (rawValue === true) {
            return '"ignoreVersionMismatch" can only be set to true in development mode';
          }
        },
        defaultValue: false
      }), _configSchema.schema.boolean({
        defaultValue: false
      }))
    }),
    container: _configSchema.schema.object({
      elasticsearch: _configSchema.schema.object({
        enabled: _configSchema.schema.boolean({
          defaultValue: false
        })
      }),
      logstash: _configSchema.schema.object({
        enabled: _configSchema.schema.boolean({
          defaultValue: false
        })
      })
    }),
    min_interval_seconds: _configSchema.schema.number({
      defaultValue: 10
    }),
    show_license_expiration: _configSchema.schema.boolean({
      defaultValue: true
    })
  }),
  kibana: _configSchema.schema.object({
    collection: _configSchema.schema.object({
      enabled: _configSchema.schema.boolean({
        defaultValue: true
      }),
      interval: _configSchema.schema.number({
        defaultValue: 10000
      }) // op status metrics get buffered at `ops.interval` and flushed to the bulk endpoint at this interval

    })
  }),
  cluster_alerts: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: true
    }),
    email_notifications: _configSchema.schema.object({
      enabled: _configSchema.schema.boolean({
        defaultValue: true
      }),
      email_address: _configSchema.schema.string({
        defaultValue: ''
      })
    })
  }),
  licensing: _configSchema.schema.object({
    api_polling_frequency: _configSchema.schema.duration({
      defaultValue: '30s'
    })
  }),
  agent: _configSchema.schema.object({
    interval: _configSchema.schema.string({
      defaultValue: '10s'
    }) // TOOD: NP
    // .regex(/[\d\.]+[yMwdhms]/)

  }),
  tests: _configSchema.schema.object({
    cloud_detector: _configSchema.schema.object({
      enabled: _configSchema.schema.boolean({
        defaultValue: true
      })
    })
  })
});

exports.configSchema = configSchema;
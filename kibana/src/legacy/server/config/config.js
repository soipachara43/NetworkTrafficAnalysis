"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _lodash = _interopRequireDefault(require("lodash"));

var _override = _interopRequireDefault(require("./override"));

var _schema = _interopRequireDefault(require("./schema"));

var _utils = require("../../utils");

var _utils2 = require("../../../core/server/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
const schema = Symbol('Joi Schema');
const schemaExts = Symbol('Schema Extensions');
const vals = Symbol('config values');

class Config {
  static withDefaultSchema(settings = {}) {
    const defaultSchema = (0, _schema.default)();
    return new Config(defaultSchema, settings);
  }

  constructor(initialSchema, initialSettings) {
    this[schemaExts] = Object.create(null);
    this[vals] = Object.create(null);
    this.extendSchema(initialSchema, initialSettings);
  }

  extendSchema(extension, settings, key) {
    if (!extension) {
      return;
    }

    if (!key) {
      return _lodash.default.each(extension._inner.children, child => {
        this.extendSchema(child.schema, _lodash.default.get(settings, child.key), child.key);
      });
    }

    if (this.has(key)) {
      throw new Error(`Config schema already has key: ${key}`);
    }

    _lodash.default.set(this[schemaExts], key, extension);

    this[schema] = null;
    this.set(key, settings);
  }

  removeSchema(key) {
    if (!_lodash.default.has(this[schemaExts], key)) {
      throw new TypeError(`Unknown schema key: ${key}`);
    }

    this[schema] = null;
    (0, _utils.unset)(this[schemaExts], key);
    (0, _utils.unset)(this[vals], key);
  }

  resetTo(obj) {
    this._commit(obj);
  }

  set(key, value) {
    // clone and modify the config
    let config = (0, _utils.deepCloneWithBuffers)(this[vals]);

    if (_lodash.default.isPlainObject(key)) {
      config = (0, _override.default)(config, key);
    } else {
      _lodash.default.set(config, key, value);
    } // attempt to validate the config value


    this._commit(config);
  }

  _commit(newVals) {
    // resolve the current environment
    let env = newVals.env;
    delete newVals.env;
    if (_lodash.default.isObject(env)) env = env.name;
    if (!env) env = 'production';
    const dev = env === 'development';
    const prod = env === 'production'; // pass the environment as context so that it can be refed in config

    const context = {
      env: env,
      prod: prod,
      dev: dev,
      notProd: !prod,
      notDev: !dev,
      version: _lodash.default.get(_utils2.pkg, 'version'),
      branch: _lodash.default.get(_utils2.pkg, 'branch'),
      buildNum: _utils.IS_KIBANA_DISTRIBUTABLE ? _utils2.pkg.build.number : Number.MAX_SAFE_INTEGER,
      buildSha: _utils.IS_KIBANA_DISTRIBUTABLE ? _utils2.pkg.build.sha : 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      dist: _utils.IS_KIBANA_DISTRIBUTABLE
    };

    if (!context.dev && !context.prod) {
      throw new TypeError(`Unexpected environment "${env}", expected one of "development" or "production"`);
    }

    const results = _joi.default.validate(newVals, this.getSchema(), {
      context,
      abortEarly: false
    });

    if (results.error) {
      const error = new Error(results.error.message);
      error.name = results.error.name;
      error.stack = results.error.stack;
      throw error;
    }

    this[vals] = results.value;
  }

  get(key) {
    if (!key) {
      return (0, _utils.deepCloneWithBuffers)(this[vals]);
    }

    const value = _lodash.default.get(this[vals], key);

    if (value === undefined) {
      if (!this.has(key)) {
        throw new Error('Unknown config key: ' + key);
      }
    }

    return (0, _utils.deepCloneWithBuffers)(value);
  }

  getDefault(key) {
    const schemaKey = Array.isArray(key) ? key.join('.') : key;

    const subSchema = _joi.default.reach(this.getSchema(), schemaKey);

    if (!subSchema) {
      throw new Error(`Unknown config key: ${key}.`);
    }

    return (0, _utils.deepCloneWithBuffers)(_lodash.default.get(_joi.default.describe(subSchema), 'flags.default'));
  }

  has(key) {
    function has(key, schema, path) {
      path = path || []; // Catch the partial paths

      if (path.join('.') === key) return true; // Only go deep on inner objects with children

      if (_lodash.default.size(schema._inner.children)) {
        for (let i = 0; i < schema._inner.children.length; i++) {
          const child = schema._inner.children[i]; // If the child is an object recurse through it's children and return
          // true if there's a match

          if (child.schema._type === 'object') {
            if (has(key, child.schema, path.concat([child.key]))) return true; // if the child matches, return true
          } else if (path.concat([child.key]).join('.') === key) {
            return true;
          }
        }
      }
    }

    if (Array.isArray(key)) {
      // TODO: add .has() support for array keys
      key = key.join('.');
    }

    return !!has(key, this.getSchema());
  }

  getSchema() {
    if (!this[schema]) {
      this[schema] = function convertToSchema(children) {
        let schema = _joi.default.object().keys({}).default();

        for (const key of Object.keys(children)) {
          const child = children[key];
          const childSchema = _lodash.default.isPlainObject(child) ? convertToSchema(child) : child;

          if (!childSchema || !childSchema.isJoi) {
            throw new TypeError('Unable to convert configuration definition value to Joi schema: ' + childSchema);
          }

          schema = schema.keys({
            [key]: childSchema
          });
        }

        return schema;
      }(this[schemaExts]);
    }

    return this[schema];
  }

}

exports.Config = Config;
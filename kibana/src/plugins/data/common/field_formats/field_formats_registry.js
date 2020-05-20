"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldFormatsRegistry = void 0;

var _lodash = require("lodash");

var _types = require("./types");

var _base_formatters = require("./constants/base_formatters");

var _field_format = require("./field_format");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FieldFormatsRegistry {
  constructor() {
    _defineProperty(this, "fieldFormats", new Map());

    _defineProperty(this, "defaultMap", {});

    _defineProperty(this, "metaParamsOptions", {});

    _defineProperty(this, "getConfig", void 0);

    _defineProperty(this, "deserialize", () => {
      return new (_field_format.FieldFormat.from(_lodash.identity))();
    });

    _defineProperty(this, "getDefaultConfig", (fieldType, esTypes) => {
      const type = this.getDefaultTypeName(fieldType, esTypes);
      return this.defaultMap && this.defaultMap[type] || {
        id: _types.FIELD_FORMAT_IDS.STRING,
        params: {}
      };
    });

    _defineProperty(this, "getType", formatId => {
      const fieldFormat = this.fieldFormats.get(formatId);

      if (fieldFormat) {
        const decoratedFieldFormat = this.fieldFormatMetaParamsDecorator(fieldFormat);

        if (decoratedFieldFormat) {
          return decoratedFieldFormat;
        }
      }

      return undefined;
    });

    _defineProperty(this, "getTypeWithoutMetaParams", formatId => {
      return this.fieldFormats.get(formatId);
    });

    _defineProperty(this, "getDefaultType", (fieldType, esTypes) => {
      const config = this.getDefaultConfig(fieldType, esTypes);
      return this.getType(config.id);
    });

    _defineProperty(this, "getTypeNameByEsTypes", esTypes => {
      if (!Array.isArray(esTypes)) {
        return undefined;
      }

      return esTypes.find(type => this.defaultMap[type] && this.defaultMap[type].es);
    });

    _defineProperty(this, "getDefaultTypeName", (fieldType, esTypes) => {
      const esType = this.getTypeNameByEsTypes(esTypes);
      return esType || fieldType;
    });

    _defineProperty(this, "getInstance", (0, _lodash.memoize)((formatId, params = {}) => {
      const ConcreteFieldFormat = this.getType(formatId);

      if (!ConcreteFieldFormat) {
        throw new Error(`Field Format '${formatId}' not found!`);
      }

      return new ConcreteFieldFormat(params, this.getConfig);
    }, (formatId, params) => JSON.stringify({
      formatId,
      ...params
    })));

    _defineProperty(this, "getDefaultInstance", (0, _lodash.memoize)(this.getDefaultInstancePlain, this.getDefaultInstanceCacheResolver));

    _defineProperty(this, "fieldFormatMetaParamsDecorator", fieldFormat => {
      const getMetaParams = customParams => this.buildMetaParams(customParams);

      if (fieldFormat) {
        var _class, _temp;

        return _temp = _class = class DecoratedFieldFormat extends fieldFormat {
          constructor(params = {}, getConfig) {
            super(getMetaParams(params), getConfig);
          }

        }, _defineProperty(_class, "id", fieldFormat.id), _defineProperty(_class, "fieldType", fieldFormat.fieldType), _temp;
      }

      return undefined;
    });

    _defineProperty(this, "buildMetaParams", customParams => ({ ...this.metaParamsOptions,
      ...customParams
    }));
  }

  init(getConfig, metaParamsOptions = {}, defaultFieldConverters = _base_formatters.baseFormatters) {
    const defaultTypeMap = getConfig('format:defaultTypeMap');
    this.register(defaultFieldConverters);
    this.parseDefaultTypeMap(defaultTypeMap);
    this.getConfig = getConfig;
    this.metaParamsOptions = metaParamsOptions;
  }
  /**
   * Get the id of the default type for this field type
   * using the format:defaultTypeMap config map
   *
   * @param  {KBN_FIELD_TYPES} fieldType - the field type
   * @param  {ES_FIELD_TYPES[]} esTypes - Array of ES data types
   * @return {FieldType}
   */


  /**
   * Get the default fieldFormat instance for a field format.
   *
   * @param  {KBN_FIELD_TYPES} fieldType
   * @param  {ES_FIELD_TYPES[]} esTypes
   * @return {FieldFormat}
   */
  getDefaultInstancePlain(fieldType, esTypes) {
    const conf = this.getDefaultConfig(fieldType, esTypes);
    return this.getInstance(conf.id, conf.params);
  }
  /**
   * Returns a cache key built by the given variables for caching in memoized
   * Where esType contains fieldType, fieldType is returned
   * -> kibana types have a higher priority in that case
   * -> would lead to failing tests that match e.g. date format with/without esTypes
   * https://lodash.com/docs#memoize
   *
   * @param  {KBN_FIELD_TYPES} fieldType
   * @param  {ES_FIELD_TYPES[]} esTypes
   * @return {String}
   */


  getDefaultInstanceCacheResolver(fieldType, esTypes) {
    // @ts-ignore
    return Array.isArray(esTypes) && esTypes.indexOf(fieldType) === -1 ? [fieldType, ...esTypes].join('-') : fieldType;
  }
  /**
   * Get filtered list of field formats by format type
   *
   * @param  {KBN_FIELD_TYPES} fieldType
   * @return {IFieldFormatType[]}
   */


  getByFieldType(fieldType) {
    return [...this.fieldFormats.values()].filter(format => format && format.fieldType.indexOf(fieldType) !== -1).map(format => this.fieldFormatMetaParamsDecorator(format));
  }
  /**
   * Get the default fieldFormat instance for a field format.
   * It's a memoized function that builds and reads a cache
   *
   * @param  {KBN_FIELD_TYPES} fieldType
   * @param  {ES_FIELD_TYPES[]} esTypes
   * @return {FieldFormat}
   */


  parseDefaultTypeMap(value) {
    this.defaultMap = value;
    (0, _lodash.forOwn)(this, fn => {
      if ((0, _lodash.isFunction)(fn) && fn.cache) {
        // clear all memoize caches
        // @ts-ignore
        fn.cache = new _lodash.memoize.Cache();
      }
    });
  }

  register(fieldFormats) {
    fieldFormats.forEach(fieldFormat => this.fieldFormats.set(fieldFormat.id, fieldFormat));
  }
  /**
   * FieldFormat decorator - provide a one way to add meta-params for all field formatters
   *
   * @private
   * @param  {IFieldFormatType} fieldFormat - field format type
   * @return {IFieldFormatType | undefined}
   */


}

exports.FieldFormatsRegistry = FieldFormatsRegistry;
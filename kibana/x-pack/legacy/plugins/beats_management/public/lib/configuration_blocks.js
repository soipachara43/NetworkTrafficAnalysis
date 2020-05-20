"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigBlocksLib = void 0;

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ConfigBlocksLib =
/*#__PURE__*/
function () {
  function ConfigBlocksLib(adapter, configSchemas) {
    var _this = this;

    _classCallCheck(this, ConfigBlocksLib);

    this.adapter = adapter;
    this.configSchemas = configSchemas;

    _defineProperty(this, "delete", this.adapter.delete.bind(this.adapter));

    _defineProperty(this, "upsert",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(blocks) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.adapter.upsert(_this.userConfigsToJson(blocks));

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(this, "getForTags",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(tagIds, page) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.adapter.getForTags(tagIds, page);

              case 2:
                result = _context2.sent;
                result.list = _this.jsonConfigToUserYaml(result.list);
                return _context2.abrupt("return", result);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }());
  }

  _createClass(ConfigBlocksLib, [{
    key: "jsonConfigToUserYaml",
    value: function jsonConfigToUserYaml(blocks) {
      var _this2 = this;

      // configuration_blocks yaml, JS cant read YAML so we parse it into JS,
      // because beats flattens all fields, and we need more structure.
      // we take tagConfigs, grab the config that applies here, render what we can into
      // an object, and the rest we assume to be the yaml string that goes
      // into the yaml editor...
      // NOTE: The perk of this, is that as we support more features via controls
      // vs yaml editing, it should "just work", and things that were in YAML
      // will now be in the UI forms...
      return blocks.map(function (block) {
        var type = block.type,
            config = block.config;

        var thisConfigSchema = _this2.configSchemas.find(function (conf) {
          return conf.id === type;
        });

        var thisConfigBlockSchema = thisConfigSchema ? thisConfigSchema.configs : null;

        if (!thisConfigBlockSchema) {
          throw new Error('No config block schema ');
        }

        var knownConfigIds = thisConfigBlockSchema.map(function (schema) {
          return schema.id;
        });
        var convertedConfig = knownConfigIds.reduce(function (blockObj, configKey, index) {
          var unhydratedKey = knownConfigIds[index];
          (0, _lodash.set)(blockObj, configKey, (0, _lodash.get)(config, unhydratedKey));
          return blockObj;
        }, thisConfigSchema && thisConfigSchema.allowOtherConfigs ? {
          other: _jsYaml.default.safeDump((0, _lodash.omit)(config, knownConfigIds))
        } : {}); // Workaround to empty object passed into dump resulting in this odd output

        if (convertedConfig.other && convertedConfig.other === '{}\n') {
          convertedConfig.other = '';
        }

        return _objectSpread({}, block, {
          config: convertedConfig
        });
      });
    }
  }, {
    key: "userConfigsToJson",
    value: function userConfigsToJson(blocks) {
      var _this3 = this;

      // configurations is the JS representation of the config yaml,
      // so here we take that JS and convert it into a YAML string.
      // we do so while also flattening "other" into the flat yaml beats expect
      return blocks.map(function (block) {
        var type = block.type,
            config = block.config;

        var thisConfigSchema = _this3.configSchemas.find(function (conf) {
          return conf.id === type;
        });

        var thisConfigBlockSchema = thisConfigSchema ? thisConfigSchema.configs : null;

        if (!thisConfigBlockSchema) {
          throw new Error('No config block schema ');
        }

        var knownConfigIds = thisConfigBlockSchema.map(function (schema) {
          return schema.id;
        }).filter(function (id) {
          return id !== 'other';
        });

        var picked = _this3.pickDeep(config, knownConfigIds);

        var other = _jsYaml.default.safeLoad(config.other || '{}');

        if (typeof other === 'string') {
          other = _defineProperty({}, other, '');
        }

        var convertedConfig = _objectSpread({}, other, {}, picked);

        return _objectSpread({}, block, {
          config: convertedConfig
        });
      });
    }
  }, {
    key: "pickDeep",
    value: function pickDeep(obj, keys) {
      var copy = {};
      keys.forEach(function (key) {
        if ((0, _lodash.has)(obj, key)) {
          var val = (0, _lodash.get)(obj, key);
          (0, _lodash.set)(copy, key, val);
        }
      });
      return copy;
    }
  }]);

  return ConfigBlocksLib;
}();

exports.ConfigBlocksLib = ConfigBlocksLib;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternCreationManager = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var IndexPatternCreationManager =
/*#__PURE__*/
function () {
  function IndexPatternCreationManager(httpClient) {
    _classCallCheck(this, IndexPatternCreationManager);

    this.httpClient = httpClient;

    _defineProperty(this, "configs", void 0);

    this.configs = [];
  }

  _createClass(IndexPatternCreationManager, [{
    key: "add",
    value: function add(Config) {
      var config = new Config({
        httpClient: this.httpClient
      });

      if (this.configs.findIndex(function (c) {
        return c.key === config.key;
      }) !== -1) {
        throw new Error("".concat(config.key, " exists in IndexPatternCreationManager."));
      }

      this.configs.push(config);
    }
  }, {
    key: "getType",
    value: function getType(key) {
      if (key) {
        var index = this.configs.findIndex(function (config) {
          return config.key === key;
        });
        return this.configs[index] || null;
      } else {
        return this.getType('default');
      }
    }
  }, {
    key: "getIndexPatternCreationOptions",
    value: function () {
      var _getIndexPatternCreationOptions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(urlHandler) {
        var options;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = [];
                _context2.next = 3;
                return Promise.all(this.configs.map(
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(config) {
                    var option;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!config.getIndexPatternCreationOption) {
                              _context.next = 6;
                              break;
                            }

                            _context.next = 3;
                            return config.getIndexPatternCreationOption(urlHandler);

                          case 3:
                            _context.t0 = _context.sent;
                            _context.next = 7;
                            break;

                          case 6:
                            _context.t0 = null;

                          case 7:
                            option = _context.t0;

                            if (option) {
                              options.push(option);
                            }

                          case 9:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 3:
                return _context2.abrupt("return", options);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getIndexPatternCreationOptions(_x) {
        return _getIndexPatternCreationOptions.apply(this, arguments);
      }

      return getIndexPatternCreationOptions;
    }()
  }]);

  return IndexPatternCreationManager;
}();

exports.IndexPatternCreationManager = IndexPatternCreationManager;
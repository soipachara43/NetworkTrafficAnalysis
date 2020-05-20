"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDepsMock = void 0;

var _react = _interopRequireDefault(require("react"));

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
var fields = [];
fields.push({
  name: 'myField'
});

fields.getByName = function (name) {
  return fields.find(function (_ref) {
    var n = _ref.name;
    return n === name;
  });
};

var getDepsMock = function getDepsMock() {
  return {
    core: {
      getStartServices: jest.fn().mockReturnValue([null, {
        data: {
          ui: {
            IndexPatternSelect: function IndexPatternSelect() {
              return _react.default.createElement("div", null);
            }
          },
          indexPatterns: {
            get: function get() {
              return {
                fields: fields
              };
            }
          }
        }
      }]),
      injectedMetadata: {
        getInjectedVar: jest.fn().mockImplementation(function (key) {
          switch (key) {
            case 'autocompleteTimeout':
              return 1000;

            case 'autocompleteTerminateAfter':
              return 100000;

            default:
              return '';
          }
        })
      }
    },
    data: {
      query: {
        filterManager: {
          fieldName: 'myField',
          getIndexPattern: function getIndexPattern() {
            return {
              fields: fields
            };
          },
          getAppFilters: jest.fn().mockImplementation(function () {
            return [];
          }),
          getGlobalFilters: jest.fn().mockImplementation(function () {
            return [];
          })
        },
        timefilter: {
          timefilter: {}
        }
      }
    }
  };
};

exports.getDepsMock = getDepsMock;
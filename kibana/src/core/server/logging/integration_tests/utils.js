"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlatformLogsFromMock = getPlatformLogsFromMock;
exports.getLegacyPlatformLogsFromMock = getLegacyPlatformLogsFromMock;
exports.getPlatformLogsFromFile = getPlatformLogsFromFile;
exports.getLegacyPlatformLogsFromFile = getLegacyPlatformLogsFromFile;

var _fs = _interopRequireDefault(require("fs"));

var _util = _interopRequireDefault(require("util"));

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
const readFile = _util.default.promisify(_fs.default.readFile);

function replaceAllNumbers(input) {
  return input.replace(/\d/g, 'x');
}

function replaceTimestamp(input) {
  return input.replace(/\[(.*?)\]/, (full, key) => `[${replaceAllNumbers(key)}]`);
}

function stripColors(input) {
  return input.replace(/\u001b[^m]+m/g, '');
}

function normalizePlatformLogging(input) {
  return replaceTimestamp(input);
}

function normalizeLegacyPlatformLogging(input) {
  return replaceTimestamp(stripColors(input));
}

function getPlatformLogsFromMock(logMock) {
  return logMock.mock.calls.map(([message]) => message).map(normalizePlatformLogging);
}

function getLegacyPlatformLogsFromMock(stdoutMock) {
  return stdoutMock.mock.calls.map(([message]) => message).map(String).map(normalizeLegacyPlatformLogging);
}

async function getPlatformLogsFromFile(path) {
  const fileContent = await readFile(path, 'utf-8');
  return fileContent.split('\n').map(s => normalizePlatformLogging(s)).join('\n');
}

async function getLegacyPlatformLogsFromFile(path) {
  const fileContent = await readFile(path, 'utf-8');
  return fileContent.split('\n').map(s => normalizeLegacyPlatformLogging(s)).join('\n');
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XJsonMode = XJsonMode;

var _brace = _interopRequireDefault(require("brace"));

var _index = require("../index");

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
const oop = _brace.default.acequire('ace/lib/oop');

const {
  Mode: JSONMode
} = _brace.default.acequire('ace/mode/json');

const {
  Tokenizer: AceTokenizer
} = _brace.default.acequire('ace/tokenizer');

const {
  MatchingBraceOutdent
} = _brace.default.acequire('ace/mode/matching_brace_outdent');

const {
  CstyleBehaviour
} = _brace.default.acequire('ace/mode/behaviour/cstyle');

const {
  FoldMode: CStyleFoldMode
} = _brace.default.acequire('ace/mode/folding/cstyle');

function XJsonMode() {
  const ruleset = new _index.XJsonHighlightRules();
  ruleset.normalizeRules();
  this.$tokenizer = new AceTokenizer(ruleset.getRules());
  this.$outdent = new MatchingBraceOutdent();
  this.$behaviour = new CstyleBehaviour();
  this.foldingRules = new CStyleFoldMode();
}

oop.inherits(XJsonMode, JSONMode);
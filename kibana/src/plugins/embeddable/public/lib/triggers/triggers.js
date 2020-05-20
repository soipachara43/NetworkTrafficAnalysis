"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.panelBadgeTrigger = exports.PANEL_BADGE_TRIGGER = exports.contextMenuTrigger = exports.CONTEXT_MENU_TRIGGER = void 0;

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
var CONTEXT_MENU_TRIGGER = 'CONTEXT_MENU_TRIGGER';
exports.CONTEXT_MENU_TRIGGER = CONTEXT_MENU_TRIGGER;
var contextMenuTrigger = {
  id: CONTEXT_MENU_TRIGGER,
  title: 'Context menu',
  description: 'Triggered on top-right corner context-menu select.'
};
exports.contextMenuTrigger = contextMenuTrigger;
var PANEL_BADGE_TRIGGER = 'PANEL_BADGE_TRIGGER';
exports.PANEL_BADGE_TRIGGER = PANEL_BADGE_TRIGGER;
var panelBadgeTrigger = {
  id: PANEL_BADGE_TRIGGER,
  title: 'Panel badges',
  description: 'Actions appear in title bar when an embeddable loads in a panel'
};
exports.panelBadgeTrigger = panelBadgeTrigger;
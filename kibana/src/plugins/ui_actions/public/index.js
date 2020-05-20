"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "UiActionsSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.UiActionsSetup;
  }
});
Object.defineProperty(exports, "UiActionsStart", {
  enumerable: true,
  get: function get() {
    return _plugin.UiActionsStart;
  }
});
Object.defineProperty(exports, "UiActionsServiceParams", {
  enumerable: true,
  get: function get() {
    return _service.UiActionsServiceParams;
  }
});
Object.defineProperty(exports, "UiActionsService", {
  enumerable: true,
  get: function get() {
    return _service.UiActionsService;
  }
});
Object.defineProperty(exports, "Action", {
  enumerable: true,
  get: function get() {
    return _actions.Action;
  }
});
Object.defineProperty(exports, "createAction", {
  enumerable: true,
  get: function get() {
    return _actions.createAction;
  }
});
Object.defineProperty(exports, "IncompatibleActionError", {
  enumerable: true,
  get: function get() {
    return _actions.IncompatibleActionError;
  }
});
Object.defineProperty(exports, "ActionByType", {
  enumerable: true,
  get: function get() {
    return _actions.ActionByType;
  }
});
Object.defineProperty(exports, "buildContextMenuForActions", {
  enumerable: true,
  get: function get() {
    return _context_menu.buildContextMenuForActions;
  }
});
Object.defineProperty(exports, "Trigger", {
  enumerable: true,
  get: function get() {
    return _triggers.Trigger;
  }
});
Object.defineProperty(exports, "TriggerContext", {
  enumerable: true,
  get: function get() {
    return _triggers.TriggerContext;
  }
});
Object.defineProperty(exports, "SELECT_RANGE_TRIGGER", {
  enumerable: true,
  get: function get() {
    return _triggers.SELECT_RANGE_TRIGGER;
  }
});
Object.defineProperty(exports, "selectRangeTrigger", {
  enumerable: true,
  get: function get() {
    return _triggers.selectRangeTrigger;
  }
});
Object.defineProperty(exports, "VALUE_CLICK_TRIGGER", {
  enumerable: true,
  get: function get() {
    return _triggers.VALUE_CLICK_TRIGGER;
  }
});
Object.defineProperty(exports, "valueClickTrigger", {
  enumerable: true,
  get: function get() {
    return _triggers.valueClickTrigger;
  }
});
Object.defineProperty(exports, "APPLY_FILTER_TRIGGER", {
  enumerable: true,
  get: function get() {
    return _triggers.APPLY_FILTER_TRIGGER;
  }
});
Object.defineProperty(exports, "applyFilterTrigger", {
  enumerable: true,
  get: function get() {
    return _triggers.applyFilterTrigger;
  }
});
Object.defineProperty(exports, "TriggerContextMapping", {
  enumerable: true,
  get: function get() {
    return _types.TriggerContextMapping;
  }
});
Object.defineProperty(exports, "TriggerId", {
  enumerable: true,
  get: function get() {
    return _types.TriggerId;
  }
});
Object.defineProperty(exports, "ActionContextMapping", {
  enumerable: true,
  get: function get() {
    return _types.ActionContextMapping;
  }
});
Object.defineProperty(exports, "ActionType", {
  enumerable: true,
  get: function get() {
    return _types.ActionType;
  }
});

var _plugin = require("./plugin");

var _service = require("./service");

var _actions = require("./actions");

var _context_menu = require("./context_menu");

var _triggers = require("./triggers");

var _types = require("./types");

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
function plugin(initializerContext) {
  return new _plugin.UiActionsPlugin(initializerContext);
}
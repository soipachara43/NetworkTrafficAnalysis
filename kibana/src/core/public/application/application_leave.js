"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isConfirmAction = isConfirmAction;
exports.getLeaveAction = getLeaveAction;

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
var appLeaveActionFactory = {
  confirm: function confirm(text, title) {
    return {
      type: _types.AppLeaveActionType.confirm,
      text: text,
      title: title
    };
  },
  default: function _default() {
    return {
      type: _types.AppLeaveActionType.default
    };
  }
};

function isConfirmAction(action) {
  return action.type === _types.AppLeaveActionType.confirm;
}

function getLeaveAction(handler) {
  if (!handler) {
    return appLeaveActionFactory.default();
  }

  return handler(appLeaveActionFactory);
}
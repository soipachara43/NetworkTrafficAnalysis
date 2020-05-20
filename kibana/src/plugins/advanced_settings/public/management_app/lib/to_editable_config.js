"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toEditableConfig = toEditableConfig;

var _get_val_type = require("./get_val_type");

var _get_aria_name = require("./get_aria_name");

var _default_category = require("./default_category");

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

/**
 * @param {object} advanced setting definition object
 * @param {object} name of setting
 * @param {object} current value of setting
 * @returns {object} the editable config object
 */
function toEditableConfig(_ref) {
  var def = _ref.def,
      name = _ref.name,
      value = _ref.value,
      isCustom = _ref.isCustom,
      isOverridden = _ref.isOverridden;

  if (!def) {
    def = {};
  }

  var validationTyped = def.validation;
  var conf = {
    name: name,
    displayName: def.name || name,
    ariaName: def.name || (0, _get_aria_name.getAriaName)(name),
    value: value,
    category: def.category && def.category.length ? def.category : [_default_category.DEFAULT_CATEGORY],
    isCustom: isCustom,
    isOverridden: isOverridden,
    readonly: !!def.readonly,
    defVal: def.value,
    type: (0, _get_val_type.getValType)(def, value),
    description: def.description,
    deprecation: def.deprecation,
    validation: validationTyped && validationTyped.regexString ? {
      regex: new RegExp(validationTyped.regexString),
      message: validationTyped.message
    } : def.validation,
    options: def.options,
    optionLabels: def.optionLabels,
    requiresPageReload: !!def.requiresPageReload
  };
  return conf;
}
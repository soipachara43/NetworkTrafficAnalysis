"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "KibanaContextProvider", {
  enumerable: true,
  get: function get() {
    return _public.KibanaContextProvider;
  }
});
Object.defineProperty(exports, "useUiSetting", {
  enumerable: true,
  get: function get() {
    return _public.useUiSetting;
  }
});
Object.defineProperty(exports, "useUiSetting$", {
  enumerable: true,
  get: function get() {
    return _public.useUiSetting$;
  }
});
Object.defineProperty(exports, "withKibana", {
  enumerable: true,
  get: function get() {
    return _public.withKibana;
  }
});
exports.useKibana = void 0;

var _public = require("../../../../../../../src/plugins/kibana_react/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line react-hooks/rules-of-hooks
var typedUseKibana = function typedUseKibana() {
  return (0, _public.useKibana)();
};

exports.useKibana = typedUseKibana;
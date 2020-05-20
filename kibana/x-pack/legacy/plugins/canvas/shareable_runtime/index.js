"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

require("../../../../../built_assets/css/plugins/kibana/index.light.css");

require("../../../../../built_assets/css/plugins/canvas/style/index.light.css");

require("@elastic/eui/dist/eui_theme_light.css");

require("@kbn/ui-framework/dist/kui_light.css");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const css = require.context('../../../../../built_assets/css', true, /\.\/plugins\/(?!canvas).*light\.css/);

css.keys().forEach(filename => {
  css(filename);
});

const uiStyles = require.context('../../../../../src/legacy/ui/public/styles', false, /[\/\\](?!mixins|variables|_|\.|bootstrap_(light|dark))[^\/\\]+\.less/);

uiStyles.keys().forEach(key => uiStyles(key));
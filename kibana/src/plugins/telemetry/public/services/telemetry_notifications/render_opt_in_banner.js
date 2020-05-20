"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderOptInBanner = renderOptInBanner;

var _react = _interopRequireDefault(require("react"));

var _opt_in_banner = require("../../components/opt_in_banner");

var _public = require("../../../../kibana_react/public");

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
function renderOptInBanner(_ref) {
  var setOptIn = _ref.setOptIn,
      overlays = _ref.overlays;
  var mount = (0, _public.toMountPoint)(_react.default.createElement(_opt_in_banner.OptInBanner, {
    onChangeOptInClick: setOptIn
  }));
  var bannerId = overlays.banners.add(mount, 10000);
  return bannerId;
}
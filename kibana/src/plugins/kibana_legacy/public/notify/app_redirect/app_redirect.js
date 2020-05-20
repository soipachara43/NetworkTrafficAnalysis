"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAppRedirectMessageToUrl = addAppRedirectMessageToUrl;
exports.showAppRedirectNotification = showAppRedirectNotification;

var _utils = require("../../../../../core/utils");

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
var APP_REDIRECT_MESSAGE_PARAM = 'app_redirect_message';

function addAppRedirectMessageToUrl(url, message) {
  return (0, _utils.modifyUrl)(url, function (urlParts) {
    urlParts.hash = (0, _utils.modifyUrl)(urlParts.hash || '', function (hashParts) {
      hashParts.query[APP_REDIRECT_MESSAGE_PARAM] = message;
    });
  });
} // If an app needs to redirect, e.g. due to an expired license, it can surface a message via
// the URL query params.


function showAppRedirectNotification($location, toasts) {
  var queryString = $location.search();

  if (!queryString[APP_REDIRECT_MESSAGE_PARAM]) {
    return;
  }

  var message = queryString[APP_REDIRECT_MESSAGE_PARAM];
  $location.search(APP_REDIRECT_MESSAGE_PARAM, null);
  toasts.addDanger(message);
}
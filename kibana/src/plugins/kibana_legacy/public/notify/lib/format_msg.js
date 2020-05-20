"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMsg = formatMsg;

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@kbn/i18n");

var _format_es_msg = require("./format_es_msg");

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
var has = _lodash.default.has;
/**
 * Formats the error message from an error object, extended elasticsearch
 * object or simple string; prepends optional second parameter to the message
 * @param  {Error|String} err
 * @param  {String} source - Prefix for message indicating source (optional)
 * @returns {string}
 */

function formatMsg(err) {
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var message = '';

  if (source) {
    message += source + ': ';
  }

  var esMsg = (0, _format_es_msg.formatESMsg)(err);

  if (typeof err === 'string') {
    message += err;
  } else if (esMsg) {
    message += esMsg;
  } else if (err instanceof Error) {
    message += formatMsg.describeError(err);
  } else if (has(err, 'status') && has(err, 'data')) {
    // is an Angular $http "error object"
    if (err.status === -1) {
      // status = -1 indicates that the request was failed to reach the server
      message += _i18n.i18n.translate('kibana_legacy.notify.toaster.unavailableServerErrorMessage', {
        defaultMessage: 'An HTTP request has failed to connect. ' + 'Please check if the Kibana server is running and that your browser has a working connection, ' + 'or contact your system administrator.'
      });
    } else {
      message += _i18n.i18n.translate('kibana_legacy.notify.toaster.errorStatusMessage', {
        defaultMessage: 'Error {errStatus} {errStatusText}: {errMessage}',
        values: {
          errStatus: err.status,
          errStatusText: err.statusText,
          errMessage: err.data.message
        }
      });
    }
  }

  return message;
}

formatMsg.describeError = function (err) {
  if (!err) return undefined;
  if (err.shortMessage) return err.shortMessage;
  if (err.body && err.body.message) return err.body.message;
  if (err.message) return err.message;
  return '' + err;
};
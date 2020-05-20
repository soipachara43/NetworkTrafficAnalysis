"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showNewVisModal = showNewVisModal;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react2 = require("@kbn/i18n/react");

var _new_vis_modal = require("./new_vis_modal");

var _services = require("../services");

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

/**
 * shows modal dialog that allows you to create new visualization
 * @param {string[]} editorParams
 * @param {function} onClose - function that will be called when dialog is closed
 */
function showNewVisModal() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$editorParams = _ref.editorParams,
      editorParams = _ref$editorParams === void 0 ? [] : _ref$editorParams,
      onClose = _ref.onClose;

  var container = document.createElement('div');
  var isClosed = false;

  var handleClose = function handleClose() {
    if (isClosed) return;

    _reactDom.default.unmountComponentAtNode(container);

    document.body.removeChild(container);

    if (onClose) {
      onClose();
    }

    isClosed = true;
  };

  document.body.appendChild(container);

  var element = _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_new_vis_modal.NewVisModal, {
    isOpen: true,
    onClose: handleClose,
    editorParams: editorParams,
    visTypesRegistry: (0, _services.getTypes)(),
    addBasePath: (0, _services.getHttp)().basePath.prepend,
    uiSettings: (0, _services.getUISettings)(),
    savedObjects: (0, _services.getSavedObjects)(),
    usageCollection: (0, _services.getUsageCollector)()
  }));

  _reactDom.default.render(element, container);

  return function () {
    return handleClose();
  };
}
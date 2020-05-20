"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalAllErrors = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ModalAllErrorsComponent = function ModalAllErrorsComponent(_ref) {
  var isShowing = _ref.isShowing,
      toast = _ref.toast,
      toggle = _ref.toggle;
  var handleClose = (0, _react.useCallback)(function () {
    return toggle(toast);
  }, [toggle, toast]);
  if (!isShowing || toast == null) return null;
  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    onClose: handleClose
  }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, i18n.TITLE_ERROR_MODAL)), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiCallOut, {
    title: toast.title,
    color: "danger",
    size: "s",
    iconType: "alert"
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), toast.errors != null && toast.errors.map(function (error, index) {
    return _react.default.createElement(_eui.EuiAccordion, {
      key: "".concat(toast.id, "-").concat(index),
      id: "accordion1",
      initialIsOpen: index === 0 ? true : false,
      buttonContent: error.length > 100 ? "".concat(error.substring(0, 100), " ...") : error,
      "data-test-subj": "modal-all-errors-accordion"
    }, _react.default.createElement(MyEuiCodeBlock, null, error));
  })), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButton, {
    onClick: handleClose,
    fill: true,
    "data-test-subj": "modal-all-errors-close"
  }, i18n.CLOSE_ERROR_MODAL))));
};

var ModalAllErrors = _react.default.memo(ModalAllErrorsComponent);

exports.ModalAllErrors = ModalAllErrors;
var MyEuiCodeBlock = (0, _styledComponents.default)(_eui.EuiCodeBlock).withConfig({
  displayName: "MyEuiCodeBlock",
  componentId: "sc-1u2ev1h-0"
})(["margin-top:4px;"]);
MyEuiCodeBlock.displayName = 'MyEuiCodeBlock';
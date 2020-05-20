"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toolbar = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _i18n = require("../../../i18n");

var _navbar = require("../navbar");

var _workpad_manager = require("../workpad_manager");

var _page_manager = require("../page_manager");

var _expression = require("../expression");

var _tray = require("./tray");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local
// @ts-ignore untyped local
// @ts-ignore untyped local
// @ts-ignore untyped local
var strings = _i18n.ComponentStrings.Toolbar;
var TrayType;

(function (TrayType) {
  TrayType["pageManager"] = "pageManager";
  TrayType["expression"] = "expression";
})(TrayType || (TrayType = {}));

var Toolbar = function Toolbar(props) {
  var selectedElement = props.selectedElement,
      tray = props.tray,
      setTray = props.setTray,
      previousPage = props.previousPage,
      nextPage = props.nextPage,
      selectedPageNumber = props.selectedPageNumber,
      workpadName = props.workpadName,
      totalPages = props.totalPages,
      showWorkpadManager = props.showWorkpadManager,
      setShowWorkpadManager = props.setShowWorkpadManager,
      isWriteable = props.isWriteable;
  var elementIsSelected = Boolean(selectedElement);

  var done = function done() {
    return setTray(null);
  };

  if (!isWriteable && tray === TrayType.expression) {
    done();
  }

  var showHideTray = function showHideTray(exp) {
    if (tray && tray === exp) {
      return done();
    }

    setTray(exp);
  };

  var closeWorkpadManager = function closeWorkpadManager() {
    return setShowWorkpadManager(false);
  };

  var openWorkpadManager = function openWorkpadManager() {
    return setShowWorkpadManager(true);
  };

  var workpadManager = _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    onClose: closeWorkpadManager,
    className: "canvasModal--fixedSize",
    maxWidth: "1000px"
  }, _react.default.createElement(_workpad_manager.WorkpadManager, {
    onClose: closeWorkpadManager
  }), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButton, {
    size: "s",
    onClick: closeWorkpadManager
  }, strings.getWorkpadManagerCloseButtonLabel()))));

  var trays = {
    pageManager: _react.default.createElement(_page_manager.PageManager, {
      previousPage: previousPage
    }),
    expression: !elementIsSelected ? null : _react.default.createElement(_expression.Expression, {
      done: done
    })
  };
  return _react.default.createElement("div", {
    className: "canvasToolbar hide-for-sharing"
  }, tray !== null && _react.default.createElement(_tray.Tray, {
    done: done
  }, trays[tray]), _react.default.createElement(_navbar.Navbar, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none",
    className: "canvasToolbar__controls"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "text",
    iconType: "grid",
    onClick: function onClick() {
      return openWorkpadManager();
    }
  }, workpadName)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    color: "text",
    onClick: previousPage,
    iconType: "arrowLeft",
    disabled: selectedPageNumber <= 1,
    "aria-label": strings.getPreviousPageAriaLabel()
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "text",
    onClick: function onClick() {
      return showHideTray(TrayType.pageManager);
    }
  }, strings.getPageButtonLabel(selectedPageNumber, totalPages))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    color: "text",
    onClick: nextPage,
    iconType: "arrowRight",
    disabled: selectedPageNumber >= totalPages,
    "aria-label": strings.getNextPageAriaLabel()
  })), _react.default.createElement(_eui.EuiFlexItem, null), elementIsSelected && isWriteable && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "text",
    iconType: "editorCodeBlock",
    onClick: function onClick() {
      return showHideTray(TrayType.expression);
    },
    "data-test-subj": "canvasExpressionEditorButton"
  }, strings.getEditorButtonLabel())))), showWorkpadManager && workpadManager);
};

exports.Toolbar = Toolbar;
Toolbar.propTypes = {
  workpadName: _propTypes.default.string,
  tray: _propTypes.default.string,
  setTray: _propTypes.default.func.isRequired,
  nextPage: _propTypes.default.func.isRequired,
  previousPage: _propTypes.default.func.isRequired,
  selectedPageNumber: _propTypes.default.number.isRequired,
  totalPages: _propTypes.default.number.isRequired,
  selectedElement: _propTypes.default.object,
  showWorkpadManager: _propTypes.default.bool.isRequired,
  setShowWorkpadManager: _propTypes.default.func.isRequired,
  isWriteable: _propTypes.default.bool.isRequired
};
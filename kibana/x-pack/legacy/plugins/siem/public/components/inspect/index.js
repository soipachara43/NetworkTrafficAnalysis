"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InspectButton = exports.InspectButtonContainer = exports.BUTTON_CLASS = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _store = require("../../store");

var _inputs = require("../../store/inputs");

var _modal = require("./modal");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BUTTON_CLASS = 'inspectButtonComponent';
exports.BUTTON_CLASS = BUTTON_CLASS;

var InspectButtonContainer = _styledComponents.default.div.withConfig({
  displayName: "InspectButtonContainer",
  componentId: "sc-1c7b6ng-0"
})(["display:flex;flex-grow:1;> *{max-width:100%;}.", "{pointer-events:none;opacity:0;transition:opacity ", " ease;}", ""], BUTTON_CLASS, function (props) {
  return (0, _fp.getOr)(250, 'theme.eui.euiAnimSpeedNormal', props);
}, function (_ref) {
  var show = _ref.show;
  return show && (0, _styledComponents.css)(["&:hover .", "{pointer-events:auto;opacity:1;}"], BUTTON_CLASS);
});

exports.InspectButtonContainer = InspectButtonContainer;
InspectButtonContainer.displayName = 'InspectButtonContainer';
InspectButtonContainer.defaultProps = {
  show: true
};

var InspectButtonComponent = function InspectButtonComponent(_ref2) {
  var _ref2$compact = _ref2.compact,
      compact = _ref2$compact === void 0 ? false : _ref2$compact,
      _ref2$inputId = _ref2.inputId,
      inputId = _ref2$inputId === void 0 ? 'global' : _ref2$inputId,
      inspect = _ref2.inspect,
      isDisabled = _ref2.isDisabled,
      isInspected = _ref2.isInspected,
      loading = _ref2.loading,
      _ref2$inspectIndex = _ref2.inspectIndex,
      inspectIndex = _ref2$inspectIndex === void 0 ? 0 : _ref2$inspectIndex,
      onCloseInspect = _ref2.onCloseInspect,
      _ref2$queryId = _ref2.queryId,
      queryId = _ref2$queryId === void 0 ? '' : _ref2$queryId,
      selectedInspectIndex = _ref2.selectedInspectIndex,
      setIsInspected = _ref2.setIsInspected,
      _ref2$title = _ref2.title,
      title = _ref2$title === void 0 ? '' : _ref2$title;
  var isShowingModal = !loading && selectedInspectIndex === inspectIndex && isInspected;
  var handleClick = (0, _react.useCallback)(function () {
    setIsInspected({
      id: queryId,
      inputId: inputId,
      isInspected: true,
      selectedInspectIndex: inspectIndex
    });
  }, [setIsInspected, queryId, inputId, inspectIndex]);
  var handleCloseModal = (0, _react.useCallback)(function () {
    if (onCloseInspect != null) {
      onCloseInspect();
    }

    setIsInspected({
      id: queryId,
      inputId: inputId,
      isInspected: false,
      selectedInspectIndex: inspectIndex
    });
  }, [onCloseInspect, setIsInspected, queryId, inputId, inspectIndex]);
  return _react.default.createElement(_react.default.Fragment, null, inputId === 'timeline' && !compact && _react.default.createElement(_eui.EuiButtonEmpty, {
    className: BUTTON_CLASS,
    "aria-label": i18n.INSPECT,
    "data-test-subj": "inspect-empty-button",
    color: "text",
    iconSide: "left",
    iconType: "inspect",
    isDisabled: loading || isDisabled,
    isLoading: loading,
    onClick: handleClick
  }, i18n.INSPECT), (inputId === 'global' || compact) && _react.default.createElement(_eui.EuiButtonIcon, {
    className: BUTTON_CLASS,
    "aria-label": i18n.INSPECT,
    "data-test-subj": "inspect-icon-button",
    iconSize: "m",
    iconType: "inspect",
    isDisabled: loading || isDisabled,
    title: i18n.INSPECT,
    onClick: handleClick
  }), _react.default.createElement(_modal.ModalInspectQuery, {
    closeModal: handleCloseModal,
    isShowing: isShowingModal,
    request: inspect != null && inspect.dsl.length > 0 ? inspect.dsl[inspectIndex] : null,
    response: inspect != null && inspect.response.length > 0 ? inspect.response[inspectIndex] : null,
    title: title,
    "data-test-subj": "inspect-modal"
  }));
};

var makeMapStateToProps = function makeMapStateToProps() {
  var getGlobalQuery = _store.inputsSelectors.globalQueryByIdSelector();

  var getTimelineQuery = _store.inputsSelectors.timelineQueryByIdSelector();

  var mapStateToProps = function mapStateToProps(state, _ref3) {
    var _ref3$inputId = _ref3.inputId,
        inputId = _ref3$inputId === void 0 ? 'global' : _ref3$inputId,
        queryId = _ref3.queryId;
    var props = inputId === 'global' ? getGlobalQuery(state, queryId) : getTimelineQuery(state, queryId); // refetch caused unnecessary component rerender and it was even not used

    var propsWithoutRefetch = (0, _fp.omit)('refetch', props);
    return propsWithoutRefetch;
  };

  return mapStateToProps;
};

var mapDispatchToProps = {
  setIsInspected: _inputs.inputsActions.setInspectionParameter
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var InspectButton = connector(_react.default.memo(InspectButtonComponent));
exports.InspectButton = InspectButton;
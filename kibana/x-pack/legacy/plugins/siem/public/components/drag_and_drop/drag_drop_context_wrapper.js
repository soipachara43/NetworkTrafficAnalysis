"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragDropContextWrapper = exports.DragDropContextWrapperComponent = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _reactRedux = require("react-redux");

var _store = require("../../store");

var _helpers = require("./helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var onDragEndHandler = function onDragEndHandler(_ref) {
  var browserFields = _ref.browserFields,
      dataProviders = _ref.dataProviders,
      dispatch = _ref.dispatch,
      result = _ref.result;

  if ((0, _helpers.providerWasDroppedOnTimeline)(result)) {
    (0, _helpers.addProviderToTimeline)({
      dataProviders: dataProviders,
      result: result,
      dispatch: dispatch
    });
  } else if ((0, _helpers.providerWasDroppedOnTimelineButton)(result)) {
    (0, _helpers.addProviderToTimeline)({
      dataProviders: dataProviders,
      result: result,
      dispatch: dispatch
    });
  } else if ((0, _helpers.fieldWasDroppedOnTimelineColumns)(result)) {
    (0, _helpers.addFieldToTimelineColumns)({
      browserFields: browserFields,
      dispatch: dispatch,
      result: result
    });
  }
};
/**
 * DragDropContextWrapperComponent handles all drag end events
 */


var DragDropContextWrapperComponent = _react.default.memo(function (_ref2) {
  var browserFields = _ref2.browserFields,
      children = _ref2.children,
      dataProviders = _ref2.dataProviders,
      dispatch = _ref2.dispatch;
  var onDragEnd = (0, _react.useCallback)(function (result) {
    enableScrolling();

    if (dataProviders != null) {
      onDragEndHandler({
        browserFields: browserFields,
        result: result,
        dataProviders: dataProviders,
        dispatch: dispatch
      });
    }

    if (!(0, _helpers.draggableIsField)(result)) {
      document.body.classList.remove(_helpers.IS_DRAGGING_CLASS_NAME);
    }

    if ((0, _helpers.draggableIsField)(result)) {
      document.body.classList.remove(_helpers.IS_TIMELINE_FIELD_DRAGGING_CLASS_NAME);
    }
  }, [browserFields, dataProviders]);
  return (// @ts-ignore
    _react.default.createElement(_reactBeautifulDnd.DragDropContext, {
      onDragEnd: onDragEnd,
      onBeforeCapture: onBeforeCapture
    }, children)
  );
}, function (prevProps, nextProps) {
  return prevProps.children === nextProps.children && prevProps.dataProviders === nextProps.dataProviders; // prevent re-renders when data providers are added or removed, but all other props are the same
});

exports.DragDropContextWrapperComponent = DragDropContextWrapperComponent;
DragDropContextWrapperComponent.displayName = 'DragDropContextWrapperComponent';
var emptyDataProviders = {}; // stable reference

var mapStateToProps = function mapStateToProps(state) {
  var _dragAndDropSelectors;

  var dataProviders = (_dragAndDropSelectors = _store.dragAndDropSelectors.dataProvidersSelector(state)) !== null && _dragAndDropSelectors !== void 0 ? _dragAndDropSelectors : emptyDataProviders;
  return {
    dataProviders: dataProviders
  };
};

var connector = (0, _reactRedux.connect)(mapStateToProps);
var DragDropContextWrapper = connector(DragDropContextWrapperComponent);
exports.DragDropContextWrapper = DragDropContextWrapper;
DragDropContextWrapper.displayName = 'DragDropContextWrapper';

var onBeforeCapture = function onBeforeCapture(before) {
  var x = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
  var y = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

  window.onscroll = function () {
    return window.scrollTo(x, y);
  };

  if (!(0, _helpers.draggableIsField)(before)) {
    document.body.classList.add(_helpers.IS_DRAGGING_CLASS_NAME);
  }

  if ((0, _helpers.draggableIsField)(before)) {
    document.body.classList.add(_helpers.IS_TIMELINE_FIELD_DRAGGING_CLASS_NAME);
  }
};

var enableScrolling = function enableScrolling() {
  return window.onscroll = function () {
    return _fp.noop;
  };
};
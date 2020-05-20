"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionalPortal = exports.DraggableWrapper = exports.DragEffects = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _drag_and_drop = require("../../store/drag_and_drop");

var _truncatable_text = require("../truncatable_text");

var _helpers = require("./helpers");

var _provider_container = require("./provider_container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// As right now, we do not know what we want there, we will keep it as a placeholder
var DragEffects = _styledComponents.default.div.withConfig({
  displayName: "DragEffects",
  componentId: "lf3chr-0"
})([""]);

exports.DragEffects = DragEffects;
DragEffects.displayName = 'DragEffects';
/**
 * Wraps the `react-beautiful-dnd` error boundary. See also:
 * https://github.com/atlassian/react-beautiful-dnd/blob/v12.0.0/docs/guides/setup-problem-detection-and-error-recovery.md
 *
 * NOTE: This extends from `PureComponent` because, at the time of this
 * writing, there's no hook equivalent for `componentDidCatch`, per
 * https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
 */

var DragDropErrorBoundary =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(DragDropErrorBoundary, _React$PureComponent);

  function DragDropErrorBoundary() {
    _classCallCheck(this, DragDropErrorBoundary);

    return _possibleConstructorReturn(this, _getPrototypeOf(DragDropErrorBoundary).apply(this, arguments));
  }

  _createClass(DragDropErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch() {
      this.forceUpdate(); // required for recovery
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return DragDropErrorBoundary;
}(_react.default.PureComponent);

var Wrapper = _styledComponents.default.div.withConfig({
  displayName: "Wrapper",
  componentId: "lf3chr-1"
})(["display:inline-block;max-width:100%;[data-rbd-placeholder-context-id]{display:none !important;}"]);

Wrapper.displayName = 'Wrapper';

var ProviderContentWrapper = _styledComponents.default.span.withConfig({
  displayName: "ProviderContentWrapper",
  componentId: "lf3chr-2"
})(["> span.euiToolTipAnchor{display:block;}"]);

/**
 * Wraps a draggable component to handle registration / unregistration of the
 * data provider associated with the item being dropped
 */
var DraggableWrapper = _react.default.memo(function (_ref) {
  var dataProvider = _ref.dataProvider,
      render = _ref.render,
      truncate = _ref.truncate;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      providerRegistered = _useState2[0],
      setProviderRegistered = _useState2[1];

  var dispatch = (0, _reactRedux.useDispatch)();
  var registerProvider = (0, _react.useCallback)(function () {
    if (!providerRegistered) {
      dispatch(_drag_and_drop.dragAndDropActions.registerProvider({
        provider: dataProvider
      }));
      setProviderRegistered(true);
    }
  }, [dispatch, providerRegistered, dataProvider]);
  var unRegisterProvider = (0, _react.useCallback)(function () {
    return dispatch(_drag_and_drop.dragAndDropActions.unRegisterProvider({
      id: dataProvider.id
    }));
  }, [dispatch, dataProvider]);
  (0, _react.useEffect)(function () {
    return function () {
      unRegisterProvider();
    };
  }, []);
  return _react.default.createElement(Wrapper, {
    "data-test-subj": "draggableWrapperDiv"
  }, _react.default.createElement(DragDropErrorBoundary, null, _react.default.createElement(_reactBeautifulDnd.Droppable, {
    isDropDisabled: true,
    droppableId: (0, _helpers.getDroppableId)(dataProvider.id),
    renderClone: function renderClone(provided, snapshot) {
      return _react.default.createElement(ConditionalPortal, {
        registerProvider: registerProvider
      }, _react.default.createElement("div", _extends({}, provided.draggableProps, provided.dragHandleProps, {
        ref: provided.innerRef,
        "data-test-subj": "providerContainer"
      }), _react.default.createElement(ProviderContentWrapper, {
        "data-test-subj": "draggable-content-".concat(dataProvider.queryMatch.field)
      }, render(dataProvider, provided, snapshot))));
    }
  }, function (droppableProvided) {
    return _react.default.createElement("div", _extends({
      ref: droppableProvided.innerRef
    }, droppableProvided.droppableProps), _react.default.createElement(_reactBeautifulDnd.Draggable, {
      draggableId: (0, _helpers.getDraggableId)(dataProvider.id),
      index: 0,
      key: (0, _helpers.getDraggableId)(dataProvider.id)
    }, function (provided, snapshot) {
      return _react.default.createElement(_provider_container.ProviderContainer, _extends({}, provided.draggableProps, provided.dragHandleProps, {
        ref: provided.innerRef,
        "data-test-subj": "providerContainer",
        isDragging: snapshot.isDragging,
        registerProvider: registerProvider
      }), truncate && !snapshot.isDragging ? _react.default.createElement(_truncatable_text.TruncatableText, {
        "data-test-subj": "draggable-truncatable-content"
      }, render(dataProvider, provided, snapshot)) : _react.default.createElement(ProviderContentWrapper, {
        "data-test-subj": "draggable-content-".concat(dataProvider.queryMatch.field)
      }, render(dataProvider, provided, snapshot)));
    }), droppableProvided.placeholder);
  })));
}, function (prevProps, nextProps) {
  return (0, _fastDeepEqual.default)(prevProps.dataProvider, nextProps.dataProvider) && prevProps.render !== nextProps.render && prevProps.truncate === nextProps.truncate;
});

exports.DraggableWrapper = DraggableWrapper;
DraggableWrapper.displayName = 'DraggableWrapper';
/**
 * Conditionally wraps children in an EuiPortal to ensure drag offsets are correct when dragging
 * from containers that have css transforms
 *
 * See: https://github.com/atlassian/react-beautiful-dnd/issues/499
 */

var ConditionalPortal = _react.default.memo(function (_ref2) {
  var children = _ref2.children,
      registerProvider = _ref2.registerProvider;
  (0, _react.useEffect)(function () {
    registerProvider();
  }, [registerProvider]);
  return _react.default.createElement(_react.default.Fragment, null, children);
});

exports.ConditionalPortal = ConditionalPortal;
ConditionalPortal.displayName = 'ConditionalPortal';
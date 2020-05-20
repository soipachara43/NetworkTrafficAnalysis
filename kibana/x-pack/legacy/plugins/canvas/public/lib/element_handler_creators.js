"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positionHandlerCreators = exports.layerHandlerCreators = exports.clipboardHandlerCreators = exports.groupHandlerCreators = exports.alignmentDistributionHandlerCreators = exports.basicHandlerCreators = void 0;

var _lodash = require("lodash");

var _clipboard = require("./clipboard");

var _clone_subgraphs = require("./clone_subgraphs");

var _notify = require("./notify");

var customElementService = _interopRequireWildcard(require("./custom_element_service"));

var _get_id = require("./get_id");

var _constants = require("../../common/lib/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var extractId = function extractId(node) {
  return node.id;
};

// handlers for clone, delete, and saving custom elements
var basicHandlerCreators = {
  cloneNodes: function cloneNodes(_ref) {
    var insertNodes = _ref.insertNodes,
        pageId = _ref.pageId,
        selectToplevelNodes = _ref.selectToplevelNodes,
        selectedNodes = _ref.selectedNodes;
    return function () {
      var clonedNodes = selectedNodes && (0, _clone_subgraphs.cloneSubgraphs)(selectedNodes);

      if (clonedNodes) {
        insertNodes(clonedNodes, pageId);
        selectToplevelNodes(clonedNodes);
      }
    };
  },
  deleteNodes: function deleteNodes(_ref2) {
    var pageId = _ref2.pageId,
        removeNodes = _ref2.removeNodes,
        selectedNodes = _ref2.selectedNodes;
    return function () {
      if (selectedNodes.length) {
        removeNodes(selectedNodes.map(extractId), pageId);
      }
    };
  },
  createCustomElement: function createCustomElement(_ref3) {
    var selectedNodes = _ref3.selectedNodes;
    return function () {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var image = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (selectedNodes.length) {
        var content = JSON.stringify({
          selectedNodes: selectedNodes
        });
        var customElement = {
          id: (0, _get_id.getId)('custom-element'),
          name: (0, _lodash.camelCase)(name),
          displayName: name,
          help: description,
          image: image,
          content: content
        };
        customElementService.create(customElement).then(function () {
          return _notify.notify.success("Custom element '".concat(customElement.displayName || customElement.id, "' was saved"), {
            'data-test-subj': 'canvasCustomElementCreate-success'
          });
        }).catch(function (result) {
          return _notify.notify.warning(result, {
            title: "Custom element '".concat(customElement.displayName || customElement.id, "' was not saved")
          });
        });
      }
    };
  }
}; // handlers for alignment and distribution

exports.basicHandlerCreators = basicHandlerCreators;
var alignmentDistributionHandlerCreators = Object.assign.apply(Object, [{}].concat(_toConsumableArray(['alignLeft', 'alignCenter', 'alignRight', 'alignTop', 'alignMiddle', 'alignBottom', 'distributeHorizontally', 'distributeVertically'].map(function (event) {
  return _defineProperty({}, event, function (_ref4) {
    var commit = _ref4.commit;
    return function () {
      commit('actionEvent', {
        event: event
      });
    };
  });
})))); // handlers for group and ungroup

exports.alignmentDistributionHandlerCreators = alignmentDistributionHandlerCreators;
var groupHandlerCreators = {
  groupNodes: function groupNodes(_ref6) {
    var commit = _ref6.commit;
    return function () {
      commit('actionEvent', {
        event: 'group'
      });
    };
  },
  ungroupNodes: function ungroupNodes(_ref7) {
    var commit = _ref7.commit;
    return function () {
      commit('actionEvent', {
        event: 'ungroup'
      });
    };
  }
}; // handlers for cut/copy/paste

exports.groupHandlerCreators = groupHandlerCreators;
var clipboardHandlerCreators = {
  cutNodes: function cutNodes(_ref8) {
    var pageId = _ref8.pageId,
        removeNodes = _ref8.removeNodes,
        selectedNodes = _ref8.selectedNodes;
    return function () {
      if (selectedNodes.length) {
        (0, _clipboard.setClipboardData)({
          selectedNodes: selectedNodes
        });
        removeNodes(selectedNodes.map(extractId), pageId);

        _notify.notify.success('Cut element to clipboard');
      }
    };
  },
  copyNodes: function copyNodes(_ref9) {
    var selectedNodes = _ref9.selectedNodes;
    return function () {
      if (selectedNodes.length) {
        (0, _clipboard.setClipboardData)({
          selectedNodes: selectedNodes
        });

        _notify.notify.success('Copied element to clipboard');
      }
    };
  },
  pasteNodes: function pasteNodes(_ref10) {
    var insertNodes = _ref10.insertNodes,
        pageId = _ref10.pageId,
        selectToplevelNodes = _ref10.selectToplevelNodes;
    return function () {
      var _ref11 = JSON.parse((0, _clipboard.getClipboardData)()) || {},
          _ref11$selectedNodes = _ref11.selectedNodes,
          selectedNodes = _ref11$selectedNodes === void 0 ? [] : _ref11$selectedNodes;

      var clonedNodes = selectedNodes && (0, _clone_subgraphs.cloneSubgraphs)(selectedNodes);

      if (clonedNodes) {
        insertNodes(clonedNodes, pageId); // first clone and persist the new node(s)

        selectToplevelNodes(clonedNodes); // then select the cloned node(s)
      }
    };
  }
}; // handlers for changing element layer position
// TODO: support relayering multiple elements

exports.clipboardHandlerCreators = clipboardHandlerCreators;
var layerHandlerCreators = {
  bringToFront: function bringToFront(_ref12) {
    var elementLayer = _ref12.elementLayer,
        pageId = _ref12.pageId,
        selectedNodes = _ref12.selectedNodes;
    return function () {
      if (selectedNodes.length === 1) {
        elementLayer(pageId, selectedNodes[0].id, Infinity);
      }
    };
  },
  bringForward: function bringForward(_ref13) {
    var elementLayer = _ref13.elementLayer,
        pageId = _ref13.pageId,
        selectedNodes = _ref13.selectedNodes;
    return function () {
      if (selectedNodes.length === 1) {
        elementLayer(pageId, selectedNodes[0].id, 1);
      }
    };
  },
  sendBackward: function sendBackward(_ref14) {
    var elementLayer = _ref14.elementLayer,
        pageId = _ref14.pageId,
        selectedNodes = _ref14.selectedNodes;
    return function () {
      if (selectedNodes.length === 1) {
        elementLayer(pageId, selectedNodes[0].id, -1);
      }
    };
  },
  sendToBack: function sendToBack(_ref15) {
    var elementLayer = _ref15.elementLayer,
        pageId = _ref15.pageId,
        selectedNodes = _ref15.selectedNodes;
    return function () {
      if (selectedNodes.length === 1) {
        elementLayer(pageId, selectedNodes[0].id, -Infinity);
      }
    };
  }
}; // handlers for shifting elements up, down, left, and right

exports.layerHandlerCreators = layerHandlerCreators;
var positionHandlerCreators = {
  shiftUp: function shiftUp(_ref16) {
    var selectedNodes = _ref16.selectedNodes,
        setMultiplePositions = _ref16.setMultiplePositions;
    return function () {
      setMultiplePositions(selectedNodes.map(function (element) {
        element.position.top -= _constants.ELEMENT_SHIFT_OFFSET;
        return element;
      }));
    };
  },
  shiftDown: function shiftDown(_ref17) {
    var selectedNodes = _ref17.selectedNodes,
        setMultiplePositions = _ref17.setMultiplePositions;
    return function () {
      setMultiplePositions(selectedNodes.map(function (element) {
        element.position.top += _constants.ELEMENT_SHIFT_OFFSET;
        return element;
      }));
    };
  },
  shiftLeft: function shiftLeft(_ref18) {
    var selectedNodes = _ref18.selectedNodes,
        setMultiplePositions = _ref18.setMultiplePositions;
    return function () {
      setMultiplePositions(selectedNodes.map(function (element) {
        element.position.left -= _constants.ELEMENT_SHIFT_OFFSET;
        return element;
      }));
    };
  },
  shiftRight: function shiftRight(_ref19) {
    var selectedNodes = _ref19.selectedNodes,
        setMultiplePositions = _ref19.setMultiplePositions;
    return function () {
      setMultiplePositions(selectedNodes.map(function (element) {
        element.position.left += _constants.ELEMENT_SHIFT_OFFSET;
        return element;
      }));
    };
  },
  nudgeUp: function nudgeUp(_ref20) {
    var selectedNodes = _ref20.selectedNodes,
        setMultiplePositions = _ref20.setMultiplePositions;
    return function () {
      setMultiplePositions(selectedNodes.map(function (element) {
        element.position.top -= _constants.ELEMENT_NUDGE_OFFSET;
        return element;
      }));
    };
  },
  nudgeDown: function nudgeDown(_ref21) {
    var selectedNodes = _ref21.selectedNodes,
        setMultiplePositions = _ref21.setMultiplePositions;
    return function () {
      setMultiplePositions(selectedNodes.map(function (element) {
        element.position.top += _constants.ELEMENT_NUDGE_OFFSET;
        return element;
      }));
    };
  },
  nudgeLeft: function nudgeLeft(_ref22) {
    var selectedNodes = _ref22.selectedNodes,
        setMultiplePositions = _ref22.setMultiplePositions;
    return function () {
      setMultiplePositions(selectedNodes.map(function (element) {
        element.position.left -= _constants.ELEMENT_NUDGE_OFFSET;
        return element;
      }));
    };
  },
  nudgeRight: function nudgeRight(_ref23) {
    var selectedNodes = _ref23.selectedNodes,
        setMultiplePositions = _ref23.setMultiplePositions;
    return function () {
      setMultiplePositions(selectedNodes.map(function (element) {
        element.position.left += _constants.ELEMENT_NUDGE_OFFSET;
        return element;
      }));
    };
  }
};
exports.positionHandlerCreators = positionHandlerCreators;
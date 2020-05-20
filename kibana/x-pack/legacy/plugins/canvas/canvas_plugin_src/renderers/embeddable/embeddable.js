"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.embeddable = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _i18n = require("ui/i18n");

var _new_platform = require("ui/new_platform");

var _public = require("../../../../../../../src/plugins/embeddable/public");

var _legacy = require("../../../../../../../src/legacy/core_plugins/embeddable_api/public/np_ready/public/legacy");

var _i18n2 = require("../../../i18n");

var _public2 = require("../../../../../../../src/plugins/saved_objects/public");

var _embeddable_input_to_expression = require("./embeddable_input_to_expression");

var _lib = require("../../../common/lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const {
  embeddable: strings
} = _i18n2.RendererStrings;
const embeddablesRegistry = {};

const renderEmbeddable = (embeddableObject, domNode) => {
  return _react.default.createElement("div", {
    className: _lib.CANVAS_EMBEDDABLE_CLASSNAME,
    style: {
      width: domNode.offsetWidth,
      height: domNode.offsetHeight,
      cursor: 'auto'
    }
  }, _react.default.createElement(_i18n.I18nContext, null, _react.default.createElement(_public.EmbeddablePanel, {
    embeddable: embeddableObject,
    getActions: _new_platform.npStart.plugins.uiActions.getTriggerCompatibleActions,
    getEmbeddableFactory: _legacy.start.getEmbeddableFactory,
    getAllEmbeddableFactories: _legacy.start.getEmbeddableFactories,
    notifications: _new_platform.npStart.core.notifications,
    overlays: _new_platform.npStart.core.overlays,
    inspector: _new_platform.npStart.plugins.inspector,
    SavedObjectFinder: (0, _public2.getSavedObjectFinder)(_new_platform.npStart.core.savedObjects, _new_platform.npStart.core.uiSettings)
  })));
};

const embeddable = () => ({
  name: 'embeddable',
  displayName: strings.getDisplayName(),
  help: strings.getHelpDescription(),
  reuseDomNode: true,
  render: async (domNode, {
    input,
    embeddableType
  }, handlers) => {
    const uniqueId = handlers.getElementId();

    if (!embeddablesRegistry[uniqueId]) {
      const factory = Array.from(_legacy.start.getEmbeddableFactories()).find(embeddableFactory => embeddableFactory.type === embeddableType);

      if (!factory) {
        handlers.done();
        throw new _public.EmbeddableFactoryNotFoundError(embeddableType);
      }

      const embeddableObject = await factory.createFromSavedObject(input.id, input);
      embeddablesRegistry[uniqueId] = embeddableObject;

      _reactDom.default.unmountComponentAtNode(domNode);

      const subscription = embeddableObject.getInput$().subscribe(function (updatedInput) {
        const updatedExpression = (0, _embeddable_input_to_expression.embeddableInputToExpression)(updatedInput, embeddableType);

        if (updatedExpression) {
          handlers.onEmbeddableInputChange(updatedExpression);
        }
      });

      _reactDom.default.render(renderEmbeddable(embeddableObject, domNode), domNode, () => handlers.done());

      handlers.onResize(() => {
        _reactDom.default.render(renderEmbeddable(embeddableObject, domNode), domNode, () => handlers.done());
      });
      handlers.onDestroy(() => {
        subscription.unsubscribe();
        handlers.onEmbeddableDestroyed();
        delete embeddablesRegistry[uniqueId];
        return _reactDom.default.unmountComponentAtNode(domNode);
      });
    } else {
      embeddablesRegistry[uniqueId].updateInput(input);
    }
  }
});

exports.embeddable = embeddable;
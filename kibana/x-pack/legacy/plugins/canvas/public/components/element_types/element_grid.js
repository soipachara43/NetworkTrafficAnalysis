"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementGrid = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _element_controls = require("./element_controls");

var _element_card = require("../element_card");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ElementGrid = function ElementGrid(_ref) {
  var elements = _ref.elements,
      filterText = _ref.filterText,
      filterTags = _ref.filterTags,
      handleClick = _ref.handleClick,
      _onEdit = _ref.onEdit,
      _onDelete = _ref.onDelete,
      showControls = _ref.showControls;
  filterText = filterText.toLowerCase();
  return _react.default.createElement(_eui.EuiFlexGrid, {
    gutterSize: "l",
    columns: 4
  }, (0, _lodash.map)(elements, function (element, index) {
    var name = element.name,
        _element$displayName = element.displayName,
        displayName = _element$displayName === void 0 ? '' : _element$displayName,
        _element$help = element.help,
        help = _element$help === void 0 ? '' : _element$help,
        image = element.image,
        _element$tags = element.tags,
        tags = _element$tags === void 0 ? [] : _element$tags;

    var whenClicked = function whenClicked() {
      return handleClick(element);
    };

    var textMatch = false;
    var tagsMatch = false;

    if (!filterText.length || name.toLowerCase().includes(filterText) || displayName.toLowerCase().includes(filterText) || help.toLowerCase().includes(filterText)) {
      textMatch = true;
    }

    if (!filterTags.length || filterTags.every(function (tag) {
      return tags.includes(tag);
    })) {
      tagsMatch = true;
    }

    if (!textMatch || !tagsMatch) {
      return null;
    }

    return _react.default.createElement(_eui.EuiFlexItem, {
      key: index,
      className: "canvasElementCard__wrapper"
    }, _react.default.createElement(_element_card.ElementCard, {
      title: displayName || name,
      description: help,
      image: image,
      tags: tags,
      onClick: whenClicked
    }), showControls && _onEdit && _onDelete && _react.default.createElement(_element_controls.ElementControls, {
      onEdit: function onEdit() {
        return _onEdit(element);
      },
      onDelete: function onDelete() {
        return _onDelete(element);
      }
    }));
  }));
};

exports.ElementGrid = ElementGrid;
ElementGrid.propTypes = {
  elements: _propTypes.default.array.isRequired,
  handleClick: _propTypes.default.func.isRequired,
  showControls: _propTypes.default.bool
};
ElementGrid.defaultProps = {
  showControls: false,
  filterTags: [],
  filterText: ''
};
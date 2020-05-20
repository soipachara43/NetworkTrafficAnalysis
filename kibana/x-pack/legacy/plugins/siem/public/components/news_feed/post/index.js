"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _formatted_date = require("../../formatted_date");

var _helpers = require("../helpers");

var _news_link = require("../news_link");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NewsItemPreviewImage = _styledComponents.default.img.withConfig({
  displayName: "NewsItemPreviewImage",
  componentId: "sc-2a6gc7-0"
})(["height:56px;margin-left:16px;min-width:56px;padding:4px;width:56px;"]);

var Post = _react.default.memo(function (_ref) {
  var newsItem = _ref.newsItem;
  var linkUrl = newsItem.linkUrl,
      title = newsItem.title,
      publishOn = newsItem.publishOn,
      description = newsItem.description,
      imageUrl = newsItem.imageUrl;

  if (!(0, _helpers.showNewsItem)(newsItem)) {
    return null;
  }

  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_news_link.NewsLink, {
    href: linkUrl
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, title)), _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "xs"
  }, _react.default.createElement(_formatted_date.PreferenceFormattedP1DTDate, {
    value: publishOn
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement("div", null, description), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, imageUrl && _react.default.createElement(_news_link.NewsLink, {
    href: linkUrl
  }, _react.default.createElement(NewsItemPreviewImage, {
    alt: title,
    className: "euiPanel",
    src: imageUrl
  }))));
});

exports.Post = Post;
Post.displayName = 'Post';
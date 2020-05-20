"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsFeed = void 0;

var _react = _interopRequireDefault(require("react"));

var _loading_placeholders = require("../page/overview/loading_placeholders");

var _translations = require("../../pages/overview/translations");

var _sidebar_header = require("../sidebar_header");

var _no_news = require("./no_news");

var _post = require("./post");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SHOW_PLACEHOLDERS = 5;
var LINES_PER_LOADING_PLACEHOLDER = 4;

var NewsFeedComponent = function NewsFeedComponent(_ref) {
  var news = _ref.news;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_sidebar_header.SidebarHeader, {
    title: _translations.NEWS_FEED_TITLE
  }), news == null ? _react.default.createElement(_loading_placeholders.LoadingPlaceholders, {
    lines: LINES_PER_LOADING_PLACEHOLDER,
    placeholders: SHOW_PLACEHOLDERS
  }) : news.length === 0 ? _react.default.createElement(_no_news.NoNews, null) : news.map(function (n) {
    return _react.default.createElement(_post.Post, {
      key: n.hash,
      newsItem: n
    });
  }));
};

NewsFeedComponent.displayName = 'NewsFeedComponent';

var NewsFeed = _react.default.memo(NewsFeedComponent);

exports.NewsFeed = NewsFeed;
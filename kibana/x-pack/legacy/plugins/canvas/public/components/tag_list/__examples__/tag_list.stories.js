"use strict";

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _tag_list = require("../tag_list");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var mockTagRegistry = {
  tag1: {
    name: 'tag1',
    color: '#cc3b54'
  },
  tag2: {
    name: 'tag2',
    color: '#5bc149'
  },
  tag3: {
    name: 'tag3',
    color: '#fbc545'
  },
  tag4: {
    name: 'tag4',
    color: '#9b3067'
  },
  tag5: {
    name: 'tag5',
    color: '#1819bd'
  },
  tag6: {
    name: 'tag6',
    color: '#d41e93'
  },
  tag7: {
    name: 'tag7',
    color: '#3486d2'
  },
  tag8: {
    name: 'tag8',
    color: '#b870d8'
  },
  tag9: {
    name: 'tag9',
    color: '#f4a4a7'
  },
  tag10: {
    name: 'tag10',
    color: '#072d6d'
  }
};

var getTag = function getTag(name) {
  return mockTagRegistry[name] || {
    name: name,
    color: '#666666'
  };
};

(0, _react.storiesOf)('components/Tags/TagList', module).add('empty list', function () {
  return _react2.default.createElement(_tag_list.TagList, {
    getTag: getTag
  });
}).add('with health tags', function () {
  return _react2.default.createElement(_tag_list.TagList, {
    tags: ['tag1', 'tag4', 'tag6'],
    getTag: getTag
  });
}).add('with badge tags', function () {
  return _react2.default.createElement(_tag_list.TagList, {
    tags: ['tag1', 'tag2', 'tag3'],
    getTag: getTag,
    tagType: "badge"
  });
}).add('with lots of tags', function () {
  return _react2.default.createElement(_tag_list.TagList, {
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10'],
    getTag: getTag,
    tagType: "badge"
  });
});
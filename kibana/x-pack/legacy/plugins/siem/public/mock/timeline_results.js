"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTimelineProps = exports.mockTimelineApolloResult = exports.mockTimelineResult = exports.mockTimelineModel = exports.mockTimelineResults = exports.mockOpenTimelineQueryResults = void 0;

var _types = require("../graphql/types");

var _index = require("../containers/timeline/all/index.gql_query");

var _defaults = require("../store/timeline/defaults");

var _meta_filter = require("../../../../../../src/plugins/data/common/es_query/filters/meta_filter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** Mocks results of a query run by the `OpenTimeline` component */
var mockOpenTimelineQueryResults = [{
  request: {
    query: _index.allTimelinesQuery,
    variables: {
      onlyUserFavorite: false,
      pageInfo: {
        pageIndex: 1,
        pageSize: 10
      },
      search: '',
      sort: {
        sortField: 'updated',
        sortOrder: 'desc'
      }
    }
  },
  result: {
    data: {
      getAllTimeline: {
        totalCount: 11,
        timeline: [{
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811609',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 1',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }, {
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811602f91',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 2',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }, {
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811602f92',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 2',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }, {
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811602f9',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 3',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }, {
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811602f93',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 4',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }, {
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811602f94',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 5',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }, {
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811602f95',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 6',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }, {
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811602f96',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 7',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }, {
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811602f97',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 7',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }, {
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811602f98',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 7',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }, {
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811602f99',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 7',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }, {
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811602f910',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 7',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }, {
          savedObjectId: '10849df0-7b44-11e9-a608-ab3d811602f911',
          description: 'hhw4',
          favorite: [{
            fullName: null,
            userName: 'elastic',
            favoriteDate: 1558390951234
          }],
          eventIdToNoteIds: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            timelineVersion: null,
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }],
          notes: [{
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'test pinned event 2',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '44763500-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404484133,
            createdBy: 'elastic',
            updated: 1558404484133,
            updatedBy: 'elastic',
            version: 'WzEzOSwxXQ=='
          }, {
            eventId: 'ZF0W12oB9v5HJNSHwY6L',
            note: 'Test pinned 1',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '3e9d51e0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404474317,
            createdBy: 'elastic',
            updated: 1558404474317,
            updatedBy: 'elastic',
            version: 'WzEzNywxXQ=='
          }, {
            eventId: '4l0W12oB9v5HJNSHY4wv',
            note: 'again',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '48eaf440-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404491600,
            createdBy: 'elastic',
            updated: 1558404491600,
            updatedBy: 'elastic',
            version: 'WzE0MSwxXQ=='
          }, {
            eventId: null,
            note: 'Hello world',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '308783f0-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404450688,
            createdBy: 'elastic',
            updated: 1558404450688,
            updatedBy: 'elastic',
            version: 'WzEzMywxXQ=='
          }, {
            eventId: null,
            note: 'here I am',
            timelineId: '10849df0-7b44-11e9-a608-ab3d811602f9',
            timelineVersion: null,
            noteId: '34ec1690-7b6d-11e9-980a-e5349fc014ef',
            created: 1558404458065,
            createdBy: 'elastic',
            updated: 1558404458065,
            updatedBy: 'elastic',
            version: 'WzEzNCwxXQ=='
          }],
          noteIds: ['308783f0-7b6d-11e9-980a-e5349fc014ef', '34ec1690-7b6d-11e9-980a-e5349fc014ef'],
          pinnedEventIds: ['Wl0W12oB9v5HJNSHb400', '410W12oB9v5HJNSHY4wv', 'ZF0W12oB9v5HJNSHwY6L'],
          title: 'test 7',
          created: 1558386787614,
          createdBy: 'elastic',
          updated: 1558390951234,
          updatedBy: 'elastic',
          version: 'WzEyOCwxXQ=='
        }]
      }
    }
  }
}];
/** Mocks results of a query run by the `OpenTimeline` component */

exports.mockOpenTimelineQueryResults = mockOpenTimelineQueryResults;
var mockTimelineResults = [{
  created: 1553700736 * 1000,
  description: '6 pinned events, 4 notes (event1 [2] + event2 [1] + global [1]), is a favorite',
  eventIdToNoteIds: {
    event1: ['noteId1', 'noteId2'],
    event2: ['noteId3']
  },
  favorite: [{
    userName: 'alice',
    favoriteDate: 1553700737 * 10000
  }],
  noteIds: ['noteId4'],
  notes: [{
    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus. Morbi tincidunt ornare massa eget egestas purus. Quis varius quam quisque id diam. Nulla pellentesque dignissim enim sit amet.',
    savedObjectId: 'noteId1',
    updated: 1553700738 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Interdum velit euismod in pellentesque massa placerat duis.',
    savedObjectId: 'noteId2',
    updated: 1553700739 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Morbi quis commodo odio aenean sed. Sit amet aliquam id diam. Enim nec dui nunc mattis enim ut tellus elementum.',
    savedObjectId: 'noteId3',
    updated: 1553700740 * 1000,
    updatedBy: 'bob'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId4',
    updated: 1553700741 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId5',
    updated: 1553700742 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId6',
    updated: 1553700743 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId7',
    updated: 1553700744 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId8',
    updated: 1553700745 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId9',
    updated: 1553700746 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId10',
    updated: 1553700747 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId11',
    updated: 1553700748 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId12',
    updated: 1553700749 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId13',
    updated: 1553700750 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId14',
    updated: 1553700751 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId15',
    updated: 1553700752 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId16',
    updated: 1553700753 * 1000,
    updatedBy: 'alice'
  }, {
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId17',
    updated: 1553700753 * 1000,
    updatedBy: 'alice'
  }],
  pinnedEventIds: {
    event1: true,
    event2: true,
    event3: true,
    event4: true,
    event5: true,
    event6: true
  },
  savedObjectId: 'saved-timeline-11',
  title: 'Privilege Escalation',
  updated: 1553700753 * 1000,
  updatedBy: 'alice'
}, {
  created: 1551987071 * 1000,
  description: 'Null pinned events, notes, or favorites',
  savedObjectId: 'saved-timeline-10',
  title: '    Spartan    ',
  updated: 1551987071 * 1000,
  updatedBy: 'firstname.lastname'
}, {
  created: 1550703360 * 1000,
  eventIdToNoteIds: {},
  favorite: [],
  noteIds: [],
  notes: [],
  pinnedEventIds: {},
  savedObjectId: 'saved-timeline-9',
  title: 'No description',
  updated: 1550703360 * 1000,
  updatedBy: 'jessica'
}, {
  created: 1549403981 * 1000,
  description: 'this has null fields for all counted fields',
  eventIdToNoteIds: null,
  favorite: [],
  noteIds: null,
  notes: null,
  pinnedEventIds: null,
  savedObjectId: 'saved-timeline-8',
  title: 'all countable fields are null',
  updated: 1549403981 * 1000,
  updatedBy: 'nicole'
}, {
  created: 1546594386 * 1000,
  description: 'malformed data: no savedObjectId',
  eventIdToNoteIds: null,
  favorite: [],
  noteIds: null,
  pinnedEventIds: {
    event1: true,
    event2: true
  },
  title: 'malformed data',
  updated: 1546594386 * 1000,
  updatedBy: 'ricky'
}, {
  created: 1545055450 * 1000,
  description: 'malformed data: null title',
  eventIdToNoteIds: null,
  favorite: [],
  noteIds: null,
  pinnedEventIds: null,
  savedObjectId: 'saved-timeline-6',
  updated: 1545055450 * 1000,
  updatedBy: 'marty'
}, {
  created: 1543604192 * 1000,
  description: 'empty title',
  eventIdToNoteIds: {
    event1: ['noteId5', 'noteId6']
  },
  favorite: [],
  noteIds: [],
  notes: [{
    note: 'Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper.',
    savedObjectId: 'noteId5',
    updated: 1543603192 * 1000,
    updatedBy: 'olivia'
  }, {
    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    savedObjectId: 'noteId6',
    updated: 1543604192 * 1000,
    updatedBy: 'olivia'
  }],
  pinnedEventIds: {},
  savedObjectId: 'saved-timeline-5',
  title: '',
  updated: 1543604192 * 1000,
  updatedBy: 'olivia'
}, {
  created: 1543604192 * 1000,
  description: 'malformed data: no updated (no last modified or last updated)',
  eventIdToNoteIds: null,
  favorite: [],
  noteIds: null,
  pinnedEventIds: null,
  savedObjectId: 'saved-timeline-4',
  title: 'missing metadata'
}, {
  created: 1541677311 * 1000,
  description: 'a long title with no break',
  eventIdToNoteIds: {
    event2: ['noteId7']
  },
  favorite: [{
    userName: 'nicole',
    favoriteDate: 1541677314 * 1000
  }],
  noteIds: [],
  notes: [{
    note: 'Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vulputate ut pharetra sit amet aliquam id diam.',
    savedObjectId: 'noteId7',
    updated: 1541677314 * 1000,
    updatedBy: 'charlotte'
  }],
  pinnedEventIds: {
    event1: true,
    event2: true,
    event3: true,
    event4: true
  },
  savedObjectId: 'saved-timeline-3',
  title: 'supercalifragilisticexpialidocious',
  updated: 1541677314 * 1000,
  updatedBy: 'charlotte'
}, {
  created: 1541550878 * 1000,
  description: '',
  eventIdToNoteIds: {},
  favorite: [],
  noteIds: ['noteId8'],
  notes: [{
    note: 'Dictum sit amet justo donec enim diam.',
    savedObjectId: 'noteId8',
    updated: 1541550878 * 1000,
    updatedBy: 'admin'
  }],
  pinnedEventIds: {},
  savedObjectId: 'saved-timeline-2',
  title: '',
  updated: 1541550878 * 1000,
  updatedBy: 'admin'
}, {
  created: 1540936411 * 1000,
  description: '',
  favorite: [],
  pinnedEventIds: {
    event1: true,
    event2: true,
    event3: true,
    event4: true,
    event5: true
  },
  savedObjectId: 'saved-timeline-1',
  title: 'wowzers',
  updated: 1540936411 * 1000,
  updatedBy: 'karen'
}];
exports.mockTimelineResults = mockTimelineResults;
var mockTimelineModel = {
  columns: [{
    columnHeaderType: 'not-filtered',
    id: '@timestamp',
    width: 190
  }, {
    columnHeaderType: 'not-filtered',
    id: 'message',
    width: 180
  }, {
    columnHeaderType: 'not-filtered',
    id: 'event.category',
    width: 180
  }, {
    columnHeaderType: 'not-filtered',
    id: 'host.name',
    width: 180
  }, {
    columnHeaderType: 'not-filtered',
    id: 'source.ip',
    width: 180
  }, {
    columnHeaderType: 'not-filtered',
    id: 'destination.ip',
    width: 180
  }, {
    columnHeaderType: 'not-filtered',
    id: 'user.name',
    width: 180
  }],
  dataProviders: [],
  dateRange: {
    end: 1584539558929,
    start: 1584539198929
  },
  deletedEventIds: [],
  description: 'This is a sample rule description',
  eventIdToNoteIds: {},
  eventType: 'all',
  filters: [{
    $state: {
      store: _meta_filter.FilterStateStore.APP_STATE
    },
    meta: {
      alias: null,
      disabled: true,
      key: 'host.name',
      negate: false,
      params: '"{"query":"placeholder"}"',
      type: 'phrase'
    },
    query: '"{"match_phrase":{"host.name":"placeholder"}}"'
  }],
  highlightedDropAndProviderId: '',
  historyIds: [],
  id: 'ef579e40-jibber-jabber',
  isFavorite: false,
  isLive: false,
  isLoading: false,
  isSaving: false,
  isSelectAllChecked: false,
  kqlMode: 'filter',
  kqlQuery: {
    filterQuery: null,
    filterQueryDraft: null
  },
  itemsPerPage: 25,
  itemsPerPageOptions: [10, 25, 50, 100],
  loadingEventIds: [],
  noteIds: [],
  pinnedEventIds: {},
  pinnedEventsSaveObject: {},
  savedObjectId: 'ef579e40-jibber-jabber',
  selectedEventIds: {},
  show: false,
  showCheckboxes: false,
  showRowRenderers: true,
  sort: {
    columnId: '@timestamp',
    sortDirection: _types.Direction.desc
  },
  title: 'Test rule',
  version: '1',
  width: 1100
};
exports.mockTimelineModel = mockTimelineModel;
var mockTimelineResult = {
  savedObjectId: 'ef579e40-jibber-jabber',
  columns: _defaults.timelineDefaults.columns.filter(function (column) {
    return column.id !== 'event.action';
  }),
  dateRange: {
    start: 1584539198929,
    end: 1584539558929
  },
  description: 'This is a sample rule description',
  eventType: 'all',
  filters: [{
    meta: {
      key: 'host.name',
      negate: false,
      params: '"{"query":"placeholder"}"',
      type: 'phrase'
    },
    query: '"{"match_phrase":{"host.name":"placeholder"}}"'
  }],
  kqlMode: 'filter',
  title: 'Test rule',
  savedQueryId: null,
  sort: {
    columnId: '@timestamp',
    sortDirection: 'desc'
  },
  version: '1'
};
exports.mockTimelineResult = mockTimelineResult;
var mockTimelineApolloResult = {
  data: {
    getOneTimeline: mockTimelineResult
  },
  loading: false,
  networkStatus: 7,
  stale: false
};
exports.mockTimelineApolloResult = mockTimelineApolloResult;
var defaultTimelineProps = {
  from: 1541444305937,
  timeline: {
    columns: [{
      columnHeaderType: 'not-filtered',
      id: '@timestamp',
      width: 190
    }, {
      columnHeaderType: 'not-filtered',
      id: 'message',
      width: 180
    }, {
      columnHeaderType: 'not-filtered',
      id: 'event.category',
      width: 180
    }, {
      columnHeaderType: 'not-filtered',
      id: 'event.action',
      width: 180
    }, {
      columnHeaderType: 'not-filtered',
      id: 'host.name',
      width: 180
    }, {
      columnHeaderType: 'not-filtered',
      id: 'source.ip',
      width: 180
    }, {
      columnHeaderType: 'not-filtered',
      id: 'destination.ip',
      width: 180
    }, {
      columnHeaderType: 'not-filtered',
      id: 'user.name',
      width: 180
    }],
    dataProviders: [{
      and: [],
      enabled: true,
      excluded: false,
      id: 'send-signal-to-timeline-action-default-draggable-event-details-value-formatted-field-value-timeline-1-signal-id-1',
      kqlQuery: '',
      name: '1',
      queryMatch: {
        field: '_id',
        operator: ':',
        value: '1'
      }
    }],
    dateRange: {
      end: 1541444605937,
      start: 1541444305937
    },
    deletedEventIds: [],
    description: '',
    eventIdToNoteIds: {},
    eventType: 'all',
    filters: [],
    highlightedDropAndProviderId: '',
    historyIds: [],
    id: 'timeline-1',
    isFavorite: false,
    isLive: false,
    isLoading: false,
    isSaving: false,
    isSelectAllChecked: false,
    itemsPerPage: 25,
    itemsPerPageOptions: [10, 25, 50, 100],
    kqlMode: 'filter',
    kqlQuery: {
      filterQuery: {
        kuery: {
          expression: '',
          kind: 'kuery'
        },
        serializedQuery: ''
      },
      filterQueryDraft: {
        expression: '',
        kind: 'kuery'
      }
    },
    loadingEventIds: [],
    noteIds: [],
    pinnedEventIds: {},
    pinnedEventsSaveObject: {},
    savedObjectId: null,
    selectedEventIds: {},
    show: false,
    showCheckboxes: false,
    showRowRenderers: true,
    sort: {
      columnId: '@timestamp',
      sortDirection: _types.Direction.desc
    },
    title: '',
    version: null,
    width: 1100
  },
  to: 1541444605937,
  ruleNote: '# this is some markdown documentation'
};
exports.defaultTimelineProps = defaultTimelineProps;
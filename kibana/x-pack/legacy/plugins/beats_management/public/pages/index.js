"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeMap = void 0;

var _details = require("./beat/details");

var _index = require("./beat/index");

var _tags = require("./beat/tags");

var _enforce_security = require("./error/enforce_security");

var _invalid_license = require("./error/invalid_license");

var _no_access = require("./error/no_access");

var _configuration_tags = require("./overview/configuration_tags");

var _enrolled_beats = require("./overview/enrolled_beats");

var _index2 = require("./overview/index");

var _create = require("./tag/create");

var _edit = require("./tag/edit");

var _beat = require("./walkthrough/initial/beat");

var _finish = require("./walkthrough/initial/finish");

var _index3 = require("./walkthrough/initial/index");

var _tag = require("./walkthrough/initial/tag");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var routeMap = [{
  path: '/tag/create/:tagid?',
  component: _create.TagCreatePage
}, {
  path: '/tag/edit/:tagid?',
  component: _edit.TagEditPage
}, {
  path: '/beat/:beatId',
  component: _index.BeatDetailsPage,
  routes: [{
    path: '/beat/:beatId/details',
    component: _details.BeatDetailPage
  }, {
    path: '/beat/:beatId/tags',
    component: _tags.BeatTagsPage
  }]
}, {
  path: '/error/enforce_security',
  component: _enforce_security.EnforceSecurityPage
}, {
  path: '/error/invalid_license',
  component: _invalid_license.InvalidLicensePage
}, {
  path: '/error/no_access',
  component: _no_access.NoAccessPage
}, {
  path: '/overview',
  component: _index2.MainPage,
  routes: [{
    path: '/overview/configuration_tags',
    component: _configuration_tags.TagsPage
  }, {
    path: '/overview/enrolled_beats',
    component: _enrolled_beats.BeatsPage
  }]
}, {
  path: '/walkthrough/initial',
  component: _index3.InitialWalkthroughPage,
  routes: [{
    path: '/walkthrough/initial/beat',
    component: _beat.BeatsInitialEnrollmentPage
  }, {
    path: '/walkthrough/initial/finish',
    component: _finish.FinishWalkthroughPage
  }, {
    path: '/walkthrough/initial/tag',
    component: _tag.InitialTagPage
  }]
}];
exports.routeMap = routeMap;
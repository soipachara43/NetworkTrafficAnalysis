"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageEpicTimelineId = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ManageEpicTimelineId =
/*#__PURE__*/
function () {
  function ManageEpicTimelineId() {
    _classCallCheck(this, ManageEpicTimelineId);

    _defineProperty(this, "timelineId", null);

    _defineProperty(this, "version", null);
  }

  _createClass(ManageEpicTimelineId, [{
    key: "getTimelineId",
    value: function getTimelineId() {
      return this.timelineId;
    }
  }, {
    key: "getTimelineVersion",
    value: function getTimelineVersion() {
      return this.version;
    }
  }, {
    key: "setTimelineId",
    value: function setTimelineId(timelineId) {
      this.timelineId = timelineId;
    }
  }, {
    key: "setTimelineVersion",
    value: function setTimelineVersion(version) {
      this.version = version;
    }
  }]);

  return ManageEpicTimelineId;
}();

exports.ManageEpicTimelineId = ManageEpicTimelineId;
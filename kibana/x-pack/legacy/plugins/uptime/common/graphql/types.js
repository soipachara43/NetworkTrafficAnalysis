"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortOrder = exports.CursorDirection = void 0;

/* tslint:disable */
// ====================================================
// START: Typescript template
// ====================================================
// ====================================================
// Scalars
// ====================================================
// ====================================================
// Types
// ====================================================

/** A request sent from a monitor to a host */

/** An agent for recording a beat */

/** The monitor's status for a ping */

/** Metadata added by a proccessor, which is specified in its configuration. */

/** Geolocation data added via processors to enrich events. */

/** Contains monitor transmission encryption information. */

/** The primary object returned for monitor states. */

/** Represents the current state and associated data for an Uptime monitor. */

/** Unifies the subsequent data for an uptime monitor. */

/** Contains monitor transmission encryption information. */

/** Monitor status data over time. */

/** Represents a monitor's statuses for a period of time. */
// ====================================================
// Enums
// ====================================================
let CursorDirection;
exports.CursorDirection = CursorDirection;

(function (CursorDirection) {
  CursorDirection["AFTER"] = "AFTER";
  CursorDirection["BEFORE"] = "BEFORE";
})(CursorDirection || (exports.CursorDirection = CursorDirection = {}));

let SortOrder; // ====================================================
// END: Typescript template
// ====================================================

exports.SortOrder = SortOrder;

(function (SortOrder) {
  SortOrder["ASC"] = "ASC";
  SortOrder["DESC"] = "DESC";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
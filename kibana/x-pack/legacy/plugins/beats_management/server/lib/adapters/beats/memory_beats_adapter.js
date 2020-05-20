"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryBeatsAdapter = void 0;

var _lodash = require("lodash");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MemoryBeatsAdapter {
  constructor(beatsDB) {
    _defineProperty(this, "beatsDB", void 0);

    this.beatsDB = beatsDB;
  }

  async get(user, id) {
    return this.beatsDB.find(beat => beat.id === id) || null;
  }

  async insert(user, beat) {
    this.beatsDB.push(beat);
  }

  async update(user, beat) {
    const beatIndex = this.beatsDB.findIndex(b => b.id === beat.id);
    this.beatsDB[beatIndex] = { ...this.beatsDB[beatIndex],
      ...beat
    };
  }

  async getWithIds(user, beatIds) {
    return this.beatsDB.filter(beat => beatIds.includes(beat.id));
  }

  async getAllWithTags(user, tagIds) {
    return this.beatsDB.filter(beat => (0, _lodash.intersection)(tagIds, beat.tags || []).length !== 0);
  }

  async getBeatWithToken(user, enrollmentToken) {
    return this.beatsDB.find(beat => enrollmentToken === beat.enrollment_token) || null;
  }

  async getAll(user) {
    return this.beatsDB.map(beat => (0, _lodash.omit)(beat, ['access_token']));
  }

  async removeTagsFromBeats(user, removals) {
    const beatIds = removals.map(r => r.beatId);
    const response = this.beatsDB.filter(beat => beatIds.includes(beat.id)).map(beat => {
      const tagData = removals.find(r => r.beatId === beat.id);

      if (tagData) {
        if (beat.tags) {
          beat.tags = beat.tags.filter(tag => tag !== tagData.tag);
        }
      }

      return beat;
    });
    return response.map((item, resultIdx) => ({
      idxInRequest: removals[resultIdx].idxInRequest,
      result: 'updated',
      status: 200
    }));
  }

  async assignTagsToBeats(user, assignments) {
    const beatIds = assignments.map(r => r.beatId);
    this.beatsDB.filter(beat => beatIds.includes(beat.id)).map(beat => {
      // get tags that need to be assigned to this beat
      const tags = assignments.filter(a => a.beatId === beat.id).map(t => t.tag);

      if (tags.length > 0) {
        if (!beat.tags) {
          beat.tags = [];
        }

        const nonExistingTags = tags.filter(t => beat.tags && !beat.tags.includes(t));

        if (nonExistingTags.length > 0) {
          beat.tags = beat.tags.concat(nonExistingTags);
        }
      }

      return beat;
    });
    return assignments.map((item, resultIdx) => ({
      idxInRequest: assignments[resultIdx].idxInRequest,
      result: 'updated',
      status: 200
    }));
  }

  setDB(beatsDB) {
    this.beatsDB = beatsDB;
  }

}

exports.MemoryBeatsAdapter = MemoryBeatsAdapter;
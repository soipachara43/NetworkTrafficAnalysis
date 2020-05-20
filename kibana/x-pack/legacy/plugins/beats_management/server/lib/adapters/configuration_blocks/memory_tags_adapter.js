"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryConfigurationBlockAdapter = void 0;

var _chance = _interopRequireDefault(require("chance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const chance = new _chance.default();

class MemoryConfigurationBlockAdapter {
  constructor(db) {
    _defineProperty(this, "db", []);

    this.db = db.map(config => {
      if (config.id === undefined) {
        config.id = chance.word();
      }

      return config;
    });
  }

  async getByIds(user, ids) {
    return this.db.filter(block => ids.includes(block.id));
  }

  async delete(user, blockIds) {
    this.db = this.db.filter(block => !blockIds.includes(block.id));
    return blockIds.map(id => ({
      id,
      success: true
    }));
  }

  async deleteForTags(user, tagIds) {
    this.db = this.db.filter(block => !tagIds.includes(block.tag));
    return {
      success: true
    };
  }

  async getForTags(user, tagIds, page, size) {
    const results = this.db.filter(block => tagIds.includes(block.id));
    return {
      page: 0,
      total: results.length,
      blocks: results
    };
  }

  async create(user, blocks) {
    return blocks.map(block => {
      const existingIndex = this.db.findIndex(t => t.id === block.id);

      if (existingIndex !== -1) {
        this.db[existingIndex] = block;
      } else {
        this.db.push(block);
      }

      return block.id;
    });
  }

  setDB(db) {
    this.db = db.map(block => {
      if (block.id === undefined) {
        block.id = chance.word();
      }

      return block;
    });
  }

}

exports.MemoryConfigurationBlockAdapter = MemoryConfigurationBlockAdapter;
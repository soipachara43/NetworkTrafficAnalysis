"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsSerializer = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _version = require("../version");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A serializer that can be used to manually convert {@link SavedObjectsRawDoc | raw} or
 * {@link SavedObjectSanitizedDoc | sanitized} documents to the other kind.
 *
 * @remarks Serializer instances should only be created and accessed by calling {@link SavedObjectsServiceStart.createSerializer}
 *
 * @public
 */
class SavedObjectsSerializer {
  /**
   * @internal
   */
  constructor(registry) {
    _defineProperty(this, "registry", void 0);

    this.registry = registry;
  }
  /**
   * Determines whether or not the raw document can be converted to a saved object.
   *
   * @param {SavedObjectsRawDoc} rawDoc - The raw ES document to be tested
   */


  isRawSavedObject(rawDoc) {
    const {
      type,
      namespace
    } = rawDoc._source;
    const namespacePrefix = namespace && !this.registry.isNamespaceAgnostic(type) ? `${namespace}:` : '';
    return Boolean(type && rawDoc._id.startsWith(`${namespacePrefix}${type}:`) && rawDoc._source.hasOwnProperty(type));
  }
  /**
   * Converts a document from the format that is stored in elasticsearch to the saved object client format.
   *
   *  @param {SavedObjectsRawDoc} doc - The raw ES document to be converted to saved object format.
   */


  rawToSavedObject(doc) {
    const {
      _id,
      _source,
      _seq_no,
      _primary_term
    } = doc;
    const {
      type,
      namespace
    } = _source;
    const version = _seq_no != null || _primary_term != null ? (0, _version.encodeVersion)(_seq_no, _primary_term) : undefined;
    return {
      type,
      id: this.trimIdPrefix(namespace, type, _id),
      ...(namespace && !this.registry.isNamespaceAgnostic(type) && {
        namespace
      }),
      attributes: _source[type],
      references: _source.references || [],
      ...(_source.migrationVersion && {
        migrationVersion: _source.migrationVersion
      }),
      ...(_source.updated_at && {
        updated_at: _source.updated_at
      }),
      ...(version && {
        version
      })
    };
  }
  /**
   * Converts a document from the saved object client format to the format that is stored in elasticsearch.
   *
   * @param {SavedObjectSanitizedDoc} savedObj - The saved object to be converted to raw ES format.
   */


  savedObjectToRaw(savedObj) {
    const {
      id,
      type,
      namespace,
      attributes,
      migrationVersion,
      updated_at,
      version,
      references
    } = savedObj;
    const source = {
      [type]: attributes,
      type,
      references,
      ...(namespace && !this.registry.isNamespaceAgnostic(type) && {
        namespace
      }),
      ...(migrationVersion && {
        migrationVersion
      }),
      ...(updated_at && {
        updated_at
      })
    };
    return {
      _id: this.generateRawId(namespace, type, id),
      _source: source,
      ...(version != null && (0, _version.decodeVersion)(version))
    };
  }
  /**
   * Given a saved object type and id, generates the compound id that is stored in the raw document.
   *
   * @param {string} namespace - The namespace of the saved object
   * @param {string} type - The saved object type
   * @param {string} id - The id of the saved object
   */


  generateRawId(namespace, type, id) {
    const namespacePrefix = namespace && !this.registry.isNamespaceAgnostic(type) ? `${namespace}:` : '';
    return `${namespacePrefix}${type}:${id || _uuid.default.v1()}`;
  }

  trimIdPrefix(namespace, type, id) {
    assertNonEmptyString(id, 'document id');
    assertNonEmptyString(type, 'saved object type');
    const namespacePrefix = namespace && !this.registry.isNamespaceAgnostic(type) ? `${namespace}:` : '';
    const prefix = `${namespacePrefix}${type}:`;

    if (!id.startsWith(prefix)) {
      return id;
    }

    return id.slice(prefix.length);
  }

}

exports.SavedObjectsSerializer = SavedObjectsSerializer;

function assertNonEmptyString(value, name) {
  if (!value || typeof value !== 'string') {
    throw new TypeError(`Expected "${value}" to be a ${name}`);
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SavedObjectsSchema: true,
  SavedObjectsManagement: true,
  exportSavedObjectsToStream: true,
  SavedObjectsExportOptions: true,
  SavedObjectsExportResultDetails: true,
  SavedObjectsSerializer: true,
  SavedObjectsRawDoc: true,
  SavedObjectSanitizedDoc: true,
  SavedObjectUnsanitizedDoc: true,
  SavedObjectsMigrationLogger: true,
  SavedObjectsService: true,
  InternalSavedObjectsServiceStart: true,
  SavedObjectsServiceStart: true,
  SavedObjectsServiceSetup: true,
  InternalSavedObjectsServiceSetup: true,
  SavedObjectsRepositoryFactory: true,
  ISavedObjectsRepository: true,
  SavedObjectsIncrementCounterOptions: true,
  SavedObjectsDeleteByNamespaceOptions: true,
  SavedObjectsCoreFieldMapping: true,
  SavedObjectsComplexFieldMapping: true,
  SavedObjectsFieldMapping: true,
  SavedObjectsMappingProperties: true,
  SavedObjectsTypeMappingDefinition: true,
  SavedObjectsTypeMappingDefinitions: true,
  SavedObjectMigrationMap: true,
  SavedObjectMigrationFn: true,
  SavedObjectMigrationContext: true,
  SavedObjectsType: true,
  SavedObjectsTypeManagementDefinition: true,
  savedObjectsConfig: true,
  savedObjectsMigrationConfig: true,
  SavedObjectTypeRegistry: true,
  ISavedObjectTypeRegistry: true
};
Object.defineProperty(exports, "SavedObjectsSchema", {
  enumerable: true,
  get: function () {
    return _schema.SavedObjectsSchema;
  }
});
Object.defineProperty(exports, "SavedObjectsManagement", {
  enumerable: true,
  get: function () {
    return _management.SavedObjectsManagement;
  }
});
Object.defineProperty(exports, "exportSavedObjectsToStream", {
  enumerable: true,
  get: function () {
    return _export.exportSavedObjectsToStream;
  }
});
Object.defineProperty(exports, "SavedObjectsExportOptions", {
  enumerable: true,
  get: function () {
    return _export.SavedObjectsExportOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsExportResultDetails", {
  enumerable: true,
  get: function () {
    return _export.SavedObjectsExportResultDetails;
  }
});
Object.defineProperty(exports, "SavedObjectsSerializer", {
  enumerable: true,
  get: function () {
    return _serialization.SavedObjectsSerializer;
  }
});
Object.defineProperty(exports, "SavedObjectsRawDoc", {
  enumerable: true,
  get: function () {
    return _serialization.SavedObjectsRawDoc;
  }
});
Object.defineProperty(exports, "SavedObjectSanitizedDoc", {
  enumerable: true,
  get: function () {
    return _serialization.SavedObjectSanitizedDoc;
  }
});
Object.defineProperty(exports, "SavedObjectUnsanitizedDoc", {
  enumerable: true,
  get: function () {
    return _serialization.SavedObjectUnsanitizedDoc;
  }
});
Object.defineProperty(exports, "SavedObjectsMigrationLogger", {
  enumerable: true,
  get: function () {
    return _migration_logger.SavedObjectsMigrationLogger;
  }
});
Object.defineProperty(exports, "SavedObjectsService", {
  enumerable: true,
  get: function () {
    return _saved_objects_service.SavedObjectsService;
  }
});
Object.defineProperty(exports, "InternalSavedObjectsServiceStart", {
  enumerable: true,
  get: function () {
    return _saved_objects_service.InternalSavedObjectsServiceStart;
  }
});
Object.defineProperty(exports, "SavedObjectsServiceStart", {
  enumerable: true,
  get: function () {
    return _saved_objects_service.SavedObjectsServiceStart;
  }
});
Object.defineProperty(exports, "SavedObjectsServiceSetup", {
  enumerable: true,
  get: function () {
    return _saved_objects_service.SavedObjectsServiceSetup;
  }
});
Object.defineProperty(exports, "InternalSavedObjectsServiceSetup", {
  enumerable: true,
  get: function () {
    return _saved_objects_service.InternalSavedObjectsServiceSetup;
  }
});
Object.defineProperty(exports, "SavedObjectsRepositoryFactory", {
  enumerable: true,
  get: function () {
    return _saved_objects_service.SavedObjectsRepositoryFactory;
  }
});
Object.defineProperty(exports, "ISavedObjectsRepository", {
  enumerable: true,
  get: function () {
    return _repository.ISavedObjectsRepository;
  }
});
Object.defineProperty(exports, "SavedObjectsIncrementCounterOptions", {
  enumerable: true,
  get: function () {
    return _repository.SavedObjectsIncrementCounterOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsDeleteByNamespaceOptions", {
  enumerable: true,
  get: function () {
    return _repository.SavedObjectsDeleteByNamespaceOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsCoreFieldMapping", {
  enumerable: true,
  get: function () {
    return _mappings.SavedObjectsCoreFieldMapping;
  }
});
Object.defineProperty(exports, "SavedObjectsComplexFieldMapping", {
  enumerable: true,
  get: function () {
    return _mappings.SavedObjectsComplexFieldMapping;
  }
});
Object.defineProperty(exports, "SavedObjectsFieldMapping", {
  enumerable: true,
  get: function () {
    return _mappings.SavedObjectsFieldMapping;
  }
});
Object.defineProperty(exports, "SavedObjectsMappingProperties", {
  enumerable: true,
  get: function () {
    return _mappings.SavedObjectsMappingProperties;
  }
});
Object.defineProperty(exports, "SavedObjectsTypeMappingDefinition", {
  enumerable: true,
  get: function () {
    return _mappings.SavedObjectsTypeMappingDefinition;
  }
});
Object.defineProperty(exports, "SavedObjectsTypeMappingDefinitions", {
  enumerable: true,
  get: function () {
    return _mappings.SavedObjectsTypeMappingDefinitions;
  }
});
Object.defineProperty(exports, "SavedObjectMigrationMap", {
  enumerable: true,
  get: function () {
    return _migrations.SavedObjectMigrationMap;
  }
});
Object.defineProperty(exports, "SavedObjectMigrationFn", {
  enumerable: true,
  get: function () {
    return _migrations.SavedObjectMigrationFn;
  }
});
Object.defineProperty(exports, "SavedObjectMigrationContext", {
  enumerable: true,
  get: function () {
    return _migrations.SavedObjectMigrationContext;
  }
});
Object.defineProperty(exports, "SavedObjectsType", {
  enumerable: true,
  get: function () {
    return _types.SavedObjectsType;
  }
});
Object.defineProperty(exports, "SavedObjectsTypeManagementDefinition", {
  enumerable: true,
  get: function () {
    return _types.SavedObjectsTypeManagementDefinition;
  }
});
Object.defineProperty(exports, "savedObjectsConfig", {
  enumerable: true,
  get: function () {
    return _saved_objects_config.savedObjectsConfig;
  }
});
Object.defineProperty(exports, "savedObjectsMigrationConfig", {
  enumerable: true,
  get: function () {
    return _saved_objects_config.savedObjectsMigrationConfig;
  }
});
Object.defineProperty(exports, "SavedObjectTypeRegistry", {
  enumerable: true,
  get: function () {
    return _saved_objects_type_registry.SavedObjectTypeRegistry;
  }
});
Object.defineProperty(exports, "ISavedObjectTypeRegistry", {
  enumerable: true,
  get: function () {
    return _saved_objects_type_registry.ISavedObjectTypeRegistry;
  }
});

var _service = require("./service");

Object.keys(_service).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _service[key];
    }
  });
});

var _schema = require("./schema");

var _management = require("./management");

var _import = require("./import");

Object.keys(_import).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _import[key];
    }
  });
});

var _export = require("./export");

var _serialization = require("./serialization");

var _migration_logger = require("./migrations/core/migration_logger");

var _saved_objects_service = require("./saved_objects_service");

var _repository = require("./service/lib/repository");

var _mappings = require("./mappings");

var _migrations = require("./migrations");

var _types = require("./types");

var _saved_objects_config = require("./saved_objects_config");

var _saved_objects_type_registry = require("./saved_objects_type_registry");
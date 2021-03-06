"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldToName = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var availabilityZoneName = _i18n.i18n.translate('xpack.infra.groupByDisplayNames.availabilityZone', {
  defaultMessage: 'Availability zone'
});

var machineTypeName = _i18n.i18n.translate('xpack.infra.groupByDisplayNames.machineType', {
  defaultMessage: 'Machine type'
});

var fieldToName = function fieldToName(field) {
  var LOOKUP = {
    'kubernetes.namespace': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.kubernetesNamespace', {
      defaultMessage: 'Namespace'
    }),
    'kubernetes.node.name': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.kubernetesNodeName', {
      defaultMessage: 'Node'
    }),
    'host.name': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.hostName', {
      defaultMessage: 'Host'
    }),
    'cloud.availability_zone': availabilityZoneName,
    'cloud.machine.type': machineTypeName,
    'cloud.project.id': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.projectID', {
      defaultMessage: 'Project ID'
    }),
    'cloud.provider': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.provider', {
      defaultMessage: 'Cloud provider'
    }),
    'service.type': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.serviceType', {
      defaultMessage: 'Service type'
    }),
    'aws.cloud.availability_zone': availabilityZoneName,
    'aws.cloud.machine.type': machineTypeName,
    'aws.tags': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.tags', {
      defaultMessage: 'Tags'
    }),
    'aws.ec2.instance.image.id': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.image', {
      defaultMessage: 'Image'
    }),
    'aws.ec2.instance.state.name': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.state.name', {
      defaultMessage: 'State'
    }),
    'cloud.region': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.cloud.region', {
      defaultMessage: 'Region'
    }),
    'aws.rds.db_instance.class': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.rds.db_instance.class', {
      defaultMessage: 'Instance Class'
    }),
    'aws.rds.db_instance.status': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.rds.db_instance.status', {
      defaultMessage: 'Status'
    })
  };
  return LOOKUP[field] || field;
};

exports.fieldToName = fieldToName;
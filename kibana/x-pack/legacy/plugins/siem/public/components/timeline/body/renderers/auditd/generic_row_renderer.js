"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auditdRowRenderers = exports.createGenericFileRowRenderer = exports.createGenericAuditRowRenderer = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _row_renderer = require("../row_renderer");

var _generic_details = require("./generic_details");

var _generic_file_details = require("./generic_file_details");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var createGenericAuditRowRenderer = function createGenericAuditRowRenderer(_ref) {
  var actionName = _ref.actionName,
      text = _ref.text;
  return {
    isInstance: function isInstance(ecs) {
      var module = (0, _fp.get)('event.module[0]', ecs);
      var action = (0, _fp.get)('event.action[0]', ecs);
      return module != null && module.toLowerCase() === 'auditd' && action != null && action.toLowerCase() === actionName;
    },
    renderRow: function renderRow(_ref2) {
      var browserFields = _ref2.browserFields,
          data = _ref2.data,
          timelineId = _ref2.timelineId;
      return _react.default.createElement(_row_renderer.RowRendererContainer, null, _react.default.createElement(_generic_details.AuditdGenericDetails, {
        browserFields: browserFields,
        data: data,
        contextId: "".concat(actionName, "-").concat(timelineId),
        text: text,
        timelineId: timelineId
      }));
    }
  };
};

exports.createGenericAuditRowRenderer = createGenericAuditRowRenderer;

var createGenericFileRowRenderer = function createGenericFileRowRenderer(_ref3) {
  var actionName = _ref3.actionName,
      text = _ref3.text,
      _ref3$fileIcon = _ref3.fileIcon,
      fileIcon = _ref3$fileIcon === void 0 ? 'document' : _ref3$fileIcon;
  return {
    isInstance: function isInstance(ecs) {
      var module = (0, _fp.get)('event.module[0]', ecs);
      var action = (0, _fp.get)('event.action[0]', ecs);
      return module != null && module.toLowerCase() === 'auditd' && action != null && action.toLowerCase() === actionName;
    },
    renderRow: function renderRow(_ref4) {
      var browserFields = _ref4.browserFields,
          data = _ref4.data,
          timelineId = _ref4.timelineId;
      return _react.default.createElement(_row_renderer.RowRendererContainer, null, _react.default.createElement(_generic_file_details.AuditdGenericFileDetails, {
        browserFields: browserFields,
        data: data,
        contextId: "".concat(actionName, "-").concat(timelineId),
        text: text,
        fileIcon: fileIcon,
        timelineId: timelineId
      }));
    }
  };
}; // For a full list of where most these came from see this page:
// https://github.com/elastic/go-libaudit/blob/master/aucoalesce/normalizations.yaml


exports.createGenericFileRowRenderer = createGenericFileRowRenderer;
var auditdWasAuthorizedRowRenderer = createGenericAuditRowRenderer({
  actionName: 'was-authorized',
  text: i18n.WAS_AUTHORIZED_TO_USE
});
var auditdStartedSessionRowRenderer = createGenericAuditRowRenderer({
  actionName: 'started-session',
  text: i18n.STARTED
}); // TODO: Remove this once https://github.com/elastic/go-libaudit/issues/52
// is solved and no users are using this older logged-in

var auditdLoggedInDeprecatedRowRenderer = createGenericAuditRowRenderer({
  actionName: 'logged-in',
  text: i18n.ATTEMPTED_LOGIN
});
var auditdLoggedInRowRenderer = createGenericAuditRowRenderer({
  actionName: 'login',
  text: i18n.ATTEMPTED_LOGIN
});
var auditdExecutedRowRenderer = createGenericAuditRowRenderer({
  actionName: 'executed',
  text: i18n.EXECUTED
});
var auditdEndedFromRowRenderer = createGenericAuditRowRenderer({
  actionName: 'ended-session',
  text: i18n.ENDED_FROM
});
var auditdAcquiredCredentialsRowRenderer = createGenericAuditRowRenderer({
  actionName: 'acquired-credentials',
  text: i18n.ACQUIRED_CREDENTIALS_TO
});
var auditdDisposedCredentialsRowRenderer = createGenericAuditRowRenderer({
  actionName: 'disposed-credentials',
  text: i18n.DISPOSED_CREDENTIALS_TO
});
var auditdConnectedToRowRenderer = createGenericAuditRowRenderer({
  actionName: 'connected-to',
  text: i18n.CONNECTED_USING
});
var auditdOpenedFileRowRenderer = createGenericFileRowRenderer({
  actionName: 'opened-file',
  text: i18n.OPENED_FILE
}); // This doesn't produce a file.path so I use the generic row renderer

var auditdChangedFileAttributeOfRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-file-attributes-of',
  text: i18n.CHANGED_FILE_ATTRIBUTES_OF
});
var auditdChangedFilePermissionsOfRowRenderer = createGenericFileRowRenderer({
  actionName: 'changed-file-permissions-of',
  text: i18n.CHANGED_FILE_PERMISSIONS_OF
});
var auditdChangedFileOwnershipOfRowRenderer = createGenericFileRowRenderer({
  actionName: 'changed-file-ownership-of',
  text: i18n.CHANGED_FILE_OWNERSHIP_OF
}); // TODO: Not UI-tested

var auditdChangedKernelModuleRowRenderer = createGenericAuditRowRenderer({
  actionName: 'loaded-kernel-module',
  text: i18n.LOADED_KERNEL_MODULE
}); // TODO: Not UI-tested

var auditdUnloadedKernelModuleRowRenderer = createGenericAuditRowRenderer({
  actionName: 'unloaded-kernel-module',
  text: i18n.UNLOADED_KERNEL_MODULE_OF
});
var auditdCreatedDirectoryRowRenderer = createGenericFileRowRenderer({
  actionName: 'created-directory',
  text: i18n.CREATED_DIRECTORY,
  fileIcon: 'folderOpen'
});
var auditdMountedRowRenderer = createGenericFileRowRenderer({
  actionName: 'mounted',
  text: i18n.MOUNTED
});
var auditdRenamedRowRenderer = createGenericFileRowRenderer({
  actionName: 'renamed',
  text: i18n.RENAMED
});
var auditdCheckedMetaDataRowRenderer = createGenericFileRowRenderer({
  actionName: 'checked-metadata-of',
  text: i18n.CHECKED_METADATA_OF
});
var auditdCheckedFileSystemMetaDataRowRenderer = createGenericFileRowRenderer({
  actionName: 'checked-filesystem-metadata-of',
  text: i18n.CHECKED_FILE_SYSTEM_METADATA_OF
});
var auditdSymLinkedDataRowRenderer = createGenericFileRowRenderer({
  actionName: 'symlinked',
  text: i18n.SYMLINKED
}); // TODO: UI-Testing

var auditdUnmountedRowRenderer = createGenericFileRowRenderer({
  actionName: 'unmounted',
  text: i18n.UNMOUNTED
});
var auditdDeletedRowRenderer = createGenericFileRowRenderer({
  actionName: 'deleted',
  text: i18n.DELETED
});
var auditdChangedTimeStampOfRowRenderer = createGenericFileRowRenderer({
  actionName: 'changed-timestamp-of',
  text: i18n.CHANGED_TIME_STAMP_OF
}); // TODO: UI-Testing

var auditdListenForConnectionsRowRenderer = createGenericAuditRowRenderer({
  actionName: 'listen-for-connections',
  text: i18n.LISTEN_FOR_CONNECTIONS
});
var auditdBoundSocketRowRenderer = createGenericAuditRowRenderer({
  actionName: 'bound-socket',
  text: i18n.BOUND_SOCKET_FROM
});
var auditdReceivedFromRowRenderer = createGenericAuditRowRenderer({
  actionName: 'received-from',
  text: i18n.RECEIVED_FROM
});
var auditdSentToRowRenderer = createGenericAuditRowRenderer({
  actionName: 'sent-to',
  text: i18n.SENT_TO
});
var auditdKilledPidRowRenderer = createGenericAuditRowRenderer({
  actionName: 'killed-pid',
  text: i18n.KILLED_PROCESS_ID_OF
});
var auditdChangedIdentityRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-identity-of',
  text: i18n.CHANGED_IDENTITY_USING
}); // TODO: UI-Testing

var auditdChangedSystemTimeRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-system-time',
  text: i18n.CHANGED_SYSTEM_TIME_WITH
}); // TODO: UI-Testing

var auditdMakeDeviceRowRenderer = createGenericAuditRowRenderer({
  actionName: 'make-device',
  text: i18n.MADE_DEVICE_WITH
}); // TODO: UI-Testing

var auditdChangedSystemNameRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-system-name',
  text: i18n.CHANGED_SYSTEM_NAME
});
var auditdAllocatedMemoryRowRenderer = createGenericAuditRowRenderer({
  actionName: 'allocated-memory',
  text: i18n.ALLOCATED_MEMORY_FOR
}); // TODO: UI-Testing

var auditdSchedulingPolicyRowRenderer = createGenericAuditRowRenderer({
  actionName: 'adjusted-scheduling-policy-of',
  text: i18n.SCHEDULED_POLICY_OF
});
var auditdAddedUserAccountRowRenderer = createGenericAuditRowRenderer({
  actionName: 'added-user-account',
  text: i18n.ADDED_USER_ACCOUNT
}); // TODO: UI-Testing

var auditdCausedMacPolicyErrorRowRenderer = createGenericAuditRowRenderer({
  actionName: 'caused-mac-policy-error',
  text: i18n.CAUSED_MAC_POLICY_ERROR
}); // TODO: UI-Testing

var auditdloadedFirewallRuleErrorRowRenderer = createGenericAuditRowRenderer({
  actionName: 'loaded-firewall-rule-to',
  text: i18n.LOADED_FIREWALL_RULE
});
var auditdChangedPromiscuousModeRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-promiscuous-mode-on-device',
  text: i18n.CHANGED_PROMISCUOUS_MODE
}); // TODO: UI-Testing

var auditdLockedAccountModeRowRenderer = createGenericAuditRowRenderer({
  actionName: 'locked-account',
  text: i18n.LOCKED_ACCOUNT
}); // TODO: UI-Testing

var auditdUnLockedAccountModeRowRenderer = createGenericAuditRowRenderer({
  actionName: 'unlocked-account',
  text: i18n.UNLOCKED_ACCOUNT
}); // TODO: This could be more custom with account info coming from auditd.data.acct

var auditdAddedGroupAccountModeRowRenderer = createGenericAuditRowRenderer({
  actionName: 'added-group-account-to',
  text: i18n.ADDED_GROUP_ACCOUNT_USING
}); // TODO: UI-Testing

var auditdCrashedProgramRowRenderer = createGenericAuditRowRenderer({
  actionName: 'crashed-program',
  text: i18n.CRASHED_PROGRAM
}); // TODO: UI-Testing

var auditdAttemptedExecutionOfForbiddenProgramRowRenderer = createGenericAuditRowRenderer({
  actionName: 'attempted-execution-of-forbidden-program',
  text: i18n.EXECUTION_OF_FORBIDDEN_PROGRAM
}); // TODO: UI-Testing
// NOTE: This is misspelled due to this ticket: https://github.com/elastic/go-libaudit/issues/51
// This has to remain for forwards and backwards compatibility
// Once we customers do NOT have this misspelling anymore then we can change this out.

var auditdSuspiciousLinkDeprecatedRowRenderer = createGenericAuditRowRenderer({
  actionName: 'used-suspcious-link',
  text: i18n.USED_SUSPICIOUS_PROGRAM
}); // TODO: UI-Testing

var auditdSuspiciousLinkRowRenderer = createGenericAuditRowRenderer({
  actionName: 'used-suspicious-link',
  text: i18n.USED_SUSPICIOUS_PROGRAM
}); // TODO: UI-Testing
// NOTE: Remove this once this ticket is solved: https://github.com/elastic/go-libaudit/issues/52
// This has to remain for forwards and backwards compatibility until customers no longer have this string

var auditdFailedLoginDeprecatedTooManyTimesRowRenderer = createGenericAuditRowRenderer({
  actionName: 'failed-log-in-too-many-times-to',
  text: i18n.FAILED_LOGIN_TOO_MANY_TIMES
});
var auditdFailedLoginTooManyTimesRowRenderer = createGenericAuditRowRenderer({
  actionName: 'failed-login-too-many-times-to',
  text: i18n.FAILED_LOGIN_TOO_MANY_TIMES
}); // TODO: UI-Testing
// NOTE: Remove this once this ticket is solved: https://github.com/elastic/go-libaudit/issues/52
// This has to remain for forwards and backwards compatibility until customers no longer have this string

var auditdLoginFromUnusualDeprecatedPlaceToRowRenderer = createGenericAuditRowRenderer({
  actionName: 'attempted-log-in-from-unusual-place-to',
  text: i18n.ATTEMPTED_LOGIN_FROM_UNUSUAL_PLACE
}); // TODO: UI-Testing

var auditdLoginFromUnusualPlaceToRowRenderer = createGenericAuditRowRenderer({
  actionName: 'attempted-login-from-unusual-place-to',
  text: i18n.ATTEMPTED_LOGIN_FROM_UNUSUAL_PLACE
}); // TODO: UI-Testing

var auditdOpenTooManySessionsToRowRenderer = createGenericAuditRowRenderer({
  actionName: 'opened-too-many-sessions-to',
  text: i18n.OPENED_TOO_MANY_SESSIONS
}); // TODO: UI-Testing
// NOTE: Remove this once this ticket is solved: https://github.com/elastic/go-libaudit/issues/52
// This has to remain for forwards and backwards compatibility until customers no longer have this string

var auditdLoginFromDeprecatedUnusualHourRowRenderer = createGenericAuditRowRenderer({
  actionName: 'attempted-log-in-during-unusual-hour-to',
  text: i18n.ATTEMPTED_LOGIN_FROM_UNUSUAL_HOUR
}); // TODO: UI-Testing

var auditdLoginFromUnusualHourRowRenderer = createGenericAuditRowRenderer({
  actionName: 'attempted-login-during-unusual-hour-to',
  text: i18n.ATTEMPTED_LOGIN_FROM_UNUSUAL_HOUR
}); // TODO: UI-Testing

var auditdTestedFileSystemIntegoryOfRowRenderer = createGenericAuditRowRenderer({
  actionName: 'tested-file-system-integrity-of',
  text: i18n.TESTED_FILE_SYSTEM_INTEGRITY
}); // TODO: UI-Testing

var auditdViolatedSelinuxPolicyRowRenderer = createGenericAuditRowRenderer({
  actionName: 'violated-selinux-policy',
  text: i18n.VIOLATED_SELINUX_POLICY
}); // TODO: This could use better data such as auditd.data.operation

var auditdViolatedAppArmorPolicyRowRenderer = createGenericAuditRowRenderer({
  actionName: 'violated-apparmor-policy',
  text: i18n.VIOLATED_APP_ARMOR_POLICY_FROM
}); // TODO: UI-Testing

var auditdChangedGropuRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-group',
  text: i18n.CHANGED_GROUP
}); // TODO: UI-Testing

var auditdChangedUserIdRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-user-id',
  text: i18n.CHANGED_USER_ID
}); // TODO: UI-Testing
// NOTE: Remove once this ticket is solved: https://github.com/elastic/go-libaudit/issues/53

var auditdChangedAuditConfigurationDeprecatedRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-auditd-configuration',
  text: i18n.CHANGED_AUDIT_CONFIGURATION
}); // TODO: This should be custom -- Tested and does not work as is like this.

var auditdChangedAuditConfigurationRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-audit-configuration',
  text: i18n.CHANGED_AUDIT_CONFIGURATION
});
var auditdRefreshedCredentialsRowRenderer = createGenericAuditRowRenderer({
  actionName: 'refreshed-credentials',
  text: i18n.REFRESHED_CREDENTIALS_FOR
}); // TODO: UI-Testing

var auditdNegotiatedCryptoKeyRowRenderer = createGenericAuditRowRenderer({
  actionName: 'negotiated-crypto-key',
  text: i18n.NEGOTIATED_CRYPTO_KEY
}); // TODO: UI-Testing
// NOTE: Remove this once this ticket is solved: https://github.com/elastic/go-libaudit/issues/52
// This has to remain for forwards and backwards compatibility until customers no longer have this string

var auditdCryptoOfficerLoggednDeprecatedRowRenderer = createGenericAuditRowRenderer({
  actionName: 'crypto-officer-logged-in',
  text: i18n.CRYPTO_OFFICER_LOGGED_IN
});
var auditdCryptoOfficerLoggednRowRenderer = createGenericAuditRowRenderer({
  actionName: 'crypto-officer-login',
  text: i18n.CRYPTO_OFFICER_LOGGED_IN
}); // TODO: UI-Testing
// NOTE: Remove this once this ticket is solved: https://github.com/elastic/go-libaudit/issues/52
// This has to remain for forwards and backwards compatibility until customers no longer have this string

var auditdCryptoOfficerLoggedoutDeprecatedRowRenderer = createGenericAuditRowRenderer({
  actionName: 'crypto-officer-logged-out',
  text: i18n.CRYPTO_OFFICER_LOGGED_OUT
}); // TODO: UI-Testing

var auditdCryptoOfficerLoggedoutRowRenderer = createGenericAuditRowRenderer({
  actionName: 'crypto-officer-logout',
  text: i18n.CRYPTO_OFFICER_LOGGED_OUT
}); // TODO: UI-Testing

var auditdStartedCryptoSessionRowRenderer = createGenericAuditRowRenderer({
  actionName: 'started-crypto-session',
  text: i18n.STARTED_CRYPTO_SESSION
}); // TODO: UI-Testing

var auditdAccessResultRowRenderer = createGenericAuditRowRenderer({
  actionName: 'access-result',
  text: i18n.ACCESS_RESULT
}); // TODO: UI-Testing
// NOTE: Remove this once this ticket is solved: https://github.com/elastic/go-libaudit/issues/53
// This has to remain for forwards and backwards compatibility until customers no longer have this string

var auditdAbortedAuditDeprecatedStartupRowRenderer = createGenericAuditRowRenderer({
  actionName: 'aborted-auditd-startup',
  text: i18n.ABORTED_AUDIT_STARTUP
}); // TODO: UI-Testing

var auditdAbortedAuditStartupRowRenderer = createGenericAuditRowRenderer({
  actionName: 'aborted-audit-startup',
  text: i18n.ABORTED_AUDIT_STARTUP
}); // TODO: UI-Testing

var auditdRemoteAuditConnectedRowRenderer = createGenericAuditRowRenderer({
  actionName: 'remote-audit-connected',
  text: i18n.REMOTE_AUDIT_CONNECTED
}); // TODO: UI-Testing

var auditdRemoteAuditDisconnectedRowRenderer = createGenericAuditRowRenderer({
  actionName: 'remote-audit-disconnected',
  text: i18n.REMOTE_AUDIT_DISCONNECTED
}); // TODO: UI-Testing

var auditdShutdownAuditRowRenderer = createGenericAuditRowRenderer({
  actionName: 'shutdown-audit',
  text: i18n.SHUTDOWN_AUDIT
}); // TODO: UI-Testing

var auditdAuditErrorRowRenderer = createGenericAuditRowRenderer({
  actionName: 'audit-error',
  text: i18n.AUDIT_ERROR
}); // TODO: UI-Testing
// TODO: Remove once this ticket is solved: https://github.com/elastic/go-libaudit/issues/53

var auditdReconfiguredAuditDeprecatedRowRenderer = createGenericAuditRowRenderer({
  actionName: 'reconfigured-auditd',
  text: i18n.RECONFIGURED_AUDIT
}); // TODO: UI-Testing

var auditdReconfiguredAuditRowRenderer = createGenericAuditRowRenderer({
  actionName: 'reconfigured-audit',
  text: i18n.RECONFIGURED_AUDIT
}); // TODO: UI-Testing

var auditdResumedAuditLoggingRowRenderer = createGenericAuditRowRenderer({
  actionName: 'resumed-audit-logging',
  text: i18n.RESUMED_AUDIT_LOGGING
}); // TODO: UI-Testing

var auditdRotatedAuditLogsRowRenderer = createGenericAuditRowRenderer({
  actionName: 'rotated-audit-logs',
  text: i18n.ROTATED_AUDIT_LOGS
}); // TODO: UI-Testing

var auditdStartedAuditRowRenderer = createGenericAuditRowRenderer({
  actionName: 'started-audit',
  text: i18n.STARTED_AUDIT
});
var auditdDeletedGroupAccountFromRowRenderer = createGenericAuditRowRenderer({
  actionName: 'deleted-group-account-from',
  text: i18n.DELETED_GROUP_ACCOUNT_USING
});
var auditdDeletedUserAccountRowRenderer = createGenericAuditRowRenderer({
  actionName: 'deleted-user-account',
  text: i18n.DELETED_USER_ACCOUNT_USING
}); // TODO: UI-Testing

var auditdChangedAuditFeatureRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-audit-feature',
  text: i18n.CHANGED_AUDIT_FEATURE
}); // TODO: UI-Testing

var auditdRelabeledRowRenderer = createGenericAuditRowRenderer({
  actionName: 'relabeled-filesystem',
  text: i18n.RELABELED_FILESYSTEM
}); // TODO: UI-Testing

var auditdAuthenticatedToGroupRowRenderer = createGenericAuditRowRenderer({
  actionName: 'authenticated-to-group',
  text: i18n.AUTHENTICATED_TO_GROUP
}); // TODO: UI-Testing

var auditdChangedGroupPasswordRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-group-password',
  text: i18n.CHANGED_GROUP_PASSWORD
}); // TODO: UI-Testing

var auditdModifiedGroupAccountRowRenderer = createGenericAuditRowRenderer({
  actionName: 'modified-group-account',
  text: i18n.MODIFIED_GROUP_ACCOUNT
}); // TODO: UI-Testing

var auditdInitializedAuditSubsystemRowRenderer = createGenericAuditRowRenderer({
  actionName: 'initialized-audit-subsystem',
  text: i18n.INITIALIZED_AUDIT_SUBSYSTEM
}); // TODO: UI-Testing

var auditdModifiedLevelOfRowRenderer = createGenericAuditRowRenderer({
  actionName: 'modified-level-of',
  text: i18n.MODIFIED_LEVEL_OF
}); // TODO: UI-Testing

var auditdOverrodeLabelOfRowRenderer = createGenericAuditRowRenderer({
  actionName: 'overrode-label-of',
  text: i18n.OVERRODE_LABEL_OF
}); // TODO: UI-Testing

var auditdChangedLoginIdToRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-login-id-to',
  text: i18n.CHANGED_LOGIN_ID_TO
}); // TODO: UI-Testing

var auditdMacPermissionRowRenderer = createGenericAuditRowRenderer({
  actionName: 'mac-permission',
  text: i18n.MAC_PERMISSION
}); // TODO: UI-Testing

var auditdChangedSelinuxBooleanRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-selinux-boolean',
  text: i18n.CHANGED_SELINUX_BOOLEAN
}); // TODO: UI-Testing

var auditdLoadedSelinuxPolicyRowRenderer = createGenericAuditRowRenderer({
  actionName: 'loaded-selinux-policy',
  text: i18n.LOADED_SELINUX_POLICY
}); // TODO: UI-Testing

var auditdChangedSelinuxEnforcementRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-selinux-enforcement',
  text: i18n.CHANGED_SELINUX_ENFORCEMENT
}); // TODO: UI-Testing

var auditdAssignedUserRoleToRowRenderer = createGenericAuditRowRenderer({
  actionName: 'assigned-user-role-to',
  text: i18n.ASSIGNED_USER_ROLE_TO
}); // TODO: UI-Testing

var auditdModifiedRoleRowRenderer = createGenericAuditRowRenderer({
  actionName: 'modified-role',
  text: i18n.MODIFIED_ROLE
}); // TODO: UI-Testing
// TODO: This is misspelled and should be user. Remove this once we know
// no customers are using this older name from beats
// https://github.com/elastic/go-libaudit/issues/54

var auditdRemovedUserRoleDeprecatedFromRowRenderer = createGenericAuditRowRenderer({
  actionName: 'removed-use-role-from',
  text: i18n.REMOVED_USER_ROLE_FROM
}); // TODO: UI-Testing

var auditdRemovedUserRoleFromRowRenderer = createGenericAuditRowRenderer({
  actionName: 'removed-user-role-from',
  text: i18n.REMOVED_USER_ROLE_FROM
}); // TODO: UI-Testing

var auditdViolatedSeccompPolicyRowRenderer = createGenericAuditRowRenderer({
  actionName: 'violated-seccomp-policy',
  text: i18n.VIOLATED_SECCOMP_POLICY_WITH
}); // TODO: How do you get the service name? auditd.summary.object.primary kind of gives it sometimes
// TODO: Investigate a custom renderer for this at some point (or have it be more ECS compliant)

var auditdStartedServiceRowRenderer = createGenericAuditRowRenderer({
  actionName: 'started-service',
  text: i18n.STARTED_SERVICE
}); // TODO: How do you get the service name? auditd.summary.object.primary kind of gives it sometimes
// TODO: Investigate a custom renderer for this at some point (or have it be more ECS compliant)

var auditdStoppedServiceRowRenderer = createGenericAuditRowRenderer({
  actionName: 'stopped-service',
  text: i18n.STOPPED_SERVICE
}); // TODO: UI-Testing

var auditdBootedSystemRowRenderer = createGenericAuditRowRenderer({
  actionName: 'booted-system',
  text: i18n.BOOTED_SYSTEM
});
var auditdChangedToRunlevelRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-to-runlevel',
  text: i18n.CHANGED_TO_RUN_LEVEL_WITH
}); // TODO: UI-Testing

var auditdShutdownSystemRowRenderer = createGenericAuditRowRenderer({
  actionName: 'shutdown-system',
  text: i18n.SHUTDOWN_SYSTEM
}); // TODO: UI-Testing

var auditdSentTestRowRenderer = createGenericAuditRowRenderer({
  actionName: 'sent-test',
  text: i18n.SENT_TEST
}); // TODO: UI-Testing

var auditdUnknownRowRenderer = createGenericAuditRowRenderer({
  actionName: 'unknown',
  text: i18n.UNKNOWN
}); // TODO: UI-Testing

var auditdSentMessageRowRenderer = createGenericAuditRowRenderer({
  actionName: 'sent-message',
  text: i18n.SENT_MESSAGE
}); // TODO: UI-Testing

var auditdAccessPermissionRowRenderer = createGenericAuditRowRenderer({
  actionName: 'access-permission',
  text: i18n.ACCESS_PERMISSION
});
var auditdAuthenticated = createGenericAuditRowRenderer({
  actionName: 'authenticated',
  text: i18n.AUTHENTICATED_USING
});
var auditdChangedPasswordRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-password',
  text: i18n.CHANGED_PASSWORD_WITH
}); // TODO: This does not put its commands into process, so you have to write a custom
// renderer which shows it in from auditd.data.cmd or have the beat be more ECS compliant

var auditdRanCommandRowRenderer = createGenericAuditRowRenderer({
  actionName: 'ran-command',
  text: i18n.RAN_COMMAND
});
var auditdErrorRowRenderer = createGenericAuditRowRenderer({
  actionName: 'error',
  text: i18n.ERROR_FROM
}); // TODO: UI-Testing
// NOTE: Remove this once this ticket is solved: https://github.com/elastic/go-libaudit/issues/52

var auditdLoggedOutDeprecatedRowRenderer = createGenericAuditRowRenderer({
  actionName: 'logged-out',
  text: i18n.LOGGED_OUT
}); // TODO: UI-Testing

var auditdLoggedOutRowRenderer = createGenericAuditRowRenderer({
  actionName: 'logout',
  text: i18n.LOGGED_OUT
}); // TODO: UI-Testing

var auditdChangedMacConfigurationRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-mac-configuration',
  text: i18n.CHANGED_MAC_CONFIGURATION
}); // TODO: UI-Testing

var auditdLoadedMacPolicyRowRenderer = createGenericAuditRowRenderer({
  actionName: 'loaded-mac-policy',
  text: i18n.LOADED_MAC_POLICY
}); // TODO: UI-Testing

var auditdModifiedUserAccountRowRenderer = createGenericAuditRowRenderer({
  actionName: 'modified-user-account',
  text: i18n.MODIFIED_USER_ACCOUNT
});
var auditdChangedRoleToRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-role-to',
  text: i18n.CHANGED_ROLE_USING
}); // TODO: UI-Testing

var auditdAccessErrorRowRenderer = createGenericAuditRowRenderer({
  actionName: 'access-error',
  text: i18n.ACCESS_ERROR
});
var auditdChangedConfigurationRowRenderer = createGenericAuditRowRenderer({
  actionName: 'changed-configuration',
  text: i18n.CHANGED_CONFIGURATION_WITH
}); // TODO: UI-Testing

var auditdIssuedVmControlRowRenderer = createGenericAuditRowRenderer({
  actionName: 'issued-vm-control',
  text: i18n.ISSUED_VM_CONTROL
}); // TODO: UI-Testing

var auditdCreatedVmImageRowRenderer = createGenericAuditRowRenderer({
  actionName: 'created-vm-image',
  text: i18n.CREATED_VM_IMAGE
}); // TODO: UI-Testing

var auditdDeletedVmImageRowRenderer = createGenericAuditRowRenderer({
  actionName: 'deleted-vm-image',
  text: i18n.DELETED_VM_IMAGE
}); // TODO: UI-Testing

var auditdCheckedIntegrityOfRowRenderer = createGenericAuditRowRenderer({
  actionName: 'checked-integrity-of',
  text: i18n.CHECKED_INTEGRITY_OF
}); // TODO: UI-Testing

var auditdAssignedVmIdRowRenderer = createGenericAuditRowRenderer({
  actionName: 'assigned-vm-id',
  text: i18n.ASSIGNED_VM_ID
}); // TODO: UI-Testing

var auditdMigratedVmFromRowRenderer = createGenericAuditRowRenderer({
  actionName: 'migrated-vm-from',
  text: i18n.MIGRATED_VM_FROM
}); // TODO: UI-Testing

var auditdMigratedVmToRowRenderer = createGenericAuditRowRenderer({
  actionName: 'migrated-vm-to',
  text: i18n.MIGRATED_VM_TO
}); // TODO: UI-Testing

var auditdAssignedVmResourceRowRenderer = createGenericAuditRowRenderer({
  actionName: 'assigned-vm-resource',
  text: i18n.ASSIGNED_VM_RESOURCE
});
var auditdRowRenderers = [auditdExecutedRowRenderer, auditdLoggedInDeprecatedRowRenderer, auditdLoggedInRowRenderer, auditdWasAuthorizedRowRenderer, auditdAcquiredCredentialsRowRenderer, auditdEndedFromRowRenderer, auditdDisposedCredentialsRowRenderer, auditdStartedSessionRowRenderer, auditdConnectedToRowRenderer, auditdOpenedFileRowRenderer, auditdChangedFileAttributeOfRowRenderer, auditdChangedFilePermissionsOfRowRenderer, auditdChangedFileOwnershipOfRowRenderer, auditdChangedKernelModuleRowRenderer, auditdUnloadedKernelModuleRowRenderer, auditdCreatedDirectoryRowRenderer, auditdMountedRowRenderer, auditdRenamedRowRenderer, auditdCheckedMetaDataRowRenderer, auditdCheckedFileSystemMetaDataRowRenderer, auditdSymLinkedDataRowRenderer, auditdUnmountedRowRenderer, auditdDeletedRowRenderer, auditdChangedTimeStampOfRowRenderer, auditdListenForConnectionsRowRenderer, auditdBoundSocketRowRenderer, auditdReceivedFromRowRenderer, auditdSentToRowRenderer, auditdKilledPidRowRenderer, auditdChangedIdentityRowRenderer, auditdChangedSystemTimeRowRenderer, auditdMakeDeviceRowRenderer, auditdChangedSystemNameRowRenderer, auditdAllocatedMemoryRowRenderer, auditdSchedulingPolicyRowRenderer, auditdAddedUserAccountRowRenderer, auditdAddedGroupAccountModeRowRenderer, auditdAttemptedExecutionOfForbiddenProgramRowRenderer, auditdCausedMacPolicyErrorRowRenderer, auditdChangedPromiscuousModeRowRenderer, auditdCrashedProgramRowRenderer, auditdloadedFirewallRuleErrorRowRenderer, auditdLockedAccountModeRowRenderer, auditdSuspiciousLinkDeprecatedRowRenderer, auditdSuspiciousLinkRowRenderer, auditdUnLockedAccountModeRowRenderer, auditdFailedLoginDeprecatedTooManyTimesRowRenderer, auditdFailedLoginTooManyTimesRowRenderer, auditdLoginFromUnusualPlaceToRowRenderer, auditdOpenTooManySessionsToRowRenderer, auditdLoginFromUnusualDeprecatedPlaceToRowRenderer, auditdLoginFromDeprecatedUnusualHourRowRenderer, auditdLoginFromUnusualHourRowRenderer, auditdTestedFileSystemIntegoryOfRowRenderer, auditdViolatedSelinuxPolicyRowRenderer, auditdViolatedAppArmorPolicyRowRenderer, auditdChangedGropuRowRenderer, auditdChangedUserIdRowRenderer, auditdChangedAuditConfigurationRowRenderer, auditdRefreshedCredentialsRowRenderer, auditdNegotiatedCryptoKeyRowRenderer, auditdCryptoOfficerLoggednDeprecatedRowRenderer, auditdCryptoOfficerLoggednRowRenderer, auditdCryptoOfficerLoggedoutDeprecatedRowRenderer, auditdCryptoOfficerLoggedoutRowRenderer, auditdStartedCryptoSessionRowRenderer, auditdAccessResultRowRenderer, auditdAbortedAuditDeprecatedStartupRowRenderer, auditdAbortedAuditStartupRowRenderer, auditdRemoteAuditConnectedRowRenderer, auditdRemoteAuditDisconnectedRowRenderer, auditdShutdownAuditRowRenderer, auditdAuditErrorRowRenderer, auditdReconfiguredAuditDeprecatedRowRenderer, auditdReconfiguredAuditRowRenderer, auditdResumedAuditLoggingRowRenderer, auditdRotatedAuditLogsRowRenderer, auditdStartedAuditRowRenderer, auditdDeletedGroupAccountFromRowRenderer, auditdDeletedUserAccountRowRenderer, auditdChangedAuditFeatureRowRenderer, auditdRelabeledRowRenderer, auditdAuthenticatedToGroupRowRenderer, auditdChangedGroupPasswordRowRenderer, auditdModifiedGroupAccountRowRenderer, auditdInitializedAuditSubsystemRowRenderer, auditdModifiedLevelOfRowRenderer, auditdOverrodeLabelOfRowRenderer, auditdChangedLoginIdToRowRenderer, auditdMacPermissionRowRenderer, auditdChangedSelinuxBooleanRowRenderer, auditdLoadedSelinuxPolicyRowRenderer, auditdChangedSelinuxEnforcementRowRenderer, auditdAssignedUserRoleToRowRenderer, auditdModifiedRoleRowRenderer, auditdRemovedUserRoleDeprecatedFromRowRenderer, auditdRemovedUserRoleFromRowRenderer, auditdChangedAuditConfigurationDeprecatedRowRenderer, auditdViolatedSeccompPolicyRowRenderer, auditdStartedServiceRowRenderer, auditdStoppedServiceRowRenderer, auditdBootedSystemRowRenderer, auditdChangedToRunlevelRowRenderer, auditdShutdownSystemRowRenderer, auditdSentTestRowRenderer, auditdUnknownRowRenderer, auditdSentMessageRowRenderer, auditdAccessPermissionRowRenderer, auditdAuthenticated, auditdChangedPasswordRowRenderer, auditdRanCommandRowRenderer, auditdErrorRowRenderer, auditdLoggedOutDeprecatedRowRenderer, auditdLoggedOutRowRenderer, auditdChangedMacConfigurationRowRenderer, auditdLoadedMacPolicyRowRenderer, auditdModifiedUserAccountRowRenderer, auditdChangedRoleToRowRenderer, auditdAccessErrorRowRenderer, auditdChangedConfigurationRowRenderer, auditdIssuedVmControlRowRenderer, auditdCreatedVmImageRowRenderer, auditdDeletedVmImageRowRenderer, auditdCheckedIntegrityOfRowRenderer, auditdAssignedVmIdRowRenderer, auditdMigratedVmFromRowRenderer, auditdMigratedVmToRowRenderer, auditdAssignedVmResourceRowRenderer];
exports.auditdRowRenderers = auditdRowRenderers;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SENT_MESSAGE = exports.UNKNOWN = exports.SENT_TEST = exports.SHUTDOWN_SYSTEM = exports.CHANGED_TO_RUN_LEVEL_WITH = exports.BOOTED_SYSTEM = exports.STOPPED_SERVICE = exports.STARTED_SERVICE = exports.VIOLATED_SECCOMP_POLICY_WITH = exports.REMOVED_USER_ROLE_FROM = exports.MODIFIED_ROLE = exports.ASSIGNED_USER_ROLE_TO = exports.CHANGED_SELINUX_ENFORCEMENT = exports.LOADED_SELINUX_POLICY = exports.CHANGED_SELINUX_BOOLEAN = exports.MAC_PERMISSION = exports.CHANGED_LOGIN_ID_TO = exports.OVERRODE_LABEL_OF = exports.MODIFIED_LEVEL_OF = exports.INITIALIZED_AUDIT_SUBSYSTEM = exports.MODIFIED_GROUP_ACCOUNT = exports.CHANGED_GROUP_PASSWORD = exports.AUTHENTICATED_TO_GROUP = exports.RELABELED_FILESYSTEM = exports.CHANGED_AUDIT_FEATURE = exports.DELETED_USER_ACCOUNT_USING = exports.DELETED_GROUP_ACCOUNT_USING = exports.STARTED_AUDIT = exports.ROTATED_AUDIT_LOGS = exports.RESUMED_AUDIT_LOGGING = exports.RECONFIGURED_AUDIT = exports.AUDIT_ERROR = exports.SHUTDOWN_AUDIT = exports.REMOTE_AUDIT_DISCONNECTED = exports.REMOTE_AUDIT_CONNECTED = exports.ABORTED_AUDIT_STARTUP = exports.ACCESS_RESULT = exports.STARTED_CRYPTO_SESSION = exports.CRYPTO_OFFICER_LOGGED_OUT = exports.CRYPTO_OFFICER_LOGGED_IN = exports.NEGOTIATED_CRYPTO_KEY = exports.REFRESHED_CREDENTIALS_FOR = exports.CHANGED_AUDIT_CONFIGURATION = exports.CHANGED_USER_ID = exports.CHANGED_GROUP = exports.VIOLATED_APP_ARMOR_POLICY_FROM = exports.VIOLATED_SELINUX_POLICY = exports.TESTED_FILE_SYSTEM_INTEGRITY = exports.ATTEMPTED_LOGIN_FROM_UNUSUAL_HOUR = exports.OPENED_TOO_MANY_SESSIONS = exports.ATTEMPTED_LOGIN_FROM_UNUSUAL_PLACE = exports.FAILED_LOGIN_TOO_MANY_TIMES = exports.USED_SUSPICIOUS_PROGRAM = exports.EXECUTION_OF_FORBIDDEN_PROGRAM = exports.CRASHED_PROGRAM = exports.ADDED_GROUP_ACCOUNT_USING = exports.UNLOCKED_ACCOUNT = exports.LOCKED_ACCOUNT = exports.CHANGED_PROMISCUOUS_MODE = exports.LOADED_FIREWALL_RULE = exports.CAUSED_MAC_POLICY_ERROR = exports.ADDED_USER_ACCOUNT = exports.SCHEDULED_POLICY_OF = exports.ALLOCATED_MEMORY_FOR = exports.CHANGED_SYSTEM_NAME = exports.MADE_DEVICE_WITH = exports.CHANGED_SYSTEM_TIME_WITH = exports.CHANGED_IDENTITY_USING = exports.KILLED_PROCESS_ID_OF = exports.SENT_TO = exports.RECEIVED_FROM = exports.BOUND_SOCKET_FROM = exports.LISTEN_FOR_CONNECTIONS = exports.CHANGED_TIME_STAMP_OF = exports.DELETED = exports.UNMOUNTED = exports.SYMLINKED = exports.CHECKED_FILE_SYSTEM_METADATA_OF = exports.CHECKED_METADATA_OF = exports.RENAMED = exports.MOUNTED = exports.CREATED_DIRECTORY = exports.UNLOADED_KERNEL_MODULE_OF = exports.LOADED_KERNEL_MODULE = exports.CHANGED_FILE_OWNERSHIP_OF = exports.CHANGED_FILE_PERMISSIONS_OF = exports.CHANGED_FILE_ATTRIBUTES_OF = exports.OPENED_FILE = exports.USING = exports.CONNECTED_USING = exports.AS = exports.EXECUTED = exports.WITH_RESULT = exports.ATTEMPTED_LOGIN = exports.DISPOSED_CREDENTIALS_TO = exports.STARTED = exports.ENDED_FROM = exports.ACQUIRED_CREDENTIALS_TO = exports.WAS_AUTHORIZED_TO_USE = exports.SESSION = void 0;
exports.ASSIGNED_VM_RESOURCE = exports.MIGRATED_VM_TO = exports.MIGRATED_VM_FROM = exports.ASSIGNED_VM_ID = exports.CHECKED_INTEGRITY_OF = exports.DELETED_VM_IMAGE = exports.CREATED_VM_IMAGE = exports.ISSUED_VM_CONTROL = exports.CHANGED_CONFIGURATION_WITH = exports.ACCESS_ERROR = exports.CHANGED_ROLE_USING = exports.MODIFIED_USER_ACCOUNT = exports.LOADED_MAC_POLICY = exports.CHANGED_MAC_CONFIGURATION = exports.LOGGED_OUT = exports.ERROR_FROM = exports.RAN_COMMAND = exports.CHANGED_PASSWORD_WITH = exports.AUTHENTICATED_USING = exports.ACCESS_PERMISSION = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Note for translators and programmers
// Examples of these strings are all of the form
// Session {session.id} {primary} as {secondary}@{hostname} in {folder} was authorized to use {executable} with result {result.success/failure}
// E.x. Session 5 Frank as root@server-1 in /root was authorized to use wget with result success
// However, the strings can be dropped depending on the circumstances of the variables. For example, with no data at all
// Session 10
// Example with just a user name and hostname
// Session 20 frank@server-1
// Example with user name, hostname, but no result
// Session 20 frank@server-1 acquired credentials to curl
var SESSION = _i18n.i18n.translate('xpack.siem.auditd.sessionDescription', {
  defaultMessage: 'Session'
});

exports.SESSION = SESSION;

var WAS_AUTHORIZED_TO_USE = _i18n.i18n.translate('xpack.siem.auditd.wasAuthorizedToUseDescription', {
  defaultMessage: 'was authorized to use'
});

exports.WAS_AUTHORIZED_TO_USE = WAS_AUTHORIZED_TO_USE;

var ACQUIRED_CREDENTIALS_TO = _i18n.i18n.translate('xpack.siem.auditd.acquiredCredentialsDescription', {
  defaultMessage: 'acquired credentials to'
});

exports.ACQUIRED_CREDENTIALS_TO = ACQUIRED_CREDENTIALS_TO;

var ENDED_FROM = _i18n.i18n.translate('xpack.siem.auditd.endedFromDescription', {
  defaultMessage: 'ended from'
});

exports.ENDED_FROM = ENDED_FROM;

var STARTED = _i18n.i18n.translate('xpack.siem.auditd.startedAtDescription', {
  defaultMessage: 'started'
});

exports.STARTED = STARTED;

var DISPOSED_CREDENTIALS_TO = _i18n.i18n.translate('xpack.siem.auditd.disposedCredentialsDescription', {
  defaultMessage: 'disposed credentials to'
});

exports.DISPOSED_CREDENTIALS_TO = DISPOSED_CREDENTIALS_TO;

var ATTEMPTED_LOGIN = _i18n.i18n.translate('xpack.siem.auditd.attemptedLoginDescription', {
  defaultMessage: 'attempted a login via'
});

exports.ATTEMPTED_LOGIN = ATTEMPTED_LOGIN;

var WITH_RESULT = _i18n.i18n.translate('xpack.siem.auditd.withResultDescription', {
  defaultMessage: 'with result'
});

exports.WITH_RESULT = WITH_RESULT;

var EXECUTED = _i18n.i18n.translate('xpack.siem.auditd.executedDescription', {
  defaultMessage: 'executed'
});

exports.EXECUTED = EXECUTED;

var AS = _i18n.i18n.translate('xpack.siem.auditd.asDescription', {
  defaultMessage: 'as'
});

exports.AS = AS;

var CONNECTED_USING = _i18n.i18n.translate('xpack.siem.auditd.connectedUsingDescription', {
  defaultMessage: 'connected using'
});

exports.CONNECTED_USING = CONNECTED_USING;

var USING = _i18n.i18n.translate('xpack.siem.auditd.usingDescription', {
  defaultMessage: 'using'
});

exports.USING = USING;

var OPENED_FILE = _i18n.i18n.translate('xpack.siem.auditd.OpenedFileDescription', {
  defaultMessage: 'opened file'
});

exports.OPENED_FILE = OPENED_FILE;

var CHANGED_FILE_ATTRIBUTES_OF = _i18n.i18n.translate('xpack.siem.auditd.ChangedFileAttributesOfDescription', {
  defaultMessage: 'changed file attributes of'
});

exports.CHANGED_FILE_ATTRIBUTES_OF = CHANGED_FILE_ATTRIBUTES_OF;

var CHANGED_FILE_PERMISSIONS_OF = _i18n.i18n.translate('xpack.siem.auditd.changedFilePermissionOfDescription', {
  defaultMessage: 'changed file permissions of'
});

exports.CHANGED_FILE_PERMISSIONS_OF = CHANGED_FILE_PERMISSIONS_OF;

var CHANGED_FILE_OWNERSHIP_OF = _i18n.i18n.translate('xpack.siem.auditd.changeidleOwernshipOfDescription', {
  defaultMessage: 'changed file ownership of'
});

exports.CHANGED_FILE_OWNERSHIP_OF = CHANGED_FILE_OWNERSHIP_OF;

var LOADED_KERNEL_MODULE = _i18n.i18n.translate('xpack.siem.auditd.loaedKernelModuleOfDescription', {
  defaultMessage: 'loaded kernel module of'
});

exports.LOADED_KERNEL_MODULE = LOADED_KERNEL_MODULE;

var UNLOADED_KERNEL_MODULE_OF = _i18n.i18n.translate('xpack.siem.auditd.unloadedKernelModuleOfDescription', {
  defaultMessage: 'unloaded kernel module of'
});

exports.UNLOADED_KERNEL_MODULE_OF = UNLOADED_KERNEL_MODULE_OF;

var CREATED_DIRECTORY = _i18n.i18n.translate('xpack.siem.auditd.createdDirectoryDescription', {
  defaultMessage: 'created directory'
});

exports.CREATED_DIRECTORY = CREATED_DIRECTORY;

var MOUNTED = _i18n.i18n.translate('xpack.siem.auditd.mountedDescription', {
  defaultMessage: 'mounted'
});

exports.MOUNTED = MOUNTED;

var RENAMED = _i18n.i18n.translate('xpack.siem.auditd.renamedDescription', {
  defaultMessage: 'renamed'
});

exports.RENAMED = RENAMED;

var CHECKED_METADATA_OF = _i18n.i18n.translate('xpack.siem.auditd.chedckedMetaDataOfDescription', {
  defaultMessage: 'checked metadata of'
});

exports.CHECKED_METADATA_OF = CHECKED_METADATA_OF;

var CHECKED_FILE_SYSTEM_METADATA_OF = _i18n.i18n.translate('xpack.siem.auditd.checkedFileSystemMetadataOfDescription', {
  defaultMessage: 'checked filesystem metadata of'
});

exports.CHECKED_FILE_SYSTEM_METADATA_OF = CHECKED_FILE_SYSTEM_METADATA_OF;

var SYMLINKED = _i18n.i18n.translate('xpack.siem.auditd.symLinkedDescription', {
  defaultMessage: 'symbolically linked'
});

exports.SYMLINKED = SYMLINKED;

var UNMOUNTED = _i18n.i18n.translate('xpack.siem.auditd.unmountedDescription', {
  defaultMessage: 'unmounted'
});

exports.UNMOUNTED = UNMOUNTED;

var DELETED = _i18n.i18n.translate('xpack.siem.auditd.deletedDescription', {
  defaultMessage: 'deleted'
});

exports.DELETED = DELETED;

var CHANGED_TIME_STAMP_OF = _i18n.i18n.translate('xpack.siem.auditd.changedTimeStampOfDescription', {
  defaultMessage: 'changed time stamp of'
});

exports.CHANGED_TIME_STAMP_OF = CHANGED_TIME_STAMP_OF;

var LISTEN_FOR_CONNECTIONS = _i18n.i18n.translate('xpack.siem.auditd.ListeningForConnectionsUsingDescription', {
  defaultMessage: 'listening for connections using'
});

exports.LISTEN_FOR_CONNECTIONS = LISTEN_FOR_CONNECTIONS;

var BOUND_SOCKET_FROM = _i18n.i18n.translate('xpack.siem.auditd.boundSocketFromDescription', {
  defaultMessage: 'bound socket from'
});

exports.BOUND_SOCKET_FROM = BOUND_SOCKET_FROM;

var RECEIVED_FROM = _i18n.i18n.translate('xpack.siem.auditd.receivedFromDescription', {
  defaultMessage: 'received from'
});

exports.RECEIVED_FROM = RECEIVED_FROM;

var SENT_TO = _i18n.i18n.translate('xpack.siem.auditd.sentToDescription', {
  defaultMessage: 'sent to'
});

exports.SENT_TO = SENT_TO;

var KILLED_PROCESS_ID_OF = _i18n.i18n.translate('xpack.siem.auditd.killedProcessIdDescription', {
  defaultMessage: 'killed process id of'
});

exports.KILLED_PROCESS_ID_OF = KILLED_PROCESS_ID_OF;

var CHANGED_IDENTITY_USING = _i18n.i18n.translate('xpack.siem.auditd.changedIdentityUsingDescription', {
  defaultMessage: 'changed identity using'
});

exports.CHANGED_IDENTITY_USING = CHANGED_IDENTITY_USING;

var CHANGED_SYSTEM_TIME_WITH = _i18n.i18n.translate('xpack.siem.auditd.changedSystemTimeWithDescription', {
  defaultMessage: 'changed system time with'
});

exports.CHANGED_SYSTEM_TIME_WITH = CHANGED_SYSTEM_TIME_WITH;

var MADE_DEVICE_WITH = _i18n.i18n.translate('xpack.siem.auditd.madeDeviceWithDescription', {
  defaultMessage: 'made device with'
});

exports.MADE_DEVICE_WITH = MADE_DEVICE_WITH;

var CHANGED_SYSTEM_NAME = _i18n.i18n.translate('xpack.siem.auditd.changedSystemNameDescription', {
  defaultMessage: 'changed system name'
});

exports.CHANGED_SYSTEM_NAME = CHANGED_SYSTEM_NAME;

var ALLOCATED_MEMORY_FOR = _i18n.i18n.translate('xpack.siem.auditd.allocatedMemoryForDescription', {
  defaultMessage: 'allocated memory for'
});

exports.ALLOCATED_MEMORY_FOR = ALLOCATED_MEMORY_FOR;

var SCHEDULED_POLICY_OF = _i18n.i18n.translate('xpack.siem.auditd.scheduledPolicyOFDescription', {
  defaultMessage: 'scheduled policy of'
});

exports.SCHEDULED_POLICY_OF = SCHEDULED_POLICY_OF;

var ADDED_USER_ACCOUNT = _i18n.i18n.translate('xpack.siem.auditd.addedUserAccountDescription', {
  defaultMessage: 'added user account'
});

exports.ADDED_USER_ACCOUNT = ADDED_USER_ACCOUNT;

var CAUSED_MAC_POLICY_ERROR = _i18n.i18n.translate('xpack.siem.auditd.causedMacPolicyErrorDescription', {
  defaultMessage: 'caused mac policy error'
});

exports.CAUSED_MAC_POLICY_ERROR = CAUSED_MAC_POLICY_ERROR;

var LOADED_FIREWALL_RULE = _i18n.i18n.translate('xpack.siem.auditd.loadedFirewallRuleDescription', {
  defaultMessage: 'loaded firewall rule'
});

exports.LOADED_FIREWALL_RULE = LOADED_FIREWALL_RULE;

var CHANGED_PROMISCUOUS_MODE = _i18n.i18n.translate('xpack.siem.auditd.promiscuousModeDescription', {
  defaultMessage: 'changed promiscuous mode on the device using'
});

exports.CHANGED_PROMISCUOUS_MODE = CHANGED_PROMISCUOUS_MODE;

var LOCKED_ACCOUNT = _i18n.i18n.translate('xpack.siem.auditd.lockedAccountDescription', {
  defaultMessage: 'locked account'
});

exports.LOCKED_ACCOUNT = LOCKED_ACCOUNT;

var UNLOCKED_ACCOUNT = _i18n.i18n.translate('xpack.siem.auditd.unlockedAccountDescription', {
  defaultMessage: 'unlocked account'
});

exports.UNLOCKED_ACCOUNT = UNLOCKED_ACCOUNT;

var ADDED_GROUP_ACCOUNT_USING = _i18n.i18n.translate('xpack.siem.auditd.adddedGroupAccountUsingDescription', {
  defaultMessage: 'added group account using'
});

exports.ADDED_GROUP_ACCOUNT_USING = ADDED_GROUP_ACCOUNT_USING;

var CRASHED_PROGRAM = _i18n.i18n.translate('xpack.siem.auditd.crashedProgramDescription', {
  defaultMessage: 'crashed program'
});

exports.CRASHED_PROGRAM = CRASHED_PROGRAM;

var EXECUTION_OF_FORBIDDEN_PROGRAM = _i18n.i18n.translate('xpack.siem.auditd.executionOfForbiddenProgramDescription', {
  defaultMessage: 'execution of forbidden program'
});

exports.EXECUTION_OF_FORBIDDEN_PROGRAM = EXECUTION_OF_FORBIDDEN_PROGRAM;

var USED_SUSPICIOUS_PROGRAM = _i18n.i18n.translate('xpack.siem.auditd.suspiciousProgramDescription', {
  defaultMessage: 'used suspicious program'
});

exports.USED_SUSPICIOUS_PROGRAM = USED_SUSPICIOUS_PROGRAM;

var FAILED_LOGIN_TOO_MANY_TIMES = _i18n.i18n.translate('xpack.siem.auditd.failedLoginTooManyTimesDescription', {
  defaultMessage: 'failed login due to logging in too many times'
});

exports.FAILED_LOGIN_TOO_MANY_TIMES = FAILED_LOGIN_TOO_MANY_TIMES;

var ATTEMPTED_LOGIN_FROM_UNUSUAL_PLACE = _i18n.i18n.translate('xpack.siem.auditd.attemptedLoginFromUnusalPlaceDescription', {
  defaultMessage: 'attempted login from unusual place'
});

exports.ATTEMPTED_LOGIN_FROM_UNUSUAL_PLACE = ATTEMPTED_LOGIN_FROM_UNUSUAL_PLACE;

var OPENED_TOO_MANY_SESSIONS = _i18n.i18n.translate('xpack.siem.auditd.openedTooManySessionsDescription', {
  defaultMessage: 'opened too many sessions'
});

exports.OPENED_TOO_MANY_SESSIONS = OPENED_TOO_MANY_SESSIONS;

var ATTEMPTED_LOGIN_FROM_UNUSUAL_HOUR = _i18n.i18n.translate('xpack.siem.auditd.attemptedLoginFromUnusualHourDescription', {
  defaultMessage: 'attempted login from unusual hour'
});

exports.ATTEMPTED_LOGIN_FROM_UNUSUAL_HOUR = ATTEMPTED_LOGIN_FROM_UNUSUAL_HOUR;

var TESTED_FILE_SYSTEM_INTEGRITY = _i18n.i18n.translate('xpack.siem.auditd.testedFileSystemIntegrityDescription', {
  defaultMessage: 'tested file system integrity'
});

exports.TESTED_FILE_SYSTEM_INTEGRITY = TESTED_FILE_SYSTEM_INTEGRITY;

var VIOLATED_SELINUX_POLICY = _i18n.i18n.translate('xpack.siem.auditd.violatedSeLinuxPolicyDescription', {
  defaultMessage: 'violated selinux policy'
});

exports.VIOLATED_SELINUX_POLICY = VIOLATED_SELINUX_POLICY;

var VIOLATED_APP_ARMOR_POLICY_FROM = _i18n.i18n.translate('xpack.siem.auditd.violatedAppArmorPolicyFromDescription', {
  defaultMessage: 'violated app armor policy from'
});

exports.VIOLATED_APP_ARMOR_POLICY_FROM = VIOLATED_APP_ARMOR_POLICY_FROM;

var CHANGED_GROUP = _i18n.i18n.translate('xpack.siem.auditd.changedGroupDescription', {
  defaultMessage: 'changed group'
});

exports.CHANGED_GROUP = CHANGED_GROUP;

var CHANGED_USER_ID = _i18n.i18n.translate('xpack.siem.auditd.changedUserIdDescription', {
  defaultMessage: 'changed user id'
});

exports.CHANGED_USER_ID = CHANGED_USER_ID;

var CHANGED_AUDIT_CONFIGURATION = _i18n.i18n.translate('xpack.siem.auditd.changedAuditConfigurationDescription', {
  defaultMessage: 'changed audit configuration'
});

exports.CHANGED_AUDIT_CONFIGURATION = CHANGED_AUDIT_CONFIGURATION;

var REFRESHED_CREDENTIALS_FOR = _i18n.i18n.translate('xpack.siem.auditd.refreshedCredentialsForDescription', {
  defaultMessage: 'refreshed credentials for'
});

exports.REFRESHED_CREDENTIALS_FOR = REFRESHED_CREDENTIALS_FOR;

var NEGOTIATED_CRYPTO_KEY = _i18n.i18n.translate('xpack.siem.auditd.negotiatedCryptoKeyDescription', {
  defaultMessage: 'negotiated crypto key'
});

exports.NEGOTIATED_CRYPTO_KEY = NEGOTIATED_CRYPTO_KEY;

var CRYPTO_OFFICER_LOGGED_IN = _i18n.i18n.translate('xpack.siem.auditd.cryptoOfficerLoggedInDescription', {
  defaultMessage: 'crypto officer logged in'
});

exports.CRYPTO_OFFICER_LOGGED_IN = CRYPTO_OFFICER_LOGGED_IN;

var CRYPTO_OFFICER_LOGGED_OUT = _i18n.i18n.translate('xpack.siem.auditd.cryptoOfficerLoggedOutDescription', {
  defaultMessage: 'crypto officer logged out'
});

exports.CRYPTO_OFFICER_LOGGED_OUT = CRYPTO_OFFICER_LOGGED_OUT;

var STARTED_CRYPTO_SESSION = _i18n.i18n.translate('xpack.siem.auditd.startedCryptoSessionDescription', {
  defaultMessage: 'started crypto session'
});

exports.STARTED_CRYPTO_SESSION = STARTED_CRYPTO_SESSION;

var ACCESS_RESULT = _i18n.i18n.translate('xpack.siem.auditd.accessResultDescription', {
  defaultMessage: 'access result'
});

exports.ACCESS_RESULT = ACCESS_RESULT;

var ABORTED_AUDIT_STARTUP = _i18n.i18n.translate('xpack.siem.auditd.abortedAuditStartupDescription', {
  defaultMessage: 'aborted audit startup'
});

exports.ABORTED_AUDIT_STARTUP = ABORTED_AUDIT_STARTUP;

var REMOTE_AUDIT_CONNECTED = _i18n.i18n.translate('xpack.siem.auditd.remoteAuditConnectedDescription', {
  defaultMessage: 'remote audit connected'
});

exports.REMOTE_AUDIT_CONNECTED = REMOTE_AUDIT_CONNECTED;

var REMOTE_AUDIT_DISCONNECTED = _i18n.i18n.translate('xpack.siem.auditd.remoteAuditDisconnectedDescription', {
  defaultMessage: 'remote audit disconnected'
});

exports.REMOTE_AUDIT_DISCONNECTED = REMOTE_AUDIT_DISCONNECTED;

var SHUTDOWN_AUDIT = _i18n.i18n.translate('xpack.siem.auditd.shutDownAuditDescription', {
  defaultMessage: 'shutdown audit'
});

exports.SHUTDOWN_AUDIT = SHUTDOWN_AUDIT;

var AUDIT_ERROR = _i18n.i18n.translate('xpack.siem.auditd.auditErrorDescription', {
  defaultMessage: 'audit error'
});

exports.AUDIT_ERROR = AUDIT_ERROR;

var RECONFIGURED_AUDIT = _i18n.i18n.translate('xpack.siem.auditd.reconfiguredAuditDescription', {
  defaultMessage: 'reconfigured audit'
});

exports.RECONFIGURED_AUDIT = RECONFIGURED_AUDIT;

var RESUMED_AUDIT_LOGGING = _i18n.i18n.translate('xpack.siem.auditd.resumedAuditLoggingDescription', {
  defaultMessage: 'resumed audit logging'
});

exports.RESUMED_AUDIT_LOGGING = RESUMED_AUDIT_LOGGING;

var ROTATED_AUDIT_LOGS = _i18n.i18n.translate('xpack.siem.auditd.rotatedAuditLogsDescription', {
  defaultMessage: 'rotated-audit-logs'
});

exports.ROTATED_AUDIT_LOGS = ROTATED_AUDIT_LOGS;

var STARTED_AUDIT = _i18n.i18n.translate('xpack.siem.auditd.startedAuditDescription', {
  defaultMessage: 'started audit'
});

exports.STARTED_AUDIT = STARTED_AUDIT;

var DELETED_GROUP_ACCOUNT_USING = _i18n.i18n.translate('xpack.siem.auditd.deletedGroupAccountUsingDescription', {
  defaultMessage: 'deleted group account using'
});

exports.DELETED_GROUP_ACCOUNT_USING = DELETED_GROUP_ACCOUNT_USING;

var DELETED_USER_ACCOUNT_USING = _i18n.i18n.translate('xpack.siem.auditd.deletedUserAccountUsingDescription', {
  defaultMessage: 'deleted user account using'
});

exports.DELETED_USER_ACCOUNT_USING = DELETED_USER_ACCOUNT_USING;

var CHANGED_AUDIT_FEATURE = _i18n.i18n.translate('xpack.siem.auditd.changedAuditFeatureDescription', {
  defaultMessage: 'changed audit feature'
});

exports.CHANGED_AUDIT_FEATURE = CHANGED_AUDIT_FEATURE;

var RELABELED_FILESYSTEM = _i18n.i18n.translate('xpack.siem.auditd.relabeledFileSystemDescription', {
  defaultMessage: 'relabeled filesystem'
});

exports.RELABELED_FILESYSTEM = RELABELED_FILESYSTEM;

var AUTHENTICATED_TO_GROUP = _i18n.i18n.translate('xpack.siem.auditd.authenticatedToGroupDescription', {
  defaultMessage: 'authenticated to group'
});

exports.AUTHENTICATED_TO_GROUP = AUTHENTICATED_TO_GROUP;

var CHANGED_GROUP_PASSWORD = _i18n.i18n.translate('xpack.siem.auditd.changedGroupPasswordDescription', {
  defaultMessage: 'changed group password'
});

exports.CHANGED_GROUP_PASSWORD = CHANGED_GROUP_PASSWORD;

var MODIFIED_GROUP_ACCOUNT = _i18n.i18n.translate('xpack.siem.auditd.modifiedGroupAccountDescription', {
  defaultMessage: 'modified group account'
});

exports.MODIFIED_GROUP_ACCOUNT = MODIFIED_GROUP_ACCOUNT;

var INITIALIZED_AUDIT_SUBSYSTEM = _i18n.i18n.translate('xpack.siem.auditd.initializedAuditSubsystemDescription', {
  defaultMessage: 'initialized audit subsystem'
});

exports.INITIALIZED_AUDIT_SUBSYSTEM = INITIALIZED_AUDIT_SUBSYSTEM;

var MODIFIED_LEVEL_OF = _i18n.i18n.translate('xpack.siem.auditd.modifiedLevelOfDescription', {
  defaultMessage: 'modified level of'
});

exports.MODIFIED_LEVEL_OF = MODIFIED_LEVEL_OF;

var OVERRODE_LABEL_OF = _i18n.i18n.translate('xpack.siem.auditd.overrodeLabelOfDescription', {
  defaultMessage: 'overrode label of'
});

exports.OVERRODE_LABEL_OF = OVERRODE_LABEL_OF;

var CHANGED_LOGIN_ID_TO = _i18n.i18n.translate('xpack.siem.auditd.changedLoginIdToDescription', {
  defaultMessage: 'changed login id to'
});

exports.CHANGED_LOGIN_ID_TO = CHANGED_LOGIN_ID_TO;

var MAC_PERMISSION = _i18n.i18n.translate('xpack.siem.auditd.macPermissionDescription', {
  defaultMessage: 'mac permission'
});

exports.MAC_PERMISSION = MAC_PERMISSION;

var CHANGED_SELINUX_BOOLEAN = _i18n.i18n.translate('xpack.siem.auditd.changedSeLinuxBooleanDescription', {
  defaultMessage: 'changed selinux boolean'
});

exports.CHANGED_SELINUX_BOOLEAN = CHANGED_SELINUX_BOOLEAN;

var LOADED_SELINUX_POLICY = _i18n.i18n.translate('xpack.siem.auditd.loadedSeLinuxPolicyDescription', {
  defaultMessage: 'loaded selinux policy'
});

exports.LOADED_SELINUX_POLICY = LOADED_SELINUX_POLICY;

var CHANGED_SELINUX_ENFORCEMENT = _i18n.i18n.translate('xpack.siem.auditd.changedSelinuxEnforcementDescription', {
  defaultMessage: 'changed selinux enforcement'
});

exports.CHANGED_SELINUX_ENFORCEMENT = CHANGED_SELINUX_ENFORCEMENT;

var ASSIGNED_USER_ROLE_TO = _i18n.i18n.translate('xpack.siem.auditd.assignedUserRoleToDescription', {
  defaultMessage: 'assigned user role to'
});

exports.ASSIGNED_USER_ROLE_TO = ASSIGNED_USER_ROLE_TO;

var MODIFIED_ROLE = _i18n.i18n.translate('xpack.siem.auditd.modifiedRoleDescription', {
  defaultMessage: 'modified role'
});

exports.MODIFIED_ROLE = MODIFIED_ROLE;

var REMOVED_USER_ROLE_FROM = _i18n.i18n.translate('xpack.siem.auditd.removedUserRoleFromDescription', {
  defaultMessage: 'removed user role from'
});

exports.REMOVED_USER_ROLE_FROM = REMOVED_USER_ROLE_FROM;

var VIOLATED_SECCOMP_POLICY_WITH = _i18n.i18n.translate('xpack.siem.auditd.violatedSeccompPolicyWithDescription', {
  defaultMessage: 'violated seccomp policy with'
});

exports.VIOLATED_SECCOMP_POLICY_WITH = VIOLATED_SECCOMP_POLICY_WITH;

var STARTED_SERVICE = _i18n.i18n.translate('xpack.siem.auditd.startedServiceDescription', {
  defaultMessage: 'started service'
});

exports.STARTED_SERVICE = STARTED_SERVICE;

var STOPPED_SERVICE = _i18n.i18n.translate('xpack.siem.auditd.stoppedServiceDescription', {
  defaultMessage: 'stopped service'
});

exports.STOPPED_SERVICE = STOPPED_SERVICE;

var BOOTED_SYSTEM = _i18n.i18n.translate('xpack.siem.auditd.bootedSystemDescription', {
  defaultMessage: 'booted system'
});

exports.BOOTED_SYSTEM = BOOTED_SYSTEM;

var CHANGED_TO_RUN_LEVEL_WITH = _i18n.i18n.translate('xpack.siem.auditd.changedToRunLevelWithDescription', {
  defaultMessage: 'changed to run level with'
});

exports.CHANGED_TO_RUN_LEVEL_WITH = CHANGED_TO_RUN_LEVEL_WITH;

var SHUTDOWN_SYSTEM = _i18n.i18n.translate('xpack.siem.auditd.shutdownSystemDescription', {
  defaultMessage: 'shutdown system'
});

exports.SHUTDOWN_SYSTEM = SHUTDOWN_SYSTEM;

var SENT_TEST = _i18n.i18n.translate('xpack.siem.auditd.sentTestDescription', {
  defaultMessage: 'sent test'
});

exports.SENT_TEST = SENT_TEST;

var UNKNOWN = _i18n.i18n.translate('xpack.siem.auditd.unknownDescription', {
  defaultMessage: 'unknown'
});

exports.UNKNOWN = UNKNOWN;

var SENT_MESSAGE = _i18n.i18n.translate('xpack.siem.auditd.sentMessageDescription', {
  defaultMessage: 'sent message'
});

exports.SENT_MESSAGE = SENT_MESSAGE;

var ACCESS_PERMISSION = _i18n.i18n.translate('xpack.siem.auditd.accessPermissionDescription', {
  defaultMessage: 'access permission'
});

exports.ACCESS_PERMISSION = ACCESS_PERMISSION;

var AUTHENTICATED_USING = _i18n.i18n.translate('xpack.siem.auditd.authenticatedUsingDescription', {
  defaultMessage: 'authenticated using'
});

exports.AUTHENTICATED_USING = AUTHENTICATED_USING;

var CHANGED_PASSWORD_WITH = _i18n.i18n.translate('xpack.siem.auditd.changedPasswordWithDescription', {
  defaultMessage: 'changed password with'
});

exports.CHANGED_PASSWORD_WITH = CHANGED_PASSWORD_WITH;

var RAN_COMMAND = _i18n.i18n.translate('xpack.siem.auditd.ranCommandDescription', {
  defaultMessage: 'ran command'
});

exports.RAN_COMMAND = RAN_COMMAND;

var ERROR_FROM = _i18n.i18n.translate('xpack.siem.auditd.errorFromDescription', {
  defaultMessage: 'error from'
});

exports.ERROR_FROM = ERROR_FROM;

var LOGGED_OUT = _i18n.i18n.translate('xpack.siem.auditd.loggedOutDescription', {
  defaultMessage: 'logged out'
});

exports.LOGGED_OUT = LOGGED_OUT;

var CHANGED_MAC_CONFIGURATION = _i18n.i18n.translate('xpack.siem.auditd.changedMacConfigurationDescription', {
  defaultMessage: 'changed mac configuration'
});

exports.CHANGED_MAC_CONFIGURATION = CHANGED_MAC_CONFIGURATION;

var LOADED_MAC_POLICY = _i18n.i18n.translate('xpack.siem.auditd.loadedMacPolicyDescription', {
  defaultMessage: 'loaded mac policy'
});

exports.LOADED_MAC_POLICY = LOADED_MAC_POLICY;

var MODIFIED_USER_ACCOUNT = _i18n.i18n.translate('xpack.siem.auditd.modifiedUserAccountDescription', {
  defaultMessage: 'modified user account'
});

exports.MODIFIED_USER_ACCOUNT = MODIFIED_USER_ACCOUNT;

var CHANGED_ROLE_USING = _i18n.i18n.translate('xpack.siem.auditd.changedRoleUsingDescription', {
  defaultMessage: 'changed role using'
});

exports.CHANGED_ROLE_USING = CHANGED_ROLE_USING;

var ACCESS_ERROR = _i18n.i18n.translate('xpack.siem.auditd.accessErrorDescription', {
  defaultMessage: 'access error'
});

exports.ACCESS_ERROR = ACCESS_ERROR;

var CHANGED_CONFIGURATION_WITH = _i18n.i18n.translate('xpack.siem.auditd.changedConfigurationWIthDescription', {
  defaultMessage: 'changed configuration with'
});

exports.CHANGED_CONFIGURATION_WITH = CHANGED_CONFIGURATION_WITH;

var ISSUED_VM_CONTROL = _i18n.i18n.translate('xpack.siem.auditd.issuedVmControlDescription', {
  defaultMessage: 'issued vm control'
});

exports.ISSUED_VM_CONTROL = ISSUED_VM_CONTROL;

var CREATED_VM_IMAGE = _i18n.i18n.translate('xpack.siem.auditd.createdVmImageDescription', {
  defaultMessage: 'created vm image'
});

exports.CREATED_VM_IMAGE = CREATED_VM_IMAGE;

var DELETED_VM_IMAGE = _i18n.i18n.translate('xpack.siem.auditd.deletedVmImageDescription', {
  defaultMessage: 'deleted vm image'
});

exports.DELETED_VM_IMAGE = DELETED_VM_IMAGE;

var CHECKED_INTEGRITY_OF = _i18n.i18n.translate('xpack.siem.auditd.checkedIntegrityOfDescription', {
  defaultMessage: 'checked integrity of'
});

exports.CHECKED_INTEGRITY_OF = CHECKED_INTEGRITY_OF;

var ASSIGNED_VM_ID = _i18n.i18n.translate('xpack.siem.auditd.assignedVmIdDescription', {
  defaultMessage: 'assigned vm id'
});

exports.ASSIGNED_VM_ID = ASSIGNED_VM_ID;

var MIGRATED_VM_FROM = _i18n.i18n.translate('xpack.siem.auditd.migratedVmFromDescription', {
  defaultMessage: 'migrated vm from'
});

exports.MIGRATED_VM_FROM = MIGRATED_VM_FROM;

var MIGRATED_VM_TO = _i18n.i18n.translate('xpack.siem.auditd.migratedVmToDescription', {
  defaultMessage: 'migrated vm to'
});

exports.MIGRATED_VM_TO = MIGRATED_VM_TO;

var ASSIGNED_VM_RESOURCE = _i18n.i18n.translate('xpack.siem.auditd.assignedVMResourceDescription', {
  defaultMessage: 'assigned vm resource'
});

exports.ASSIGNED_VM_RESOURCE = ASSIGNED_VM_RESOURCE;
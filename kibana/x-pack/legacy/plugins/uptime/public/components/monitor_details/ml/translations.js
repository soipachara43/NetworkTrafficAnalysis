"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.START_TRAIL_DESC = exports.START_TRAIL = exports.CREAT_ML_JOB_DESC = exports.CANCEL_LABEL = exports.CREATE_NEW_JOB = exports.TAKE_SOME_TIME_TEXT = exports.ML_MANAGEMENT_PAGE = exports.VIEW_EXISTING_JOB = exports.MANAGE_ANOMALY_DETECTION = exports.DISABLE_ANOMALY_DETECTION = exports.ANOMALY_DETECTION = exports.ENABLE_ANOMALY_DETECTION = exports.EXPLORE_IN_ML_APP = exports.VIEW_JOB = exports.JOB_DELETION_CONFIRMATION = exports.JOB_DELETION_SUCCESS = exports.JOB_DELETION = exports.JOB_CREATION_FAILED_MESSAGE = exports.JOB_CREATION_FAILED = exports.JOB_CREATED_SUCCESS_MESSAGE = exports.JOB_CREATED_SUCCESS_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var JOB_CREATED_SUCCESS_TITLE = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.jobCreatedNotificationTitle', {
  defaultMessage: 'Job successfully created'
});

exports.JOB_CREATED_SUCCESS_TITLE = JOB_CREATED_SUCCESS_TITLE;

var JOB_CREATED_SUCCESS_MESSAGE = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.jobCreatedNotificationText', {
  defaultMessage: 'The analysis is now running for response duration chart. It might take a while before results are added to the response times graph.'
});

exports.JOB_CREATED_SUCCESS_MESSAGE = JOB_CREATED_SUCCESS_MESSAGE;

var JOB_CREATION_FAILED = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.jobCreationFailedNotificationTitle', {
  defaultMessage: 'Job creation failed'
});

exports.JOB_CREATION_FAILED = JOB_CREATION_FAILED;

var JOB_CREATION_FAILED_MESSAGE = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.jobCreationFailedNotificationText', {
  defaultMessage: 'Your current license may not allow for creating machine learning jobs, or this job may already exist.'
});

exports.JOB_CREATION_FAILED_MESSAGE = JOB_CREATION_FAILED_MESSAGE;

var JOB_DELETION = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.jobDeletionNotificationTitle', {
  defaultMessage: 'Job deleted'
});

exports.JOB_DELETION = JOB_DELETION;

var JOB_DELETION_SUCCESS = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.jobDeletionSuccessNotificationText', {
  defaultMessage: 'Job is successfully deleted'
});

exports.JOB_DELETION_SUCCESS = JOB_DELETION_SUCCESS;

var JOB_DELETION_CONFIRMATION = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.jobDeletionConfirmLabel', {
  defaultMessage: 'Delete anomaly detection job?'
});

exports.JOB_DELETION_CONFIRMATION = JOB_DELETION_CONFIRMATION;

var VIEW_JOB = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.jobCreatedNotificationText.viewJobLinkText', {
  defaultMessage: 'View job'
});

exports.VIEW_JOB = VIEW_JOB;

var EXPLORE_IN_ML_APP = _i18n.i18n.translate('xpack.uptime.ml.durationChart.exploreInMlApp', {
  defaultMessage: 'Explore in ML App'
});

exports.EXPLORE_IN_ML_APP = EXPLORE_IN_ML_APP;

var ENABLE_ANOMALY_DETECTION = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.enableAnomalyDetectionTitle', {
  defaultMessage: 'Enable anomaly detection'
});

exports.ENABLE_ANOMALY_DETECTION = ENABLE_ANOMALY_DETECTION;

var ANOMALY_DETECTION = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.anomalyDetectionTitle', {
  defaultMessage: 'Anomaly detection'
});

exports.ANOMALY_DETECTION = ANOMALY_DETECTION;

var DISABLE_ANOMALY_DETECTION = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.disableAnomalyDetectionTitle', {
  defaultMessage: 'Disable anomaly detection'
});

exports.DISABLE_ANOMALY_DETECTION = DISABLE_ANOMALY_DETECTION;

var MANAGE_ANOMALY_DETECTION = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.manageAnomalyDetectionTitle', {
  defaultMessage: 'Manage anomaly detection'
});

exports.MANAGE_ANOMALY_DETECTION = MANAGE_ANOMALY_DETECTION;

var VIEW_EXISTING_JOB = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.callout.jobExistsDescription.viewJobLinkText', {
  defaultMessage: 'View existing job'
});

exports.VIEW_EXISTING_JOB = VIEW_EXISTING_JOB;

var ML_MANAGEMENT_PAGE = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.manageMLJobDescription.mlJobsPageLinkText', {
  defaultMessage: 'Machine Learning jobs management page'
});

exports.ML_MANAGEMENT_PAGE = ML_MANAGEMENT_PAGE;

var TAKE_SOME_TIME_TEXT = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.manageMLJobDescription.noteText', {
  defaultMessage: 'Note: It might take a few minutes for the job to begin calculating results.'
});

exports.TAKE_SOME_TIME_TEXT = TAKE_SOME_TIME_TEXT;

var CREATE_NEW_JOB = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.createNewJobButtonLabel', {
  defaultMessage: 'Create new job'
});

exports.CREATE_NEW_JOB = CREATE_NEW_JOB;

var CANCEL_LABEL = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.cancelLabel', {
  defaultMessage: 'Cancel'
});

exports.CANCEL_LABEL = CANCEL_LABEL;

var CREAT_ML_JOB_DESC = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.createMLJobDescription', {
  defaultMessage: "Here you can create a machine learning job to calculate anomaly scores on\n    response durations for Uptime Monitor. Once enabled, the monitor duration chart on the details page\n    will show the expected bounds and annotate the graph with anomalies. You can also potentially\n     identify periods of increased latency across geographical regions."
});

exports.CREAT_ML_JOB_DESC = CREAT_ML_JOB_DESC;

var START_TRAIL = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.startTrial', {
  defaultMessage: 'Start free 14-day trial'
});

exports.START_TRAIL = START_TRAIL;

var START_TRAIL_DESC = _i18n.i18n.translate('xpack.uptime.ml.enableAnomalyDetectionPanel.startTrialDesc', {
  defaultMessage: 'In order to access duration anomaly detection, you have to be subscribed to an Elastic Platinum license.'
});

exports.START_TRAIL_DESC = START_TRAIL_DESC;
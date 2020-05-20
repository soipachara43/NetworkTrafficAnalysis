"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signalRulesAlertType = void 0;

var _perf_hooks = require("perf_hooks");

var _constants = require("../../../../common/constants");

var _ml_helpers = require("../../../../common/detection_engine/ml_helpers");

var _build_events_query = require("./build_events_query");

var _get_input_output_index = require("./get_input_output_index");

var _search_after_bulk_create = require("./search_after_bulk_create");

var _get_filter = require("./get_filter");

var _utils = require("./utils");

var _signal_params_schema = require("./signal_params_schema");

var _siem_rule_action_groups = require("./siem_rule_action_groups");

var _find_ml_signals = require("./find_ml_signals");

var _bulk_create_ml_signals = require("./bulk_create_ml_signals");

var _schedule_notification_actions = require("../notifications/schedule_notification_actions");

var _rule_status_service = require("./rule_status_service");

var _rule_messages = require("./rule_messages");

var _rule_status_saved_objects_client = require("./rule_status_saved_objects_client");

var _utils2 = require("../notifications/utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const signalRulesAlertType = ({
  logger,
  version,
  ml
}) => {
  return {
    id: _constants.SIGNALS_ID,
    name: 'SIEM signal',
    actionGroups: _siem_rule_action_groups.siemRuleActionGroups,
    defaultActionGroupId: 'default',
    validate: {
      params: (0, _signal_params_schema.signalParamsSchema)()
    },

    async executor({
      previousStartedAt,
      alertId,
      services,
      params
    }) {
      var _savedObject$updated_;

      const {
        anomalyThreshold,
        from,
        ruleId,
        index,
        filters,
        language,
        maxSignals,
        meta,
        machineLearningJobId,
        outputIndex,
        savedId,
        query,
        to,
        type
      } = params;
      const searchAfterSize = Math.min(maxSignals, _constants.DEFAULT_SEARCH_AFTER_PAGE_SIZE);
      let hasError = false;
      let result = {
        success: false,
        bulkCreateTimes: [],
        searchAfterTimes: [],
        lastLookBackDate: null,
        createdSignalsCount: 0
      };
      const ruleStatusClient = (0, _rule_status_saved_objects_client.ruleStatusSavedObjectsClientFactory)(services.savedObjectsClient);
      const ruleStatusService = await (0, _rule_status_service.ruleStatusServiceFactory)({
        alertId,
        ruleStatusClient
      });
      const savedObject = await services.savedObjectsClient.get('alert', alertId);
      const {
        actions,
        name,
        tags,
        createdAt,
        createdBy,
        updatedBy,
        enabled,
        schedule: {
          interval
        },
        throttle,
        params: ruleParams
      } = savedObject.attributes;
      const updatedAt = (_savedObject$updated_ = savedObject.updated_at) !== null && _savedObject$updated_ !== void 0 ? _savedObject$updated_ : '';
      const refresh = actions.length ? 'wait_for' : false;
      const buildRuleMessage = (0, _rule_messages.buildRuleMessageFactory)({
        id: alertId,
        ruleId,
        name,
        index: outputIndex
      });
      logger.debug(buildRuleMessage('[+] Starting Signal Rule execution'));
      await ruleStatusService.goingToRun();
      const gap = (0, _utils.getGapBetweenRuns)({
        previousStartedAt,
        interval,
        from,
        to
      });

      if (gap != null && gap.asMilliseconds() > 0) {
        const gapString = gap.humanize();
        const gapMessage = buildRuleMessage(`${gapString} (${gap.asMilliseconds()}ms) has passed since last rule execution, and signals may have been missed.`, 'Consider increasing your look behind time or adding more Kibana instances.');
        logger.warn(gapMessage);
        hasError = true;
        await ruleStatusService.error(gapMessage, {
          gap: gapString
        });
      }

      try {
        if ((0, _ml_helpers.isMlRule)(type)) {
          if (ml == null) {
            throw new Error('ML plugin unavailable during rule execution');
          }

          if (machineLearningJobId == null || anomalyThreshold == null) {
            throw new Error(['Machine learning rule is missing job id and/or anomaly threshold:', `job id: "${machineLearningJobId}"`, `anomaly threshold: "${anomalyThreshold}"`].join(' '));
          }

          const summaryJobs = await ml.jobServiceProvider(ml.mlClient.callAsInternalUser).jobsSummary([machineLearningJobId]);
          const jobSummary = summaryJobs.find(job => job.id === machineLearningJobId);

          if (jobSummary == null || !(0, _ml_helpers.isJobStarted)(jobSummary.jobState, jobSummary.datafeedState)) {
            const errorMessage = buildRuleMessage('Machine learning job is not started:', `job id: "${machineLearningJobId}"`, `job status: "${jobSummary === null || jobSummary === void 0 ? void 0 : jobSummary.jobState}"`, `datafeed status: "${jobSummary === null || jobSummary === void 0 ? void 0 : jobSummary.datafeedState}"`);
            logger.warn(errorMessage);
            hasError = true;
            await ruleStatusService.error(errorMessage);
          }

          const anomalyResults = await (0, _find_ml_signals.findMlSignals)(machineLearningJobId, anomalyThreshold, from, to, services.callCluster);
          const anomalyCount = anomalyResults.hits.hits.length;

          if (anomalyCount) {
            logger.info(buildRuleMessage(`Found ${anomalyCount} signals from ML anomalies.`));
          }

          const {
            success,
            bulkCreateDuration,
            createdItemsCount
          } = await (0, _bulk_create_ml_signals.bulkCreateMlSignals)({
            actions,
            throttle,
            someResult: anomalyResults,
            ruleParams: params,
            services,
            logger,
            id: alertId,
            signalsIndex: outputIndex,
            name,
            createdBy,
            createdAt,
            updatedBy,
            updatedAt,
            interval,
            enabled,
            refresh,
            tags
          });
          result.success = success;
          result.createdSignalsCount = createdItemsCount;

          if (bulkCreateDuration) {
            result.bulkCreateTimes.push(bulkCreateDuration);
          }
        } else {
          const inputIndex = await (0, _get_input_output_index.getInputIndex)(services, version, index);
          const esFilter = await (0, _get_filter.getFilter)({
            type,
            filters,
            language,
            query,
            savedId,
            services,
            index: inputIndex
          });
          const noReIndex = (0, _build_events_query.buildEventsSearchQuery)({
            index: inputIndex,
            from,
            to,
            filter: esFilter,
            size: searchAfterSize,
            searchAfterSortId: undefined
          });
          logger.debug(buildRuleMessage('[+] Initial search call'));

          const start = _perf_hooks.performance.now();

          const noReIndexResult = await services.callCluster('search', noReIndex);

          const end = _perf_hooks.performance.now();

          const signalCount = noReIndexResult.hits.total.value;

          if (signalCount !== 0) {
            logger.info(buildRuleMessage(`Found ${signalCount} signals from the indexes of "[${inputIndex.join(', ')}]"`));
          }

          result = await (0, _search_after_bulk_create.searchAfterAndBulkCreate)({
            someResult: noReIndexResult,
            ruleParams: params,
            services,
            logger,
            id: alertId,
            inputIndexPattern: inputIndex,
            signalsIndex: outputIndex,
            filter: esFilter,
            actions,
            name,
            createdBy,
            createdAt,
            updatedBy,
            updatedAt,
            interval,
            enabled,
            pageSize: searchAfterSize,
            refresh,
            tags,
            throttle
          });
          result.searchAfterTimes.push((0, _utils.makeFloatString)(end - start));
        }

        if (result.success) {
          if (actions.length) {
            var _parseScheduleDates, _parseScheduleDates2;

            const notificationRuleParams = { ...ruleParams,
              name,
              id: savedObject.id
            };
            const fromInMs = (_parseScheduleDates = (0, _utils.parseScheduleDates)(`now-${interval}`)) === null || _parseScheduleDates === void 0 ? void 0 : _parseScheduleDates.format('x');
            const toInMs = (_parseScheduleDates2 = (0, _utils.parseScheduleDates)('now')) === null || _parseScheduleDates2 === void 0 ? void 0 : _parseScheduleDates2.format('x');
            const resultsLink = (0, _utils2.getNotificationResultsLink)({
              from: fromInMs,
              to: toInMs,
              id: savedObject.id,
              kibanaSiemAppUrl: meta === null || meta === void 0 ? void 0 : meta.kibana_siem_app_url
            });
            logger.info(buildRuleMessage(`Found ${result.createdSignalsCount} signals for notification.`));

            if (result.createdSignalsCount) {
              const alertInstance = services.alertInstanceFactory(alertId);
              (0, _schedule_notification_actions.scheduleNotificationActions)({
                alertInstance,
                signalsCount: result.createdSignalsCount,
                resultsLink,
                ruleParams: notificationRuleParams
              });
            }
          }

          logger.debug(buildRuleMessage('[+] Signal Rule execution completed.'));

          if (!hasError) {
            var _result$lastLookBackD;

            await ruleStatusService.success('succeeded', {
              bulkCreateTimeDurations: result.bulkCreateTimes,
              searchAfterTimeDurations: result.searchAfterTimes,
              lastLookBackDate: (_result$lastLookBackD = result.lastLookBackDate) === null || _result$lastLookBackD === void 0 ? void 0 : _result$lastLookBackD.toISOString()
            });
          }
        } else {
          var _result$lastLookBackD2;

          const errorMessage = buildRuleMessage('Bulk Indexing of signals failed. Check logs for further details.');
          logger.error(errorMessage);
          await ruleStatusService.error(errorMessage, {
            bulkCreateTimeDurations: result.bulkCreateTimes,
            searchAfterTimeDurations: result.searchAfterTimes,
            lastLookBackDate: (_result$lastLookBackD2 = result.lastLookBackDate) === null || _result$lastLookBackD2 === void 0 ? void 0 : _result$lastLookBackD2.toISOString()
          });
        }
      } catch (error) {
        var _error$message, _result$lastLookBackD3;

        const errorMessage = (_error$message = error.message) !== null && _error$message !== void 0 ? _error$message : '(no error message given)';
        const message = buildRuleMessage('An error occurred during rule execution:', `message: "${errorMessage}"`);
        logger.error(message);
        await ruleStatusService.error(message, {
          bulkCreateTimeDurations: result.bulkCreateTimes,
          searchAfterTimeDurations: result.searchAfterTimes,
          lastLookBackDate: (_result$lastLookBackD3 = result.lastLookBackDate) === null || _result$lastLookBackD3 === void 0 ? void 0 : _result$lastLookBackD3.toISOString()
        });
      }
    }

  };
};

exports.signalRulesAlertType = signalRulesAlertType;
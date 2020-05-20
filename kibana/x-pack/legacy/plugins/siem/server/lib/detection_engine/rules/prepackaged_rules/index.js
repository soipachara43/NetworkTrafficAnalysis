"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rawRules = void 0;

var _response_to_a_post = _interopRequireDefault(require("./403_response_to_a_post.json"));

var _response_method_not_allowed = _interopRequireDefault(require("./405_response_method_not_allowed.json"));

var _elastic_endpoint_security_adversary_behavior_detected = _interopRequireDefault(require("./elastic_endpoint_security_adversary_behavior_detected.json"));

var _elastic_endpoint_security_cred_dumping_detected = _interopRequireDefault(require("./elastic_endpoint_security_cred_dumping_detected.json"));

var _elastic_endpoint_security_cred_dumping_prevented = _interopRequireDefault(require("./elastic_endpoint_security_cred_dumping_prevented.json"));

var _elastic_endpoint_security_cred_manipulation_detected = _interopRequireDefault(require("./elastic_endpoint_security_cred_manipulation_detected.json"));

var _elastic_endpoint_security_cred_manipulation_prevented = _interopRequireDefault(require("./elastic_endpoint_security_cred_manipulation_prevented.json"));

var _elastic_endpoint_security_exploit_detected = _interopRequireDefault(require("./elastic_endpoint_security_exploit_detected.json"));

var _elastic_endpoint_security_exploit_prevented = _interopRequireDefault(require("./elastic_endpoint_security_exploit_prevented.json"));

var _elastic_endpoint_security_malware_detected = _interopRequireDefault(require("./elastic_endpoint_security_malware_detected.json"));

var _elastic_endpoint_security_malware_prevented = _interopRequireDefault(require("./elastic_endpoint_security_malware_prevented.json"));

var _elastic_endpoint_security_permission_theft_detected = _interopRequireDefault(require("./elastic_endpoint_security_permission_theft_detected.json"));

var _elastic_endpoint_security_permission_theft_prevented = _interopRequireDefault(require("./elastic_endpoint_security_permission_theft_prevented.json"));

var _elastic_endpoint_security_process_injection_detected = _interopRequireDefault(require("./elastic_endpoint_security_process_injection_detected.json"));

var _elastic_endpoint_security_process_injection_prevented = _interopRequireDefault(require("./elastic_endpoint_security_process_injection_prevented.json"));

var _elastic_endpoint_security_ransomware_detected = _interopRequireDefault(require("./elastic_endpoint_security_ransomware_detected.json"));

var _elastic_endpoint_security_ransomware_prevented = _interopRequireDefault(require("./elastic_endpoint_security_ransomware_prevented.json"));

var _eql_adding_the_hidden_file_attribute_with_via_attribexe = _interopRequireDefault(require("./eql_adding_the_hidden_file_attribute_with_via_attribexe.json"));

var _eql_adobe_hijack_persistence = _interopRequireDefault(require("./eql_adobe_hijack_persistence.json"));

var _eql_clearing_windows_event_logs = _interopRequireDefault(require("./eql_clearing_windows_event_logs.json"));

var _eql_delete_volume_usn_journal_with_fsutil = _interopRequireDefault(require("./eql_delete_volume_usn_journal_with_fsutil.json"));

var _eql_deleting_backup_catalogs_with_wbadmin = _interopRequireDefault(require("./eql_deleting_backup_catalogs_with_wbadmin.json"));

var _eql_direct_outbound_smb_connection = _interopRequireDefault(require("./eql_direct_outbound_smb_connection.json"));

var _eql_disable_windows_firewall_rules_with_netsh = _interopRequireDefault(require("./eql_disable_windows_firewall_rules_with_netsh.json"));

var _eql_encoding_or_decoding_files_via_certutil = _interopRequireDefault(require("./eql_encoding_or_decoding_files_via_certutil.json"));

var _eql_local_scheduled_task_commands = _interopRequireDefault(require("./eql_local_scheduled_task_commands.json"));

var _eql_local_service_commands = _interopRequireDefault(require("./eql_local_service_commands.json"));

var _eql_msbuild_making_network_connections = _interopRequireDefault(require("./eql_msbuild_making_network_connections.json"));

var _eql_mshta_making_network_connections = _interopRequireDefault(require("./eql_mshta_making_network_connections.json"));

var _eql_psexec_lateral_movement_command = _interopRequireDefault(require("./eql_psexec_lateral_movement_command.json"));

var _eql_suspicious_ms_office_child_process = _interopRequireDefault(require("./eql_suspicious_ms_office_child_process.json"));

var _eql_suspicious_ms_outlook_child_process = _interopRequireDefault(require("./eql_suspicious_ms_outlook_child_process.json"));

var _eql_system_shells_via_services = _interopRequireDefault(require("./eql_system_shells_via_services.json"));

var _eql_unusual_network_connection_via_rundll = _interopRequireDefault(require("./eql_unusual_network_connection_via_rundll32.json"));

var _eql_unusual_parentchild_relationship = _interopRequireDefault(require("./eql_unusual_parentchild_relationship.json"));

var _eql_unusual_process_network_connection = _interopRequireDefault(require("./eql_unusual_process_network_connection.json"));

var _eql_user_account_creation = _interopRequireDefault(require("./eql_user_account_creation.json"));

var _eql_volume_shadow_copy_deletion_via_vssadmin = _interopRequireDefault(require("./eql_volume_shadow_copy_deletion_via_vssadmin.json"));

var _eql_volume_shadow_copy_deletion_via_wmic = _interopRequireDefault(require("./eql_volume_shadow_copy_deletion_via_wmic.json"));

var _eql_windows_script_executing_powershell = _interopRequireDefault(require("./eql_windows_script_executing_powershell.json"));

var _linux_anomalous_network_activity = _interopRequireDefault(require("./linux_anomalous_network_activity.json"));

var _linux_anomalous_network_port_activity = _interopRequireDefault(require("./linux_anomalous_network_port_activity.json"));

var _linux_anomalous_network_service = _interopRequireDefault(require("./linux_anomalous_network_service.json"));

var _linux_anomalous_network_url_activity = _interopRequireDefault(require("./linux_anomalous_network_url_activity.json"));

var _linux_anomalous_process_all_hosts = _interopRequireDefault(require("./linux_anomalous_process_all_hosts.json"));

var _linux_anomalous_user_name = _interopRequireDefault(require("./linux_anomalous_user_name.json"));

var _linux_hping_activity = _interopRequireDefault(require("./linux_hping_activity.json"));

var _linux_iodine_activity = _interopRequireDefault(require("./linux_iodine_activity.json"));

var _linux_kernel_module_activity = _interopRequireDefault(require("./linux_kernel_module_activity.json"));

var _linux_mknod_activity = _interopRequireDefault(require("./linux_mknod_activity.json"));

var _linux_netcat_network_connection = _interopRequireDefault(require("./linux_netcat_network_connection.json"));

var _linux_nmap_activity = _interopRequireDefault(require("./linux_nmap_activity.json"));

var _linux_nping_activity = _interopRequireDefault(require("./linux_nping_activity.json"));

var _linux_process_started_in_temp_directory = _interopRequireDefault(require("./linux_process_started_in_temp_directory.json"));

var _linux_shell_activity_by_web_server = _interopRequireDefault(require("./linux_shell_activity_by_web_server.json"));

var _linux_socat_activity = _interopRequireDefault(require("./linux_socat_activity.json"));

var _linux_strace_activity = _interopRequireDefault(require("./linux_strace_activity.json"));

var _linux_tcpdump_activity = _interopRequireDefault(require("./linux_tcpdump_activity.json"));

var _linux_whoami_commmand = _interopRequireDefault(require("./linux_whoami_commmand.json"));

var _network_dns_directly_to_the_internet = _interopRequireDefault(require("./network_dns_directly_to_the_internet.json"));

var _network_ftp_file_transfer_protocol_activity_to_the_internet = _interopRequireDefault(require("./network_ftp_file_transfer_protocol_activity_to_the_internet.json"));

var _network_irc_internet_relay_chat_protocol_activity_to_the_internet = _interopRequireDefault(require("./network_irc_internet_relay_chat_protocol_activity_to_the_internet.json"));

var _network_nat_traversal_port_activity = _interopRequireDefault(require("./network_nat_traversal_port_activity.json"));

var _network_port_26_activity = _interopRequireDefault(require("./network_port_26_activity.json"));

var _network_port_8000_activity_to_the_internet = _interopRequireDefault(require("./network_port_8000_activity_to_the_internet.json"));

var _network_pptp_point_to_point_tunneling_protocol_activity = _interopRequireDefault(require("./network_pptp_point_to_point_tunneling_protocol_activity.json"));

var _network_proxy_port_activity_to_the_internet = _interopRequireDefault(require("./network_proxy_port_activity_to_the_internet.json"));

var _network_rdp_remote_desktop_protocol_from_the_internet = _interopRequireDefault(require("./network_rdp_remote_desktop_protocol_from_the_internet.json"));

var _network_rdp_remote_desktop_protocol_to_the_internet = _interopRequireDefault(require("./network_rdp_remote_desktop_protocol_to_the_internet.json"));

var _network_rpc_remote_procedure_call_from_the_internet = _interopRequireDefault(require("./network_rpc_remote_procedure_call_from_the_internet.json"));

var _network_rpc_remote_procedure_call_to_the_internet = _interopRequireDefault(require("./network_rpc_remote_procedure_call_to_the_internet.json"));

var _network_smb_windows_file_sharing_activity_to_the_internet = _interopRequireDefault(require("./network_smb_windows_file_sharing_activity_to_the_internet.json"));

var _network_smtp_to_the_internet = _interopRequireDefault(require("./network_smtp_to_the_internet.json"));

var _network_sql_server_port_activity_to_the_internet = _interopRequireDefault(require("./network_sql_server_port_activity_to_the_internet.json"));

var _network_ssh_secure_shell_from_the_internet = _interopRequireDefault(require("./network_ssh_secure_shell_from_the_internet.json"));

var _network_ssh_secure_shell_to_the_internet = _interopRequireDefault(require("./network_ssh_secure_shell_to_the_internet.json"));

var _network_telnet_port_activity = _interopRequireDefault(require("./network_telnet_port_activity.json"));

var _network_tor_activity_to_the_internet = _interopRequireDefault(require("./network_tor_activity_to_the_internet.json"));

var _network_vnc_virtual_network_computing_from_the_internet = _interopRequireDefault(require("./network_vnc_virtual_network_computing_from_the_internet.json"));

var _network_vnc_virtual_network_computing_to_the_internet = _interopRequireDefault(require("./network_vnc_virtual_network_computing_to_the_internet.json"));

var _null_user_agent = _interopRequireDefault(require("./null_user_agent.json"));

var _packetbeat_dns_tunneling = _interopRequireDefault(require("./packetbeat_dns_tunneling.json"));

var _packetbeat_rare_dns_question = _interopRequireDefault(require("./packetbeat_rare_dns_question.json"));

var _packetbeat_rare_server_domain = _interopRequireDefault(require("./packetbeat_rare_server_domain.json"));

var _packetbeat_rare_urls = _interopRequireDefault(require("./packetbeat_rare_urls.json"));

var _packetbeat_rare_user_agent = _interopRequireDefault(require("./packetbeat_rare_user_agent.json"));

var _rare_process_by_host_linux = _interopRequireDefault(require("./rare_process_by_host_linux.json"));

var _rare_process_by_host_windows = _interopRequireDefault(require("./rare_process_by_host_windows.json"));

var _sqlmap_user_agent = _interopRequireDefault(require("./sqlmap_user_agent.json"));

var _suspicious_login_activity = _interopRequireDefault(require("./suspicious_login_activity.json"));

var _windows_anomalous_network_activity = _interopRequireDefault(require("./windows_anomalous_network_activity.json"));

var _windows_anomalous_path_activity = _interopRequireDefault(require("./windows_anomalous_path_activity.json"));

var _windows_anomalous_process_all_hosts = _interopRequireDefault(require("./windows_anomalous_process_all_hosts.json"));

var _windows_anomalous_process_creation = _interopRequireDefault(require("./windows_anomalous_process_creation.json"));

var _windows_anomalous_script = _interopRequireDefault(require("./windows_anomalous_script.json"));

var _windows_anomalous_service = _interopRequireDefault(require("./windows_anomalous_service.json"));

var _windows_anomalous_user_name = _interopRequireDefault(require("./windows_anomalous_user_name.json"));

var _windows_certutil_network_connection = _interopRequireDefault(require("./windows_certutil_network_connection.json"));

var _windows_command_prompt_connecting_to_the_internet = _interopRequireDefault(require("./windows_command_prompt_connecting_to_the_internet.json"));

var _windows_command_shell_started_by_powershell = _interopRequireDefault(require("./windows_command_shell_started_by_powershell.json"));

var _windows_command_shell_started_by_svchost = _interopRequireDefault(require("./windows_command_shell_started_by_svchost.json"));

var _windows_credential_dumping_msbuild = _interopRequireDefault(require("./windows_credential_dumping_msbuild.json"));

var _windows_cve_2020_ = _interopRequireDefault(require("./windows_cve_2020_0601.json"));

var _windows_defense_evasion_via_filter_manager = _interopRequireDefault(require("./windows_defense_evasion_via_filter_manager.json"));

var _windows_execution_msbuild_started_by_office_app = _interopRequireDefault(require("./windows_execution_msbuild_started_by_office_app.json"));

var _windows_execution_msbuild_started_by_script = _interopRequireDefault(require("./windows_execution_msbuild_started_by_script.json"));

var _windows_execution_msbuild_started_by_system_process = _interopRequireDefault(require("./windows_execution_msbuild_started_by_system_process.json"));

var _windows_execution_msbuild_started_renamed = _interopRequireDefault(require("./windows_execution_msbuild_started_renamed.json"));

var _windows_execution_msbuild_started_unusal_process = _interopRequireDefault(require("./windows_execution_msbuild_started_unusal_process.json"));

var _windows_execution_via_compiled_html_file = _interopRequireDefault(require("./windows_execution_via_compiled_html_file.json"));

var _windows_execution_via_net_com_assemblies = _interopRequireDefault(require("./windows_execution_via_net_com_assemblies.json"));

var _windows_execution_via_trusted_developer_utilities = _interopRequireDefault(require("./windows_execution_via_trusted_developer_utilities.json"));

var _windows_html_help_executable_program_connecting_to_the_internet = _interopRequireDefault(require("./windows_html_help_executable_program_connecting_to_the_internet.json"));

var _windows_injection_msbuild = _interopRequireDefault(require("./windows_injection_msbuild.json"));

var _windows_misc_lolbin_connecting_to_the_internet = _interopRequireDefault(require("./windows_misc_lolbin_connecting_to_the_internet.json"));

var _windows_modification_of_boot_config = _interopRequireDefault(require("./windows_modification_of_boot_config.json"));

var _windows_msxsl_network = _interopRequireDefault(require("./windows_msxsl_network.json"));

var _windows_net_command_system_account = _interopRequireDefault(require("./windows_net_command_system_account.json"));

var _windows_persistence_via_application_shimming = _interopRequireDefault(require("./windows_persistence_via_application_shimming.json"));

var _windows_priv_escalation_via_accessibility_features = _interopRequireDefault(require("./windows_priv_escalation_via_accessibility_features.json"));

var _windows_process_discovery_via_tasklist_command = _interopRequireDefault(require("./windows_process_discovery_via_tasklist_command.json"));

var _windows_rare_user_runas_event = _interopRequireDefault(require("./windows_rare_user_runas_event.json"));

var _windows_rare_user_type10_remote_login = _interopRequireDefault(require("./windows_rare_user_type10_remote_login.json"));

var _windows_register_server_program_connecting_to_the_internet = _interopRequireDefault(require("./windows_register_server_program_connecting_to_the_internet.json"));

var _windows_suspicious_pdf_reader = _interopRequireDefault(require("./windows_suspicious_pdf_reader.json"));

var _windows_uac_bypass_event_viewer = _interopRequireDefault(require("./windows_uac_bypass_event_viewer.json"));

var _windows_whoami_command_activity = _interopRequireDefault(require("./windows_whoami_command_activity.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Auto generated file from scripts/regen_prepackage_rules_index.sh
// Do not hand edit. Run that script to regenerate package information instead
const rawRules = [_response_to_a_post.default, _response_method_not_allowed.default, _elastic_endpoint_security_adversary_behavior_detected.default, _elastic_endpoint_security_cred_dumping_detected.default, _elastic_endpoint_security_cred_dumping_prevented.default, _elastic_endpoint_security_cred_manipulation_detected.default, _elastic_endpoint_security_cred_manipulation_prevented.default, _elastic_endpoint_security_exploit_detected.default, _elastic_endpoint_security_exploit_prevented.default, _elastic_endpoint_security_malware_detected.default, _elastic_endpoint_security_malware_prevented.default, _elastic_endpoint_security_permission_theft_detected.default, _elastic_endpoint_security_permission_theft_prevented.default, _elastic_endpoint_security_process_injection_detected.default, _elastic_endpoint_security_process_injection_prevented.default, _elastic_endpoint_security_ransomware_detected.default, _elastic_endpoint_security_ransomware_prevented.default, _eql_adding_the_hidden_file_attribute_with_via_attribexe.default, _eql_adobe_hijack_persistence.default, _eql_clearing_windows_event_logs.default, _eql_delete_volume_usn_journal_with_fsutil.default, _eql_deleting_backup_catalogs_with_wbadmin.default, _eql_direct_outbound_smb_connection.default, _eql_disable_windows_firewall_rules_with_netsh.default, _eql_encoding_or_decoding_files_via_certutil.default, _eql_local_scheduled_task_commands.default, _eql_local_service_commands.default, _eql_msbuild_making_network_connections.default, _eql_mshta_making_network_connections.default, _eql_psexec_lateral_movement_command.default, _eql_suspicious_ms_office_child_process.default, _eql_suspicious_ms_outlook_child_process.default, _eql_system_shells_via_services.default, _eql_unusual_network_connection_via_rundll.default, _eql_unusual_parentchild_relationship.default, _eql_unusual_process_network_connection.default, _eql_user_account_creation.default, _eql_volume_shadow_copy_deletion_via_vssadmin.default, _eql_volume_shadow_copy_deletion_via_wmic.default, _eql_windows_script_executing_powershell.default, _linux_anomalous_network_activity.default, _linux_anomalous_network_port_activity.default, _linux_anomalous_network_service.default, _linux_anomalous_network_url_activity.default, _linux_anomalous_process_all_hosts.default, _linux_anomalous_user_name.default, _linux_hping_activity.default, _linux_iodine_activity.default, _linux_kernel_module_activity.default, _linux_mknod_activity.default, _linux_netcat_network_connection.default, _linux_nmap_activity.default, _linux_nping_activity.default, _linux_process_started_in_temp_directory.default, _linux_shell_activity_by_web_server.default, _linux_socat_activity.default, _linux_strace_activity.default, _linux_tcpdump_activity.default, _linux_whoami_commmand.default, _network_dns_directly_to_the_internet.default, _network_ftp_file_transfer_protocol_activity_to_the_internet.default, _network_irc_internet_relay_chat_protocol_activity_to_the_internet.default, _network_nat_traversal_port_activity.default, _network_port_26_activity.default, _network_port_8000_activity_to_the_internet.default, _network_pptp_point_to_point_tunneling_protocol_activity.default, _network_proxy_port_activity_to_the_internet.default, _network_rdp_remote_desktop_protocol_from_the_internet.default, _network_rdp_remote_desktop_protocol_to_the_internet.default, _network_rpc_remote_procedure_call_from_the_internet.default, _network_rpc_remote_procedure_call_to_the_internet.default, _network_smb_windows_file_sharing_activity_to_the_internet.default, _network_smtp_to_the_internet.default, _network_sql_server_port_activity_to_the_internet.default, _network_ssh_secure_shell_from_the_internet.default, _network_ssh_secure_shell_to_the_internet.default, _network_telnet_port_activity.default, _network_tor_activity_to_the_internet.default, _network_vnc_virtual_network_computing_from_the_internet.default, _network_vnc_virtual_network_computing_to_the_internet.default, _null_user_agent.default, _packetbeat_dns_tunneling.default, _packetbeat_rare_dns_question.default, _packetbeat_rare_server_domain.default, _packetbeat_rare_urls.default, _packetbeat_rare_user_agent.default, _rare_process_by_host_linux.default, _rare_process_by_host_windows.default, _sqlmap_user_agent.default, _suspicious_login_activity.default, _windows_anomalous_network_activity.default, _windows_anomalous_path_activity.default, _windows_anomalous_process_all_hosts.default, _windows_anomalous_process_creation.default, _windows_anomalous_script.default, _windows_anomalous_service.default, _windows_anomalous_user_name.default, _windows_certutil_network_connection.default, _windows_command_prompt_connecting_to_the_internet.default, _windows_command_shell_started_by_powershell.default, _windows_command_shell_started_by_svchost.default, _windows_credential_dumping_msbuild.default, _windows_cve_2020_.default, _windows_defense_evasion_via_filter_manager.default, _windows_execution_msbuild_started_by_office_app.default, _windows_execution_msbuild_started_by_script.default, _windows_execution_msbuild_started_by_system_process.default, _windows_execution_msbuild_started_renamed.default, _windows_execution_msbuild_started_unusal_process.default, _windows_execution_via_compiled_html_file.default, _windows_execution_via_net_com_assemblies.default, _windows_execution_via_trusted_developer_utilities.default, _windows_html_help_executable_program_connecting_to_the_internet.default, _windows_injection_msbuild.default, _windows_misc_lolbin_connecting_to_the_internet.default, _windows_modification_of_boot_config.default, _windows_msxsl_network.default, _windows_net_command_system_account.default, _windows_persistence_via_application_shimming.default, _windows_priv_escalation_via_accessibility_features.default, _windows_process_discovery_via_tasklist_command.default, _windows_rare_user_runas_event.default, _windows_rare_user_type10_remote_login.default, _windows_register_server_program_connecting_to_the_internet.default, _windows_suspicious_pdf_reader.default, _windows_uac_bypass_event_viewer.default, _windows_whoami_command_activity.default];
exports.rawRules = rawRules;
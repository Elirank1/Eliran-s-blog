#!/usr/bin/env node

import dotenv from 'dotenv';
import { MeetingReminderWorkflow } from './workflows/meeting-reminder';
import { MonthlyDigestWorkflow } from './workflows/monthly-digest';
import { ClaudeToolkitMCPServer } from './mcp/server';

dotenv.config();

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'mcp';

  console.log('🤖 Claude Automation Toolkit');
  console.log('═'.repeat(50));

  if (mode === 'mcp') {
    // Start MCP server
    console.log('Starting in MCP server mode...\n');
    const server = new ClaudeToolkitMCPServer();
    await server.start();
  } else if (mode === 'workflows') {
    // Start workflows
    console.log('Starting automation workflows...\n');

    const meetingReminder = new MeetingReminderWorkflow(
      parseInt(process.env.MEETING_REMINDER_MINUTES || '10')
    );
    meetingReminder.start();

    const monthlyDigest = new MonthlyDigestWorkflow(
      parseInt(process.env.MONTHLY_DIGEST_DAY || '1')
    );
    monthlyDigest.start();

    console.log('\n✅ All workflows started successfully');
    console.log('Press Ctrl+C to stop\n');
  } else if (mode === 'test-digest') {
    // Test monthly digest
    console.log('Running monthly digest test...\n');
    const monthlyDigest = new MonthlyDigestWorkflow();
    await monthlyDigest.runNow();
  } else {
    console.log('Unknown mode. Available modes:');
    console.log('  - mcp (default): Start MCP server');
    console.log('  - workflows: Start automation workflows');
    console.log('  - test-digest: Run monthly digest test');
  }
}

main().catch(console.error);

// Export for programmatic use
export * from './types';
export * from './utils/claude';
export * from './integrations/whatsapp';
export * from './integrations/hubspot';
export * from './integrations/google-meet';
export * from './workflows/meeting-reminder';
export * from './workflows/monthly-digest';
export * from './mcp/server';

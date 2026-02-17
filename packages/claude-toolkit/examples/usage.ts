import {
  ClaudeClient,
  WhatsAppClient,
  HubSpotClient,
  GoogleMeetClient,
  MeetingReminderWorkflow,
  MonthlyDigestWorkflow
} from '../src';

/**
 * Example 1: Generate meeting context with Claude
 */
async function exampleGenerateContext() {
  const claude = new ClaudeClient();

  const meetingData = {
    title: 'Product Strategy Review',
    attendees: ['john@example.com', 'jane@example.com'],
    time: new Date()
  };

  const context = await claude.generateContext(meetingData);
  console.log('Meeting Context:', context);
}

/**
 * Example 2: Send WhatsApp reminder
 */
async function exampleWhatsAppReminder() {
  const whatsapp = new WhatsAppClient();

  await whatsapp.sendMeetingReminder(
    '+1234567890',
    'Team Standup',
    new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    'https://meet.google.com/abc-defg-hij'
  );

  console.log('WhatsApp reminder sent!');
}

/**
 * Example 3: Fetch HubSpot contacts
 */
async function exampleHubSpotContacts() {
  const hubspot = new HubSpotClient();

  const contacts = await hubspot.getContacts();
  console.log('HubSpot Contacts:', contacts);
}

/**
 * Example 4: Get upcoming meetings
 */
async function exampleUpcomingMeetings() {
  const googleMeet = new GoogleMeetClient();

  const meetings = await googleMeet.getUpcomingMeetings(24); // Next 24 hours
  console.log('Upcoming Meetings:', meetings);
}

/**
 * Example 5: Start meeting reminder workflow
 */
async function exampleMeetingReminderWorkflow() {
  const workflow = new MeetingReminderWorkflow(10); // 10 minutes before
  workflow.start();

  console.log('Meeting reminder workflow started!');
}

/**
 * Example 6: Generate monthly digest
 */
async function exampleMonthlyDigest() {
  const workflow = new MonthlyDigestWorkflow();
  await workflow.runNow();

  console.log('Monthly digest generated!');
}

// Run all examples
async function main() {
  console.log('🚀 Claude Toolkit Examples\n');

  try {
    console.log('1. Generate Context');
    await exampleGenerateContext();
    console.log('');

    console.log('2. WhatsApp Reminder');
    await exampleWhatsAppReminder();
    console.log('');

    console.log('3. HubSpot Contacts');
    await exampleHubSpotContacts();
    console.log('');

    console.log('4. Upcoming Meetings');
    await exampleUpcomingMeetings();
    console.log('');

    console.log('5. Monthly Digest');
    await exampleMonthlyDigest();
    console.log('');

    console.log('✅ All examples completed!');
  } catch (error) {
    console.error('Error:', error);
  }
}

if (require.main === module) {
  main();
}

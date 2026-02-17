import cron from 'node-cron';
import { ClaudeClient } from '../utils/claude';
import { GoogleMeetClient } from '../integrations/google-meet';
import { WhatsAppClient } from '../integrations/whatsapp';
import { HubSpotClient } from '../integrations/hubspot';

export class MeetingReminderWorkflow {
  private claude: ClaudeClient;
  private googleMeet: GoogleMeetClient;
  private whatsapp: WhatsAppClient;
  private hubspot: HubSpotClient;
  private reminderMinutes: number;

  constructor(reminderMinutes: number = 10) {
    this.claude = new ClaudeClient();
    this.googleMeet = new GoogleMeetClient();
    this.whatsapp = new WhatsAppClient();
    this.hubspot = new HubSpotClient();
    this.reminderMinutes = reminderMinutes;
  }

  async checkAndSendReminders(): Promise<void> {
    console.log('🔍 Checking for upcoming meetings...');

    const meetings = await this.googleMeet.getUpcomingMeetings(1);
    const now = new Date();

    for (const meeting of meetings) {
      const minutesUntilMeeting = (meeting.startTime.getTime() - now.getTime()) / (1000 * 60);

      if (minutesUntilMeeting <= this.reminderMinutes && minutesUntilMeeting > 0) {
        console.log(`📅 Meeting "${meeting.title}" starting in ${Math.round(minutesUntilMeeting)} minutes`);

        // Generate context with Claude
        const context = await this.claude.generateContext({
          meeting: meeting.title,
          time: meeting.startTime,
          attendees: meeting.attendees
        });

        // Send WhatsApp reminder
        await this.whatsapp.sendMeetingReminder(
          process.env.YOUR_PHONE_NUMBER || '+1234567890',
          meeting.title,
          meeting.startTime,
          meeting.meetLink || 'No link'
        );

        console.log(`✅ Reminder sent for: ${meeting.title}`);
        console.log(`📝 Context: ${context}`);
      }
    }
  }

  start(): void {
    console.log(`🚀 Starting meeting reminder workflow (${this.reminderMinutes} min before meetings)`);

    // Check every 5 minutes
    cron.schedule('*/5 * * * *', async () => {
      await this.checkAndSendReminders();
    });
  }
}

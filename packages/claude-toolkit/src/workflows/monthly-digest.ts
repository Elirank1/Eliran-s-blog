import cron from 'node-cron';
import { ClaudeClient } from '../utils/claude';
import { HubSpotClient } from '../integrations/hubspot';
import { WhatsAppClient } from '../integrations/whatsapp';

export class MonthlyDigestWorkflow {
  private claude: ClaudeClient;
  private hubspot: HubSpotClient;
  private whatsapp: WhatsAppClient;
  private dayOfMonth: number;

  constructor(dayOfMonth: number = 1) {
    this.claude = new ClaudeClient();
    this.hubspot = new HubSpotClient();
    this.whatsapp = new WhatsAppClient();
    this.dayOfMonth = dayOfMonth;
  }

  async generateAndSendDigest(): Promise<void> {
    console.log('📊 Generating monthly digest...');

    try {
      // Get activities from HubSpot
      const activities = await this.hubspot.getMonthlyActivities();

      // Generate digest with Claude
      const digest = await this.claude.generateMonthlyDigest(activities);

      console.log('\n📈 Monthly Digest:\n', digest);

      // Send via WhatsApp
      await this.whatsapp.sendMessage(
        process.env.YOUR_PHONE_NUMBER || '+1234567890',
        `📊 Monthly CRM Digest\n\n${digest}`
      );

      console.log('✅ Monthly digest sent successfully');
    } catch (error) {
      console.error('❌ Error generating monthly digest:', error);
    }
  }

  start(): void {
    console.log(`🚀 Starting monthly digest workflow (runs on day ${this.dayOfMonth} of each month)`);

    // Run on the specified day of each month at 9 AM
    const cronExpression = `0 9 ${this.dayOfMonth} * *`;

    cron.schedule(cronExpression, async () => {
      await this.generateAndSendDigest();
    });
  }

  // For testing: run immediately
  async runNow(): Promise<void> {
    await this.generateAndSendDigest();
  }
}

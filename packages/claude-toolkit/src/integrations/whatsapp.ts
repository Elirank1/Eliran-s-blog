import { WhatsAppMessage } from '../types';

/**
 * WhatsApp Integration
 *
 * This is a mock implementation. To use in production:
 * 1. Sign up for WhatsApp Business API
 * 2. Get credentials from providers like Twilio, MessageBird, or WhatsApp Cloud API
 * 3. Replace the mock methods with real API calls
 */

export class WhatsAppClient {
  private apiKey: string;
  private phoneNumberId: string;

  constructor(apiKey?: string, phoneNumberId?: string) {
    this.apiKey = apiKey || process.env.WHATSAPP_API_KEY || 'MOCK_API_KEY';
    this.phoneNumberId = phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID || 'MOCK_PHONE_ID';
  }

  async sendMessage(to: string, message: string): Promise<WhatsAppMessage> {
    // Mock implementation
    console.log(`[WhatsApp Mock] Sending to ${to}: ${message}`);

    // In production, you would call the WhatsApp API here:
    // const response = await fetch('https://graph.facebook.com/v18.0/{phone-number-id}/messages', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${this.apiKey}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     messaging_product: 'whatsapp',
    //     to: to,
    //     text: { body: message }
    //   })
    // });

    return {
      to,
      message,
      timestamp: new Date()
    };
  }

  async sendMeetingReminder(to: string, meetingTitle: string, startTime: Date, meetLink: string): Promise<void> {
    const timeUntilMeeting = Math.floor((startTime.getTime() - Date.now()) / (1000 * 60));
    const message = `🔔 Meeting Reminder\n\n📅 ${meetingTitle}\n⏰ Starting in ${timeUntilMeeting} minutes\n🔗 Join: ${meetLink}`;

    await this.sendMessage(to, message);
  }
}

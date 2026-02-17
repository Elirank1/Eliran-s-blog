import Anthropic from '@anthropic-ai/sdk';

export class ClaudeClient {
  private client: Anthropic;

  constructor(apiKey?: string) {
    this.client = new Anthropic({
      apiKey: apiKey || process.env.ANTHROPIC_API_KEY
    });
  }

  async generateContext(data: any): Promise<string> {
    const message = await this.client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Generate a concise meeting context summary from this data:\n\n${JSON.stringify(data, null, 2)}`
      }]
    });

    return message.content[0].type === 'text' ? message.content[0].text : '';
  }

  async summarizeConversation(messages: string[]): Promise<string> {
    const message = await this.client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `Summarize these meeting notes:\n\n${messages.join('\n\n')}`
      }]
    });

    return message.content[0].type === 'text' ? message.content[0].text : '';
  }

  async generateMonthlyDigest(activities: any[]): Promise<string> {
    const message = await this.client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `Create a monthly digest report from this CRM data:\n\n${JSON.stringify(activities, null, 2)}`
      }]
    });

    return message.content[0].type === 'text' ? message.content[0].text : '';
  }
}

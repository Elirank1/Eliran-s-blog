import { Contact } from '../types';

/**
 * HubSpot Integration
 *
 * This is a mock implementation. To use in production:
 * 1. Create a HubSpot account and app
 * 2. Get your API key from HubSpot settings
 * 3. Replace the mock methods with real API calls
 */

export class HubSpotClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.HUBSPOT_API_KEY || 'MOCK_API_KEY';
  }

  async getContacts(): Promise<Contact[]> {
    // Mock implementation
    console.log('[HubSpot Mock] Fetching contacts...');

    // In production, you would call the HubSpot API here:
    // const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    //   headers: {
    //     'Authorization': `Bearer ${this.apiKey}`
    //   }
    // });

    return [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        company: 'Acme Corp',
        hubspotId: 'hs_001'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1234567891',
        company: 'TechStart Inc',
        hubspotId: 'hs_002'
      }
    ];
  }

  async getContactById(id: string): Promise<Contact | null> {
    console.log(`[HubSpot Mock] Fetching contact ${id}...`);

    const contacts = await this.getContacts();
    return contacts.find(c => c.id === id || c.hubspotId === id) || null;
  }

  async updateContact(id: string, data: Partial<Contact>): Promise<Contact> {
    console.log(`[HubSpot Mock] Updating contact ${id}:`, data);

    // Mock updated contact
    return {
      id,
      name: data.name || 'Updated Name',
      email: data.email || 'updated@example.com',
      ...data
    } as Contact;
  }

  async getMonthlyActivities(): Promise<any[]> {
    console.log('[HubSpot Mock] Fetching monthly activities...');

    return [
      {
        type: 'meeting',
        title: 'Product Demo',
        date: new Date(),
        contact: 'John Doe'
      },
      {
        type: 'email',
        title: 'Follow-up email sent',
        date: new Date(),
        contact: 'Jane Smith'
      }
    ];
  }
}

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { ClaudeClient } from '../utils/claude';
import { GoogleMeetClient } from '../integrations/google-meet';
import { HubSpotClient } from '../integrations/hubspot';
import { WhatsAppClient } from '../integrations/whatsapp';
import { MCPTool } from '../types';

export class ClaudeToolkitMCPServer {
  private server: Server;
  private claude: ClaudeClient;
  private googleMeet: GoogleMeetClient;
  private hubspot: HubSpotClient;
  private whatsapp: WhatsAppClient;
  private tools: MCPTool[];

  constructor() {
    this.server = new Server(
      {
        name: 'claude-toolkit',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.claude = new ClaudeClient();
    this.googleMeet = new GoogleMeetClient();
    this.hubspot = new HubSpotClient();
    this.whatsapp = new WhatsAppClient();

    this.tools = this.initializeTools();
    this.setupHandlers();
  }

  private initializeTools(): MCPTool[] {
    return [
      {
        name: 'get_upcoming_meetings',
        description: 'Get upcoming Google Meet meetings',
        inputSchema: {
          type: 'object',
          properties: {
            hours: {
              type: 'number',
              description: 'Number of hours to look ahead (default: 24)',
            },
          },
        },
        handler: async (args: any) => {
          const meetings = await this.googleMeet.getUpcomingMeetings(args.hours || 24);
          return { meetings };
        },
      },
      {
        name: 'get_hubspot_contacts',
        description: 'Get contacts from HubSpot CRM',
        inputSchema: {
          type: 'object',
          properties: {},
        },
        handler: async () => {
          const contacts = await this.hubspot.getContacts();
          return { contacts };
        },
      },
      {
        name: 'send_whatsapp_message',
        description: 'Send a WhatsApp message',
        inputSchema: {
          type: 'object',
          properties: {
            to: {
              type: 'string',
              description: 'Phone number to send to (with country code)',
            },
            message: {
              type: 'string',
              description: 'Message content',
            },
          },
          required: ['to', 'message'],
        },
        handler: async (args: any) => {
          const result = await this.whatsapp.sendMessage(args.to, args.message);
          return { sent: true, ...result };
        },
      },
      {
        name: 'generate_meeting_context',
        description: 'Generate context summary for a meeting using Claude',
        inputSchema: {
          type: 'object',
          properties: {
            meetingId: {
              type: 'string',
              description: 'Meeting ID',
            },
          },
          required: ['meetingId'],
        },
        handler: async (args: any) => {
          const meeting = await this.googleMeet.getMeetingDetails(args.meetingId);
          if (!meeting) {
            throw new Error('Meeting not found');
          }
          const context = await this.claude.generateContext(meeting);
          return { context };
        },
      },
    ];
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.tools.map((tool) => ({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
        })),
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const tool = this.tools.find((t) => t.name === request.params.name);

      if (!tool) {
        throw new Error(`Tool not found: ${request.params.name}`);
      }

      try {
        const result = await tool.handler(request.params.arguments);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.log('🚀 Claude Toolkit MCP Server started');
  }
}

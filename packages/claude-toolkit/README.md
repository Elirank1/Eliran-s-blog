# 🤖 Claude Automation Toolkit

OpenClaw-inspired automation suite that integrates Claude AI with your daily workflows. Automate meeting reminders, CRM updates, and communications with WhatsApp, HubSpot, and Google Meet.

Inspired by [Ground UP Ventures' OpenClaw](https://github.com/navotvolkgroundup/groundup-toolkit).

## ✨ Features

- 🤖 **Claude AI Integration** - Leverage Claude for context generation and summaries
- 📅 **Meeting Automation** - WhatsApp reminders 10 minutes before meetings
- 📊 **Monthly CRM Digest** - Automated reports from HubSpot
- 💬 **WhatsApp Notifications** - Stay updated on the go
- 🔗 **Google Meet Integration** - Automatic meeting context and notes
- 🛠️ **MCP Server** - Model Context Protocol server for Claude Desktop
- 🎯 **Extensible** - Easy to add new integrations and workflows

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your API keys
```

### Configuration

Add your API keys to `.env`:

```env
ANTHROPIC_API_KEY=your_key_here
WHATSAPP_API_KEY=your_key_here
HUBSPOT_API_KEY=your_key_here
GOOGLE_CREDENTIALS={"type":"service_account",...}
YOUR_PHONE_NUMBER=+1234567890
```

### Running

```bash
# Start MCP server (for Claude Desktop)
npm run dev

# Or start automation workflows
npm run dev -- workflows

# Or test monthly digest
npm run dev -- test-digest
```

## 🔧 Architecture

```
/
├── src/
│   ├── mcp/
│   │   └── server.ts          # MCP server implementation
│   ├── integrations/
│   │   ├── whatsapp.ts        # WhatsApp Business API
│   │   ├── hubspot.ts         # HubSpot CRM API
│   │   └── google-meet.ts     # Google Calendar/Meet API
│   ├── workflows/
│   │   ├── meeting-reminder.ts # Meeting reminder automation
│   │   └── monthly-digest.ts   # Monthly CRM digest
│   ├── utils/
│   │   └── claude.ts          # Claude API client
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   └── index.ts               # Main entry point
├── examples/
│   └── usage.ts               # Usage examples
└── package.json
```

## 📖 Usage Examples

### Generate Meeting Context

```typescript
import { ClaudeClient } from '@elirank1/claude-toolkit';

const claude = new ClaudeClient();
const context = await claude.generateContext({
  title: 'Product Review',
  attendees: ['team@example.com'],
  time: new Date()
});
```

### Send WhatsApp Reminder

```typescript
import { WhatsAppClient } from '@elirank1/claude-toolkit';

const whatsapp = new WhatsAppClient();
await whatsapp.sendMeetingReminder(
  '+1234567890',
  'Team Meeting',
  new Date(),
  'https://meet.google.com/abc'
);
```

### Fetch HubSpot Contacts

```typescript
import { HubSpotClient } from '@elirank1/claude-toolkit';

const hubspot = new HubSpotClient();
const contacts = await hubspot.getContacts();
```

### Start Automation Workflows

```typescript
import { MeetingReminderWorkflow } from '@elirank1/claude-toolkit';

const workflow = new MeetingReminderWorkflow(10); // 10 min before
workflow.start();
```

## 🎯 Workflows

### Meeting Reminder Workflow

Automatically sends WhatsApp reminders with AI-generated context 10 minutes before each meeting.

**Features:**
- Checks Google Calendar every 5 minutes
- Generates meeting context with Claude
- Sends WhatsApp notification with meeting link
- Configurable reminder time

### Monthly Digest Workflow

Generates and sends a monthly CRM activity report.

**Features:**
- Fetches HubSpot activities
- Generates digest with Claude AI
- Sends via WhatsApp on the 1st of each month
- Customizable schedule

## 🔌 MCP Server

The toolkit includes an MCP server that exposes tools for Claude Desktop:

**Available Tools:**
- `get_upcoming_meetings` - Fetch upcoming Google Meet meetings
- `get_hubspot_contacts` - Get CRM contacts
- `send_whatsapp_message` - Send WhatsApp messages
- `generate_meeting_context` - Generate meeting context with Claude

### Add to Claude Desktop

Add to your MCP settings:

```json
{
  "mcpServers": {
    "claude-toolkit": {
      "command": "node",
      "args": ["/path/to/packages/claude-toolkit/dist/index.js"],
      "env": {
        "ANTHROPIC_API_KEY": "your_key",
        "WHATSAPP_API_KEY": "your_key",
        "HUBSPOT_API_KEY": "your_key"
      }
    }
  }
}
```

## 🔑 API Setup

### WhatsApp Business API

1. Go to [Facebook for Developers](https://developers.facebook.com/docs/whatsapp)
2. Create a new app and enable WhatsApp
3. Get your API key and phone number ID
4. Add to `.env`

### HubSpot API

1. Go to [HubSpot Developers](https://developers.hubspot.com/)
2. Create a private app
3. Generate API key with required scopes
4. Add to `.env`

### Google Cloud

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable Calendar API
3. Create service account credentials
4. Add credentials JSON to `.env`

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start in watch mode
npm run dev

# Build
npm run build

# Run tests
npm test
```

## 📝 TODO

- [ ] Add real API implementations (currently mock)
- [ ] Add tests
- [ ] Add more integrations (Slack, Notion, Linear)
- [ ] Web dashboard for managing workflows
- [ ] Docker support
- [ ] Cloud deployment guides

## 🤝 Contributing

Contributions welcome! This is inspired by open-source projects like OpenClaw.

## 📄 License

MIT License - feel free to use in your own projects!

## 🙏 Acknowledgments

Inspired by [Ground UP Ventures' OpenClaw toolkit](https://www.linkedin.com/posts/ground-up-ventures_ai-automation-claude-activity-7290628574865563648-DGsD).

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
  handler: (args: any) => Promise<any>;
}

export interface Meeting {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  meetLink?: string;
  notes?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  hubspotId?: string;
}

export interface WhatsAppMessage {
  to: string;
  message: string;
  timestamp: Date;
}

export interface WorkflowConfig {
  enabled: boolean;
  meetingReminderMinutes: number;
  monthlyDigestDay: number;
  autoSync: boolean;
}

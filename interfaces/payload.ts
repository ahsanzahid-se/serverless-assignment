export interface MailHookEventData {
  "event": string;
  "timestamp": number;
}

export interface MailhookRequest {
  "event-data": MailHookEventData;
}
export interface SNSRequestPayload {
  "Provider": string;
  "timestamp": number;
  "type": string;
}

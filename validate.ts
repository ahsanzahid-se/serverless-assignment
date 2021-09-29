import { MailhookRequest } from "./interfaces/payload";

export const validateMailhookRequest = (request: MailhookRequest) => {
  if (Object.keys(request).length && request.hasOwnProperty("event-data")) {
    if (
      Object.keys(request["event-data"]).length &&
      request["event-data"].hasOwnProperty("event") &&
      request["event-data"].hasOwnProperty("timestamp")
    ) {
      return true;
    }
  }

  return false;
};

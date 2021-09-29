import {
  ApiCallback,
  ApiContext,
  ApiEvent,
  ApiHandler,
  ResponseBody,
} from "../interfaces/api.interfaces";
import { MailgunService } from "./mailgun.service";
import { validateMailhookRequest } from "../validate";
import { error } from "../common/responseBuilder";
export class MailgunController {
  public constructor(private readonly _service: MailgunService) {}

  public saveMailgunData: ApiHandler = (
    event: ApiEvent,
    context: ApiContext,
    callback: ApiCallback
  ): void => {
    const data = JSON.parse(event.body);
    if (!validateMailhookRequest(data)) {
      callback(null, error(400));
      return;
    }
    this._service
      .saveMailgunData(data)
      .then(async (result: ResponseBody) => {
        callback(null, result);
      })
      .catch((error) => {
        console.log("contorller error ", error);
        callback(error);
      });
  };
  public getMailgunData: ApiHandler = (
    event: ApiEvent,
    context: ApiContext,
    callback: ApiCallback
  ): void => {
    this._service
      .getMailgunData()
      .then(async (result: ResponseBody) => {
        callback(null, result);
      })
      .catch((error) => {
        console.log("contorller error ", error);
        callback(error);
      });
  };
}

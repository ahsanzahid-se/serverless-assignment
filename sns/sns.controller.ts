import {
  ApiCallback,
  ApiContext,
  ApiEvent,
  ApiHandler,
  ResponseBody,
} from "../interfaces/api.interfaces";
import { SnsService } from "./Sns.service";

export class SnsController {
  public constructor(private readonly _service: SnsService) {}

  public publishToSNS: ApiHandler = (
    event: ApiEvent,
    context: ApiContext,
    callback: ApiCallback
  ): void => {
    const data = JSON.parse(event.body);

    this._service
      .publishToSNS(data)
      .then((result: ResponseBody) => {
        callback(null, result);
      })
      .catch((error) => {
        console.log("contorller error ", error);
        callback(error);
      });
  };
}

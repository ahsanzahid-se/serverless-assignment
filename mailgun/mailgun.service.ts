import * as uuid from "uuid";
import { error, success } from "../common/responseBuilder";
import { MailhookRequest, SNSRequestPayload } from "../interfaces/payload";

import snsPublisher from "../sns/snsPublisher";
import { MailgunRepository } from "./mailgun.repository";

export class MailgunService {
  public constructor(
    private readonly _repo: MailgunRepository,
    private sns: snsPublisher
  ) {}

  public getMailgunData() {
    return new Promise((resolve, reject) => {
      return this._repo
        .getMailgunHookData()
        .then((res) => {
          resolve(success(res));
        })
        .catch(() => reject(error(500)));
    });
  }

  public saveMailgunData(bodyData: MailhookRequest) {
    const timestamp = new Date().getTime();
    const data = {
      id: uuid.v1(),
      createdAt: timestamp,
      updatedAt: timestamp,
      ...bodyData,
    };
    
    return new Promise((resolve, reject) => {
      return this._repo
        .saveMailgunHookResp(data)
        .then(() => {
          const snsData: SNSRequestPayload = {
            Provider: "MailGun",
            timestamp: bodyData["event-data"].timestamp,
            type: bodyData["event-data"].event,
          };
          this.sns
            .publishToSNS(snsData)
            .then(() => {
              resolve(success(snsData));
            })
            .catch((err) => {
              console.info(" error in mailgun service ", err);
              reject(error(500));
            });
        })
        .catch((e) => {
          console.log("error in mailgun service ", e);
          reject(new Error("Couldn't save mailgun hook data."));
        });
    });
  }
}
